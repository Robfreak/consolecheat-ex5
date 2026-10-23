export const languageOptions = [
  { id: "de", label: "Deutsch" },
  { id: "en", label: "English" },
] as const;

export type Lang = (typeof languageOptions)[number]["id"];

export type Copy = {
  brand: string;
  title: string;
  eyebrow: string;
  lede: string;
  freeClaim: string;
  privacyClaim: string;
  unofficial: string;
  footerNote: string;
  themeDark: string;
  themeLight: string;
  language: string;
  section: string;
  checked: string;
  searchLabel: string;
  searchHint: string;
  placeholder: string;
  clear: string;
  prefixLegend: string;
  platformLegend: string;
  categoryLegend: string;
  all: string;
  catNetwork: string;
  catSystem: string;
  catAccount: string;
  catStorage: string;
  catApplication: string;
  catDisc: string;
  catPayment: string;
  catUpdate: string;
  tryHeading: string;
  paraphraseNote: string;
  sourceLink: string;
  newTab: string;
  listStatus: string;
  listMore: string;
  unknownTitle: string;
  unknownBody: string;
  sonySearch: string;
  filteredTitle: string;
  filteredBody: string;
  clearFilters: string;
  browseEmpty: string;
  browseHint: string;
};

const shared = { brand: "consolecheat", title: "Fehlercode-Nachschlager" } as const;

function pack(text: Omit<Copy, "brand" | "title">): Copy {
  return { ...shared, ...text };
}

const de = pack({
  eyebrow: "PlayStation · im Browser",
  lede: "PS4- oder PS5-Fehlercode eingeben, zum Beispiel CE-34878-0. Du bekommst eine kurze Erklärung in unseren Worten und den Link zur offiziellen Sony-Seite. Nichts wird gespeichert oder gesendet.",
  freeClaim: "Komplett kostenlos. Auf dieser Seite kostet nichts Geld.",
  privacyClaim: "Keine Daten werden gespeichert oder gesendet. Die Suche bleibt in diesem Tab.",
  unofficial: "Inoffiziell. Nicht von Sony.",
  footerNote: "Bezahlt wird nirgends. Diese Seite ist nicht Sony.",
  themeDark: "Dunkel",
  themeLight: "Hell",
  language: "Sprache",
  section: "Nachschlagen",
  checked: "{count} geprüfte Codes",
  searchLabel: "Fehlercode",
  searchHint: "Groß- und Kleinschreibung, Leerzeichen und Bindestriche spielen keine Rolle. CE348780 und CE-34878-0 sind derselbe Code.",
  placeholder: "CE-34878-0",
  clear: "Eingabe löschen",
  prefixLegend: "Präfix",
  platformLegend: "Konsole",
  categoryLegend: "Kategorie",
  all: "Alle",
  catNetwork: "Netzwerk",
  catSystem: "System",
  catAccount: "Konto",
  catStorage: "Speicher",
  catApplication: "Spiel und App",
  catDisc: "Disc",
  catPayment: "Zahlung",
  catUpdate: "Update",
  tryHeading: "Was du versuchen kannst",
  paraphraseNote: "Kurzfassung in unseren Worten. Maßgeblich ist die verlinkte Sony-Seite.",
  sourceLink: "Offizielle Sony-Seite zu diesem Code",
  newTab: "öffnet in einem neuen Tab",
  listStatus: "{shown} von {total} passenden Codes.",
  listMore: "Tipp den Code weiter, um die Liste einzugrenzen.",
  unknownTitle: "Diesen Code haben wir nicht geprüft.",
  unknownBody: "Für „{query}“ gibt es hier keinen Eintrag. Wir raten nicht, was er bedeuten könnte.",
  sonySearch: "Offizielle Fehlersuche von Sony",
  filteredTitle: "Der Filter blendet den Treffer aus.",
  filteredBody: "Zum Suchbegriff gibt es geprüfte Codes, die aktuelle Auswahl zeigt sie nicht.",
  clearFilters: "Filter zurücksetzen",
  browseEmpty: "In dieser Auswahl liegt kein Code.",
  browseHint: "Code antippen, um die Kurzfassung zu öffnen.",
});

const en = pack({
  eyebrow: "PlayStation · in the browser",
  lede: "Enter a PS4 or PS5 error code, for example CE-34878-0. You get a short explanation in our own words and the link to the official Sony page. Nothing is stored or sent.",
  freeClaim: "Completely free. Nothing on this site costs money.",
  privacyClaim: "Nothing is stored or sent. The search stays in this tab.",
  unofficial: "Unofficial. Not Sony.",
  footerNote: "Nothing is paid here. This site is not Sony.",
  themeDark: "Dark",
  themeLight: "Light",
  language: "Language",
  section: "Look up",
  checked: "{count} checked codes",
  searchLabel: "Error code",
  searchHint: "Case, spaces, and dashes are ignored. CE348780 and CE-34878-0 are the same code.",
  placeholder: "CE-34878-0",
  clear: "Clear input",
  prefixLegend: "Prefix",
  platformLegend: "Console",
  categoryLegend: "Category",
  all: "All",
  catNetwork: "Network",
  catSystem: "System",
  catAccount: "Account",
  catStorage: "Storage",
  catApplication: "Game and app",
  catDisc: "Disc",
  catPayment: "Payment",
  catUpdate: "Update",
  tryHeading: "What to try",
  paraphraseNote: "Short version in our own words. The linked Sony page is the source that counts.",
  sourceLink: "Official Sony page for this code",
  newTab: "opens in a new tab",
  listStatus: "{shown} of {total} matching codes.",
  listMore: "Keep typing the code to narrow the list.",
  unknownTitle: "We have not checked this code.",
  unknownBody: "There is no entry for “{query}”. We will not guess what it means.",
  sonySearch: "Sony's official error-code search",
  filteredTitle: "The filter is hiding the match.",
  filteredBody: "Checked codes match this search, and the current selection hides them.",
  clearFilters: "Reset filters",
  browseEmpty: "No code in this selection.",
  browseHint: "Choose a code to open the short version.",
});

export const copy: Record<Lang, Copy> = { de, en };

const ids = new Set<string>(languageOptions.map((item) => item.id));

export function isLang(value: string | null): value is Lang {
  return value !== null && ids.has(value);
}

/** German unless this browser already stored Deutsch or English for consolecheat. */
export function resolveLang(stored: string | null): Lang {
  if (stored === "de" || stored === "en") return stored;
  return "de";
}

export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}
