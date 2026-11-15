# Publish the prototype on Netlify

Requested by Agnieszka (week 5 quest): publish the prototype on Netlify under a working HTTPS address.

## Intent

Add `netlify.toml` so a Netlify project connected to this repository picks up the build settings from `docs/release.md` without manual configuration.

## Acceptance criteria

- Netlify builds with Node 24, runs `npm run build` (Netlify installs dependencies from `package-lock.json` first) and publishes `dist/`.
- No environment variables or secrets are added.
- Hash routes work without redirect rules (`base: "./"`, `/#/...`).
- After deploy, the smoke check from `docs/release.md` passes on the production `.netlify.app` address.

## FEATURES.md

Reviewed: hosting configuration only, no product behavior change, register not updated.
