import assert from "node:assert/strict";
import test from "node:test";
import { CATEGORIES, PLATFORMS, PREFIXES, codes, sonyErrorSearch } from "./codes.ts";
import { copy, fill, resolveLang } from "./messages.ts";
import {
  SHORT_LIST_LIMIT,
  lookupCodes,
  normalizeCode,
  passesFilter,
  readSearchQuery,
  shortList,
  withQuery,
} from "./search.ts";

test("normalization ignores case, spaces, and dashes", () => {
  const expected = "CE348780";
  assert.equal(normalizeCode("ce348780"), expected);
  assert.equal(normalizeCode("CE 34878 0"), expected);
  assert.equal(normalizeCode("ce-34878-0"), expected);
  assert.equal(normalizeCode("  CE–34878–0  "), expected);
  assert.equal(normalizeCode("ＣＥ－３４８７８－０"), expected);
  assert.equal(normalizeCode("---"), "");
});

test("exact codes match through missing separators", () => {
  for (const typed of ["ce348780", "CE 34878 0", "ce-34878-0"]) {
    const found = lookupCodes(typed);
    assert.equal(found.status, "match");
    if (found.status !== "match") continue;
    assert.equal(found.entries.length, 1);
    assert.equal(found.entries[0]?.code, "CE-34878-0");
    assert.equal(found.normalized, "CE348780");
  }
});

test("a partial prefix returns a short list and does not guess inside the code", () => {
  const found = lookupCodes("CE-348");
  assert.equal(found.status, "match");
  if (found.status !== "match") return;
  const names = found.entries.map((entry) => entry.code);
  assert.ok(names.includes("CE-34878-0"));
  assert.ok(names.includes("CE-34867-8"));
  assert.ok(found.entries.length > 1);
  assert.ok(found.entries.length <= 8);
  const listed = shortList(found.entries);
  assert.ok(listed.shown.length <= SHORT_LIST_LIMIT);
  assert.equal(listed.total, found.entries.length);

  const broad = lookupCodes("CE");
  assert.equal(broad.status, "match");
  if (broad.status !== "match") return;
  assert.ok(broad.entries.length > SHORT_LIST_LIMIT);
  const capped = shortList(broad.entries);
  assert.equal(capped.shown.length, SHORT_LIST_LIMIT);
  assert.equal(capped.shown[0]?.code, "CE-34878-0");

  const middle = lookupCodes("34878");
  assert.equal(middle.status, "unknown");
});

test("unknown codes stay unknown", () => {
  for (const typed of ["CE-00000-0", "ZZ-99999-9", "NP-00000-0", "CE-34878-0-extra", "hello"]) {
    const found = lookupCodes(typed);
    assert.equal(found.status, "unknown", typed);
  }
  assert.equal(lookupCodes("   ").status, "idle");
  assert.equal(lookupCodes("").status, "idle");
});

test("?q= is read, written, and cleared without dropping the hash", () => {
  assert.equal(readSearchQuery("?q=ce348780"), "ce348780");
  assert.equal(readSearchQuery("?q="), "");
  assert.equal(readSearchQuery(""), "");
  assert.equal(readSearchQuery("?lang=de&q=CE-34878-0"), "CE-34878-0");

  const href = withQuery("/consolecheat-ex5/", "", "", "CE 34878 0");
  assert.equal(href, "/consolecheat-ex5/?q=CE+34878+0");
  assert.equal(readSearchQuery(href.slice(href.indexOf("?"))), "CE 34878 0");

  assert.equal(
    withQuery("/consolecheat-ex5/", "?q=old", "#impressum", "CE-34878-0"),
    "/consolecheat-ex5/?q=CE-34878-0#impressum",
  );
  assert.equal(withQuery("/consolecheat-ex5/", "?q=old", "", "  "), "/consolecheat-ex5/");

  const fromLink = readSearchQuery("?q=ce-108255-1");
  const loaded = lookupCodes(fromLink);
  assert.equal(loaded.status, "match");
  if (loaded.status === "match") assert.equal(loaded.entries[0]?.code, "CE-108255-1");
});

test("filters narrow a match and can hide it", () => {
  const found = lookupCodes("CE-34878-0");
  assert.equal(found.status, "match");
  if (found.status !== "match") return;
  const visible = found.entries.filter((entry) => passesFilter(entry, { prefix: "CE", platform: "PS4", category: "application" }));
  assert.equal(visible.length, 1);
  const hidden = found.entries.filter((entry) => passesFilter(entry, { prefix: "all", platform: "PS5", category: "all" }));
  assert.equal(hidden.length, 0);
});

test("German is the default language", () => {
  assert.equal(resolveLang(null), "de");
  assert.equal(resolveLang("fr"), "de");
  assert.equal(resolveLang("en"), "en");
  assert.equal(resolveLang("de"), "de");
  assert.equal(copy.de.unofficial, "Inoffiziell. Nicht von Sony.");
  assert.equal(copy.de.title, "Fehlercode-Nachschlager");
  assert.match(copy.de.freeClaim, /kostenlos/);
  assert.match(fill(copy.de.unknownBody, { query: "ZZ-1" }), /ZZ-1/);
  const keys = Object.keys(copy.de);
  for (const key of keys) {
    const value = copy.en[key as keyof typeof copy.en];
    assert.equal(typeof value, "string");
    assert.ok(value.trim().length > 0, key);
  }
});

test("every entry has a code, German and English text, and an official Sony source", () => {
  assert.equal(codes.length, 89);
  const seen = new Set<string>();
  const platforms = new Set<string>(PLATFORMS);
  const categories = new Set<string>(CATEGORIES);
  const prefixes = new Set<string>(PREFIXES);
  const normalized = codes.map((entry) => normalizeCode(entry.code));

  for (const entry of codes) {
    assert.match(entry.code, /^(CE|NW|SU|WS|NP)-\d{5,6}-\d$/);
    assert.equal(seen.has(entry.code), false, entry.code);
    seen.add(entry.code);
    assert.ok(platforms.has(entry.platform), entry.code);
    assert.ok(categories.has(entry.category), entry.code);
    const prefix = entry.code.slice(0, 2);
    assert.ok(prefixes.has(prefix), entry.code);

    for (const lang of ["de", "en"] as const) {
      assert.ok(entry[lang].summary.trim().length > 10, `${entry.code} ${lang} summary`);
      assert.ok(entry[lang].steps.trim().length > 10, `${entry.code} ${lang} steps`);
    }
    assert.notEqual(entry.de.summary, entry.en.summary, entry.code);

    const url = new URL(entry.source);
    assert.equal(url.protocol, "https:");
    assert.match(url.hostname, /(^|\.)playstation\.com$/);
    const slug = entry.platform === "PS4" ? "ps4" : "ps5";
    assert.equal(url.pathname, `/en-us/support/error-codes/${slug}/${entry.code.toLowerCase()}/`);
  }

  for (let i = 0; i < normalized.length; i += 1) {
    for (let j = 0; j < normalized.length; j += 1) {
      if (i !== j) assert.equal(normalized[j]?.startsWith(normalized[i] ?? "x"), false);
    }
  }

  for (const href of [sonyErrorSearch.de, sonyErrorSearch.en]) {
    const url = new URL(href);
    assert.equal(url.protocol, "https:");
    assert.match(url.hostname, /(^|\.)playstation\.com$/);
  }
});
