# Connect PostHog to the published prototype

Requested by Agnieszka (week 6 quest): see a production pageview and click in PostHog Activity → Live.

## Intent

Add posthog-js browser analytics with Autocapture, optional session recording and privacy masking, configured through public build-time environment variables on Netlify.

## Acceptance criteria

- Analytics starts only when `VITE_POSTHOG_KEY` is set; local dev, tests and forks send nothing.
- Pageviews are captured on every hash route change; button and link clicks via Autocapture.
- Input values are never captured; session recordings mask all inputs.
- Profile, application form, application list and application/candidate records carry `ph-no-capture` (no Autocapture, blocked in recordings).
- No identify calls; visitors stay anonymous.
- Privacy page (`/#/polityka-prywatnosci`) describes what analytics records.
- docs/release.md lists the Netlify variables; FEATURES.md SYS-03, PUB-09, OPS-11 and limits updated.
- After deploy, PostHog Activity → Live shows `$pageview` and `$autocapture` from the production address (manual check by the participant).
