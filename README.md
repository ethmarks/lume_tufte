# Tufte

[![Demo](https://img.shields.io/badge/demo-live-green)](https://ethmarks.github.io/lume_tufte/)
[![GitHub](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/ethmarks/lume_tufte)
[![jsDelivr](https://img.shields.io/badge/jsDelivr-cdn-orange?logo=jsdelivr)](https://www.jsdelivr.com/package/gh/ethmarks/lume_tufte)

General-purpose [Lume theme](https://lume.land/themes/) based on
[Tufte CSS](https://edwardtufte.github.io/tufte-css/).

![Screenshot of Tufte demo homepage](./.github/img/home-2026-06-15.png)

## Features

- **Styling with Tufte CSS**: Uses a modified version of
  [Tufte CSS](https://edwardtufte.github.io/tufte-css/), a popular CSS
  micro-framework created in 2014 by
  [David Liepmann](https://github.com/daveliepmann) based on the work of
  [Edward Tufte](https://github.com/edwardtufte). Its wide margins and beautiful
  serif typography create a clean, sophisticated aesthetic.
- **Expressive Syntax**: Includes several plugins that extend standard Markdown
  syntax for things like sidenotes, complex math blocks, `<figcaption>` tags,
  and more, all without writing a single line of HTML. See the
  [Syntax section](#syntax) for more information.
- **LumeCMS Integration**: Features a comprehensive `_cms.ts` file that allows
  for no-code content management of the entire site using
  [LumeCMS](https://lume.land/cms/).
- **Perfect Lighthouse Scores**: Earns
  [perfect 100s](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring#:~:text=To%20provide%20a%20good%20user,90%20to%2094.)
  in performance, accessibility, best practices, and SEO on
  [Lighthouse](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fethmarks.github.io%2Flume_tufte%2F).

## Quickstart

> [!TIP]
> **This quickstart is for creating your own Lume site using the Tufte theme. If
> you just want to check out the theme, visit the
> [live demo](https://ethmarks.github.io/lume_tufte/).**

Prerequisite: make sure to
[install Deno](https://docs.deno.com/runtime/getting_started/installation/) if
you haven't already. I'm using Deno 2.8.1, but it'll probably work on other
versions.

```sh
git clone https://github.com/ethmarks/lume_tufte.git
cd lume_tufte
deno task serve
```

## Syntax

_A more in-depth guide to the Tufte theme's syntax is available
[here](https://ethmarks.github.io/lume_tufte/blog/usage/#syntax)._

### Sidenotes

Sidenotes are like
[GFM footnotes](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#footnotes),
but they're inline and the numbering is automatic. Just put the sidenote text
inside a pair of square brackets with a caret immediately following the left
bracket.

Example:

```md
This is my[^"my", in this case, referring to me.] paragraph text.
```

Result:

![Sidenote demo](./.github/img/sidenote.png)

### Margin notes

Margin notes are like sidenotes but without numbers. The syntax is the same but
with an asterisk after the caret.

Example:

<!-- deno-fmt-ignore -->
```md
I am the very model of a modern major general.[^*No idea why I picked this as the example.]
```

Result:

![Margin note demo](./.github/img/marginnote.png)

### Subtitles

Subtitles are text that is italic and has a large font size. You can turn any
paragraph text into a subtitle by adding `{.subtitle}` to the end of the line.

Example:

```md
Written by A Bunch of Bees {.subtitle}
```

Result:

![Subtitle demo](./.github/img/subtitle.png)

### Math

Math is rendered using KaTeX, which uses the same syntax as TeX. A list of KaTeX
syntax is available [here](https://katex.org/docs/supported). You can start a
math block by using the `math` language in a code block.

Example:

````md
```math
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
```
````

Result:

![Math demo](./.github/img/math.png)

### Figcaptions

`<figcaption>` tags are added using
[image title syntax](https://www.markdownlang.com/basic/images.html#images-with-title).
Just add quotes after the source URI.

Example:

```md
![Alt text](/uploads/seattle.jpg "A photo I took of Seattle from the Space Needle")
```

Result:

![Figcaption demo](./.github/img/figcaption.png)

### Fullwidth

On wide screens, the main content only occupies 55% of the screen width. To make
an element take up more space, add `{.fullwidth}` to the end of the line.

Example:

<!-- deno-fmt-ignore -->
```md
![A photo I took of the Rock of Ages quarry in Vermont](/uploads/quarry.jpg) {.fullwidth}
```

Result:

![Fullwidth demo](./.github/img/fullwidth.png)

### Epigraphs

To use
[Tufte CSS epigraphs](https://edwardtufte.github.io/tufte-css/#epigraphs), add
`{.epigraph}` to the end of a blockquote and add `{.quotecite}` to the next
paragraph text.

Example:

```md
> On two occasions I have been asked by members of Parliament, 'Pray, Mr.
> Babbage, if you put into the machine wrong figures, will the right answers
> come out?' I am not able rightly to apprehend the kind of confusion of ideas
> that could provoke such a question. {.epigraph}

— Charles Babbage (inventor of the automatic calculator), 1864 {.quotecite}
```

Result:

![Epigraph demo](./.github/img/epigraph.png)

### Code

You can use Nueglow's
[special syntax](https://nuejs.org/docs/syntax-highlighting) for highlighting
specific sequences and lines.

To highlight a section, surround it with single bullet markers (e.g.
•important•). To underline a section, surround it with double bullet markers
(e.g. ••mistake••). To highlight an entire line, begin it with a greater than
sign (>). To render a diff, use plus signs (+) and minus signs (-) to start
inserted and deleted lines, respectively.

Example:

````md
```ts
interface User {
  id: number;
  name: string;
}

function greet(•user: User•): string {
> return `Hello, ${user.name}!`;
}

-const me: User = { id: 1, name: "Not Ethan" };
+const me: User = { id: 1, name: "Ethan" };
console.log(••greet{me}••);
```
````

Result:

![Nueglow demo](./.github/img/nueglow.png)

### Collapsibles

To add `<details>` tags, use the
[markdown-it-collapsible](https://npmjs.com/package/markdown-it-collapsible)
syntax. It’s very similar to the code block syntax, except you use plus signs
instead of backticks.

Example:

```md
+++This is the summary

This is the collapsible content. You can put anything you want in here.

+++
```

Result (shown in collapsed form and in expanded form):

![Collapsible demo](./.github/img/collapsible.png)

### Table of Contents

To add a table of contents, use the syntax from
[markdown-it-toc-done-right](https://github.com/nagaozen/markdown-it-toc-done-right):
place any of `${toc}`, `[[toc]]`, `[toc]`, or `[[_toc_]]` anywhere on a page and
the plugin will automatically replace it with a table of contents based on your
headings.

Example:

```md
[toc]
```

Result:

![Table of Contents demo](./.github/img/toc.png)

## Acknowledgements

- Thanks to [David Liepmann](https://github.com/daveliepmann) and
  [Edward Tufte](https://github.com/edwardtufte) for making
  [tufte.css](https://github.com/edwardtufte/tufte-css).
- Thanks to [Óscar Otero](https://github.com/oscarotero) for making the
  incredible SSG [Lume](https://lume.land/) and for making 11 of the 16 external
  plugins that the Tufte theme uses.
- Thanks to the respective authors of
  [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor),
  [markdown-it-collapsible](https://www.npmjs.com/package/markdown-it-collapsible),
  and
  [markdown-it-toc-done-right](https://github.com/nagaozen/markdown-it-toc-done-right).

Everything else, including two of the external plugins
([lume_nueglow](https://github.com/ethmarks/lume_nueglow) and
[markdown-it-smart-media](https://jsr.io/@ethmarks/markdown-it-smart-media)) and
both of the internal mdit plugins ([tufte-notes](./mdit/tufte-notes.ts) and
[tufte-sections](./mdit/tufte-sections.ts)), was made by me.

## License

This project is under an MIT License. See [LICENSE](LICENSE) for more
information.
