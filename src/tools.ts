import type { Lang } from "./messages.ts";

export type ToolLink = {
  id: string;
  href: string;
  de: string;
  en: string;
};

/**
 * The other consolecheat tools. This page (Fehlercode-Nachschlager) is not in
 * the list. These are ordinary links: nothing here is fetched when the page loads.
 */
export const otherTools: readonly ToolLink[] = [
  {
    id: "title-id-finder",
    href: "https://robfreak.github.io/consolecheat-ex1/",
    de: "Title-ID-Finder",
    en: "Title-ID-Finder",
  },
  {
    id: "ps-plus-archiv",
    href: "https://robfreak.github.io/consolecheat-ex2/",
    de: "PS-Plus-Archiv",
    en: "PS-Plus-Archiv",
  },
  {
    id: "controller-tester",
    href: "https://robfreak.github.io/consolecheat-ex3/",
    de: "Controller-Tester",
    en: "Controller-Tester",
  },
  {
    id: "save-info-leser",
    href: "https://robfreak.github.io/consolecheat-ex4/",
    de: "Save-Info-Leser",
    en: "Save-Info-Leser",
  },
  {
    id: "spiele-merkliste",
    href: "https://robfreak.github.io/consolecheat-ex6/",
    de: "Spiele-Merkliste",
    en: "Spiele-Merkliste",
  },
  {
    id: "bildschirm-test",
    href: "https://robfreak.github.io/consolecheat-ex6/bildschirm/",
    de: "Bildschirm-Test",
    en: "Bildschirm-Test",
  },
];

export function toolLabel(tool: ToolLink, lang: Lang): string {
  return tool[lang];
}
