/**
 * Prepared (simulated) practitioner interview cards for the "Pierwsze rozmowy z praktykiem AI"
 * add-on. No model or real interview produces them; they are fixed scenario content.
 */
export const PRACTITIONER_ADDON = {
  name: "Pierwsze rozmowy z praktykiem AI",
  betaPricePln: 300,
  targetPricePln: 600,
  candidatesPerJob: "3–5",
  minutes: 20,
  deliveryHours: 48,
} as const;

export type Recommendation = "invite" | "ask_first";

export const recommendationLabels: Record<Recommendation, string> = {
  invite: "Zaprosić na rozmowę",
  ask_first: "Dopytać przed zaproszeniem",
};

export type PractitionerCard = {
  practitioner: string;
  heldAt: string;
  recommendation: Recommendation;
  reason: string;
  confirmed: string[];
  notDone: string[];
  unknown: string[];
  questions: string[];
};

const cards: Record<string, PractitionerCard> = {
  "candidate-anna": {
    practitioner: "Ewa Lis, praktyczka AI Product (postać fikcyjna)",
    heldAt: "2026-11-04T10:00:00.000Z",
    recommendation: "ask_first",
    reason:
      "Mocna w badaniach i priorytetyzacji. Samodzielnej pracy z rozwiązaniem AI było mniej, niż sugeruje CV.",
    confirmed: [
      "Sama zaplanowała i przeprowadziła 18 wywiadów z użytkownikami. Podała przykłady pytań i wniosków.",
      "Sama ustalała priorytety backlogu i potrafiła uzasadnić dwie decyzje „nie robimy”.",
      "Wyjaśniła, jak policzono skrócenie obsługi o 30% (mediana czasu przed i po wdrożeniu, 3 miesiące).",
    ],
    notDone: [
      "Nie konfigurowała asystenta i nie oceniała jakości jego odpowiedzi. Zrobił to zespół dostawcy.",
      "Nie decydowała o wyborze modelu ani narzędzi.",
    ],
    unknown: [
      "Jak reaguje, gdy asystent odpowiada błędnie u klienta. Nie było jej przy monitoringu po wdrożeniu.",
      "Czy pracowała z oceną jakości odpowiedzi AI w innym projekcie.",
    ],
    questions: [
      "Opowiedz o sytuacji, w której asystent dawał złe odpowiedzi. Kto to zauważył i co zrobiliście?",
      "Jak sprawdziłabyś jakość odpowiedzi asystenta przed wdrożeniem u nas?",
      "Które decyzje w projekcie asystenta podjęłaś sama, a które dostawca?",
    ],
  },
  "candidate-marek": {
    practitioner: "Ewa Lis, praktyczka AI Product (postać fikcyjna)",
    heldAt: "2026-11-04T11:00:00.000Z",
    recommendation: "invite",
    reason:
      "Pokazał samodzielne decyzje w automatyzacji i rzetelnie opisał, czego nie robił. Zakres pracy potwierdził szczegółami.",
    confirmed: [
      "Sam wybrał trzy kategorie zgłoszeń do automatyzacji na podstawie danych o wolumenie i błędach.",
      "Sam ustalił sposób mierzenia: czas pierwszej odpowiedzi, porównanie z grupą bez automatyzacji.",
      "Raz w tygodniu przeglądał z zespołem wsparcia błędne odpowiedzi i poprawiał reguły.",
    ],
    notDone: ["Nie programował integracji z modelem. Zrobili to dwaj programiści z jego zespołu."],
    unknown: [
      "Jak prowadzi większy zespół. Dotąd pracował z pięcioma osobami.",
      "Czy pracował z klientami spoza B2B.",
    ],
    questions: [
      "Jak zdecydowałbyś, którą część naszego procesu zautomatyzować najpierw?",
      "Opowiedz o regule, którą wycofałeś. Po czym poznałeś, że nie działa?",
    ],
  },
};

/** Returns the prepared card for a candidate, or undefined when the scenario has none. */
export function practitionerCard(candidateId: string): PractitionerCard | undefined {
  return cards[candidateId];
}
