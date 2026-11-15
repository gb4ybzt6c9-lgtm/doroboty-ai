# Publishing the prototype

How to publish this static prototype, check it and undo a bad release. The production-readiness report is [production-readiness.html](production-readiness.html) (Polish, offline).

## What is published

- `npm run build` produces static files in `dist/`. There is no server, database, API key or environment variable.
- Hash routes (`/#/...`) work on any static host without rewrite rules. `vite.config.ts` uses `base: "./"`, so the site also works in a subfolder.
- Visitor data stays in each visitor's own browser (localStorage). Publishing a new version never deletes it; the storage key is versioned (`doroboty.prototype.v1`) and incompatible saves are protected from overwriting.
- `index.html` sets `robots: noindex, nofollow`; the footer says the offers and companies are examples.

## Host settings (any static host, e.g. Netlify)

| Setting           | Value                                                   |
| ----------------- | ------------------------------------------------------- |
| Branch            | the chosen branch (`main` by default)                   |
| Build command     | `npm ci && npm run build`                               |
| Publish directory | `dist`                                                  |
| Node.js           | 24 (from `.nvmrc`; set it if the host ignores `.nvmrc`) |

No secrets or environment variables are needed. Do not add any to a frontend build: everything in `dist/` is public.

## Before publishing

1. `./scripts/verify` passes on the exact commit (Node 24, provisioned Playwright Chromium).
2. Note the commit hash you publish. The host's deploy page should show the same hash.

## Smoke check right after publishing (about 5 minutes)

1. Open the published address over `https://` and confirm the padlock and no browser warning.
2. Home page shows offers; the footer reads "Wersja demonstracyjna. Wszystkie oferty i firmy są przykładowe."
3. Open an offer, choose Anna Kowalska, send an application, reload: the application is still listed.
4. Choose Karolina Wiśniewska (employer), open Kandydaci, open Anna's record, change the stage, reload: the stage stays.
5. Open a deep link such as `/#/oferty/ai-product-manager` in a new private window: the offer opens.
6. Open the page on a phone (or 390 px wide window): menu and filters work.
7. Browser developer console shows no red errors on these pages.

Roll back (below) if step 1–5 fails and the cause is not obvious within a few minutes.

## Rolling back

- Static hosts keep previous deploys. On Netlify: Deploys → choose the last working deploy → "Publish deploy". Other hosts have an equivalent "redeploy/promote previous" action.
- Without host history: `git revert` the bad commit (or check out the previous good commit on a branch), push, and let the host rebuild.
- Rolling back only replaces files. Data in testers' browsers is untouched; a tester can reset it in `/#/app/settings` ("Resetuj scenariusz") or restore an exported file ("Importuj").

## When something breaks

1. Reproduce it in a private window and note the address, the persona and the steps.
2. A broken screen shows "Ten ekran nie mógł się wyświetlić" with reload and settings links instead of a blank page. Open the browser console for the error name; never paste personal text into a report.
3. A tester working in two tabs sees a notice that data changed in another tab; reloading the page shows the latest saved state.
4. Check the host's deploy log if the whole site is down or shows an old version.
5. If the last deploy caused it, roll back first, then fix locally and run `./scripts/verify` before publishing again.
6. Tell the testers (the same channel used to send them the link) what happened and whether to reload or reset.

Owner: the participant who publishes the prototype; record the confirmed owner and contact in the readiness report.
