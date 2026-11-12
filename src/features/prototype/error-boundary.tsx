import { Component, type ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";

/**
 * Keeps an unexpected rendering failure from blanking the whole page.
 * Scenario data stays in localStorage; the fallback only offers reload and navigation.
 * Nothing is logged beyond React's default console report (no private free text).
 */
export class ScreenErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    window.addEventListener("hashchange", this.recover, { once: true });
  }
  componentWillUnmount() {
    window.removeEventListener("hashchange", this.recover);
  }
  recover = () => this.setState({ failed: false });
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="prototype-section" aria-labelledby="screen-error-title">
        <h1 id="screen-error-title">Ten ekran nie mógł się wyświetlić</h1>
        <p className="my-5">
          Dane scenariusza w tej przeglądarce nie zostały usunięte. Odśwież stronę albo przejdź do
          ofert. Jeśli błąd się powtarza, pobierz dane w ustawieniach i opisz kroki, które
          doprowadziły do błędu.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className={buttonVariants()}
            onClick={() => window.location.reload()}
          >
            Odśwież stronę
          </button>
          <a className={buttonVariants({ variant: "outline" })} href="#/oferty">
            Wróć do ofert
          </a>
          <a className={buttonVariants({ variant: "outline" })} href="#/app/settings">
            Ustawienia danych
          </a>
        </div>
      </section>
    );
  }
}
