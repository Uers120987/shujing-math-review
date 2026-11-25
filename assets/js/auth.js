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
  let rankPeriod = 'week';
  let rankLoading = false;
  let lastRankLoad = 0;

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
    if (/database error saving new user/i.test(msg)) return '注册被数据库拒绝，请稍后再试';
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
    const email = usernameToEmail(username);
    const res = await fetch(`${API}/auth/v1/signup`, {
      method: 'POST',
      headers: { apikey: KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        data: {
          username: String(username).trim(),
          nickname: String(nickname || username).trim()
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
    if (rankVisible()) renderRankGate();
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
    out.practiceHistory = [...new Set([
      ...(remote.practiceHistory || []),
      ...(local.practiceHistory || [])
    ])].slice(-800);
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

  const AUTO_PUSH_DELAY = 600;
  let retryDelay = 1000;
  let changeSeq = 0;

  async function syncNow() {
    if (!session || syncing) return;
    const seq = changeSeq;
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
      if (changeSeq === seq) dirty = false;
      retryDelay = 1000;
      setStatus('synced');
    } catch (e) {
      console.warn('同步失败', e);
      setStatus('error');
    } finally {
      syncing = false;
      if (dirty) queuePush(300);
    }
  }

  async function flushPush() {
    if (!session) return;
    if (syncing) {
      pushTimer = setTimeout(flushPush, 350);
      return;
    }
    const seq = changeSeq;
    syncing = true;
    try {
      await ensureFresh();
      await pushRemote(APP.getState());
      lastPull = Date.now();
      if (changeSeq === seq) dirty = false;
      retryDelay = 1000;
      setStatus('synced');
    } catch (e) {
      console.warn('自动同步失败', e);
      setStatus('error');
      retryDelay = Math.min(retryDelay * 2, 10000);
      pushTimer = setTimeout(flushPush, retryDelay);
    } finally {
      syncing = false;
    }
  }

  function queuePush(delay = AUTO_PUSH_DELAY) {
    if (!session) return;
    changeSeq += 1;
    dirty = true;
    clearTimeout(pushTimer);
    setStatus('pending');
    pushTimer = setTimeout(flushPush, delay);
  }

  /* ---------------- leaderboard ---------------- */
  function rankVisible() {
    return !!$('#rankBoard') && location.hash.startsWith('#/rank');
  }

  function displayName(row) {
    return row.nickname || row.username || '同学';
  }

  function renderRankGate() {
    const board = $('#rankBoard');
    if (!board) return;
    board.innerHTML = `
      <div class="rank-gate">
        <div class="rank-gate-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/></svg></div>
        <h2>登录后加入班级联赛</h2>
        <p>榜单只展示昵称、XP 和学习统计。登录后就能看到自己排在第几名。</p>
        <button type="button" class="btn btn-primary" id="rankLogin">登录 / 注册</button>
      </div>`;
  }

  function renderLeaderboard(rows) {
    const board = $('#rankBoard');
    if (!board) return;
    if (!rows.length) {
      board.innerHTML = `<div class="rank-empty">还没有人上榜。完成一个知识点或一次测试，就会出现在这里。</div>`;
      return;
    }

    const byRank = n => rows.find(r => Number(r.rank) === n);
    const podiumOrder = [byRank(2), byRank(1), byRank(3)].filter(Boolean);
    const podium = podiumOrder.map(row => {
      const rank = Number(row.rank);
      const cls = rank === 1 ? 'first' : rank === 2 ? 'second' : 'third';
      const medal = rank === 1 ? '01' : rank === 2 ? '02' : '03';
      return `<div class="rank-podium-card ${cls}">
        <div class="rank-medal">${medal}</div>
        <div class="rank-avatar">${esc(String(displayName(row)).slice(0, 1).toUpperCase())}</div>
        <div class="rank-podium-name">${esc(displayName(row))}</div>
        <div class="rank-podium-xp">${Number(row.points) || 0}<small>XP</small></div>
      </div>`;
    }).join('');

    const rest = rows.filter(r => Number(r.rank) > 3);
    const list = rest.length ? `
      <div class="rank-list">
        <div class="rank-list-head"><span>排名</span><span>同学</span><span>XP</span><span>掌握 / 答题</span><span>正确率</span></div>
        ${rest.map(r => `<div class="rank-row${r.is_me ? ' me' : ''}">
          <div class="rank-row-rank">${r.rank}</div>
          <div class="rank-row-name"><b>${esc(displayName(r))}</b>${r.is_me ? '<span class="rank-row-me-tag">我</span>' : ''}<span>@${esc(r.username || '')}</span></div>
          <div class="rank-row-points">${Number(r.points) || 0}<small>XP</small></div>
          <div class="rank-row-meta">${Number(r.read_count) || 0} 个知识点 · ${Number(r.answered) || 0} 题</div>
          <div class="rank-row-meta">${Number(r.accuracy) || 0}% 正确</div>
        </div>`).join('')}
      </div>` : '';

    board.innerHTML = `<div class="rank-podium">${podium}</div>${list}`;
  }

  async function loadLeaderboard(period = rankPeriod) {
    if (!rankVisible()) return;
    rankPeriod = period === 'all' ? 'all' : 'week';
    document.querySelectorAll('#rankTabs [data-rank-period]').forEach(btn => {
      const active = btn.dataset.rankPeriod === rankPeriod;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    if (!session) { renderRankGate(); return; }
    if (rankLoading) return;
    rankLoading = true;
    const board = $('#rankBoard');
    if (board) board.innerHTML = '<div class="rank-loading">正在计算班级 XP…</div>';

    try {
      await ensureFresh();
      const res = await authFetch('/rest/v1/rpc/get_leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_period: rankPeriod })
      });
      const data = await readJson(res);
      if (!res.ok) throw new Error(authError(data, res.status));
      lastRankLoad = Date.now();
      renderLeaderboard(Array.isArray(data) ? data : []);
    } catch (e) {
      console.warn('榜单加载失败', e);
      if (board) {
        board.innerHTML = `<div class="rank-empty">榜单暂时加载失败：${esc(e.message || '网络问题')}<br><button type="button" class="btn btn-soft btn-sm" id="rankRetry" style="margin-top:12px">重试</button></div>`;
      }
    } finally {
      rankLoading = false;
    }
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
    if (next === 'synced' && rankVisible() && Date.now() - lastRankLoad > 1200) {
      setTimeout(() => loadLeaderboard(rankPeriod), 250);
    }
  }

  function statusText() {
    if (!session) return '仅保存在本地浏览器';
    if (status === 'syncing') return '正在自动同步…';
    if (status === 'pending') return '检测到改动，自动同步中…';
    if (status === 'error') return '自动同步失败，进度仍在本地';
    if (status === 'synced') return '已自动同步到云端';
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

  function openLogin() {
    modalTab = 'login';
    openModal();
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
        if (rankVisible()) loadLeaderboard(rankPeriod);
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
        <div class="auth-account-row"><span>同步方式</span><b>自动 · 改动后约 0.6 秒</b></div>
        <div class="auth-account-row"><span>本地进度</span><b>始终保留</b></div>
        <div class="auth-account-row"><span>云端数据</span><b>仅自己可读写</b></div>
      </div>
      <div class="auth-actions">
        <button class="btn btn-primary" type="button" id="authSyncNow">立即补同步</button>
        <button class="btn btn-soft" type="button" id="authLogout">退出登录</button>
      </div>
      <p class="auth-note">检测到进度变化后会自动保存到云端；断网时会先保存在本地，恢复网络后自动重试。换设备时，用同一个用户名和密码登录即可拉取并合并进度。</p>`;

    $('#authSyncNow')?.addEventListener('click', async () => {
      const btn = $('#authSyncNow');
      if (btn) { btn.disabled = true; btn.textContent = '同步中…'; }
      await syncNow();
      if (btn) { btn.disabled = false; btn.textContent = '立即补同步'; }
      renderAccount();
      toast(status === 'synced' ? '同步完成' : '同步失败，本地进度仍在');
    });
    $('#authLogout')?.addEventListener('click', signOut);
  }

  function flushOnPageHide() {
    if (!session || (!dirty && status !== 'error' && status !== 'pending')) return;
    try {
      const uid = session.user.id;
      fetch(`${API}/rest/v1/progress?on_conflict=user_id`, {
        method: 'POST',
        keepalive: true,
        headers: {
          apikey: KEY,
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=minimal'
        },
        body: JSON.stringify([{ user_id: uid, state: APP.getState(), updated_at: new Date().toISOString() }])
      }).catch(() => {});
    } catch { /* page is leaving */ }
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
        if (rankVisible()) loadLeaderboard(rankPeriod);
      }
    });

    window.addEventListener('online', () => {
      if (session && (dirty || status === 'error')) queuePush(0);
    });
    window.addEventListener('pagehide', flushOnPageHide);
    setInterval(() => {
      if (session && dirty && !syncing) queuePush(0);
    }, 15000);

    document.addEventListener('click', e => {
      const tab = e.target.closest('[data-rank-period]');
      if (tab) {
        loadLeaderboard(tab.dataset.rankPeriod);
        return;
      }
      if (e.target.closest('#rankLogin')) openLogin();
      if (e.target.closest('#rankRetry')) loadLeaderboard(rankPeriod);
    });

    window.addEventListener('hashchange', () => {
      if (rankVisible()) {
        lastRankLoad = 0;
        loadLeaderboard(rankPeriod);
      }
    });

    if (rankVisible()) loadLeaderboard(rankPeriod);
  }

  window.ShujingAuth = {
    queuePush,
    syncNow,
    signOut,
    openLogin,
    loadLeaderboard,
    getSession: () => session
  };
  init();
})();
