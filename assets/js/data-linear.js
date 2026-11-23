/* 线性代数（同济六版）知识库 · 原创整理 */
const LT = String.raw;

window.LINEAR_CHAPTERS = [
  {
    id: 'lin-1',
    subject: 'linear',
    order: 1,
    title: '行列式',
    en: 'Determinants',
    bookRef: '同济六版 §1.1–1.6',
    intro: '行列式是线性代数的第一个“计算工具”，也是判断可逆、方程组唯一解、特征值的基础。核心不是硬算，而是用性质把行列式化成三角形。',
    weight: '期末约 15%',
    hours: '建议 2 天',
    tags: ['行列式性质', '按行展开', '克拉默法则'],
    drills: ['二/三阶行列式', '行列式性质', '按行展开', '范德蒙德行列式', '克拉默法则'],
    map: [
      { t: '定义', d: '排列与逆序数' },
      { t: '性质', d: '换行、倍加、展开' },
      { t: '计算', d: '化三角与递推' },
      { t: '应用', d: '克拉默法则' }
    ],
    kps: [
      {
        id: 'lin-1-1',
        title: '行列式的定义与基本性质',
        tag: '基础',
        summary: 'n 阶行列式是 n! 项的代数和，直接按定义算不现实。真正好用的是性质：转置不变、换行变号、倍加不变。',
        formulas: [
          { label: '转置不变', tex: LT`|A^T|=|A|` },
          { label: '换行变号', tex: LT`r_i\leftrightarrow r_j\Rightarrow |A|\to-|A|` },
          { label: '倍加不变', tex: LT`r_i+kr_j\Rightarrow |A|\ \text{invariant}` },
          { label: '数乘一行', tex: LT`k r_i\Rightarrow |A|\to k|A|` }
        ],
        points: [
          '两行相同或成比例，行列式为 0；某行全为 0，行列式为 0。',
          '上（下）三角行列式等于主对角线元素之积。',
          '|kA|=k^n|A|（n 为阶数），不是 k|A|。'
        ],
        mnemonic: '转置不变，换行变号，倍加不变，倍乘提 k。',
        pitfall: '|A+B|≠|A|+|B|；|kA| 的 k 要乘 n 次，别漏指数。'
      },
      {
        id: 'lin-1-2',
        title: '按行（列）展开与代数余子式',
        tag: '核心',
        summary: '行列式等于某行元素与对应代数余子式乘积之和。选 0 多的行/列展开，能大幅减少计算。',
        formulas: [
          { label: '代数余子式', tex: LT`A_{ij}=(-1)^{i+j}M_{ij}` },
          { label: '按行展开', tex: LT`|A|=\sum_{j=1}^{n}a_{ij}A_{ij}` },
          { label: '异乘变零', tex: LT`\sum_{j=1}^{n}a_{ij}A_{kj}=0\quad(i\ne k)` }
        ],
        points: [
          '余子式 M_ij 是划去第 i 行第 j 列后的 n−1 阶行列式。',
          '符号由 (−1)^{i+j} 决定，可以记“棋盘格”：左上角为正。',
          '先利用倍加把某行化成只有一个非零元，再展开，是标准套路。'
        ],
        mnemonic: '划行划列得余子，棋盘符号定正负；哪行零多按哪行。',
        pitfall: '代数余子式带符号，余子式不带；求“余子式之和”与“代数余子式之和”别混。'
      },
      {
        id: 'lin-1-3',
        title: '克拉默法则',
        tag: '核心',
        summary: 'n 个未知数、n 个方程的线性方程组，当系数行列式 D≠0 时有唯一解，且 x_j=D_j/D。',
        formulas: [
          { label: '克拉默法则', tex: LT`x_j=\frac{D_j}{D}\quad(j=1,\dots,n)` },
          { label: '齐次方程组', tex: LT`D\ne0\Rightarrow x=0;\quad D=0\Rightarrow \exists x\ne0` },
          { label: '唯一解条件', tex: LT`D\ne0\iff A^{-1}\ \text{exists}` }
        ],
        points: [
          'D_j 是把系数行列式第 j 列换成常数列得到的行列式。',
          '克拉默法则只适用于“方程个数 = 未知数个数”且 D≠0 的情形。',
          '理论价值大于计算价值：判断唯一解、讨论参数、证明题常用。'
        ],
        mnemonic: '系数行列式不为零，唯一解；换列算分子，齐次看 D。',
        pitfall: 'D=0 时不能下结论说无解，可能无解也可能无穷多解，需要看秩。'
      },
      {
        id: 'lin-1-4',
        title: '行列式的计算方法',
        tag: '强化',
        summary: '常用四招：化三角形、按行展开、递推、利用范德蒙德。目标是把陌生行列式变成熟悉结构。',
        formulas: [
          { label: '范德蒙德行列式', tex: LT`V_n=\prod_{1\le i<j\le n}(x_j-x_i)` },
          { label: '三角行列式', tex: LT`|A|=\prod_{i=1}^{n}a_{ii}` },
          { label: '递推思想', tex: LT`D_n=aD_{n-1}+bD_{n-2}` }
        ],
        points: [
          '爪型行列式：用对角线元素消去第一行/列的其余元素，化成三角。',
          '各行（列）元素之和相同时，把所有列加到第一列，提公因子。',
          '范德蒙德识别特征：每行是同一个数的 0,1,…,n−1 次幂。'
        ],
        mnemonic: '化三角、按行展、找递推、认范德蒙德；先观察再动手。',
        pitfall: '化三角时倍加不改变行列式，但交换行要变号；别把两种操作混淆。'
      }
    ],
    examples: [
      {
        title: '三阶行列式直接计算',
        tag: '基础',
        question: LT`计算 $D=\begin{vmatrix}1&2&3\\2&3&1\\3&1&2\end{vmatrix}$。`,
        steps: [
          LT`按第一行展开：$D=1\cdot(6-1)-2\cdot(4-3)+3\cdot(2-9)$。`,
          LT`$=5-2-21=-18$。`,
          LT`也可观察到每行元素之和为 6，但本题直接展开更快。`
        ],
        answer: LT`$D=-18$`
      },
      {
        title: '范德蒙德行列式',
        tag: '技巧',
        question: LT`计算 $D=\begin{vmatrix}1&1&1\\1&2&3\\1&4&9\end{vmatrix}$。`,
        steps: [
          LT`这是 $x_1=1,x_2=2,x_3=3$ 的范德蒙德行列式。`,
          LT`$D=(x_2-x_1)(x_3-x_1)(x_3-x_2)$。`,
          LT`$=(2-1)(3-1)(3-2)=2$。`
        ],
        answer: LT`$D=2$`
      }
    ]
  },
  {
    id: 'lin-2',
    subject: 'linear',
    order: 2,
    title: '矩阵及其运算',
    en: 'Matrices & Operations',
    bookRef: '同济六版 §2.1–2.4',
    intro: '矩阵是线性代数的“语言”。这一章要把乘法、转置、逆、伴随、分块这五件事练熟，尤其注意矩阵乘法不满足交换律和消去律。',
    weight: '期末约 16%',
    hours: '建议 2 天',
    tags: ['矩阵乘法', '逆矩阵', '伴随矩阵'],
    drills: ['矩阵乘法', '转置性质', '逆矩阵', '伴随矩阵', '分块矩阵', '矩阵方程'],
    map: [
      { t: '运算', d: '加法、数乘、乘法' },
      { t: '转置', d: '穿脱原则' },
      { t: '逆', d: '伴随与初等变换' },
      { t: '分块', d: '矩阵方程的拆解' }
    ],
    kps: [
      {
        id: 'lin-2-1',
        title: '矩阵线性运算与乘法',
        tag: '基础',
        summary: '矩阵乘法要求“左列数 = 右行数”，结果第 i 行第 j 列是左矩阵第 i 行与右矩阵第 j 列的内积。',
        formulas: [
          { label: '乘法定义', tex: LT`c_{ij}=\sum_{k=1}^{s}a_{ik}b_{kj}` },
          { label: '转置穿脱', tex: LT`(AB)^T=B^TA^T` },
          { label: '逆的穿脱', tex: LT`(AB)^{-1}=B^{-1}A^{-1}` }
        ],
        points: [
          'AB 有意义不代表 BA 有意义；即使都有意义，AB≠BA。',
          'AB=0 不能推出 A=0 或 B=0；AB=AC 且 A≠0 也不能消去 A。',
          '方阵幂：A^kA^l=A^{k+l}，(A^k)^l=A^{kl}，但 (AB)^k≠A^kB^k（一般）。'
        ],
        mnemonic: '左行乘右列，内积定元素；转置穿脱要反序。',
        pitfall: '矩阵乘法不交换、不消去；把数的运算法则直接搬到矩阵上是重灾区。'
      },
      {
        id: 'lin-2-2',
        title: '逆矩阵与伴随矩阵',
        tag: '核心',
        summary: 'A 可逆 ⇔ |A|≠0。二阶矩阵求逆有“主对角换位、副对角变号、除以行列式”的速算法。',
        formulas: [
          { label: '可逆判据', tex: LT`A^{-1}\ \text{exists}\iff |A|\ne0` },
          { label: '伴随矩阵', tex: LT`AA^*=A^*A=|A|E` },
          { label: '逆矩阵公式', tex: LT`A^{-1}=\frac{1}{|A|}A^*` },
          { label: '伴随的行列式', tex: LT`|A^*|=|A|^{n-1}` }
        ],
        points: [
          'A* 的元素是 A 的代数余子式按“转置”排列，不是直接填。',
          '二阶速算：[[a,b],[c,d]]^{-1}=1/(ad−bc) [[d,−b],[−c,a]]。',
          '求逆三大方法：伴随公式（二阶/三阶）、初等行变换 [A|E]→[E|A⁻¹]、分块对角。'
        ],
        mnemonic: '主对换，副变号，行列式去除；伴随转置别忘记。',
        pitfall: 'A* 的排列顺序容易错；|A*|=|A|^{n−1} 中的指数是 n−1，不是 n。'
      },
      {
        id: 'lin-2-3',
        title: '分块矩阵与矩阵方程',
        tag: '强化',
        summary: '分块矩阵把大矩阵拆成小块，乘法规则与普通矩阵一致。分块对角矩阵的逆、行列式都有简洁公式。',
        formulas: [
          { label: '分块对角逆', tex: LT`\begin{pmatrix}A&0\\0&B\end{pmatrix}^{-1}=\begin{pmatrix}A^{-1}&0\\0&B^{-1}\end{pmatrix}` },
          { label: '分块对角行列式', tex: LT`\begin{vmatrix}A&0\\0&B\end{vmatrix}=|A||B|` },
          { label: '矩阵方程', tex: LT`AX=B\Rightarrow X=A^{-1}B` }
        ],
        points: [
          '解矩阵方程先判断 A 是否可逆，再左乘/右乘逆矩阵，注意左右顺序。',
          'AXB=C 的解为 X=A^{-1}CB^{-1}。',
          '分块三角矩阵求逆，可用“对角线块先求逆，再消非对角块”的思路。'
        ],
        mnemonic: '左乘左逆，右乘右逆；分块对角，各块自理。',
        pitfall: 'X=A^{-1}B 不能写成 BA^{-1}；矩阵乘法顺序不可交换。'
      }
    ],
    examples: [
      {
        title: '二阶矩阵求逆',
        tag: '逆矩阵',
        question: LT`设 $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$，求 $A^{-1}$。`,
        steps: [
          LT`$|A|=1\cdot4-2\cdot3=-2\ne0$，所以 $A$ 可逆。`,
          LT`副对角变号、主对角换位：$A^*=\begin{pmatrix}4&-2\\-3&1\end{pmatrix}$。`,
          LT`$A^{-1}=\dfrac{1}{-2}\begin{pmatrix}4&-2\\-3&1\end{pmatrix}=\begin{pmatrix}-2&1\\ \frac32&-\frac12\end{pmatrix}$。`
        ],
        answer: LT`$A^{-1}=\begin{pmatrix}-2&1\\ \frac32&-\frac12\end{pmatrix}$`
      },
      {
        title: '解矩阵方程',
        tag: '矩阵方程',
        question: LT`设 $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$，$B=\begin{pmatrix}1\\0\end{pmatrix}$，解 $AX=B$。`,
        steps: [
          LT`因为 $|A|=-2\ne0$，所以 $X=A^{-1}B$。`,
          LT`由上一题 $A^{-1}=\begin{pmatrix}-2&1\\ \frac32&-\frac12\end{pmatrix}$。`,
          LT`$X=\begin{pmatrix}-2&1\\ \frac32&-\frac12\end{pmatrix}\begin{pmatrix}1\\0\end{pmatrix}=\begin{pmatrix}-2\\ \frac32\end{pmatrix}$。`
        ],
        answer: LT`$X=\begin{pmatrix}-2\\ \frac32\end{pmatrix}$`
      }
    ]
  },
  {
    id: 'lin-3',
    subject: 'linear',
    order: 3,
    title: '矩阵的初等变换与线性方程组',
    en: 'Elementary Operations & Linear Systems',
    bookRef: '同济六版 §3.1–3.4',
    intro: '这是线代最核心的一章：初等变换、秩、方程组解的情况，三者是一条线。学会把矩阵化成行阶梯形，大部分题就完成了一半。',
    weight: '期末约 20%',
    hours: '建议 3 天',
    tags: ['初等变换', '矩阵的秩', '解的判定'],
    drills: ['化行阶梯形', '初等矩阵', '求秩', '解的个数判定', '基础解系'],
    map: [
      { t: '初等变换', d: '行变换与初等矩阵' },
      { t: '秩', d: '非零子式与阶梯形' },
      { t: '判定', d: 'r(A) 与 r(A|b)' },
      { t: '求解', d: '基础解系与通解' }
    ],
    kps: [
      {
        id: 'lin-3-1',
        title: '初等变换与初等矩阵',
        tag: '基础',
        summary: '三种初等行变换对应三类初等矩阵。左乘初等矩阵 = 做相应行变换，右乘 = 做相应列变换。',
        formulas: [
          { label: '三种初等变换', tex: LT`r_i\leftrightarrow r_j,\quad k r_i,\quad r_i+kr_j` },
          { label: '左行右列', tex: LT`EA:\ \text{row op};\quad AE:\ \text{column op}` },
          { label: '等价标准形', tex: LT`A\cong\begin{pmatrix}E_r&0\\0&0\end{pmatrix}` }
        ],
        points: [
          '初等矩阵都可逆，逆矩阵仍是同类型初等矩阵。',
          '初等变换不改变矩阵的秩，也不改变行向量组的线性关系。',
          '求逆：对 [A|E] 做初等行变换，化成 [E|A⁻¹]。'
        ],
        mnemonic: '左行右列，变换不改变秩；求逆就拼单位阵。',
        pitfall: '列变换会改变方程组的解，解线性方程组只能用行变换。'
      },
      {
        id: 'lin-3-2',
        title: '矩阵的秩',
        tag: '核心',
        summary: '秩 = 最高阶非零子式的阶数 = 行阶梯形中非零行的行数。它衡量矩阵“有效信息”的多少。',
        formulas: [
          { label: '秩的定义', tex: LT`r(A)=k\iff \exists\,k\text{-minor}\ne0,\ \text{all }(k+1)\text{-minors}=0` },
          { label: '乘积的秩', tex: LT`r(AB)\le\min\{r(A),r(B)\}` },
          { label: '和的秩', tex: LT`r(A+B)\le r(A)+r(B)` },
          { label: '可逆矩阵', tex: LT`r(A)=n\iff |A|\ne0` }
        ],
        points: [
          '求秩：初等行变换化行阶梯形，数非零行。',
          'r(A)=r(Aᵀ)；初等变换不改变秩。',
          'r(AB) 可能小于 min{r(A),r(B)}，例如两个非零矩阵相乘得零矩阵。'
        ],
        mnemonic: '阶梯非零行，就是秩；子式定定义，变换保秩。',
        pitfall: 'r(A+B) 一般不等于 r(A)+r(B)；r(AB)=r(A) 需要 B 可逆等附加条件。'
      },
      {
        id: 'lin-3-3',
        title: '线性方程组解的判定',
        tag: '核心',
        summary: '把系数矩阵和增广矩阵一起化行阶梯形，比较 r(A)、r(A|b) 与未知数个数 n，三种情况一目了然。',
        formulas: [
          { label: '无解', tex: LT`r(A)<r(A|b)` },
          { label: '唯一解', tex: LT`r(A)=r(A|b)=n` },
          { label: '无穷多解', tex: LT`r(A)=r(A|b)=r<n` },
          { label: '齐次方程组', tex: LT`r(A)<n\iff \exists x\ne0,\ Ax=0` }
        ],
        points: [
          '非齐次方程组：先看增广矩阵，出现 0=d（d≠0）直接无解。',
          '无穷多解时，自由未知量个数 = n−r。',
          '齐次方程组永远有零解；有非零解 ⇔ r(A)<n。'
        ],
        mnemonic: '增广秩大则无解，秩等未知数唯一；秩小自由变量补。',
        pitfall: '只看系数矩阵的秩不够，必须同时看增广矩阵；n 是未知数个数，不是方程个数。'
      },
      {
        id: 'lin-3-4',
        title: '基础解系与通解',
        tag: '强化',
        summary: '齐次方程组的基础解系含 n−r 个线性无关的解向量；非齐次通解 = 一个特解 + 齐次通解。',
        formulas: [
          { label: '齐次通解', tex: LT`x=k_1\xi_1+\cdots+k_{n-r}\xi_{n-r}` },
          { label: '非齐次通解', tex: LT`x=\eta^*+k_1\xi_1+\cdots+k_{n-r}\xi_{n-r}` },
          { label: '解空间维数', tex: LT`\dim N(A)=n-r(A)` }
        ],
        points: [
          '求基础解系：化行最简形，选自由未知量，分别取单位向量回代。',
          '自由未知量通常选非主元列对应的变量。',
          '非齐次的特解可令所有自由未知量为 0 得到。'
        ],
        mnemonic: '行最简，定主元；自由变量取单位，回代得基础解系。',
        pitfall: '基础解系不唯一，但所含向量个数固定为 n−r；不要把特解混进齐次通解。'
      }
    ],
    examples: [
      {
        title: '化行阶梯形解方程组',
        tag: '求解',
        question: LT`解方程组 $\begin{cases}x_1+x_2+x_3=1,\\ x_1+2x_2+3x_3=2,\\ 2x_1+3x_2+4x_3=3.\end{cases}$`,
        steps: [
          LT`对增广矩阵做行变换：$\left(\begin{array}{ccc|c}1&1&1&1\\1&2&3&2\\2&3&4&3\end{array}\right)\to\left(\begin{array}{ccc|c}1&1&1&1\\0&1&2&1\\0&1&2&1\end{array}\right)$。`,
          LT`再化：第三行减第二行得全零，故 $r(A)=r(A|b)=2<3$，有无穷多解。`,
          LT`令 $x_3=t$，则 $x_2=1-2t$，$x_1=t$。`,
          LT`通解：$(x_1,x_2,x_3)^T=(0,1,0)^T+t(1,-2,1)^T$。`
        ],
        answer: LT`$(0,1,0)^T+t(1,-2,1)^T,\ t\in\mathbb R$`
      },
      {
        title: '含参数方程组的解的判定',
        tag: '参数讨论',
        question: LT`讨论 $a$ 为何值时，方程组 $\begin{cases}x_1+x_2+x_3=1,\\ x_1+2x_2+3x_3=2,\\ x_1+4x_2+ax_3=3\end{cases}$ 有唯一解？`,
        steps: [
          LT`系数行列式 $D=\begin{vmatrix}1&1&1\\1&2&3\\1&4&a\end{vmatrix}=a-3$。`,
          LT`当 $a\ne3$ 时 $D\ne0$，方程组有唯一解。`,
          LT`当 $a=3$ 时需进一步看秩（本题 $r(A)=2<r(A|b)=3$，无解）。`
        ],
        answer: LT`$a\ne3$ 时唯一解；$a=3$ 时无解`
      }
    ]
  },
  {
    id: 'lin-4',
    subject: 'linear',
    order: 4,
    title: '向量组的线性相关性',
    en: 'Linear Dependence of Vectors',
    bookRef: '同济六版 §4.1–4.5',
    intro: '线性相关性是线代的“灵魂”。它把方程组、矩阵的秩、向量空间串在一起。判断相关还是无关，最终都落到秩上。',
    weight: '期末约 18%',
    hours: '建议 3 天',
    tags: ['线性相关', '极大无关组', '解结构'],
    drills: ['线性表示', '相关性判定', '极大无关组', '向量组的秩', '解的结构'],
    map: [
      { t: '线性表示', d: '能否由别人拼出' },
      { t: '相关性', d: '是否存在非零系数' },
      { t: '秩', d: '极大无关组的大小' },
      { t: '解结构', d: '基础解系与通解' }
    ],
    kps: [
      {
        id: 'lin-4-1',
        title: '线性组合与向量组等价',
        tag: '基础',
        summary: 'β 能由 α₁,…,αₛ 线性表示，等价于方程组 x₁α₁+…+xₛαₛ=β 有解。',
        formulas: [
          { label: '线性表示', tex: LT`\beta=k_1\alpha_1+\cdots+k_s\alpha_s` },
          { label: '判定', tex: LT`\beta\ \text{representable}\iff r(\alpha_1,\dots,\alpha_s)=r(\alpha_1,\dots,\alpha_s,\beta)` },
          { label: '向量组等价', tex: LT`\alpha\cong\beta` }
        ],
        points: [
          '把向量按列拼成矩阵，线性表示问题就变成方程组问题。',
          '向量组等价 ⇒ 秩相等，但秩相等不一定等价（需能互相表示）。',
          '零向量可由任何向量组线性表示（系数全取 0）。'
        ],
        mnemonic: '表示看增广秩，等价要互相表示；拼成矩阵用行变换。',
        pitfall: 'r(α)=r(α,β) 只说明 β 可表示，不说明表示系数唯一。'
      },
      {
        id: 'lin-4-2',
        title: '线性相关与线性无关',
        tag: '核心',
        summary: '存在不全为 0 的系数使组合为零向量，就叫线性相关；只有全零系数才行，就叫线性无关。',
        formulas: [
          { label: '线性相关', tex: LT`\exists\,k_1,\dots,k_s\ \text{not all zero},\ \sum k_i\alpha_i=0` },
          { label: '秩判据', tex: LT`\alpha_1,\dots,\alpha_s\ \text{dependent}\iff r(\alpha_1,\dots,\alpha_s)<s` },
          { label: 'n+1 个 n 维向量', tex: LT`n+1>n\Rightarrow\text{dependent}` },
          { label: '部分与整体', tex: LT`\text{part dep.}\Rightarrow\text{whole dep.};\quad \text{whole indep.}\Rightarrow\text{part indep.}` }
        ],
        points: [
          '含零向量的向量组必线性相关。',
          '两个向量相关 ⇔ 对应分量成比例。',
          '向量组线性无关 ⇔ 齐次方程组只有零解 ⇔ 矩阵列满秩。'
        ],
        mnemonic: '相关看秩小于个数，无关看秩等于个数；含零必相关。',
        pitfall: '“整体相关”不能推出“部分相关”；“部分无关”也不能推出“整体无关”。'
      },
      {
        id: 'lin-4-3',
        title: '向量组的秩与极大无关组',
        tag: '核心',
        summary: '极大无关组是“能表示全组的最少向量”，其向量个数就是向量组的秩。',
        formulas: [
          { label: '向量组的秩', tex: LT`r(\alpha_1,\dots,\alpha_s)=r(A)` },
          { label: '极大无关组', tex: LT`\text{independent}+\text{spans the set}` },
          { label: '等价组等秩', tex: LT`\alpha\cong\beta\Rightarrow r(\alpha)=r(\beta)` }
        ],
        points: [
          '把向量按列拼成矩阵，化行最简形，主元列对应的原向量构成极大无关组。',
          '极大无关组不唯一，但所含向量个数（秩）唯一。',
          '其余向量用极大无关组表示时，系数可从行最简形直接读出。'
        ],
        mnemonic: '主元列，原向量；极大无关组现成；秩就是它的个数。',
        pitfall: '主元列是“行最简形”的列位置，取极大无关组时要回到原矩阵取对应列。'
      },
      {
        id: 'lin-4-4',
        title: '线性方程组解的结构',
        tag: '强化',
        summary: '齐次解集是向量空间，维数 n−r；非齐次解集是“特解 + 齐次通解”的平移，不是向量空间。',
        formulas: [
          { label: '齐次解空间', tex: LT`N(A)=\{x\mid Ax=0\},\quad \dim N(A)=n-r(A)` },
          { label: '非齐次通解', tex: LT`x=\eta^*+\xi,\quad \xi\in N(A)` },
          { label: '解的叠加', tex: LT`Ax=b_1,\ Ax=b_2\Rightarrow A(x_1-x_2)=0` }
        ],
        points: [
          '非齐次的两个解之差是齐次解；非齐次解加齐次解仍是非齐次解。',
          '基础解系是齐次解空间的一组基，不唯一。',
          '求通解时先求齐次基础解系，再找一个非齐次特解。'
        ],
        mnemonic: '非齐次通解 = 特解 + 齐次通解；两解之差归齐次。',
        pitfall: '非齐次解集对加法、数乘不封闭，不能称为向量空间。'
      }
    ],
    examples: [
      {
        title: '含参数向量组的相关性',
        tag: '参数讨论',
        question: LT`设 $\alpha_1=(1,1,1)^T$，$\alpha_2=(1,2,3)^T$，$\alpha_3=(1,4,a)^T$，问 $a$ 为何值时三者线性相关？`,
        steps: [
          LT`三向量线性相关 ⇔ 行列式 $|\alpha_1,\alpha_2,\alpha_3|=0$。`,
          LT`$D=\begin{vmatrix}1&1&1\\1&2&3\\1&4&a\end{vmatrix}=a-7$。`,
          LT`令 $D=0$，得 $a=7$。`
        ],
        answer: LT`$a=7$`
      },
      {
        title: '非齐次方程组的通解结构',
        tag: '解结构',
        question: LT`已知非齐次方程组 $Ax=b$ 的一个特解 $\eta=(1,0,0)^T$，对应齐次方程组的基础解系为 $\xi_1=(1,-1,0)^T$，$\xi_2=(0,1,-1)^T$，写出通解。`,
        steps: [
          LT`非齐次通解 = 特解 + 齐次通解。`,
          LT`齐次通解为 $k_1\xi_1+k_2\xi_2$。`,
          LT`所以 $x=(1,0,0)^T+k_1(1,-1,0)^T+k_2(0,1,-1)^T$。`
        ],
        answer: LT`$x=(1,0,0)^T+k_1(1,-1,0)^T+k_2(0,1,-1)^T$`
      }
    ]
  },
  {
    id: 'lin-5',
    subject: 'linear',
    order: 5,
    title: '相似矩阵及二次型',
    en: 'Eigenvalues & Quadratic Forms',
    bookRef: '同济六版 §5.1–5.7',
    intro: '这是线代的“综合章”：特征值、相似对角化、二次型、正定性连成一条线。实对称矩阵的性质是解题的万能钥匙。',
    weight: '期末约 21%',
    hours: '建议 4 天',
    tags: ['特征值', '相似对角化', '正定二次型'],
    drills: ['特征值计算', '特征向量', '相似对角化', '实对称正交对角化', '配方法', '正定性判定'],
    map: [
      { t: '特征值', d: '特征多项式与迹' },
      { t: '对角化', d: 'n 个无关特征向量' },
      { t: '二次型', d: '标准形与惯性定理' },
      { t: '正定', d: '顺序主子式与特征值' }
    ],
    kps: [
      {
        id: 'lin-5-1',
        title: '特征值与特征向量',
        tag: '基础',
        summary: 'Ax=λx 且 x≠0。特征值由特征方程 |A−λE|=0 求出，特征向量是 (A−λE)x=0 的非零解。',
        formulas: [
          { label: '特征方程', tex: LT`|A-\lambda E|=0` },
          { label: '特征值之和', tex: LT`\sum_{i=1}^{n}\lambda_i=\operatorname{tr}(A)` },
          { label: '特征值之积', tex: LT`\prod_{i=1}^{n}\lambda_i=|A|` }
        ],
        points: [
          '特征向量必须是非零向量；一个特征值可对应多个线性无关的特征向量。',
          '不同特征值对应的特征向量线性无关。',
          '求特征向量：把 λ 代回 (A−λE)x=0，求基础解系。'
        ],
        mnemonic: '特征方程解 λ，回代求零空间；和看迹，积看行列式。',
        pitfall: '特征向量不能取零向量；λ 与 x 的对应关系不能张冠李戴。'
      },
      {
        id: 'lin-5-2',
        title: '相似矩阵与对角化',
        tag: '核心',
        summary: 'A 能对角化 ⇔ A 有 n 个线性无关的特征向量。实对称矩阵一定可以正交相似对角化。',
        formulas: [
          { label: '相似', tex: LT`P^{-1}AP=B` },
          { label: '对角化', tex: LT`P^{-1}AP=\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n)` },
          { label: '实对称矩阵', tex: LT`Q^TAQ=\Lambda,\quad Q^TQ=E` }
        ],
        points: [
          '相似矩阵有相同的特征值、迹、行列式、秩。',
          '每个特征值的几何重数（无关特征向量个数）等于代数重数时，才能对角化。',
          '实对称矩阵：不同特征值的特征向量正交；重根用施密特正交化，再单位化。'
        ],
        mnemonic: 'n 个无关特征向量，才能对角化；实对称必可正交对角化。',
        pitfall: '有 n 个特征值（含重根）不代表能对角化；要看重根的几何重数。'
      },
      {
        id: 'lin-5-3',
        title: '二次型与标准形',
        tag: '核心',
        summary: '二次型 f=xᵀAx（A 对称）。化标准形常用配方法或正交变换法，标准形不唯一，但正负惯性指数唯一。',
        formulas: [
          { label: '二次型矩阵', tex: LT`f(x_1,\dots,x_n)=x^TAx,\quad A^T=A` },
          { label: '正交变换', tex: LT`x=Qy\Rightarrow f=y^TQ^TAQy=\lambda_1y_1^2+\cdots+\lambda_ny_n^2` },
          { label: '惯性定理', tex: LT`p,q\ \text{are unique for }A` }
        ],
        points: [
          '写二次型矩阵：平方项系数放对角线，交叉项系数除以 2 放两侧。',
          '配方法：每次处理一个变量，把它配成完全平方，再处理剩余变量。',
          '正交变换法：求特征值 → 求正交特征向量 → 令 x=Qy。'
        ],
        mnemonic: '平方放对角，交叉一半分两边；配方或正交，标准形看惯性。',
        pitfall: '交叉项 2aij xi xj 对应的矩阵元素是 aij，不是 2aij。'
      },
      {
        id: 'lin-5-4',
        title: '正定二次型',
        tag: '强化',
        summary: '正定 ⇔ 所有特征值 > 0 ⇔ 所有顺序主子式 > 0 ⇔ 与单位矩阵合同。',
        formulas: [
          { label: '正定判据', tex: LT`f>0\ (\forall x\ne0)` },
          { label: '顺序主子式', tex: LT`\Delta_k>0,\quad k=1,2,\dots,n` },
          { label: '特征值判据', tex: LT`\lambda_i>0\ (\forall i)` },
          { label: '合同判据', tex: LT`A=D^TD,\quad D^{-1}\ \text{exists}` }
        ],
        points: [
          '正定的必要条件：对角线元素全为正，行列式为正。',
          '顺序主子式是“从左上角开始”的 k 阶子式，不是任意 k 阶子式。',
          '含参数的正定性问题，列顺序主子式不等式组求解。'
        ],
        mnemonic: '正定看顺序主子式，全部为正才通过；特征值全正也等价。',
        pitfall: '所有对角线元素为正只是必要条件，不充分；必须检查全部顺序主子式。'
      }
    ],
    examples: [
      {
        title: '实对称矩阵的正交对角化',
        tag: '对角化',
        question: LT`设 $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$，求正交矩阵 $Q$ 使 $Q^TAQ$ 为对角矩阵。`,
        steps: [
          LT`特征方程 $|A-\lambda E|=(2-\lambda)^2-1=0$，得 $\lambda_1=3,\lambda_2=1$。`,
          LT`$\lambda_1=3$ 时解 $(A-3E)x=0$，得特征向量 $(1,1)^T$；$\lambda_2=1$ 时得 $(1,-1)^T$。`,
          LT`两向量已正交，单位化得 $Q=\dfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$。`,
          LT`则 $Q^TAQ=\operatorname{diag}(3,1)$。`
        ],
        answer: LT`$Q=\dfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$，$Q^TAQ=\operatorname{diag}(3,1)$`
      },
      {
        title: '正定二次型的参数范围',
        tag: '正定',
        question: LT`设 $A=\begin{pmatrix}t&1\\1&t\end{pmatrix}$ 正定，求 $t$ 的范围。`,
        steps: [
          LT`一阶顺序主子式 $\Delta_1=t>0$。`,
          LT`二阶顺序主子式 $\Delta_2=t^2-1>0$。`,
          LT`联立得 $t>1$。`
        ],
        answer: LT`$t>1$`
      }
    ]
  },
  {
    id: 'lin-6',
    subject: 'linear',
    order: 6,
    title: '线性空间与线性变换',
    en: 'Linear Spaces & Transformations',
    bookRef: '同济六版 §6.1–6.5',
    intro: '选学章节，部分学校考、部分学校不考。它是前面所有内容的“抽象升级版”：把向量、坐标、矩阵统一到空间与映射的语言里。',
    weight: '选学 · 部分学校考查',
    hours: '建议 1 天',
    tags: ['线性空间', '基与坐标', '线性变换'],
    drills: ['子空间判定', '维数与基', '坐标变换', '线性变换矩阵'],
    map: [
      { t: '空间', d: '加法与数乘的公理化' },
      { t: '基', d: '维数与坐标' },
      { t: '变换', d: '线性映射与矩阵' }
    ],
    kps: [
      {
        id: 'lin-6-1',
        title: '线性空间与子空间',
        tag: '基础',
        summary: '线性空间是对“加法、数乘”封闭且满足八条公理的集合。子空间需要非空且对加法、数乘封闭。',
        formulas: [
          { label: '加法封闭', tex: LT`\alpha,\beta\in V\Rightarrow\alpha+\beta\in V` },
          { label: '数乘封闭', tex: LT`k\in\mathbb R,\ \alpha\in V\Rightarrow k\alpha\in V` },
          { label: '子空间判定', tex: LT`0\in W,\quad \alpha,\beta\in W\Rightarrow k\alpha+l\beta\in W` }
        ],
        points: [
          '判断子空间：先看零元素是否在集合中，再看对线性组合是否封闭。',
          '齐次方程组的解集 N(A) 是子空间；非齐次解集不是。',
          '两个子空间的交集仍是子空间，并集一般不是。'
        ],
        mnemonic: '子空间三查：有零、加法封闭、数乘封闭。',
        pitfall: '“对加法封闭”与“对数乘封闭”缺一不可；只验证零元素不够。'
      },
      {
        id: 'lin-6-2',
        title: '维数、基与坐标',
        tag: '核心',
        summary: '基是线性空间的一组极大无关组，维数是基中向量个数。向量在基下的坐标是唯一的。',
        formulas: [
          { label: '坐标', tex: LT`\alpha=x_1\alpha_1+\cdots+x_n\alpha_n` },
          { label: '过渡矩阵', tex: LT`(\beta_1,\dots,\beta_n)=(\alpha_1,\dots,\alpha_n)P` },
          { label: '坐标变换', tex: LT`x=P y` }
        ],
        points: [
          '求坐标：把基向量按列拼成矩阵，解 Ax=α。',
          '过渡矩阵 P 的列是新基在旧基下的坐标。',
          '同一向量在不同基下坐标不同，但向量本身不变。'
        ],
        mnemonic: '基定坐标，坐标唯一；旧基到新基，过渡矩阵列写新坐标。',
        pitfall: '坐标变换公式 x=Py 的方向容易搞反，取决于 P 的定义方向。'
      },
      {
        id: 'lin-6-3',
        title: '线性变换及其矩阵表示',
        tag: '强化',
        summary: '线性变换保持加法与数乘。选定基后，线性变换可以用矩阵表示；不同基下的矩阵相似。',
        formulas: [
          { label: '线性变换', tex: LT`T(k\alpha+l\beta)=kT(\alpha)+lT(\beta)` },
          { label: '矩阵表示', tex: LT`T(\alpha_1,\dots,\alpha_n)=(\alpha_1,\dots,\alpha_n)A` },
          { label: '不同基下', tex: LT`B=P^{-1}AP` }
        ],
        points: [
          '求线性变换的矩阵：把每个基向量的像用基表示，坐标按列排列。',
          '核 ker T 的维数 + 像 Im T 的维数 = 定义域维数（秩-零化度定理）。',
          '线性变换在不同基下的矩阵相似，因此特征值不变。'
        ],
        mnemonic: '基像坐标按列排，就是变换矩阵；换基则相似。',
        pitfall: '矩阵表示依赖基的选择，不能说“线性变换就是某个矩阵”而不说明基。'
      }
    ],
    examples: [
      {
        title: '求线性变换在给定基下的矩阵',
        tag: '矩阵表示',
        question: LT`在 $\mathbb R^2$ 的标准基 $e_1,e_2$ 下，线性变换 $T(x_1,x_2)=(x_1+x_2,\ x_1-x_2)$，求 $T$ 的矩阵。`,
        steps: [
          LT`$T(e_1)=(1,1)^T$，$T(e_2)=(1,-1)^T$。`,
          LT`把像按列排列，得 $A=\begin{pmatrix}1&1\\1&-1\end{pmatrix}$。`,
          LT`验证：$A(x_1,x_2)^T=(x_1+x_2,\ x_1-x_2)^T$。`
        ],
        answer: LT`$A=\begin{pmatrix}1&1\\1&-1\end{pmatrix}$`
      }
    ]
  }
];
