/* 原创题库 · 100 题
   题型参照“基础 → 强化 → 易错”的刷题路径设计，题目与解析均为原创，
   不复制任何教材、课程或题集的原文。 */
const QT = String.raw;

window.QUESTION_BANK = [
  /* ========== 高等数学 · 函数与极限 ========== */
  {
    id: 'q-c1-1', chapter: 'calc-1', type: 'single', level: '基础',
    stem: QT`函数 $f(x)=\dfrac{\sqrt{4-x^2}}{\ln(x+1)}$ 的定义域是（ ）。`,
    options: [
      QT`$[-2,2]$`,
      QT`$(-1,0)\cup(0,2]$`,
      QT`$(-1,2]$`,
      QT`$[-1,0)\cup(0,2]$`
    ],
    answer: 1,
    explain: QT`根号要求 $4-x^2\ge0$，即 $x\in[-2,2]$；对数要求 $x+1>0$ 且 $\ln(x+1)\ne0$，即 $x>-1$ 且 $x\ne0$。取交集得 $(-1,0)\cup(0,2]$。`
  },
  {
    id: 'q-c1-2', chapter: 'calc-1', type: 'single', level: '基础',
    stem: QT`$\displaystyle\lim_{x\to0}\frac{\sin 3x}{\tan 5x}=$（ ）。`,
    options: [QT`$\dfrac35$`, QT`$\dfrac53$`, QT`$1$`, QT`$0$`],
    answer: 0,
    explain: QT`当 $x\to0$ 时，$\sin3x\sim3x$，$\tan5x\sim5x$，所以极限为 $\dfrac{3x}{5x}=\dfrac35$。`
  },
  {
    id: 'q-c1-3', chapter: 'calc-1', type: 'fill', level: '基础',
    stem: QT`$\displaystyle\lim_{x\to0}\frac{1-\cos 2x}{x^2}=$ ______。`,
    answer: '2', accept: ['2'],
    answerText: QT`$2$`,
    explain: QT`$1-\cos2x=2\sin^2x\sim2x^2$，所以极限为 $2$。也可以直接用 $1-\cos u\sim\dfrac{u^2}{2}$，其中 $u=2x$。`
  },
  {
    id: 'q-c1-4', chapter: 'calc-1', type: 'single', level: '核心',
    stem: QT`$\displaystyle\lim_{x\to\infty}\left(1-\frac2x\right)^{3x}=$（ ）。`,
    options: [QT`$e^{-6}$`, QT`$e^6$`, QT`$e^{-3}$`, QT`$e^3$`],
    answer: 0,
    explain: QT`这是 $1^\infty$ 型。$\lim 3x\cdot\left(-\dfrac2x\right)=-6$，所以原极限为 $e^{-6}$。`
  },
  {
    id: 'q-c1-5', chapter: 'calc-1', type: 'single', level: '基础',
    stem: QT`$x=0$ 是函数 $f(x)=\sin\dfrac1x$ 的（ ）。`,
    options: [QT`可去间断点`, QT`跳跃间断点`, QT`无穷间断点`, QT`振荡间断点`],
    answer: 3,
    explain: QT`当 $x\to0$ 时，$\dfrac1x\to\infty$，$\sin\dfrac1x$ 在 $-1$ 与 $1$ 之间反复振荡，极限不存在，属于第二类间断点中的振荡间断点。`
  },
  {
    id: 'q-c1-6', chapter: 'calc-1', type: 'single', level: '核心',
    stem: QT`设 $f(x)=\begin{cases}\dfrac{e^x-1}{x},&x\ne0,\\ a,&x=0.\end{cases}$ 若 $f(x)$ 在 $x=0$ 处连续，则 $a=$（ ）。`,
    options: [QT`$0$`, QT`$1$`, QT`$e$`, QT`不存在`],
    answer: 1,
    explain: QT`连续要求 $a=\lim_{x\to0}\dfrac{e^x-1}{x}=1$（等价无穷小 $e^x-1\sim x$）。`
  },
  {
    id: 'q-c1-7', chapter: 'calc-1', type: 'single', level: '基础',
    stem: QT`当 $x\to0$ 时，下列无穷小中与 $x$ 等价的是（ ）。`,
    options: [QT`$1-\cos x$`, QT`$\ln(1+x)$`, QT`$\tan x-\sin x$`, QT`$\sqrt{1+x}-1$`],
    answer: 1,
    explain: QT`$\ln(1+x)\sim x$。其余：$1-\cos x\sim\frac12x^2$，$\tan x-\sin x\sim\frac12x^3$，$\sqrt{1+x}-1\sim\frac12x$。`
  },
  {
    id: 'q-c1-8', chapter: 'calc-1', type: 'single', level: '强化',
    stem: QT`设 $f(x)=x^3-4x+1$，则 $f(x)$ 在区间 $(0,1)$ 内（ ）。`,
    options: [QT`至少有一个零点`, QT`没有零点`, QT`恰有两个零点`, QT`无法判断`],
    answer: 0,
    explain: QT`$f(0)=1>0$，$f(1)=-2<0$，$f$ 在 $[0,1]$ 上连续，由零点定理，至少存在一个 $\xi\in(0,1)$ 使 $f(\xi)=0$。`
  },

  /* ========== 高等数学 · 导数与微分 ========== */
  {
    id: 'q-c2-1', chapter: 'calc-2', type: 'single', level: '基础',
    stem: QT`设 $f'(x_0)$ 存在，则 $\displaystyle\lim_{h\to0}\frac{f(x_0+2h)-f(x_0)}{h}=$（ ）。`,
    options: [QT`$f'(x_0)$`, QT`$2f'(x_0)$`, QT`$\frac12f'(x_0)$`, QT`$0$`],
    answer: 1,
    explain: QT`补分母：$\dfrac{f(x_0+2h)-f(x_0)}{2h}\to f'(x_0)$，再乘以外面的 $2$，得 $2f'(x_0)$。`
  },
  {
    id: 'q-c2-2', chapter: 'calc-2', type: 'single', level: '核心',
    stem: QT`函数 $y=x^x\ (x>0)$ 的导数为（ ）。`,
    options: [
      QT`$x^x\ln x$`,
      QT`$x^x(\ln x+1)$`,
      QT`$x\cdot x^{x-1}$`,
      QT`$x^x$`
    ],
    answer: 1,
    explain: QT`取对数 $\ln y=x\ln x$，两边求导：$\dfrac{y'}{y}=\ln x+1$，故 $y'=x^x(\ln x+1)$。`
  },
  {
    id: 'q-c2-3', chapter: 'calc-2', type: 'single', level: '基础',
    stem: QT`$y=\ln(\sin x)$ 的导数为（ ）。`,
    options: [QT`$\dfrac1{\sin x}$`, QT`$\cot x$`, QT`$\tan x$`, QT`$-\cot x$`],
    answer: 1,
    explain: QT`链式法则：$y'=\dfrac1{\sin x}\cdot\cos x=\cot x$。`
  },
  {
    id: 'q-c2-4', chapter: 'calc-2', type: 'single', level: '核心',
    stem: QT`曲线 $x^2+y^2=4$ 在点 $(1,\sqrt3)$ 处的切线斜率为（ ）。`,
    options: [QT`$-\dfrac1{\sqrt3}$`, QT`$\dfrac1{\sqrt3}$`, QT`$-\sqrt3$`, QT`$\sqrt3$`],
    answer: 0,
    explain: QT`隐函数求导：$2x+2yy'=0$，得 $y'=-\dfrac{x}{y}$。代入 $(1,\sqrt3)$ 得 $-\dfrac1{\sqrt3}$。`
  },
  {
    id: 'q-c2-5', chapter: 'calc-2', type: 'fill', level: '强化',
    stem: QT`设 $\begin{cases}x=t^2,\\ y=t^3,\end{cases}$ 则 $\left.\dfrac{d^2y}{dx^2}\right|_{t=1}=$ ______。`,
    answer: '3/4', accept: ['3/4', '0.75'],
    answerText: QT`$\dfrac34$`,
    explain: QT`$\dfrac{dy}{dx}=\dfrac{3t^2}{2t}=\dfrac{3t}{2}$。再对 $t$ 求导得 $\dfrac32$，除以 $x'(t)=2t$，得 $\dfrac{3}{4t}$。代入 $t=1$ 得 $\dfrac34$。`
  },
  {
    id: 'q-c2-6', chapter: 'calc-2', type: 'single', level: '基础',
    stem: QT`$d(\sin^2x)=$（ ）。`,
    options: [QT`$2\sin x\,dx$`, QT`$\sin 2x\,dx$`, QT`$\cos^2x\,dx$`, QT`$2\cos x\,dx$`],
    answer: 1,
    explain: QT`$(\sin^2x)'=2\sin x\cos x=\sin2x$，所以微分为 $\sin2x\,dx$。`
  },
  {
    id: 'q-c2-7', chapter: 'calc-2', type: 'single', level: '强化',
    stem: QT`$y=e^{2x}$ 的 $n$ 阶导数为（ ）。`,
    options: [QT`$2^ne^{2x}$`, QT`$2e^{2x}$`, QT`$e^{2x}$`, QT`$n!e^{2x}$`],
    answer: 0,
    explain: QT`每求导一次提出一个因子 $2$，求 $n$ 次得 $2^ne^{2x}$。`
  },
  {
    id: 'q-c2-8', chapter: 'calc-2', type: 'judge', level: '易错',
    stem: QT`函数 $f(x)=|x|$ 在 $x=0$ 处连续，但不可导。`,
    options: [QT`正确`, QT`错误`],
    answer: 0,
    explain: QT`$|x|$ 在 $0$ 处连续；左导数为 $-1$，右导数为 $1$，左右导数不等，故不可导。`
  },

  /* ========== 高等数学 · 中值定理与导数应用 ========== */
  {
    id: 'q-c3-1', chapter: 'calc-3', type: 'single', level: '基础',
    stem: QT`下列函数在给定区间上不满足罗尔定理条件的是（ ）。`,
    options: [
      QT`$f(x)=x^2$ 在 $[-1,1]$ 上`,
      QT`$f(x)=|x|$ 在 $[-1,1]$ 上`,
      QT`$f(x)=\sin x$ 在 $[0,\pi]$ 上`,
      QT`$f(x)=x(1-x)$ 在 $[0,1]$ 上`
    ],
    answer: 1,
    explain: QT`$|x|$ 在 $[-1,1]$ 上连续，且 $f(-1)=f(1)=1$，但在 $x=0$ 处不可导，不满足“开区间内可导”的条件。`
  },
  {
    id: 'q-c3-2', chapter: 'calc-3', type: 'single', level: '核心',
    stem: QT`$\displaystyle\lim_{x\to0}\frac{e^x-1-x}{x^2}=$（ ）。`,
    options: [QT`$0$`, QT`$\dfrac12$`, QT`$1$`, QT`$2$`],
    answer: 1,
    explain: QT`泰勒展开 $e^x=1+x+\dfrac{x^2}{2}+o(x^2)$，分子为 $\dfrac{x^2}{2}+o(x^2)$，故极限为 $\dfrac12$。`
  },
  {
    id: 'q-c3-3', chapter: 'calc-3', type: 'single', level: '基础',
    stem: QT`$e^x$ 的麦克劳林展开式中 $x^2$ 项的系数是（ ）。`,
    options: [QT`$1$`, QT`$\dfrac12$`, QT`$\dfrac1{2!}$`, QT`$2$`],
    answer: 1,
    explain: QT`$e^x=1+x+\dfrac{x^2}{2!}+\cdots$，$x^2$ 项为 $\dfrac{x^2}{2}$，系数是 $\dfrac12$。`
  },
  {
    id: 'q-c3-4', chapter: 'calc-3', type: 'single', level: '核心',
    stem: QT`函数 $f(x)=x^3-3x$ 的单调递增区间是（ ）。`,
    options: [
      QT`$(-\infty,-1)\cup(1,+\infty)$`,
      QT`$(-1,1)$`,
      QT`$(-\infty,1)$`,
      QT`$(1,+\infty)$`
    ],
    answer: 0,
    explain: QT`$f'(x)=3x^2-3=3(x-1)(x+1)$。当 $x<-1$ 或 $x>1$ 时 $f'(x)>0$，函数递增。`
  },
  {
    id: 'q-c3-5', chapter: 'calc-3', type: 'single', level: '基础',
    stem: QT`$f(x)=x^3-3x$ 的极大值为（ ）。`,
    options: [QT`$2$`, QT`$-2$`, QT`$0$`, QT`$1$`],
    answer: 0,
    explain: QT`驻点 $x=\pm1$。$f''(x)=6x$，$f''(-1)=-6<0$，故 $x=-1$ 为极大值点，极大值 $f(-1)=-1+3=2$。`
  },
  {
    id: 'q-c3-6', chapter: 'calc-3', type: 'single', level: '基础',
    stem: QT`曲线 $y=x^3$ 的拐点是（ ）。`,
    options: [QT`$(0,0)$`, QT`$(1,1)$`, QT`$(-1,-1)$`, QT`不存在`],
    answer: 0,
    explain: QT`$y''=6x$，在 $x=0$ 两侧变号，且 $y(0)=0$，所以拐点为 $(0,0)$。`
  },
  {
    id: 'q-c3-7', chapter: 'calc-3', type: 'single', level: '强化',
    stem: QT`曲线 $y=\dfrac{x^2+1}{x-1}$ 的斜渐近线是（ ）。`,
    options: [QT`$y=x+1$`, QT`$y=x-1$`, QT`$y=x$`, QT`$y=1$`],
    answer: 0,
    explain: QT`$a=\lim_{x\to\infty}\dfrac{y}{x}=1$，$b=\lim_{x\to\infty}(y-x)=\lim\dfrac{x^2+1-x^2+x}{x-1}=1$，故斜渐近线为 $y=x+1$。`
  },
  {
    id: 'q-c3-8', chapter: 'calc-3', type: 'judge', level: '易错',
    stem: QT`因为 $\displaystyle\lim_{x\to\infty}\frac{x+\sin x}{x}$ 是 $\frac{\infty}{\infty}$ 型，所以可以用洛必达法则，且极限为 $1$。`,
    options: [QT`正确`, QT`错误`],
    answer: 1,
    explain: QT`原极限确实为 $1$（分子分母同除以 $x$），但不能用洛必达法则：求导后 $\dfrac{1+\cos x}{1}$ 的极限不存在。洛必达失效不等于原极限不存在。`
  },

  /* ========== 高等数学 · 不定积分 ========== */
  {
    id: 'q-c4-1', chapter: 'calc-4', type: 'single', level: '基础',
    stem: QT`$\displaystyle\int e^{-2x}\,dx=$（ ）。`,
    options: [
      QT`$-\dfrac12e^{-2x}+C$`,
      QT`$-2e^{-2x}+C$`,
      QT`$\dfrac12e^{-2x}+C$`,
      QT`$e^{-2x}+C$`
    ],
    answer: 0,
    explain: QT`令 $u=-2x$，$du=-2dx$，则 $\int e^{-2x}dx=-\dfrac12\int e^u du=-\dfrac12e^{-2x}+C$。`
  },
  {
    id: 'q-c4-2', chapter: 'calc-4', type: 'single', level: '基础',
    stem: QT`$\displaystyle\int\cos 3x\,dx=$（ ）。`,
    options: [
      QT`$\dfrac13\sin3x+C$`,
      QT`$3\sin3x+C$`,
      QT`$-\dfrac13\sin3x+C$`,
      QT`$\dfrac13\cos3x+C$`
    ],
    answer: 0,
    explain: QT`$\int\cos3x\,dx=\dfrac13\sin3x+C$。求导验算：$\left(\dfrac13\sin3x\right)'=\cos3x$。`
  },
  {
    id: 'q-c4-3', chapter: 'calc-4', type: 'single', level: '核心',
    stem: QT`$\displaystyle\int xe^{x^2}\,dx=$（ ）。`,
    options: [
      QT`$\dfrac12e^{x^2}+C$`,
      QT`$e^{x^2}+C$`,
      QT`$2e^{x^2}+C$`,
      QT`$\dfrac12x^2e^{x^2}+C$`
    ],
    answer: 0,
    explain: QT`凑微分：$x\,dx=\dfrac12d(x^2)$，所以原式 $=\dfrac12\int e^{x^2}d(x^2)=\dfrac12e^{x^2}+C$。`
  },
  {
    id: 'q-c4-4', chapter: 'calc-4', type: 'single', level: '核心',
    stem: QT`$\displaystyle\int\ln x\,dx=$（ ）。`,
    options: [
      QT`$x\ln x-x+C$`,
      QT`$x\ln x+x+C$`,
      QT`$\dfrac1x+C$`,
      QT`$x\ln x+C$`
    ],
    answer: 0,
    explain: QT`分部积分：令 $u=\ln x$，$dv=dx$，得 $x\ln x-\int x\cdot\dfrac1x dx=x\ln x-x+C$。`
  },
  {
    id: 'q-c4-5', chapter: 'calc-4', type: 'single', level: '强化',
    stem: QT`$\displaystyle\int\frac{dx}{x^2+4x+5}=$（ ）。`,
    options: [
      QT`$\arctan(x+2)+C$`,
      QT`$\arctan x+C$`,
      QT`$\ln(x^2+4x+5)+C$`,
      QT`$\dfrac1{x+2}+C$`
    ],
    answer: 0,
    explain: QT`配方得 $(x+2)^2+1$，令 $u=x+2$，则积分为 $\arctan u+C=\arctan(x+2)+C$。`
  },
  {
    id: 'q-c4-6', chapter: 'calc-4', type: 'single', level: '基础',
    stem: QT`计算 $\displaystyle\int\sqrt{4-x^2}\,dx$ 时，最合适的代换是（ ）。`,
    options: [QT`$x=2\sin t$`, QT`$x=2\tan t$`, QT`$x=2\sec t$`, QT`$x=4\sin t$`],
    answer: 0,
    explain: QT`含 $\sqrt{a^2-x^2}$ 时令 $x=a\sin t$，这里 $a=2$，故 $x=2\sin t$，可消去根号。`
  },
  {
    id: 'q-c4-7', chapter: 'calc-4', type: 'single', level: '基础',
    stem: QT`$\displaystyle\int\tan x\,dx=$（ ）。`,
    options: [
      QT`$-\ln|\cos x|+C$`,
      QT`$\ln|\cos x|+C$`,
      QT`$\ln|\sin x|+C$`,
      QT`$\sec^2x+C$`
    ],
    answer: 0,
    explain: QT`$\int\tan x\,dx=\int\dfrac{\sin x}{\cos x}dx=-\int\dfrac{d(\cos x)}{\cos x}=-\ln|\cos x|+C$。`
  },
  {
    id: 'q-c4-8', chapter: 'calc-4', type: 'judge', level: '易错',
    stem: QT`若 $F'(x)=f(x)$，则 $\displaystyle\int f(x)\,dx=F(x)+C$。`,
    options: [QT`正确`, QT`错误`],
    answer: 0,
    explain: QT`这正是不定积分的定义：$f$ 的全体原函数表示为 $F(x)+C$，其中 $C$ 为任意常数。`
  },

  /* ========== 高等数学 · 定积分 ========== */
  {
    id: 'q-c5-1', chapter: 'calc-5', type: 'fill', level: '基础',
    stem: QT`$\displaystyle\int_0^1x^2\,dx=$ ______。`,
    answer: '1/3', accept: ['1/3', '0.3333'],
    answerText: QT`$\dfrac13$`,
    explain: QT`$\int_0^1x^2dx=\left[\dfrac{x^3}{3}\right]_0^1=\dfrac13$。`
  },
  {
    id: 'q-c5-2', chapter: 'calc-5', type: 'single', level: '核心',
    stem: QT`$\displaystyle\frac{d}{dx}\int_0^x\sin t^2\,dt=$（ ）。`,
    options: [QT`$\sin x^2$`, QT`$2x\sin x^2$`, QT`$\cos x^2$`, QT`$\sin x$`],
    answer: 0,
    explain: QT`变上限积分求导：上限 $x$ 代入被积函数，再乘以上限导数 $1$，得 $\sin x^2$。`
  },
  {
    id: 'q-c5-3', chapter: 'calc-5', type: 'single', level: '基础',
    stem: QT`$\displaystyle\int_{-1}^1x^3\cos x\,dx=$（ ）。`,
    options: [QT`$0$`, QT`$1$`, QT`$2$`, QT`$\dfrac12$`],
    answer: 0,
    explain: QT`被积函数 $x^3\cos x$ 是奇函数（奇×偶=奇），在对称区间 $[-1,1]$ 上积分为 $0$。`
  },
  {
    id: 'q-c5-4', chapter: 'calc-5', type: 'single', level: '核心',
    stem: QT`$\displaystyle\int_0^{\pi/2}\sin^2x\,dx=$（ ）。`,
    options: [QT`$\dfrac{\pi}{4}$`, QT`$\dfrac{\pi}{2}$`, QT`$1$`, QT`$\dfrac12$`],
    answer: 0,
    explain: QT`$\sin^2x=\dfrac{1-\cos2x}{2}$，积分得 $\dfrac12\cdot\dfrac{\pi}{2}-\dfrac14[\sin2x]_0^{\pi/2}=\dfrac{\pi}{4}$。`
  },
  {
    id: 'q-c5-5', chapter: 'calc-5', type: 'single', level: '强化',
    stem: QT`反常积分 $\displaystyle\int_0^1\frac{dx}{\sqrt{x}}$ 的值为（ ）。`,
    options: [QT`$2$`, QT`$1$`, QT`$\dfrac12$`, QT`发散`],
    answer: 0,
    explain: QT`$x=0$ 是瑕点。$\int_0^1x^{-1/2}dx=[2\sqrt{x}]_0^1=2$，收敛。`
  },
  {
    id: 'q-c5-6', chapter: 'calc-5', type: 'single', level: '基础',
    stem: QT`$\displaystyle\int_1^{+\infty}\frac{dx}{x^2}=$（ ）。`,
    options: [QT`$1$`, QT`$2$`, QT`$\dfrac12$`, QT`发散`],
    answer: 0,
    explain: QT`$\int_1^{+\infty}x^{-2}dx=\left[-\dfrac1x\right]_1^{+\infty}=1$。`
  },
  {
    id: 'q-c5-7', chapter: 'calc-5', type: 'single', level: '基础',
    stem: QT`$\displaystyle\int_0^\pi\sin x\,dx=$（ ）。`,
    options: [QT`$2$`, QT`$0$`, QT`$1$`, QT`$-2$`],
    answer: 0,
    explain: QT`$[-\cos x]_0^\pi=-\cos\pi+\cos0=1+1=2$。`
  },
  {
    id: 'q-c5-8', chapter: 'calc-5', type: 'judge', level: '易错',
    stem: QT`由牛顿-莱布尼茨公式，$\displaystyle\int_{-1}^1\frac{dx}{x^2}=\left[-\frac1x\right]_{-1}^1=-2$。`,
    options: [QT`正确`, QT`错误`],
    answer: 1,
    explain: QT`$x=0$ 是瑕点，且被积函数恒正，积分不可能为负。这是反常积分，且 $\int_0^1\frac{dx}{x^2}$ 发散，故原积分发散，不能直接套牛莱公式。`
  },

  /* ========== 高等数学 · 定积分应用 ========== */
  {
    id: 'q-c6-1', chapter: 'calc-6', type: 'single', level: '基础',
    stem: QT`曲线 $y=x^2$ 与 $y=x$ 所围图形的面积为（ ）。`,
    options: [QT`$\dfrac16$`, QT`$\dfrac13$`, QT`$\dfrac12$`, QT`$1$`],
    answer: 0,
    explain: QT`交点 $x=0,1$，在 $(0,1)$ 上 $x>x^2$，面积 $=\int_0^1(x-x^2)dx=\dfrac12-\dfrac13=\dfrac16$。`
  },
  {
    id: 'q-c6-2', chapter: 'calc-6', type: 'single', level: '基础',
    stem: QT`曲线 $y=\dfrac1x$，直线 $x=1$，$x=e$ 及 $x$ 轴围成的面积为（ ）。`,
    options: [QT`$1$`, QT`$e$`, QT`$e-1$`, QT`$\ln e$`],
    answer: 0,
    explain: QT`面积 $=\int_1^e\dfrac1x dx=[\ln x]_1^e=1$。`
  },
  {
    id: 'q-c6-3', chapter: 'calc-6', type: 'single', level: '核心',
    stem: QT`$y=\sqrt{x}\ (0\le x\le1)$ 绕 $x$ 轴旋转所得旋转体的体积为（ ）。`,
    options: [QT`$\dfrac{\pi}{2}$`, QT`$\pi$`, QT`$\dfrac{\pi}{4}$`, QT`$\dfrac{2\pi}{3}$`],
    answer: 0,
    explain: QT`圆盘法：$V=\pi\int_0^1(\sqrt{x})^2dx=\pi\int_0^1x\,dx=\dfrac{\pi}{2}$。`
  },
  {
    id: 'q-c6-4', chapter: 'calc-6', type: 'single', level: '强化',
    stem: QT`$y=x^2\ (0\le x\le1)$ 绕 $y$ 轴旋转所得旋转体的体积为（ ）。`,
    options: [QT`$\dfrac{\pi}{2}$`, QT`$\dfrac{\pi}{4}$`, QT`$\dfrac{\pi}{5}$`, QT`$2\pi$`],
    answer: 0,
    explain: QT`壳法：$V=2\pi\int_0^1x\cdot x^2dx=2\pi\cdot\dfrac14=\dfrac{\pi}{2}$。`
  },
  {
    id: 'q-c6-5', chapter: 'calc-6', type: 'single', level: '强化',
    stem: QT`函数 $f(x)=x^2$ 在区间 $[0,3]$ 上的平均值为（ ）。`,
    options: [QT`$3$`, QT`$9$`, QT`$\dfrac13$`, QT`$1$`],
    answer: 0,
    explain: QT`$\bar f=\dfrac1{3-0}\int_0^3x^2dx=\dfrac13\cdot9=3$。`
  },
  {
    id: 'q-c6-6', chapter: 'calc-6', type: 'single', level: '基础',
    stem: QT`极坐标曲线 $\rho=a\ (a>0,\ 0\le\theta\le2\pi)$ 所围面积为（ ）。`,
    options: [QT`$\pi a^2$`, QT`$\dfrac12\pi a^2$`, QT`$2\pi a$`, QT`$\dfrac12a^2$`],
    answer: 0,
    explain: QT`这是半径为 $a$ 的圆。$A=\dfrac12\int_0^{2\pi}a^2d\theta=\dfrac12a^2\cdot2\pi=\pi a^2$。`
  },
  {
    id: 'q-c6-7', chapter: 'calc-6', type: 'fill', level: '基础',
    stem: QT`$\displaystyle\int_0^1(x^2+1)\,dx=$ ______。`,
    answer: '4/3', accept: ['4/3', '1.3333'],
    answerText: QT`$\dfrac43$`,
    explain: QT`$\int_0^1(x^2+1)dx=\left[\dfrac{x^3}{3}+x\right]_0^1=\dfrac13+1=\dfrac43$。`
  },
  {
    id: 'q-c6-8', chapter: 'calc-6', type: 'judge', level: '易错',
    stem: QT`求两曲线围成的面积时，直接计算 $\int_a^b[f(x)-g(x)]dx$ 一定得到正确面积。`,
    options: [QT`正确`, QT`错误`],
    answer: 1,
    explain: QT`必须先判断在区间内谁在上、谁在下。若 $f-g$ 变号，直接积分会抵消面积；应分段取绝对值，或写成 $\int|f-g|dx$。`
  },

  /* ========== 高等数学 · 微分方程 ========== */
  {
    id: 'q-c7-1', chapter: 'calc-7', type: 'single', level: '基础',
    stem: QT`微分方程 $y'''+x(y')^2=0$ 的阶是（ ）。`,
    options: [QT`$1$`, QT`$2$`, QT`$3$`, QT`$4$`],
    answer: 2,
    explain: QT`方程的阶是最高阶导数的阶数，这里最高为 $y'''$，故为三阶。`
  },
  {
    id: 'q-c7-2', chapter: 'calc-7', type: 'single', level: '基础',
    stem: QT`微分方程 $y'=2x$ 的通解是（ ）。`,
    options: [QT`$y=x^2+C$`, QT`$y=2x^2+C$`, QT`$y=x^2$`, QT`$y=2x+C$`],
    answer: 0,
    explain: QT`两边积分：$y=\int2x\,dx=x^2+C$。`
  },
  {
    id: 'q-c7-3', chapter: 'calc-7', type: 'fill', level: '核心',
    stem: QT`微分方程 $y'=y$ 满足 $y(0)=1$ 的特解为 ______。`,
    answer: 'e^x', accept: ['e^x', 'e^{x}', 'exp(x)', 'e**x'],
    answerText: QT`$y=e^x$`,
    explain: QT`分离变量 $\dfrac{dy}{y}=dx$，积分得 $\ln|y|=x+C_1$，即 $y=Ce^x$。代入 $y(0)=1$ 得 $C=1$，所以 $y=e^x$。`
  },
  {
    id: 'q-c7-4', chapter: 'calc-7', type: 'single', level: '核心',
    stem: QT`$y''-4y=0$ 的通解是（ ）。`,
    options: [
      QT`$y=C_1e^{2x}+C_2e^{-2x}$`,
      QT`$y=C_1e^{4x}+C_2e^{-4x}$`,
      QT`$y=C_1\cos2x+C_2\sin2x$`,
      QT`$y=(C_1+C_2x)e^{2x}$`
    ],
    answer: 0,
    explain: QT`特征方程 $r^2-4=0$，根为 $r=\pm2$，两个不同实根，故通解为 $C_1e^{2x}+C_2e^{-2x}$。`
  },
  {
    id: 'q-c7-5', chapter: 'calc-7', type: 'single', level: '基础',
    stem: QT`$y''+y=0$ 的通解是（ ）。`,
    options: [
      QT`$y=C_1\cos x+C_2\sin x$`,
      QT`$y=C_1e^x+C_2e^{-x}$`,
      QT`$y=C_1+C_2x$`,
      QT`$y=e^x(C_1\cos x+C_2\sin x)$`
    ],
    answer: 0,
    explain: QT`特征方程 $r^2+1=0$，根为 $r=\pm i$，即 $\alpha=0,\beta=1$，通解为 $C_1\cos x+C_2\sin x$。`
  },
  {
    id: 'q-c7-6', chapter: 'calc-7', type: 'single', level: '强化',
    stem: QT`若特征方程有重根 $r=1$，则对应二阶齐次方程的通解为（ ）。`,
    options: [
      QT`$(C_1+C_2x)e^x$`,
      QT`$C_1e^x+C_2e^x$`,
      QT`$C_1e^x+C_2xe^{-x}$`,
      QT`$e^x(C_1\cos x+C_2\sin x)$`
    ],
    answer: 0,
    explain: QT`重根 $r=1$ 时，通解为 $(C_1+C_2x)e^{rx}=(C_1+C_2x)e^x$。`
  },
  {
    id: 'q-c7-7', chapter: 'calc-7', type: 'single', level: '强化',
    stem: QT`$y''-y=e^x$ 的一个特解应设为（ ）。`,
    options: [QT`$y^*=ae^x$`, QT`$y^*=axe^x$`, QT`$y^*=ae^{-x}$`, QT`$y^*=ax^2e^x$`],
    answer: 1,
    explain: QT`右端 $e^x$ 中 $\lambda=1$，恰好是特征方程 $r^2-1=0$ 的单根，所以特解要乘 $x$，设为 $axe^x$。`
  },
  {
    id: 'q-c7-8', chapter: 'calc-7', type: 'judge', level: '基础',
    stem: QT`方程 $y'=2xy$ 是可分离变量微分方程。`,
    options: [QT`正确`, QT`错误`],
    answer: 0,
    explain: QT`可写成 $\dfrac{dy}{y}=2x\,dx$，变量已分离，属于可分离变量方程。`
  },

  /* ========== 线性代数 · 行列式 ========== */
  {
    id: 'q-l1-1', chapter: 'lin-1', type: 'single', level: '基础',
    stem: QT`$\begin{vmatrix}1&2\\3&4\end{vmatrix}=$（ ）。`,
    options: [QT`$-2$`, QT`$2$`, QT`$10$`, QT`$-10$`],
    answer: 0,
    explain: QT`二阶行列式 $ad-bc=1\cdot4-2\cdot3=4-6=-2$。`
  },
  {
    id: 'q-l1-2', chapter: 'lin-1', type: 'single', level: '核心',
    stem: QT`设 $A$ 为三阶矩阵，$|A|=3$，则 $|2A|=$（ ）。`,
    options: [QT`$6$`, QT`$12$`, QT`$24$`, QT`$3$`],
    answer: 2,
    explain: QT`$|kA|=k^n|A|$，这里 $n=3$，所以 $|2A|=2^3\cdot3=24$。`
  },
  {
    id: 'q-l1-3', chapter: 'lin-1', type: 'single', level: '基础',
    stem: QT`交换行列式的两行，行列式的值（ ）。`,
    options: [QT`不变`, QT`变号`, QT`变为原来的 $2$ 倍`, QT`变为 $0$`],
    answer: 1,
    explain: QT`行列式性质：交换两行（列），行列式变号。`
  },
  {
    id: 'q-l1-4', chapter: 'lin-1', type: 'single', level: '基础',
    stem: QT`$\begin{vmatrix}2&1&3\\0&3&4\\0&0&5\end{vmatrix}=$（ ）。`,
    options: [QT`$30$`, QT`$10$`, QT`$0$`, QT`$15$`],
    answer: 0,
    explain: QT`上三角行列式等于主对角线元素之积：$2\cdot3\cdot5=30$。`
  },
  {
    id: 'q-l1-5', chapter: 'lin-1', type: 'single', level: '核心',
    stem: QT`用克拉默法则解 $n$ 元线性方程组，方程组有唯一解的充要条件是（ ）。`,
    options: [QT`系数行列式 $D\ne0$`, QT`系数行列式 $D=0$`, QT`常数项全不为 $0$`, QT`系数矩阵对称`],
    answer: 0,
    explain: QT`克拉默法则：当系数行列式 $D\ne0$ 时，方程组有唯一解 $x_j=D_j/D$。`
  },
  {
    id: 'q-l1-6', chapter: 'lin-1', type: 'single', level: '核心',
    stem: QT`$n$ 个方程、$n$ 个未知数的齐次线性方程组有非零解的充要条件是（ ）。`,
    options: [QT`$D=0$`, QT`$D\ne0$`, QT`$n>3$`, QT`常数项为 $0$`],
    answer: 0,
    explain: QT`齐次方程组总有零解；有非零解 ⇔ 系数行列式 $D=0$（方程个数等于未知数个数时）。`
  },
  {
    id: 'q-l1-7', chapter: 'lin-1', type: 'fill', level: '强化',
    stem: QT`$\begin{vmatrix}1&1&1\\1&2&3\\1&4&9\end{vmatrix}=$ ______。`,
    answer: '2', accept: ['2'],
    answerText: QT`$2$`,
    explain: QT`这是 $x_1=1,x_2=2,x_3=3$ 的范德蒙德行列式，值为 $(2-1)(3-1)(3-2)=2$。`
  },
  {
    id: 'q-l1-8', chapter: 'lin-1', type: 'judge', level: '易错',
    stem: QT`对同阶方阵 $A,B$，总有 $|A+B|=|A|+|B|$。`,
    options: [QT`正确`, QT`错误`],
    answer: 1,
    explain: QT`行列式对矩阵加法不具有线性性。例如 $A=E,B=-E$ 时，$|A+B|=0$，而 $|A|+|B|=2$。`
  },

  /* ========== 线性代数 · 矩阵及其运算 ========== */
  {
    id: 'q-l2-1', chapter: 'lin-2', type: 'single', level: '易错',
    stem: QT`若 $AB=0$，则（ ）。`,
    options: [
      QT`$A=0$ 或 $B=0$`,
      QT`$A,B$ 中至少有一个不可逆`,
      QT`$A=B=0$`,
      QT`$A,B$ 都可逆`
    ],
    answer: 1,
    explain: QT`若 $A,B$ 都可逆，则 $AB=0$ 两边左乘 $A^{-1}$ 得 $B=0$，再右乘 $B^{-1}$ 得 $A=0$，矛盾。所以至少一个不可逆。但 $AB=0$ 不能推出 $A=0$ 或 $B=0$。`
  },
  {
    id: 'q-l2-2', chapter: 'lin-2', type: 'single', level: '基础',
    stem: QT`$(AB)^T=$（ ）。`,
    options: [QT`$A^TB^T$`, QT`$B^TA^T$`, QT`$AB$`, QT`$BA$`],
    answer: 1,
    explain: QT`转置的“穿脱原则”：$(AB)^T=B^TA^T$，顺序必须反过来。`
  },
  {
    id: 'q-l2-3', chapter: 'lin-2', type: 'single', level: '基础',
    stem: QT`$\begin{pmatrix}2&0\\0&3\end{pmatrix}^{-1}=$（ ）。`,
    options: [
      QT`$\begin{pmatrix}\frac12&0\\0&\frac13\end{pmatrix}$`,
      QT`$\begin{pmatrix}3&0\\0&2\end{pmatrix}$`,
      QT`$\begin{pmatrix}\frac13&0\\0&\frac12\end{pmatrix}$`,
      QT`$\begin{pmatrix}2&0\\0&3\end{pmatrix}$`
    ],
    answer: 0,
    explain: QT`对角矩阵求逆，对角线元素分别取倒数，得 $\operatorname{diag}(\frac12,\frac13)$。`
  },
  {
    id: 'q-l2-4', chapter: 'lin-2', type: 'single', level: '强化',
    stem: QT`设 $A$ 为三阶矩阵，$|A|=2$，则 $|A^*|=$（ ）。`,
    options: [QT`$2$`, QT`$4$`, QT`$8$`, QT`$1$`],
    answer: 1,
    explain: QT`$|A^*|=|A|^{n-1}=2^{3-1}=4$。`
  },
  {
    id: 'q-l2-5', chapter: 'lin-2', type: 'single', level: '核心',
    stem: QT`设 $A$ 可逆，则 $(A^T)^{-1}=$（ ）。`,
    options: [QT`$(A^{-1})^T$`, QT`$A^{-1}$`, QT`$A^T$`, QT`$A$`],
    answer: 0,
    explain: QT`由 $A^T(A^{-1})^T=(A^{-1}A)^T=E$，可知 $(A^T)^{-1}=(A^{-1})^T$。`
  },
  {
    id: 'q-l2-6', chapter: 'lin-2', type: 'single', level: '核心',
    stem: QT`设 $A$ 可逆，则矩阵方程 $AX=B$ 的解为（ ）。`,
    options: [QT`$X=A^{-1}B$`, QT`$X=BA^{-1}$`, QT`$X=B^{-1}A$`, QT`$X=AB^{-1}$`],
    answer: 0,
    explain: QT`两边左乘 $A^{-1}$：$A^{-1}AX=A^{-1}B$，得 $X=A^{-1}B$。`
  },
  {
    id: 'q-l2-7', chapter: 'lin-2', type: 'fill', level: '基础',
    stem: QT`设 $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$，则 $A^{-1}$ 的左上角元素为 ______。`,
    answer: '-2', accept: ['-2', '−2'],
    answerText: QT`$-2$`,
    explain: QT`$|A|=-2$，$A^{-1}=\dfrac1{-2}\begin{pmatrix}4&-2\\-3&1\end{pmatrix}=\begin{pmatrix}-2&1\\ \frac32&-\frac12\end{pmatrix}$，左上角为 $-2$。`
  },
  {
    id: 'q-l2-8', chapter: 'lin-2', type: 'judge', level: '易错',
    stem: QT`对同阶方阵 $A,B$，总有 $(A+B)^2=A^2+2AB+B^2$。`,
    options: [QT`正确`, QT`错误`],
    answer: 1,
    explain: QT`$(A+B)^2=A^2+AB+BA+B^2$。只有当 $AB=BA$ 时才能合并为 $2AB$，矩阵乘法一般不交换。`
  },

  /* ========== 线性代数 · 初等变换与线性方程组 ========== */
  {
    id: 'q-l3-1', chapter: 'lin-3', type: 'single', level: '基础',
    stem: QT`矩阵 $A=\begin{pmatrix}1&2&3\\2&4&6\\0&1&1\end{pmatrix}$ 的秩为（ ）。`,
    options: [QT`$1$`, QT`$2$`, QT`$3$`, QT`$0$`],
    answer: 1,
    explain: QT`第二行是第一行的 $2$ 倍，第一、三行不成比例，故秩为 $2$。`
  },
  {
    id: 'q-l3-2', chapter: 'lin-3', type: 'single', level: '基础',
    stem: QT`对矩阵做初等行变换，下列量不变的是（ ）。`,
    options: [QT`矩阵的秩`, QT`矩阵的行列式`, QT`矩阵的元素`, QT`方程组的解`],
    answer: 0,
    explain: QT`初等变换不改变矩阵的秩。但交换行会改变行列式符号，倍乘会改变行列式，元素更会改变。`
  },
  {
    id: 'q-l3-3', chapter: 'lin-3', type: 'single', level: '核心',
    stem: QT`设 $A$ 为 $3\times3$ 矩阵，$r(A)=r(A|b)=2$，则方程组 $Ax=b$（ ）。`,
    options: [QT`无解`, QT`有唯一解`, QT`有无穷多解`, QT`无法判断`],
    answer: 2,
    explain: QT`$r(A)=r(A|b)=2<3$，未知数个数 $n=3$，故有无穷多解，自由未知量个数为 $3-2=1$。`
  },
  {
    id: 'q-l3-4', chapter: 'lin-3', type: 'single', level: '核心',
    stem: QT`设 $A$ 为 $4\times4$ 矩阵，$r(A)=3$，则齐次方程组 $Ax=0$（ ）。`,
    options: [QT`只有零解`, QT`有无穷多解`, QT`无解`, QT`有唯一非零解`],
    answer: 1,
    explain: QT`齐次方程组 $r(A)=3<4=n$，故有非零解，且基础解系含 $4-3=1$ 个向量，通解有无穷多个。`
  },
  {
    id: 'q-l3-5', chapter: 'lin-3', type: 'single', level: '强化',
    stem: QT`设 $A$ 为 $m\times n$ 矩阵，$B$ 为 $n\times s$ 矩阵，则（ ）。`,
    options: [
      QT`$r(AB)\le\min\{r(A),r(B)\}$`,
      QT`$r(AB)=r(A)r(B)$`,
      QT`$r(AB)\ge r(A)$`,
      QT`$r(AB)=r(A)+r(B)$`
    ],
    answer: 0,
    explain: QT`乘积的秩不超过任一因子的秩：$r(AB)\le\min\{r(A),r(B)\}$。`
  },
  {
    id: 'q-l3-6', chapter: 'lin-3', type: 'single', level: '基础',
    stem: QT`$n$ 元非齐次线性方程组 $Ax=b$ 有唯一解的充要条件是（ ）。`,
    options: [
      QT`$r(A)=r(A|b)=n$`,
      QT`$r(A)=r(A|b)<n$`,
      QT`$r(A)<r(A|b)$`,
      QT`$r(A)=n$`
    ],
    answer: 0,
    explain: QT`有解要求 $r(A)=r(A|b)$；唯一解要求秩等于未知数个数 $n$。`
  },
  {
    id: 'q-l3-7', chapter: 'lin-3', type: 'fill', level: '基础',
    stem: QT`设 $A$ 为 $5\times5$ 矩阵，$r(A)=3$，则 $Ax=0$ 的基础解系含 ______ 个向量。`,
    answer: '2', accept: ['2'],
    answerText: QT`$2$`,
    explain: QT`基础解系所含向量个数为 $n-r(A)=5-3=2$。`
  },
  {
    id: 'q-l3-8', chapter: 'lin-3', type: 'judge', level: '易错',
    stem: QT`把增广矩阵化为行阶梯形后，若出现形如 $(0\ 0\ \cdots\ 0\mid d)$ 且 $d\ne0$ 的行，则方程组无解。`,
    options: [QT`正确`, QT`错误`],
    answer: 0,
    explain: QT`该行对应方程 $0=d\ (d\ne0)$，矛盾，故方程组无解。这正是 $r(A)<r(A|b)$ 的表现。`
  },

  /* ========== 线性代数 · 向量组的线性相关性 ========== */
  {
    id: 'q-l4-1', chapter: 'lin-4', type: 'single', level: '基础',
    stem: QT`在 $\mathbb R^n$ 中，任意 $n+1$ 个向量（ ）。`,
    options: [QT`必线性相关`, QT`必线性无关`, QT`可能线性无关`, QT`秩为 $n+1$`],
    answer: 0,
    explain: QT`$n+1$ 个 $n$ 维向量拼成的矩阵是 $n\times(n+1)$，秩不超过 $n<n+1$，故必线性相关。`
  },
  {
    id: 'q-l4-2', chapter: 'lin-4', type: 'single', level: '基础',
    stem: QT`两个非零向量 $\alpha,\beta$ 线性相关，当且仅当（ ）。`,
    options: [QT`它们对应分量成比例`, QT`它们正交`, QT`它们长度相等`, QT`它们夹角为 $90^\circ$`],
    answer: 0,
    explain: QT`两个非零向量线性相关 ⇔ 存在 $k\ne0$ 使 $\beta=k\alpha$，即对应分量成比例。`
  },
  {
    id: 'q-l4-3', chapter: 'lin-4', type: 'single', level: '核心',
    stem: QT`向量组 $\alpha_1,\dots,\alpha_s$ 的秩等于（ ）。`,
    options: [
      QT`其极大线性无关组所含向量的个数`,
      QT`向量组中向量的个数`,
      QT`矩阵的行数`,
      QT`矩阵的列数`
    ],
    answer: 0,
    explain: QT`向量组的秩定义为极大线性无关组所含向量的个数，也等于由这些向量拼成的矩阵的秩。`
  },
  {
    id: 'q-l4-4', chapter: 'lin-4', type: 'single', level: '核心',
    stem: QT`设向量组 $\alpha_1,\dots,\alpha_s$ 及向量 $\beta$，若 $r(\alpha_1,\dots,\alpha_s)=r(\alpha_1,\dots,\alpha_s,\beta)$，则（ ）。`,
    options: [
      QT`$\beta$ 可由 $\alpha_1,\dots,\alpha_s$ 线性表示`,
      QT`$\beta$ 不能由 $\alpha_1,\dots,\alpha_s$ 线性表示`,
      QT`$\beta=0$`,
      QT`$\alpha_1,\dots,\alpha_s$ 线性无关`
    ],
    answer: 0,
    explain: QT`$\beta$ 可线性表示 ⇔ 加入 $\beta$ 后秩不变。`
  },
  {
    id: 'q-l4-5', chapter: 'lin-4', type: 'single', level: '核心',
    stem: QT`非齐次方程组 $Ax=b$ 的通解结构为（ ）。`,
    options: [
      QT`一个特解 + 对应齐次方程组的通解`,
      QT`对应齐次方程组的通解`,
      QT`两个特解的线性组合`,
      QT`任意两个特解之差`
    ],
    answer: 0,
    explain: QT`非齐次通解 = 一个特解 $\eta^*$ + 齐次通解 $\xi$。`
  },
  {
    id: 'q-l4-6', chapter: 'lin-4', type: 'single', level: '易错',
    stem: QT`设 $\eta_1,\eta_2$ 都是 $Ax=b$ 的解，则 $\eta_1-\eta_2$ 是（ ）。`,
    options: [QT`$Ax=0$ 的解`, QT`$Ax=b$ 的解`, QT`$Ax=2b$ 的解`, QT`零向量`],
    answer: 0,
    explain: QT`$A(\eta_1-\eta_2)=A\eta_1-A\eta_2=b-b=0$，所以差是对应齐次方程组的解。`
  },
  {
    id: 'q-l4-7', chapter: 'lin-4', type: 'fill', level: '基础',
    stem: QT`设 $A$ 为 $4\times6$ 矩阵，$r(A)=2$，则 $Ax=0$ 的解空间维数为 ______。`,
    answer: '4', accept: ['4'],
    answerText: QT`$4$`,
    explain: QT`未知数个数 $n=6$，解空间维数 $=n-r(A)=6-2=4$。`
  },
  {
    id: 'q-l4-8', chapter: 'lin-4', type: 'judge', level: '基础',
    stem: QT`在 $\mathbb R^2$ 中，任意三个向量必线性相关。`,
    options: [QT`正确`, QT`错误`],
    answer: 0,
    explain: QT`$\mathbb R^2$ 中任意 $2+1=3$ 个向量必线性相关；更一般地，$\mathbb R^n$ 中任意 $n+1$ 个向量必相关。`
  },

  /* ========== 线性代数 · 相似矩阵及二次型 ========== */
  {
    id: 'q-l5-1', chapter: 'lin-5', type: 'single', level: '基础',
    stem: QT`矩阵 $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ 的特征值为（ ）。`,
    options: [QT`$3,1$`, QT`$2,1$`, QT`$4,0$`, QT`$-3,-1$`],
    answer: 0,
    explain: QT`$|A-\lambda E|=(2-\lambda)^2-1=0$，得 $\lambda=3$ 或 $\lambda=1$。`
  },
  {
    id: 'q-l5-2', chapter: 'lin-5', type: 'single', level: '核心',
    stem: QT`设三阶矩阵 $A$ 的特征值为 $1,2,3$，则 $|A|=$（ ）。`,
    options: [QT`$6$`, QT`$5$`, QT`$3$`, QT`$1$`],
    answer: 0,
    explain: QT`特征值之积等于行列式：$|A|=1\cdot2\cdot3=6$。`
  },
  {
    id: 'q-l5-3', chapter: 'lin-5', type: 'single', level: '核心',
    stem: QT`$n$ 阶矩阵 $A$ 可对角化的充要条件是（ ）。`,
    options: [
      QT`$A$ 有 $n$ 个线性无关的特征向量`,
      QT`$A$ 有 $n$ 个特征值`,
      QT`$A$ 可逆`,
      QT`$A$ 是实对称矩阵`
    ],
    answer: 0,
    explain: QT`$A$ 可对角化 ⇔ 存在可逆矩阵 $P$ 使 $P^{-1}AP$ 为对角矩阵 ⇔ $A$ 有 $n$ 个线性无关的特征向量。`
  },
  {
    id: 'q-l5-4', chapter: 'lin-5', type: 'single', level: '基础',
    stem: QT`关于实对称矩阵，下列说法正确的是（ ）。`,
    options: [
      QT`一定可以正交相似对角化`,
      QT`一定不可对角化`,
      QT`特征值一定为实数但不一定可对角化`,
      QT`不同特征值对应的特征向量一定不正交`
    ],
    answer: 0,
    explain: QT`实对称矩阵的特征值全为实数，且属于不同特征值的特征向量互相正交，因此一定可以正交相似对角化。`
  },
  {
    id: 'q-l5-5', chapter: 'lin-5', type: 'single', level: '基础',
    stem: QT`二次型 $f(x_1,x_2)=2x_1^2+3x_2^2$ 的矩阵为（ ）。`,
    options: [
      QT`$\begin{pmatrix}2&0\\0&3\end{pmatrix}$`,
      QT`$\begin{pmatrix}1&0\\0&\frac32\end{pmatrix}$`,
      QT`$\begin{pmatrix}2&3\\3&0\end{pmatrix}$`,
      QT`$\begin{pmatrix}0&2\\3&0\end{pmatrix}$`
    ],
    answer: 0,
    explain: QT`平方项系数放在对角线，无交叉项，故矩阵为 $\operatorname{diag}(2,3)$。`
  },
  {
    id: 'q-l5-6', chapter: 'lin-5', type: 'single', level: '强化',
    stem: QT`二次型 $f=x_1^2+2x_2^2+x_3^2$ 是（ ）。`,
    options: [QT`正定的`, QT`负定的`, QT`半正定的`, QT`不定的`],
    answer: 0,
    explain: QT`矩阵为 $\operatorname{diag}(1,2,1)$，三个特征值全为正，故正定。`
  },
  {
    id: 'q-l5-7', chapter: 'lin-5', type: 'fill', level: '基础',
    stem: QT`矩阵 $A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$ 的两个特征值之和为 ______。`,
    answer: '2', accept: ['2'],
    answerText: QT`$2$`,
    explain: QT`特征值之和等于矩阵的迹：$1+1=2$。`
  },
  {
    id: 'q-l5-8', chapter: 'lin-5', type: 'judge', level: '易错',
    stem: QT`若实对称矩阵 $A$ 的主对角线元素全为正，则 $A$ 正定。`,
    options: [QT`正确`, QT`错误`],
    answer: 1,
    explain: QT`主对角线元素全正只是正定的必要条件，不是充分条件。例如 $\begin{pmatrix}1&2\\2&1\end{pmatrix}$ 的对角线元素全为 $1$，但行列式为 $-3<0$，不正定。`
  },

  /* ========== 线性代数 · 线性空间与线性变换（选学） ========== */
  {
    id: 'q-l6-1', chapter: 'lin-6', type: 'single', level: '基础',
    stem: QT`下列集合中，是 $\mathbb R^3$ 的子空间的是（ ）。`,
    options: [
      QT`$W=\{(x,y,0)^T\mid x,y\in\mathbb R\}$`,
      QT`$W=\{(x,y,1)^T\mid x,y\in\mathbb R\}$`,
      QT`$W=\{(x,y,z)^T\mid x+y+z=1\}$`,
      QT`$W=\{(x,y,z)^T\mid x^2+y^2=0\}$`
    ],
    answer: 0,
    explain: QT`$W=\{(x,y,0)\}$ 对加法、数乘封闭且含零向量，是子空间（即 $xy$ 平面）。其余集合不含零向量或对运算不封闭。`
  },
  {
    id: 'q-l6-2', chapter: 'lin-6', type: 'single', level: '基础',
    stem: QT`$\mathbb R^3$ 的维数是（ ）。`,
    options: [QT`$3$`, QT`$2$`, QT`$1$`, QT`$4$`],
    answer: 0,
    explain: QT`$\mathbb R^3$ 的标准基为 $e_1,e_2,e_3$，含 $3$ 个向量，故维数为 $3$。`
  },
  {
    id: 'q-l6-3', chapter: 'lin-6', type: 'single', level: '核心',
    stem: QT`线性变换 $T$ 在基 $\alpha_1,\dots,\alpha_n$ 下的矩阵 $A$，其第 $j$ 列是（ ）。`,
    options: [
      QT`$T(\alpha_j)$ 在该基下的坐标`,
      QT`$\alpha_j$ 在标准基下的坐标`,
      QT`$T(\alpha_1)$ 的坐标`,
      QT`$A$ 的第 $j$ 个特征向量`
    ],
    answer: 0,
    explain: QT`矩阵表示的定义：$T(\alpha_1,\dots,\alpha_n)=(\alpha_1,\dots,\alpha_n)A$，故第 $j$ 列是 $T(\alpha_j)$ 在给定基下的坐标。`
  },
  {
    id: 'q-l6-4', chapter: 'lin-6', type: 'judge', level: '基础',
    stem: QT`两个子空间的交集仍是子空间。`,
    options: [QT`正确`, QT`错误`],
    answer: 0,
    explain: QT`若 $W_1,W_2$ 都是子空间，则它们的交集含零向量，且对加法和数乘封闭，因此仍是子空间。`
  }
];
