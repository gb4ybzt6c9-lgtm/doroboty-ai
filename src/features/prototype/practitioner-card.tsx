import { Button } from "@/components/ui/button";
import { recommendationLabels, type PractitionerCard, type Recommendation } from "./practitioner";

const dateFormat = new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium", timeStyle: "short" });

export function RecommendationPill({ recommendation }: { recommendation: Recommendation }) {
  return (
    <span className="practitioner-pill" data-recommendation={recommendation}>
      Rekomendacja praktyka: {recommendationLabels[recommendation]}
    </span>
  );
}

function CardList({ id, title, items }: { id: string; title: string; items: string[] }) {
  return (
    <section className="practitioner-list" aria-labelledby={id}>
      <h4 id={id}>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

/** Reading-tab content for the simulated practitioner interview card. */
export function PractitionerCardView({
  card,
  onUseQuestions,
}: {
  card: PractitionerCard;
  onUseQuestions?: () => void;
}) {
  return (
    <div className="practitioner-card">
      <h3>Karta po rozmowie z praktykiem</h3>
      <p className="record-caption">
        Rozmowa z praktykiem: 20 minut ·{" "}
        <time dateTime={card.heldAt}>{dateFormat.format(new Date(card.heldAt))}</time> ·{" "}
        {card.practitioner}
      </p>
      <div className="practitioner-recommendation">
        <RecommendationPill recommendation={card.recommendation} />
        <p>{card.reason}</p>
      </div>
      <CardList
        id="practitioner-confirmed"
        title="Zrobione samodzielnie i potwierdzone w rozmowie"
        items={card.confirmed}
      />
      <CardList id="practitioner-not-done" title="Czego nie robił(a)" items={card.notDone} />
      <CardList id="practitioner-unknown" title="Czego nie wiemy" items={card.unknown} />
      <CardList
        id="practitioner-questions"
        title="O co dopytać na Waszej rozmowie"
        items={card.questions}
      />
      {onUseQuestions && (
        <Button type="button" variant="outline" onClick={onUseQuestions}>
          Wstaw pytania do notatki rekrutacyjnej
        </Button>
      )}
      <p className="record-caption practitioner-disclaimer">
        Rekomendacja praktyka pomaga w wyborze. Decyzję o zaproszeniu podejmujesz Ty. Prototyp:
        karta jest przygotowanym przykładem, nie wynikiem modelu AI ani prawdziwej rozmowy.
      </p>
    </div>
  );
}
