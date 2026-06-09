import sass from "lume/plugins/sass.ts";
import basePath from "lume/plugins/base_path.ts";
import metas from "lume/plugins/metas.ts";
import date from "lume/plugins/date.ts";
import readingInfo from "lume/plugins/reading_info.ts";
import { Options as SitemapOptions, sitemap } from "lume/plugins/sitemap.ts";
import { favicon, Options as FaviconOptions } from "lume/plugins/favicon.ts";

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
}

export const defaults: Options = {
  favicon: {
    input: "assets/favicon.svg",
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
    site.use(sitemap(options.sitemap));
    site.use(favicon(options.favicon));

    // Markdown Config
    site.use(markdown({ plugins: mditPlugins }));
  };
}
