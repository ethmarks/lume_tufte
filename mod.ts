import plugins, { type Options } from "./plugins.ts";

import "lume/types.ts";

export default function (options: Partial<Options> = {}) {
  return (site: Lume.Site) => {
    // Configure the site
    site.use(plugins(options));

    // Add the remote files.
    //
    // Important note: these are NOT the files that are to be automatically
    // copied into the user's site dir on initialization. These files will
    // _always_ be remotely present as long as the theme is enabled and cannot
    // be removed (though they can be overridden).

    const dirs = ["assets", "_components", "_includes"];
    dirs.forEach((dir) => {
      site.remote(`/${dir}`, import.meta.resolve(`./src/${dir}`), ["/**/*"]);
    });

    const files = ["style.scss", "_data.yml", "blog/_data.yml"];
    files.forEach((file) => {
      site.remote(file, import.meta.resolve(`./src/${file}`));
    });
  };
}
