import CMS from "lume/cms/mod.ts";

// For suggesting locale fields.
import localeCodes from "npm:locale-codes@^1.3.1";
const allLangCodes = localeCodes.all.map((l) => l.tag);

const cms = CMS({
  site: {
    name: "Lume Tufte CMS",
    description: "My Lume site built with Tufte theme",
    body:
      '<p>Welcome to Lume Tufte!</p><p>See the <a href="https://ethmarks.github.io/lume_tufte/blog/usage#lume-cms">Tufte theme CMS guide</a> for more information on how to use Lume CMS with this theme.</p>',
  },
});

const BLOGLIST_FIELD: Lume.CMS.Field = {
  name: "blogList",
  label: "Blog List",
  description:
    'The settings for the blogList component, which is inserted at the placeholder "/BLOGLIST/" in the content.',
  type: "object",
  fields: [
    {
      name: "filter",
      type: "hidden",
      value: "layout=layouts/blog-single.vto",
    },
    {
      name: "order",
      label: "Order",
      type: "text",
      description:
        `How the posts should be sorted. See the <a href="https://lume.land/plugins/search/#sort-the-results">"Sort the results" section</a> of Lume's Search plugin docs for more information.`,
    },
    {
      name: "limit",
      label: "Limit",
      type: "number",
      description:
        `How many posts to display. To display all posts, enter "0". See the <a href="https://lume.land/plugins/search/#limit-the-results">"Limit the results" section</a> of Lume's Search plugin docs for more information.`,
    },
    {
      name: "showAuthor",
      label: "Show Author",
      type: "checkbox",
      description: `Whether to display the author of each post.`,
    },
    {
      name: "showDate",
      label: "Show Date",
      type: "checkbox",
      description: `Whether to display the publication date of each post.`,
    },
    {
      name: "showMins",
      label: "Show Reading Time",
      type: "checkbox",
      description: `Whether to display the time to read of each post.`,
    },
  ],
};

cms.document({
  name: "Site settings",
  description: "Settings for the site",
  store: "src:_data.yml",
  fields: [
    {
      name: "lang",
      label: "Language",
      type: "text",
      description:
        'The locale code representing the language of the site. For example, "en" represents English. See <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang">this MDN page</a> for more information.',
      options: allLangCodes,
    },

    {
      name: "dateLocale",
      label: "Date Locale",
      type: "text",
      description:
        'The locale used for displaying dates. For example, the date "2014-09-15" will be displayed as "Sep 15, 2014" using "en-US", but it will be displayed as "15 Sep 2014" using "en-GB". See <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/toLocaleString#locales">this MDN page</a> for more information.',
      options: allLangCodes,
    },
    {
      name: "metas",
      label: "Metas",
      description:
        'Settings for the <a href="https://lume.land/plugins/metas/">Metas plugin</a>',
      type: "object",
      fields: [
        {
          name: "site",
          type: "text",
          description: "The name of the site.",
        },
        {
          name: "twitter",
          type: "text",
          description: "The twitter username.",
        },
        {
          name: "fediverse",
          type: "text",
          description: "The fediverse username (for author attribution).",
        },
        {
          name: "generator",
          type: "checkbox",
          description:
            'Whether to list "Lume" in a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name#generator">generator meta tag</a>.',
        },
        {
          name: "robots",
          type: "checkbox",
          description:
            'Whether to tell web crawlers to crawl your site. See <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/robots">this MDN page</a> for more information.',
        },
        {
          name: "icon",
          type: "file",
          description: "The icon of the site.",
        },
        "lang: hidden",
      ],
    },
    {
      name: "header",
      label: "Header",
      description: "Settings for the site header",
      type: "object",
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          description: "Whether to render the header.",
        },
        {
          name: "highlightActive",
          type: "checkbox",
          description:
            "Whether to highlight the currently active section in the nav. With the default header styles, this is rendered by lowering the text underline.",
        },
        {
          name: "items",
          type: "object-list",
          description:
            "The nav items. Remember to prefix links to within your site with a forward slash (/).",
          fields: [
            "title: text",
            "url: text",
          ],
        },
      ],
    },
  ],
});

cms.document({
  name: "Homepage",
  description: "Main page of the site",
  store: "src:index.md",
  fields: [
    {
      name: "layout",
      type: "hidden",
      value: "layouts/home.vto",
    },
    {
      name: "title",
      label: "Title",
      type: "text",
    },
    BLOGLIST_FIELD,
    {
      name: "content",
      label: "Content",
      type: "markdown",
    },
  ],
});

cms.document({
  name: "Blog Index",
  description: "Page listing all blog posts",
  store: "src:blog.md",
  fields: [
    {
      name: "layout",
      type: "hidden",
      value: "layouts/blog-index.vto",
    },
    {
      name: "title",
      label: "Title",
      type: "text",
    },
    BLOGLIST_FIELD,
    {
      name: "content",
      label: "Content",
      type: "markdown",
    },
  ],
});

cms.collection(
  {
    name: "blog",
    label: "Blog Posts",
    description: "Your site's blog posts",
    store: "src:blog/*.md",
    fields: [
      {
        name: "title",
        label: "Title",
        type: "text",
      },
      {
        name: "author",
        type: "text",
        label: "Author",
      },
      {
        name: "date",
        type: "date",
        label: "Publication Date",
      },
      {
        name: "content",
        label: "Content",
        type: "markdown",
      },
    ],
  },
);

cms.document({
  name: "404 Page",
  description: "404 not found page",
  store: "src:404.md",
  fields: [
    {
      name: "layout",
      type: "hidden",
      value: "layouts/base.vto",
    },
    {
      name: "url",
      type: "hidden",
      value: "/404.html",
    },
    {
      name: "title",
      label: "Title",
      type: "text",
    },
    {
      name: "content",
      label: "Content",
      type: "markdown",
    },
  ],
});

cms.upload("uploads: Uploaded files", "src:uploads");

export default cms;
