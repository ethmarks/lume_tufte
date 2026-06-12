---
title: Formatting Demo
published: 2026-06-11
author: Ethan Marks
---

Hi there! This is a demo of how the Tufte theme can format things like
sidenotes, code, lists, math, images, and more.

Here's a TypeScript snippet to generate random full-precision floats and convert
them to base-10 scientific notation[^Why did I choose this example? Well, I
actually originally wrote all of this code while researching the slideshow of a
speech I gave which involved demonstrating how difficult it is for humans to
manually perform floating-point calculations. The reason I chose it for this
demo is because I thought it would be funny.]. The code block is highlighted
automatically by Tufte via Nueglow.[^By the way, the Nueglow plugin for Lume
that Tufte uses
[was created by me](https://github.com/ethmarks/lume_nueglow).][^Notice how
neatly all of these sidenotes are stacked?]

```ts
const MAX_SAFE_EXP = Math.floor(Math.log10(Number.MAX_SAFE_INTEGER)); // 15
const MIN_EXP = Math.floor(Math.log10(Number.MIN_VALUE)); // -324
const MAX_EXP = Math.floor(Math.log10(Number.MAX_VALUE)); // 308

// random coefficient between 1.0 and 10.0
const coefficient: number = Math.random() * 9 + 1;

// convert to 15-decimal (16 sigfig) string representation
const fixedCoeff: string = coefficient.toFixed(MAX_SAFE_EXP);

// random integer exponent between -324 and 308
const exponent = Math.floor(Math.random() * (MAX_EXP - MIN_EXP + 1)) +
  MIN_EXP;

// print the output in scientific notation
console.log(`${coefficient}*10^${exponent}`);
```

Here are some example outputs:

- `2.042122968681706*10^284`
- `4.161313893729217*10^-180`
- `4.286881011926911*10^176`
- `5.544526252474988*10^-218`
- `6.859836896080841*10^-176`

Here's two of those 16-sigfig numbers multiplied together with all intermediate
long multiplication steps written out. It's rendered automatically by Tufte
using KaTeX.

```math
\begin{array}{rl}
  2.042122968681706 & \times 10^{284} \\
  \times \quad 4.161313893729217 & \times 10^{-180} \\
\hline
  14.294860780771942 & \\
  2.0421229686817060 & \\
  4.08424593736341200 & \\
  18.379106718135354000 & \\
  4.0842459373634120000 & \\
  14.29486078077194200000 & \\
  6.126368906045118000000 & \\
  18.3791067181353540000000 & \\
  16.33698374945364800000000 & \\
  6.126368906045118000000000 & \\
  2.0421229686817060000000000 & \\
  6.12636890604511800000000000 & \\
  2.042122968681706000000000000 & \\
  12.2527378120902360000000000000 & \\
  2.04212296868170600000000000000 & \\
  +\quad 8.168491874726824000000000000000 & \\
\hline
  8.497914682278737857594625604202 & \times 10^{104} \\
\end{array}
```

_If you're on a narrow screen, you may need to scroll to the right to see the
full math block._

Here's the Python[^The reason I used Python rather than TypeScript is that I
needed the LaTeX generator to integrate with a larger codebase. The codebase
needed to use [Manim](https://www.manim.community/), which is only runs in
Python. I decided that I might as well use Python for the whole thing. This had
the unintentional bonus of allowing me to demonstrate that Tufte can highlight
other langs than TypeScript.] snippet that I used to generate the math block
above:

```py
from decimal import Decimal, getcontext

# Our coefficients have 16 decimal sigfigs, so we'll need at least 16 + 16 = 32
# digits of precision, and we add 1 extra digit for safety margin.
getcontext().prec = 33

coeff_a, exp_a = "2.042122968681706", 284
coeff_b, exp_b = "4.161313893729217", -180

combined_exp = exp_a + exp_b
val_a = Decimal(coeff_a)

# multiplier digits in reverse order (excluding decimal point)
multiplier_digits = coeff_b.replace(".", "")[::-1]
num_partials = len(multiplier_digits)

# Header Section
latex = [
    r"\begin{array}{rl}",
    f"  {coeff_a} & \\times 10^{{{exp_a}}} \\\\",
    f"  \\times \\quad {coeff_b} & \\times 10^{{{exp_b}}} \\\\",
    r"\hline",
]

# Intermediate Section
for i, digit_char in enumerate(multiplier_digits):
    digit = int(digit_char)
    partial = val_a * digit

    formatted_partial = f"{partial:.16f}".rstrip("0").rstrip(".")
    if formatted_partial == "0" or digit == 0:
        formatted_partial = "0.0000000000000000"

    suffix = "0" * i
    prefix = "+\\quad " if i == num_partials - 1 else ""
    latex.append(f"  {prefix}{formatted_partial}{suffix} & \\\\")

# Footer Section
total_coeff = val_a * Decimal(coeff_b)
latex.append(r"\hline")
latex.append(f"  {total_coeff} & \\times 10^{{{combined_exp}}} \\\\")
latex.append(r"\end{array}")

# Result
latex_output = "\n".join(latex)
print(latex_output)
```

Here's the LaTeX output of that Python snippet. Rather than using a code block,
I've taken a screenshot of my IDE[^By the way, no, I do not usually set my IDE
font size that large, nor do I usually leave so much empty space around my
windows. I scaled the font up so that the text would be more readable in the
screenshot and windowed the IDE for aesthetics.] displaying the LaTeX.

![Screenshot of fp_mult.tex open in Zed](/uploads/fp_mult.png "In case you were 
curious, I'm using [Zed](https://zed.dev/) on [Fedora](https://fedoraproject.org/).")

Did you notice the little "In case you were curious" note below the screenshot?
That's a semantic `<figcaption>` that Tufte rendered automatically from Markdown
using
[markdown-it-smart-media](https://jsr.io/@ethmarks/markdown-it-smart-media)[^Which
is another plugin
[I created](https://github.com/ethmarks/markdown-it-smart-media).]. Here's the
Markdown used to create the image above:

```md
![Screenshot of fp_mult.tex open in Zed](/uploads/fp_mult.png "In case you were curious, I'm using [Zed](https://zed.dev/) on [Fedora](https://fedoraproject.org/).")
```
