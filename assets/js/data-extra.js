/* 学习计划与方法论 · 原创整理 */
window.STUDY_PLAN = [
  {
    id: 'phase-1',
    name: '第一阶段 · 基础重建',
    range: '第 1–2 周',
    goal: '把教材章节顺序走一遍，每个知识点至少配 3 道基础题，先求“会”，再求“快”。',
    tasks: [
      { id: 'p1-1', title: '函数与极限：定义域 + 七种未定式', desc: '读 5 个知识点，完成本章章节测试，重点练等价无穷小和 1^∞。', chapter: 'calc-1', kind: '高数' },
      { id: 'p1-2', title: '导数与微分：把求导练成肌肉记忆', desc: '基本公式默写一遍；隐函数、参数方程各做 2 题。', chapter: 'calc-2', kind: '高数' },
      { id: 'p1-3', title: '中值定理：先背条件，再学构造', desc: '罗尔/拉格朗日/柯西各配 1 道证明；洛必达与泰勒各 3 题。', chapter: 'calc-3', kind: '高数' },
      { id: 'p1-4', title: '不定积分：四类方法排队', desc: '基本积分表默写；凑微分 4 题、分部积分 4 题。', chapter: 'calc-4', kind: '高数' },
      { id: 'p1-5', title: '定积分：换元必换限', desc: '牛莱公式、变限积分、对称区间、反常积分各练 2 题。', chapter: 'calc-5', kind: '高数' },
      { id: 'p1-6', title: '定积分应用：画图 → 微元 → 积分', desc: '面积、旋转体体积各 3 题，物理应用选做 2 题。', chapter: 'calc-6', kind: '高数' },
      { id: 'p1-7', title: '微分方程：认类型再套公式', desc: '可分离、一阶线性、二阶常系数各 2 题，整理特征根三种情况。', chapter: 'calc-7', kind: '高数' },
      { id: 'p1-8', title: '线代起步：行列式 + 矩阵', desc: '行列式性质与展开；矩阵乘法、逆、伴随各 2 题。', chapter: 'lin-1', kind: '线代' }
    ]
  },
  {
    id: 'phase-2',
    name: '第二阶段 · 题型强化',
    range: '第 3–4 周',
    goal: '按题型而不是按页码刷题。每类题整理“识别标志 → 第一步 → 易错点”，形成自己的题型卡片。',
    tasks: [
      { id: 'p2-1', title: '矩阵与逆：穿脱原则专项', desc: '把 (AB)^T、(AB)^{-1}、A* 的关系整理成一页；完成矩阵章节测试。', chapter: 'lin-2', kind: '线代' },
      { id: 'p2-2', title: '初等变换：行阶梯形流水线', desc: '每天 3 个矩阵化行最简形；完成方程组解的判定专项。', chapter: 'lin-3', kind: '线代' },
      { id: 'p2-3', title: '向量组：相关性判定专项', desc: '秩判据、极大无关组、解结构各 2 题；总结“相关/无关”判定树。', chapter: 'lin-4', kind: '线代' },
      { id: 'p2-4', title: '特征值与二次型：综合大题', desc: '特征值、对角化、正定性各 2 题；实对称矩阵单独整理。', chapter: 'lin-5', kind: '线代' },
      { id: 'p2-5', title: '高数二轮：极限与中值定理', desc: '回做前两章错题；限时 25 分钟完成两章混合小题。', chapter: 'calc-1', kind: '高数' },
      { id: 'p2-6', title: '高数二轮：积分与微分方程', desc: '积分方法混合练 10 题；完成微分方程认类型专项。', chapter: 'calc-5', kind: '高数' },
      { id: 'p2-7', title: '选学：线性空间与线性变换', desc: '若学校考，读 3 个知识点并完成 4 题；不考可跳过。', chapter: 'lin-6', kind: '线代' },
      { id: 'p2-8', title: '第一次综合测试', desc: '计时 45 分钟完成 20 题，记录错题并归因（概念/计算/审题）。', kind: '测试' }
    ]
  },
  {
    id: 'phase-3',
    name: '第三阶段 · 冲刺与查漏',
    range: '第 5–6 周',
    goal: '不再追求新题，专注错题、公式和限时手感。目标是“会做的全对”。',
    tasks: [
      { id: 'p3-1', title: '错题三遍法：第一遍重做', desc: '遮住答案重做全部错题，仍错的标记为“高危”。', kind: '错题' },
      { id: 'p3-2', title: '公式闪卡：每天 10 分钟', desc: '用公式手册的“遮盖回忆”模式，重点过积分表、泰勒展开、特征根。', kind: '公式' },
      { id: 'p3-3', title: '错题三遍法：第二遍讲出来', desc: '对每道高危题，用 1 分钟说出“考什么、第一步、易错点”。', kind: '错题' },
      { id: 'p3-4', title: '第二次综合测试', desc: '换一套随机题，计时 45 分钟，目标正确率 ≥ 80%。', kind: '测试' },
      { id: 'p3-5', title: '高频题型清单过一遍', desc: '对照每章“题型地图”，确认没有完全陌生的题型。', kind: '复盘' },
      { id: 'p3-6', title: '考前最后一遍：只看错题本', desc: '不再开新题；把错题本清到 0，或确认每道都能独立讲清。', kind: '错题' }
    ]
  }
];

window.STUDY_TIPS = [
  {
    title: '先搭框架，再填细节',
    text: '每章先看“知识地图”，知道这一章在解决什么问题，再逐个知识点深入。孤立背公式，考场上很难调用。',
    tag: '框架'
  },
  {
    title: '按题型刷，而不是按页数刷',
    text: '把题目按“识别标志 + 固定第一步”归类。例如看到根式先想三角代换，看到 1^∞ 先取对数。题型熟了，计算只是执行。',
    tag: '题型'
  },
  {
    title: '错题三遍法',
    text: '第一遍重做，第二遍讲清思路，第三遍限时独立完成。能讲出来，才是真的会；只看答案，容易产生“我懂了”的错觉。',
    tag: '错题'
  }
];

/* 课程地图：页码来自 B 站官方课程选集（2026-11 核对）。
   线性代数选集前 13P 为 2024 精简更新，P14 起为完整旧版；
   下面的章节映射统一使用完整版页码 P14–P59。 */
window.COURSE_SOURCES = {
  high: {
    id: 'high',
    title: '《高等数学》同济版',
    edition: '2024 年更新 · 同济第七版',
    teacher: '宋浩老师',
    bvid: 'BV1Eb411u7Fw',
    episodes: 195,
    hours: '约 101 小时',
    startPage: 1,
    url: 'https://www.bilibili.com/video/BV1Eb411u7Fw/',
    desc: '上册对应 P1–P76：函数与极限、导数与微分、中值定理、不定积分、定积分、定积分应用、微分方程。',
    mark: '∫'
  },
  linear: {
    id: 'linear',
    title: '《线性代数》',
    edition: '2024 年更新 · 同济第六版',
    teacher: '宋浩老师',
    bvid: 'BV1aW411Q7x1',
    episodes: 59,
    hours: '约 41 小时',
    startPage: 14,
    url: 'https://www.bilibili.com/video/BV1aW411Q7x1/',
    desc: '完整版 P14–P59：行列式、矩阵、初等变换与方程组、向量组、特征值与二次型、线性空间。视频把向量组放在方程组之前，与教材第 3、4 章顺序略有不同。',
    mark: 'A'
  }
};

window.COURSE_MAP = [
  {
    chapter: 'calc-1', course: 'high', range: 'P1–P17', start: 1,
    note: '1.1–1.10：P1 映射、P4 函数、P7 数列极限、P10 函数极限、P13 两个重要极限、P15 连续、P17 闭区间性质。'
  },
  {
    chapter: 'calc-2', course: 'high', range: 'P18–P36', start: 18,
    note: '2.1–2.5：P18 导数定义、P24 求导法则、P29 高阶导数、P30 隐函数、P31 参数方程、P33 微分。'
  },
  {
    chapter: 'calc-3', course: 'high', range: 'P37–P45', start: 37,
    note: '3.1–3.7：P37 中值定理、P39 洛必达、P40 泰勒、P41 单调性、P43 极值、P45 曲率。'
  },
  {
    chapter: 'calc-4', course: 'high', range: 'P46–P53', start: 46,
    note: '4.1–4.4：P46 定义、P50 第一类换元、P51 第二类换元、P52 分部积分、P53 有理函数。'
  },
  {
    chapter: 'calc-5', course: 'high', range: 'P54–P60', start: 54,
    note: '5.1–5.4：P54 定义与性质、P55 牛莱公式、P56 换元、P57 分部、P58–60 反常积分。'
  },
  {
    chapter: 'calc-6', course: 'high', range: 'P61–P68', start: 61,
    note: '6.1–6.3：P61 元素法、P62–65 面积（含极坐标）、P66 旋转体、P67 弧长、P68 物理应用。'
  },
  {
    chapter: 'calc-7', course: 'high', range: 'P69–P76', start: 69,
    note: '7.1–7.8：P69 概念、P70 可分离、P71 齐次、P72 一阶线性、P73 可降阶、P74–76 高阶与常系数。'
  },
  {
    chapter: 'lin-1', course: 'linear', range: 'P14–P20', start: 14,
    note: '行列式：P14–15 定义、P16 性质、P17 按行展开、P18–19 计算、P20 克拉默法则。'
  },
  {
    chapter: 'lin-2', course: 'linear', range: 'P21–P27', start: 21,
    note: '矩阵：P21 概念、P22–23 运算、P24 特殊矩阵、P25–26 逆矩阵、P27 分块矩阵。'
  },
  {
    chapter: 'lin-3', course: 'linear', range: 'P28–P32 / P39–P44', start: 28,
    note: '初等变换、秩与方程组：P28–30 初等变换、P31–32 矩阵的秩；P39–44 线性方程组（从 P39 继续）。'
  },
  {
    chapter: 'lin-4', course: 'linear', range: 'P33–P38', start: 33,
    note: '向量组：P33 n 维向量、P34–36 线性关系、P37–38 向量组的秩。'
  },
  {
    chapter: 'lin-5', course: 'linear', range: 'P45–P57', start: 45,
    note: '特征值与二次型：P45–47 特征值、P49 相似、P50–52 正交对角化、P53–57 二次型与正定性。'
  },
  {
    chapter: 'lin-6', course: 'linear', range: 'P58–P59', start: 58,
    note: '线性空间：P58 定义与性质、P59 维数、基与坐标；部分学校不考，可按需选看。'
  }
];

window.COURSE_STEPS = [
  {
    title: '先看目录，不急着播放',
    text: '用站内“知识地图”花 3 分钟扫一遍本章概念，带着问题去听课，比被动跟播效率高。'
  },
  {
    title: '1.25–1.5 倍速，遇到例题就暂停',
    text: '例题暂停后先自己写，再继续播放对照。看懂了不等于会写，手必须动一次。'
  },
  {
    title: '回到站内，用 12 道题收口',
    text: '看完视频当天做本章测试；错题进错题本，第二天重做并讲清“为什么错”。'
  }
];

window.SITE_META = {
  name: '数径',
  subtitle: '高数 × 线代 · 大一上复习站',
  edition: '同济《高等数学》第七版上册 · 同济《线性代数》第六版',
  note: '站内题目与解析均为原创，题型设计参考常见期末考法与“基础—强化—易错”的训练思路，不复制任何教材、课程或题集原文。'
};
