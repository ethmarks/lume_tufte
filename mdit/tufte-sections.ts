/**
 * Inspired by markdown-it-header-sections, but modified to work with Tufte CSS's format for <section>s.
 */

import type MarkdownIt from "npm:markdown-it@14.2.0";

export default function tufteSectionsPlugin(md: MarkdownIt): void {
  md.core.ruler.push("tufte_sections", (state) => {
    const tokens = [];
    let inSection = false;
    let inH1 = false;
    let inSubtitle = false;

    // Helper to generate a <section> token
    const openSection = () => {
      const t = new state.Token("section_open", "section", 1);
      t.block = true;
      return t;
    };

    // Helper to generate a </section> token
    const closeSection = () => {
      const t = new state.Token("section_close", "section", -1);
      t.block = true;
      return t;
    };

    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i];

      // 1. Keep <h1> and its contents outside of <section> tags
      if (token.type === "heading_open" && token.tag === "h1") {
        if (inSection) {
          tokens.push(closeSection());
          inSection = false;
        }
        inH1 = true;
        tokens.push(token);
        continue;
      }

      if (token.type === "heading_close" && token.tag === "h1") {
        inH1 = false;
        tokens.push(token);
        continue;
      }

      if (inH1) {
        tokens.push(token);
        continue;
      }

      // 2. Keep Subtitles outside of <section> tags (Raw HTML block)
      if (
        token.type === "html_block" &&
        token.content.includes('class="subtitle"')
      ) {
        if (inSection) {
          tokens.push(closeSection());
          inSection = false;
        }
        tokens.push(token);
        continue;
      }

      // 3. Keep Subtitles outside (Markdown-it-attrs style: `{.subtitle}`)
      if (
        token.type === "paragraph_open" &&
        token.attrs?.some((a) => a[0] === "class" && a[1].includes("subtitle"))
      ) {
        if (inSection) {
          tokens.push(closeSection());
          inSection = false;
        }
        inSubtitle = true;
        tokens.push(token);
        continue;
      }

      if (token.type === "paragraph_close" && inSubtitle) {
        inSubtitle = false;
        tokens.push(token);
        continue;
      }

      if (inSubtitle) {
        tokens.push(token);
        continue;
      }

      // 4. Handle <h2>: Close current section (if any) and open a new one
      // Notice we do NOT strip the ID from the <h2> token like the old plugin did.
      if (token.type === "heading_open" && token.tag === "h2") {
        if (inSection) {
          tokens.push(closeSection());
        }
        tokens.push(openSection());
        inSection = true;
        tokens.push(token);
        continue;
      }

      // 5. If we hit general content (like the intro) and aren't in a section, open one
      if (!inSection) {
        tokens.push(openSection());
        inSection = true;
      }

      tokens.push(token);
    }

    // Close any trailing section at the end of the document
    if (inSection) {
      tokens.push(closeSection());
    }

    state.tokens = tokens;
  });
}
