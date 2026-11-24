/* ==========================================================================
   大一电信学习网 · 应用逻辑
   路由 / 状态 / 渲染 / 刷题 / 考试 / 错题 / 公式 / 计划 / 搜索
   ========================================================================== */
(() => {
  'use strict';

  const CHAPTERS = [
    ...window.CALC_CHAPTERS,
    ...window.LINEAR_CHAPTERS,
    ...(window.DRAWING_CHAPTERS || [])
  ];
  /* 这些题与章节“典型例题”使用了同一组数据/同一个问题，练习时不再重复出现。 */
  const EXAMPLE_DUPLICATE_IDS = new Set([
    'q-c1-6', 'q-c4-5', 'q-c6-1',
    'q-l1-7', 'q-l2-7', 'q-l5-1',
    'q-d3-2', 'q-d8-2'
  ]);
  const QUESTIONS = [
    ...window.QUESTION_BANK,
    ...(window.QUESTION_BANK_EXTRA || []),
    ...(window.QUESTION_BANK_EXPAND || []),
    ...(window.QUESTION_BANK_DRAWING || [])
  ].filter(q => !EXAMPLE_DUPLICATE_IDS.has(q.id));
  const PRACTICE_QUESTIONS = window.PRACTICE_QUESTIONS || [];
  const PLAN = window.STUDY_PLAN;
  const TIPS = window.STUDY_TIPS;
  const META = window.SITE_META;
  const COURSE_SOURCES = window.COURSE_SOURCES || {};
  const COURSE_MAP = window.COURSE_MAP || [];
  const COURSE_STEPS = window.COURSE_STEPS || [];

  const chapterById = new Map(CHAPTERS.map(c => [c.id, c]));
  const questionById = new Map([...QUESTIONS, ...PRACTICE_QUESTIONS].map(q => [q.id, q]));
  const kpById = new Map();
  CHAPTERS.forEach(c => c.kps.forEach(kp => kpById.set(kp.id, { kp, chapter: c })));

  const SUBJECTS = ['calc', 'linear', 'drawing'];
  const SUBJECT_NAME = { calc: '高等数学', linear: '线性代数', drawing: '机械制图' };
  const SUBJECT_SHORT = { calc: '高数', linear: '线代', drawing: '制图' };
  const STORE_KEY = 'shujing.math.review.v1';
  const TOTAL_KPS = CHAPTERS.reduce((n, c) => n + c.kps.length, 0);
  const TOTAL_Q = QUESTIONS.length;
  const TOTAL_PRACTICE = PRACTICE_QUESTIONS.length;
  const practiceFilter = { subject: 'all', chapter: 'all', tag: 'all' };

  const FORMULAS = [];
  CHAPTERS.forEach(c => c.kps.forEach(kp => kp.formulas.forEach((f, i) => {
    FORMULAS.push({
      id: `f-${kp.id}-${i}`,
      chapterId: c.id,
      subject: c.subject,
      chapterTitle: c.title,
      kpTitle: kp.title,
      label: f.label,
      tex: f.tex,
      search: `${f.label} ${c.title} ${kp.title}`.toLowerCase()
    });
  })));
  const formulaById = new Map(FORMULAS.map(f => [f.id, f]));

  /* ------------------------------ Icons ------------------------------ */
  const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
    calc: '<path d="M18.5 4h-11l5.5 8-5.5 8h11"/>',
    linear: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
    exam: '<path d="M8 3h8v4H8z"/><path d="M7 5H5v16h14V5h-2"/><path d="M9 11h6M9 15h4"/>',
    mistakes: '<path d="M5 4h14a1 1 0 0 1 1 1v16l-4-3-4 3-4-3-4 3V5a1 1 0 0 1 1-1Z"/><path d="m9 9 6 6M15 9l-6 6"/>',
    formulas: '<path d="M4 5h16M4 12h10M4 19h7"/><path d="M17 13v7M13.5 16.5h7"/>',
    plan: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    flame: '<path d="M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 3-3 4-4 4 0-3-1-6-3-8 0 4-4 6-4 11 0 4 3 7 7 7Z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronRight: '<path d="m9 6 6 6-6 6"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4V4h11v1"/>',
    printer: '<path d="M6 9V3h12v6"/><rect x="4" y="9" width="16" height="8" rx="2"/><path d="M8 17h8v4H8z"/>',
    play: '<path d="m7 4 13 8-13 8V4Z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M10.3 3.6 2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
    bulb: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V18h8v-3.3A7 7 0 0 0 12 2Z"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    pen: '<path d="m4 20 4-1 11-11-3-3L5 16l-1 4Z"/><path d="m14 6 3 3"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    trophy: '<path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'
  };

  function icon(name, cls = '') {
    return `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
  }

  /* ------------------------------ Helpers ------------------------------ */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const escAttr = esc;
  /* 数据中的 TeX 只应作为文本进入 DOM；< 与 > 必须转义，否则浏览器会把它当成标签。 */
  const raw = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const pad2 = n => String(n).padStart(2, '0');
  const displayMath = tex => '$$' + raw(tex) + '$$';
  const inlineMath = tex => '$' + raw(tex) + '$';
  const shuffle = arr => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /* 每次打开页面随机打乱选项，同时重映射正确答案，避免大量题目的答案都落在 A。 */
  function randomizeQuestionOptions() {
    [...QUESTIONS, ...PRACTICE_QUESTIONS].forEach(q => {
      if (q.type === 'fill' || !Array.isArray(q.options) || q.options.length < 2) return;
      const order = shuffle(q.options.map((text, original) => ({ text, original })));
      q.options = order.map(x => x.text);
      q.answer = order.findIndex(x => x.original === Number(q.answer));
    });
  }
  randomizeQuestionOptions();

  const todayKey = (d = new Date()) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const startOfDay = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const addDays = (d, n) => {
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
  };
  const parseLocalDate = str => {
    const m = String(str || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return null;
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  };
  const formatMonthDay = d => `${d.getMonth() + 1}/${d.getDate()}`;
  const formatHours = min => {
    const h = min / 60;
    return `${h >= 10 ? Math.round(h) : h.toFixed(1).replace(/\.0$/, '')} 小时`;
  };
  const clampNum = (n, min, max) => Math.max(min, Math.min(max, n));
  const formatTime = sec => {
    const s = Math.max(0, Math.floor(sec));
    return `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`;
  };
  const formatDate = ts => new Date(ts).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' });

  function chipClass(level) {
    return { '核心': 'accent', '强化': 'gold', '易错': 'red', '基础': '' }[level] || '';
  }

  function subjectColor(subject) {
    return subject === 'linear' ? 'teal' : subject === 'drawing' ? 'gold' : '';
  }
  function chapterQuestions(id) { return QUESTIONS.filter(q => q.chapter === id); }
  function chapterTotal(id) { return chapterQuestions(id).length; }

  /* ------------------------------ State ------------------------------ */
  const DEFAULT_STATE = {
    version: 1,
    theme: null,
    read: {},
    quiz: {},
    wrong: {},
    plan: {},
    course: {},
    schedule: { examDate: '', dailyMinutes: 90, restDays: 1 },
    stats: { answered: 0, correct: 0 },
    days: {},
    lastChapter: null,
    lastKp: null,
    exams: []
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return { ...DEFAULT_STATE };
      const p = JSON.parse(raw);
      return {
        ...DEFAULT_STATE,
        ...p,
        read: p.read || {},
        quiz: p.quiz || {},
        wrong: p.wrong || {},
        plan: p.plan || {},
        course: p.course || {},
        schedule: { ...DEFAULT_STATE.schedule, ...(p.schedule || {}) },
        stats: { ...DEFAULT_STATE.stats, ...(p.stats || {}) },
        days: p.days || {},
        exams: Array.isArray(p.exams) ? p.exams : []
      };
    } catch (e) {
      console.warn('读取本地进度失败', e);
      return { ...DEFAULT_STATE };
    }
  }

  let state = loadState();
  let suppressSync = false;
  let currentRoute = { name: 'home', param: null, query: new URLSearchParams() };
  let quizSession = null;
  let examSession = null;
  let examTimer = null;
  let formulaQuery = '';
  let formulaSubject = 'all';
  let formulaMasked = false;

  function saveState() {
    try {
      state._updatedAt = Date.now();
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('保存失败', e);
    }
    if (!suppressSync) window.ShujingAuth?.queuePush?.();
  }

  function markActivity(n = 1) {
    const k = todayKey();
    state.days[k] = (state.days[k] || 0) + n;
  }

  function streak() {
    const d = new Date();
    if (!state.days[todayKey(d)]) d.setDate(d.getDate() - 1);
    let n = 0;
    while (state.days[todayKey(d)]) {
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  }

  function readCount(c) { return c.kps.filter(kp => state.read[kp.id]).length; }
  function quizBest(id) { return state.quiz[id]?.best || 0; }

  function chapterPct(id) {
    const c = chapterById.get(id);
    if (!c) return 0;
    const r = readCount(c) / c.kps.length;
    const q = chapterTotal(id) ? quizBest(id) / chapterTotal(id) : 0;
    return Math.round((r * 0.45 + q * 0.55) * 100);
  }

  function mastery() {
    let sum = 0, weight = 0;
    CHAPTERS.forEach(c => {
      const w = c.kps.length;
      sum += chapterPct(c.id) * w;
      weight += w;
    });
    return weight ? Math.round(sum / weight) : 0;
  }

  function subjectPct(subject) {
    const list = CHAPTERS.filter(c => c.subject === subject);
    let sum = 0, weight = 0;
    list.forEach(c => {
      sum += chapterPct(c.id) * c.kps.length;
      weight += c.kps.length;
    });
    return weight ? Math.round(sum / weight) : 0;
  }

  function accuracy() {
    if (!state.stats.answered) return 0;
    return Math.round(state.stats.correct / state.stats.answered * 100);
  }

  function wrongList() {
    return Object.entries(state.wrong)
      .map(([id, meta]) => ({ q: questionById.get(id), meta }))
      .filter(x => x.q)
      .sort((a, b) => (b.meta.lastAt || 0) - (a.meta.lastAt || 0));
  }

  function nextLearning() {
    if (state.lastKp) {
      const hit = kpById.get(state.lastKp);
      if (hit && !state.read[state.lastKp]) return hit;
    }
    for (const c of CHAPTERS) {
      for (const kp of c.kps) {
        if (!state.read[kp.id]) return { kp, chapter: c };
      }
    }
    const last = chapterById.get(state.lastChapter) || CHAPTERS[0];
    return { kp: last.kps[0], chapter: last };
  }

  function weakestChapter() {
    const attempted = CHAPTERS.filter(c => state.quiz[c.id]?.attempts);
    if (!attempted.length) return null;
    return attempted.sort((a, b) => chapterPct(a.id) - chapterPct(b.id))[0];
  }

  /* ------------------------------ Theme ------------------------------ */
  function applyTheme(theme, persist = false) {
    document.documentElement.dataset.theme = theme;
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0d151f' : '#12283f');
    const ic = theme === 'dark' ? icon('sun') : icon('moon');
    const label = theme === 'dark' ? '切换到浅色' : '切换到深色';
    ['#themeIcon', '#themeIconTop'].forEach(sel => {
      const el = $(sel);
      if (el) el.innerHTML = ic;
    });
    $$('[data-action="toggle-theme"]').forEach(b => b.setAttribute('aria-label', label));
    if (persist) {
      state.theme = theme;
      saveState();
    }
  }

  function initTheme() {
    const stored = state.theme;
    const preferred = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(stored || preferred);
  }

  /* ------------------------------ Toast ------------------------------ */
  let toastTimer = null;
  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  /* ------------------------------ MathJax ------------------------------ */
  function typeset(el, tries = 0) {
    if (!window.MathJax || !window.MathJax.startup) {
      if (tries < 50) {
        return new Promise(resolve => setTimeout(() => resolve(typeset(el, tries + 1)), 40));
      }
      return Promise.resolve();
    }
    return window.MathJax.startup.promise
      .then(() => window.MathJax.typesetPromise([el]))
      .catch(err => console.warn('公式渲染失败', err));
  }

  /* ------------------------------ Router ------------------------------ */
  function parseRoute() {
    const raw = location.hash.replace(/^#\/?/, '');
    const [pathPart, queryPart] = raw.split('?');
    const parts = pathPart.split('/').filter(Boolean);
    return {
      name: parts[0] || 'home',
      param: parts[1] || null,
      query: new URLSearchParams(queryPart || '')
    };
  }

  function renderRoute(opts = {}) {
    currentRoute = parseRoute();
    if (currentRoute.name === 'formulas') {
      if (currentRoute.query.get('q') !== null) formulaQuery = currentRoute.query.get('q') || '';
      else if (!opts.keepScroll) formulaQuery = '';
    }
    stopExamTimer();
    closeSidebar();
    closeSearch();

    const view = $('#view');
    const y = window.scrollY;
    let page = '';

    switch (currentRoute.name) {
      case 'home': page = renderHome(); break;
      case 'chapter': page = renderChapter(currentRoute.param); break;
      case 'quiz': page = renderQuiz(currentRoute.param); break;
      case 'exam': page = renderExam(currentRoute.param); break;
      case 'mistakes': page = renderMistakes(); break;
      case 'formulas': page = renderFormulas(); break;
      case 'plan': page = renderPlan(); break;
      case 'courses': page = renderCourses(); break;
      case 'rank': page = renderRank(); break;
      case 'practice': page = renderPractice(); break;
      default: page = renderNotFound();
    }

    view.innerHTML = `<div class="page">${page}</div>`;
    updateShell();
    applyTheme(document.documentElement.dataset.theme || 'light');
    if (!opts.keepScroll) window.scrollTo(0, 0);
    else window.scrollTo(0, y);

    typeset(view).then(() => {
      if (currentRoute.name === 'chapter' && currentRoute.query.get('kp')) {
        const kpId = currentRoute.query.get('kp');
        const target = document.getElementById(kpId);
        if (target) {
          target.scrollIntoView({ block: 'start', behavior: 'smooth' });
          target.classList.add('is-highlight');
          setTimeout(() => target.classList.remove('is-highlight'), 1600);
        }
        /* 只跳转一次：后续标记掌握/重渲染不再被旧锚点拉回去 */
        history.replaceState(null, '', `#/chapter/${currentRoute.param}`);
        currentRoute.query = new URLSearchParams();
      }
      if (currentRoute.name === 'courses' && currentRoute.query.get('chapter')) {
        const target = document.getElementById(`course-${currentRoute.query.get('chapter')}`);
        if (target) {
          target.scrollIntoView({ block: 'center', behavior: 'smooth' });
          target.classList.add('is-highlight');
          setTimeout(() => target.classList.remove('is-highlight'), 1600);
        }
        history.replaceState(null, '', '#/courses');
        currentRoute.query = new URLSearchParams();
      }
      if (currentRoute.name === 'formulas') applyFormulaFilter();
    });

    if (currentRoute.name === 'exam' && examSession && !examSession.finished) {
      startExamTimer();
    }
  }

  function navigate(hash) {
    if (location.hash === hash) return;
    location.hash = hash;
  }

  /* ------------------------------ Shell ------------------------------ */
  function updateShell() {
    $('#sidebarNav').innerHTML = renderSidebarNav();
    const m = mastery();
    $('#sideOverall').textContent = `${m}%`;
    $('#sideBar').style.width = `${m}%`;
    $('#streakTop').textContent = streak();
    $('#crumbs').innerHTML = renderCrumbs();
    const open = $('#sidebar').classList.contains('open');
    $('.menu-btn')?.setAttribute('aria-expanded', String(open));
  }

  function renderSidebarNav() {
    const r = currentRoute;
    const chapterLink = c => {
      const active = (r.name === 'chapter' || r.name === 'quiz') && r.param === c.id;
      const pct = chapterPct(c.id);
      return `<a class="nav-sub${active ? ' active' : ''}" href="#/chapter/${c.id}"${active ? ' aria-current="page"' : ''}>
        <span class="dot"></span><span>${esc(c.title)}</span>
        <span class="nav-pct">${pct ? pct + '%' : ''}</span>
      </a>`;
    };
    const top = (name, href, ico, label, extra = '') => {
      const active = r.name === name;
      return `<a class="nav-item${active ? ' active' : ''}" href="${href}"${active ? ' aria-current="page"' : ''}>
        ${icon(ico)}<span>${label}</span>${extra}
      </a>`;
    };

    let html = `<div class="nav">${top('home', '#/home', 'home', '首页')}</div>`;
    SUBJECTS.forEach(subject => {
      const list = CHAPTERS.filter(c => c.subject === subject);
      if (!list.length) return;
      html += `<div class="sidebar-label">${SUBJECT_NAME[subject]}</div><div class="nav">`;
      html += list.map(chapterLink).join('');
      html += `</div>`;
    });
    html += `<div class="sidebar-label">训练工具</div><div class="nav">`;
    html += top('rank', '#/rank', 'trophy', '学习榜单');
    html += top('practice', '#/practice', 'pen', '课后习题',
      `<span class="nav-count">${TOTAL_PRACTICE}</span>`);
    html += top('courses', '#/courses', 'play', '学习课程');
    html += top('exam', '#/exam', 'exam', '综合测试');
    html += top('mistakes', '#/mistakes', 'mistakes', '错题本',
      `<span class="nav-count">${wrongList().length || ''}</span>`);
    html += top('formulas', '#/formulas', 'formulas', '公式手册');
    html += top('plan', '#/plan', 'plan', '复习计划');
    html += `</div>`;
    return html;
  }

  function renderCrumbs() {
    const r = currentRoute;
    const parts = [{ label: '首页', href: '#/home' }];
    if (r.name === 'chapter' && chapterById.has(r.param)) {
      const c = chapterById.get(r.param);
      parts.push({ label: SUBJECT_NAME[c.subject] });
      parts.push({ label: c.title });
    } else if (r.name === 'quiz') {
      if (r.param === 'mistakes') {
        parts.push({ label: '错题重练' });
      } else if (chapterById.has(r.param)) {
        const c = chapterById.get(r.param);
        parts.push({ label: SUBJECT_NAME[c.subject] });
        parts.push({ label: c.title, href: `#/chapter/${c.id}` });
        parts.push({ label: '章节测试' });
      }
    } else if (r.name === 'exam') {
      if (SUBJECTS.includes(r.param)) {
        parts.push({ label: SUBJECT_NAME[r.param], href: '#/exam' });
        parts.push({ label: '综合测试' });
      } else {
        parts.push({ label: '综合测试' });
      }
    }
    else if (r.name === 'mistakes') parts.push({ label: '错题本' });
    else if (r.name === 'formulas') parts.push({ label: '公式手册' });
    else if (r.name === 'plan') parts.push({ label: '复习计划' });
    else if (r.name === 'courses') parts.push({ label: '学习课程' });
    else if (r.name === 'rank') parts.push({ label: '学习榜单' });
    else if (r.name === 'practice') parts.push({ label: '课后习题' });
    return parts.map((p, i) => {
      if (i === parts.length - 1) return `<span class="current">${esc(p.label)}</span>`;
      return `<a href="${p.href || '#/home'}">${esc(p.label)}</a><span class="sep">/</span>`;
    }).join('');
  }

  /* ------------------------------ Home ------------------------------ */
  function renderHome() {
    const m = mastery();
    const next = nextLearning();
    const wrong = wrongList();
    const weak = weakestChapter();
    const read = TOTAL_KPS - CHAPTERS.reduce((n, c) => n + (c.kps.length - readCount(c)), 0);
    const nextHref = `#/chapter/${next.chapter.id}?kp=${next.kp.id}`;
    const ringC = 2 * Math.PI * 70;
    const dash = ringC * (1 - m / 100);

    const hero = `
      <header class="hero">
        <div class="hero-main">
          <div class="hero-kicker">2026 · 大一上期末复习</div>
          <h1>把高数线代制图，<br>学成一条<em>清晰的路</em>。</h1>
          <p class="hero-sub">同济《高等数学》第七版上册 ×《线性代数》第六版 × 机械制图。${TOTAL_KPS} 个知识点、${TOTAL_Q} 道原创精练，从框架到题型，再到错题清零。</p>
          <div class="hero-actions">
            <a class="btn btn-primary btn-lg" href="${nextHref}">${icon('play')}继续学习 · ${esc(next.kp.title)}</a>
            <a class="btn btn-ghost btn-lg" href="#/exam">${icon('exam')}开始综合测试</a>
          </div>
          <div class="hero-stats">
            <div class="hero-stat"><b>${read}<span style="font-size:12px;color:#8fa4b8"> / ${TOTAL_KPS}</span></b><span>知识点已掌握</span></div>
            <div class="hero-stat"><b>${state.stats.answered}</b><span>累计答题</span></div>
            <div class="hero-stat"><b>${accuracy()}%</b><span>整体正确率</span></div>
          </div>
        </div>
        <div class="hero-panel">
          <div class="ring">
            <svg viewBox="0 0 160 160" aria-hidden="true">
              <circle class="track" cx="80" cy="80" r="70"></circle>
              <circle class="value" cx="80" cy="80" r="70" stroke-dasharray="${ringC.toFixed(1)}" stroke-dashoffset="${dash.toFixed(1)}"></circle>
            </svg>
            <div class="ring-center"><b>${m}%</b><span>总掌握度</span></div>
          </div>
          <div class="hero-panel-note">
            <strong>${streak() ? `已连续学习 ${streak()} 天` : '今天，从第一页开始'}</strong>
            <span>进度自动保存在本地浏览器</span>
          </div>
        </div>
      </header>`;

    const quick = `
      <section class="section" aria-label="今日路线">
        <div class="section-head">
          <div><div class="eyebrow">TODAY'S ROUTE</div><h2>今天，先做这三件事</h2></div>
          <span class="head-link">${icon('spark')}按顺序完成，不用贪多</span>
        </div>
        <div class="quick-grid">
          <article class="quick-card">
            <div class="quick-top"><div class="quick-icon">${icon('book')}</div><span class="quick-label">01 · 继续</span></div>
            <h3>${esc(next.chapter.title)} · ${esc(next.kp.title)}</h3>
            <p>${esc(next.kp.summary)}</p>
            <div class="quick-foot"><span class="chip">${esc(SUBJECT_SHORT[next.chapter.subject] || '')}</span><a class="go" href="${nextHref}">去学习 ${icon('arrowRight')}</a></div>
          </article>
          <article class="quick-card">
            <div class="quick-top"><div class="quick-icon">${icon('target')}</div><span class="quick-label">02 · 补弱</span></div>
            <h3>${weak ? `${esc(weak.title)} · 掌握度 ${chapterPct(weak.id)}%` : '先完成一次章节测试'}</h3>
            <p>${weak ? '这是目前掌握度最低的一章。先回看知识卡，再完整做一遍本章测试。' : '任选一章完成章节测试，系统会记录正确率，帮你找到薄弱点。'}</p>
            <div class="quick-foot"><span class="chip ${weak ? 'gold' : ''}">${weak ? '薄弱章节' : '等待测试'}</span>
              <a class="go" href="${weak ? `#/quiz/${weak.id}?retry=1` : '#/quiz/calc-1?retry=1'}">${weak ? '去强化' : '开始测试'} ${icon('arrowRight')}</a></div>
          </article>
          <article class="quick-card">
            <div class="quick-top"><div class="quick-icon">${icon('mistakes')}</div><span class="quick-label">03 · 清零</span></div>
            <h3>${wrong.length ? `错题本还有 ${wrong.length} 道题` : '错题本已经清空'}</h3>
            <p>${wrong.length ? '答对一次会自动移出。先重做，再对照解析说清“为什么错”。' : '保持住。每道错题都值得被彻底讲明白，而不是只看一眼答案。'}</p>
            <div class="quick-foot"><span class="chip ${wrong.length ? 'red' : 'teal'}">${wrong.length ? '待复习' : '已清零'}</span>
              <a class="go" href="#/mistakes">${wrong.length ? '去复盘' : '看看错题本'} ${icon('arrowRight')}</a></div>
          </article>
        </div>
      </section>`;

    const subjectBlocks = SUBJECTS.map((subject, si) => {
      const list = CHAPTERS.filter(c => c.subject === subject);
      if (!list.length) return '';
      const pct = subjectPct(subject);
      const color = subjectColor(subject);
      return `
        <section class="subject-block">
          <div class="subject-head">
            <div class="subject-title">
              <span class="num">${pad2(si + 1)}</span>
              <h2>${SUBJECT_NAME[subject]}</h2>
              <span>${list.length} 章 · ${list.reduce((n, c) => n + c.kps.length, 0)} 个知识点</span>
            </div>
            <div class="subject-progress"><div class="progress ${color}"><i style="width:${pct}%"></i></div><b>${pct}%</b></div>
          </div>
          <div class="chapter-grid">
            ${list.map(c => {
              const cp = chapterPct(c.id);
              const tags = c.tags.slice(0, 2).map((t, i) => `<span class="chip ${i === 0 ? (color || 'accent') : ''}">${esc(t)}</span>`).join('');
              return `<a class="chapter-card" href="#/chapter/${c.id}" data-subject="${subject}">
                <div class="cc-top"><span class="cc-index">CHAPTER ${pad2(c.order)}</span><div class="cc-tags">${tags}</div></div>
                <div class="cc-title"><h3>${esc(c.title)}</h3><span class="en">${esc(c.en)}</span></div>
                <p class="cc-desc">${esc(c.intro)}</p>
                <div class="cc-bottom">
                  <div class="progress ${color}"><i style="width:${cp}%"></i></div>
                  <span class="cc-pct">${cp}%</span>
                  <span class="cc-go">${icon('arrowRight')}</span>
                </div>
              </a>`;
            }).join('')}
          </div>
        </section>`;
    }).join('');

    const tips = `
      <div class="home-cols">
        <section class="panel tips-panel">
          <h2>像刷 750 题一样，但别只刷题</h2>
          <p>把“题型分类 + 三步法 + 错题复盘”拆成可以每天执行的动作；配合网课时，先听思路，再关掉视频自己写一遍。</p>
          ${TIPS.map((t, i) => `<div class="tip"><span class="tip-num">${i + 1}</span><div><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p><span class="chip">${esc(t.tag)}</span></div></div>`).join('')}
        </section>
        <section class="panel heat-panel">
          <h2>最近 28 天</h2>
          <p>每一个小格，都是你坐下来学了一会儿的证据。</p>
          <div class="heatmap">${heatmapCells()}</div>
          <div class="heat-legend"><span>${state.stats.answered} 次作答</span><span class="scale"><i></i><i></i><i></i><i></i><i></i><span>更多</span></span></div>
        </section>
      </div>`;

    const examBanner = `
      <section class="exam-banner">
        <div>
          <h2>高数、线代、制图，分开检验</h2>
          <p>每科一张独立卷，45 分钟；交卷后只按本学科章节拆解正确率。</p>
        </div>
        <div class="banner-actions">
          <a class="btn btn-soft" href="#/plan">${icon('plan')}按考试时间校准</a>
          <a class="btn btn-accent" href="#/exam">${icon('clock')}进入综合测试</a>
        </div>
      </section>`;

    return hero + quick + subjectBlocks + tips + examBanner;
  }

  function heatmapCells() {
    const cells = [];
    const d = new Date();
    d.setDate(d.getDate() - 27);
    for (let i = 0; i < 28; i++) {
      const key = todayKey(d);
      const n = state.days[key] || 0;
      const level = n === 0 ? 0 : n < 3 ? 1 : n < 7 ? 2 : n < 14 ? 3 : 4;
      cells.push(`<span class="heat-cell" data-level="${level}" title="${key} · ${n} 次作答"></span>`);
      d.setDate(d.getDate() + 1);
    }
    return cells.join('');
  }

  /* ------------------------------ Chapter ------------------------------ */
  function renderChapter(id) {
    const c = chapterById.get(id);
    if (!c) return renderNotFound();
    const qs = chapterQuestions(id);
    const pct = chapterPct(id);
    const read = readCount(c);
    const best = quizBest(id);
    const subjectChapters = CHAPTERS.filter(x => x.subject === c.subject);
    const idx = subjectChapters.indexOf(c);
    const prev = subjectChapters[idx - 1];
    const next = subjectChapters[idx + 1];
    const mark = c.subject === 'calc' ? '∫' : c.subject === 'drawing' ? '图' : 'A';

    const metaChips = [
      `<span class="chip accent">${esc(c.weight)}</span>`,
      `<a class="chip" href="#/courses?chapter=${c.id}">${c.subject === 'drawing' ? '教材主线' : '配套课程'}</a>`,
      `<span class="chip">${esc(c.bookRef || '')}</span>`,
      `<span class="chip">${icon('clock')} ${esc(c.hours)}</span>`,
      `<span class="chip">${c.kps.length} 个知识点</span>`,
      `<span class="chip">${qs.length} 道原创题</span>`
    ].join('');

    const hero = `
      <header class="chapter-hero" data-subject="${c.subject}" data-mark="${mark}">
        <div class="chapter-hero-top">
          <div>
            <div class="hero-kicker" style="color:var(--accent)">CHAPTER ${pad2(c.order)} · ${SUBJECT_NAME[c.subject]}</div>
            <h1>${esc(c.title)}</h1>
            <div class="en">${esc(c.en)}</div>
          </div>
          <a class="btn btn-soft btn-sm" href="#/formulas">${icon('formulas')}公式手册</a>
        </div>
        <p class="chapter-intro">${esc(c.intro)}</p>
        <div class="chapter-meta">${metaChips}</div>
        <div class="chapter-progress-row">
          <b>${pct}%</b><div class="progress ${subjectColor(c.subject)}"><i style="width:${pct}%"></i></div>
          <small>已读 ${read}/${c.kps.length} · 测试最佳 ${best}/${qs.length}</small>
          <a class="btn btn-primary btn-sm" href="#/quiz/${c.id}?retry=1">${icon('play')}开始刷题</a>
        </div>
      </header>`;

    const map = `
      <div class="map-wrap">
        <div class="map-title">本章知识地图</div>
        <div class="map-flow">
          ${c.map.map((s, i) => `<div class="map-step"><b>${pad2(i + 1)} ${esc(s.t)}</b><span>${esc(s.d)}</span></div>`).join('')}
        </div>
      </div>`;

    const chips = c.drills.map(d => `<span class="chip">${esc(d)}</span>`).join('');
    const kps = `
      <div class="drills-row" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:18px;align-items:center">
        <span style="color:var(--faint);font-size:10px;letter-spacing:.08em;margin-right:2px">题型清单</span>${chips}
      </div>
      <div class="kp-list">
        ${c.kps.map((kp, i) => renderKp(c, kp, i)).join('')}
      </div>`;

    const examples = `
      <section class="examples-block">
        <div class="examples-head">
          <div><h2>典型例题</h2><p>先遮住答案自己写，再展开对照步骤。</p></div>
          <span class="chip gold">${c.examples.length} 道 · 覆盖高频题型</span>
        </div>
        ${c.examples.map((ex, i) => renderExample(ex, i)).join('')}
      </section>`;

    const cta = `
      <section class="chapter-quiz-cta">
        <div>
          <h2>${best ? '再刷一遍，把正确率推上去' : `用 ${qs.length} 道题，检验这一章`}</h2>
          <p>${best ? `当前最佳 ${best}/${qs.length}。重点看错题解析，再决定要不要重刷。` : '做完立刻出分，答错自动进入错题本。'}</p>
        </div>
        <a class="btn btn-accent" href="#/quiz/${c.id}?retry=1">${icon('play')}${best ? '再练一次' : '开始章节测试'}</a>
      </section>`;

    const nav = `
      <nav class="chapter-nav" aria-label="章节切换">
        ${prev ? `<a href="#/chapter/${prev.id}" class="prev"><span>← 上一章</span><b>${esc(prev.title)}</b></a>` : '<span></span>'}
        ${next ? `<a href="#/chapter/${next.id}" class="next"><span>下一章 →</span><b>${esc(next.title)}</b></a>` : '<span></span>'}
      </nav>`;

    return `<div class="chapter-page">${hero}${map}${kps}${examples}${cta}${nav}</div>`;
  }

  function renderKp(c, kp, i) {
    const read = !!state.read[kp.id];
    const formulas = kp.formulas.map(f => {
      const wide = f.tex.includes('\\begin{aligned}') || f.tex.length > 82;
      return `
      <div class="formula-box${wide ? ' wide' : ''}">
        <span class="label">${esc(f.label)}</span>
        <div class="formula-tex">${displayMath(f.tex)}</div>
      </div>`;
    }).join('');
    return `
      <article class="kp-card${read ? ' is-read' : ''}" id="${kp.id}">
        <div class="kp-head">
          <span class="kp-num">${pad2(i + 1)}</span>
          <div class="kp-head-main">
            <div class="kp-title-row">
              <h2>${esc(kp.title)}</h2>
              <span class="chip ${chipClass(kp.tag)}">${esc(kp.tag)}</span>
            </div>
            <p class="kp-summary">${esc(kp.summary)}</p>
          </div>
          <button class="kp-toggle${read ? ' on' : ''}" type="button" data-action="toggle-kp" data-id="${kp.id}" aria-pressed="${read}">
            ${icon('check')}<span>${read ? '已掌握' : '标记掌握'}</span>
          </button>
        </div>
        <div class="kp-formulas">${formulas}</div>
        <ul class="kp-points">${kp.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
        <div class="callouts">
          <div class="callout tip"><b>${icon('bulb')}口诀 · 抓手</b>${esc(kp.mnemonic)}</div>
          <div class="callout warn"><b>${icon('alert')}易错提醒</b>${esc(kp.pitfall)}</div>
        </div>
      </article>`;
  }

  function renderExample(ex, i) {
    return `
      <details class="example">
        <summary>
          <span class="ex-mark">例</span>
          <span class="ex-title">${esc(ex.title)}</span>
          <span class="chip ${chipClass(ex.tag)} ex-tag">${esc(ex.tag)}</span>
          ${icon('chevronDown', 'ex-chevron')}
        </summary>
        <div class="example-body">
          <div class="example-q">${raw(ex.question)}</div>
          <ol class="example-steps">${ex.steps.map(s => `<li>${raw(s)}</li>`).join('')}</ol>
          <div class="example-answer"><b>答案</b>${raw(ex.answer)}</div>
        </div>
      </details>`;
  }

  /* ------------------------------ Answer grading ------------------------------ */
  function normalizeFill(v) {
    return String(v ?? '')
      .trim()
      .toLowerCase()
      .replace(/[−–—]/g, '-')
      .replace(/[{}]/g, '')
      .replace(/\s+/g, '')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt');
  }

  function numericValue(v) {
    const s = normalizeFill(v);
    if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
    const m = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
    if (m && Number(m[2]) !== 0) return Number(m[1]) / Number(m[2]);
    return null;
  }

  function evaluate(q, value) {
    if (q.type === 'fill') {
      const accepted = q.accept || [q.answer];
      const n = normalizeFill(value);
      if (accepted.some(a => normalizeFill(a) === n)) return true;
      const a = numericValue(value), b = numericValue(q.answer);
      return a !== null && b !== null && Math.abs(a - b) < 1e-4;
    }
    return Number(value) === Number(q.answer);
  }

  function answerHTML(q) {
    if (q.type === 'fill') return raw(q.answerText || inlineMath(q.answer));
    if (q.type === 'judge') return raw(q.options[q.answer]);
    return `${String.fromCharCode(65 + q.answer)}. ${raw(q.options[q.answer])}`;
  }

  function userAnswerHTML(q, value) {
    if (value === undefined || value === null || value === '') return '<span style="color:var(--red)">未作答</span>';
    if (q.type === 'fill') return esc(value);
    return raw(q.options[value]) || esc(value);
  }

  function recordResult(q, correct) {
    state.stats.answered += 1;
    if (correct) {
      state.stats.correct += 1;
      const prev = state.wrong[q.id];
      if (!prev?.manual) delete state.wrong[q.id];
    } else {
      const prev = state.wrong[q.id];
      state.wrong[q.id] = {
        count: (prev?.count || 0) + 1,
        lastAt: Date.now(),
        chapter: q.chapter,
        manual: !!prev?.manual
      };
    }
    markActivity(1);
  }

  function recordMany(items) {
    items.forEach(({ q, correct }) => {
      state.stats.answered += 1;
      if (correct) {
        state.stats.correct += 1;
        const prev = state.wrong[q.id];
        if (!prev?.manual) delete state.wrong[q.id];
      } else {
        const prev = state.wrong[q.id];
        state.wrong[q.id] = { count: (prev?.count || 0) + 1, lastAt: Date.now(), chapter: q.chapter, manual: !!prev?.manual };
      }
    });
    markActivity(items.length);
    saveState();
  }

  /* ------------------------------ Quiz ------------------------------ */
  function createQuizSession(param, force = false) {
    if (!force && quizSession && quizSession.param === param) return quizSession;
    let qs = [], title = '', chapterId = param;
    if (param === 'mistakes') {
      const list = wrongList();
      if (!list.length) return null;
      qs = list.map(x => x.q).slice(0, 20);
      title = '错题重练';
    } else {
      const c = chapterById.get(param);
      if (!c) return null;
      qs = chapterQuestions(param);
      title = `${c.title} · 章节测试`;
    }
    quizSession = {
      param,
      chapterId,
      title,
      qs,
      index: 0,
      responses: {},
      selected: null,
      startedAt: Date.now(),
      finished: false,
      finishedAt: null
    };
    return quizSession;
  }

  function renderQuiz(param) {
    if (param === 'practice') {
      if (!quizSession?.practice) return renderPractice();
      return quizSession.finished ? renderQuizResult(quizSession) : renderQuizQuestion(quizSession);
    }
    if (currentRoute.query.get('retry') === '1' && quizSession?.param === param && quizSession.finished) {
      quizSession = createQuizSession(param, true);
    }
    if (quizSession && quizSession.param === param) {
      return quizSession.finished ? renderQuizResult(quizSession) : renderQuizQuestion(quizSession);
    }
    if (param === 'mistakes' && !wrongList().length) {
      return `<div class="mistakes-page">${emptyMistakes()}</div>`;
    }
    const s = createQuizSession(param);
    if (!s) return renderNotFound();
    return renderQuizQuestion(s);
  }

  function quizBackLink(s) {
    if (s.param === 'practice') return '#/practice';
    return s.param === 'mistakes' ? '#/mistakes' : `#/chapter/${s.param}`;
  }

  function renderQuizQuestion(s) {
    const q = s.qs[s.index];
    const c = chapterById.get(q.chapter);
    const response = s.responses[q.id];
    const answered = !!response;
    const isLast = s.index === s.qs.length - 1;
    const answerCount = Object.keys(s.responses).length;
    const bars = s.qs.map((item, i) => {
      const r = s.responses[item.id];
      const cls = r ? (r.correct ? 'right' : 'wrong') : (i === s.index ? 'current' : '');
      return `<i class="${cls}"></i>`;
    }).join('');

    let body = '';
    if (q.type === 'fill') {
      const val = response ? response.value : (s.selected ?? '');
      let cls = '';
      if (response) cls = response.correct ? 'correct' : 'wrong';
      body = `<div class="fill-wrap">
        <label class="fill-label" for="quizFill">填写答案</label>
        <input id="quizFill" class="fill-input ${cls}" type="text" autocomplete="off" spellcheck="false"
          value="${escAttr(val)}" placeholder="输入最简结果，如 3/5" ${answered ? 'disabled' : ''}>
        <div class="fill-hint">支持分数、小数、e^x、pi/4 等写法。不确定时先写思路，再看解析。</div>
      </div>`;
    } else {
      body = `<div class="options" id="quizOptions">${q.options.map((opt, i) => {
        let cls = 'option';
        if (answered) {
          if (i === q.answer) cls += ' correct';
          else if (i === response.value) cls += ' wrong';
        } else if (i === s.selected) cls += ' selected';
        return `<button class="${cls}" type="button" data-action="quiz-select" data-index="${i}" ${answered ? 'disabled' : ''}>
          <span class="letter">${String.fromCharCode(65 + i)}</span>
          <span class="option-tex">${raw(opt)}</span>
        </button>`;
      }).join('')}</div>`;
    }

    const feedback = answered ? `<div class="feedback ${response.correct ? 'ok' : 'no'}" role="status" aria-live="polite">
      <div class="feedback-head">${icon(response.correct ? 'check' : 'alert')}${response.correct ? '回答正确' : '再看一眼'}</div>
      <div class="feedback-answer">正确答案：${answerHTML(q)}${q.type !== 'fill' ? '' : `　你的答案：${esc(response.value)}`}</div>
      <div class="feedback-explain">${raw(q.explain)}</div>
      ${!response.correct ? renderCourseHint(q.chapter) : ''}
    </div>` : '';

    const actions = answered
      ? `<button class="btn btn-primary" type="button" data-action="quiz-next">${isLast ? '查看结果' : '下一题'} ${icon('arrowRight')}</button>`
      : `<button class="btn btn-primary" id="quizConfirm" type="button" data-action="quiz-confirm" ${s.selected === null || s.selected === '' ? 'disabled' : ''}>确认答案 ${icon('check')}</button>`;

    const inWrong = !!state.wrong[q.id];
    const side = `<aside class="quiz-side">
      <div class="quiz-side-card">
        <div class="quiz-side-kicker">QUICK CAPTURE · 随手记</div>
        <h3>这道题要留下吗？</h3>
        <p>蒙对、思路不熟、想二刷的题，也可以手动加入错题本。</p>
        <button class="quiz-side-add${inWrong ? ' added' : ''}" type="button" data-action="toggle-mistake" data-id="${q.id}">
          ${icon(inWrong ? 'check' : 'mistakes')} ${inWrong ? '已在错题本 · 移出' : '加入错题本'}
        </button>
        <div class="quiz-side-note">${inWrong ? '已加入，之后可在错题本单独重练。' : '不要求答错，答对也可以加入。'}</div>
      </div>
      <div class="quiz-side-card quiz-side-meta">
        <div class="quiz-side-kicker">THIS ROUND</div>
        <div class="quiz-side-stats">
          <div><b>${answerCount}</b><span>已答</span></div>
          <div><b>${s.qs.length}</b><span>本组题</span></div>
        </div>
        <div class="quiz-side-hint">${icon('bulb')} 先自己讲一遍思路，再决定要不要加入。</div>
      </div>
    </aside>`;

    return `<div class="quiz-page">
      <div class="quiz-top">
        <div class="quiz-top-left">
          <a class="quiz-back" href="${quizBackLink(s)}" aria-label="返回">${icon('arrowLeft')}</a>
          <div class="quiz-title-sm">${esc(c ? c.title : '错题本')}<b>${esc(s.title)}</b></div>
        </div>
        <div class="quiz-counter">${s.index + 1}<span> / ${s.qs.length}</span></div>
      </div>
      <div class="quiz-progress" aria-hidden="true">${bars}</div>
      <div class="quiz-layout">
      <div class="q-card">
        <div class="q-meta">
          <span class="chip accent">${q.type === 'fill' ? '填空题' : q.type === 'judge' ? '判断题' : '单项选择题'}</span>
          <span class="chip ${chipClass(q.level)}">${esc(q.level)}</span>
          <span class="chip">${esc(c ? c.title : '')}</span>
        </div>
        <div class="q-stem">${raw(q.stem)}</div>
        ${body}
        ${feedback}
        <div class="q-actions">
          <span class="left">第 ${s.index + 1} 题 · 已完成 ${answerCount}/${s.qs.length}</span>
          <div class="right">${actions}</div>
        </div>
      </div>
      ${side}
      </div>
    </div>`;
  }

  function submitQuizAnswer() {
    const s = quizSession;
    if (!s || s.finished) return;
    const q = s.qs[s.index];
    if (s.responses[q.id]) return;
    let value = s.selected;
    if (q.type === 'fill') {
      value = String(value ?? '').trim();
      if (!value) { toast('先写下你的答案'); return; }
    }
    if (value === null || value === undefined || value === '') { toast('先选择一个答案'); return; }
    const correct = evaluate(q, value);
    s.responses[q.id] = { value, correct };
    recordResult(q, correct);
    saveState();
    s.selected = null;
    renderRoute({ keepScroll: true });
  }

  function nextQuizQuestion() {
    const s = quizSession;
    if (!s) return;
    if (s.index < s.qs.length - 1) {
      s.index += 1;
      s.selected = null;
      renderRoute({ keepScroll: true });
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    const s = quizSession;
    if (!s) return;
    const total = s.qs.length;
    const correct = s.qs.filter(q => s.responses[q.id]?.correct).length;
    s.finished = true;
    s.finishedAt = Date.now();
    s.correct = correct;
    if (s.param !== 'mistakes' && !s.practice) {
      const prev = state.quiz[s.param] || { best: 0, attempts: 0 };
      state.quiz[s.param] = {
        best: Math.max(prev.best || 0, correct),
        attempts: (prev.attempts || 0) + 1,
        last: correct,
        total,
        at: Date.now()
      };
      state.lastChapter = s.param;
    }
    saveState();
    if (currentRoute.query.get('retry') === '1') {
      history.replaceState(null, '', `#/quiz/${s.param}`);
      currentRoute.query = new URLSearchParams();
    }
    renderRoute({ keepScroll: false });
    toast(s.practice
      ? (correct === total ? '课后习题全对，继续保持' : '课后练习完成，错题已进入错题本')
      : (correct === total ? '全对，这一章可以放心了' : '已记录成绩，错题自动进入错题本'));
  }

  function quizResultTitle(score) {
    if (score >= 90) return '稳了，这一章可以过';
    if (score >= 75) return '不错，再补两个漏洞';
    if (score >= 60) return '基础还在，重点回看错题';
    return '先回知识点，别急着刷题';
  }

  function renderQuizResult(s) {
    const total = s.qs.length;
    const correct = s.correct ?? s.qs.filter(q => s.responses[q.id]?.correct).length;
    const score = Math.round(correct / total * 100);
    const used = Math.max(1, Math.round(((s.finishedAt || Date.now()) - s.startedAt) / 1000));
    const c = chapterById.get(s.param);
    const review = s.qs.map(q => renderReviewItem(q, s.responses[q.id])).join('');
    return `<div class="result">
      <div class="result-hero">
        <div class="result-kicker">${s.practice ? 'AFTER-CLASS · 课后习题' : s.param === 'mistakes' ? '错题重练 · 完成' : 'CHAPTER TEST · 完成'}</div>
        <div class="result-score">${score}<small>分</small></div>
        <div class="result-title">${quizResultTitle(score)}</div>
        <div class="result-sub">答对 ${correct} / ${total} 题 · 用时 ${formatTime(used)} · ${esc(s.practice ? '课后习题' : c ? c.title : '错题本')}</div>
        <div class="result-stats">
          <div class="result-stat"><b>${correct}</b><span>答对</span></div>
          <div class="result-stat"><b>${total - correct}</b><span>答错</span></div>
          <div class="result-stat"><b>${score}%</b><span>正确率</span></div>
        </div>
        <div class="result-actions">
          <button class="btn btn-primary" type="button" data-action="quiz-retry">${icon('refresh')}再练一次</button>
          ${s.practice
            ? `<a class="btn btn-soft" href="#/practice">${icon('pen')}回到课后习题</a>`
            : s.param === 'mistakes'
              ? `<a class="btn btn-soft" href="#/mistakes">${icon('mistakes')}回到错题本</a>`
              : `<a class="btn btn-soft" href="#/chapter/${s.param}">${icon('book')}回看知识点</a>`}
          <a class="btn btn-ghost" href="#/home">${icon('home')}学习总览</a>
        </div>
      </div>
      <div class="result-review">
        <div class="section-head" style="margin-bottom:8px"><div><div class="eyebrow">REVIEW</div><h2 style="font-size:21px">逐题复盘</h2></div><span class="head-link">点“解析”展开</span></div>
        ${review}
      </div>
    </div>`;
  }

  function renderReviewItem(q, response, index) {
    const c = chapterById.get(q.chapter);
    const ok = !!response?.correct;
    const unanswered = !response || response.value === undefined || response.value === null || response.value === '';
    return `<article class="review-item ${ok ? 'ok' : 'no'}">
      <span class="ri-mark">${ok ? '✓' : '×'}</span>
      <div class="ri-main">
        <div class="ri-stem">${raw(q.stem)}</div>
        <div class="ri-meta">
          <span class="chip">${esc(c ? c.title : '')}</span>
          <span class="chip">${esc(q.level)}</span>
          ${unanswered ? '<span class="chip red">未作答</span>' : ''}
        </div>
        <div class="ri-explain">
          <div><b>你的答案：</b>${userAnswerHTML(q, response?.value)}</div>
          <div style="margin-top:4px"><b>正确答案：</b>${answerHTML(q)}</div>
          <div style="margin-top:4px">${raw(q.explain)}</div>
          ${!ok ? renderCourseHint(q.chapter) : ''}
        </div>
      </div>
      <button class="ri-toggle" type="button" data-action="toggle-review">解析</button>
    </article>`;
  }

  /* ------------------------------ Exam ------------------------------ */
  function examSubjectChapters(subject) {
    return CHAPTERS.filter(c => c.subject === subject);
  }

  function sampleExamQuestions(subject) {
    const chapters = examSubjectChapters(subject);
    const pools = chapters.map(c => ({ c, qs: shuffle(chapterQuestions(c.id)) }));
    const picked = [];
    pools.forEach(p => { if (p.qs.length) picked.push(p.qs.pop()); });
    const rest = shuffle(pools.flatMap(p => p.qs));
    while (picked.length < 20 && rest.length) picked.push(rest.pop());
    return shuffle(picked).slice(0, 20);
  }

  function beginExam(subject) {
    if (!SUBJECTS.includes(subject)) return;
    examSession = {
      subject,
      qs: sampleExamQuestions(subject),
      index: 0,
      responses: {},
      startedAt: Date.now(),
      duration: 45 * 60,
      finished: false,
      finishedAt: null
    };
    renderRoute({ keepScroll: false });
  }

  function renderExam(subject) {
    const subj = SUBJECTS.includes(subject) ? subject : null;
    if (!subj) return renderExamHub();
    if (examSession && examSession.subject !== subj) examSession = null;
    if (examSession?.finished) return renderExamResult();
    if (examSession) return renderExamRun();
    return renderExamIntro(subj);
  }

  function renderExamHub() {
    const cards = SUBJECTS.map(subject => {
      const chapters = examSubjectChapters(subject);
      const pool = chapters.reduce((n, c) => n + chapterQuestions(c.id).length, 0);
      const total = Math.min(20, pool);
      const last = state.exams.find(h => h.subject === subject);
      return `<a class="exam-hub-card" href="#/exam/${subject}" data-subject="${subject}">
        <div class="exam-hub-top"><span class="chip ${subjectColor(subject) || 'accent'}">${SUBJECT_NAME[subject]}</span><span>${chapters.length} 章</span></div>
        <h2>${SUBJECT_NAME[subject]}综合测试</h2>
        <p>${total} 道题 · 45 分钟 · 100 分制</p>
        <div class="exam-hub-foot">
          <span>${last ? `上次 ${last.correct}/${last.total} · ${formatDate(last.at)}` : '还没有考试记录'}</span>
          <b>${icon('clock')}开始</b>
        </div>
      </a>`;
    }).join('');

    return `<div class="exam-page">
      <section class="exam-intro">
        <div class="hero-kicker">FINAL SIMULATION · 综合测试</div>
        <h1>三门课，三张卷，<br>分开测才看得清。</h1>
        <p>高数、线代、机械制图各自独立抽题，不再混在一张卷子里。交卷后只按本学科章节拆解正确率。</p>
        <div class="exam-facts">
          <span class="exam-fact"><b>3</b> 个学科</span>
          <span class="exam-fact"><b>${CHAPTERS.length}</b> 章题库</span>
          <span class="exam-fact"><b>45</b> 分钟 / 卷</span>
        </div>
      </section>
      <div class="exam-hub-grid">${cards}</div>
      <div class="course-note" style="margin-top:16px">${icon('info')} 每科独立计时、独立记录成绩；进入后本次只抽本学科题目。</div>
    </div>`;
  }

  function renderExamIntro(subject) {
    const chapters = examSubjectChapters(subject);
    const pool = chapters.reduce((n, c) => n + chapterQuestions(c.id).length, 0);
    const total = Math.min(20, pool);
    const history = state.exams.filter(h => h.subject === subject).slice(0, 4);
    return `<div class="exam-page">
      <section class="exam-intro">
        <div class="hero-kicker">FINAL SIMULATION · ${SUBJECT_NAME[subject]}</div>
        <h1>${SUBJECT_NAME[subject]}综合测试，<br>只考这一门。</h1>
        <p>从${SUBJECT_NAME[subject]} ${chapters.length} 章题库中分层抽 ${total} 题。交卷后按本学科章节拆解正确率，其他学科不参与本次抽题。</p>
        <div class="exam-facts">
          <span class="exam-fact"><b>${total}</b> 道题</span>
          <span class="exam-fact"><b>45</b> 分钟</span>
          <span class="exam-fact"><b>100</b> 分制</span>
          <span class="exam-fact"><b>${chapters.length}</b> 章题库</span>
        </div>
        <button class="btn btn-lg" type="button" data-action="exam-start" data-subject="${subject}">${icon('clock')}开始${SUBJECT_SHORT[subject]}考试</button>
      </section>
      <div class="home-cols" style="margin-top:18px">
        <section class="panel tips-panel">
          <h2>考试规则</h2>
          <div class="tip"><span class="tip-num">1</span><div><h3>只抽本学科题目</h3><p>高数、线代、制图各自独立；不会再把其他学科混进来。</p></div></div>
          <div class="tip"><span class="tip-num">2</span><div><h3>时间到自动交卷</h3><p>右上角计时器归零会自动提交，已作答的内容不会丢失。</p></div></div>
          <div class="tip"><span class="tip-num">3</span><div><h3>交卷后才看解析</h3><p>考试过程中不显示对错，避免“边做边被提示”。</p></div></div>
        </section>
        <section class="panel tips-panel">
          <h2>最近成绩 · ${SUBJECT_NAME[subject]}</h2>
          ${history.length ? history.map(h => `<div class="review-item" style="margin-top:8px">
            <span class="ri-mark" style="background:var(--surface-2);color:var(--muted)">${Math.round(h.correct / h.total * 100)}</span>
            <div class="ri-main"><div class="ri-stem" style="font-size:12px">${h.correct}/${h.total} 题 · ${formatDate(h.at)}</div>
            <div class="ri-meta"><span class="chip">用时 ${formatTime(h.used)}</span></div></div>
          </div>`).join('') : `<p style="color:var(--muted);font-size:12px;margin-top:10px">还没有${SUBJECT_NAME[subject]}考试记录。第一次不用有压力，把它当成一次诊断。</p>
          <div style="margin-top:14px"><a class="btn btn-soft btn-sm" href="#/exam">${icon('arrowLeft')}返回科目选择</a></div>`}
        </section>
      </div>
    </div>`;
  }

  function examRemaining() {
    if (!examSession) return 0;
    return Math.max(0, examSession.duration - Math.floor((Date.now() - examSession.startedAt) / 1000));
  }

  function renderExamRun() {
    const s = examSession;
    const q = s.qs[s.index];
    const response = s.responses[q.id];
    const answered = !!response;
    const total = s.qs.length;
    const answeredCount = Object.keys(s.responses).length;
    const remaining = examRemaining();

    let body = '';
    if (q.type === 'fill') {
      body = `<div class="fill-wrap">
        <label class="fill-label" for="examFill">填写答案</label>
        <input id="examFill" class="fill-input" type="text" autocomplete="off" spellcheck="false"
          value="${escAttr(response?.value ?? '')}" placeholder="输入答案">
        <div class="fill-hint">考试中不显示对错，交卷后统一批改。</div>
      </div>`;
    } else {
      body = `<div class="options" id="examOptions">${q.options.map((opt, i) => `
        <button class="option${response && Number(response.value) === i ? ' selected' : ''}" type="button" data-action="exam-select" data-index="${i}">
          <span class="letter">${String.fromCharCode(65 + i)}</span>
          <span class="option-tex">${raw(opt)}</span>
        </button>`).join('')}</div>`;
    }

    return `<div class="exam-page">
      <div class="exam-run-head">
        <div class="exam-timer" id="examTimer">${icon('clock')}<span>${formatTime(remaining)}</span></div>
        <div class="exam-run-meta">第 ${s.index + 1} / ${total} 题　·　已答 <b id="examAnswered">${answeredCount}</b> / ${total}</div>
      </div>
      <div class="exam-grid">
        <div class="exam-main">
          <div class="q-card">
            <div class="q-meta">
              <span class="chip gold">${SUBJECT_NAME[s.subject]} · 综合测试</span>
              <span class="chip">${esc(chapterById.get(q.chapter)?.title || '')}</span>
              <span class="chip">${q.type === 'fill' ? '填空题' : q.type === 'judge' ? '判断题' : '单项选择题'}</span>
            </div>
            <div class="q-stem">${raw(q.stem)}</div>
            ${body}
            <div class="q-actions">
              <span class="left">${q.type === 'fill' ? '输入后自动保存' : '选择后自动保存'}</span>
              <div class="right">
                <button class="btn btn-soft" type="button" data-action="exam-prev" ${s.index === 0 ? 'disabled' : ''}>${icon('arrowLeft')}上一题</button>
                <button class="btn btn-primary" type="button" data-action="exam-next" ${s.index === total - 1 ? 'disabled' : ''}>下一题 ${icon('arrowRight')}</button>
              </div>
            </div>
          </div>
          <div class="exam-note">
            ${icon('info')}
            <span><b>答题提示</b>　不确定的题先选一个最可能的答案；交卷后会统一批改，并按章节拆解正确率。</span>
          </div>
        </div>
        <aside class="exam-palette">
          <h3>答题卡</h3>
          <div class="palette-grid" id="examPalette">
            ${s.qs.map((item, i) => `<button class="palette-btn${s.responses[item.id] ? ' answered' : ''}${i === s.index ? ' current' : ''}" type="button" data-action="exam-jump" data-index="${i}">${i + 1}</button>`).join('')}
          </div>
          <div class="palette-legend"><span><i></i>已答</span><span><i></i>当前</span></div>
          <button class="btn btn-accent" type="button" data-action="exam-submit">交卷</button>
        </aside>
      </div>
    </div>`;
  }

  function startExamTimer() {
    stopExamTimer();
    if (!examSession || examSession.finished) return;
    const tick = () => {
      if (!examSession || examSession.finished) { stopExamTimer(); return; }
      const rem = examRemaining();
      const el = $('#examTimer');
      if (el) {
        el.querySelector('span').textContent = formatTime(rem);
        el.classList.toggle('low', rem <= 300);
      }
      if (rem <= 0) {
        stopExamTimer();
        submitExam(true);
      }
    };
    tick();
    examTimer = setInterval(tick, 1000);
  }

  function stopExamTimer() {
    if (examTimer) {
      clearInterval(examTimer);
      examTimer = null;
    }
  }

  function updateExamIndicators() {
    if (!examSession) return;
    const s = examSession;
    const answered = Object.keys(s.responses).length;
    const countEl = $('#examAnswered');
    if (countEl) countEl.textContent = answered;
    $$('#examPalette .palette-btn').forEach((b, i) => {
      b.classList.toggle('answered', !!s.responses[s.qs[i].id]);
      b.classList.toggle('current', i === s.index);
    });
  }

  function submitExam(auto = false) {
    const s = examSession;
    if (!s || s.finished) return;
    const answeredCount = Object.keys(s.responses).length;
    if (!auto && answeredCount < s.qs.length) {
      const ok = window.confirm(`还有 ${s.qs.length - answeredCount} 题未作答，确定交卷吗？`);
      if (!ok) return;
    }
    stopExamTimer();
    const results = s.qs.map(q => {
      const r = s.responses[q.id];
      return { q, correct: r ? evaluate(q, r.value) : false, value: r?.value };
    });
    const correct = results.filter(r => r.correct).length;
    const used = Math.min(s.duration, Math.max(1, Math.round((Date.now() - s.startedAt) / 1000)));
    recordMany(results);
    s.results = results;
    s.correct = correct;
    s.finished = true;
    s.finishedAt = Date.now();
    s.used = used;
    state.exams.unshift({ at: Date.now(), correct, total: s.qs.length, used, subject: s.subject });
    state.exams = state.exams.slice(0, 10);
    saveState();
    renderRoute({ keepScroll: false });
    toast(auto ? '时间到，已自动交卷' : '交卷完成，看看章节拆解');
  }

  function renderExamResult() {
    const s = examSession;
    const total = s.qs.length;
    const correct = s.correct ?? s.results.filter(r => r.correct).length;
    const score = Math.round(correct / total * 100);
    const groups = new Map();
    s.results.forEach(r => {
      const id = r.q.chapter;
      const g = groups.get(id) || { total: 0, correct: 0 };
      g.total += 1;
      if (r.correct) g.correct += 1;
      groups.set(id, g);
    });
    const breakdown = [...groups.entries()].map(([id, g]) => {
      const c = chapterById.get(id);
      return `<span class="chip ${g.correct / g.total >= .6 ? 'teal' : 'red'}">${esc(c?.title || id)} ${g.correct}/${g.total}</span>`;
    }).join('');

    return `<div class="result">
      <div class="result-hero">
        <div class="result-kicker">FINAL SIMULATION · ${SUBJECT_NAME[s.subject]} · 完成</div>
        <div class="result-score">${score}<small>分</small></div>
        <div class="result-title">${score >= 85 ? '状态很好，保持手感' : score >= 60 ? '及格线以上，继续补漏洞' : '先把基础章节重新过一遍'}</div>
        <div class="result-sub">答对 ${correct} / ${total} 题 · 用时 ${formatTime(s.used || 0)} · 满分 100</div>
        <div class="result-stats">
          <div class="result-stat"><b>${correct}</b><span>答对</span></div>
          <div class="result-stat"><b>${total - correct}</b><span>答错 / 未答</span></div>
          <div class="result-stat"><b>${score}%</b><span>总正确率</span></div>
        </div>
        <div class="result-actions">
          <button class="btn btn-primary" type="button" data-action="exam-retry" data-subject="${s.subject}">${icon('refresh')}再来一套</button>
          <a class="btn btn-soft" href="#/mistakes">${icon('mistakes')}查看错题本</a>
          <a class="btn btn-ghost" href="#/exam">${icon('arrowLeft')}科目选择</a>
        </div>
      </div>
      <section class="panel" style="padding:20px 22px;margin-top:18px">
        <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <h2 style="font-family:var(--font-display);font-size:21px">章节拆解</h2>
          <span style="color:var(--muted);font-size:10.5px">正确率低于 60% 的章节优先回看</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:12px">${breakdown}</div>
      </section>
      <div class="result-review">
        <div class="section-head" style="margin-bottom:8px"><div><div class="eyebrow">REVIEW</div><h2 style="font-size:21px">逐题解析</h2></div><span class="head-link">点“解析”展开</span></div>
        ${s.results.map(r => renderReviewItem(r.q, { value: r.value, correct: r.correct })).join('')}
      </div>
    </div>`;
  }

  /* ------------------------------ Mistakes ------------------------------ */
  function emptyMistakes() {
    return `<div class="empty">
      <div class="empty-icon">${icon('mistakes')}</div>
      <h3>错题本还是空的</h3>
      <p>做章节测试或综合测试时，答错的题会自动收进来。答对一次就会移出。</p>
      <a class="btn btn-primary" href="#/quiz/calc-1">${icon('play')}先做一章测试</a>
    </div>`;
  }

  function renderMistakes() {
    const list = wrongList();
    if (!list.length) {
      return `<div class="mistakes-page">
        <div class="page-head"><div><div class="eyebrow">MISTAKE BOOK</div><h1>错题本</h1><p>错题不是收藏品。重做、讲清、移出，才算真正消化。</p></div></div>
        ${emptyMistakes()}
      </div>`;
    }
    const chapters = new Set(list.map(x => x.q.chapter));
    const totalWrong = list.reduce((n, x) => n + (x.meta.count || 1), 0);
    const items = list.map(({ q, meta }) => {
      const c = chapterById.get(q.chapter);
      return `<article class="mistake-card">
        <div class="mistake-top">
          <span class="chip">${esc(c ? c.title : '')}</span>
          <span class="chip ${chipClass(q.level)}">${esc(q.level)}</span>
          <span class="chip ${meta.manual ? 'gold' : 'red'}">${meta.manual ? '手动加入' : `错 ${meta.count || 1} 次`}</span>
          <span class="when" style="margin-left:auto">${meta.lastAt ? formatDate(meta.lastAt) : ''}</span>
        </div>
        <div class="mistake-stem">${raw(q.stem)}</div>
        <div class="mistake-answer"><b>正确答案：</b>${answerHTML(q)}<br>${raw(q.explain)}</div>
        ${renderCourseHint(q.chapter)}
        <div class="mistake-foot">
          <span class="when">来自 ${esc(c ? c.title : '')} · ${meta.manual ? '手动加入，需手动移出' : '做对后自动移出'}</span>
          <div class="acts">
            <a class="btn btn-soft btn-sm" href="#/chapter/${q.chapter}">${icon('book')}回看知识点</a>
            <button class="btn btn-ghost btn-sm" type="button" data-action="remove-mistake" data-id="${q.id}">${icon('check')}标记已掌握</button>
          </div>
        </div>
      </article>`;
    }).join('');

    return `<div class="mistakes-page">
      <div class="page-head">
        <div><div class="eyebrow">MISTAKE BOOK</div><h1>错题本</h1><p>先重做，再看解析。能独立讲清“为什么错”，才算过关。</p></div>
        <a class="btn btn-primary" href="#/quiz/mistakes?retry=1">${icon('refresh')}重做全部错题</a>
      </div>
      <div class="mistake-stats">
        <div class="m-stat hot"><b>${list.length}</b><span>待复习错题</span></div>
        <div class="m-stat"><b>${chapters.size}</b><span>涉及章节</span></div>
        <div class="m-stat"><b>${totalWrong}</b><span>累计答错次数</span></div>
      </div>
      <div class="mistake-list">${items}</div>
    </div>`;
  }

  /* ------------------------------ Courses ------------------------------ */
  function courseVideoUrl(sourceId, page, t = 0) {
    const source = COURSE_SOURCES[sourceId];
    if (!source) return '#/courses';
    return `${source.url}?p=${page}${t ? `&t=${t}` : ''}`;
  }

  function chapterCourseRef(chapterId) {
    const c = chapterById.get(chapterId);
    if (!c) return null;
    if (c.subject === 'drawing') {
      return {
        kind: 'chapter',
        href: `#/chapter/${chapterId}`,
        title: '机械制图 · 本章知识卡',
        meta: `机械制图 · 第 ${c.order} 章知识卡`,
        action: '回看知识卡'
      };
    }
    const map = COURSE_MAP.find(m => m.chapter === chapterId);
    const source = map && COURSE_SOURCES[map.course];
    if (!map || !source) return null;
    const t = (window.COURSE_TIMES || {})[chapterId]?.t || 0;
    return {
      kind: 'video',
      href: courseVideoUrl(map.course, map.start, t),
      title: `${source.title} · P${map.start}`,
      meta: `${source.teacher} · ${map.range} · 从 ${formatTime(t)} 开始`,
      action: '去听课'
    };
  }

  function renderCourseHint(chapterId) {
    const ref = chapterCourseRef(chapterId);
    if (!ref) return '';
    return `<a class="course-hint" href="${ref.href}"${ref.kind === 'video' ? ' target="_blank" rel="noopener noreferrer"' : ''}>
      <span class="course-hint-icon">${icon(ref.kind === 'video' ? 'play' : 'book')}</span>
      <span class="course-hint-main"><small>${ref.kind === 'video' ? '卡住了？回到这一节' : '卡住了？回看知识卡'}</small><b>${esc(ref.title)}</b><span>${esc(ref.meta)}</span></span>
      <span class="course-hint-go">${ref.action} ${icon('arrowRight')}</span>
    </a>`;
  }

  function renderCourses() {
    const watched = COURSE_MAP.filter(m => state.course[m.chapter]).length;
    const pct = Math.round(watched / COURSE_MAP.length * 100);

    const sources = Object.values(COURSE_SOURCES).map(s => `
      <article class="course-source" data-subject="${s.id === 'high' ? 'calc' : 'linear'}">
        <div class="course-source-mark" aria-hidden="true">${s.mark}</div>
        <div class="course-source-body">
          <div class="course-source-top">
            <span class="chip gold">B 站 · 宋浩老师官方</span>
            <span class="course-source-pages">${s.episodes}P</span>
          </div>
          <h2>${esc(s.title)}</h2>
          <div class="course-source-sub">${esc(s.teacher)} · ${esc(s.edition)}</div>
          <p>${esc(s.desc)}</p>
          <div class="course-source-meta"><span>${s.episodes} 集</span><span>${esc(s.hours)}</span><span>BV${esc(s.bvid.slice(2))}</span></div>
          <a class="btn btn-soft btn-sm" href="${s.url}?p=${s.startPage}" target="_blank" rel="noopener noreferrer">在 B 站打开 ${icon('arrowRight')}</a>
        </div>
      </article>`).join('');

    const drawingRows = CHAPTERS.filter(c => c.subject === 'drawing').map(c => {
      const done = !!state.course[c.id];
      return `<article class="course-row${done ? ' watched' : ''}" id="course-${c.id}" data-course-row="${c.id}">
        <span class="course-row-no">${pad2(c.order)}</span>
        <div class="course-row-main">
          <div class="course-row-title"><h3><a href="#/chapter/${c.id}">${esc(c.title)}</a></h3><span class="chip gold">${chapterTotal(c.id)} 题</span></div>
          <p>${esc(c.intro)}</p>
        </div>
        <div class="course-range"><b>教材第 ${c.order} 章</b><span>站内主线</span></div>
        <div class="course-row-actions">
          <a class="btn btn-ghost btn-sm" href="#/chapter/${c.id}">站内复习</a>
          <button class="btn ${done ? 'btn-soft' : 'btn-outline'} btn-sm" type="button" data-action="toggle-course" data-id="${c.id}" aria-pressed="${done}">${done ? '已看' : '标记已看'}</button>
        </div>
      </article>`;
    }).join('');
    const drawingGroup = drawingRows ? `<section class="course-group">
      <div class="course-group-head">
        <h2>机械制图 · 教材主线</h2>
        <span>8 章 · 站内知识卡与题库</span>
      </div>
      <div class="course-list">${drawingRows}</div>
    </section>` : '';

    const groups = ['calc', 'linear'].map(subject => {
      const rows = COURSE_MAP.filter(m => chapterById.get(m.chapter)?.subject === subject).map(m => {
        const c = chapterById.get(m.chapter);
        if (!c) return '';
        const done = !!state.course[m.chapter];
        return `<article class="course-row${done ? ' watched' : ''}" id="course-${c.id}" data-course-row="${c.id}">
          <span class="course-row-no">${pad2(c.order)}</span>
          <div class="course-row-main">
            <div class="course-row-title"><h3><a href="#/chapter/${c.id}">${esc(c.title)}</a></h3><span class="chip">${chapterTotal(c.id)} 题</span></div>
            <p>${esc(m.note)}</p>
          </div>
          <a class="course-range" href="${courseVideoUrl(m.course, m.start)}" target="_blank" rel="noopener noreferrer">
            <b>${esc(m.range)}</b><span>去 B 站看</span>
          </a>
          <div class="course-row-actions">
            <a class="btn btn-ghost btn-sm" href="#/chapter/${c.id}">站内复习</a>
            <button class="btn ${done ? 'btn-soft' : 'btn-outline'} btn-sm" type="button" data-action="toggle-course" data-id="${c.id}" aria-pressed="${done}">${done ? '已看' : '标记已看'}</button>
          </div>
        </article>`;
      }).join('');
      return `<section class="course-group">
        <div class="course-group-head">
          <h2>${subject === 'calc' ? '高等数学 · 上册' : '线性代数'}</h2>
          <span>${subject === 'calc' ? 'P1–P76 · 7 章' : 'P14–P59 · 6 章'}</span>
        </div>
        <div class="course-list">${rows}</div>
      </section>`;
    }).join('');

    return `<div class="courses-page">
      <header class="courses-hero">
        <div class="courses-hero-main">
          <div class="hero-kicker">COURSE MAP · 课程地图</div>
          <h1>网课不是背景音，<br>要变成一条能走完的路线。</h1>
          <p>已经按同济章节把宋浩老师的 B 站官方课程页码整理好：先看哪几集、什么时候暂停、看完回来做哪一章题，都在下面。机械制图部分按教材主线整理，直接配合站内知识卡与题库使用。</p>
          <div class="course-progress-row">
            <div class="course-progress-copy"><b><span id="courseDone">${watched}</span><span> / ${COURSE_MAP.length}</span></b><small>章视频已看</small></div>
            <div class="progress"><i id="courseBar" style="width:${pct}%"></i></div>
            <span class="course-progress-pct">${pct}%</span>
          </div>
        </div>
        <div class="courses-hero-side">
          <div class="course-hero-stat"><b>2</b><span>门视频课程</span></div>
          <div class="course-hero-stat"><b>${CHAPTERS.length}</b><span>个章节覆盖</span></div>
          <div class="course-hero-stat"><b>3</b><span>个学科</span></div>
        </div>
      </header>

      <div class="course-source-grid">${sources}</div>

      <section class="course-how">
        <div class="section-head">
          <div><div class="eyebrow">HOW TO WATCH</div><h2>一节课，这样看才算数</h2></div>
          <span class="head-link">${icon('spark')}看课不是进度条比赛</span>
        </div>
        <div class="course-how-grid">
          ${COURSE_STEPS.map((s, i) => `<article class="course-step"><span class="course-step-no">0${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`).join('')}
        </div>
      </section>

      <div class="course-note">
        ${icon('info')}
        <span>课程链接指向 B 站官方视频，需联网观看；站内只做章节索引与学习路线，不搬运视频。选集页码可能随 UP 主更新微调，若对不上，以选集标题中的“1.1、2.1”等章节号为准。线性代数前 13P 为 2024 精简更新，章节映射使用 P14 起的完整版。</span>
      </div>

      ${groups}
      ${drawingGroup}
    </div>`;
  }

  function updateCourseUI(id) {
    const watched = COURSE_MAP.filter(m => state.course[m.chapter]).length;
    const pct = Math.round(watched / COURSE_MAP.length * 100);
    const done = $('#courseDone');
    if (done) done.textContent = watched;
    const bar = $('#courseBar');
    if (bar) bar.style.width = `${pct}%`;
    const pctEl = $('.course-progress-pct');
    if (pctEl) pctEl.textContent = `${pct}%`;
    const row = document.getElementById(`course-${id}`);
    if (row) {
      const on = !!state.course[id];
      row.classList.toggle('watched', on);
      const btn = $('[data-action="toggle-course"]', row);
      if (btn) {
        btn.textContent = on ? '已看' : '标记已看';
        btn.setAttribute('aria-pressed', String(on));
        btn.className = `btn ${on ? 'btn-soft' : 'btn-outline'} btn-sm`;
      }
    }
  }

  /* ------------------------------ Formulas ------------------------------ */
  function renderFormulas() {
    const groups = CHAPTERS.map(c => {
      const items = FORMULAS.filter(f => f.chapterId === c.id);
      if (!items.length) return '';
      return `<section class="formula-group" data-subject="${c.subject}">
        <div class="formula-group-head"><h2>${esc(c.title)}</h2><span>${SUBJECT_NAME[c.subject]} · ${items.length} 条</span></div>
        <div class="formula-grid">
          ${items.map(f => `<article class="formula-card" id="${f.id}" data-subject="${f.subject}" data-search="${escAttr(f.search)}" data-action="reveal-formula">
            <div class="fc-head">
              <span class="fc-label">${esc(f.label)}</span>
              <button class="fc-copy" type="button" data-action="copy-formula" data-id="${f.id}" title="复制 LaTeX" aria-label="复制 LaTeX">${icon('copy')}</button>
            </div>
            <div class="formula-tex">${displayMath(f.tex)}</div>
          </article>`).join('')}
        </div>
      </section>`;
    }).join('');

    return `<div class="formulas-page${formulaMasked ? ' masked' : ''}">
      <div class="page-head">
        <div><div class="eyebrow">FORMULA HANDBOOK</div><h1>公式手册</h1><p>${FORMULAS.length} 条核心公式，按章节归档。打开“遮盖回忆”，用主动回想代替反复看。</p></div>
        <span class="chip gold" id="formulaCount">${FORMULAS.length} 条公式</span>
      </div>
      <div class="formula-toolbar">
        <label class="formula-search">${icon('search')}<input id="formulaSearch" type="search" placeholder="搜索公式，如：泰勒、特征值、分部积分" value="${escAttr(formulaQuery)}" autocomplete="off"></label>
        <div class="filter-chips">
          <button class="filter-chip ${formulaSubject === 'all' ? 'active' : ''}" type="button" data-action="filter-formula" data-subject="all">全部</button>
          <button class="filter-chip ${formulaSubject === 'calc' ? 'active' : ''}" type="button" data-action="filter-formula" data-subject="calc">高数</button>
          <button class="filter-chip ${formulaSubject === 'linear' ? 'active' : ''}" type="button" data-action="filter-formula" data-subject="linear">线代</button>
          <button class="filter-chip ${formulaSubject === 'drawing' ? 'active' : ''}" type="button" data-action="filter-formula" data-subject="drawing">制图</button>
        </div>
        <button class="btn btn-soft" type="button" data-action="toggle-mask">${icon(formulaMasked ? 'eye' : 'eye')}<span>${formulaMasked ? '显示公式' : '遮盖回忆'}</span></button>
        <button class="btn btn-soft" type="button" data-action="print-formulas">${icon('printer')}打印</button>
      </div>
      ${groups}
      <div class="empty" id="formulaEmpty" hidden style="margin-top:18px">
        <div class="empty-icon">${icon('search')}</div><h3>没有匹配的公式</h3><p>换个关键词，或切换到“全部”。</p>
      </div>
      <div class="print-only" style="margin-top:24px;color:var(--muted);font-size:10px">${esc(META.edition)} · 大一电信学习网公式手册</div>
    </div>`;
  }

  function applyFormulaFilter() {
    const page = $('.formulas-page');
    if (!page) return;
    const q = formulaQuery.trim().toLowerCase();
    let visible = 0;
    $$('.formula-card', page).forEach(card => {
      const matchQ = !q || (card.dataset.search || '').includes(q);
      const matchS = formulaSubject === 'all' || card.dataset.subject === formulaSubject;
      card.hidden = !(matchQ && matchS);
      if (!card.hidden) visible++;
    });
    $$('.formula-group', page).forEach(group => {
      group.hidden = !$$('.formula-card', group).some(card => !card.hidden);
    });
    const count = $('#formulaCount');
    if (count) count.textContent = `${visible} 条公式`;
    const empty = $('#formulaEmpty');
    if (empty) empty.hidden = visible > 0;
  }

  function toggleFormulaMask() {
    formulaMasked = !formulaMasked;
    const page = $('.formulas-page');
    if (page) page.classList.toggle('masked', formulaMasked);
    const btn = $('[data-action="toggle-mask"]');
    if (btn) btn.innerHTML = `${icon('eye')}<span>${formulaMasked ? '显示公式' : '遮盖回忆'}</span>`;
    toast(formulaMasked ? '已遮盖公式，点击每张卡片回忆' : '已显示全部公式');
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      toast('LaTeX 已复制');
    } catch (e) {
      toast('复制失败，请手动选择公式');
    }
  }

  /* ---------------------------- Adaptive plan ---------------------------- */
  function adaptivePriority(p) {
    const weight = parseInt(String(p.c.weight).replace(/[^\d]/g, ''), 10) || 12;
    return weight + (100 - chapterPct(p.c.id)) * 0.12;
  }

  function selectedPlanTasks() {
    return PLAN.flatMap(p => p.tasks).filter(t => state.plan[t.id]);
  }

  function planTaskMinutes(t) {
    if (t.kind === '测试') return 45;
    if (t.kind === '错题') return 40;
    if (t.kind === '公式') return 20;
    if (t.kind === '复盘') return 30;
    return 30;
  }

  function buildAdaptivePlan() {
    const cfg = state.schedule || {};
    const preview = !cfg.examDate;
    const today = startOfDay(new Date());
    let exam = preview ? addDays(today, 30) : parseLocalDate(cfg.examDate);
    if (!exam || Number.isNaN(exam.getTime())) exam = addDays(today, 30);
    const daily = clampNum(Math.round(Number(cfg.dailyMinutes) || 90), 30, 480);
    const rest = [0, 1, 2].includes(Number(cfg.restDays)) ? Number(cfg.restDays) : 1;
    const calDays = Math.max(0, Math.round((startOfDay(exam) - today) / 86400000));

    const dates = [];
    for (let d = new Date(today); d < exam; d = addDays(d, 1)) {
      const wd = d.getDay();
      if (rest === 1 && wd === 0) continue;
      if (rest === 2 && (wd === 0 || wd === 6)) continue;
      dates.push(new Date(d));
      if (dates.length >= 400) break;
    }

    const reviewMin = daily >= 60 ? 15 : 10;
    const contentMin = Math.max(10, daily - reviewMin);
    const selectedTasks = selectedPlanTasks();
    const hasSelection = selectedTasks.length > 0;
    const selectedChapters = new Set(selectedTasks.map(t => t.chapter).filter(id => id && chapterById.has(id)));
    const standaloneSessions = selectedTasks
      .filter(t => !t.chapter || !chapterById.has(t.chapter))
      .map(t => ({
        chapterId: null,
        title: t.title,
        label: t.kind === '测试' ? '限时测试' : t.kind === '错题' ? '错题复盘' : t.kind === '公式' ? '公式闪回' : '六周模板',
        minutes: planTaskMinutes(t),
        left: planTaskMinutes(t),
        taken: 0
      }));
    const plans = CHAPTERS.filter(c => selectedChapters.has(c.id)).map(c => {
      const qTotal = chapterTotal(c.id);
      const read = readCount(c);
      const best = quizBest(c.id);
      const base = c.kps.length * 25 + qTotal * 3 + 20;
      const pct = chapterPct(c.id) / 100;
      const remain = Math.max(15, Math.round(base * (1 - pct * 0.78)));
      return { c, qTotal, read, best, remain, planned: 0, priority: 0 };
    });
    plans.forEach(p => { p.priority = adaptivePriority(p); });

    const standaloneNeed = standaloneSessions.reduce((n, s) => n + s.minutes, 0);
    if (!hasSelection) {
      return {
        preview, exam, calDays, daily, rest, reviewMin, contentMin,
        dates, plans: [], sessions: [], standaloneSessions: [], selectedTasks: [],
        hasSelection: false, need: 0, capacity: dates.length * daily, required: dates.length * reviewMin,
        ratio: 1, recommended: 0, budget: 0, days: [], unscheduled: [], unplacedSessions: [], allDone: false,
        scheduledChapters: 0, surplus: 0, shortfall: 0
      };
    }

    const need = plans.reduce((n, p) => n + p.remain, 0) + standaloneNeed;
    const capacity = dates.length * daily;
    const required = need + dates.length * reviewMin;
    const ratio = required > 0 ? capacity / required : 1;
    const recommended = dates.length
      ? clampNum(Math.ceil((need / dates.length + reviewMin) / 5) * 5, 30, 480)
      : 0;
    const budget = dates.length * contentMin;

    if (budget >= need) {
      plans.forEach(p => { p.planned = p.remain; });
    } else if (budget >= 15 * plans.length) {
      const extra = budget - 15 * plans.length;
      plans.forEach(p => { p.planned = 15 + Math.floor(extra * (p.remain / need)); });
      let assigned = plans.reduce((n, p) => n + p.planned, 0);
      let i = 0;
      while (assigned < budget) {
        plans[i % plans.length].planned += 1;
        assigned += 1;
        i += 1;
      }
    } else {
      const sorted = [...plans].sort((a, b) => b.priority - a.priority);
      let left = budget;
      for (const p of sorted) {
        if (left >= 15) { p.planned = 15; left -= 15; }
      }
      if (left > 0 && sorted[0]) sorted[0].planned += left;
    }

    /* 始终按教材章节顺序推进；时间不足时用“计划分钟数”压缩，而不是打乱学习顺序。 */
    const order = [...plans];
    const sessions = [];
    order.forEach(p => { if (p.planned > 0) sessions.push(...makeChapterSessions(p)); });
    standaloneSessions.forEach(s => sessions.push(s));

    const days = [];
    let sessionIndex = 0;
    dates.forEach((date, di) => {
      let slot = contentMin;
      const tasks = [];
      while (slot >= 8 && sessionIndex < sessions.length) {
        const session = sessions[sessionIndex];
        const take = Math.min(slot, session.left);
        if (take < 8) break;
        tasks.push({
          chapterId: session.chapterId,
          title: session.title,
          label: session.label,
          minutes: take,
          continued: session.taken > 0
        });
        session.left -= take;
        session.taken += take;
        slot -= take;
        if (session.left <= 0) sessionIndex += 1;
      }
      if (sessionIndex >= sessions.length && slot >= 30 && di % 3 === 0) {
        const take = Math.min(45, slot);
        tasks.push({ title: '冲刺复盘', label: '综合测试 / 错题三遍法', minutes: take });
        slot -= take;
      }
      if (slot >= 10) {
        tasks.push({ title: '机动安排', label: '补弱 / 错题二刷 / 休息', minutes: slot });
        slot = 0;
      }
      tasks.push({
        title: '每日复盘',
        label: wrongList().length ? '错题本 + 公式闪卡' : '公式闪卡 + 当日错题',
        minutes: reviewMin,
        review: true
      });
      days.push({
        date,
        index: di + 1,
        tasks,
        minutes: tasks.reduce((n, t) => n + t.minutes, 0)
      });
    });

    const unscheduled = plans.filter(p => p.planned === 0).map(p => p.c);
    const unplacedSessions = sessions.slice(sessionIndex).map(s => s.title);
    const allDone = plans.every(p => p.read >= p.c.kps.length && p.best >= p.qTotal);
    const scheduledChapters = plans.filter(p => p.planned > 0).length;
    return {
      preview, exam, calDays, daily, rest, reviewMin, contentMin,
      dates, plans, need, capacity, required, ratio, recommended,
      budget, days, sessions, standaloneSessions, selectedTasks, hasSelection,
      unscheduled, unplacedSessions, allDone, scheduledChapters,
      surplus: Math.max(0, capacity - required),
      shortfall: Math.max(0, required - capacity)
    };
  }

  function makeChapterSessions(p) {
    const labels = [];
    if (p.read < p.c.kps.length) labels.push('知识卡 + 典型例题');
    if (p.best < p.qTotal) labels.push('章节测试 + 错题订正');
    if (!labels.length) labels.push('公式速记 + 错题回看');

    const chunks = [];
    if (labels.length === 2 && p.planned >= 40) {
      const readMin = Math.max(20, Math.round(p.planned * 0.55));
      chunks.push([labels[0], readMin]);
      chunks.push([labels[1], p.planned - readMin]);
    } else {
      chunks.push([labels.join(' / '), p.planned]);
    }
    return chunks
      .filter(([, min]) => min > 0)
      .map(([label, minutes]) => ({
        chapterId: p.c.id,
        title: p.c.title,
        label,
        minutes,
        left: minutes,
        taken: 0
      }));
  }

  function adaptiveStatus(p) {
    if (!p.dates.length) {
      return {
        tone: 'bad',
        title: '没有有效学习日',
        text: '当前休息日设置把考前的日子全部跳过了。请减少每周休息天数，或把考试日期往后调。'
      };
    }
    if (p.allDone) {
      return {
        tone: 'good',
        title: '主线已全部完成',
        text: `知识点和章节测试都已完成。剩下的 ${p.dates.length} 个学习日用来做综合测试、错题三遍法和公式默写，保持手感即可。`
      };
    }
    if (p.ratio >= 1.15) {
      return {
        tone: 'good',
        title: '时间比较充裕',
        text: `按每天 ${p.daily} 分钟，主线需要约 ${formatHours(p.required)}，可用 ${formatHours(p.capacity)}，大约有 ${formatHours(p.surplus)} 余量。建议最后留 2–3 天做综合测试和错题。`
      };
    }
    if (p.ratio >= 1) {
      return {
        tone: 'ok',
        title: '时间刚好够用',
        text: `容量与主线基本持平，建议尽量不要缺勤。完成每日任务后，把剩余时间留给错题本和综合测试。`
      };
    }
    const recommendText = p.recommended > p.daily
      ? `把每天提高到 ${p.recommended} 分钟`
      : `优先保高频章节`;
    const squeezeText = p.recommended >= 480
      ? '；即使每天 8 小时也偏紧，建议只保高频章节和错题'
      : '；如果时间不能增加，综合测试只保留考前 2 次';
    return {
      tone: p.ratio >= 0.8 ? 'tight' : 'bad',
      title: p.ratio >= 0.8 ? '时间偏紧' : '时间告急',
      text: `按当前设置，预计差 ${formatHours(p.shortfall)}。建议${recommendText}${squeezeText}。下面已按时间压缩内容${p.unscheduled.length ? `，暂未排入：${p.unscheduled.map(c => c.title).join('、')}` : ''}。`
    };
  }

  function renderAdaptivePlan() {
    const p = buildAdaptivePlan();
    if (!p.hasSelection) {
      return `<section class="adaptive-plan adaptive-plan-empty">
        <div class="adaptive-head">
          <div>
            <div class="eyebrow">ADAPTIVE SCHEDULE</div>
            <h2>先选任务，再排时间</h2>
            <p>在上方六周模板里勾选这轮要完成的任务；系统只按勾选的任务、考试日期和每天可用时间排表。</p>
          </div>
          <span class="chip gold">尚未选择</span>
        </div>
        <div class="plan-pick-empty">${icon('plan')}<div><b>还没有选择任务</b><p>可以先勾选几个章节任务，或者直接全选，再设置考试日期。</p></div><button class="btn btn-soft btn-sm" type="button" data-action="plan-select-all">全选任务</button></div>
      </section>`;
    }
    const status = adaptiveStatus(p);
    const todayStr = todayKey(startOfDay(new Date()));
    const dateValue = state.schedule?.examDate || '';
    const coverage = p.required > 0 ? Math.min(100, Math.round(p.capacity / p.required * 100)) : 100;
    const visibleDays = p.days.slice(0, 28);
    const restLabel = p.rest === 0 ? '不休息' : p.rest === 1 ? '周日休息' : '周末休息';

    const statusIcon = status.tone === 'good' ? 'check' : status.tone === 'bad' ? 'alert' : 'clock';
    const unplaced = [];
    const unplacedSeen = new Set();
    p.unscheduled.forEach(c => {
      if (unplacedSeen.has(c.title)) return;
      unplacedSeen.add(c.title);
      unplaced.push({ title: c.title, href: `#/chapter/${c.id}` });
    });
    (p.unplacedSessions || []).forEach(title => {
      if (unplacedSeen.has(title)) return;
      unplacedSeen.add(title);
      unplaced.push({ title, href: '' });
    });

    return `<section class="adaptive-plan">
      <div class="adaptive-head">
        <div>
          <div class="eyebrow">ADAPTIVE SCHEDULE</div>
          <h2>按勾选任务和考试时间，重排进度</h2>
          <p>只排你勾选的任务：已选 ${p.selectedTasks.length} 个，其中 ${p.plans.length} 个章节任务会按剩余知识点和测试进度分配时间。</p>
        </div>
        <div class="adaptive-chips">
          <span class="chip teal">已选 ${p.selectedTasks.length} 项</span>
          <span class="chip ${p.preview ? 'gold' : 'teal'}">${p.preview ? '30 天预览' : `${p.calDays} 天后考试`}</span>
        </div>
      </div>

      <details class="selected-tasks">
        <summary>查看已选任务（${p.selectedTasks.length}）</summary>
        <div class="selected-task-list">
          ${p.selectedTasks.map(t => t.chapter && chapterById.has(t.chapter)
            ? `<a class="selected-task-chip" href="#/chapter/${t.chapter}">${esc(t.title)}</a>`
            : `<span class="selected-task-chip">${esc(t.title)}</span>`).join('')}
        </div>
      </details>

      <div class="schedule-settings">
        <label class="field">
          <span>考试日期</span>
          <input id="examDate" type="date" min="${todayStr}" value="${escAttr(dateValue)}">
          <small>${p.preview ? '未设置，先用 30 天预览' : '按真实日期重排'}</small>
        </label>
        <label class="field">
          <span>每天可复习</span>
          <div class="number-field"><input id="dailyMinutes" type="number" min="30" max="480" step="15" value="${p.daily}"><em>分钟</em></div>
          <small>建议 60–120 分钟</small>
        </label>
        <label class="field">
          <span>每周休息</span>
          <select id="restDays">
            <option value="0"${p.rest === 0 ? ' selected' : ''}>不休息</option>
            <option value="1"${p.rest === 1 ? ' selected' : ''}>周日休息</option>
            <option value="2"${p.rest === 2 ? ' selected' : ''}>周末休息</option>
          </select>
          <small>${restLabel}，自动跳过</small>
        </label>
        <div class="schedule-actions">
          <button class="btn btn-primary" type="button" data-action="save-schedule">${icon('refresh')}按这个时间重排</button>
          ${dateValue ? `<button class="btn btn-ghost" type="button" data-action="reset-schedule">清除日期</button>` : ''}
        </div>
      </div>

      <div class="schedule-kpis">
        <div class="schedule-kpi"><b>${p.calDays}</b><span>日历天</span></div>
        <div class="schedule-kpi"><b>${p.dates.length}</b><span>有效学习日</span></div>
        <div class="schedule-kpi"><b>${formatHours(p.capacity)}</b><span>可用时间</span></div>
        <div class="schedule-kpi"><b>${formatHours(p.required)}</b><span>预计需要</span></div>
      </div>

      <div class="schedule-meter">
        <div class="schedule-meter-head"><span>时间覆盖度</span><b>${coverage}%</b><span>当前掌握度 ${mastery()}%</span></div>
        <div class="progress"><i style="width:${coverage}%"></i></div>
      </div>

      <div class="schedule-status ${status.tone}">
        ${icon(statusIcon)}
        <div><b>${esc(status.title)}</b><p>${esc(status.text)}</p></div>
        <span class="schedule-status-side">${p.preview ? '设置日期后可精确计算' : `建议每天 ${p.recommended} 分钟`}</span>
      </div>

      <div class="schedule-days-head">
        <h3>每日安排</h3>
        <span>${p.days.length ? `共 ${p.days.length} 个学习日${p.days.length > 28 ? ' · 显示前 28 天' : ''}` : '暂无学习日'}</span>
      </div>

      ${p.days.length ? `<div class="schedule-days">
        ${visibleDays.map(day => `
          <div class="schedule-day${day.index === 1 ? ' today' : ''}">
            <div class="day-date"><b>${formatMonthDay(day.date)}</b><span>${WEEKDAYS[day.date.getDay()]} · 第 ${day.index} 天</span></div>
            <div class="day-tasks">
              ${day.tasks.map(t => `<div class="day-task${t.review ? ' review' : ''}">
                <span class="task-bullet"></span>
                <span class="task-copy"><b>${t.chapterId && chapterById.has(t.chapterId) ? `<a class="day-task-link" href="#/chapter/${t.chapterId}">${esc(t.title)}</a>` : esc(t.title)}</b><em>${t.continued ? '继续 · ' : ''}${esc(t.label)}</em></span>
                <span class="task-minutes">${t.minutes}<small>min</small></span>
              </div>`).join('')}
            </div>
            <div class="day-total"><b>${day.minutes}</b><span>分钟</span></div>
          </div>`).join('')}
      </div>` : `<div class="schedule-empty">${icon('alert')} 当前时间设置下没有可安排的学习日。</div>`}

      <div class="schedule-foot">
        <span>${p.preview ? '这是 30 天预览：选择考试日期后，计划会按真实剩余天数重算。' : `已按 ${restLabel} 跳过休息日，考试前一天不安排新任务。`}</span>
      </div>
      ${unplaced.length ? `<div class="schedule-warning-card">
        <div class="schedule-warning-head">${icon('alert')}<div><b>有 ${unplaced.length} 个任务没排进学习日</b><span>这些任务已经在上面勾选，但按当前时间放不下。</span></div></div>
        <div class="schedule-warning-list">${unplaced.map(x => x.href ? `<a href="${x.href}">${esc(x.title)}</a>` : `<span>${esc(x.title)}</span>`).join('')}</div>
        <p>可以少勾几个任务、提高每天分钟数，或把考试日期往后调；调整后点“按这个时间重排”。</p>
      </div>` : ''}
    </section>`;
  }

  /* ------------------------------ Plan ------------------------------ */
  function renderPlan() {
    const totalTasks = PLAN.reduce((n, p) => n + p.tasks.length, 0);
    const doneTasks = PLAN.reduce((n, p) => n + p.tasks.filter(t => state.plan[t.id]).length, 0);
    const pct = Math.round(doneTasks / totalTasks * 100);
    const phases = PLAN.map((phase, pi) => {
      const done = phase.tasks.filter(t => state.plan[t.id]).length;
      const pp = Math.round(done / phase.tasks.length * 100);
      return `<section class="phase" data-phase="${phase.id}">
        <div class="phase-head">
          <div>
            <div class="range">${esc(phase.range)} · PHASE ${pi + 1}</div>
            <h2>${esc(phase.name)}</h2>
            <p>${esc(phase.goal)}</p>
          </div>
          <div class="phase-pct" id="phasePct-${phase.id}">${pp}%</div>
        </div>
        <div class="progress"><i id="phaseBar-${phase.id}" style="width:${pp}%"></i></div>
        <div class="tasks">
          ${phase.tasks.map(t => `<div class="task${state.plan[t.id] ? ' done' : ''}" data-task="${t.id}">
            <button class="task-check" type="button" data-action="toggle-plan" data-id="${t.id}" aria-label="选择任务" aria-pressed="${!!state.plan[t.id]}">${icon('check')}</button>
            <div class="task-main">
              <div class="task-title">${esc(t.title)}</div>
              <div class="task-desc">${esc(t.desc)}</div>
            </div>
            <div class="task-side">
              <span class="chip">${esc(t.kind)}</span>
              ${t.chapter && chapterById.has(t.chapter) ? `<a href="#/chapter/${t.chapter}">去学习</a>` : ''}
            </div>
          </div>`).join('')}
        </div>
      </section>`;
    }).join('');

    return `<div class="plan-page">
      <div class="plan-hero">
        <div>
          <div class="hero-kicker" style="color:var(--accent)">ADAPTIVE + SIX-WEEK</div>
          <h1>复习计划</h1>
          <p>先从六周模板里勾选这轮要完成的任务，再按考试日期和每天可用时间排表。计划只围绕你勾选的任务展开。</p>
        </div>
        <div class="plan-progress">
          <b id="planOverall">${pct}%</b><span>本轮任务已选</span>
          <div class="progress"><i id="planBar" style="width:${pct}%"></i></div>
        </div>
      </div>
      <div class="plan-pick-hint">${icon('plan')} 先勾选这轮要完成的任务，再设置考试日期和每天可用时间；下面的时间表只按勾选的任务排。</div>
      <div class="plan-template-head">
        <div><div class="eyebrow">SIX-WEEK TEMPLATE</div><h2>六周模板 · 可勾选任务</h2></div>
        <div class="plan-template-actions">
          <span>${PLAN.reduce((n, p) => n + p.tasks.length, 0)} 个任务，按需取用</span>
          <button class="btn btn-ghost btn-sm" type="button" data-action="plan-select-all">全选</button>
          <button class="btn btn-ghost btn-sm" type="button" data-action="plan-clear">清空</button>
        </div>
      </div>
      ${phases}
      <div class="plan-note">训练设计参考宋浩 750 题的题型分类思路与网课节奏：先按章节建立框架，再按题型集中突破，最后用错题和限时卷收口。站内题目与解析均为原创，不复制课程或题集原文，也不替代教材课后题与真题。</div>
      ${renderAdaptivePlan()}
    </div>`;
  }

  function updatePlanUI() {
    const totalTasks = PLAN.reduce((n, p) => n + p.tasks.length, 0);
    const doneTasks = PLAN.reduce((n, p) => n + p.tasks.filter(t => state.plan[t.id]).length, 0);
    const pct = totalTasks ? Math.round(doneTasks / totalTasks * 100) : 0;
    const overall = $('#planOverall');
    if (overall) overall.textContent = `${pct}%`;
    const bar = $('#planBar');
    if (bar) bar.style.width = `${pct}%`;
    PLAN.forEach(phase => {
      const done = phase.tasks.filter(t => state.plan[t.id]).length;
      const pp = Math.round(done / phase.tasks.length * 100);
      const pEl = $(`#phasePct-${phase.id}`);
      if (pEl) pEl.textContent = `${pp}%`;
      const bEl = $(`#phaseBar-${phase.id}`);
      if (bEl) bEl.style.width = `${pp}%`;
    });
    $$('.task').forEach(el => {
      const done = !!state.plan[el.dataset.task];
      el.classList.toggle('done', done);
      const btn = $('.task-check', el);
      if (btn) btn.setAttribute('aria-pressed', String(done));
    });
  }

  /* ------------------------------ Search ------------------------------ */
  const KP_SEARCH = [];
  CHAPTERS.forEach(c => c.kps.forEach(kp => {
    KP_SEARCH.push({
      kp, c,
      text: `${kp.title} ${kp.summary} ${kp.points.join(' ')} ${c.title}`.toLowerCase()
    });
  }));
  const CHAPTER_SEARCH = CHAPTERS.map(c => ({
    c,
    text: `${c.title} ${c.intro} ${c.tags.join(' ')} ${c.drills.join(' ')}`.toLowerCase()
  }));

  function searchHintHTML() {
    return `<div class="search-hint"><span>试试搜索</span>
      <button type="button" data-search="等价无穷小">等价无穷小</button>
      <button type="button" data-search="特征值">特征值</button>
      <button type="button" data-search="分部积分">分部积分</button>
      <button type="button" data-search="正定">正定</button>
      <button type="button" data-search="泰勒">泰勒</button>
    </div>`;
  }

  function renderSearchResults(query) {
    const box = $('#searchResults');
    if (!box) return;
    const q = query.trim().toLowerCase();
    if (!q) { box.innerHTML = searchHintHTML(); return; }

    const kps = KP_SEARCH.filter(x => x.text.includes(q)).slice(0, 8);
    const fs = FORMULAS.filter(f => f.search.includes(q)).slice(0, 6);
    const cs = CHAPTER_SEARCH.filter(x => x.text.includes(q)).slice(0, 4);

    if (!kps.length && !fs.length && !cs.length) {
      box.innerHTML = `<div class="search-hint"><span>没有找到“${esc(query)}”</span>换个关键词试试，比如“极限”“秩”“二次型”。</div>`;
      return;
    }

    let html = '';
    if (kps.length) {
      html += `<div class="sr-group-label">知识点</div>`;
      html += kps.map(({ kp, c }) => `<a class="sr-item" href="#/chapter/${c.id}?kp=${kp.id}">
        <span class="sr-icon">知</span><span class="sr-main"><b>${esc(kp.title)}</b><small>${esc(c.title)} · ${esc(kp.summary)}</small></span><span class="sr-go">${icon('arrowRight')}</span>
      </a>`).join('');
    }
    if (fs.length) {
      html += `<div class="sr-group-label">公式</div>`;
      html += fs.map(f => `<a class="sr-item" href="#/formulas?q=${encodeURIComponent(f.label)}">
        <span class="sr-icon">式</span><span class="sr-main"><b>${esc(f.label)}</b><small>${esc(f.chapterTitle)} · ${esc(f.kpTitle)}</small></span><span class="sr-go">${icon('arrowRight')}</span>
      </a>`).join('');
    }
    if (cs.length) {
      html += `<div class="sr-group-label">章节</div>`;
      html += cs.map(({ c }) => `<a class="sr-item" href="#/chapter/${c.id}">
        <span class="sr-icon">章</span><span class="sr-main"><b>${esc(c.title)}</b><small>${esc(c.intro)}</small></span><span class="sr-go">${icon('arrowRight')}</span>
      </a>`).join('');
    }
    box.innerHTML = html;
  }

  function openSearch(prefill = '') {
    const modal = $('#searchModal');
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    const input = $('#searchInput');
    input.value = prefill;
    renderSearchResults(prefill);
    setTimeout(() => { input.focus(); input.select(); }, 30);
  }

  function closeSearch() {
    const modal = $('#searchModal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
  }

  /* ------------------------------ Events ------------------------------ */
  function onClick(e) {
    const hint = e.target.closest('#searchModal [data-search]');
    if (hint) {
      const q = hint.dataset.search;
      const input = $('#searchInput');
      input.value = q;
      renderSearchResults(q);
      input.focus();
      return;
    }

    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;

    switch (action) {
      case 'toggle-theme': {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next, true);
        break;
      }
      case 'toggle-sidebar': {
        const open = !$('#sidebar').classList.contains('open');
        $('#sidebar').classList.toggle('open', open);
        $('#scrim').hidden = !open;
        $('.menu-btn')?.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('no-scroll', open);
        break;
      }
      case 'close-sidebar':
        closeSidebar();
        break;
      case 'open-search':
        openSearch();
        break;
      case 'close-search':
        closeSearch();
        break;
      case 'toggle-kp': {
        const id = el.dataset.id;
        const was = !!state.read[id];
        if (was) delete state.read[id];
        else {
          state.read[id] = true;
          state.lastKp = id;
          const hit = kpById.get(id);
          if (hit) state.lastChapter = hit.chapter.id;
        }
        markActivity(1);
        saveState();
        renderRoute({ keepScroll: true });
        toast(was ? '已取消掌握标记' : '已标记掌握，继续保持');
        break;
      }
      case 'quiz-select': {
        if (!quizSession || quizSession.finished) return;
        const q = quizSession.qs[quizSession.index];
        if (quizSession.responses[q.id]) return;
        const idx = Number(el.dataset.index);
        quizSession.selected = idx;
        $$('#quizOptions .option').forEach((b, i) => b.classList.toggle('selected', i === idx));
        const confirm = $('#quizConfirm');
        if (confirm) confirm.disabled = false;
        break;
      }
      case 'quiz-confirm':
        submitQuizAnswer();
        break;
      case 'quiz-next':
        nextQuizQuestion();
        break;
      case 'quiz-retry': {
        const param = quizSession?.param;
        if (!param) return;
        if (quizSession?.practice) {
          startPractice();
          break;
        }
        if (param === 'mistakes' && !wrongList().length) {
          toast('错题本已经清空');
          navigate('#/mistakes');
          return;
        }
        quizSession = createQuizSession(param, true);
        renderRoute({ keepScroll: false });
        break;
      }
      case 'practice-filter': {
        const key = el.dataset.key;
        const value = el.dataset.value;
        if (!key || !(key in practiceFilter)) break;
        practiceFilter[key] = value;
        if (key === 'subject') practiceFilter.chapter = 'all';
        renderRoute({ keepScroll: true });
        break;
      }
      case 'practice-start':
        startPractice();
        break;
      case 'exam-start':
      case 'exam-retry':
        beginExam(el.dataset.subject || examSession?.subject);
        break;
      case 'exam-select': {
        if (!examSession || examSession.finished) return;
        const q = examSession.qs[examSession.index];
        const idx = Number(el.dataset.index);
        examSession.responses[q.id] = { value: idx };
        $$('#examOptions .option').forEach((b, i) => b.classList.toggle('selected', i === idx));
        updateExamIndicators();
        break;
      }
      case 'exam-prev':
        if (examSession && examSession.index > 0) {
          examSession.index -= 1;
          renderRoute({ keepScroll: true });
        }
        break;
      case 'exam-next':
        if (examSession && examSession.index < examSession.qs.length - 1) {
          examSession.index += 1;
          renderRoute({ keepScroll: true });
        }
        break;
      case 'exam-jump':
        if (examSession) {
          examSession.index = Number(el.dataset.index);
          renderRoute({ keepScroll: true });
        }
        break;
      case 'exam-submit':
        submitExam(false);
        break;
      case 'remove-mistake': {
        delete state.wrong[el.dataset.id];
        saveState();
        renderRoute({ keepScroll: true });
        toast('已从错题本移出');
        break;
      }
      case 'toggle-mistake': {
        const q = questionById.get(el.dataset.id);
        if (!q) break;
        if (state.wrong[q.id]) {
          delete state.wrong[q.id];
          toast('已从错题本移出');
        } else {
          state.wrong[q.id] = { count: 0, lastAt: Date.now(), chapter: q.chapter, manual: true };
          toast('已加入错题本，答对也可以留着');
        }
        saveState();
        renderRoute({ keepScroll: true });
        break;
      }
      case 'filter-formula':
        formulaSubject = el.dataset.subject;
        $$('.filter-chip').forEach(b => b.classList.toggle('active', b.dataset.subject === formulaSubject));
        applyFormulaFilter();
        break;
      case 'toggle-mask':
        toggleFormulaMask();
        break;
      case 'reveal-formula': {
        if (!formulaMasked) return;
        el.closest('.formula-card')?.classList.add('revealed');
        break;
      }
      case 'copy-formula': {
        const f = formulaById.get(el.dataset.id);
        if (f) copyText(f.tex);
        break;
      }
      case 'print-formulas':
        window.print();
        break;
      case 'toggle-course': {
        const id = el.dataset.id;
        if (state.course[id]) delete state.course[id];
        else state.course[id] = true;
        markActivity(1);
        saveState();
        updateCourseUI(id);
        toast(state.course[id] ? '已标记看完，记得回来刷题' : '已取消观看标记');
        break;
      }
      case 'save-schedule': {
        const dateInput = $('#examDate');
        const minutesInput = $('#dailyMinutes');
        const restInput = $('#restDays');
        const examDate = dateInput ? dateInput.value : '';
        const parsed = examDate ? parseLocalDate(examDate) : null;
        if (parsed && parsed <= startOfDay(new Date())) {
          toast('考试日期需要晚于今天');
          if (dateInput) dateInput.value = state.schedule?.examDate || '';
          dateInput?.focus();
          return;
        }
        const dailyMinutes = clampNum(Math.round(Number(minutesInput?.value) || 90), 30, 480);
        const restDays = [0, 1, 2].includes(Number(restInput?.value)) ? Number(restInput.value) : 1;
        state.schedule = { examDate, dailyMinutes, restDays };
        saveState();
        renderRoute({ keepScroll: true });
        toast(examDate ? `已按 ${examDate} 重排计划` : '已保存，先按 30 天预览');
        break;
      }
      case 'reset-schedule': {
        state.schedule = { ...(state.schedule || {}), examDate: '' };
        saveState();
        renderRoute({ keepScroll: true });
        toast('已清除考试日期，恢复 30 天预览');
        break;
      }
      case 'toggle-plan': {
        const id = el.dataset.id;
        if (state.plan[id]) delete state.plan[id];
        else state.plan[id] = true;
        markActivity(1);
        saveState();
        renderRoute({ keepScroll: true });
        toast(state.plan[id] ? '已加入本轮计划' : '已从计划中移除');
        break;
      }
      case 'plan-select-all': {
        PLAN.flatMap(p => p.tasks).forEach(t => { state.plan[t.id] = true; });
        saveState();
        renderRoute({ keepScroll: true });
        toast('已全选六周任务，时间表已重排');
        break;
      }
      case 'plan-clear': {
        state.plan = {};
        saveState();
        renderRoute({ keepScroll: true });
        toast('已清空任务选择');
        break;
      }
      case 'toggle-review': {
        const item = el.closest('.review-item');
        if (item) {
          item.classList.toggle('open');
          el.textContent = item.classList.contains('open') ? '收起' : '解析';
        }
        break;
      }
      default:
        break;
    }
  }

  function closeSidebar() {
    const sidebar = $('#sidebar');
    if (!sidebar) return;
    sidebar.classList.remove('open');
    const scrim = $('#scrim');
    if (scrim) scrim.hidden = true;
    $('.menu-btn')?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  function onInput(e) {
    if (e.target.id === 'quizFill') {
      if (!quizSession) return;
      quizSession.selected = e.target.value;
      const confirm = $('#quizConfirm');
      if (confirm) confirm.disabled = !String(e.target.value).trim();
    } else if (e.target.id === 'examFill') {
      if (!examSession) return;
      const q = examSession.qs[examSession.index];
      const value = e.target.value;
      if (value.trim()) examSession.responses[q.id] = { value };
      else delete examSession.responses[q.id];
      updateExamIndicators();
    } else if (e.target.id === 'formulaSearch') {
      formulaQuery = e.target.value;
      applyFormulaFilter();
    } else if (e.target.id === 'searchInput') {
      renderSearchResults(e.target.value);
    }
  }

  function onKey(e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
      return;
    }
    if (e.key === 'Escape') {
      if (!$('#searchModal').hidden) closeSearch();
      else closeSidebar();
      return;
    }
    if (!$('#searchModal').hidden && e.key === 'Enter') {
      const first = $('.sr-item');
      if (first && e.target.id === 'searchInput') {
        e.preventDefault();
        first.click();
        closeSearch();
      }
      return;
    }
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
      e.preventDefault();
      openSearch();
    }
  }

  window.ShujingApp = {
    getState: () => JSON.parse(JSON.stringify(state)),
    replaceState: next => {
      suppressSync = true;
      state = { ...next };
      saveState();
      suppressSync = false;
      renderRoute({ keepScroll: true });
    },
    getMastery: () => mastery()
  };

  function init() {
    initTheme();
    if (!location.hash) history.replaceState(null, '', '#/home');
    window.addEventListener('hashchange', () => renderRoute());
    document.addEventListener('click', onClick);
    document.addEventListener('input', onInput);
    document.addEventListener('change', e => {
      if (e.target?.id === 'practiceChapter') {
        practiceFilter.chapter = e.target.value;
        renderRoute({ keepScroll: true });
      }
    });
    document.addEventListener('keydown', onKey);
    $('#searchResults')?.addEventListener('click', e => {
      if (e.target.closest('.sr-item')) closeSearch();
    });
    $('#scrim')?.addEventListener('click', closeSidebar);
    renderRoute();
  }

  function renderRank() {
    return `<div class="rank-page">
      <header class="rank-hero">
        <div class="rank-hero-copy">
          <div class="hero-kicker">CLASS LEAGUE · 学习榜单</div>
          <h1>把坚持，<em>排成一条线</em>。</h1>
          <p>按掌握知识点、答题、综合测试和活跃天数计算 XP。只展示学习统计，不公开你的答题内容。</p>
        </div>
      </header>
      <div class="rank-tabs" id="rankTabs" role="tablist" aria-label="榜单周期">
        <button type="button" class="active" data-rank-period="week" role="tab" aria-selected="true">本周</button>
        <button type="button" data-rank-period="all" role="tab" aria-selected="false">总榜</button>
      </div>
      <section class="rank-board" id="rankBoard" aria-live="polite">
        <div class="rank-empty">正在加载榜单…</div>
      </section>
      <section class="rank-rule">
        <div class="rank-rule-head">
          <div class="sidebar-label">XP RULES</div>
          <h2>分数怎么来的</h2>
        </div>
        <div class="rank-rule-grid">
          <div><span>掌握一个知识点</span><b>+8 XP</b></div>
          <div><span>答对一道题</span><b>+10 XP</b></div>
          <div><span>完成一次章节测试</span><b>+2 XP / 次</b></div>
          <div><span>完成一次综合测试</span><b>+20 XP</b></div>
          <div><span>活跃一天</span><b>+3 XP</b></div>
        </div>
        <p>榜单只用于互相激励，不作为课程成绩。进度仍然以你自己的学习记录为准。</p>
      </section>
    </div>`;
  }

  function practicePool() {
    return PRACTICE_QUESTIONS.filter(q => {
      if (practiceFilter.subject !== 'all' && q.subject !== practiceFilter.subject) return false;
      if (practiceFilter.chapter !== 'all' && q.chapter !== practiceFilter.chapter) return false;
      if (practiceFilter.tag !== 'all' && q.tag !== practiceFilter.tag) return false;
      return true;
    });
  }

  function renderPracticeChapterOptions() {
    const list = CHAPTERS.filter(c => c.subject !== 'drawing')
      .filter(c => practiceFilter.subject === 'all' || c.subject === practiceFilter.subject);
    return `<option value="all">全部章节</option>` + list.map(c =>
      `<option value="${c.id}"${practiceFilter.chapter === c.id ? ' selected' : ''}>${esc(c.title)}</option>`
    ).join('');
  }

  function renderPractice() {
    const pool = practicePool();
    const preview = shuffle(pool).slice(0, 9);
    const subjects = [['all', '全部'], ['calc', '高数'], ['linear', '线代']];
    const tags = [['all', '全部'], ['易错', '易错'], ['易混', '易混']];
    const kpTitle = id => kpById.get(id)?.kp.title || '知识点';
    return `<div class="practice-page">
      <header class="practice-hero">
        <div class="hero-kicker">AFTER-CLASS · 课后习题</div>
        <h1>易错易混，<em>单独练。</em></h1>
        <p>高数与线代的参数变式题库，共 ${TOTAL_PRACTICE} 道。只用于课后加练，不进入章节测试和综合测试。</p>
        <div class="practice-stats">
          <div><b>${PRACTICE_QUESTIONS.filter(q => q.subject === 'calc').length}</b><span>高数</span></div>
          <div><b>${PRACTICE_QUESTIONS.filter(q => q.subject === 'linear').length}</b><span>线代</span></div>
          <div><b>${TOTAL_PRACTICE}</b><span>易错易混</span></div>
        </div>
      </header>
      <section class="practice-filters">
        <div class="practice-filter-row"><span class="practice-filter-label">学科</span>${subjects.map(([v, l]) => `<button type="button" class="filter-chip${practiceFilter.subject === v ? ' active' : ''}" data-action="practice-filter" data-key="subject" data-value="${v}">${l}</button>`).join('')}</div>
        <div class="practice-filter-row"><span class="practice-filter-label">类型</span>${tags.map(([v, l]) => `<button type="button" class="filter-chip${practiceFilter.tag === v ? ' active' : ''}" data-action="practice-filter" data-key="tag" data-value="${v}">${l}</button>`).join('')}</div>
        <label class="practice-chapter-select"><span>章节</span><select id="practiceChapter">${renderPracticeChapterOptions()}</select></label>
      </section>
      <div class="practice-action-row">
        <div><b>${pool.length}</b> 道符合条件 <span>· 随机抽 20 题练习</span></div>
        <button type="button" class="btn btn-primary" data-action="practice-start">${icon('play')}开始练习</button>
      </div>
      <div class="practice-preview-grid">
        ${preview.length ? preview.map(q => `<details class="practice-card">
          <summary>
            <span class="practice-card-top"><span class="chip ${q.tag === '易错' ? 'red' : 'gold'}">${q.tag}</span><span class="practice-card-kp">${esc(kpTitle(q.kp))}</span></span>
            <span class="practice-card-stem">${raw(q.stem)}</span>
          </summary>
          <div class="practice-card-body"><b>答案：</b>${answerHTML(q)}<div class="practice-card-explain">${raw(q.explain)}</div></div>
        </details>`).join('') : `<div class="empty" style="grid-column:1/-1"><p>当前筛选没有题目，换个条件试试。</p></div>`}
      </div>
      <div class="course-note">${icon('info')} 这里只做课后加练，不改变章节测试/综合测试的抽题范围；答错或手动加入的题仍会进入错题本。</div>
    </div>`;
  }

  function startPractice() {
    const pool = practicePool();
    if (!pool.length) { toast('当前筛选没有题目'); return; }
    const qs = shuffle(pool).slice(0, 20);
    quizSession = {
      param: 'practice',
      practice: true,
      chapterId: null,
      title: '课后习题 · 易错易混',
      qs,
      index: 0,
      responses: {},
      selected: null,
      startedAt: Date.now(),
      finished: false,
      finishedAt: null
    };
    if (location.hash === '#/quiz/practice') renderRoute({ keepScroll: false });
    else location.hash = '#/quiz/practice';
  }

  function renderNotFound() {
    return `<div class="empty"><div class="empty-icon">${icon('alert')}</div><h3>这条路径还没有内容</h3><p>可能是链接不完整，回到总览重新选择吧。</p><a class="btn btn-primary" href="#/home">${icon('home')}回到学习总览</a></div>`;
  }

  init();
})();
