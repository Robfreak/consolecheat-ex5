import { codes, type Category, type ErrorCode, type Platform, type Prefix } from "./codes.ts";

export const SHORT_LIST_LIMIT = 8;

const FEATURED = [
  "CE-34878-0",
  "CE-108255-1",
  "CE-36329-3",
  "CE-34335-8",
  "NW-31201-7",
  "NW-31254-5",
  "SU-30746-0",
  "CE-100028-1",
  "WS-37504-9",
  "WS-116329-2",
  "NP-36006-5",
  "CE-33986-9",
];

const featuredRank = new Map(FEATURED.map((code, index) => [code, index]));

export type LookupResult =
  | { status: "idle"; normalized: string }
  | { status: "unknown"; normalized: string }
  | { status: "match"; normalized: string; entries: ErrorCode[] };

export type PrefixFilter = "all" | Prefix;
export type PlatformFilter = "all" | Platform;
export type CategoryFilter = "all" | Category;

export type Filters = {
  prefix: PrefixFilter;
  platform: PlatformFilter;
  category: CategoryFilter;
};

export const openFilters: Filters = { prefix: "all", platform: "all", category: "all" };

/** Drop case, spaces, dashes, and any other separator. */
export function normalizeCode(input: string): string {
  return input.normalize("NFKC").replace(/[^0-9A-Za-z]/g, "").toUpperCase();
}

export function readSearchQuery(search: string): string {
  const raw = search.startsWith("?") ? search.slice(1) : search;
  return new URLSearchParams(raw).get("q") ?? "";
}

export function withQuery(pathname: string, search: string, hash: string, query: string): string {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const trimmed = query.trim();
  if (trimmed) params.set("q", trimmed);
  else params.delete("q");
  const qs = params.toString();
  const hashPart = hash ? (hash.startsWith("#") ? hash : `#${hash}`) : "";
  return `${pathname}${qs ? `?${qs}` : ""}${hashPart}`;
}

function featuredThenCode(a: ErrorCode, b: ErrorCode): number {
  const ar = featuredRank.get(a.code) ?? FEATURED.length;
  const br = featuredRank.get(b.code) ?? FEATURED.length;
  if (ar !== br) return ar - br;
  return a.code.localeCompare(b.code);
}

export function lookupCodes(query: string, catalog: readonly ErrorCode[] = codes): LookupResult {
  const normalized = normalizeCode(query);
  if (!normalized) return { status: "idle", normalized };
  const entries = catalog.filter((entry) => normalizeCode(entry.code).startsWith(normalized));
  entries.sort(featuredThenCode);
  if (entries.length === 0) return { status: "unknown", normalized };
  return { status: "match", normalized, entries };
}

export function shortList<T>(items: readonly T[], limit = SHORT_LIST_LIMIT): { shown: T[]; total: number } {
  return { shown: items.slice(0, limit), total: items.length };
}

export function passesFilter(entry: ErrorCode, filters: Filters): boolean {
  if (filters.prefix !== "all" && !entry.code.startsWith(filters.prefix + "-")) return false;
  if (filters.platform !== "all" && entry.platform !== filters.platform) return false;
  if (filters.category !== "all" && entry.category !== filters.category) return false;
  return true;
}

export function filtersAreOpen(filters: Filters): boolean {
  return filters.prefix === "all" && filters.platform === "all" && filters.category === "all";
}
