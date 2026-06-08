import lume from "lume/mod.ts";

// Plugin Imports
import sass from "lume/plugins/sass.ts";
import basePath from "lume/plugins/base_path.ts";
import metas from "lume/plugins/metas.ts";
import sitemap from "lume/plugins/sitemap.ts";
import favicon from "lume/plugins/favicon.ts";

const site = lume({ src: "./src" });

// Adds
site.add("assets/style.scss");
site.add("assets/fonts");

// Plugins
site.use(sass());
site.use(basePath());
site.use(metas());
site.use(sitemap());
site.use(favicon({ input: "assets/favicon.svg" }));

export default site;
