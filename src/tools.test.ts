import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { copy } from "./messages.ts";
import { otherTools, toolLabel } from "./tools.ts";

const labels = [
  "Title-ID-Finder",
  "PS-Plus-Archiv",
  "Controller-Tester",
  "Save-Info-Leser",
  "Spiele-Merkliste",
  "Bildschirm-Test",
] as const;

const hrefs = [
  "https://robfreak.github.io/consolecheat-ex1/",
  "https://robfreak.github.io/consolecheat-ex2/",
  "https://robfreak.github.io/consolecheat-ex3/",
  "https://robfreak.github.io/consolecheat-ex4/",
  "https://robfreak.github.io/consolecheat-ex6/",
  "https://robfreak.github.io/consolecheat-ex6/bildschirm/",
] as const;

test("the footer names the other tools in German and English", () => {
  assert.equal(copy.de.moreTools, "Weitere Werkzeuge");
  assert.equal(copy.en.moreTools, "More tools");
  assert.equal(otherTools.length, labels.length);
  assert.deepEqual(
    otherTools.map((tool) => tool.href),
    [...hrefs],
  );
  for (const lang of ["de", "en"] as const) {
    assert.deepEqual(
      otherTools.map((tool) => toolLabel(tool, lang)),
      [...labels],
    );
  }

  const seen = new Set<string>();
  for (const tool of otherTools) {
    assert.equal(seen.has(tool.id), false, tool.id);
    seen.add(tool.id);
    const url = new URL(tool.href);
    assert.equal(url.protocol, "https:");
    assert.equal(url.hostname, "robfreak.github.io");
    assert.equal(tool.href.includes("consolecheat-ex5"), false, tool.href);
    assert.equal(tool.href.includes("consolecheat.com"), false, tool.href);
  }
});

test("loading the page does not request a third party", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const main = readFileSync(new URL("./main.tsx", import.meta.url), "utf8");
  const app = readFileSync(new URL("./App.tsx", import.meta.url), "utf8");
  const styles = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

  for (const source of [html, main, styles]) {
    assert.equal(/https?:/.test(source), false);
    assert.equal(source.includes("googleapis"), false);
    assert.equal(source.includes("fonts.google"), false);
  }

  assert.equal(/\b(fetch|XMLHttpRequest|WebSocket|preconnect|dns-prefetch|prefetch)\b/.test(app), false);
  assert.equal(app.includes("googleapis"), false);
  assert.equal(app.includes("fonts.google"), false);
  assert.match(app, /otherTools\.map/);
  assert.match(app, /sourceFor\(entry, lang\)/);
  assert.match(app, /sonyErrorSearch\[lang\]/);
});
