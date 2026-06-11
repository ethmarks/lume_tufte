---
title: About Me
layout: layouts/base.vto
metas:
  type: profile
---

# About Me

Hi! I'm Tufte, a general-purpose [Lume theme](https://lume.land/themes/) based
on [Tufte CSS](https://edwardtufte.github.io/tufte-css/).

## My Skills

Here are a few of the things that I can do.

### Sidenotes

Tufte CSS recommends the use of
[sidenotes](https://edwardtufte.github.io/tufte-css/#sidenotes) rather than
footnotes. I have a custom markdown-it plugin that lets me automatically render
inline Markdown footnotes into Tufte-style sidenotes[^"Sidenotes" in this case
meaning footnotes except lacking in feet and sufficient in side.].

_Note: On wide screens, sidenotes are displayed to the right of the main text,
but on narrow screens (e.g. phones), they are hidden by default and you have to
tap the sidenote marker to make them visible._

### Code Highlighting

I can highlight code blocks using Lume's
[Nueglow plugin](https://ethmarks.github.io/lume_nueglow/)[^Fun fact: Lume's
Nueglow plugin was created by Ethan Marks, the same developer who created me!].

```ts
function fibonacci(num: number): number {
  if (num == 1) return 0;
  if (num == 2) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
}
```

_Note: Nueglow uses heuristics rather than grammars, which means that it isn't
always 100% accurate, but it supports every programming language out of the box,
even ones that it's never seen before or that you just made up._

### KaTeX

I can automatically render complex math using Lume's
[KaTeX plugin](https://lume.land/plugins/katex/).

```math
i\hbar \frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \left[-\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t)\right]\Psi(\mathbf{r},t)
```

### Collapsibles

I can automatically render collapsible blocks using the
[markdown-it-collapsible](https://www.npmjs.com/package/markdown-it-collapsible)
plugin.

+++ Click here to open

This is the inside of the collapsible.

There's lots of space in here, so make yourself at home.

+++

## My History

I was created by [Ethan Marks](https://github.com/ethmarks) in June 2026, when
he was bored on vacation and decided on a whim to make a new Lume theme. He
based it on Tufte CSS, a fairly-popular CSS micro-framework created in 2014 by
[David Liepmann](https://github.com/daveliepmann) based on
[Edward Tufte](https://github.com/edwardtufte)'s distinctively-styled
handouts[^For example,
<http://rmarkdown.rstudio.com/examples/tufte-handout.pdf>.].
