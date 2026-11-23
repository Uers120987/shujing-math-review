/* 原创题库 · 扩充 50 题
   每题都给出可复核的解析；与 data-questions.js 合并后共 150 题。 */
const QE = String.raw;

window.QUESTION_BANK_EXTRA = [
  /* ===== 高数 · 函数与极限 ===== */
  {
    id: 'q2-c1-1', chapter: 'calc-1', type: 'single', level: '核心',
    stem: QE`$\displaystyle\lim_{x\to0}\frac{e^{x^2}-1}{1-\cos x}=$（ ）。`,
    options: [QE`$1$`, QE`$2$`, QE`$\dfrac12$`, QE`$0$`],
    answer: 1,
    explain: QE`$e^{x^2}-1\sim x^2$，$1-\cos x\sim\dfrac{x^2}{2}$，所以原式 $=\dfrac{x^2}{x^2/2}=2$。这题考的是“分子分母各自用等价无穷小”，不要整体乱换。`
  },
  {
    id: 'q2-c1-2', chapter: 'calc-1', type: 'single', level: '强化',
    stem: QE`$\displaystyle\lim_{x\to+\infty}\left(\sqrt{x^2+x}-x\right)=$（ ）。`,
    options: [QE`$0$`, QE`$\dfrac12$`, QE`$1$`, QE`$+\infty$`],
    answer: 1,
    explain: QE`有理化：$\sqrt{x^2+x}-x=\dfrac{x}{\sqrt{x^2+x}+x}=\dfrac{1}{\sqrt{1+1/x}+1}\to\dfrac12$。遇到“根号减一次式”，先乘共轭是固定第一步。`
  },
  {
    id: 'q2-c1-3', chapter: 'calc-1', type: 'single', level: '基础',
    stem: QE`设 $f(x)=\begin{cases}\dfrac{x^2-1}{x-1},&x\ne1,\\ a,&x=1.\end{cases}$ 若 $f(x)$ 在 $x=1$ 处连续，则 $a=$（ ）。`,
    options: [QE`$0$`, QE`$1$`, QE`$2$`, QE`不存在`],
    answer: 2,
    explain: QE`$x\ne1$ 时 $\dfrac{x^2-1}{x-1}=x+1$，所以 $\lim_{x\to1}f(x)=2$。连续要求 $a=f(1)=2$。注意：约分只在 $x\ne1$ 时成立。`
  },
  {
    id: 'q2-c1-4', chapter: 'calc-1', type: 'fill', level: '易错',
    stem: QE`$\displaystyle\lim_{x\to0}x\sin\frac1x=$ ______。`,
    answer: '0', accept: ['0'],
    answerText: QE`$0$`,
    explain: QE`$|\sin(1/x)|\le1$，所以 $|x\sin(1/x)|\le|x|$。由夹逼准则，$x\to0$ 时极限为 $0$。有界函数乘无穷小仍是无穷小，不要因为 $\sin(1/x)$ 振荡就判“极限不存在”。`
  },

  /* ===== 高数 · 导数与微分 ===== */
  {
    id: 'q2-c2-1', chapter: 'calc-2', type: 'single', level: '基础',
    stem: QE`$y=\arctan x$ 在 $x=1$ 处的导数为（ ）。`,
    options: [QE`$\dfrac12$`, QE`$\dfrac{\pi}{4}$`, QE`$1$`, QE`$\dfrac{1}{\sqrt2}$`],
    answer: 0,
    explain: QE`$(\arctan x)'=\dfrac{1}{1+x^2}$，代入 $x=1$ 得 $\dfrac12$。注意 $\arctan1=\pi/4$ 是函数值，不是导数值。`
  },
  {
    id: 'q2-c2-2', chapter: 'calc-2', type: 'single', level: '核心',
    stem: QE`$y=x^2e^x$ 的导数为（ ）。`,
    options: [QE`$2xe^x$`, QE`$x^2e^x$`, QE`$xe^x(x+2)$`, QE`$e^x(x^2+2x+2)$`],
    answer: 2,
    explain: QE`乘积法则：$y'=2xe^x+x^2e^x=xe^x(x+2)$。也可以先提公因式 $x^2e^x$ 再求导，但不要漏掉第一项的 $2x$。`
  },
  {
    id: 'q2-c2-3', chapter: 'calc-2', type: 'single', level: '核心',
    stem: QE`曲线 $x^2+xy+y^2=3$ 在点 $(1,1)$ 处的切线斜率为（ ）。`,
    options: [QE`$-1$`, QE`$1$`, QE`$-\dfrac12$`, QE`$-2$`],
    answer: 0,
    explain: QE`两边对 $x$ 求导：$2x+y+xy'+2yy'=0$，解得 $y'=-\dfrac{2x+y}{x+2y}$。代入 $(1,1)$ 得 $-\dfrac{3}{3}=-1$。`
  },
  {
    id: 'q2-c2-4', chapter: 'calc-2', type: 'single', level: '强化',
    stem: QE`用微分近似计算 $\sqrt{1.02}$，结果约为（ ）。`,
    options: [QE`$1.01$`, QE`$1.02$`, QE`$1.005$`, QE`$1.1$`],
    answer: 0,
    explain: QE`取 $f(x)=\sqrt{x}$，$x_0=1$，$\Delta x=0.02$。$f(1)=1$，$f'(1)=\dfrac12$，所以 $f(1.02)\approx1+\dfrac12\cdot0.02=1.01$。`
  },

  /* ===== 高数 · 中值定理与导数应用 ===== */
  {
    id: 'q2-c3-1', chapter: 'calc-3', type: 'single', level: '核心',
    stem: QE`$\displaystyle\lim_{x\to0}\frac{\tan x-x}{x^3}=$（ ）。`,
    options: [QE`$\dfrac13$`, QE`$\dfrac12$`, QE`$\dfrac16$`, QE`$1$`],
    answer: 0,
    explain: QE`泰勒展开 $\tan x=x+\dfrac{x^3}{3}+o(x^3)$，所以分子为 $\dfrac{x^3}{3}+o(x^3)$，极限为 $\dfrac13$。这类题用洛必达也可，但要连续求导三次，泰勒更快。`
  },
  {
    id: 'q2-c3-2', chapter: 'calc-3', type: 'single', level: '强化',
    stem: QE`$\displaystyle\lim_{x\to0}\frac{x-\sin x}{x^3}=$（ ）。`,
    options: [QE`$\dfrac16$`, QE`$\dfrac13$`, QE`$\dfrac12$`, QE`$0$`],
    answer: 0,
    explain: QE`$\sin x=x-\dfrac{x^3}{6}+o(x^3)$，故 $x-\sin x\sim\dfrac{x^3}{6}$，极限为 $\dfrac16$。注意：$x-\sin x$ 不能直接用 $x-x=0$ 替换。`
  },
  {
    id: 'q2-c3-3', chapter: 'calc-3', type: 'single', level: '核心',
    stem: QE`函数 $f(x)=\ln x-x$ 的最大值是（ ）。`,
    options: [QE`$-1$`, QE`$0$`, QE`$1$`, QE`不存在`],
    answer: 0,
    explain: QE`定义域 $x>0$，$f'(x)=\dfrac1x-1=\dfrac{1-x}{x}$。$x=1$ 时 $f'=0$；$0<x<1$ 时 $f'>0$，$x>1$ 时 $f'<0$，故 $x=1$ 为最大值点，最大值 $f(1)=-1$。`
  },
  {
    id: 'q2-c3-4', chapter: 'calc-3', type: 'single', level: '强化',
    stem: QE`曲线 $y=\dfrac{2x^2+1}{x}$ 的斜渐近线是（ ）。`,
    options: [QE`$y=2x$`, QE`$y=x$`, QE`$y=2x+1$`, QE`$y=2$`],
    answer: 0,
    explain: QE`$y=2x+\dfrac1x$，当 $x\to\infty$ 时 $\dfrac1x\to0$，所以斜渐近线为 $y=2x$；同时 $x=0$ 是垂直渐近线。`
  },

  /* ===== 高数 · 不定积分 ===== */
  {
    id: 'q2-c4-1', chapter: 'calc-4', type: 'single', level: '基础',
    stem: QE`$\displaystyle\int(2x+1)^5\,dx=$（ ）。`,
    options: [
      QE`$\dfrac{(2x+1)^6}{12}+C$`,
      QE`$\dfrac{(2x+1)^6}{6}+C$`,
      QE`$\dfrac{(2x+1)^6}{2}+C$`,
      QE`$5(2x+1)^4+C$`
    ],
    answer: 0,
    explain: QE`令 $u=2x+1$，$du=2dx$，则积分 $=\dfrac12\int u^5du=\dfrac{u^6}{12}+C$。换元后别忘了 $du=2dx$ 产生的 $\dfrac12$。`
  },
  {
    id: 'q2-c4-2', chapter: 'calc-4', type: 'single', level: '核心',
    stem: QE`$\displaystyle\int\frac{dx}{x\ln x}=$（ ）。`,
    options: [QE`$\ln|\ln x|+C$`, QE`$\dfrac{1}{\ln x}+C$`, QE`$\ln x+C$`, QE`$\dfrac{\ln^2x}{2}+C$`],
    answer: 0,
    explain: QE`凑微分：$\dfrac{dx}{x}=d(\ln x)$，所以原式 $=\displaystyle\int\frac{d(\ln x)}{\ln x}=\ln|\ln x|+C$。`
  },
  {
    id: 'q2-c4-3', chapter: 'calc-4', type: 'single', level: '核心',
    stem: QE`$\displaystyle\int x\cos x\,dx=$（ ）。`,
    options: [
      QE`$x\sin x+\cos x+C$`,
      QE`$x\sin x-\cos x+C$`,
      QE`$-x\sin x+\cos x+C$`,
      QE`$x\cos x-\sin x+C$`
    ],
    answer: 0,
    explain: QE`分部积分：$u=x$，$dv=\cos x\,dx$，$v=\sin x$。原式 $=x\sin x-\int\sin x\,dx=x\sin x+\cos x+C$。`
  },
  {
    id: 'q2-c4-4', chapter: 'calc-4', type: 'single', level: '强化',
    stem: QE`$\displaystyle\int\frac{dx}{x^2-1}=$（ ）。`,
    options: [
      QE`$\dfrac12\ln\left|\dfrac{x-1}{x+1}\right|+C$`,
      QE`$\ln|x^2-1|+C$`,
      QE`$\arctan x+C$`,
      QE`$\dfrac{1}{x-1}+C$`
    ],
    answer: 0,
    explain: QE`部分分式：$\dfrac{1}{x^2-1}=\dfrac12\left(\dfrac{1}{x-1}-\dfrac{1}{x+1}\right)$，积分得 $\dfrac12(\ln|x-1|-\ln|x+1|)+C$，合并即得。`
  },

  /* ===== 高数 · 定积分 ===== */
  {
    id: 'q2-c5-1', chapter: 'calc-5', type: 'fill', level: '基础',
    stem: QE`$\displaystyle\int_0^1(2x+1)\,dx=$ ______。`,
    answer: '2', accept: ['2'],
    answerText: QE`$2$`,
    explain: QE`$\int_0^1(2x+1)dx=[x^2+x]_0^1=1+1=2$。也可以拆成 $\int_0^12x\,dx+\int_0^11\,dx=1+1=2$。`
  },
  {
    id: 'q2-c5-2', chapter: 'calc-5', type: 'single', level: '核心',
    stem: QE`$\displaystyle\frac{d}{dx}\int_x^0\sin t\,dt=$（ ）。`,
    options: [QE`$-\sin x$`, QE`$\sin x$`, QE`$\cos x$`, QE`$-\cos x$`],
    answer: 0,
    explain: QE`先交换上下限：$\int_x^0\sin t\,dt=-\int_0^x\sin t\,dt$，再求导得 $-\sin x$。下限是变量时，求导要带负号。`
  },
  {
    id: 'q2-c5-3', chapter: 'calc-5', type: 'single', level: '基础',
    stem: QE`$\displaystyle\int_{-a}^{a}(x^5+x^3)\,dx=$（ ）。`,
    options: [QE`$0$`, QE`$2a^6$`, QE`$a^4$`, QE`$2a^4$`],
    answer: 0,
    explain: QE`$x^5+x^3$ 是奇函数，在对称区间 $[-a,a]$ 上积分为 $0$。先看奇偶性，能避免大量计算。`
  },
  {
    id: 'q2-c5-4', chapter: 'calc-5', type: 'single', level: '强化',
    stem: QE`$\displaystyle\int_0^{\pi/2}\cos^3x\,dx=$（ ）。`,
    options: [QE`$\dfrac23$`, QE`$\dfrac12$`, QE`$\dfrac{\pi}{4}$`, QE`$1$`],
    answer: 0,
    explain: QE`华里士公式：$\int_0^{\pi/2}\cos^3x\,dx=\dfrac{2}{3}\cdot1=\dfrac23$。奇数幂的公式不带 $\pi$，偶数幂才带 $\pi/2$。`
  },

  /* ===== 高数 · 定积分应用 ===== */
  {
    id: 'q2-c6-1', chapter: 'calc-6', type: 'single', level: '基础',
    stem: QE`曲线 $y=\sqrt{x}$ 与 $y=x$ 所围图形的面积为（ ）。`,
    options: [QE`$\dfrac16$`, QE`$\dfrac13$`, QE`$\dfrac12$`, QE`$1$`],
    answer: 0,
    explain: QE`交点 $x=0,1$，在 $(0,1)$ 上 $\sqrt{x}>x$，面积 $=\int_0^1(\sqrt{x}-x)dx=\dfrac23-\dfrac12=\dfrac16$。`
  },
  {
    id: 'q2-c6-2', chapter: 'calc-6', type: 'single', level: '核心',
    stem: QE`$y=x\ (0\le x\le1)$ 绕 $x$ 轴旋转所得旋转体的体积为（ ）。`,
    options: [QE`$\dfrac{\pi}{3}$`, QE`$\dfrac{\pi}{2}$`, QE`$\pi$`, QE`$\dfrac{2\pi}{3}$`],
    answer: 0,
    explain: QE`圆盘法：$V=\pi\int_0^1x^2dx=\dfrac{\pi}{3}$。这里是圆锥，也可用 $V=\dfrac13\pi r^2h$ 验证。`
  },
  {
    id: 'q2-c6-3', chapter: 'calc-6', type: 'single', level: '强化',
    stem: QE`曲线 $y=\dfrac23x^{3/2}$ 从 $x=0$ 到 $x=3$ 的弧长为（ ）。`,
    options: [QE`$\dfrac{14}{3}$`, QE`$\dfrac{16}{3}$`, QE`$\dfrac{7}{3}$`, QE`$6$`],
    answer: 0,
    explain: QE`$y'=\sqrt{x}$，$ds=\sqrt{1+x}\,dx$。弧长 $=\int_0^3\sqrt{1+x}\,dx=\left[\dfrac23(1+x)^{3/2}\right]_0^3=\dfrac23(8-1)=\dfrac{14}{3}$。`
  },
  {
    id: 'q2-c6-4', chapter: 'calc-6', type: 'fill', level: '基础',
    stem: QE`函数 $f(x)=2x$ 在区间 $[0,1]$ 上的平均值为 ______。`,
    answer: '1', accept: ['1'],
    answerText: QE`$1$`,
    explain: QE`平均值 $=\dfrac{1}{1-0}\int_0^12x\,dx=[x^2]_0^1=1$。平均值不是“最大值与最小值的平均”，而是积分除以区间长度。`
  },

  /* ===== 高数 · 微分方程 ===== */
  {
    id: 'q2-c7-1', chapter: 'calc-7', type: 'single', level: '基础',
    stem: QE`微分方程 $y'=3x^2$ 满足 $y(0)=1$ 的特解是（ ）。`,
    options: [QE`$y=x^3+1$`, QE`$y=x^3$`, QE`$y=3x^3+1$`, QE`$y=x^2+1$`],
    answer: 0,
    explain: QE`积分得 $y=x^3+C$，代入 $y(0)=1$ 得 $C=1$，所以 $y=x^3+1$。`
  },
  {
    id: 'q2-c7-2', chapter: 'calc-7', type: 'single', level: '核心',
    stem: QE`一阶线性方程 $y'+y=e^x$ 的通解是（ ）。`,
    options: [
      QE`$y=\dfrac12e^x+Ce^{-x}$`,
      QE`$y=e^x+Ce^{-x}$`,
      QE`$y=\dfrac12e^x+C$`,
      QE`$y=e^{-x}(C+e^{2x})$`
    ],
    answer: 0,
    explain: QE`积分因子 $e^{\int1dx}=e^x$，两边乘 $e^x$：$(e^xy)'=e^{2x}$，积分得 $e^xy=\dfrac12e^{2x}+C$，所以 $y=\dfrac12e^x+Ce^{-x}$。`
  },
  {
    id: 'q2-c7-3', chapter: 'calc-7', type: 'single', level: '基础',
    stem: QE`$y''+4y=0$ 的通解是（ ）。`,
    options: [
      QE`$y=C_1\cos2x+C_2\sin2x$`,
      QE`$y=C_1e^{2x}+C_2e^{-2x}$`,
      QE`$y=(C_1+C_2x)e^{2x}$`,
      QE`$y=C_1\cos x+C_2\sin x$`
    ],
    answer: 0,
    explain: QE`特征方程 $r^2+4=0$，根为 $r=\pm2i$，即 $\alpha=0,\beta=2$，所以通解为 $C_1\cos2x+C_2\sin2x$。`
  },
  {
    id: 'q2-c7-4', chapter: 'calc-7', type: 'single', level: '核心',
    stem: QE`$y''=6x$ 的通解是（ ）。`,
    options: [
      QE`$y=x^3+C_1x+C_2$`,
      QE`$y=3x^2+C_1x+C_2$`,
      QE`$y=x^3+C$`,
      QE`$y=6x^2+C_1x+C_2$`
    ],
    answer: 0,
    explain: QE`连续积分两次：$y'=3x^2+C_1$，$y=x^3+C_1x+C_2$。二阶方程的通解必须有两个独立常数。`
  },

  /* ===== 线代 · 行列式 ===== */
  {
    id: 'q2-l1-1', chapter: 'lin-1', type: 'fill', level: '基础',
    stem: QE`$\begin{vmatrix}2&1\\1&3\end{vmatrix}=$ ______。`,
    answer: '5', accept: ['5'],
    answerText: QE`$5$`,
    explain: QE`二阶行列式 $ad-bc=2\cdot3-1\cdot1=5$。`
  },
  {
    id: 'q2-l1-2', chapter: 'lin-1', type: 'single', level: '基础',
    stem: QE`设 $|A|=-3$，则 $|A^T|=$（ ）。`,
    options: [QE`$-3$`, QE`$3$`, QE`$9$`, QE`$0$`],
    answer: 0,
    explain: QE`行列式转置不变：$|A^T|=|A|=-3$。`
  },
  {
    id: 'q2-l1-3', chapter: 'lin-1', type: 'single', level: '核心',
    stem: QE`设 $|A|=2$，则 $|A^{-1}|=$（ ）。`,
    options: [QE`$\dfrac12$`, QE`$2$`, QE`$-2$`, QE`$1$`],
    answer: 0,
    explain: QE`由 $AA^{-1}=E$ 取行列式：$|A||A^{-1}|=1$，所以 $|A^{-1}|=\dfrac1{|A|}=\dfrac12$。`
  },
  {
    id: 'q2-l1-4', chapter: 'lin-1', type: 'single', level: '核心',
    stem: QE`用克拉默法则解方程组，已知 $D=4$，$D_1=8$，则 $x_1=$（ ）。`,
    options: [QE`$2$`, QE`$\dfrac12$`, QE`$4$`, QE`$8$`],
    answer: 0,
    explain: QE`克拉默法则 $x_1=\dfrac{D_1}{D}=\dfrac84=2$。注意分母始终是系数行列式 $D$。`
  },

  /* ===== 线代 · 矩阵 ===== */
  {
    id: 'q2-l2-1', chapter: 'lin-2', type: 'single', level: '基础',
    stem: QE`下列等式一定成立的是（ ）。`,
    options: [
      QE`$(A+B)^T=A^T+B^T$`,
      QE`$(AB)^T=A^TB^T$`,
      QE`$(A+B)^2=A^2+2AB+B^2$`,
      QE`$(AB)^2=A^2B^2$`
    ],
    answer: 0,
    explain: QE`转置对加法是线性的：$(A+B)^T=A^T+B^T$。转置对乘法要反序：$(AB)^T=B^TA^T$；另外两个选项都默认了矩阵乘法可交换，一般不成立。`
  },
  {
    id: 'q2-l2-2', chapter: 'lin-2', type: 'single', level: '核心',
    stem: QE`设 $A,B$ 均可逆，则 $(AB)^{-1}=$（ ）。`,
    options: [QE`$B^{-1}A^{-1}$`, QE`$A^{-1}B^{-1}$`, QE`$A^{-1}B$`, QE`$AB$`],
    answer: 0,
    explain: QE`穿脱原则：$(AB)^{-1}=B^{-1}A^{-1}$。验证：$(AB)(B^{-1}A^{-1})=A(BB^{-1})A^{-1}=E$。`
  },
  {
    id: 'q2-l2-3', chapter: 'lin-2', type: 'judge', level: '易错',
    stem: QE`若方阵 $A$ 满足 $A^2=E$，则 $A$ 可逆，且 $A^{-1}=A$。`,
    options: [QE`正确`, QE`错误`],
    answer: 0,
    explain: QE`由 $A^2=E$ 可知 $|A|^2=1$，所以 $|A|\ne0$，$A$ 可逆；且 $A\cdot A=E$，故 $A^{-1}=A$。`
  },
  {
    id: 'q2-l2-4', chapter: 'lin-2', type: 'single', level: '强化',
    stem: QE`设 $A$ 为三阶矩阵，$|A|=2$，则 $|2A^{-1}|=$（ ）。`,
    options: [QE`$4$`, QE`$2$`, QE`$8$`, QE`$16$`],
    answer: 0,
    explain: QE`$|A^{-1}|=\dfrac12$，且 $|kA|=k^n|A|$，所以 $|2A^{-1}|=2^3\cdot\dfrac12=4$。`
  },

  /* ===== 线代 · 初等变换与方程组 ===== */
  {
    id: 'q2-l3-1', chapter: 'lin-3', type: 'fill', level: '基础',
    stem: QE`矩阵 $A=\begin{pmatrix}1&0&1\\0&1&1\\1&1&2\end{pmatrix}$ 的秩为 ______。`,
    answer: '2', accept: ['2'],
    answerText: QE`$2$`,
    explain: QE`第三行等于第一行加第二行，所以行向量组线性相关；前两行不成比例，故秩为 $2$。`
  },
  {
    id: 'q2-l3-2', chapter: 'lin-3', type: 'single', level: '核心',
    stem: QE`设 $A$ 为 $3\times3$ 矩阵，$r(A)=r(A|b)=2$，则方程组 $Ax=b$ 的自由未知量个数为（ ）。`,
    options: [QE`$1$`, QE`$2$`, QE`$0$`, QE`$3$`],
    answer: 0,
    explain: QE`未知数个数 $n=3$，自由未知量个数 $=n-r=3-2=1$。此时有无穷多解。`
  },
  {
    id: 'q2-l3-3', chapter: 'lin-3', type: 'single', level: '核心',
    stem: QE`用初等矩阵 $E$ 左乘矩阵 $A$，等价于对 $A$ 做（ ）。`,
    options: [QE`相应的初等行变换`, QE`相应的初等列变换`, QE`转置`, QE`求逆`],
    answer: 0,
    explain: QE`口诀“左行右列”：初等矩阵左乘 $A$，对 $A$ 做相应的初等行变换；右乘则做列变换。`
  },
  {
    id: 'q2-l3-4', chapter: 'lin-3', type: 'single', level: '强化',
    stem: QE`设 $A$ 为三阶矩阵，$r(A)=2$，则齐次方程组 $Ax=0$ 的解空间维数为（ ）。`,
    options: [QE`$1$`, QE`$2$`, QE`$3$`, QE`$0$`],
    answer: 0,
    explain: QE`解空间维数 $=n-r(A)=3-2=1$，基础解系含 $1$ 个向量。`
  },

  /* ===== 线代 · 向量组 ===== */
  {
    id: 'q2-l4-1', chapter: 'lin-4', type: 'judge', level: '基础',
    stem: QE`向量 $\alpha_1=(1,2)^T$ 与 $\alpha_2=(2,4)^T$ 线性相关。`,
    options: [QE`正确`, QE`错误`],
    answer: 0,
    explain: QE`$\alpha_2=2\alpha_1$，存在非零系数使 $2\alpha_1-\alpha_2=0$，故线性相关。两个非零向量相关等价于对应分量成比例。`
  },
  {
    id: 'q2-l4-2', chapter: 'lin-4', type: 'single', level: '核心',
    stem: QE`向量 $\beta$ 可由向量组 $\alpha_1,\dots,\alpha_s$ 线性表示的充要条件是（ ）。`,
    options: [
      QE`$r(\alpha_1,\dots,\alpha_s)=r(\alpha_1,\dots,\alpha_s,\beta)$`,
      QE`$r(\alpha_1,\dots,\alpha_s)=s$`,
      QE`$\beta=0$`,
      QE`$r(\beta)=1$`
    ],
    answer: 0,
    explain: QE`把向量按列拼成矩阵，$\beta$ 可表示等价于方程组 $(\alpha_1,\dots,\alpha_s)x=\beta$ 有解，即系数矩阵与增广矩阵的秩相等。`
  },
  {
    id: 'q2-l4-3', chapter: 'lin-4', type: 'judge', level: '基础',
    stem: QE`在 $\mathbb R^3$ 中，任意四个向量必线性相关。`,
    options: [QE`正确`, QE`错误`],
    answer: 0,
    explain: QE`$\mathbb R^3$ 中任意 $3+1=4$ 个向量必线性相关；更一般地，$\mathbb R^n$ 中任意 $n+1$ 个向量必相关。`
  },
  {
    id: 'q2-l4-4', chapter: 'lin-4', type: 'fill', level: '核心',
    stem: QE`设 $A$ 为 $4\times5$ 矩阵，$r(A)=3$，则 $Ax=0$ 的基础解系含 ______ 个向量。`,
    answer: '2', accept: ['2'],
    answerText: QE`$2$`,
    explain: QE`未知数个数 $n=5$，基础解系向量个数 $=n-r(A)=5-3=2$。`
  },

  /* ===== 线代 · 特征值与二次型 ===== */
  {
    id: 'q2-l5-1', chapter: 'lin-5', type: 'single', level: '基础',
    stem: QE`矩阵 $A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$ 的特征值为（ ）。`,
    options: [QE`$3,-1$`, QE`$2,1$`, QE`$3,1$`, QE`$-3,1$`],
    answer: 0,
    explain: QE`$|A-\lambda E|=(1-\lambda)^2-4=0$，得 $\lambda=3$ 或 $\lambda=-1$。也可用迹 $2$、行列式 $-3$ 验证。`
  },
  {
    id: 'q2-l5-2', chapter: 'lin-5', type: 'single', level: '核心',
    stem: QE`设三阶矩阵 $A$ 的迹为 $5$，行列式为 $3$，且其特征值为 $1,3,\lambda_3$，则 $\lambda_3=$（ ）。`,
    options: [QE`$0$`, QE`$1$`, QE`$3$`, QE`$4$`],
    answer: 1,
    explain: QE`特征值之和等于迹：$1+3+\lambda_3=5$，所以 $\lambda_3=1$。用乘积验证：$1\cdot3\cdot1=3=|A|$。`
  },
  {
    id: 'q2-l5-3', chapter: 'lin-5', type: 'single', level: '核心',
    stem: QE`二次型 $f(x_1,x_2)=x_1^2+4x_1x_2+3x_2^2$ 的矩阵为（ ）。`,
    options: [
      QE`$\begin{pmatrix}1&2\\2&3\end{pmatrix}$`,
      QE`$\begin{pmatrix}1&4\\4&3\end{pmatrix}$`,
      QE`$\begin{pmatrix}1&0\\0&3\end{pmatrix}$`,
      QE`$\begin{pmatrix}1&2\\0&3\end{pmatrix}$`
    ],
    answer: 0,
    explain: QE`平方项系数放对角线，交叉项 $4x_1x_2$ 的系数除以 $2$ 放在两侧，所以矩阵为 $\begin{pmatrix}1&2\\2&3\end{pmatrix}$。`
  },
  {
    id: 'q2-l5-4', chapter: 'lin-5', type: 'judge', level: '易错',
    stem: QE`矩阵 $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ 是正定矩阵。`,
    options: [QE`正确`, QE`错误`],
    answer: 0,
    explain: QE`顺序主子式 $\Delta_1=2>0$，$\Delta_2=4-1=3>0$，全部为正，故正定。也可看特征值 $3,1$ 全为正。`
  },

  /* ===== 线代 · 线性空间（选学） ===== */
  {
    id: 'q2-l6-1', chapter: 'lin-6', type: 'fill', level: '基础',
    stem: QE`子空间 $W=\{(x,y,z)^T\in\mathbb R^3\mid x+y+z=0\}$ 的维数为 ______。`,
    answer: '2', accept: ['2'],
    answerText: QE`$2$`,
    explain: QE`$W$ 是齐次方程 $x+y+z=0$ 的解空间，系数矩阵秩为 $1$，所以维数 $=3-1=2$。`
  },
  {
    id: 'q2-l6-2', chapter: 'lin-6', type: 'single', level: '核心',
    stem: QE`线性变换 $T(x,y,z)=(x+y+z,0,0)$ 的核的维数为（ ）。`,
    options: [QE`$2$`, QE`$1$`, QE`$3$`, QE`$0$`],
    answer: 0,
    explain: QE`核满足 $x+y+z=0$，是一个过原点的平面，维数为 $2$。也可用秩-零化度定理：像空间维数为 $1$，所以核维数 $=3-1=2$。`
  }
];
