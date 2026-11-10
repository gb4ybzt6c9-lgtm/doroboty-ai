# Practitioner interview add-on (AIPH3 participant prototype)

Author: Agnieszka (course participant). Based on her own discovery (Supersprint week 2: repeat purchase) — opportunity O1 "Before inviting, I want to know what the candidate really did", idea I1, test E1.

## Intent

Employers (non-technical recruiters) who drafted their next job ad did not buy it (draft → purchase 71/144 in May 2026 vs 50/144 in June 2026). Match Score no longer separates candidates (June 2026: 90+ scores continued after interview in 45/2 340 = 1.9%). Prototype a paid add-on: a human AI practitioner holds 20-minute first conversations and delivers a one-page card per candidate. Test whether the card changes whom the recruiter invites and whether they would pay.

## Scope

- Job editor: optional add-on with beta price, refund guarantee and simulated payment.
- Job list: add-on label.
- Candidate list: practitioner recommendation pill and reason.
- Employer candidate record: first tab "Karta praktyka" (confirmed / not done / unknown / questions, recommendation, disclaimer); button to append questions to the recruiting note.
- Apply page: transparency note for candidates.

## Acceptance criteria

1. Karolina (BrightLabs) can add the add-on to "AI Product Manager" and publish; the job list shows it.
2. After Anna applies, Karolina sees both candidates with recommendations; Marek (Match Score 72) is "Zaprosić na rozmowę", Anna (84) is "Dopytać przed zaproszeniem".
3. On the record, the card is the default tab; questions can be inserted into the note; stage changes (W przeglądzie → Zaproszenie na rozmowę) still work and persist after reload.
4. Jobs without the add-on behave exactly as before; old saves/imports parse.
5. Everything simulated is labelled as such in the UI.

## Evidence

- `npm run typecheck`, `npm run lint`, `npm test` (28 tests) and the full Playwright suite pass locally (Chromium, preview build).
- Desktop 1440 px and mobile 390 px screenshots reviewed for the add-on panel, candidate list, Anna/Marek cards and apply note.
