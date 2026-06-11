import sass from "lume/plugins/sass.ts";
import basePath from "lume/plugins/base_path.ts";
import metas from "lume/plugins/metas.ts";
import date from "lume/plugins/date.ts";
import readingInfo from "lume/plugins/reading_info.ts";
import search from "lume/plugins/search.ts";
import {
  type Options as SitemapOptions,
  sitemap,
} from "lume/plugins/sitemap.ts";
import {
  favicon,
  type Options as FaviconOptions,
} from "lume/plugins/favicon.ts";
import {
  default as nueglow,
  type Options as NueglowOptions,
} from "https://cdn.jsdelivr.net/gh/ethmarks/lume_nueglow@v1.1.1/mod.ts";

import type MarkdownIt from "npm:markdown-it@^14.1.0";
import markdown from "lume/plugins/markdown.ts";
import anchorPlugin from "npm:markdown-it-anchor@^9.2.0";
import collapsiblePlugin from "npm:markdown-it-collapsible@^2.0.2";
import katexPlugin from "npm:markdown-it-katex@^2.0.3";

import { merge } from "lume/core/utils/object.ts";

import "lume/types.ts";

export interface Options {
  sitemap?: Partial<SitemapOptions>;
  favicon?: Partial<FaviconOptions>;
  nueglow?: Partial<NueglowOptions>;
}

export const defaults: Options = {
  favicon: {
    input: "assets/favicon.svg",
  },
  nueglow: {
    css: "file",
    numbered: true,
    theme: "onedark",
  },
};

type mditPlugin = (md: MarkdownIt) => void;

/** Configure the site */
export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  const mditPlugins: mditPlugin[] = [
    anchorPlugin,
    collapsiblePlugin,
    katexPlugin,
  ];

  return (site: Lume.Site) => {
    // Adds
    site.add("style.scss");
    site.add("assets/fonts");

    // Plugins
    site.use(sass());
    site.use(basePath());
    site.use(metas());
    site.use(date());
    site.use(readingInfo());
    site.use(search());
    site.use(sitemap(options.sitemap));
    site.use(favicon(options.favicon));
    site.use(nueglow(options.nueglow));

    // Markdown Config
    site.use(markdown({ plugins: mditPlugins }));
  };
}
