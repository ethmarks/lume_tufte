# Tufte

[![Demo](https://img.shields.io/badge/demo-live-green)](https://ethmarks.github.io/lume_tufte/)
[![GitHub](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/ethmarks/lume_tufte)
[![jsDelivr](https://img.shields.io/badge/jsDelivr-cdn-orange?logo=jsdelivr)](https://www.jsdelivr.com/package/gh/ethmarks/lume_tufte)

General-purpose [Lume theme](https://lume.land/themes/) based on
[Tufte CSS](https://edwardtufte.github.io/tufte-css/).

![Screenshot of "Using this theme" post](./.github/usage-2026-06-14.png)

## Features

- **Styling with Tufte CSS**: Uses a modified version of
  [Tufte CSS](https://edwardtufte.github.io/tufte-css/), a popular CSS
  micro-framework created in 2014 by
  [David Liepmann](https://github.com/daveliepmann) based on the work of
  [Edward Tufte](https://github.com/edwardtufte). Its wide margins and beautiful
  serif typography create a clean, sophisticated aesthetic.
- **Expressive Syntax**: Includes several plugins that extend standard Markdown
  syntax to allow for automatically rendering Tufte-style sidenotes, complex
  math blocks, highlighted code blocks, `<figcaption>` tags, `<details>` tags,
  and more, all without writing a single line of HTML. Includes two completely
  custom `markdown-it` plugins for perfect TufteCSS compatibility.
- **LumeCMS Integration**: Features a comprehensive `_cms.ts` file that allows
  for no-code content management of the entire site using
  [LumeCMS](https://lume.land/cms/).

## Quickstart

Prerequisite: make sure to
[install Deno](https://docs.deno.com/runtime/getting_started/installation/) if
you haven't already.

```sh
git clone https://github.com/ethmarks/lume_tufte.git
cd lume_tufte
deno task serve
```
