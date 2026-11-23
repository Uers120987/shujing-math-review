/* 账号同步：Supabase Auth + progress 表
   - 前端只使用 anon key
   - 用户名映射为内部邮箱，同学只输入用户名和密码
   - 本地 localStorage 始终保留，登录后做双向合并
*/
(() => {
  'use strict';

  const CFG = window.SHUJING_SUPABASE;
  const APP = window.ShujingApp;
  if (!CFG?.url || !CFG?.anonKey || !APP) return;

  const API = CFG.url.replace(/\/$/, '');
  const KEY = CFG.anonKey;
  const SESSION_KEY = 'shujing.auth.v1';

  let session = null;
  let authUser = null;
  let pushTimer = null;
  let syncing = false;
  let dirty = false;
  let status = 'local';
  let lastPull = 0;
  let modal = null;
  let modalTab = 'login';

  const $ = sel => document.querySelector(sel);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

  /* ---------------- session ---------------- */
  function loadSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s?.access_token || !s?.user?.id) return null;
      return s;
    } catch { return null; }
  }

  function saveSession(s) {
    session = s;
    authUser = s?.user || authUser;
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch { /* ignore */ }
  }

  function clearSession() {
    session = null;
    authUser = null;
    try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
  }

  function usernameToEmail(username) {
    const norm = String(username || '').trim().toLowerCase();
    const bytes = new TextEncoder().encode(norm);
    let bin = '';
    bytes.forEach(b => { bin += String.fromCharCode(b); });
    const b64 = btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `u_${b64}@shujing.app`;
  }

  function validateUsername(name) {
    return /^[\u4e00-\u9fa5A-Za-z0-9_-]{2,12}$/.test(String(name || '').trim());
  }

  async function readJson(res) {
    const text = await res.text();
    if (!text) return {};
    try { return JSON.parse(text); } catch { return { message: text }; }
  }

  function authError(data, httpStatus) {
    const msg = data?.msg || data?.message || data?.error_description || '';
    if (/invalid login credentials/i.test(msg)) return '用户名或密码错误';
    if (/user already registered|already been registered/i.test(msg)) return '这个用户名已经被注册了';
    if (/email not confirmed/i.test(msg)) return '项目仍要求邮箱确认：请管理员关闭 Supabase 的 Confirm email';
    if (/invalid_invite_code|database error saving new user/i.test(msg)) return '班级邀请码不正确，或注册被数据库拒绝';
    if (/password/i.test(msg) && /6|characters/i.test(msg)) return '密码至少需要 6 位';
    if (/rate limit|too many/i.test(msg)) return '尝试太频繁，请稍后再试';
    return msg || `请求失败（HTTP ${httpStatus}）`;
  }

  async function refreshSession() {
    if (!session?.refresh_token) throw new Error('登录已过期，请重新登录');
    const res = await fetch(`${API}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { apikey: KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: session.refresh_token })
    });
    const data = await readJson(res);
    if (!res.ok || !data.access_token) throw new Error(authError(data, res.status));
    saveSession({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: Date.now() + (data.expires_in || 3600) * 1000,
      user: data.user || session.user
    });
  }

  async function ensureFresh() {
    if (!session) throw new Error('未登录');
    if (session.expires_at && Date.now() < session.expires_at - 60000) return;
    await refreshSession();
  }

  async function authFetch(path, options = {}, retry = true) {
    await ensureFresh();
    const headers = {
      apikey: KEY,
      Authorization: `Bearer ${session.access_token}`,
      ...(options.headers || {})
    };
    const res = await fetch(`${API}${path}`, { ...options, headers });
    if (res.status === 401 && retry) {
      await refreshSession();
      return authFetch(path, options, false);
    }
    return res;
  }

  /* ---------------- auth ---------------- */
  async function signIn(username, password) {
    const email = usernameToEmail(username);
    const res = await fetch(`${API}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: { apikey: KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await readJson(res);
    if (!res.ok || !data.access_token) throw new Error(authError(data, res.status));
    saveSession({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: Date.now() + (data.expires_in || 3600) * 1000,
      user: data.user
    });
    syncNow();
  }

  async function signUp(username, password, nickname) {
    if (!validateUsername(username)) throw new Error('用户名需为 2–12 位中文、字母、数字、_ 或 -');
    if (String(password).length < 6) throw new Error('密码至少需要 6 位');
    const invite = String($('#authInvite')?.value || '').trim();
    if (!invite) throw new Error('请填写班级邀请码');
    const email = usernameToEmail(username);
    const res = await fetch(`${API}/auth/v1/signup`, {
      method: 'POST',
      headers: { apikey: KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        data: {
          username: String(username).trim(),
          nickname: String(nickname || username).trim(),
          class_code: invite
        }
      })
    });
    const data = await readJson(res);
    if (!res.ok) throw new Error(authError(data, res.status));

    const rawSession = data.session || (data.access_token ? data : null);
    if (!rawSession) {
      if (Array.isArray(data.identities) && data.identities.length === 0) {
        throw new Error('这个用户名已经被注册了');
      }
      throw new Error('注册请求成功，但项目仍要求邮箱确认。请联系管理员关闭 Supabase 的 Confirm email。');
    }
    saveSession({
      access_token: rawSession.access_token,
      refresh_token: rawSession.refresh_token,
      expires_at: Date.now() + (rawSession.expires_in || 3600) * 1000,
      user: rawSession.user || data.user
    });
    syncNow();
  }

  async function signOut() {
    try {
      await ensureFresh();
      await fetch(`${API}/auth/v1/logout`, {
        method: 'POST',
        headers: { apikey: KEY, Authorization: `Bearer ${session.access_token}` }
      });
    } catch { /* offline logout still clears local session */ }
    clearTimeout(pushTimer);
    clearSession();
    setStatus('local');
    updateUI();
    renderAccount();
    toast('已退出登录，本地进度保留');
  }

  async function fetchUser() {
    const res = await authFetch('/auth/v1/user');
    const data = await readJson(res);
    if (!res.ok) throw new Error(authError(data, res.status));
    authUser = data;
    session.user = data;
    saveSession(session);
    return data;
  }

  /* ---------------- progress ---------------- */
  function maxNum(a, b) {
    return Math.max(Number(a) || 0, Number(b) || 0);
  }

  function mergeStates(local, remote) {
    const out = { ...local };
    out.read = { ...(remote.read || {}), ...(local.read || {}) };

    out.wrong = { ...(remote.wrong || {}) };
    for (const [id, w] of Object.entries(local.wrong || {})) {
      const old = out.wrong[id];
      if (!old || (w.lastAt || 0) >= (old.lastAt || 0)) out.wrong[id] = w;
      else out.wrong[id] = { ...old, count: maxNum(old.count, w.count) };
    }

    out.plan = { ...(remote.plan || {}), ...(local.plan || {}) };
    out.course = { ...(remote.course || {}), ...(local.course || {}) };

    out.quiz = { ...(remote.quiz || {}) };
    for (const [id, q] of Object.entries(local.quiz || {})) {
      const old = out.quiz[id] || {};
      out.quiz[id] = {
        ...old,
        ...q,
        best: maxNum(old.best, q.best),
        attempts: maxNum(old.attempts, q.attempts),
        last: maxNum(old.last, q.last),
        total: maxNum(old.total, q.total),
        at: maxNum(old.at, q.at)
      };
    }

    const localTime = local._updatedAt || 0;
    const remoteTime = remote._updatedAt || 0;
    out.schedule = remoteTime > localTime ? remote.schedule : local.schedule;

    out.stats = {
      answered: maxNum(local.stats?.answered, remote.stats?.answered),
      correct: maxNum(local.stats?.correct, remote.stats?.correct)
    };
    out.days = { ...(remote.days || {}) };
    for (const [day, n] of Object.entries(local.days || {})) {
      out.days[day] = maxNum(out.days[day], n);
    }

    const exams = [...(remote.exams || []), ...(local.exams || [])];
    const seen = new Set();
    out.exams = exams
      .filter(e => e && e.at && !seen.has(e.at) && seen.add(e.at))
      .sort((a, b) => b.at - a.at)
      .slice(0, 10);

    out._updatedAt = Date.now();
    return out;
  }

  async function pullRemote() {
    const uid = session?.user?.id;
    if (!uid) return null;
    const res = await authFetch(`/rest/v1/progress?user_id=eq.${uid}&select=state,updated_at`);
    const data = await readJson(res);
    if (!res.ok) throw new Error(authError(data, res.status));
    return Array.isArray(data) && data[0] ? data[0] : null;
  }

  async function pushRemote(state) {
    const uid = session?.user?.id;
    if (!uid) return;
    const res = await authFetch('/rest/v1/progress?on_conflict=user_id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify([{
        user_id: uid,
        state,
        updated_at: new Date().toISOString()
      }])
    });
    if (!res.ok) {
      const data = await readJson(res);
      throw new Error(authError(data, res.status));
    }
  }

  async function syncNow() {
    if (!session || syncing) return;
    syncing = true;
    setStatus('syncing');
    try {
      await ensureFresh();
      const remote = await pullRemote();
      const local = APP.getState();
      const merged = remote?.state ? mergeStates(local, remote.state) : local;
      if (JSON.stringify(merged) !== JSON.stringify(local)) APP.replaceState(merged);
      await pushRemote(merged);
      lastPull = Date.now();
      setStatus('synced');
    } catch (e) {
      console.warn('同步失败', e);
      setStatus('error');
    } finally {
      syncing = false;
      if (dirty) {
        dirty = false;
        queuePush();
      }
    }
  }

  function queuePush() {
    if (!session) return;
    dirty = true;
    clearTimeout(pushTimer);
    setStatus('pending');
    pushTimer = setTimeout(async () => {
      if (!session) return;
      if (syncing) return;
      syncing = true;
      try {
        await ensureFresh();
        await pushRemote(APP.getState());
        lastPull = Date.now();
        dirty = false;
        setStatus('synced');
      } catch (e) {
        console.warn('推送失败', e);
        setStatus('error');
      } finally {
        syncing = false;
      }
    }, 1200);
  }

  /* ---------------- UI ---------------- */
  function setStatus(next) {
    status = next;
    const btn = $('#authTrigger');
    if (btn) {
      btn.classList.remove('is-syncing', 'is-synced', 'is-error');
      if (next === 'syncing' || next === 'pending') btn.classList.add('is-syncing');
      if (next === 'synced') btn.classList.add('is-synced');
      if (next === 'error') btn.classList.add('is-error');
      btn.title = statusText();
    }
    const statusEl = $('#authSyncStatus');
    if (statusEl) statusEl.textContent = statusText();
  }

  function statusText() {
    if (!session) return '仅保存在本地浏览器';
    if (status === 'syncing') return '正在同步…';
    if (status === 'pending') return '有改动待同步';
    if (status === 'error') return '同步失败，进度仍在本地';
    if (status === 'synced') return '已同步到云端';
    return '已登录';
  }

  function updateUI() {
    const btn = $('#authTrigger');
    if (!btn) return;
    const name = authUser?.user_metadata?.username || authUser?.email?.split('@')[0] || '账号';
    btn.classList.toggle('signed-in', !!session);
    btn.innerHTML = `
      <span class="auth-avatar">${session ? esc(String(name).slice(0, 1).toUpperCase()) : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'}</span>
      <span class="auth-label">${session ? esc(name) : '登录'}</span>
      <span class="auth-dot"></span>`;
    btn.title = session ? `已登录：${name} · ${statusText()}` : '登录后跨设备同步进度';
  }

  function toast(message) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => el.classList.remove('show'), 2400);
  }

  function ensureButton() {
    const actions = $('.topbar-actions');
    if (!actions || $('#authTrigger')) return;
    const btn = document.createElement('button');
    btn.id = 'authTrigger';
    btn.type = 'button';
    btn.className = 'auth-trigger';
    btn.addEventListener('click', openModal);
    const search = $('.search-trigger', actions);
    actions.insertBefore(btn, search || actions.firstChild);
    updateUI();
  }

  function ensureModal() {
    if ($('#authModal')) { modal = $('#authModal'); return; }
    const el = document.createElement('div');
    el.className = 'auth-modal';
    el.id = 'authModal';
    el.hidden = true;
    el.innerHTML = `
      <div class="auth-backdrop" data-auth-close></div>
      <div class="auth-panel" role="dialog" aria-modal="true" aria-labelledby="authTitle">
        <button class="auth-close" type="button" data-auth-close aria-label="关闭">×</button>
        <div id="authBody"></div>
      </div>`;
    document.body.appendChild(el);
    modal = el;
    el.addEventListener('click', e => {
      if (e.target.closest('[data-auth-close]')) closeModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !el.hidden) closeModal();
    });
  }

  function openModal() {
    ensureModal();
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    if (session) renderAccount();
    else renderAuth(modalTab);
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
  }

  function renderAuth(tab) {
    modalTab = tab;
    const body = $('#authBody');
    if (!body) return;
    body.innerHTML = `
      <div class="auth-kicker">ACCOUNT SYNC · 账号同步</div>
      <h2 id="authTitle">${tab === 'login' ? '登录，继续你的进度' : '注册一个学习账号'}</h2>
      <p class="auth-lead">账号只用于同步学习进度；题库和页面仍然可以离线使用。</p>
      <div class="auth-tabs">
        <button type="button" class="${tab === 'login' ? 'active' : ''}" data-auth-tab="login">登录</button>
        <button type="button" class="${tab === 'register' ? 'active' : ''}" data-auth-tab="register">注册</button>
      </div>
      <form class="auth-form" id="authForm" autocomplete="on">
        <label class="auth-field"><span>用户名</span><input id="authUsername" name="username" maxlength="12" required placeholder="2–12 位中文、字母或数字" autocomplete="username"></label>
        ${tab === 'register' ? `<label class="auth-field"><span>昵称（可选）</span><input id="authNickname" name="nickname" maxlength="20" placeholder="同学看到的名字"></label>` : ''}
        <label class="auth-field"><span>密码</span><input id="authPassword" name="password" type="password" minlength="6" required placeholder="至少 6 位" autocomplete="${tab === 'login' ? 'current-password' : 'new-password'}"></label>
        ${tab === 'register' ? `<label class="auth-field"><span>班级邀请码</span><input id="authInvite" name="invite" required placeholder="向管理员索取"></label>` : ''}
        <div class="auth-error" id="authError" hidden></div>
        <button class="btn btn-primary auth-submit" type="submit">${tab === 'login' ? '登录并同步' : '注册并同步'}</button>
      </form>
      <p class="auth-note">${tab === 'login' ? '没有账号？点上面的“注册”。忘记密码需要管理员重置。' : '注册即表示你同意仅将用户名、昵称和学习进度用于本班同步。'}</p>`;

    body.querySelectorAll('[data-auth-tab]').forEach(btn => {
      btn.addEventListener('click', () => renderAuth(btn.dataset.authTab));
    });

    const form = $('#authForm');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const error = $('#authError');
      const submit = form.querySelector('button[type="submit"]');
      error.hidden = true;
      submit.disabled = true;
      const oldText = submit.textContent;
      submit.textContent = tab === 'login' ? '正在登录…' : '正在注册…';
      try {
        const username = $('#authUsername').value.trim();
        const password = $('#authPassword').value;
        if (tab === 'login') await signIn(username, password);
        else await signUp(username, password, $('#authNickname').value.trim());
        closeModal();
        updateUI();
        toast(tab === 'login' ? '登录成功，进度已同步' : '注册成功，已开始同步');
      } catch (err) {
        error.textContent = err?.message || '操作失败，请稍后再试';
        error.hidden = false;
        submit.disabled = false;
        submit.textContent = oldText;
      }
    });
    setTimeout(() => $('#authUsername')?.focus(), 50);
  }

  function renderAccount() {
    const body = $('#authBody');
    if (!body) return;
    if (!session) { renderAuth('login'); return; }
    const name = authUser?.user_metadata?.username || '同学';
    const nickname = authUser?.user_metadata?.nickname || '';
    body.innerHTML = `
      <div class="auth-kicker">ACCOUNT · 账号</div>
      <h2 id="authTitle">${esc(name)}</h2>
      <p class="auth-lead">${nickname ? esc(nickname) + ' · ' : ''}学习进度已与本账号关联。</p>
      <div class="auth-account">
        <div class="auth-account-row"><span>同步状态</span><b id="authSyncStatus">${statusText()}</b></div>
        <div class="auth-account-row"><span>本地进度</span><b>始终保留</b></div>
        <div class="auth-account-row"><span>云端数据</span><b>仅自己可读写</b></div>
      </div>
      <div class="auth-actions">
        <button class="btn btn-primary" type="button" id="authSyncNow">立即同步</button>
        <button class="btn btn-soft" type="button" id="authLogout">退出登录</button>
      </div>
      <p class="auth-note">换设备时，用同一个用户名和密码登录即可拉取并合并进度。忘记密码需要管理员在 Supabase 后台重置。</p>`;

    $('#authSyncNow')?.addEventListener('click', async () => {
      const btn = $('#authSyncNow');
      if (btn) { btn.disabled = true; btn.textContent = '同步中…'; }
      await syncNow();
      if (btn) { btn.disabled = false; btn.textContent = '立即同步'; }
      renderAccount();
      toast(status === 'synced' ? '同步完成' : '同步失败，本地进度仍在');
    });
    $('#authLogout')?.addEventListener('click', signOut);
  }

  /* ---------------- bootstrap ---------------- */
  async function init() {
    ensureButton();
    ensureModal();
    session = loadSession();
    authUser = session?.user || null;
    updateUI();

    if (session) {
      setStatus('syncing');
      try {
        await ensureFresh();
        await fetchUser().catch(() => {});
        await syncNow();
      } catch (e) {
        console.warn('恢复登录失败', e);
        clearSession();
        setStatus('local');
        updateUI();
      }
    }

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && session && Date.now() - lastPull > 60000) {
        syncNow();
      }
    });
  }

  window.ShujingAuth = { queuePush, syncNow, signOut, getSession: () => session };
  init();
})();
