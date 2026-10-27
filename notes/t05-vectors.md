## Главное

**Вектор** — направленный отрезок; задаётся длиной (модулем) и направлением. Нулевой вектор $\vec 0$ имеет длину 0. В декартовой системе вектор $\vec a = (a_x; a_y; a_z)$, его длина

$$\lvert\vec a\rvert = \sqrt{a_x^2 + a_y^2 + a_z^2}.$$

Вектор $\overrightarrow{AB}$ с началом $A(x_1, y_1, z_1)$ и концом $B(x_2, y_2, z_2)$ имеет координаты $(x_2 - x_1;\ y_2 - y_1;\ z_2 - z_1)$ («конец минус начало»). **Радиус-вектор** точки — вектор из начала координат в эту точку.

- **Коллинеарные** векторы лежат на одной или параллельных прямых; $\vec a \parallel \vec b \iff$ координаты пропорциональны $\iff \vec b = \lambda\vec a$.
- **Компланарные** векторы лежат в одной или параллельных плоскостях.

## Линейные операции

Сложение (правило треугольника или параллелограмма), вычитание, умножение на число; в координатах — поэлементно: $\vec a \pm \vec b = (a_x \pm b_x;\ \dots)$, $\lambda\vec a = (\lambda a_x;\ \dots)$. Они удовлетворяют аксиомам: коммутативность и ассоциативность сложения, нулевой и противоположный вектор, $\lambda(\vec a + \vec b) = \lambda\vec a + \lambda\vec b$, $(\lambda + \mu)\vec a = \lambda\vec a + \mu\vec a$, $\lambda(\mu\vec a) = (\lambda\mu)\vec a$, $1\cdot\vec a = \vec a$.

**Проекция** вектора на ось $l$: $\mathrm{пр}_l\vec a = \lvert\vec a\rvert\cos\varphi$, где $\varphi$ — угол между вектором и осью; проекция суммы равна сумме проекций; координаты вектора — это его проекции на оси координат.

## Скалярное произведение

$$\vec a\cdot\vec b = \lvert\vec a\rvert\lvert\vec b\rvert\cos\varphi = a_x b_x + a_y b_y + a_z b_z.$$

Результат — **число**. Свойства: $\vec a\cdot\vec b = \vec b\cdot\vec a$; $\vec a\cdot\vec a = \lvert\vec a\rvert^2$; $(\lambda\vec a)\cdot\vec b = \lambda(\vec a\cdot\vec b)$; $\vec a\cdot(\vec b + \vec c) = \vec a\cdot\vec b + \vec a\cdot\vec c$.

**Угол** между векторами: $\cos\varphi = \dfrac{\vec a\cdot\vec b}{\lvert\vec a\rvert\lvert\vec b\rvert}$. **Условие ортогональности:** $\vec a\perp\vec b \iff \vec a\cdot\vec b = 0$ (для ненулевых).

## Векторное произведение

$\vec a\times\vec b$ — вектор, такой что:
1. $\vec a\times\vec b \perp \vec a$ и $\perp\vec b$;
2. $\lvert\vec a\times\vec b\rvert = \lvert\vec a\rvert\lvert\vec b\rvert\sin\varphi$ — **площадь параллелограмма**, построенного на $\vec a, \vec b$;
3. тройка $\vec a, \vec b, \vec a\times\vec b$ — правая.

Свойства: $\vec a\times\vec b = -\vec b\times\vec a$; $\vec a\times\vec b = \vec 0 \iff \vec a\parallel\vec b$; $(\lambda\vec a)\times\vec b = \lambda(\vec a\times\vec b)$; $\vec a\times(\vec b + \vec c) = \vec a\times\vec b + \vec a\times\vec c$.

В координатах:

$$\vec a\times\vec b = \begin{vmatrix} \vec i & \vec j & \vec k \\ a_x & a_y & a_z \\ b_x & b_y & b_z \end{vmatrix} = (a_y b_z - a_z b_y;\ a_z b_x - a_x b_z;\ a_x b_y - a_y b_x).$$

Площадь треугольника: $S = \tfrac12\lvert\vec a\times\vec b\rvert$.

## Смешанное произведение

$$(\vec a, \vec b, \vec c) = (\vec a\times\vec b)\cdot\vec c = \begin{vmatrix} a_x & a_y & a_z \\ b_x & b_y & b_z \\ c_x & c_y & c_z \end{vmatrix}.$$

Геометрический смысл: $\lvert(\vec a,\vec b,\vec c)\rvert$ — **объём параллелепипеда** на этих векторах; объём пирамиды (тетраэдра) $V = \tfrac16\lvert(\vec a,\vec b,\vec c)\rvert$. Знак $+$ для правой тройки. При циклической перестановке не меняется, при обмене двух множителей меняет знак.

**Условие компланарности:** $(\vec a,\vec b,\vec c) = 0$.

## Разобранные примеры

**1. Линейные операции, длина.** $\vec a = (3, -2, 1)$, $\vec b = (-1, 4, 2)$. $\vec c = 3\vec a - 2\vec b = (9 + 2;\ -6 - 8;\ 3 - 4) = (11;\ -14;\ -1)$, $\lvert\vec c\rvert = \sqrt{121 + 196 + 1} = \sqrt{318}$.

**2. Скалярное и векторное.** Для тех же векторов $\vec a\cdot\vec b = -3 - 8 + 2 = -9$;

$\vec a\times\vec b = (-2\cdot2 - 1\cdot4;\ 1\cdot(-1) - 3\cdot2;\ 3\cdot4 - (-2)(-1)) = (-8;\ -7;\ 10)$.

**3. Угол.** $A(2,-1,3)$, $B(5,0,1)$, $C(1,2,-2)$. $\overrightarrow{AB} = (3, 1, -2)$, $\overrightarrow{AC} = (-1, 3, -5)$. $\overrightarrow{AB}\cdot\overrightarrow{AC} = -3 + 3 + 10 = 10$, $\lvert AB\rvert = \sqrt{14}$, $\lvert AC\rvert = \sqrt{35}$, $\cos\varphi = \dfrac{10}{\sqrt{14\cdot35}} = \dfrac{10}{7\sqrt{10}} = \dfrac{\sqrt{10}}{7}\approx 0{,}452$.

**4. Площадь параллелограмма.** $\vec a = (1, -2, 3)$, $\vec b = (4, 0, -1)$. $\vec a\times\vec b = ((-2)(-1) - 3\cdot0;\ 3\cdot4 - 1\cdot(-1);\ 1\cdot0 - (-2)\cdot4) = (2;\ 13;\ 8)$, $S = \sqrt{4 + 169 + 64} = \sqrt{237}$.

**5. Компланарность.** $\vec a = (2, -3, 1)$, $\vec b = (-4, 6, -2)$, $\vec c = (1, 0, 5)$. Здесь $\vec b = -2\vec a$ (векторы коллинеарны), значит смешанное произведение равно 0: векторы компланарны.

**6. Объём тетраэдра.** Для вершин $A(0,1,2)$, $B(-1,3,0)$, $C(2,-1,4)$ и точки $D$ — середины $BC$ — получается $D(\tfrac12, 1, 2)$, $\overrightarrow{AD} = (\tfrac12, 0, 0) = \tfrac12(\overrightarrow{AB} + \overrightarrow{AC})$. Раз $\overrightarrow{AD}$ — линейная комбинация $\overrightarrow{AB}$ и $\overrightarrow{AC}$, три вектора компланарны, смешанное произведение равно 0 и **объём тетраэдра равен нулю** (точка $D$ лежит в плоскости $ABC$). Если такая задача встретится, сначала проверьте, не лежит ли четвёртая точка в плоскости остальных.

**7. Перпендикулярные.** $\vec p\perp\vec q$, $\lvert\vec p\rvert = 2$, $\lvert\vec q\rvert = 5$. $(2\vec p - \vec q)\cdot(\vec p + 3\vec q) = 2\vec p\cdot\vec p + 6\vec p\cdot\vec q - \vec q\cdot\vec p - 3\vec q\cdot\vec q = 2\cdot4 + 0 - 0 - 3\cdot25 = -67$.

**8. Прикладная (из ФОС).** Пользователи $\vec a = (30, 4)$ и $\vec b = (60, 2)$ (секунды на странице, клики). Разность $\vec d = \vec b - \vec a = (30, -2)$: второй пользователь дольше на странице на 30 с, но кликов на 2 меньше. Длины $\lvert\vec a\rvert = \sqrt{916}\approx 30{,}3$, $\lvert\vec b\rvert = \sqrt{3604}\approx 60{,}0$. Скалярное произведение $\vec a\cdot\vec b = 1800 + 8 = 1808 > 0$ (профили не противоположны; косинусное сходство $\approx 0{,}995$ — очень близки по направлению, различаются масштабом).

## Типичные ошибки

- Координаты вектора $\overrightarrow{AB}$ берут как «начало минус конец».
- Путают скалярное (число) и векторное (вектор) произведения.
- В векторном произведении ошибаются в знаке средней компоненты (определитель раскладывается с чередованием знаков).
- Забывают $\tfrac12$ у площади треугольника и $\tfrac16$ у объёма пирамиды.

## Вопросы к экзамену

18. Понятие вектора, нулевой вектор, длина. Коллинеарные и компланарные векторы. Линейные операции.
19. Проекция вектора на ось. Декартова система, радиус-вектор, координаты вектора.
20. Скалярное произведение, ортогональность.
21. Векторное произведение, геометрический смысл, координаты.
22. Смешанное произведение, геометрический смысл, компланарность.
