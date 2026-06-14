---
title: Using this theme
date: 2026-06-10
author: Ethan Marks
---

This post will walk you through how to install this theme, manage it using the
built-in CMS, and configure its plugins.

## Installation

Installing Tufte is as simple as using the Lume init command with the `theme`
option set to `tufte`.

```sh
deno run -A https://lume.land/init.ts --theme=tufte
```

The command will create a new Lume site in the current directory, add the Tufte
theme, and create a few files to get you started.

## Lume CMS

Tufte fully supports [Lume CMS](https://lume.land/cms/), which allows for easy
no-code content management.

To use it, start Lume's local live server using the command below and open
<http://localhost:3000/admin> in your browser.

```sh
deno task serve
```

You should see a page that looks something like this:

![Screenshot of Lume CMS with the items 'Blog Posts', 'Site settings', 'Homepage', 'Blog Index', '404 Page', and "uploads"](/uploads/cms-2026-06-13.png)

Feel free to explore the CMS. It's pretty intuitive to use, and I've added
explanatory comments to almost every setting. If you prefer a more guided
approach, read on.

### Site settings

The first thing we'll do after installing Tufte is configure the site settings.

From the CMS home page, click on "Site settings". You'll see a lot of settings,
but you should only need to change a few of them.

1. **Locale**: Set the Language and Date Locale settings to whatever makes sense
   for your site. The defaults are `en` and `en-GB` because the starter site is
   written in English and uses day-month-year date display conventions, but use
   whichever language you write in and whichever date convention you prefer.
   Make sure that you use valid
   [BCP 47](https://developer.mozilla.org/en-US/docs/Glossary/BCP_47_language_tag)
   values. A few thousand of the most common ones (e.g. `en-US`) are preloaded
   and will autocomplete as you type them.
2. **Site Name**: You'll want to change the site name from "Lume site" to
   something else. If your site is a personal website, maybe set it to your full
   name (e.g. "Ethan Marks").
3. **Favicon**: The default favicon is a capital T[^T is for **T**ufte!] in the
   colors and font that TufteCSS uses[^Which I extracted directly from the
   [font SVG files](https://github.com/edwardtufte/et-book/blob/gh-pages/et-book/et-book-roman-line-figures/et-book-roman-line-figures.svg).],
   but you'll probably want to change it. Click "Browse...", select your image
   in the file explorer, type in a filename for it (e.g. `custom_icon.png`), and
   press enter. Your image will be uploaded and set as the new favicon. It will
   automatically be optimized and downscaled by the
   [Favicon](https://lume.land/plugins/favicon/) plugin.
4. **Header**: If you dislike the site header I designed, feel free to
   completely disable it by unchecking `enabled`. If not, you'll want to
   customize the header links. By default, one of the links points to the
   [Tufte theme GitHub page](https://github.com/ethmarks/lume_tufte), which
   probably isn't relevant to your site, so you'll want to change or remove it.
   If your site doesn't use a particular page (e.g. the [About](/about) page),
   removing it from the header is a good way to disable it from the CMS. You can
   also add as many header links as you want, though be forewarned that adding
   too many will probably cause layout issues.

### Blog Posts

Now let's write the actual content of your site. Open "Blog Posts" from the CMS
home.

Initially, you'll see three blog posts, including this one. You'll obviously
want to delete them, which you can do by opening each one, clicking the button
next to "Save changes" that looks like three dots in a vertical line, and
clicking "Delete".

Now you'll want to create a post of your own. Click "Create new" from the[]
(staBlog Posts page.

1. **Filename**: Choose a filename for your page. This is where the post will be
   physically stored in your project, but more importantly it'll determine the
   final URL. I personally prefer to use [short slugs](https://qntm.org/urls)
   (e.g. `/usage`), but you can hyphenate the title or use some other format if
   you want (e.g. `/using-this-theme`). Just make sure not to use spaces or
   other URL-unsafe characters. Also, you'll need to end the filename with
   `.md`, or else Lume won't process it correctly. The final filename should be
   something like `mypost.md`.
2. **Metadata**: Set the title, author, and publication date of your post. The
   title can be whatever you want, but it is mandatory. The author and
   publication date fields are optional though recommended. If you don't provide
   them, they just won't be displayed.
3. **Content**: Now for the fun part. Or not, depending on how you feel about
   writing. You'll be writing the post content in
   [Markdown](https://www.markdownguide.org/). If you've used Markdown before,
   then you know exactly what to expect. If you haven't, it might take a bit of
   getting used to, but it's very easy to learn. Lume uses markdown-it, which is
   fully CommonMark compliant, but Tufte adds several plugins (some of which are
   custom) which add a bit of extra syntax for things like math blocks,
   sidenotes, collapsibles, and more. See the [Syntax Section](#syntax) for more
   information.

You might notice that Lume CMS displays a preview of the page you're editing in
the left half of the screen. Depending on how you're running the CMS[^It _will_
work on localhost or on a VPS, but not on Deno Deploy or similar.], the preview
may or may not reflect your changes as you make them, which is not only very
cool, but also very helpful for seeing how your text will _actually_ look on
your site without having to constantly switch tabs.

## Configuring Plugins

Configuring Tufte's included plugins is not possible from the CMS. You'll have
to modify your `_config.ts` file to pass options to the plugins.

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
