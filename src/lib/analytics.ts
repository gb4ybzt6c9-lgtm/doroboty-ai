/**
 * Optional PostHog browser analytics.
 *
 * Analytics only starts when the build has `VITE_POSTHOG_KEY` (a public project key, `phc_...`).
 * Local development, tests and forks without the variable send nothing.
 *
 * Privacy:
 * - Autocapture never records what people type into fields; recordings mask every input.
 * - Any element with the `ph-no-capture` class (and everything inside it) is skipped by
 *   Autocapture and blocked in session recordings. Use it around candidate data, profiles,
 *   notes and application forms.
 * - No `identify` calls and no person profiles: visitors stay anonymous.
 */
export async function initAnalytics() {
  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
  if (!key) return;
  // Loaded on demand so builds without a key do not ship the library in the main bundle.
  const { default: posthog } = await import("posthog-js");
  posthog.init(key, {
    api_host:
      (import.meta.env.VITE_POSTHOG_HOST as string | undefined) || "https://eu.i.posthog.com",
    defaults: "2026-08-30",
    // Newer PostHog defaults strip URL hashes; keep them so events show the screen (/#/oferty).
    disable_capture_url_hashes: false,
    // Screens are hash routes, so a hash change counts as a new pageview.
    capture_pageview: { path: true, hash: true },
    autocapture: true,
    person_profiles: "identified_only",
    mask_all_element_attributes: true,
    session_recording: {
      maskAllInputs: true,
      blockClass: "ph-no-capture",
    },
  });
}
