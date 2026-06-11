/**
 * Based on https://edwardtufte.github.io/tufte-css/#sidenotes
 */

import type MarkdownIt from "npm:markdown-it@^14.1.0";
import type StateInline from "npm:markdown-it@^14.1.0/lib/rules_inline/state_inline.mjs";
import type { Options as MarkdownItOptions } from "npm:markdown-it@^14.1.0";
import type Renderer from "npm:markdown-it@^14.1.0/lib/renderer.mjs";
import type Token from "npm:markdown-it@^14.1.0/lib/token.mjs";

export default function tufteNotesPlugin(md: MarkdownIt) {
  const prefix = "tufte";

  // We attach a counter to the md instance or env to keep track of note IDs across rendering
  let noteCounter = 0;

  // Inline parsing rule for [^ ... ] and [^* ... ]
  md.inline.ruler.after(
    "image",
    "tufte_notes",
    (state: StateInline, silent: boolean): boolean => {
      const max = state.posMax;
      const start = state.pos;

      // Check if it starts with '[^'
      if (
        start + 2 >= max || state.src.charCodeAt(start) !== 0x5B /* [ */ ||
        state.src.charCodeAt(start + 1) !== 0x5E /* ^ */
      ) {
        return false;
      }

      let pos = start + 2;
      let isMarginNote = false;

      // Check if it's a margin note (starts with '*')
      if (pos < max && state.src.charCodeAt(pos) === 0x2A /* * */) {
        isMarginNote = true;
        pos++;
      }

      // Find the closing ']'
      let level = 1;
      let found = false;
      const contentStart = pos;

      while (pos < max) {
        const code = state.src.charCodeAt(pos);
        if (code === 0x5B /* [ */) {
          level++;
        } else if (code === 0x5D /* ] */) {
          level--;
          if (level === 0) {
            found = true;
            break;
          }
        }
        pos++;
      }

      if (!found) return false;

      // If we're just validating (silent mode), return true early
      if (silent) return true;

      const content = state.src.slice(contentStart, pos).trim();
      noteCounter++;
      const noteId = `${prefix}-${isMarginNote ? "mn" : "sn"}-${noteCounter}`;

      // Update position in state past the closing ']'
      state.pos = pos + 1;

      // Create our custom open token
      const token = state.push("tufte_note", "", 0);
      token.meta = {
        id: noteId,
        isMarginNote,
        content,
      };

      return true;
    },
  );

  // Custom renderer for our token
  md.renderer.rules.tufte_note = (
    tokens: Token[],
    idx: number,
    _options: MarkdownItOptions,
    env: any,
    _self: Renderer,
  ) => {
    const meta = tokens[idx].meta;
    const { id, isMarginNote, content } = meta;

    // Create or clone the environment object to communicate down-funnel
    const nestedEnv = { ...env, tufte_nested: true };

    // Render internal markdown styling (like bold, links, italics)
    const renderedContent = md.renderInline(content, nestedEnv);

    if (isMarginNote) {
      // Margin note: Label only shows on mobile (via :not(.sidenote-number) CSS rule)
      return `<label for="${id}" class="margin-toggle">&#8853;</label>` +
        `<input type="checkbox" id="${id}" class="margin-toggle"/>` +
        `<span class="marginnote">${renderedContent}</span>`;
    } else {
      // Sidenote: Label shows on desktop and mobile to display the superscript number
      return `<label for="${id}" class="margin-toggle sidenote-number"></label>` +
        `<input type="checkbox" id="${id}" class="margin-toggle"/>` +
        `<span class="sidenote">${renderedContent}</span>`;
    }
  };
}
