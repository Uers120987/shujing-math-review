/* 机械制图 · 大一电信学习网原创知识库
   覆盖制图基础、投影、基本体、组合体、轴测图、表达方法、标准件、零件图与装配图。
   文字与题目均为站内原创整理，不复制教材原文。 */
const D = String.raw;

window.DRAWING_CHAPTERS = [
  {
    id: 'draw-1', subject: 'drawing', order: 1,
    title: '制图基础与国家标准', en: 'Drawing Basics & Standards',
    bookRef: '机械制图 §1.1–1.4',
    intro: '制图不是“画得像”，而是用统一的国家标准把形体准确表达出来。幅面、比例、图线、字体和尺寸标注，是后面所有零件图的语言。',
    weight: '期末约 10%', hours: '建议 2 天',
    tags: ['幅面与比例', '图线', '尺寸标注'],
    drills: ['A0–A4 幅面', '比例换算', '尺寸四要素', '图线用途', '标题栏'],
    map: [
      { t: '幅面', d: 'A 系列与标题栏' },
      { t: '比例', d: '原值、放大、缩小' },
      { t: '图线', d: '粗实线与细线' },
      { t: '尺寸', d: '四要素与符号' }
    ],
    kps: [
      {
        id: 'draw-1-1', title: '图纸幅面、比例与图线', tag: '基础',
        summary: 'A0 是基本幅面，沿长边对折得到 A1、A2、A3、A4。比例是图中尺寸与实物尺寸之比，尺寸数字永远写实物大小，与比例无关。',
        formulas: [
          { label: 'A0 基本幅面', tex: D`\mathrm{A0}=841\times1189\ \mathrm{mm}` },
          { label: '比例定义', tex: D`\text{scale}=\frac{\text{drawing}}{\text{real}}` },
          { label: '粗、细线宽', tex: D`d_{\text{thick}}=d,\qquad d_{\text{thin}}=d/2` }
        ],
        points: [
          'A0、A1、A2、A3、A4 依次对折；A3 常用，A4 多用于装订成册。',
          '比例 1:2 是缩小，2:1 是放大；同一图样尽量用一种比例。',
          '粗实线画可见轮廓，细实线画尺寸线、剖面线，细点画线画轴线与对称中心线，虚线画不可见轮廓。'
        ],
        mnemonic: '幅面看 A 系列，比例是图比物；粗实线画轮廓，细线标尺寸。',
        pitfall: '比例 1:2 不是放大；标注数字仍写实物尺寸，不能写图上的长度。'
      },
      {
        id: 'draw-1-2', title: '尺寸标注四要素', tag: '核心',
        summary: '一个完整尺寸由尺寸界线、尺寸线、尺寸终端和尺寸数字组成。尺寸界线从轮廓、轴线或中心线引出，尺寸线必须单独画。',
        formulas: [
          { label: '直径、半径、球面', tex: D`\varnothing 20,\qquad R10,\qquad S\varnothing 30` },
          { label: '尺寸线关系', tex: D`\text{dimension line}\perp\text{extension line}` }
        ],
        points: [
          '尺寸线不能用轮廓线、轴线或中心线代替，也不能与它们重合。',
          '直径标 Ø，半径标 R，球面标 SØ 或 SR；小尺寸箭头可外置。',
          '尺寸数字一般写在尺寸线上方；角度数字一律水平书写。'
        ],
        mnemonic: '界线从轮廓引出，尺寸线单独画；数字写实际大小。',
        pitfall: '尺寸数字不能沿尺寸线写反；同一尺寸只标一次，不要重复标注。'
      },
      {
        id: 'draw-1-3', title: '字体、符号与绘图步骤', tag: '基础',
        summary: '汉字用长仿宋体，字母和数字用斜体或正体，同一图样保持一致。画图顺序通常是：基准线 → 主要轮廓 → 细节 → 尺寸与文字。',
        formulas: [
          { label: '线宽组', tex: D`0.13,\ 0.18,\ 0.25,\ 0.35,\ 0.5,\ 0.7,\ 1.0,\ 1.4,\ 2.0\ \mathrm{mm}` },
          { label: '先基准后轮廓', tex: D`\text{centerline}\rightarrow\text{outline}\rightarrow\text{dimension}` }
        ],
        points: [
          '画图前先定图幅、比例和主视图位置，再画基准线。',
          '同类图线的宽度应一致；虚线、点画线的线段长度和间隔要均匀。',
          '标题栏一般位于右下角，填写零件名称、材料、比例、图号、制图与审核。'
        ],
        mnemonic: '先中心后轮廓，先粗后细，先图形后尺寸。',
        pitfall: '中心线用细点画线，不是粗实线；文字不能与图线相交。'
      }
    ],
    examples: [
      {
        title: '比例 1:2 时，实物 100 mm 应画多长？', tag: '基础',
        question: D`零件实际长度为 $100\ \mathrm{mm}$，用 $1:2$ 的比例画图，图上应画多长？尺寸数字写多少？`,
        steps: [
          '比例 = 图上长度 / 实际长度，所以图上长度 = 实际长度 × 比例。',
          D`$100\times\frac12=50\ \mathrm{mm}$，图上画 $50\ \mathrm{mm}$。`,
          '尺寸数字仍写实际尺寸 100，不写 50。'
        ],
        answer: D`图上画 $50\ \mathrm{mm}$，标注 $100$。`
      }
    ]
  },
  {
    id: 'draw-2', subject: 'drawing', order: 2,
    title: '投影法与三视图', en: 'Projection & Three Views',
    bookRef: '机械制图 §2.1–2.4',
    intro: '三视图是把立体分别向三个互相垂直的投影面作正投影，再把投影面展开到一个平面上。长对正、高平齐、宽相等，是读图与画图的第一反应。',
    weight: '期末约 18%', hours: '建议 4 天',
    tags: ['正投影', '三视图', '点线面'],
    drills: ['三视图形成', '长对正高平齐宽相等', '点的三面投影', '直线与平面'],
    map: [
      { t: '投影', d: '正投影与三面体系' },
      { t: '三视图', d: '主、俯、左' },
      { t: '点线面', d: '投影规律' },
      { t: '可见性', d: '粗实线与虚线' }
    ],
    kps: [
      {
        id: 'draw-2-1', title: '正投影与三视图的形成', tag: '核心',
        summary: '正投影的投射线互相平行且垂直于投影面。物体放正，从前往后看得到主视图，从上往下看得到俯视图，从左往右看得到左视图。',
        formulas: [
          { label: '三投影面互相垂直', tex: D`V\perp H,\qquad V\perp W,\qquad H\perp W` },
          { label: '三视图对应关系', tex: D`L_{\text{front}}=L_{\text{top}},\quad H_{\text{front}}=H_{\text{side}},\quad W_{\text{top}}=W_{\text{side}}` }
        ],
        points: [
          '主视图反映长和高，俯视图反映长和宽，左视图反映高和宽。',
          '主、俯视图长对正；主、左视图高平齐；俯、左视图宽相等。',
          '可见轮廓画粗实线，不可见轮廓画虚线；对称中心线用细点画线。'
        ],
        mnemonic: '长对正、高平齐、宽相等；主俯长，主左高，俯左宽。',
        pitfall: '俯、左视图是宽相等，不是高相等；不要把所有视图都画成一样宽。'
      },
      {
        id: 'draw-2-2', title: '点的三面投影', tag: '核心',
        summary: '点的三面投影仍满足长对正、高平齐、宽相等。点的正面投影与水平投影的连线垂直于 OX 轴，正面投影与侧面投影的连线垂直于 OZ 轴。',
        formulas: [
          { label: '投影连线', tex: D`a'a\perp OX,\qquad a'a''\perp OZ` },
          { label: '坐标与投影', tex: D`a(x,y),\quad a'(x,z),\quad a''(y,z)` }
        ],
        points: [
          '点的水平投影到 OX 轴的距离等于点的 z 坐标，正面投影到 OX 轴的距离等于 y 坐标。',
          '两个投影已知时，第三投影由“长对正、高平齐、宽相等”补出。',
          '重影点要判断可见性：坐标大者可见，不可见点的投影加括号。'
        ],
        mnemonic: '正面看 xz，水平看 xy，侧面看 yz；两投影定一点。',
        pitfall: 'Y 轴展开后方向容易混；补第三投影时先找 45° 辅助线或圆弧。'
      },
      {
        id: 'draw-2-3', title: '直线与平面的投影', tag: '识图',
        summary: '直线平行投影面时投影反映实长，垂直投影面时投影积聚为一点，一般位置直线的三个投影都小于实长。平面同理：平行显实形，垂直积聚成线。',
        formulas: [
          { label: '平行显实长', tex: D`\text{line}\parallel V\Rightarrow \text{true length in }V` },
          { label: '垂直积聚', tex: D`\text{line}\perp V\Rightarrow \text{point in }V` },
          { label: '平面实形', tex: D`\text{plane}\parallel H\Rightarrow \text{true shape in }H` }
        ],
        points: [
          '投影面平行线分为水平线、正平线、侧平线；投影面垂直线分为铅垂线、正垂线、侧垂线。',
          '判断直线与平面的相对位置，先看是否平行、相交或垂直，再用投影规律验证。',
          '平面上的点和线必须满足“点在线上、线在面内”的从属关系。'
        ],
        mnemonic: '平行显实长，垂直聚一点，一般位置都缩短。',
        pitfall: '一般位置直线的三个投影都小于实长，不能凭一个投影判断实长。'
      }
    ],
    examples: [
      {
        title: '由两面投影补第三面投影', tag: '核心',
        question: D`已知点 $A$ 的正面投影 $a'$ 和水平投影 $a$，补出侧面投影 $a''$。`,
        steps: [
          D`过 $a'$ 作 OZ 轴的垂线，侧面投影一定在这条线上。`,
          D`量取水平投影 $a$ 到 OX 轴的距离，即 $A$ 的 y 坐标。`,
          D`在侧面投影中，用 45° 辅助线或圆弧把 y 坐标转到 OY 方向，得到 $a''$。`
        ],
        answer: D`$a''$ 由“高平齐”和“宽相等”共同确定。`
      }
    ]
  },
  {
    id: 'draw-3', subject: 'drawing', order: 3,
    title: '基本体与截交线', en: 'Primitives & Intersections',
    bookRef: '机械制图 §3.1–3.3',
    intro: '基本体分平面立体和回转体。画基本体三视图的关键，是抓住底面、轴线和转向轮廓线；截交线则是截平面与立体表面的共有点连线。',
    weight: '期末约 15%', hours: '建议 3 天',
    tags: ['平面立体', '回转体', '截交线'],
    drills: ['棱柱与棱锥', '圆柱圆锥球', '截交线', '转向轮廓线'],
    map: [
      { t: '平面立体', d: '棱柱、棱锥' },
      { t: '回转体', d: '圆柱、圆锥、球' },
      { t: '截交', d: '矩形、圆、椭圆' },
      { t: '可见性', d: '轮廓与虚线' }
    ],
    kps: [
      {
        id: 'draw-3-1', title: '平面立体的三视图', tag: '基础',
        summary: '棱柱、棱锥由底面和侧棱面围成。画图时先画底面和轴线，再找各棱线的投影，最后判断可见性。',
        formulas: [
          { label: '棱柱体积', tex: D`V_{\text{prism}}=S h` },
          { label: '棱锥体积', tex: D`V_{\text{pyramid}}=\frac13 S h` }
        ],
        points: [
          '底面水平放置时，俯视图反映底面实形，主、左视图为矩形或三角形。',
          '棱线可见画粗实线，被遮挡的棱线画虚线；不可见但必要的轮廓不能漏。',
          '棱锥的顶点是各侧棱的交点，先定顶点再连棱线。'
        ],
        mnemonic: '底面定基准，棱线找交点；可见画粗实线，不可见画虚线。',
        pitfall: '不要把不可见棱线全部省略；需要表达形体特征时仍要画虚线。'
      },
      {
        id: 'draw-3-2', title: '回转体的三视图', tag: '核心',
        summary: '圆柱、圆锥、球和圆环是常见回转体。回转体的转向轮廓线是可见与不可见的分界，不是实际存在的棱线。',
        formulas: [
          { label: '圆柱', tex: D`\text{cylinder}\Rightarrow \text{rectangle in front/side}` },
          { label: '圆锥', tex: D`\text{cone}\Rightarrow \text{triangle in front/side}` },
          { label: '球', tex: D`\text{sphere}\Rightarrow \text{three equal circles}` }
        ],
        points: [
          '圆柱的主、左视图为矩形，俯视图为圆；轴线用细点画线。',
          '圆锥的主、左视图为三角形，俯视图为圆及圆心；转向素线过锥顶。',
          '球的三视图都是等直径的圆；圆环要画转向轮廓线和母线圆。'
        ],
        mnemonic: '圆柱看矩形，圆锥看三角，球看三个圆。',
        pitfall: '转向轮廓线不是实际棱线，不能当成可见棱边来标注尺寸。'
      },
      {
        id: 'draw-3-3', title: '截交线：找共有点再连线', tag: '核心',
        summary: '截交线是截平面与立体表面的共有点集合。先找特殊点（转向轮廓线、轴线、最高最低点），再补一般点，最后光滑连线。',
        formulas: [
          { label: '圆柱截交', tex: D`\text{plane}\parallel\text{axis}\Rightarrow\text{rectangle}` },
          { label: '圆柱截交', tex: D`\text{plane}\perp\text{axis}\Rightarrow\text{circle}` },
          { label: '圆锥截交', tex: D`\text{plane}\parallel\text{base}\Rightarrow\text{circle}` }
        ],
        points: [
          '圆柱：截平面平行轴线得矩形，垂直轴线得圆，倾斜得椭圆。',
          '圆锥：截平面位置不同可得圆、椭圆、抛物线或双曲线。',
          '球：任何截平面截球都得圆，圆的直径由截平面到球心距离决定。'
        ],
        mnemonic: '先特殊点，再一般点，最后光滑连线。',
        pitfall: '截交线只在被截切的范围内；不要画到立体轮廓之外，也不要漏掉转向点。'
      }
    ],
    examples: [
      {
        title: '圆柱被水平面截切', tag: '核心',
        question: D`圆柱轴线竖直放置，用一个水平面截切圆柱，截交线是什么？俯视图和主视图各是什么形状？`,
        steps: [
          '水平截平面垂直于圆柱轴线。',
          '截交线是圆；俯视图上该圆与圆柱俯视图重合。',
          '主视图上，截交线投影为一条水平线段，长度等于圆柱直径。'
        ],
        answer: D`截交线为圆；俯视图为圆，主视图为水平线段。`
      }
    ]
  },
  {
    id: 'draw-4', subject: 'drawing', order: 4,
    title: '组合体与相贯线', en: 'Composite Solids',
    bookRef: '机械制图 §4.1–4.4',
    intro: '组合体是基本体按叠加、切割或综合方式组合而成。画图先做形体分析，读图先找特征视图；尺寸标注要做到定形、定位、不重复、不漏标。',
    weight: '期末约 18%', hours: '建议 4 天',
    tags: ['形体分析', '组合体尺寸', '相贯线'],
    drills: ['叠加与切割', '平齐相切相交', '尺寸基准', '相贯线'],
    map: [
      { t: '分析', d: '叠加、切割、综合' },
      { t: '画图', d: '先大后小、先实后虚' },
      { t: '尺寸', d: '定形与定位' },
      { t: '相贯', d: '表面交线' }
    ],
    kps: [
      {
        id: 'draw-4-1', title: '形体分析法与表面连接', tag: '核心',
        summary: '把组合体拆成几个基本体，分别想清它们的形状和相对位置，再拼回整体。平齐、相切、相交三种表面连接，决定了分界线画不画。',
        formulas: [
          { label: '组合体', tex: D`\text{composite}=\sum\text{primitives}` },
          { label: '平齐不画线', tex: D`\text{flush surfaces}\Rightarrow\text{no dividing line}` },
          { label: '相切不画线', tex: D`\text{tangent surfaces}\Rightarrow\text{no dividing line}` }
        ],
        points: [
          '两基本体表面平齐时，连接处不画分界线；不平齐才画。',
          '表面相切时，切线处不画分界线；相交时，交线必须画。',
          '画图顺序：先主要形体，后次要形体；先可见轮廓，后不可见轮廓。'
        ],
        mnemonic: '先分块，再拼形；平齐无线，相切无线，相交有线。',
        pitfall: '把相切处画出一条线，是最常见的组合体错误。'
      },
      {
        id: 'draw-4-2', title: '画图与读图：抓特征视图', tag: '识图',
        summary: '画组合体先选主视图，尽量反映形状特征和位置关系。读图时先找特征视图，再用形体分析或线面分析补出整体。',
        formulas: [
          { label: '三视图对应', tex: D`L_f=L_t,\quad H_f=H_s,\quad W_t=W_s` },
          { label: '读图顺序', tex: D`\text{feature view}\rightarrow\text{body}\rightarrow\text{details}` }
        ],
        points: [
          '主视图应最能反映组合体形状特征，并尽量使主要轴线水平或竖直。',
          '读图先看特征视图，把封闭线框对应到基本体；再逐个补出其他视图。',
          '遇到斜线、交线，先判断是截交线、相贯线还是表面分界线。'
        ],
        mnemonic: '主视图定方向，特征视图定形状；先整体后局部。',
        pitfall: '不要只盯一个视图猜形状；三个视图必须互相印证。'
      },
      {
        id: 'draw-4-3', title: '组合体尺寸标注', tag: '核心',
        summary: '组合体尺寸分定形尺寸和定位尺寸，定位尺寸从尺寸基准出发。标注要完整、清晰、不重复、不矛盾。',
        formulas: [
          { label: '尺寸组成', tex: D`\text{size}=\text{form}+\text{position}` },
          { label: '基准', tex: D`\text{datum}\rightarrow\text{position dimensions}` }
        ],
        points: [
          '尺寸基准通常选底面、端面、对称面或主要轴线。',
          '每个基本体的定形尺寸要齐全，定位尺寸要确定它与基准的相对位置。',
          '截交线、相贯线由形体自然形成，不单独标注尺寸；回转体直径尽量标在非圆视图上。'
        ],
        mnemonic: '基准先定，定形定位；不重复、不漏标、不矛盾。',
        pitfall: '不要给截交线、相贯线标尺寸；也不要把同一个尺寸标两遍。'
      }
    ],
    examples: [
      {
        title: '底板与圆筒叠加的组合体', tag: '核心',
        question: D`一个水平底板上面叠加一个竖直圆筒，底板与圆筒表面不平齐。主视图上圆筒与底板连接处要不要画分界线？`,
        steps: [
          '先做形体分析：底板是长方体，圆筒是圆柱。',
          '圆筒底面与底板顶面接触，但圆筒外表面与底板顶面不平齐。',
          '不平齐的表面连接处存在分界线，主视图上应画出圆筒底面的投影线。'
        ],
        answer: D`要画分界线，因为圆筒与底板表面不平齐。`
      }
    ]
  },
  {
    id: 'draw-5', subject: 'drawing', order: 5,
    title: '轴测图', en: 'Axonometric Drawing',
    bookRef: '机械制图 §5.1–5.3',
    intro: '轴测图用一个投影同时表达长、宽、高，直观但一般不反映实长。正等轴测和斜二测是最常用的两种，画图时抓住“平行性”和“轴向伸缩系数”。',
    weight: '期末约 8%', hours: '建议 2 天',
    tags: ['正等轴测', '斜二测', '轴向伸缩'],
    drills: ['轴间角 120°', '轴向系数', '斜二测', '轴测草图'],
    map: [
      { t: '正等测', d: '三轴 120°' },
      { t: '斜二测', d: '正面不变、Y 减半' },
      { t: '画法', d: '先轴测轴后形体' },
      { t: '取舍', d: '直观但不替代三视图' }
    ],
    kps: [
      {
        id: 'draw-5-1', title: '正等轴测图', tag: '核心',
        summary: '正等轴测的三根轴测轴互成 120°，三个轴向伸缩系数都取 1。画图时先画轴测轴，再按坐标定点，平行线仍保持平行。',
        formulas: [
          { label: '轴间角', tex: D`\angle XOY=\angle YOZ=\angle ZOX=120^\circ` },
          { label: '轴向系数', tex: D`p=q=r=1` }
        ],
        points: [
          'Z 轴竖直，X、Y 轴与水平线成 30°。',
          '沿三个轴向量取实际长度，不用的线不画。',
          '轴测图中一般不画虚线，被遮挡的轮廓可省略。'
        ],
        mnemonic: '三轴 120°，系数都取 1；平行线仍平行。',
        pitfall: '轴测图不是三视图，不能把三视图直接旋转 45° 当轴测图。'
      },
      {
        id: 'draw-5-2', title: '斜二轴测图', tag: '核心',
        summary: '斜二测的 X、Z 轴仍互相垂直，Y 轴与它们成 45°；X、Z 方向取实长，Y 方向取一半。正面形状复杂的零件适合用斜二测。',
        formulas: [
          { label: '轴向系数', tex: D`p=r=1,\qquad q=0.5` },
          { label: '轴间角', tex: D`\angle XOZ=90^\circ` }
        ],
        points: [
          '正面（XOZ 面）反映实形，画起来最方便。',
          'Y 方向尺寸减半，45° 斜线方向一致。',
          '圆的斜二测在正面仍为圆，在其他面为椭圆。'
        ],
        mnemonic: '正面不变，Y 向减半；斜二测画正面最省事。',
        pitfall: 'Y 方向忘记减半，是斜二测最常见的错误。'
      },
      {
        id: 'draw-5-3', title: '轴测图的选择与草图', tag: '识图',
        summary: '轴测图用于直观表达和辅助读图，不能替代零件图的尺寸与技术要求。选择轴测图时，要让主要形状特征面可见，少画遮挡。',
        formulas: [
          { label: '轴测图定位', tex: D`\text{axonometric}\ne\text{orthographic views}` }
        ],
        points: [
          '优先选择能看到主要孔、槽、凸台的方向。',
          '轴测草图可徒手画，但轴测轴方向、平行关系要正确。',
          '轴测图上一般不标注尺寸；需要尺寸时仍回到三视图或零件图。'
        ],
        mnemonic: '轴测看立体，三视图看尺寸；轴测不替代零件图。',
        pitfall: '不要把轴测图当作施工图；零件图必须有完整尺寸和技术要求。'
      }
    ],
    examples: [
      {
        title: '长方体正等轴测图', tag: '基础',
        question: D`长方体长 $40$、宽 $20$、高 $30$，画正等轴测图时沿三个轴各取多少？`,
        steps: [
          '正等轴测的轴向伸缩系数都取 1。',
          '沿 X 轴取 40，沿 Y 轴取 20，沿 Z 轴取 30。',
          '过各端点作平行线，连接可见轮廓，擦去多余辅助线。'
        ],
        answer: D`三个方向分别取 40、20、30，按 1:1 量取。`
      }
    ]
  },
  {
    id: 'draw-6', subject: 'drawing', order: 6,
    title: '机件表达方法', en: 'Views & Sections',
    bookRef: '机械制图 §6.1–6.4',
    intro: '当零件内部结构复杂时，只靠三视图会布满虚线。视图、剖视图、断面图和简化画法，是为了“少画虚线、把内部讲清楚”。',
    weight: '期末约 15%', hours: '建议 3 天',
    tags: ['视图', '剖视图', '断面图'],
    drills: ['基本视图', '向视图', '全剖半剖', '断面图'],
    map: [
      { t: '视图', d: '基本、向、局部、斜' },
      { t: '剖视', d: '全剖、半剖、局部剖' },
      { t: '断面', d: '移出、重合' },
      { t: '简化', d: '肋板、均布孔' }
    ],
    kps: [
      {
        id: 'draw-6-1', title: '基本视图、向视图、局部视图与斜视图', tag: '基础',
        summary: '基本视图有六个投影方向。向视图需要标注投射方向和视图名称；局部视图只画局部，斜视图用于倾斜结构。',
        formulas: [
          { label: '基本视图', tex: D`6\ \text{basic views}` },
          { label: '向视图', tex: D`\text{arrow view must be labeled}` }
        ],
        points: [
          '基本视图仍符合长对正、高平齐、宽相等。',
          '局部视图的断裂边界用波浪线或双折线，范围要封口。',
          '斜视图把倾斜部分旋转到与投影面平行，便于反映实形。'
        ],
        mnemonic: '基本视图六个向，向视图要标注；局部画局部，斜视图转正。',
        pitfall: '向视图不标注投射方向，读图人无法判断它从哪边看。'
      },
      {
        id: 'draw-6-2', title: '剖视图：全剖、半剖、局部剖', tag: '核心',
        summary: '剖视图假想用剖切平面剖开机件，移去前半部分，再画出剩余部分的投影。剖切后的断面画剖面线，后方可见轮廓仍要画。',
        formulas: [
          { label: '剖面线', tex: D`\text{section lines at }45^\circ` },
          { label: '剖视类型', tex: D`\text{full}\quad\text{half}\quad\text{local}` }
        ],
        points: [
          '全剖用于不对称或内部结构复杂的零件；半剖用于对称零件。',
          '半剖视图以对称中心线为界，一半画剖视、一半画视图。',
          '肋板、轮辐等纵向剖切时，按不剖处理，不画剖面线。'
        ],
        mnemonic: '全剖看内部，半剖对称用；肋板纵剖不打线。',
        pitfall: '剖视图是假想剖开，其他视图仍按完整零件画出，不能只画一半。'
      },
      {
        id: 'draw-6-3', title: '断面图与简化画法', tag: '识图',
        summary: '断面图只画剖切平面与机件接触的断面形状，不画后方轮廓；剖视图则要画后方可见部分。断面图分移出断面和重合断面。',
        formulas: [
          { label: '断面与剖视', tex: D`\text{section}\subset\text{cut view}` },
          { label: '移出断面', tex: D`\text{removed section preferred}` }
        ],
        points: [
          '移出断面画在视图外，轮廓用粗实线；重合断面画在视图内，轮廓用细实线。',
          '对称断面可省略标注；不对称断面要标注剖切位置和投射方向。',
          '简化画法包括均布孔、肋板、滚花、中心孔等，按国家标准处理。'
        ],
        mnemonic: '断面只画切口，剖视还画后方；移出断面优先。',
        pitfall: '断面图不是剖视图，不能把剖切后方的轮廓也画进去。'
      }
    ],
    examples: [
      {
        title: '对称零件为什么用半剖？', tag: '核心',
        question: D`一个左右对称的零件，内部有阶梯孔。用全剖会重复表达对称结构，应该选哪种剖视图？`,
        steps: [
          '零件左右对称，内外结构在对称中心线两侧对应。',
          '一半画剖视表达内部孔，一半画视图表达外部轮廓。',
          '以对称中心线为界，得到半剖视图。'
        ],
        answer: D`用半剖视图，一半剖视、一半视图，以对称中心线分界。`
      }
    ]
  },
  {
    id: 'draw-7', subject: 'drawing', order: 7,
    title: '标准件与常用件', en: 'Standard Parts',
    bookRef: '机械制图 §7.1–7.4',
    intro: '螺纹、键、销、轴承、齿轮和弹簧是标准件或常用件。它们的画法有简化规定，重点是记住规定画法、标记代号和几个关键参数。',
    weight: '期末约 12%', hours: '建议 3 天',
    tags: ['螺纹', '键与轴承', '齿轮'],
    drills: ['螺纹画法', '螺纹标记', '键连接', '齿轮参数'],
    map: [
      { t: '螺纹', d: '牙顶、牙底、终止线' },
      { t: '连接', d: '键、销、轴承' },
      { t: '齿轮', d: '模数、分度圆' },
      { t: '标记', d: 'M、LH、6208' }
    ],
    kps: [
      {
        id: 'draw-7-1', title: '螺纹与螺纹连接', tag: '核心',
        summary: '外螺纹牙顶用粗实线、牙底用细实线；内螺纹相反。螺纹终止线用粗实线，左旋螺纹要标 LH。',
        formulas: [
          { label: '普通螺纹标记', tex: D`M20\times1.5` },
          { label: '左旋标记', tex: D`\text{left-hand}=LH` }
        ],
        points: [
          '外螺纹：牙顶粗、牙底细；内螺纹：牙顶细、牙底粗。',
          '螺纹终止线画粗实线；不通孔要画钻尖角 120°。',
          '螺纹连接画法注意“外螺纹在里、内螺纹在外”的遮挡关系。'
        ],
        mnemonic: '外螺纹牙顶粗，内螺纹牙顶细；左旋才标 LH。',
        pitfall: '不要把内、外螺纹的粗细线画反；左旋不标会默认右旋。'
      },
      {
        id: 'draw-7-2', title: '键、销与滚动轴承', tag: '基础',
        summary: '键连接用于传递扭矩，销用于定位或连接，滚动轴承按类型代号和尺寸系列表示。标准件一般只需画规定简化画法并标注规格。',
        formulas: [
          { label: '键的标记', tex: D`b\times h\times L` },
          { label: '轴承代号', tex: D`6208` }
        ],
        points: [
          '普通平键标注宽 × 高 × 长，键槽尺寸要查标准。',
          '圆柱销、圆锥销标注直径和长度；销孔配作。',
          '滚动轴承简化画法画外圈、内圈和滚动体，标注轴承代号。'
        ],
        mnemonic: '键传扭矩，销定位，轴承看类型代号。',
        pitfall: '键槽深度不要凭感觉画，必须按轴径查标准。'
      },
      {
        id: 'draw-7-3', title: '齿轮参数与啮合画法', tag: '核心',
        summary: '标准直齿圆柱齿轮的核心参数是模数 m 和齿数 z。分度圆直径 d=mz，齿顶圆直径 da=m(z+2)，两齿轮啮合中心距由两分度圆半径之和决定。',
        formulas: [
          { label: '分度圆', tex: D`d=mz` },
          { label: '齿顶圆', tex: D`d_a=m(z+2)` },
          { label: '中心距', tex: D`a=\frac{m(z_1+z_2)}2` }
        ],
        points: [
          '模数是齿轮尺寸的基础，模数越大，轮齿越大。',
          '分度圆用细点画线，齿顶圆用粗实线，齿根圆用细实线。',
          '啮合区画法有规定：一个齿轮的齿顶线与另一个齿轮的齿根线之间有间隙。'
        ],
        mnemonic: '模数乘齿数，分度圆；齿顶加两模数。',
        pitfall: '分度圆不是齿顶圆；计算中心距时用的是分度圆半径。'
      }
    ],
    examples: [
      {
        title: '直齿圆柱齿轮尺寸', tag: '核心',
        question: D`标准直齿圆柱齿轮 $m=3$，$z=20$，求分度圆直径和齿顶圆直径。`,
        steps: [
          D`分度圆 $d=mz=3\times20=60\ \mathrm{mm}$。`,
          D`齿顶圆 $d_a=m(z+2)=3\times22=66\ \mathrm{mm}$。`,
          '分度圆画细点画线，齿顶圆画粗实线。'
        ],
        answer: D`$d=60\ \mathrm{mm}$，$d_a=66\ \mathrm{mm}$。`
      }
    ]
  },
  {
    id: 'draw-8', subject: 'drawing', order: 8,
    title: '零件图与装配图', en: 'Part & Assembly Drawings',
    bookRef: '机械制图 §8.1–9.3',
    intro: '零件图是制造零件的依据，装配图是表达部件装配关系的图样。读零件图抓“视图、尺寸、技术要求、标题栏”，读装配图抓“序号、明细栏、配合尺寸”。',
    weight: '期末约 22%', hours: '建议 5 天',
    tags: ['零件图', '公差配合', '装配图'],
    drills: ['零件图四要素', '表面粗糙度', '公差配合', '读装配图'],
    map: [
      { t: '零件图', d: '视图、尺寸、技术、标题栏' },
      { t: '精度', d: '公差、配合、粗糙度' },
      { t: '装配图', d: '序号、明细栏' },
      { t: '读图', d: '先整体后局部' }
    ],
    kps: [
      {
        id: 'draw-8-1', title: '零件图的内容与视图选择', tag: '核心',
        summary: '一张完整零件图包含一组视图、完整尺寸、技术要求和标题栏。视图选择要突出结构特征，尺寸标注要有基准、不重复、不漏标。',
        formulas: [
          { label: '零件图四要素', tex: D`\text{views}+\text{dimensions}+\text{tech}+\text{title}` }
        ],
        points: [
          '主视图尽量反映零件形状特征，并符合加工位置或工作位置。',
          '尺寸基准选设计基准或工艺基准；重要尺寸直接标出。',
          '技术要求写材料、热处理、表面粗糙度、公差和特殊要求。'
        ],
        mnemonic: '视图、尺寸、技术、标题栏，四件套。',
        pitfall: '零件图不是三视图的简单放大；必须包含制造所需的全部信息。'
      },
      {
        id: 'draw-8-2', title: '公差、配合与表面粗糙度', tag: '核心',
        summary: '公差控制尺寸允许的变动范围，配合描述孔与轴的松紧关系，表面粗糙度控制表面光滑程度。H7/g6 是基孔制间隙配合。',
        formulas: [
          { label: '配合代号', tex: D`\mathrm{H7/g6}` },
          { label: '表面粗糙度', tex: D`Ra\,3.2\,\mu\mathrm{m}` },
          { label: '公差带', tex: D`\mathrm{H7}=0\sim+0.021\ \mathrm{mm}` }
        ],
        points: [
          'H 表示基孔制，h 表示基轴制；H7/g6 表示基孔制间隙配合。',
          'Ra 越小表面越光滑，加工成本越高；常用 3.2、1.6、0.8。',
          '形位公差包括直线度、平面度、圆度、同轴度、垂直度等。'
        ],
        mnemonic: 'H 孔 h 轴，H7/g6 是间隙；Ra 越小越光滑。',
        pitfall: 'H7/g6 不是基轴制；不要把 H 与 h 的角色弄反。'
      },
      {
        id: 'draw-8-3', title: '装配图与读图拆画', tag: '识图',
        summary: '装配图表达各零件之间的装配关系、工作原理和主要尺寸。读图先看标题栏和明细栏，再按序号找零件，最后拆画零件图。',
        formulas: [
          { label: '装配图内容', tex: D`\text{views}+\text{dimensions}+\text{items}+\text{parts list}` },
          { label: '装配尺寸', tex: D`\text{fit}+\text{center distance}+\text{overall}` }
        ],
        points: [
          '装配图标注外形尺寸、安装尺寸、配合尺寸和极限位置尺寸。',
          '序号按顺时针或逆时针排列，明细栏从下往上填写。',
          '拆画零件图时先分离零件轮廓，再补全被遮挡的结构和尺寸。'
        ],
        mnemonic: '先看标题栏，再看视图，后对序号；拆画先分离，再补全。',
        pitfall: '装配图上的尺寸不能直接当成零件尺寸；配合尺寸要按公差带分别标注。'
      }
    ],
    examples: [
      {
        title: '读配合代号 H7/g6', tag: '核心',
        question: D`配合代号 $\mathrm{H7/g6}$ 表示什么配合？孔和轴各是什么公差带？`,
        steps: [
          '斜线前 H7 是孔的公差带，斜线后 g6 是轴的公差带。',
          'H 是基孔制，孔的下偏差为 0；g 是轴的基本偏差，为上偏差负值。',
          '轴的实际尺寸小于孔的最小尺寸，因此是间隙配合。'
        ],
        answer: D`基孔制间隙配合；孔 H7，轴 g6。`
      }
    ]
  }
];

window.QUESTION_BANK_DRAWING = [
  { id: 'q-d1-1', chapter: 'draw-1', type: 'single', level: '基础',
    stem: D`A0 图纸的基本幅面尺寸是（ ）。`,
    options: [D`$841\times1189\ \mathrm{mm}$`, D`$594\times841\ \mathrm{mm}$`, D`$420\times594\ \mathrm{mm}$`, D`$297\times420\ \mathrm{mm}$`],
    answer: 0,
    explain: D`A0 为 $841\times1189\ \mathrm{mm}$；沿长边对折依次得到 A1、A2、A3、A4。` },
  { id: 'q-d1-2', chapter: 'draw-1', type: 'single', level: '基础',
    stem: D`比例 $1:2$ 表示（ ）。`,
    options: [D`图上尺寸是实际尺寸的 2 倍`, D`实际尺寸是图上尺寸的 2 倍`, D`图上尺寸等于实际尺寸`, D`与尺寸无关`],
    answer: 1,
    explain: D`比例 = 图上长度 / 实际长度，$1:2$ 表示图上 1 份对应实际 2 份，是缩小比例。` },
  { id: 'q-d1-3', chapter: 'draw-1', type: 'single', level: '易错',
    stem: D`关于尺寸数字，下列说法正确的是（ ）。`,
    options: [D`尺寸数字写图上的长度`, D`尺寸数字写实际尺寸，与比例无关`, D`比例缩小后尺寸数字也要缩小`, D`尺寸数字可以沿尺寸线倒写`],
    answer: 1,
    explain: D`尺寸数字始终表示机件的实际尺寸；无论比例如何，数字都不随之改变。` },

  { id: 'q-d2-1', chapter: 'draw-2', type: 'single', level: '基础',
    stem: D`三视图中“长对正”指的是（ ）。`,
    options: [D`主视图与俯视图`, D`主视图与左视图`, D`俯视图与左视图`, D`三个视图都对齐`],
    answer: 0,
    explain: D`主、俯视图都反映长度，所以长对正；主、左视图高平齐；俯、左视图宽相等。` },
  { id: 'q-d2-2', chapter: 'draw-2', type: 'single', level: '核心',
    stem: D`点 $A$ 到水平面 $H$ 的距离为 20，则其正面投影 $a'$ 到 OX 轴的距离为（ ）。`,
    options: [D`10`, D`20`, D`40`, D`不能确定`],
    answer: 1,
    explain: D`点到 H 面的距离就是 z 坐标；正面投影到 OX 轴的距离等于 z 坐标，所以为 20。` },
  { id: 'q-d2-3', chapter: 'draw-2', type: 'single', level: '核心',
    stem: D`正垂线在正面投影面上的投影是（ ）。`,
    options: [D`一条实长线`, D`一条缩短的线`, D`一个点`, D`一个圆`],
    answer: 2,
    explain: D`正垂线垂直于 V 面，因此在 V 面上的投影积聚为一点；在 H、W 面上投影反映实长。` },

  { id: 'q-d3-1', chapter: 'draw-3', type: 'single', level: '基础',
    stem: D`圆柱轴线竖直放置时，其主视图通常是（ ）。`,
    options: [D`圆`, D`矩形`, D`三角形`, D`椭圆`],
    answer: 1,
    explain: D`圆柱的主、左视图为矩形，俯视图为圆；轴线用细点画线表示。` },
  { id: 'q-d3-2', chapter: 'draw-3', type: 'single', level: '核心',
    stem: D`用垂直于圆柱轴线的平面截切圆柱，截交线是（ ）。`,
    options: [D`矩形`, D`椭圆`, D`圆`, D`双曲线`],
    answer: 2,
    explain: D`截平面垂直于轴线时，截交线为圆；平行轴线时为矩形；倾斜时为椭圆。` },
  { id: 'q-d3-3', chapter: 'draw-3', type: 'single', level: '易错',
    stem: D`关于回转体的转向轮廓线，正确的是（ ）。`,
    options: [D`它是实际存在的棱线`, D`它是可见与不可见的分界`, D`它一定画虚线`, D`它只出现在俯视图`],
    answer: 1,
    explain: D`转向轮廓线是回转体投影时可见与不可见的分界，不是实际棱线；可见时画粗实线。` },

  { id: 'q-d4-1', chapter: 'draw-4', type: 'single', level: '核心',
    stem: D`两个基本体表面平齐连接时，分界线应（ ）。`,
    options: [D`画粗实线`, D`画虚线`, D`不画`, D`画细点画线`],
    answer: 2,
    explain: D`平齐表面没有分界，连接处不画线；不平齐时才画分界线。相切处也不画线。` },
  { id: 'q-d4-2', chapter: 'draw-4', type: 'single', level: '基础',
    stem: D`组合体尺寸标注中，确定各基本体相对位置的尺寸叫（ ）。`,
    options: [D`定形尺寸`, D`定位尺寸`, D`总体尺寸`, D`简化尺寸`],
    answer: 1,
    explain: D`定形尺寸确定形状大小，定位尺寸确定相对基准的位置；两者共同组成完整尺寸。` },
  { id: 'q-d4-3', chapter: 'draw-4', type: 'single', level: '易错',
    stem: D`下列哪条线通常不单独标注尺寸？（ ）`,
    options: [D`圆柱直径`, D`孔的定位尺寸`, D`相贯线`, D`底板长度`],
    answer: 2,
    explain: D`相贯线由相交形体的表面自然形成，不单独标注尺寸；截交线同理。` },

  { id: 'q-d5-1', chapter: 'draw-5', type: 'single', level: '基础',
    stem: D`正等轴测图三根轴测轴之间的夹角是（ ）。`,
    options: [D`$90^\circ$`, D`$120^\circ$`, D`$135^\circ$`, D`$45^\circ$`],
    answer: 1,
    explain: D`正等轴测三轴互成 $120^\circ$，轴向伸缩系数都取 1。` },
  { id: 'q-d5-2', chapter: 'draw-5', type: 'single', level: '核心',
    stem: D`斜二轴测图中，Y 方向的轴向伸缩系数取（ ）。`,
    options: [D`0`, D`0.5`, D`1`, D`2`],
    answer: 1,
    explain: D`斜二测中 X、Z 方向取 1，Y 方向取 0.5；正面 XOZ 反映实形。` },
  { id: 'q-d5-3', chapter: 'draw-5', type: 'single', level: '识图',
    stem: D`关于轴测图，说法正确的是（ ）。`,
    options: [D`轴测图可以替代零件图`, D`轴测图一般能直接量取所有实长`, D`轴测图直观，但通常不替代三视图`, D`轴测图必须画虚线`],
    answer: 2,
    explain: D`轴测图用于直观表达，不能替代零件图的尺寸和技术要求；一般也不画虚线。` },

  { id: 'q-d6-1', chapter: 'draw-6', type: 'single', level: '基础',
    stem: D`剖视图中的剖面线通常画成（ ）。`,
    options: [D`水平线`, D`竖直线`, D`与水平成 $45^\circ$ 的细实线`, D`粗实线`],
    answer: 2,
    explain: D`剖面线用细实线，通常与主要轮廓或剖面区域对称线成 $45^\circ$，同一零件方向、间隔一致。` },
  { id: 'q-d6-2', chapter: 'draw-6', type: 'single', level: '核心',
    stem: D`对称零件表达内部结构时，优先采用（ ）。`,
    options: [D`全剖视图`, D`半剖视图`, D`局部剖视图`, D`斜视图`],
    answer: 1,
    explain: D`对称零件用半剖，一半剖视表达内部、一半视图表达外部，以对称中心线分界。` },
  { id: 'q-d6-3', chapter: 'draw-6', type: 'single', level: '易错',
    stem: D`断面图与剖视图的主要区别是（ ）。`,
    options: [D`断面图只画剖切平面上的断面形状`, D`断面图必须画后方轮廓`, D`断面图不用剖面线`, D`断面图只能画在视图内`],
    answer: 0,
    explain: D`断面图只画剖切平面与机件接触的断面形状；剖视图还要画出剖切后方的可见轮廓。` },

  { id: 'q-d7-1', chapter: 'draw-7', type: 'single', level: '基础',
    stem: D`外螺纹的牙顶线和牙底线分别用（ ）。`,
    options: [D`细实线、粗实线`, D`粗实线、细实线`, D`虚线、细实线`, D`细点画线、粗实线`],
    answer: 1,
    explain: D`外螺纹牙顶用粗实线，牙底用细实线；内螺纹相反。` },
  { id: 'q-d7-2', chapter: 'draw-7', type: 'single', level: '核心',
    stem: D`标准直齿圆柱齿轮 $m=2$，$z=30$，分度圆直径为（ ）。`,
    options: [D`30 mm`, D`60 mm`, D`64 mm`, D`32 mm`],
    answer: 1,
    explain: D`$d=mz=2\times30=60\ \mathrm{mm}$；齿顶圆 $d_a=m(z+2)=64\ \mathrm{mm}$。` },
  { id: 'q-d7-3', chapter: 'draw-7', type: 'single', level: '易错',
    stem: D`普通螺纹标记“M20×1.5 LH”中的 LH 表示（ ）。`,
    options: [D`粗牙`, D`细牙`, D`左旋`, D`右旋`],
    answer: 2,
    explain: D`LH 表示左旋；不标 LH 默认右旋。M20×1.5 表示公称直径 20、螺距 1.5 的细牙普通螺纹。` },

  { id: 'q-d8-1', chapter: 'draw-8', type: 'single', level: '基础',
    stem: D`一张完整零件图通常不包括（ ）。`,
    options: [D`一组视图`, D`完整尺寸`, D`技术要求`, D`装配序号和明细栏`],
    answer: 3,
    explain: D`零件图四要素是视图、尺寸、技术要求和标题栏；序号和明细栏属于装配图。` },
  { id: 'q-d8-2', chapter: 'draw-8', type: 'single', level: '核心',
    stem: D`配合代号 H7/g6 表示（ ）。`,
    options: [D`基轴制间隙配合`, D`基孔制间隙配合`, D`基孔制过盈配合`, D`基轴制过渡配合`],
    answer: 1,
    explain: D`H7 为孔的公差带，g6 为轴的公差带；H 表示基孔制，g 的偏差使轴小于孔，因此是间隙配合。` },
  { id: 'q-d8-3', chapter: 'draw-8', type: 'single', level: '识图',
    stem: D`读装配图时，首先应该看（ ）。`,
    options: [D`明细栏中的标准件`, D`标题栏和视图`, D`零件图的粗糙度`, D`螺栓的长度`],
    answer: 1,
    explain: D`先看标题栏了解名称、比例，再看视图理解装配关系；然后按序号对照明细栏。` }
];
