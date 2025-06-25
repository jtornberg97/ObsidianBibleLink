import { Plugin } from "obsidian";

export default class AutoScriptureLinker extends Plugin {
  async onload() {
    this.registerMarkdownPostProcessor((el, ctx) => {
      const regex = /\b([1-3]?\s?[A-Za-z]+)\s(\d{1,3}):(\d{1,3})(?:[-–](\d{1,3}))?\b/g;

      el.querySelectorAll("p, li").forEach((element) => {
        element.innerHTML = element.innerHTML.replace(regex, (match, book, chapter, verse, endVerse) => {
          const passage = endVerse
            ? `${book} ${chapter}:${verse}-${endVerse}`
            : `${book} ${chapter}:${verse}`;
          const encoded = encodeURIComponent(passage);
          const url = `https://www.biblegateway.com/passage/?search=${encoded}&version=NRSV`;
          return `<a href="${url}" target="_blank">${match}</a>`;
        });
      });
    });
  }

  onunload() {
    console.log("AutoScriptureLinker plugin unloaded.");
  }
}
