import { useEffect, useState, type ReactNode } from "react";
import { CATEGORIES, PREFIXES, codes, sonyErrorSearch, type Category, type ErrorCode } from "./codes.ts";
import { Mark, MoonIcon, SunIcon } from "./icons.tsx";
import { LegalPage } from "./legal.tsx";
import { copy, fill, isLang, resolveLang, type Copy, type Lang } from "./messages.ts";
import {
  filtersAreOpen,
  lookupCodes,
  openFilters,
  passesFilter,
  readSearchQuery,
  shortList,
  withQuery,
  type CategoryFilter,
  type Filters,
  type PlatformFilter,
  type PrefixFilter,
} from "./search.ts";

type Theme = "light" | "dark";
type Page = "home" | "impressum" | "datenschutz";

function readPage(): Page {
  const hash = location.hash.replace(/^#\/?/, "");
  if (hash === "impressum") return "impressum";
  if (hash === "datenschutz") return "datenschutz";
  return "home";
}

function readLang(): Lang {
  try {
    return resolveLang(localStorage.getItem("consolecheat-lang"));
  } catch {
    return "de";
  }
}

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyLang(next: Lang) {
  document.documentElement.lang = next;
  document.documentElement.dir = "ltr";
  localStorage.setItem("consolecheat-lang", next);
}

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  localStorage.setItem("consolecheat-theme", next);
  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute("content", next === "light" ? "#f4f1eb" : "#07090e");
}

function categoryLabel(t: Copy, category: Category): string {
  switch (category) {
    case "network":
      return t.catNetwork;
    case "system":
      return t.catSystem;
    case "account":
      return t.catAccount;
    case "storage":
      return t.catStorage;
    case "application":
      return t.catApplication;
    case "disc":
      return t.catDisc;
    case "payment":
      return t.catPayment;
    case "update":
      return t.catUpdate;
  }
}

function pillClass(on: boolean): string {
  return on
    ? "h-11 rounded-lg border border-accent bg-accent px-4 text-sm font-medium text-accent-fg"
    : "h-11 rounded-lg border border-line bg-surface px-4 text-sm font-medium text-fg";
}

export function App() {
  const [lang, setLang] = useState<Lang>(readLang);
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [page, setPage] = useState<Page>(readPage);
  const [query, setQuery] = useState(() => readSearchQuery(location.search));
  const [filters, setFilters] = useState<Filters>(openFilters);
  const t = copy[lang];

  useEffect(() => {
    applyLang(lang);
  }, [lang]);

  useEffect(() => {
    const sync = () => setPage(readPage());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    const name = page === "impressum" ? "Impressum" : page === "datenschutz" ? "Datenschutz" : t.title;
    document.title = `${name} · consolecheat`;
    if (page !== "home") window.scrollTo(0, 0);
  }, [page, t.title]);

  useEffect(() => {
    const next = withQuery(location.pathname, location.search, location.hash, query);
    const current = `${location.pathname}${location.search}${location.hash}`;
    if (next !== current) history.replaceState(null, "", next);
  }, [query]);

  const found = lookupCodes(query);
  const matched = found.status === "match" ? found.entries.filter((entry) => passesFilter(entry, filters)) : [];
  const list = shortList(matched);
  const browse = codes.filter((entry) => passesFilter(entry, filters)).slice().sort((a, b) => a.code.localeCompare(b.code));
  const text = (entry: ErrorCode) => entry[lang];

  let status = "";
  if (found.status === "unknown") status = `${t.unknownTitle} ${fill(t.unknownBody, { query })}`;
  else if (found.status === "match" && matched.length === 0) status = `${t.filteredTitle} ${t.filteredBody}`;
  else if (found.status === "match" && list.total === 1) {
    const only = list.shown[0];
    if (only) status = `${only.code}. ${text(only).summary}`;
  } else if (found.status === "match") status = fill(t.listStatus, { shown: list.shown.length, total: list.total });
  else status = fill(t.checked, { count: browse.length });

  function setPrefix(prefix: PrefixFilter) {
    setFilters((current) => ({ ...current, prefix }));
  }

  function setPlatform(platform: PlatformFilter) {
    setFilters((current) => ({ ...current, platform }));
  }

  function setCategory(category: CategoryFilter) {
    setFilters((current) => ({ ...current, category }));
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="https://consolecheat.com" className="flex min-w-0 items-center gap-3">
            <Mark />
            <span className="truncate font-display text-lg font-semibold tracking-tight">{t.brand}</span>
          </a>
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="lang">
              {t.language}
            </label>
            <select
              id="lang"
              value={lang}
              onChange={(event) => {
                if (isLang(event.target.value)) setLang(event.target.value);
              }}
              className="h-11 w-32 rounded-lg border border-line bg-surface px-2 text-sm text-fg sm:w-36"
            >
              {languageOptions()}
            </select>
            <button
              type="button"
              aria-label={theme === "dark" ? t.themeLight : t.themeDark}
              onClick={() => {
                const next = theme === "dark" ? "light" : "dark";
                setTheme(next);
                applyTheme(next);
              }}
              className="inline-flex size-11 items-center justify-center rounded-lg border border-line bg-surface text-fg"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>

      {page === "home" ? (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="eyebrow text-xs font-medium uppercase text-steel">{t.eyebrow}</p>
          <h1 className="display-title mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed break-words text-muted">{t.lede}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <p className="panel rounded-xl px-4 py-4 text-base font-medium leading-relaxed text-fg">{t.freeClaim}</p>
            <p className="panel rounded-xl px-4 py-4 text-base font-medium leading-relaxed text-fg">{t.privacyClaim}</p>
          </div>
          <p className="mt-4 text-sm text-subtle">{t.unofficial}</p>

          <section className="mt-10" aria-labelledby="lookup-heading">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="lookup-heading" className="font-display text-2xl font-semibold tracking-tight">
                {t.section}
              </h2>
              <p className="text-sm text-subtle">{fill(t.checked, { count: codes.length })}</p>
            </div>

            <form
              role="search"
              className="mt-4"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <label htmlFor="q" className="text-sm font-medium">
                {t.searchLabel}
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  id="q"
                  name="q"
                  value={query}
                  data-testid="search"
                  autoComplete="off"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="search"
                  placeholder={t.placeholder}
                  aria-describedby="search-hint"
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-12 w-full min-w-0 rounded-lg border border-line bg-surface px-3 font-mono text-lg text-fg sm:flex-1"
                />
                {query ? (
                  <button type="button" onClick={() => setQuery("")} className={pillClass(false)}>
                    {t.clear}
                  </button>
                ) : null}
              </div>
              <p id="search-hint" className="mt-2 text-sm leading-relaxed break-words text-subtle">
                {t.searchHint}
              </p>
            </form>

            <div className="mt-4 flex flex-col gap-4">
              <FilterRow label={t.prefixLegend}>
                <FilterButton on={filters.prefix === "all"} onClick={() => setPrefix("all")}>
                  {t.all}
                </FilterButton>
                {PREFIXES.map((prefix) => (
                  <FilterButton key={prefix} on={filters.prefix === prefix} onClick={() => setPrefix(prefix)}>
                    {prefix}
                  </FilterButton>
                ))}
              </FilterRow>
              <FilterRow label={t.platformLegend}>
                <FilterButton on={filters.platform === "all"} onClick={() => setPlatform("all")}>
                  {t.all}
                </FilterButton>
                <FilterButton on={filters.platform === "PS4"} onClick={() => setPlatform("PS4")}>
                  PS4
                </FilterButton>
                <FilterButton on={filters.platform === "PS5"} onClick={() => setPlatform("PS5")}>
                  PS5
                </FilterButton>
              </FilterRow>
              <FilterRow label={t.categoryLegend}>
                <FilterButton on={filters.category === "all"} onClick={() => setCategory("all")}>
                  {t.all}
                </FilterButton>
                {CATEGORIES.map((category) => (
                  <FilterButton key={category} on={filters.category === category} onClick={() => setCategory(category)}>
                    {categoryLabel(t, category)}
                  </FilterButton>
                ))}
              </FilterRow>
              {filtersAreOpen(filters) ? null : (
                <div>
                  <button type="button" onClick={() => setFilters(openFilters)} className={pillClass(false)}>
                    {t.clearFilters}
                  </button>
                </div>
              )}
            </div>

            <p role="status" aria-live="polite" data-testid="status" className="mt-4 text-sm break-words text-muted">
              {status}
            </p>

            <div className="mt-4" data-testid="results">
              {found.status === "unknown" ? (
                <Unknown t={t} query={query} lang={lang} />
              ) : found.status === "match" && matched.length === 0 ? (
                <div className="panel rounded-xl px-4 py-4" data-testid="filtered">
                  <p className="text-lg font-medium">{t.filteredTitle}</p>
                  <p className="mt-2 break-words text-muted">{t.filteredBody}</p>
                  <button type="button" className={`${pillClass(true)} mt-4`} onClick={() => setFilters(openFilters)}>
                    {t.clearFilters}
                  </button>
                </div>
              ) : found.status === "match" && list.total === 1 && list.shown[0] ? (
                <Detail entry={list.shown[0]} t={t} lang={lang} />
              ) : found.status === "match" ? (
                <div>
                  <ResultList entries={list.shown} lang={lang} t={t} onPick={setQuery} />
                  {list.total > list.shown.length ? <p className="mt-3 text-sm text-subtle">{t.listMore}</p> : null}
                </div>
              ) : (
                <Browse entries={browse} lang={lang} t={t} onPick={setQuery} />
              )}
            </div>
          </section>
        </main>
      ) : (
        <LegalPage
          page={page}
          homeLabel={t.title}
          homeHref={`${import.meta.env.BASE_URL}${location.search}`}
          onHome={(event) => {
            event.preventDefault();
            history.pushState(null, "", `${location.pathname}${location.search}`);
            setPage("home");
            window.scrollTo(0, 0);
          }}
        />
      )}

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm leading-relaxed text-subtle sm:px-6">
          <p className="text-fg">{t.brand}</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Impressum und Datenschutz">
            <a href="#impressum" className="text-steel underline-offset-4 hover:underline">
              Impressum
            </a>
            <a href="#datenschutz" className="text-steel underline-offset-4 hover:underline">
              Datenschutz
            </a>
          </nav>
          <p>{t.freeClaim}</p>
          <p>{t.privacyClaim}</p>
          <p>{t.footerNote}</p>
        </div>
      </footer>
    </div>
  );
}

function languageOptions() {
  return (
    <>
      <option value="de">Deutsch</option>
      <option value="en">English</option>
    </>
  );
}

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  const id = `filter-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <p id={id} className="text-sm font-medium text-subtle">
        {label}
      </p>
      <div role="group" aria-labelledby={id} className="mt-2 flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

function FilterButton({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={pillClass(on)}>
      {children}
    </button>
  );
}

function Detail({ entry, t, lang }: { entry: ErrorCode; t: Copy; lang: Lang }) {
  const body = entry[lang];
  return (
    <article className="panel rounded-xl p-4 sm:p-6" data-testid="detail" data-code={entry.code}>
      <p className="flex flex-wrap gap-2">
        <span className="region-pill region-eu">{entry.platform}</span>
        <span className="region-pill region-int">{categoryLabel(t, entry.category)}</span>
      </p>
      <h3 className="mt-3 break-all font-mono text-3xl font-semibold tracking-tight">{entry.code}</h3>
      <p className="mt-3 text-lg leading-relaxed break-words">{body.summary}</p>
      <h4 className="mt-5 font-display text-lg font-semibold tracking-tight">{t.tryHeading}</h4>
      <p className="mt-2 leading-relaxed break-words text-muted">{body.steps}</p>
      <p className="mt-4 text-sm leading-relaxed break-words text-subtle">{t.paraphraseNote}</p>
      <p className="mt-3">
        <a
          href={entry.source}
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="break-all text-steel underline-offset-4 hover:underline"
        >
          {t.sourceLink}
          <span className="sr-only"> ({t.newTab})</span>
        </a>
      </p>
    </article>
  );
}

function Unknown({ t, query, lang }: { t: Copy; query: string; lang: Lang }) {
  return (
    <div className="panel rounded-xl px-4 py-4" data-testid="unknown">
      <p className="text-lg font-medium">{t.unknownTitle}</p>
      <p className="mt-2 break-words text-muted">{fill(t.unknownBody, { query })}</p>
      <p className="mt-4">
        <a
          href={sonyErrorSearch[lang]}
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="break-all text-steel underline-offset-4 hover:underline"
        >
          {t.sonySearch}
          <span className="sr-only"> ({t.newTab})</span>
        </a>
      </p>
    </div>
  );
}

function ResultList({
  entries,
  lang,
  t,
  onPick,
}: {
  entries: readonly ErrorCode[];
  lang: Lang;
  t: Copy;
  onPick: (code: string) => void;
}) {
  return (
    <ul className="grid gap-2" data-testid="list">
      {entries.map((entry) => (
        <li key={entry.code}>
          <button
            type="button"
            onClick={() => onPick(entry.code)}
            className="panel w-full rounded-xl px-4 py-3 text-start"
          >
            <span className="break-all font-mono text-lg font-semibold">{entry.code}</span>
            <span className="ms-2 text-sm text-subtle">{entry.platform}</span>
            <span className="ms-2 text-sm text-subtle">{categoryLabel(t, entry.category)}</span>
            <span className="mt-1 block break-words text-sm text-muted">{entry[lang].summary}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function Browse({
  entries,
  lang,
  t,
  onPick,
}: {
  entries: readonly ErrorCode[];
  lang: Lang;
  t: Copy;
  onPick: (code: string) => void;
}) {
  if (entries.length === 0) {
    return <p className="text-muted">{t.browseEmpty}</p>;
  }
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-subtle">{t.browseHint}</p>
      {PREFIXES.map((prefix) => {
        const group = entries.filter((entry) => entry.code.startsWith(`${prefix}-`));
        if (group.length === 0) return null;
        return (
          <section key={prefix} aria-labelledby={`prefix-${prefix}`}>
            <h3 id={`prefix-${prefix}`} className="font-display text-xl font-semibold tracking-tight">
              {prefix}
            </h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {group.map((entry) => (
                <li key={entry.code}>
                  <button
                    type="button"
                    onClick={() => onPick(entry.code)}
                    className="panel h-full w-full rounded-xl px-4 py-3 text-start"
                  >
                    <span className="break-all font-mono font-semibold">{entry.code}</span>
                    <span className="ms-2 text-sm text-subtle">{entry.platform}</span>
                    <span className="mt-1 block break-words text-sm text-muted">{entry[lang].summary}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
