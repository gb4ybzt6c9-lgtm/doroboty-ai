# doroboty-ui theme layer (participant decision, branch `motyw-doroboty-ui`)

The participant asked for the prototype screens in her own design system (`docs/doroboty-ui-pakiet`, v1.18) instead of Poster People. `src/app/theme-doroboty-ui.css` is imported last and re-maps host tokens (colours, fonts, radii, contours) to the coral system; the practitioner add-on and card use its recommendation palette and two style-A illustrations (`src/features/prototype/illustrations.tsx`). Contour colours in host CSS now read `--host-contour` (defaults to the previous ink), so removing the import restores Poster People.

Evidence: format, lint, typecheck, unit tests, build and the full Playwright suite pass. Four Poster People visual assertions (canvas colour, panel radius and contour) were updated to the theme values. The homepage hero illustration still uses the Poster People people drawing.
