---
title: Using this theme
date: 2026-06-10
author: Ethan Marks
---

The [Tufte theme](https://github.com/ethmarks/lume_tufte) is an excellent
general-purpose theme for [Lume](https://lume.land/) based on
[Tufte CSS](https://edwardtufte.github.io/tufte-css/). It couples the minimalist
elegance of Tufte CSS and the powerful featureset of the Lume plugin ecosystem
in an easy-to-use theme.

## Installation

To install the theme, use the Lume init command with the `theme` option set to
`tufte`:

```sh
deno run -A https://lume.land/init.ts --theme=tufte
```

It will create a new Lume site in the current directory, add the Tufte theme,
and create a few files to get you started.

You can use the following commands to run the site:

```sh
# Build the site with Lume and output to the _site/ directory
deno task build

# Start the Lume live server
deno task serve
```

## Configuration

### Theme Config

To configure most features of the theme, you'll need to modify the your
`_data.yml` file. The `_data.yml` comes prepopulated with a bunch of defaults
and comments that explain their effect.

### Included Plugins Config

To configure the included plugins of the theme, you'll need to pass options into
the theme in your `_config.ts` file.

For example, to change the theme of the code highlighter, you can add the
following lines:

```ts
import lume from "lume/mod.ts";
import theme from "theme/mod.ts";
+import { type Options as ThemeOptions } from "theme/mod.ts";

const site = lume();

+const themeOpt: ThemeOptions = {
+  nueglow: {
+    theme: "catppuccin",
+  },
+};

-site.use(theme());
+site.use(theme(themeOpt));

export default site;
```

_By the way, the diff highlighting that you see above is a native feature of
this theme thanks to the Nueglow plugin (also made by me). Read more
[here](https://ethmarks.github.io/lume_nueglow/#:~:text=If%20you%20prefix%20a%20line%20with%20a%20minus%20sign,the%20diff%20below.)._

For a complete list of plugin options, consult the documentation for each of the
included plugins:

- [Sitemap](https://lume.land/plugins/sitemap/)
- [Favicon](https://lume.land/plugins/favicon/)
- [Markdown](https://lume.land/plugins/markdown/)
- [KaTeX](https://lume.land/plugins/katex/)
- [Nueglow](https://github.com/ethmarks/lume_nueglow)
