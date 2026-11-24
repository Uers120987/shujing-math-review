/* 课后习题 · 高数 / 线代易错易混参数变式
   每个模板生成 84 道不同参数的原创变式：高数 1008、线代 1008。
   这些题只进入课后习题，不进入章节测试和综合测试。 */
const PX = String.raw;
const PRACTICE_VARIANTS = 84;

window.PRACTICE_TEMPLATES = [
  /* ---------------- 高等数学 ---------------- */
  {
    key: 'p-c-lim-sin', chapter: 'calc-1', kp: 'calc-1-3', tag: '易错',
    make(i) {
      const a = 2 + i, b = 3 + (i % 8);
      return {
        stem: PX`$\displaystyle\lim_{x\to0}\frac{\sin ${a}x}{${b}x}=$（ ）。`,
        options: [PX`$\dfrac{${a}}{${b}}$`, PX`$\dfrac{${b}}{${a}}$`, PX`$1$`, PX`$0$`],
        answer: 0,
        explain: PX`$\sin ${a}x\sim ${a}x$，所以极限为 $\dfrac{${a}x}{${b}x}=\dfrac{${a}}{${b}}$。`
      };
    }
  },
  {
    key: 'p-c-lim-cos', chapter: 'calc-1', kp: 'calc-1-3', tag: '易错',
    make(i) {
      const a = 2 + i;
      return {
        stem: PX`$\displaystyle\lim_{x\to0}\frac{1-\cos ${a}x}{x^2}=$（ ）。`,
        options: [PX`$\dfrac{${a * a}}{2}$`, PX`$\dfrac{${a}}{2}$`, PX`$${a * a}$`, PX`$0$`],
        answer: 0,
        explain: PX`$1-\cos ${a}x\sim\dfrac{(${a}x)^2}{2}=\dfrac{${a * a}x^2}{2}$，极限为 $\dfrac{${a * a}}{2}$。`
      };
    }
  },
  {
    key: 'p-c-lim-exp', chapter: 'calc-1', kp: 'calc-1-3', tag: '易混',
    make(i) {
      const a = 2 + (i % 6), b = 2 + Math.floor(i / 3);
      return {
        stem: PX`$\displaystyle\lim_{x\to\infty}\left(1+\frac{${a}}{x}\right)^{${b}x}=$（ ）。`,
        options: [PX`$e^{${a * b}}$`, PX`$e^{${a + b}}$`, PX`$e^{${a}/${b}}$`, PX`$1$`],
        answer: 0,
        explain: PX`$1^\infty$ 型：$\lim ${b}x\cdot\dfrac{${a}}{x}=${a * b}$，所以原极限为 $e^{${a * b}}$。`
      };
    }
  },
  {
    key: 'p-c-cont', chapter: 'calc-1', kp: 'calc-1-2', tag: '易错',
    make(i) {
      const a = 2 + i;
      return {
        stem: PX`设 $f(x)=\begin{cases}\dfrac{\sin ${a}x}{x},&x\ne0,\\ k,&x=0.\end{cases}$ 若 $f(x)$ 在 $x=0$ 连续，则 $k=$（ ）。`,
        options: [PX`$${a}$`, PX`$0$`, PX`$1$`, PX`$${a * a}$`],
        answer: 0,
        explain: PX`连续要求 $k=\lim_{x\to0}\dfrac{\sin ${a}x}{x}=${a}$。`
      };
    }
  },
  {
    key: 'p-c-der-prod', chapter: 'calc-2', kp: 'calc-2-1', tag: '易混',
    make(i) {
      const n = 2 + (i % 4), a = 2 + Math.floor(i / 4);
      return {
        stem: PX`设 $y=x^{${n}}\ln(${a}x)$，则 $y'=$（ ）。`,
        options: [
          PX`$${n}x^{${n - 1}}\ln(${a}x)+x^{${n - 1}}$`,
          PX`$${n}x^{${n - 1}}\ln(${a}x)$`,
          PX`$x^{${n}}\cdot\dfrac1x$`,
          PX`$${n}x^{${n}}\ln(${a}x)+x^{${n}}$`
        ],
        answer: 0,
        explain: PX`乘积法则：$(x^{${n}})'\ln(${a}x)+x^{${n}}(\ln(${a}x))'=${n}x^{${n - 1}}\ln(${a}x)+x^{${n - 1}}$。`
      };
    }
  },
  {
    key: 'p-c-tangent', chapter: 'calc-2', kp: 'calc-2-2', tag: '易错',
    make(i) {
      const a = 2 + i;
      return {
        stem: PX`曲线 $y=x^2+${a}x$ 在 $x=1$ 处的切线斜率为（ ）。`,
        options: [PX`$${2 + a}$`, PX`$${a}$`, PX`$2$`, PX`$${1 + a}$`],
        answer: 0,
        explain: PX`$y'=2x+${a}$，在 $x=1$ 处斜率为 $2+${a}=${2 + a}$。`
      };
    }
  },
  {
    key: 'p-c-min', chapter: 'calc-3', kp: 'calc-3-1', tag: '易混',
    make(i) {
      const a = 2 + i;
      return {
        stem: PX`函数 $f(x)=x^2-${2 * a}x$ 的极小值点是 $x=$（ ）。`,
        options: [PX`$${a}$`, PX`$${-a}$`, PX`$${2 * a}$`, PX`$0$`],
        answer: 0,
        explain: PX`$f'(x)=2x-${2 * a}=2(x-${a})$，在 $x=${a}$ 处由减转增，是极小值点。`
      };
    }
  },
  {
    key: 'p-c-lhop', chapter: 'calc-3', kp: 'calc-3-2', tag: '易错',
    make(i) {
      const a = 2 + i;
      return {
        stem: PX`$\displaystyle\lim_{x\to0}\frac{e^{${a}x}-1-${a}x}{x^2}=$（ ）。`,
        options: [PX`$\dfrac{${a * a}}{2}$`, PX`$\dfrac{${a}}{2}$`, PX`$${a * a}$`, PX`$0$`],
        answer: 0,
        explain: PX`$e^{${a}x}=1+${a}x+\dfrac{${a * a}x^2}{2}+o(x^2)$，所以极限为 $\dfrac{${a * a}}{2}$。`
      };
    }
  },
  {
    key: 'p-c-int-power', chapter: 'calc-4', kp: 'calc-4-1', tag: '易混',
    make(i) {
      const a = 2 + (i % 6), b = 1 + Math.floor(i / 6);
      return {
        stem: PX`$\displaystyle\int(${a}x+${b})^3\,dx=$（ ）。`,
        options: [
          PX`$\dfrac{(${a}x+${b})^4}{${4 * a}}+C$`,
          PX`$\dfrac{(${a}x+${b})^4}{4}+C$`,
          PX`$4(${a}x+${b})^3+C$`,
          PX`$\dfrac{(${a}x+${b})^4}{${a}}+C$`
        ],
        answer: 0,
        explain: PX`令 $u=${a}x+${b}$，$du=${a}dx$，积分为 $\dfrac1{${a}}\cdot\dfrac{u^4}{4}+C=\dfrac{(${a}x+${b})^4}{${4 * a}}+C$。`
      };
    }
  },
  {
    key: 'p-c-def', chapter: 'calc-5', kp: 'calc-5-1', tag: '易错',
    make(i) {
      const a = 2 + (i % 6), b = 2 + Math.floor(i / 6);
      return {
        stem: PX`$\displaystyle\int_0^1(${a}x^2+${b}x)\,dx=$（ ）。`,
        options: [
          PX`$\dfrac{${a}}{3}+\dfrac{${b}}{2}$`,
          PX`$\dfrac{${a}}{2}+\dfrac{${b}}{3}$`,
          PX`$${a + b}$`,
          PX`$0$`
        ],
        answer: 0,
        explain: PX`$\left[\dfrac{${a}x^3}{3}+\dfrac{${b}x^2}{2}\right]_0^1=\dfrac{${a}}{3}+\dfrac{${b}}{2}$。`
      };
    }
  },
  {
    key: 'p-c-area', chapter: 'calc-6', kp: 'calc-6-1', tag: '易错',
    make(i) {
      const k = 2 + i;
      return {
        stem: PX`曲线 $y=x^2$ 与直线 $y=${k}x$ 所围图形的面积为（ ）。`,
        options: [PX`$\dfrac{${k ** 3}}{6}$`, PX`$\dfrac{${k ** 2}}{2}$`, PX`$\dfrac{${k ** 3}}{3}$`, PX`$\dfrac{${k}}{6}$`],
        answer: 0,
        explain: PX`交点 $x=0,${k}$，面积 $\displaystyle\int_0^{${k}}(${k}x-x^2)dx=\dfrac{${k ** 3}}{6}$。`
      };
    }
  },
  {
    key: 'p-c-ode', chapter: 'calc-7', kp: 'calc-7-1', tag: '易混',
    make(i) {
      const k = 2 + (i % 6), c = 2 + Math.floor(i / 6);
      return {
        stem: PX`微分方程 $y'=${k}y$ 满足 $y(0)=${c}$ 的特解是（ ）。`,
        options: [PX`$y=${c}e^{${k}x}$`, PX`$y=e^{${k}x}$`, PX`$y=${c}e^{-${k}x}$`, PX`$y=${k}e^{${c}x}$`],
        answer: 0,
        explain: PX`分离变量得 $y=Ce^{${k}x}$；由 $y(0)=${c}$ 得 $C=${c}$，所以 $y=${c}e^{${k}x}$。`
      };
    }
  },

  /* ---------------- 线性代数 ---------------- */
  {
    key: 'p-l-det2', chapter: 'lin-1', kp: 'lin-1-1', tag: '易错',
    make(i) {
      const a = 2 + i, b = 3 + (i % 7), c = 4 + (i % 5), d = 5 + (i % 9);
      const ans = a * d - b * c;
      return {
        stem: PX`$\begin{vmatrix}${a}&${b}\\${c}&${d}\end{vmatrix}=$（ ）。`,
        options: [PX`$${ans}$`, PX`$${a * c - b * d}$`, PX`$${a * d + b * c}$`, PX`$${a + d}$`],
        answer: 0,
        explain: PX`二阶行列式 $ad-bc=${a}\cdot${d}-${b}\cdot${c}=${ans}$。`
      };
    }
  },
  {
    key: 'p-l-det3', chapter: 'lin-1', kp: 'lin-1-2', tag: '易混',
    make(i) {
      const a = 2 + i, b = 3 + i, c = 4 + (i % 5);
      return {
        stem: PX`上三角行列式 $\begin{vmatrix}${a}&1&2\\0&${b}&3\\0&0&${c}\end{vmatrix}=$（ ）。`,
        options: [PX`$${a * b * c}$`, PX`$${a + b + c}$`, PX`$${a * b}$`, PX`$0$`],
        answer: 0,
        explain: PX`三角行列式等于主对角线元素乘积：$${a}\cdot${b}\cdot${c}=${a * b * c}$。`
      };
    }
  },
  {
    key: 'p-l-transpose', chapter: 'lin-2', kp: 'lin-2-1', tag: '易混',
    make(i) {
      const a = 2 + i, b = 3 + (i % 4), c = 4 + (i % 6), d = 5 + (i % 7);
      return {
        stem: PX`设 $A=\begin{pmatrix}${a}&${b}\\${c}&${d}\end{pmatrix}$，则 $A^T$ 的第 1 行第 2 列元素为（ ）。`,
        options: [PX`$${c}$`, PX`$${b}$`, PX`$${a}$`, PX`$${d}$`],
        answer: 0,
        explain: PX`转置后第 1 行第 2 列等于原矩阵第 2 行第 1 列，即 $${c}$。`
      };
    }
  },
  {
    key: 'p-l-inv-diag', chapter: 'lin-2', kp: 'lin-2-2', tag: '易错',
    make(i) {
      const a = 2 + (i % 6), b = 2 + Math.floor(i / 6);
      return {
        stem: PX`设 $A=\begin{pmatrix}${a}&0\\0&${b}\end{pmatrix}$，则 $A^{-1}=$（ ）。`,
        options: [
          PX`$\begin{pmatrix}1/${a}&0\\0&1/${b}\end{pmatrix}$`,
          PX`$\begin{pmatrix}${a}&0\\0&${b}\end{pmatrix}$`,
          PX`$\begin{pmatrix}1/${b}&0\\0&1/${a}\end{pmatrix}$`,
          PX`$\begin{pmatrix}0&1/${a}\\1/${b}&0\end{pmatrix}$`
        ],
        answer: 0,
        explain: PX`对角矩阵的逆仍为对角矩阵，对角元取倒数：$\operatorname{diag}(1/${a},1/${b})$。`
      };
    }
  },
  {
    key: 'p-l-rank', chapter: 'lin-3', kp: 'lin-3-1', tag: '易混',
    make(i) {
      const n = 2 + i;
      return {
        stem: PX`设 $A=\operatorname{diag}(2,3,\ldots,${n})$ 为 $${n}$ 阶对角矩阵，则 $r(A)=$（ ）。`,
        options: [PX`$${n}$`, PX`$${n - 1}$`, PX`$1$`, PX`$0$`],
        answer: 0,
        explain: PX`对角元全部非零，所以有 $${n}$ 个非零行，秩为 $${n}$。`
      };
    }
  },
  {
    key: 'p-l-solve', chapter: 'lin-3', kp: 'lin-3-2', tag: '易错',
    make(i) {
      const a = 2 + i, b = 3 + (i % 5);
      return {
        stem: PX`方程组 $\begin{cases}x+y=${a},\\ x-y=${b}\end{cases}$ 的解 $x=$（ ）。`,
        options: [PX`$\dfrac{${a + b}}{2}$`, PX`$\dfrac{${a - b}}{2}$`, PX`$${a + b}$`, PX`$${a - b}$`],
        answer: 0,
        explain: PX`两式相加得 $2x=${a + b}$，所以 $x=\dfrac{${a + b}}{2}$。`
      };
    }
  },
  {
    key: 'p-l-depend', chapter: 'lin-4', kp: 'lin-4-1', tag: '易混',
    make(i) {
      const k = 2 + i;
      return {
        stem: PX`设 $\alpha=(1,a)$，$\beta=(${k},${k}a)$，则 $\alpha,\beta$ 线性相关时 $a$ 满足（ ）。`,
        options: [PX`任意实数`, PX`$a=0$`, PX`$a=1$`, PX`$a\ne0$`],
        answer: 0,
        explain: PX`$\beta=${k}\alpha$ 对任意 $a$ 都成立，所以两向量始终线性相关。`
      };
    }
  },
  {
    key: 'p-l-span', chapter: 'lin-4', kp: 'lin-4-2', tag: '易错',
    make(i) {
      const n = 2 + i;
      return {
        stem: PX`$\operatorname{span}\{e_1,e_2,\ldots,e_{${n}}\}$ 的维数为（ ）。`,
        options: [PX`$${n}$`, PX`$${n - 1}$`, PX`$${n + 1}$`, PX`$0$`],
        answer: 0,
        explain: PX`标准基向量 $e_1,\ldots,e_{${n}}$ 线性无关，张成空间的维数为 $${n}$。`
      };
    }
  },
  {
    key: 'p-l-eigen', chapter: 'lin-5', kp: 'lin-5-1', tag: '易错',
    make(i) {
      const a = 2 + (i % 6), b = 3 + Math.floor(i / 6);
      return {
        stem: PX`矩阵 $A=\begin{pmatrix}${a}&0\\0&${b}\end{pmatrix}$ 的特征值为（ ）。`,
        options: [PX`$${a},${b}$`, PX`$${a + b},0$`, PX`$${a * b},1$`, PX`$0,0$`],
        answer: 0,
        explain: PX`对角矩阵的特征值就是主对角线元素，所以为 $${a},${b}$。`
      };
    }
  },
  {
    key: 'p-l-pd', chapter: 'lin-5', kp: 'lin-5-2', tag: '易混',
    make(i) {
      const b = 1 + i;
      return {
        stem: PX`设 $A=\begin{pmatrix}a&${b}\\${b}&a\end{pmatrix}$ 正定，则 $a$ 的范围是（ ）。`,
        options: [PX`$a>${b}$`, PX`$a<${b}$`, PX`$a>0$`, PX`$a\ne${b}$`],
        answer: 0,
        explain: PX`二阶实对称矩阵正定的充要条件是顺序主子式全正：$a>0$ 且 $a^2-${b * b}>0$，即 $a>${b}$。`
      };
    }
  },
  {
    key: 'p-l-kernel', chapter: 'lin-6', kp: 'lin-6-1', tag: '易混',
    make(i) {
      const a = 2 + i;
      return {
        stem: PX`线性变换 $T(x,y)=(x+${a}y,0)$ 的核的维数为（ ）。`,
        options: [PX`$1$`, PX`$2$`, PX`$0$`, PX`$3$`],
        answer: 0,
        explain: PX`核满足 $x+${a}y=0$，即 $(x,y)=t(-${a},1)$，所以核是一维的。`
      };
    }
  },
  {
    key: 'p-l-det-scale', chapter: 'lin-1', kp: 'lin-1-1', tag: '易混',
    make(i) {
      const n = 2 + (i % 2), k = 2 + Math.floor(i / 2);
      return {
        stem: PX`设 $A$ 为 $${n}$ 阶方阵，$|A|=2$，则 $|${k}A|=$（ ）。`,
        options: [PX`$${Math.pow(k, n) * 2}$`, PX`$${k * 2}$`, PX`$${Math.pow(k, n)}$`, PX`$${2 * n}$`],
        answer: 0,
        explain: PX`$|kA|=k^n|A|=${k}^{${n}}\cdot2=${Math.pow(k, n) * 2}$。`
      };
    }
  }
];

window.PRACTICE_QUESTIONS = [];
window.PRACTICE_TEMPLATES.forEach(t => {
  for (let i = 0; i < PRACTICE_VARIANTS; i++) {
    const v = t.make(i);
    window.PRACTICE_QUESTIONS.push({
      id: `p-${t.key}-${i + 1}`,
      subject: t.chapter.startsWith('calc') ? 'calc' : 'linear',
      chapter: t.chapter,
      kp: t.kp,
      tag: t.tag,
      level: t.tag,
      type: 'single',
      ...v
    });
  }
});
