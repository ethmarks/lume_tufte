import sass from "lume/plugins/sass.ts";
import basePath from "lume/plugins/base_path.ts";
import metas from "lume/plugins/metas.ts";
import readingInfo from "lume/plugins/reading_info.ts";
import search from "lume/plugins/search.ts";
import imageSize from "lume/plugins/image_size.ts";
import {
  type Options as SitemapOptions,
  sitemap,
} from "lume/plugins/sitemap.ts";
import {
  favicon,
  type Options as FaviconOptions,
} from "lume/plugins/favicon.ts";
import { katex, type Options as KatexOptions } from "lume/plugins/katex.ts";
import {
  default as nueglow,
  type Options as NueglowOptions,
} from "https://cdn.jsdelivr.net/gh/ethmarks/lume_nueglow@v1.1.1/mod.ts";

import {
  markdown,
  type Options as MarkdownOptions,
} from "lume/plugins/markdown.ts";
import anchorPlugin from "npm:markdown-it-anchor@^9.2.0";
import collapsiblePlugin from "npm:markdown-it-collapsible@^2.0.2";
import {
  type MarkdownItSmartMediaOptions,
  smartMediaPlugin,
} from "jsr:@ethmarks/markdown-it-smart-media@^1.2.0";
import tufteSectionsPlugin from "./mdit/tufte-sections.ts";
import tufteNotesPlugin from "./mdit/tufte-notes.ts";

import { merge } from "lume/core/utils/object.ts";

import "lume/types.ts";

interface SmartMediaOptions extends MarkdownItSmartMediaOptions {
  enabled: boolean;
}

export interface Options {
  sitemap?: Partial<SitemapOptions>;
  favicon?: Partial<FaviconOptions>;
  markdown?: Partial<MarkdownOptions>;
  katex?: Partial<KatexOptions>;
  nueglow?: Partial<NueglowOptions>;
  smartMedia?: Partial<SmartMediaOptions>;
}

export const defaults: Options = {
  favicon: {
    input: "uploads/favicon.svg",
  },
  markdown: {
    plugins: [
      anchorPlugin,
      collapsiblePlugin,
      tufteSectionsPlugin,
      tufteNotesPlugin,
    ],
    options: {
      typographer: true,
    },
  },
  nueglow: {
    css: "file",
    numbered: true,
    theme: "onedark",
  },
  smartMedia: {
    enabled: true,
    imageAttrs:
      'image-size loading="lazy" decoding="async" fetchpriority="auto" class="responsive"',
  },
  katex: {
    cssFile: "/katex.css",
    fontsFolder: "/assets/fonts",
  },
};

/** Configure the site */
export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Lume.Site) => {
    // Adds
    site.add("style.scss");
    site.add("assets/fonts");
    site.add("uploads");

    // Markdown Plugins
    if (options.markdown.plugins && options.smartMedia.enabled) {
      // deno-lint-ignore no-unused-vars
      const { enabled, ...smartMediaOptions } = options.smartMedia;
      options.markdown.plugins.push([smartMediaPlugin, smartMediaOptions]);
    }

    // Plugins
    site.use(katex(options.katex));
    site.use(markdown(options.markdown));
    site.use(sass());
    site.use(imageSize());
    site.use(basePath());
    site.use(metas());
    site.use(readingInfo());
    site.use(search());
    site.use(sitemap(options.sitemap));
    site.use(favicon(options.favicon));
    site.use(nueglow(options.nueglow));
  };
}
