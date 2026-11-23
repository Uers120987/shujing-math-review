/* 高等数学（同济七版上册）知识库 · 原创整理 */
const T = String.raw;

window.CALC_CHAPTERS = [
  {
    id: 'calc-1',
    subject: 'calc',
    order: 1,
    title: '函数与极限',
    en: 'Functions & Limits',
    bookRef: '同济七版 §1.1–1.10',
    intro: '极限是整门课的地基。这一章决定你后面能不能看懂导数、积分和级数，重点不是背定义，而是把“极限怎么算”练成条件反射。',
    weight: '期末约 18%',
    hours: '建议 3 天',
    tags: ['七种未定式', '等价无穷小', '连续'],
    drills: ['0/0 型', '∞/∞ 型', '1^∞ 型', '无穷小比较', '分段函数连续性', '间断点分类', '零点定理'],
    map: [
      { t: '函数', d: '定义域与初等函数' },
      { t: '极限', d: '左右极限与存在准则' },
      { t: '无穷小', d: '等价替换与阶' },
      { t: '连续', d: '间断点与闭区间性质' }
    ],
    kps: [
      {
        id: 'calc-1-1',
        title: '函数：先看定义域，再谈其他',
        tag: '基础',
        summary: '一切函数题的第一步都是定义域。复合函数要会“拆”，反函数要会“换”，奇偶性（偶 / 奇）、周期性常用来简化定积分。',
        formulas: [
          { label: '复合函数', tex: T`(f\circ g)(x)=f\bigl(g(x)\bigr)` },
          { label: '奇偶性（偶 / 奇）', tex: T`f(-x)=f(x)\quad\text{even};\qquad f(-x)=-f(x)\quad\text{odd}` },
          { label: '反函数', tex: T`y=f(x)\ \Longleftrightarrow\ x=f^{-1}(y)` }
        ],
        points: [
          '常见限制：分母不为 0、偶次根号内 ≥ 0、对数真数 > 0、反正弦/反余弦内 ∈ [−1,1]、tan 内 ≠ π/2+kπ。',
          '判断两个函数是否相同，只看“定义域 + 对应法则”，与自变量字母无关。',
          '复合函数分解按“由外向内”剥洋葱，例如 y=ln(sin²x) 可拆成 y=ln u，u=v²，v=sin x。'
        ],
        mnemonic: '定义域先行，奇偶看对称；复合由外拆，反函数据换字母。',
        pitfall: '化简约分可能改变定义域。例如 x/x 与 1 不是同一个函数，前者在 x=0 处无定义。'
      },
      {
        id: 'calc-1-2',
        title: '极限与左右极限',
        tag: '基础',
        summary: '函数极限存在，当且仅当左右极限都存在且相等。分段函数在分界点、含绝对值、含取整的题，必须分左右。',
        formulas: [
          { label: '极限存在判据', tex: T`\lim_{x\to x_0}f(x)=A\iff f(x_0^-)=f(x_0^+)=A` },
          { label: '无穷小定义', tex: T`\lim_{x\to x_0}\alpha(x)=0` },
          { label: '局部有界性', tex: T`\lim_{x\to x_0}f(x)=A\Rightarrow\exists M,\delta>0:\ |f(x)|\le M\ (0<|x-x_0|<\delta)` }
        ],
        points: [
          '极限只看 x₀ 附近，与 f(x₀) 是否有定义、取什么值无关。',
          'x→∞ 也要分 x→+∞ 与 x→−∞；例如 e^x 两端行为完全不同。',
          '无穷小不是“很小的数”，而是极限为 0 的变量；0 是唯一的常数无穷小。'
        ],
        mnemonic: '分段看分界，绝对值看正负，e^x 看两端，取整看跳点。',
        pitfall: 'lim f(x) 存在不能推出 f(x₀) 有定义，更不能推出连续。'
      },
      {
        id: 'calc-1-3',
        title: '无穷小比较与等价替换',
        tag: '核心',
        summary: '乘除因子可以放心用等价无穷小替换，加减项要谨慎。掌握常用等价关系，能把大部分 0/0 型极限压缩成一行。',
        formulas: [
          {
            label: 'x→0 常用等价无穷小',
            tex: T`\begin{aligned}\sin x&\sim x, & \tan x&\sim x, & \arcsin x&\sim x,\\ \arctan x&\sim x, & 1-\cos x&\sim \tfrac12x^2, & \ln(1+x)&\sim x,\\ e^x-1&\sim x, & (1+x)^\alpha-1&\sim \alpha x, & a^x-1&\sim x\ln a.\end{aligned}`
          },
          { label: '无穷小阶', tex: T`\lim\frac{\beta}{\alpha}=0\Rightarrow \beta=o(\alpha)` },
          { label: '等价替换（乘除）', tex: T`\alpha\sim\alpha',\ \beta\sim\beta'\Rightarrow \lim\frac{\alpha}{\beta}=\lim\frac{\alpha'}{\beta'}` }
        ],
        points: [
          '替换的本质是乘除因子整体替换，不是把式子里任意一块单独换掉。',
          '加减法先通分、提公因式、有理化，制造出乘积结构后再替换。',
          '常见坑：sin x−tan x 不能换成 x−x=0，应先提取 tan x 或展开到三阶。'
        ],
        mnemonic: '乘除大胆换，加减先变形；一阶不够用，泰勒来兜底。',
        pitfall: '“等价”只保证比值趋于 1，不保证差趋于 0。加减法中直接替换常丢高阶项，导致答案错误。'
      },
      {
        id: 'calc-1-4',
        title: '两个重要极限与 1^∞ 型',
        tag: '核心',
        summary: '第一个重要极限解决三角/反三角的 0/0 型；第二个重要极限是处理 1^∞ 型的母公式。“凑形式”比“套公式”重要。',
        formulas: [
          { label: '第一个重要极限', tex: T`\lim_{x\to0}\frac{\sin x}{x}=1` },
          { label: '第二个重要极限', tex: T`\lim_{x\to\infty}\left(1+\frac1x\right)^x=e` },
          { label: '1^∞ 型三步法', tex: T`\lim u^v=\exp\!\left(\lim v(u-1)\right)\quad(u\to1,\ v\to\infty)` }
        ],
        points: [
          '第一个重要极限要求“sin 的角”与“分母”完全一致，且同时趋于 0。',
          '第二个重要极限的推广：lim(1+α)^{1/α}=e（α→0），关键是凑出互为倒数的结构。',
          '1^∞ 型标准流程：写成 e^{v ln u}，或直接用 e^{lim v(u−1)}；两种写法结果一致。'
        ],
        mnemonic: 'sin 角要同名，1 加无穷小凑倒数；1^∞ 先取对数，指数极限单独算。',
        pitfall: '1^∞ 不是 1，也不是 e。底数趋近 1、指数趋近无穷，结果取决于两者“赛跑”的速度。'
      },
      {
        id: 'calc-1-5',
        title: '连续、间断点与闭区间性质',
        tag: '核心',
        summary: '连续 = 极限值等于函数值。间断点按左右极限是否都存在分为第一类、第二类；闭区间连续函数的四条性质是证明题的主力。',
        formulas: [
          { label: '连续定义', tex: T`\lim_{x\to x_0}f(x)=f(x_0)` },
          { label: '间断点分类', tex: T`f(x_0^-),f(x_0^+)\ \text{exist}\Rightarrow\text{Class I}` },
          { label: '零点定理', tex: T`f(a)f(b)<0\Rightarrow \exists\,\xi\in(a,b),\ f(\xi)=0` }
        ],
        points: [
          '第一类间断点：左右极限相等为可去间断点，不等为跳跃间断点。',
          '第二类间断点：无穷间断点（如 1/x）、振荡间断点（如 sin(1/x)）。',
          '闭区间连续函数：有界、取得最大值最小值、介值定理、零点定理。证明方程有根优先想零点定理。'
        ],
        mnemonic: '连续三要件：有定义、有极限、极限等于函数值。',
        pitfall: '“左右极限都存在”不等于“极限存在”，还必须相等；可去间断点补上定义即可连续。'
      }
    ],
    examples: [
      {
        title: '等价无穷小的乘除替换',
        tag: '0/0 型',
        question: T`求 $\displaystyle\lim_{x\to0}\frac{\tan x-\sin x}{x^3}$。`,
        steps: [
          T`先提取公因式，制造乘积结构：$\tan x-\sin x=\tan x(1-\cos x)$。`,
          T`当 $x\to0$ 时，$\tan x\sim x$，$1-\cos x\sim\frac12x^2$。`,
          T`因此原式 $=\lim\frac{x\cdot\frac12x^2}{x^3}=\frac12$。`
        ],
        answer: T`$\dfrac12$`
      },
      {
        title: '1^∞ 型：凑第二个重要极限',
        tag: '1^∞ 型',
        question: T`求 $\displaystyle\lim_{x\to\infty}\left(\frac{x+1}{x-1}\right)^x$。`,
        steps: [
          T`底数拆成 $1+\dfrac{2}{x-1}$，指数凑出倒数 $\dfrac{x-1}{2}$。`,
          T`原式 $=\lim\left[\left(1+\dfrac{2}{x-1}\right)^{\frac{x-1}{2}}\right]^{\frac{2x}{x-1}}$。`,
          T`方括号内趋于 $e$，指数趋于 $2$，所以极限为 $e^2$。`
        ],
        answer: T`$e^2$`
      },
      {
        title: '分段函数在分界点的连续性',
        tag: '易错',
        question: T`设 $f(x)=\begin{cases}\dfrac{e^x-1}{x},&x\ne0,\\ a,&x=0.\end{cases}$ 若 $f(x)$ 在 $x=0$ 处连续，求 $a$。`,
        steps: [
          T`连续要求 $\lim_{x\to0}f(x)=f(0)=a$。`,
          T`由等价无穷小 $e^x-1\sim x$，得 $\lim_{x\to0}\dfrac{e^x-1}{x}=1$。`,
          T`所以 $a=1$。`
        ],
        answer: T`$a=1$`
      }
    ]
  },
  {
    id: 'calc-2',
    subject: 'calc',
    order: 2,
    title: '导数与微分',
    en: 'Derivatives & Differentials',
    bookRef: '同济七版 §2.1–2.5',
    intro: '导数描述“瞬时变化率”，微分描述“局部线性替代”。这一章的题型很固定：定义、复合、隐函数、参数方程、高阶，各练透一类就够。',
    weight: '期末约 16%',
    hours: '建议 3 天',
    tags: ['导数定义', '链式法则', '隐函数'],
    drills: ['导数定义', '复合求导', '隐函数求导', '参数方程二阶导', '高阶导数', '微分近似'],
    map: [
      { t: '定义', d: '增量比的极限' },
      { t: '法则', d: '四则、复合、反函数' },
      { t: '类型', d: '隐函数、参数、对数' },
      { t: '微分', d: '局部线性近似' }
    ],
    kps: [
      {
        id: 'calc-2-1',
        title: '导数定义与可导性',
        tag: '基础',
        summary: '导数是一点处的增量比极限。定义题常考“凑增量”，可导必连续，连续不一定可导。',
        formulas: [
          { label: '导数定义', tex: T`f'(x_0)=\lim_{\Delta x\to0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}` },
          { label: '左右导数', tex: T`f'(x_0)=f'_-(x_0)=f'_+(x_0)` },
          { label: '几何意义', tex: T`k=f'(x_0),\quad y-f(x_0)=f'(x_0)(x-x_0)` }
        ],
        points: [
          '可导 ⇒ 连续；连续 ⇏ 可导（如 y=|x| 在 0 处）。',
          '分段函数在分界点可导，需要左右导数都存在且相等。',
          '定义题看到 f(x₀+ah)−f(x₀+bh) 除以 h，先补分母再乘系数，结果是 (a−b)f′(x₀)。'
        ],
        mnemonic: '可导必连续，连续未必可导；尖点、断点、竖直切线都不可导。',
        pitfall: 'f′(x₀) 是一个数，f′(x) 是函数；在 x₀ 可导不代表导函数在 x₀ 连续。'
      },
      {
        id: 'calc-2-2',
        title: '求导法则：链式法则是核心',
        tag: '核心',
        summary: '四则法则 + 基本公式 + 链式法则，能解决绝大多数显函数求导。复合函数的关键是“由外向内，逐层乘导”。',
        formulas: [
          { label: '乘积法则', tex: T`(uv)'=u'v+uv'` },
          { label: '商法则', tex: T`\left(\frac uv\right)'=\frac{u'v-uv'}{v^2}` },
          { label: '链式法则', tex: T`\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}` },
          { label: '反函数求导', tex: T`\frac{dx}{dy}=\frac{1}{y'(x)}` }
        ],
        points: [
          '基本公式必须熟：幂、指、对、三角、反三角，一个都不能卡。',
          '复合层次多时先在草稿上写 y=f(u), u=g(v), v=h(x)，再相乘。',
          '对数求导法适合幂指函数 u^v 和多个因子连乘除的函数。'
        ],
        mnemonic: '外层求导不动内层，乘上内层导数；一层一层剥，别漏最后一层。',
        pitfall: '(uv)′ ≠ u′v′，商法则分子顺序不能反；链式法则不要漏乘内层导数。'
      },
      {
        id: 'calc-2-3',
        title: '高阶导数与莱布尼茨公式',
        tag: '强化',
        summary: '高阶导数就是反复求导。常见函数的 n 阶导数要背，乘积的 n 阶导数用莱布尼茨公式。',
        formulas: [
          { label: '指数函数', tex: T`(e^{ax})^{(n)}=a^ne^{ax}` },
          { label: '正弦函数', tex: T`(\sin x)^{(n)}=\sin\!\left(x+\frac{n\pi}{2}\right)` },
          { label: '幂函数', tex: T`(x^n)^{(n)}=n!,\quad (x^m)^{(n)}=0\ (n>m)` },
          { label: '莱布尼茨公式', tex: T`(uv)^{(n)}=\sum_{k=0}^{n}\binom{n}{k}u^{(n-k)}v^{(k)}` }
        ],
        points: [
          '找规律题先算前 3 阶，再归纳 n 阶，最后用数学归纳法验证。',
          '有理分式先拆成部分分式，再逐项求 n 阶导。',
          '莱布尼茨公式中有一项为多项式时，只有前几项非零，计算量骤减。'
        ],
        mnemonic: '指数提出 a^n，正弦加 nπ/2，幂函数到 n 阶变 n!。',
        pitfall: 'sin 的 n 阶导是 sin(x+nπ/2)，不是 sin(nx)；cos 的相位同理。'
      },
      {
        id: 'calc-2-4',
        title: '隐函数、参数方程与对数求导',
        tag: '核心',
        summary: '隐函数两边对 x 求导，把 y 看成 x 的函数；参数方程用 dy/dx=(dy/dt)/(dx/dt)；幂指函数先取对数。',
        formulas: [
          { label: '隐函数求导', tex: T`\frac{dy}{dx}=-\frac{F_x}{F_y}` },
          { label: '参数方程一阶导', tex: T`\frac{dy}{dx}=\frac{dy/dt}{dx/dt}` },
          { label: '参数方程二阶导', tex: T`\frac{d^2y}{dx^2}=\frac{d}{dt}\!\left(\frac{dy}{dx}\right)\Big/\frac{dx}{dt}` },
          { label: '对数求导', tex: T`y=u^v\Rightarrow \ln y=v\ln u` }
        ],
        points: [
          '隐函数求导后把 y′ 当成未知数解方程，结果中允许含 y。',
          '参数方程二阶导不是分别求二阶导再相除，必须对一阶导再对 t 求导后除以 x′(t)。',
          '对数求导法特别适合 y=x^x、y=(x+1)^2(x−2)/√(x+3) 这类结构。'
        ],
        mnemonic: '隐函数边求边解，参数方程上下求；二阶导再除一次 x′(t)。',
        pitfall: '参数方程二阶导最常见的错误：直接写成 y″(t)/x″(t)。'
      },
      {
        id: 'calc-2-5',
        title: '微分与近似计算',
        tag: '基础',
        summary: '微分是函数增量的线性主部。可微与可导等价，微分形式不变性是换元积分的基础。',
        formulas: [
          { label: '微分定义', tex: T`dy=f'(x)\,dx` },
          { label: '线性近似', tex: T`f(x_0+\Delta x)\approx f(x_0)+f'(x_0)\Delta x` },
          { label: '一阶微分形式不变性', tex: T`dy=f'(u)\,du,\quad u=\varphi(x)` }
        ],
        points: [
          'Δy = f(x₀+Δx)−f(x₀) 是实际增量，dy 是线性近似，二者差是 o(Δx)。',
          '近似计算三件套：选 x₀、算 f(x₀) 与 f′(x₀)、代公式。',
          '微分形式不变性解释了为什么凑微分法可以“换元不换形式”。'
        ],
        mnemonic: '增量拆成线性主部加高阶无穷小；近似计算选好基准点。',
        pitfall: 'dy 与 Δy 不相等，只有 |Δx| 很小时才近似相等；dy 可以为 0，Δy 未必。'
      }
    ],
    examples: [
      {
        title: '隐函数在一点处的导数',
        tag: '隐函数',
        question: T`设 $e^y+xy=e$，求曲线在点 $(0,1)$ 处的切线斜率。`,
        steps: [
          T`两边对 $x$ 求导，注意 $y=y(x)$：$e^y y'+y+xy'=0$。`,
          T`解出 $y'=-\dfrac{y}{e^y+x}$。`,
          T`代入 $(0,1)$：$y'=-\dfrac{1}{e+0}=-\dfrac1e$。`
        ],
        answer: T`切线斜率 $k=-\dfrac1e$`
      },
      {
        title: '参数方程的二阶导数',
        tag: '易错',
        question: T`设 $\begin{cases}x=t-\sin t,\\ y=1-\cos t,\end{cases}$ 求 $\dfrac{d^2y}{dx^2}$。`,
        steps: [
          T`先求一阶导：$\dfrac{dy}{dx}=\dfrac{\sin t}{1-\cos t}$。`,
          T`再对 $t$ 求导：$\dfrac{d}{dt}\left(\dfrac{\sin t}{1-\cos t}\right)=\dfrac{\cos t(1-\cos t)-\sin^2t}{(1-\cos t)^2}=\dfrac{-1}{1-\cos t}$。`,
          T`最后除以 $x'(t)=1-\cos t$，得 $\dfrac{d^2y}{dx^2}=-\dfrac{1}{(1-\cos t)^2}$。`
        ],
        answer: T`$-\dfrac{1}{(1-\cos t)^2}$`
      }
    ]
  },
  {
    id: 'calc-3',
    subject: 'calc',
    order: 3,
    title: '微分中值定理与导数的应用',
    en: 'Mean Value Theorems & Applications',
    bookRef: '同济七版 §3.1–3.7',
    intro: '这一章是上册的“证明题重灾区”，也是期末压轴常客。中值定理负责证明，洛必达和泰勒负责计算，单调性/凹凸性负责画图与最值。',
    weight: '期末约 18%',
    hours: '建议 4 天',
    tags: ['中值定理', '洛必达', '泰勒公式'],
    drills: ['罗尔定理', '拉格朗日中值定理', '洛必达法则', '泰勒展开', '单调极值', '凹凸拐点', '渐近线'],
    map: [
      { t: '中值定理', d: '罗尔、拉格朗日、柯西' },
      { t: '计算', d: '洛必达与泰勒' },
      { t: '性态', d: '单调、极值、凹凸' },
      { t: '作图', d: '最值、渐近线、曲率' }
    ],
    kps: [
      {
        id: 'calc-3-1',
        title: '三大中值定理与辅助函数',
        tag: '核心',
        summary: '罗尔是基础，拉格朗日是桥梁，柯西是比值版本。证明题的关键是根据结论反推辅助函数。',
        formulas: [
          { label: '罗尔定理', tex: T`f(a)=f(b)\Rightarrow \exists\xi\in(a,b),\ f'(\xi)=0` },
          { label: '拉格朗日中值定理', tex: T`f(b)-f(a)=f'(\xi)(b-a)` },
          { label: '柯西中值定理', tex: T`\frac{f(b)-f(a)}{g(b)-g(a)}=\frac{f'(\xi)}{g'(\xi)}` }
        ],
        points: [
          '三个定理都要求：闭区间连续、开区间可导；罗尔额外要求端点函数值相等。',
          '见到“存在 ξ 使 f′(ξ)=某式”，先把结论整理成“某函数导数为 0”的形式，再构造 F。',
          '常用辅助函数：e^{−x}f(x)、xf(x)、f(x)/x、f(x)e^{g(x)}。'
        ],
        mnemonic: '结论反推辅助函数，求导验证端点相等；罗尔找驻点，拉格朗日连两端。',
        pitfall: '定理只保证 ξ 存在，不保证唯一；开区间条件不能省，闭区间端点不可导时定理可能失效。'
      },
      {
        id: 'calc-3-2',
        title: '洛必达法则：有条件地“上下求导”',
        tag: '核心',
        summary: '只处理 0/0 或 ∞/∞ 型。求导后极限存在（或为 ∞）才能用；循环、震荡、越导越复杂时果断换方法。',
        formulas: [
          { label: '0/0 型', tex: T`\lim\frac{f}{g}=\lim\frac{f'}{g'}\quad\left(\frac00\right)` },
          { label: '∞/∞ 型', tex: T`\lim\frac{f}{g}=\lim\frac{f'}{g'}\quad\left(\frac\infty\infty\right)` },
          { label: '其他型转化', tex: T`0\cdot\infty,\ \infty-\infty,\ 1^\infty,\ 0^0,\ \infty^0` }
        ],
        points: [
          '使用前先代入判断型，非未定式直接算，不能滥用。',
          '每用一次都要重新检查型；常与等价无穷小、提公因式配合。',
          '数列极限不能直接对 n 求导，应先转为连续变量 x，再用洛必达。'
        ],
        mnemonic: '先定型，再求导；一次不够可再用，但每次都要验型。',
        pitfall: 'lim f′/g′ 不存在时，不能反推原极限不存在；洛必达失效只说明“此路不通”，不代表原极限不存在。'
      },
      {
        id: 'calc-3-3',
        title: '泰勒公式与常用展开',
        tag: '强化',
        summary: '泰勒公式是“用多项式逼近函数”的终极工具。求极限、估阶、证明不等式，展开到足够阶数就能解决。',
        formulas: [
          { label: '麦克劳林公式', tex: T`f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(0)}{k!}x^k+o(x^n)` },
          { label: 'e^x', tex: T`e^x=1+x+\frac{x^2}{2!}+\cdots+\frac{x^n}{n!}+o(x^n)` },
          { label: 'sin x / cos x', tex: T`\sin x=x-\frac{x^3}{3!}+o(x^3),\quad \cos x=1-\frac{x^2}{2!}+o(x^2)` },
          { label: 'ln(1+x)', tex: T`\ln(1+x)=x-\frac{x^2}{2}+\frac{x^3}{3}+o(x^3)` }
        ],
        points: [
          '展开阶数由分母的最低阶决定：分母是 x³，分子至少展到 x³。',
          '常用展开要背到“够用”的阶：e^x、sin、cos、ln(1+x)、(1+x)^α。',
          '带佩亚诺余项适合求极限；带拉格朗日余项适合证明不等式和误差估计。'
        ],
        mnemonic: '分母定阶数，分子展到位；低阶抵消完，高阶来定值。',
        pitfall: '展开阶数不够会出现“全抵消成 0”的假象；余项 o(x^n) 不能随意丢，必须保证比保留项高阶。'
      },
      {
        id: 'calc-3-4',
        title: '单调性、极值与凹凸性',
        tag: '核心',
        summary: '一阶导看增减与极值，二阶导看凹凸与拐点。列表法是标准动作，别跳步。',
        formulas: [
          { label: '单调判据', tex: T`f'(x)>0\Rightarrow\uparrow;\quad f'(x)<0\Rightarrow\downarrow` },
          { label: '极值第二充分条件', tex: T`f'(x_0)=0,\ f''(x_0)<0\Rightarrow\text{max}` },
          { label: '凹凸判据', tex: T`f''(x)>0\Rightarrow\smile;\quad f''(x)<0\Rightarrow\frown` }
        ],
        points: [
          '极值点必须是驻点或不可导点，但驻点不一定是极值点（如 y=x³ 在 0）。',
          '拐点是曲线凹凸性改变的点，要求 f″ 变号，且点必须在曲线上。',
          '含参数的单调性讨论，先求导再按判别式或根的位置分类。'
        ],
        mnemonic: '一阶定升降，二阶定弯向；极值看变号，拐点也看变号。',
        pitfall: 'f″(x₀)=0 不能直接判拐点，必须检查两侧二阶导是否异号。'
      },
      {
        id: 'calc-3-5',
        title: '最值、渐近线与曲率',
        tag: '强化',
        summary: '闭区间最值只比较“驻点 + 不可导点 + 端点”；渐近线分水平、垂直、斜三类；曲率公式记住分子绝对值。',
        formulas: [
          { label: '斜渐近线', tex: T`a=\lim_{x\to\infty}\frac{f(x)}{x},\quad b=\lim_{x\to\infty}[f(x)-ax]` },
          { label: '曲率', tex: T`K=\frac{|y''|}{(1+y'^2)^{3/2}}` },
          { label: '曲率半径', tex: T`\rho=\frac1K` }
        ],
        points: [
          '垂直渐近线找使函数趋于无穷的点；水平渐近线看 x→±∞ 的极限。',
          '斜渐近线必须分别检查 x→+∞ 与 x→−∞，两侧可能不同。',
          '最值应用题：设变量、写目标函数、定定义域、求导、比较端点。'
        ],
        mnemonic: '最值三查：驻点、不可导点、端点；渐近三找：竖直、水平、斜。',
        pitfall: '最值不一定在驻点取到；开区间内唯一极值不一定是最值，需结合单调性。'
      }
    ],
    examples: [
      {
        title: '用单调性证明不等式',
        tag: '证明题',
        question: T`证明：当 $x>0$ 时，$\ln(1+x)<x$。`,
        steps: [
          T`构造 $F(x)=x-\ln(1+x)$，则 $F(0)=0$。`,
          T`$F'(x)=1-\dfrac{1}{1+x}=\dfrac{x}{1+x}>0\ (x>0)$，所以 $F$ 在 $[0,+\infty)$ 上单调递增。`,
          T`故 $x>0$ 时 $F(x)>F(0)=0$，即 $\ln(1+x)<x$。`
        ],
        answer: T`不等式成立`
      },
      {
        title: '洛必达 + 等价无穷小',
        tag: '0/0 型',
        question: T`求 $\displaystyle\lim_{x\to0}\left(\frac{1}{x^2}-\frac{1}{x\sin x}\right)$。`,
        steps: [
          T`通分：$\dfrac{\sin x-x}{x^2\sin x}$，这是 $0/0$ 型。`,
          T`分母用等价无穷小 $x^2\sin x\sim x^3$。`,
          T`分子用泰勒展开 $\sin x=x-\dfrac{x^3}{6}+o(x^3)$，得 $\sin x-x\sim-\dfrac{x^3}{6}$。`,
          T`所以原式 $=\lim\dfrac{-x^3/6}{x^3}=-\dfrac16$。`
        ],
        answer: T`$-\dfrac16$`
      }
    ]
  },
  {
    id: 'calc-4',
    subject: 'calc',
    order: 4,
    title: '不定积分',
    en: 'Indefinite Integrals',
    bookRef: '同济七版 §4.1–4.4',
    intro: '积分是求导的逆运算。上册积分题的核心不是“会不会”，而是“能不能一眼看出该凑什么”。四类方法要形成优先级。',
    weight: '期末约 14%',
    hours: '建议 3 天',
    tags: ['凑微分', '换元', '分部积分'],
    drills: ['基本积分表', '第一类换元', '第二类换元', '分部积分', '有理函数积分'],
    map: [
      { t: '原函数', d: '积分是求导的逆' },
      { t: '换元', d: '凑微分与三角代换' },
      { t: '分部', d: '乘积结构的拆解' },
      { t: '有理函数', d: '部分分式' }
    ],
    kps: [
      {
        id: 'calc-4-1',
        title: '原函数与基本积分表',
        tag: '基础',
        summary: '不定积分是全体原函数，结果必须带常数 C。基本积分表要背到“看到就能写”。',
        formulas: [
          { label: '原函数关系', tex: T`\left(\int f(x)\,dx\right)'=f(x)` },
          { label: '幂函数', tex: T`\int x^\alpha\,dx=\frac{x^{\alpha+1}}{\alpha+1}+C\ (\alpha\ne-1)` },
          { label: '指数与三角', tex: T`\int e^x dx=e^x+C,\quad \int\sin x\,dx=-\cos x+C` },
          { label: '反三角相关', tex: T`\int\frac{dx}{1+x^2}=\arctan x+C,\quad \int\frac{dx}{\sqrt{1-x^2}}=\arcsin x+C` }
        ],
        points: [
          '求导与积分互为逆运算，做完积分可以求导验算。',
          '积分结果中的 C 不能漏，尤其是填空题。',
          '基本表要覆盖：幂、1/x、指数、sin/cos、sec²/csc²、sec tan、1/(1+x²)、1/√(1−x²)。'
        ],
        mnemonic: '积分先查表，验算靠求导；结果别忘 C。',
        pitfall: '∫x^{−1}dx=ln|x|+C，不是 ln x+C；绝对值在定义域上很重要。'
      },
      {
        id: 'calc-4-2',
        title: '第一类换元法（凑微分）',
        tag: '核心',
        summary: '把被积表达式中的一部分“塞进”微分里。关键是从被积函数中认出某个函数的导数。',
        formulas: [
          { label: '凑微分公式', tex: T`\int f(\varphi(x))\varphi'(x)\,dx=\int f(u)\,du` },
          { label: '常用凑法', tex: T`dx=\frac1a\,d(ax+b),\quad x\,dx=\frac12\,d(x^2)` },
          { label: '三角凑法', tex: T`\cos x\,dx=d(\sin x),\quad \frac{dx}{x}=d(\ln x)` }
        ],
        points: [
          '先观察“谁是谁的导数”，再决定把谁凑进 d 后面。',
          '常见结构：f(ax+b)、f(x²)x、f(ln x)/x、f(sin x)cos x。',
          '凑完后必须把 u 换回 x（不定积分），并加 C。'
        ],
        mnemonic: '见复合想换元，见导数凑微分；换完记得换回来。',
        pitfall: '换元后忘记换回原变量，或漏乘 dx 与 du 之间的系数。'
      },
      {
        id: 'calc-4-3',
        title: '第二类换元法（三角代换）',
        tag: '强化',
        summary: '被积函数含根式时，用三角代换消去根号。三种根式对应三种代换，画直角三角形辅助回代。',
        formulas: [
          { label: '平方和', tex: T`\sqrt{a^2+x^2}:\ x=a\tan t` },
          { label: '平方差', tex: T`\sqrt{a^2-x^2}:\ x=a\sin t` },
          { label: '差平方', tex: T`\sqrt{x^2-a^2}:\ x=a\sec t` }
        ],
        points: [
          '代换后 dx 也要换，别只换被积函数。',
          '三角代换后利用恒等式化简根号，注意 t 的范围保证开方取正。',
          '最后用直角三角形或反三角把 t 换回 x。'
        ],
        mnemonic: '和用 tan，差用 sin，外减内用 sec；根号消掉再积分。',
        pitfall: '√(x²)=|x|，开方时符号由 t 的范围决定，不能默认等于 x。'
      },
      {
        id: 'calc-4-4',
        title: '分部积分法',
        tag: '核心',
        summary: '适用于“两类函数相乘”的积分。选择 u 的顺序直接影响难度，口诀“反对幂三指”是经验法则。',
        formulas: [
          { label: '分部积分公式', tex: T`\int u\,dv=uv-\int v\,du` },
          { label: 'u 的选择顺序（反、对、幂、三、指）', tex: T`\text{inv}\to\text{log}\to\text{poly}\to\text{trig}\to\text{exp}` },
          { label: '循环积分', tex: T`I=\int e^x\sin x\,dx\Rightarrow I=\frac{e^x(\sin x-\cos x)}2+C` }
        ],
        points: [
          'u 选“求导后变简单”的，dv 选“容易积分”的。',
          '多项式乘指数/三角，通常令 u=多项式，多次分部直到多项式消失。',
          '出现与原积分相同的项时移项解方程，注意最后加 C。'
        ],
        mnemonic: '反对幂三指，谁在前谁做 u；越积越简单，循环就移项。',
        pitfall: 'u、dv 选反会导致越积越复杂；移项时忘记除以系数或漏加 C。'
      },
      {
        id: 'calc-4-5',
        title: '有理函数与简单无理函数',
        tag: '强化',
        summary: '有理函数先化为真分式，再部分分式分解；分母有重根、不可约二次因式时分别处理。',
        formulas: [
          { label: '部分分式', tex: T`\frac{P(x)}{(x-a)(x-b)}=\frac{A}{x-a}+\frac{B}{x-b}` },
          { label: '重根', tex: T`\frac{P(x)}{(x-a)^2}=\frac{A}{x-a}+\frac{B}{(x-a)^2}` },
          { label: '不可约二次', tex: T`\frac{Cx+D}{x^2+px+q}` }
        ],
        points: [
          '先做多项式除法，把假分式化为“多项式 + 真分式”。',
          '分母能因式分解就先分解，再待定系数。',
          '含 √(ax+b) 时可直接令 t=√(ax+b)，转化为有理函数积分。'
        ],
        mnemonic: '假分式先除，真分式再拆；分母怎么分解，部分分式就怎么写。',
        pitfall: '重根要写全各次幂，不能只写一个；待定系数后要通分核对。'
      }
    ],
    examples: [
      {
        title: '分部积分经典结构',
        tag: '分部积分',
        question: T`求 $\displaystyle\int xe^x\,dx$。`,
        steps: [
          T`令 $u=x$，$dv=e^x dx$，则 $du=dx$，$v=e^x$。`,
          T`原式 $=xe^x-\displaystyle\int e^x dx$。`,
          T`$=xe^x-e^x+C=(x-1)e^x+C$。`
        ],
        answer: T`$(x-1)e^x+C$`
      },
      {
        title: '配方后套基本公式',
        tag: '凑微分',
        question: T`求 $\displaystyle\int\frac{dx}{x^2+4x+5}$。`,
        steps: [
          T`分母配方：$x^2+4x+5=(x+2)^2+1$。`,
          T`令 $u=x+2$，$du=dx$，原式 $=\displaystyle\int\frac{du}{u^2+1}$。`,
          T`$=\arctan u+C=\arctan(x+2)+C$。`
        ],
        answer: T`$\arctan(x+2)+C$`
      }
    ]
  },
  {
    id: 'calc-5',
    subject: 'calc',
    order: 5,
    title: '定积分',
    en: 'Definite Integrals',
    bookRef: '同济七版 §5.1–5.4',
    intro: '定积分是一个数，不定积分是一族函数。牛顿-莱布尼茨公式把两者连起来；换元必换限，是这一章最容易丢分的地方。',
    weight: '期末约 16%',
    hours: '建议 3 天',
    tags: ['牛莱公式', '变限积分', '反常积分'],
    drills: ['定积分性质', '变限积分求导', '换元换限', '对称区间', '华里士公式', '反常积分敛散性'],
    map: [
      { t: '定义', d: '黎曼和与几何意义' },
      { t: '计算', d: '牛莱公式与换元' },
      { t: '变限', d: '积分上限函数' },
      { t: '推广', d: '反常积分' }
    ],
    kps: [
      {
        id: 'calc-5-1',
        title: '定积分的概念与性质',
        tag: '基础',
        summary: '定积分是极限，是一个确定的数。性质中“保号性、估值、中值定理”常用于比较大小和证明。',
        formulas: [
          { label: '黎曼和', tex: T`\int_a^b f(x)\,dx=\lim_{\lambda\to0}\sum_{i=1}^{n}f(\xi_i)\Delta x_i` },
          { label: '区间可加', tex: T`\int_a^b=\int_a^c+\int_c^b` },
          { label: '积分中值定理', tex: T`\int_a^b f(x)\,dx=f(\xi)(b-a),\ \xi\in[a,b]` }
        ],
        points: [
          '定积分的值与积分变量字母无关：∫f(x)dx=∫f(t)dt。',
          '上下限交换变号；被积函数为 1 时，积分值等于区间长度。',
          '对称区间：奇函数积分为 0，偶函数积分为 2 倍半区间。'
        ],
        mnemonic: '定积分是个数，换字母不换值；奇函数对称区间直接 0。',
        pitfall: '定积分不考虑积分变量，但换元后上下限必须跟着换，不能仍用旧限。'
      },
      {
        id: 'calc-5-2',
        title: '牛顿-莱布尼茨公式与变限积分',
        tag: '核心',
        summary: '计算定积分的主力公式。变限积分求导是期末高频小题，注意上限是复合函数时要用链式法则。',
        formulas: [
          { label: '牛莱公式', tex: T`\int_a^b f(x)\,dx=F(b)-F(a)` },
          { label: '变上限积分', tex: T`\Phi(x)=\int_a^x f(t)\,dt\Rightarrow \Phi'(x)=f(x)` },
          { label: '复合上限', tex: T`\frac{d}{dx}\int_a^{\varphi(x)}f(t)\,dt=f(\varphi(x))\varphi'(x)` }
        ],
        points: [
          '使用牛莱公式前确认 f 在 [a,b] 上连续（或可积），且 F 是 f 的原函数。',
          '变限积分求导：上限代入被积函数乘以上限导数，下限同理带负号。',
          '被积函数含 x 时，先换元把 x 移出积分号，再求导。'
        ],
        mnemonic: '上限代入乘导数，下限代入带负号；被积含 x 先换元。',
        pitfall: '∫_a^x f(x,t)dt 不能直接对 x 求导得 f(x,x)，因为被积函数也含 x。'
      },
      {
        id: 'calc-5-3',
        title: '定积分换元与分部积分',
        tag: '核心',
        summary: '换元三换：换被积函数、换 dx、换上下限。对称区间先看奇偶，能省一半计算。',
        formulas: [
          { label: '换元公式', tex: T`\int_a^b f(x)dx=\int_\alpha^\beta f(\varphi(t))\varphi'(t)dt` },
          { label: '分部积分', tex: T`\int_a^b u\,dv=[uv]_a^b-\int_a^b v\,du` },
          { label: '华里士公式', tex: T`\int_0^{\pi/2}\sin^n x\,dx=\int_0^{\pi/2}\cos^n x\,dx` }
        ],
        points: [
          '换元后上下限必须换成新变量的值，换完不要再用旧限。',
          '对称区间优先判断奇偶；周期函数可利用周期性平移区间。',
          '华里士公式：n 为偶数时带 π/2，n 为奇数时不带 π。'
        ],
        mnemonic: '换元必换限，不换必出错；对称看奇偶，周期可平移。',
        pitfall: '换元后忘记换限，或换限后仍把 t 当成 x 代入，是定积分最常见错误。'
      },
      {
        id: 'calc-5-4',
        title: '反常积分与敛散性',
        tag: '强化',
        summary: '反常积分分无穷限与瑕积分两类，先用极限定义，再用 p-积分判别。计算前先判断是否收敛。',
        formulas: [
          { label: '无穷限', tex: T`\int_a^{+\infty}f(x)dx=\lim_{b\to+\infty}\int_a^b f(x)dx` },
          { label: 'p-积分（无穷限）', tex: T`\int_1^{+\infty}\frac{dx}{x^p}\ \text{converges}\iff p>1` },
          { label: 'p-积分（瑕点 0）', tex: T`\int_0^1\frac{dx}{x^p}\ \text{converges}\iff p<1` }
        ],
        points: [
          '先找瑕点：被积函数趋于无穷的点，可能在端点也可能在区间内部。',
          '区间内部有瑕点时，必须拆成多个反常积分，全部收敛才算收敛。',
          '比较判别法：与 1/x^p 比较，注意“大收敛推小收敛，小发散推大发散”。'
        ],
        mnemonic: '无穷限 p>1 收敛，瑕积分 p<1 收敛；内部瑕点要拆开。',
        pitfall: '不能直接套牛莱公式忽略瑕点；发散的反常积分不能随意拆项相减。'
      }
    ],
    examples: [
      {
        title: '分部积分求定积分',
        tag: '分部积分',
        question: T`求 $\displaystyle\int_0^\pi x\sin x\,dx$。`,
        steps: [
          T`令 $u=x$，$dv=\sin x\,dx$，则 $du=dx$，$v=-\cos x$。`,
          T`原式 $=[-x\cos x]_0^\pi+\displaystyle\int_0^\pi\cos x\,dx$。`,
          T`$=\pi+[\sin x]_0^\pi=\pi$。`
        ],
        answer: T`$\pi$`
      },
      {
        title: '带绝对值的定积分',
        tag: '易错',
        question: T`求 $\displaystyle\int_0^2|x-1|\,dx$。`,
        steps: [
          T`在 $x=1$ 处分段：$|x-1|=1-x\ (0\le x\le1)$，$=x-1\ (1\le x\le2)$。`,
          T`原式 $=\displaystyle\int_0^1(1-x)dx+\int_1^2(x-1)dx$。`,
          T`$=\frac12+\frac12=1$。`
        ],
        answer: T`$1$`
      }
    ]
  },
  {
    id: 'calc-6',
    subject: 'calc',
    order: 6,
    title: '定积分的应用',
    en: 'Applications of Definite Integrals',
    bookRef: '同济七版 §6.1–6.3',
    intro: '应用题套路高度统一：画图、选积分变量、写微元、定限积分。面积、体积、弧长、物理量，都是“微元法”的不同皮肤。',
    weight: '期末约 10%',
    hours: '建议 2 天',
    tags: ['微元法', '面积', '旋转体'],
    drills: ['直角坐标面积', '极坐标面积', '旋转体体积', '弧长', '变力做功', '平均值'],
    map: [
      { t: '微元法', d: '分割、近似、积分' },
      { t: '面积', d: '直角坐标与极坐标' },
      { t: '体积', d: '圆盘法、壳法' },
      { t: '物理', d: '做功、压力、平均值' }
    ],
    kps: [
      {
        id: 'calc-6-1',
        title: '微元法：先写一小块，再积分',
        tag: '基础',
        summary: '在小区间 [x,x+dx] 上把所求量近似为线性微元 dA=f(x)dx，再在整体区间上积分。',
        formulas: [
          { label: '面积微元', tex: T`dA=[f(x)-g(x)]\,dx` },
          { label: '体积微元', tex: T`dV=\pi f^2(x)\,dx` },
          { label: '弧长微元', tex: T`ds=\sqrt{1+y'^2}\,dx` }
        ],
        points: [
          '画图确定上下曲线、左右边界，避免积分区间写错。',
          '选 x 还是 y 作积分变量，取决于哪种写法更简单（一个积分 vs 分段）。',
          '微元法的本质是“以直代曲、以常代变”，最后取极限。'
        ],
        mnemonic: '画图定边界，选轴看简便；微元写出来，积分就完事。',
        pitfall: '上下曲线搞反会导致面积为负；两曲线交点必须求出来作为积分限。'
      },
      {
        id: 'calc-6-2',
        title: '平面图形面积',
        tag: '核心',
        summary: '直角坐标面积 = 上减下积分；极坐标面积 = 1/2∫ρ²dθ；参数方程先换元再积分。',
        formulas: [
          { label: '直角坐标', tex: T`A=\int_a^b[f(x)-g(x)]\,dx` },
          { label: '极坐标', tex: T`A=\frac12\int_\alpha^\beta \rho^2(\theta)\,d\theta` },
          { label: '参数方程', tex: T`A=\int_{t_1}^{t_2}y(t)x'(t)\,dt` }
        ],
        points: [
          '极坐标面积公式中的 1/2 不能漏，角度范围由图形扫过的射线确定。',
          '极坐标与直角坐标互化：x=ρcosθ，y=ρsinθ，ρ²=x²+y²。',
          '面积题先画草图，确认“谁在上、谁在下、从哪到哪”。'
        ],
        mnemonic: '直角上下减，极坐标二分之一；参数换元别忘限。',
        pitfall: '极坐标求面积不是 ∫ρdθ，而是 ∫(1/2)ρ²dθ；角度范围要找对。'
      },
      {
        id: 'calc-6-3',
        title: '旋转体体积与侧面积',
        tag: '核心',
        summary: '绕 x 轴旋转用圆盘法；绕 y 轴旋转可用壳法。关键是把“旋转半径”找对。',
        formulas: [
          { label: '绕 x 轴（圆盘）', tex: T`V=\pi\int_a^b y^2\,dx` },
          { label: '绕 y 轴（壳法）', tex: T`V=2\pi\int_a^b x\,y\,dx` },
          { label: '侧面积', tex: T`S=2\pi\int_a^b y\sqrt{1+y'^2}\,dx` }
        ],
        points: [
          '圆盘法：截面是半径 y 的圆，面积 πy²。',
          '壳法：薄壳展开为长方体，体积约 2πx·y·dx。',
          '两曲线之间的旋转体，用外半径平方减内半径平方。'
        ],
        mnemonic: '绕 x 用圆盘 πy²，绕 y 用壳 2πxy；半径找对，体积不累。',
        pitfall: '绕 y 轴旋转时误用 πx²dy 却不换元，或壳法漏掉 2πx。'
      },
      {
        id: 'calc-6-4',
        title: '物理应用与平均值',
        tag: '强化',
        summary: '变力做功、水压力、引力都按“微元 → 积分”处理；函数平均值是积分除以区间长度。',
        formulas: [
          { label: '变力做功', tex: T`W=\int_a^b F(x)\,dx` },
          { label: '函数平均值', tex: T`\bar f=\frac{1}{b-a}\int_a^b f(x)\,dx` },
          { label: '水压力微元', tex: T`dP=\rho g\,h(x)\cdot l(x)\,dx` }
        ],
        points: [
          '建立坐标系是第一步，通常把水面或地面设为原点。',
          '做功：力随位置变化，取位移微元 dx，功微元 dW=F(x)dx。',
          '水压力：压强随深度线性变化，压力微元 = 压强 × 面积微元。'
        ],
        mnemonic: '建系找微元，物理量写成“密度×几何×微元”；积分区间看物体范围。',
        pitfall: '深度 h 与坐标 x 的符号关系容易搞反；单位要统一。'
      }
    ],
    examples: [
      {
        title: '两曲线围成的面积',
        tag: '面积',
        question: T`求曲线 $y=x^2$ 与直线 $y=x$ 所围图形的面积。`,
        steps: [
          T`联立求交点：$x^2=x\Rightarrow x=0,1$。`,
          T`在 $(0,1)$ 上 $x>x^2$，所以 $A=\displaystyle\int_0^1(x-x^2)dx$。`,
          T`$=\left[\dfrac{x^2}{2}-\dfrac{x^3}{3}\right]_0^1=\dfrac12-\dfrac13=\dfrac16$。`
        ],
        answer: T`$\dfrac16$`
      },
      {
        title: '绕 x 轴旋转的体积',
        tag: '体积',
        question: T`求 $y=x^2$（$0\le x\le1$）绕 $x$ 轴旋转所得旋转体的体积。`,
        steps: [
          T`用圆盘法，半径 $y=x^2$。`,
          T`$V=\pi\displaystyle\int_0^1(x^2)^2dx=\pi\int_0^1x^4dx$。`,
          T`$=\pi\cdot\dfrac15=\dfrac{\pi}{5}$。`
        ],
        answer: T`$\dfrac{\pi}{5}$`
      }
    ]
  },
  {
    id: 'calc-7',
    subject: 'calc',
    order: 7,
    title: '微分方程',
    en: 'Differential Equations',
    bookRef: '同济七版 §7.1–7.8',
    intro: '微分方程的题型识别比计算更重要：先看阶、再看线性/可分离、最后看是否常系数。认出类型，公式就是流水线。',
    weight: '期末约 12%',
    hours: '建议 3 天',
    tags: ['可分离变量', '一阶线性', '常系数'],
    drills: ['可分离变量', '齐次方程', '一阶线性公式', '可降阶', '特征方程', '待定系数法'],
    map: [
      { t: '一阶', d: '可分离、齐次、线性' },
      { t: '可降阶', d: '缺 x 或缺 y' },
      { t: '二阶齐次', d: '特征方程三种根' },
      { t: '二阶非齐次', d: '待定系数与叠加' }
    ],
    kps: [
      {
        id: 'calc-7-1',
        title: '基本概念与可分离变量方程',
        tag: '基础',
        summary: '阶是最高阶导数的阶数；通解含独立常数个数等于阶数。可分离变量方程把 y 和 x 分别放到两边再积分。',
        formulas: [
          { label: '可分离变量', tex: T`\frac{dy}{dx}=f(x)g(y)\Rightarrow \int\frac{dy}{g(y)}=\int f(x)dx` },
          { label: '通解', tex: T`n\ \text{independent constants}` },
          { label: '初值问题', tex: T`y(x_0)=y_0` }
        ],
        points: [
          '分离变量时除以 g(y)，要单独检查 g(y)=0 是否为解。',
          '积分后加一个 C 即可，不必两边都加。',
          '代入初始条件求 C，得到特解。'
        ],
        mnemonic: '分离变量两边积，除以因子先查零；通解常数个数等于阶数。',
        pitfall: '除以 g(y) 可能丢掉常数解；通解不一定包含所有解。'
      },
      {
        id: 'calc-7-2',
        title: '齐次方程与一阶线性方程',
        tag: '核心',
        summary: '齐次方程令 u=y/x 化为可分离；一阶线性方程背公式，或用积分因子法现场推。',
        formulas: [
          { label: '齐次方程', tex: T`\frac{dy}{dx}=\varphi\!\left(\frac yx\right),\quad u=\frac yx` },
          { label: '一阶线性方程', tex: T`y'+P(x)y=Q(x)` },
          { label: '通解公式', tex: T`y=e^{-\int P dx}\left(\int Q e^{\int P dx}dx+C\right)` }
        ],
        points: [
          '齐次方程代换后，y=ux，y′=u′x+u，整理后 x 与 u 可分离。',
          '一阶线性公式中两个积分都不加 C，最后的 C 统一加。',
          '伯努利方程 y′+P(x)y=Q(x)y^n 可令 z=y^{1−n} 化为线性。'
        ],
        mnemonic: '齐次令 u=y/x，线性套公式；积分因子 e^{∫P}，两边同乘变乘积。',
        pitfall: '一阶线性方程中 P、Q 必须是 x 的函数；y 的系数为 1，否则先除系数。'
      },
      {
        id: 'calc-7-3',
        title: '可降阶的高阶方程',
        tag: '强化',
        summary: '缺谁换谁：缺 y 令 p=y′，缺 x 令 p=y′ 并把 y″ 写成 p dp/dy。',
        formulas: [
          { label: 'y″=f(x)', tex: T`y'=\int f(x)dx+C_1,\quad y=\int\left(\int f(x)dx\right)dx+C_1x+C_2` },
          { label: '缺 y', tex: T`y''=f(x,y')\Rightarrow p=y',\ y''=p'` },
          { label: '缺 x', tex: T`y''=f(y,y')\Rightarrow p=y',\ y''=p\frac{dp}{dy}` }
        ],
        points: [
          '先判断方程中缺哪个变量，再决定 p 对 x 还是对 y 求导。',
          '每积分一次出现一个常数，二阶方程最终有两个独立常数。',
          '降阶后解出 p，还要再积分一次得到 y。'
        ],
        mnemonic: '缺 y 用 p(x)，缺 x 用 p(y)；二阶降一阶，两次积分两个 C。',
        pitfall: '缺 x 时把 y″ 写成 p′ 是常见错误，应为 p·dp/dy。'
      },
      {
        id: 'calc-7-4',
        title: '二阶常系数齐次线性方程',
        tag: '核心',
        summary: '特征方程的根决定通解形式：两个不同实根、重根、共轭复根，三种情况三套写法。',
        formulas: [
          { label: '特征方程', tex: T`r^2+pr+q=0` },
          { label: '不同实根', tex: T`y=C_1e^{r_1x}+C_2e^{r_2x}` },
          { label: '重根', tex: T`y=(C_1+C_2x)e^{rx}` },
          { label: '共轭复根', tex: T`y=e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)` }
        ],
        points: [
          '先写特征方程，再解根，最后按三种情况写通解。',
          '重根时不要只写 C₁e^{rx}，必须补 x 倍项。',
          '复根 α±βi 对应 e^{αx}(C₁cosβx+C₂sinβx)。'
        ],
        mnemonic: '实根指数，重根乘 x，复根配三角；三种情况对号入座。',
        pitfall: '特征根与通解指数符号写反；复根时漏掉 e^{αx} 或 β。'
      },
      {
        id: 'calc-7-5',
        title: '二阶常系数非齐次线性方程',
        tag: '强化',
        summary: '通解 = 齐次通解 + 非齐次特解。特解形式由右端 f(x) 决定，用待定系数法，注意与特征根是否重合。',
        formulas: [
          { label: '解的结构', tex: T`y=Y+y^*` },
          { label: 'f=e^{λx}P_m(x)', tex: T`y^*=x^k e^{λx}Q_m(x)` },
          { label: 'f=e^{λx}(A\cos\omega x+B\sin\omega x)', tex: T`y^*=x^k e^{λx}(C\cos\omega x+D\sin\omega x)` }
        ],
        points: [
          'k 取 0、1、2，分别对应 λ（或 λ±iω）不是特征根、是单根、是重根。',
          'Q_m(x) 是与 P_m(x) 同次的一般多项式，不能只写一个系数。',
          '右端为多项和时，用叠加原理分别求特解再相加。'
        ],
        mnemonic: '先解齐次，再猜特解；重根乘 x^k，同次多项式待定。',
        pitfall: '忘记乘 x^k 是最常见错误；特解代入后要比较同次项系数。'
      }
    ],
    examples: [
      {
        title: '可分离变量 + 初值',
        tag: '可分离',
        question: T`求微分方程 $y'=2xy$ 满足 $y(0)=1$ 的特解。`,
        steps: [
          T`分离变量：$\dfrac{dy}{y}=2x\,dx$（$y\ne0$）。`,
          T`两边积分：$\ln|y|=x^2+C_1$，即 $y=Ce^{x^2}$。`,
          T`代入 $y(0)=1$ 得 $C=1$，所以 $y=e^{x^2}$。`
        ],
        answer: T`$y=e^{x^2}$`
      },
      {
        title: '二阶常系数齐次方程',
        tag: '特征方程',
        question: T`求 $y''-3y'+2y=0$ 的通解。`,
        steps: [
          T`特征方程：$r^2-3r+2=0$，即 $(r-1)(r-2)=0$。`,
          T`两个不同实根 $r_1=1$，$r_2=2$。`,
          T`通解为 $y=C_1e^x+C_2e^{2x}$。`
        ],
        answer: T`$y=C_1e^x+C_2e^{2x}$`
      }
    ]
  }
];
