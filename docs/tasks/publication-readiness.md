# Publication readiness check (AIPH3 week 4)

Author: Agnieszka (course participant). Run of the `production-readiness` skill (superhero-skills 7f3b205) on the prototype before its first public deploy.

## Intent

Get a report showing nothing important blocks publishing the prototype, fix blockers the first audit found, and re-run the audit.

## Blockers found in the first audit and fixes

1. Public link looked like a real job portal: the footer lacked the Poster People C12 demo notice. Restored "Wersja demonstracyjna. Wszystkie oferty i firmy są przykładowe." (`noindex` already present).
2. Two open tabs silently overwrote each other's saved scenario. The store now listens to the `storage` event for its key, stops saving in the stale tab and shows a notice to reload.
3. An unexpected render error blanked the whole page. `ScreenErrorBoundary` wraps routes (inside the shell, so navigation remains) and the app root, with reload/offers/settings actions.
4. No release, smoke, rollback or recovery procedure. Added `docs/release.md`.

## Acceptance criteria

- Footer notice is visible on public pages at desktop and mobile widths.
- After another tab saves, the first tab shows the notice and does not overwrite the other tab's data; reload shows the newer state.
- A thrown render error shows the error screen with working actions; reload restores the app.
- `./scripts/verify` passes; FEATURES.md updated (PUB-10, SYS-09, SYS-10, SYS-12).

## Version decision (2026-11-11)

The quest does not name a version. The participant chose her own doroboty-ui design system, so `motyw-doroboty-ui` was merged into this branch and the audit was re-run on that version (19/20 preparation requirements). The Arena scenario (practitioner add-on → recommendations → card → note → stage after reload) passes on it, and 17 routes at 390 px show no horizontal scroll.

## Open (needs the participant)

- Confirm the incident owner and contact.
- After deployment: run the report again with the production URL (deployment stage).
