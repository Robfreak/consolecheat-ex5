# Fehlercode-Nachschlager

Standalone lookup for common PlayStation 4 and PlayStation 5 error codes, built to sit next to [consolecheat.com](https://consolecheat.com). German is the default language. English is the other language. The same light and dark theme, self-hosted fonts, footer, Impressum, and Datenschutz pattern as the Controller-Tester are included. There is no Webmail link.

No account, no tracking, nothing uploaded. The code you type stays in the browser tab. Language and theme are the only things kept locally (`consolecheat-lang`, `consolecheat-theme`), same keys as the hub. Fonts are self-hosted, so the page does not call Google or any other third party while it loads. The Impressum fields are placeholders until the operator fills them in.

Expected site: <https://robfreak.github.io/consolecheat-ex5/>

Inoffiziell. Nicht von Sony.

## What it does

Type a PS4 or PS5 error code. The page shows a short explanation in our own words and links the official Sony support page for that code.

The list is curated. It has **89** codes, checked one by one against an individual page on playstation.com. Prefixes are CE-, NW-, SU-, WS-, and NP-, on PS4 and PS5. A PS5 code with the E- prefix was not on the official PS5 list (E2- exists and is a different prefix), so E- is left out. An unknown code gets a notice and a link to Sony’s error-code search. The page does not guess.

Search is tolerant. `ce348780`, `CE 34878 0`, and `ce-34878-0` all open CE-34878-0. A shorter prefix such as `CE-348` shows a short list. `?q=` prefills the field on load, and typing updates the address with `history.replaceState`.

You can also browse by prefix (CE, NW, SU, WS, NP), console, and category (network, system, account, storage, game and app, disc, payment, update).

## Run and test

```bash
npm test        # normalization, matching, ?q=, unknown codes, data check
npm run dev     # http://127.0.0.1:5173/consolecheat-ex5/
npm run build   # typecheck and Vite build, base /consolecheat-ex5/
```

Node `>=22.6` (`package.json` `engines`).

Try these in the page:

| Query | Result |
| --- | --- |
| `CE-34878-0`, `ce348780`, or `CE 34878 0` | PS4. A game or app closed because of an error. Source: the Sony page for CE-34878-0. |
| `?q=ce-108255-1` | Field is filled on load. PS5. A game or app reported an error. |
| `NW-31254-5` | PS4. DNS answered too late or not at all. |
| `SU-30746-0` | PS4. System update failed. |
| `WS-116329-2` | PS5. Sign-in ID and password do not match. |
| `NP-36006-5` | PS4. Trophy data may be damaged. |
| `CE-100028-1` | PS5. Internal SSD is out of space. |
| `CE-348` | Short list, including CE-34878-0 and CE-34867-8. |
| `CE-00000-0` | Not in the list. Notice, plus Sony’s official search. No guess. |

## Data sources

Every code was opened on an official PlayStation support page and kept only when that page returned HTTP 200 (checked 2026-10-22):

- <https://www.playstation.com/en-us/support/error-codes/> (hub)
- <https://www.playstation.com/en-us/support/error-codes/ps4/> and the same path for PS5 (which codes are common)
- `https://www.playstation.com/en-us/support/error-codes/ps4/<code>/` or `.../ps5/<code>/` (the source stored on each entry)

The German search link for unknown codes is <https://www.playstation.com/de-de/support/error-codes/>. The English one is the en-us hub above.

The sentences in the app are paraphrased. They are not Sony’s text. The linked page is the source that counts.

## GitHub Pages

`.github/workflows/pages.yml` runs the tests and the production build on pull requests and on every push. A push to `main` also pushes `dist/` to the orphan branch `gh-pages` (`peaceiris/actions-gh-pages`, Jekyll off).

Vite `base` is `/consolecheat-ex5/`, which matches a project site at `https://robfreak.github.io/consolecheat-ex5/`.

The Actions token can update `gh-pages` only when Actions has write permission. It often cannot turn Pages on. Lennart does this once:

1. **Settings → Actions → General → Workflow permissions → Read and write permissions.** Save.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch.**
3. **Branch: `gh-pages`, folder: `/ (root)`.** Save.
4. Merge to `main`. The workflow fills `gh-pages`. The first deploy can take a minute.

Replace the Impressum placeholders with the operator’s real details before treating that page as a legal notice. No name or address was invented.
