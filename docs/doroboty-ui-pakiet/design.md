# DoRoboty.ai: design.md

Punkt wejścia dla agenta AI (Claude Code, Codex), który buduje albo poprawia ekrany panelu pracodawcy DoRoboty.ai. Przeczytaj ten plik w całości, zanim napiszesz kod. Wersja v1.18, 10.11.2026.

## 1. Co jest w pakiecie

| Plik | Do czego |
|---|---|
| `design.md` | ten plik: zasady, wybór komponentów, sposób sprawdzenia |
| `doroboty.css` | jedyne źródło stylów: tokeny `--dr-*`, komponenty `dr-*`, układy, stany, czcionki |
| `fonts/` | Bricolage Grotesque i DM Sans (woff2, polskie znaki, licencja SIL OFL 1.1). Musi leżeć obok `doroboty.css` |
| `doroboty.js` | zachowanie: dymek „Pokaż więcej” / specjalizacja, filtry segmentowe, `DRForm.invalid()` |
| `biblioteka.html` | działające przykłady każdego komponentu z kodem HTML do skopiowania |
| `przyklad-lista.html` | złożenie całego ekranu listy z komponentów |

Szczegółowa dokumentacja dla ludzi (wygląd, warianty, dostępność, źródła): `../04-dokumentacja/komponenty.html`. Pełny prototyp 9 widoków: `../02-ekrany/ekrany.html`. Źródło prawdy dla stylów to skill `7-Skills/doroboty-ui/` (SKILL.md + `assets/`). Ten folder jest jego kopią do przeniesienia. Po zmianie w skillu skopiuj `doroboty.css` i `fonts/` ponownie.

## 2. Jak podłączyć

```html
<link rel="stylesheet" href="doroboty.css">
…
<div class="dr">            <!-- wszystko, co ma wyglądać jak DoRoboty -->
  <div class="dr-app"> <nav class="dr-side">…</nav> <main class="dr-main">…</main> </div>
</div>
<script src="doroboty.js"></script>   <!-- na końcu body -->
```

- Folder `fonts/` musi być obok `doroboty.css` (ścieżka `fonts/…` w `@font-face`). Nie dodawaj linków do Google Fonts ani innych zewnętrznych zasobów.
- Działa w zwykłym HTML i w każdym frameworku. W React: zaimportuj `doroboty.css` raz w punkcie wejścia, używaj `className` z tymi samymi nazwami. Zachowanie z `doroboty.js` przenieś do komponentu albo uruchom skrypt po wyrenderowaniu (decyzja pakietu, do potwierdzenia w projekcie z frameworkiem).
- Podgląd lokalny: otwórz `biblioteka.html` w przeglądarce (dwuklik) albo `python3 -m http.server` w tym folderze i wejdź na `http://localhost:8000/biblioteka.html`.

## 3. Charakter i priorytety

Nowocześnie, ciepło i profesjonalnie. Narzędzie pracy rekrutera: gęste, czytelne tabele i karty. Gwiazdą są liczby i **rekomendacja praktyka**, nie dekoracje. Ciepło dają płaskie ilustracje z ludźmi i delikatny ruch, ale tylko w wyznaczonych miejscach.

Kolejność ważności przy konflikcie:
1. Prawda i czytelność (fakty z rozmowy, źródło każdej informacji, kontrast).
2. Następne działanie rekrutera (od kogo zacząć, jeden przycisk główny).
3. Gęstość (6–8 kandydatów na 1440×900 bez przewijania).
4. Ciepło (ilustracje, ruch).

## 4. Zasady, których nie łamiesz

Potwierdzone w skillu i na ekranach:
- **Koral `--dr-action` tylko na rzeczach klikalnych.** Kolory rekomendacji (`--dr-yes/ask/no/none`) tylko na rekomendacji i kropkach list. Nigdy zielony przycisk „Zaproś”.
- **Brak niebieskiego i indygo** (za bardzo jak pracuj.pl). Nowe kolory tylko jako nowe tokeny, po decyzji właściciela.
- **Zero przewijania w bok** przy każdej szerokości. Tabela maks. 5 kolumn, tekst się zawija, bez wielokropka.
- **Słowo „rekomendacja”, nigdy „werdykt”.** Decyzja należy do firmy klienta (Partnera). Klasa `dr-verdict` to tylko nazwa techniczna.
- **Teksty po polsku, pełne słowa**, uprzejme wobec kandydatów, wobec klienta pozytywne i prawdziwe.
- **Każdy tekst co najmniej `--dr-muted`** (6,4:1). `--dr-faint` tylko w grafice.
- **Etykieta przycisku = czasownik + obiekt** („Zobacz kartę”, „Kup ogłoszenie z dodatkiem”).
- **Ilustracje tylko w:** wskazówce „Od kogo zacząć”, karcie „Rozmowa z praktykiem”, ofercie dodatku, pustych stanach, potwierdzeniach. Nigdy w tabeli, faktach, przy cenie. Bez zdjęć stockowych, gradientów i emoji.

## 5. Kompozycja ekranów

| Ekran | Układ |
|---|---|
| Lista | okruszki → nagłówek (tytuł, meta, maks. 2 przyciski secondary) → `dr-stats` (4 kafle) → `dr-callout-strong` „Od kogo zacząć” → `dr-filters` → `dr-table` → `dr-legend` |
| Karta kandydata | okruszki → nagłówek z `dr-avatar` i parą przycisków zależną od rekomendacji → `dr-grid-2`: lewa `dr-stack` (rekomendacja, `dr-split` z faktami, porównanie, materiały), prawa `dr-sticky` (dostępność, Match Score, rozmowa z praktykiem) |
| Zakup | okruszki → `dr-grid-2`: lewa (plany, dodatek, dane do faktury, gwarancja), prawa `dr-sticky` podsumowanie z jednym `dr-btn-lg` |
| Potwierdzenie | `dr-grid-2`: `dr-empty` z ilustracją i następnym krokiem + szczegóły zamówienia z `dr-alert success` |
| Pusty stan | nagłówek → kafle z zerami → `dr-empty` zamiast tabeli |

Para przycisków na karcie: „Zaprosić” → primary „Zaproś na rozmowę”, secondary „Odrzuć”; „Dopytać” → „Zaproś i dopytaj” / „Odrzuć”; „Nie zapraszać” → „Odrzuć z informacją zwrotną” / „Zaproś mimo to”.

Progi szerokości: 1100 px (menu przechodzi na górę), 900 px (jedna kolumna, kafle 2×2), 760 px (wiersze tabeli jako karty).

## 6. Który komponent wybrać

| Potrzebujesz | Użyj | Nie używaj |
|---|---|---|
| głównej akcji obszaru | `dr-btn dr-btn-primary` (1 na obszar) | drugiego primary obok |
| akcji w wierszu tabeli | `dr-btn dr-btn-ghost dr-btn-sm` z `aria-label` zawierającym imię | kilku przycisków w wierszu |
| pokazania rekomendacji | `dr-verdict yes/ask/no/none` (+ `dr-verdict-lg` na karcie) | `dr-chip` ani własnego koloru |
| znacznika informacyjnego | `dr-chip`, `dr-chip-info` | `dr-verdict` |
| jednej sekcji treści | `dr-card` (`dr-card-tight` w siatce) | karty w karcie |
| pary etykieta + wartość | `dr-fact` z `dr-label`, w kolumnie bocznej `dr-kv` | samego tekstu bez etykiety |
| listy faktów z rozmowy | `dr-list yes` (potwierdził), `dr-list` (inna osoba), `dr-list ask` (nie wiemy) | kropek bez etykiety sekcji |
| pytań na rozmowę | `ol.dr-q` | zwykłej listy |
| dodatkowej treści w wąskiej komórce | `dr-peek` + `dr-peek-btn` + `<template>` | ucinania, nowej kolumny |
| objaśnienia krótkiego terminu | `dr-spec` + `dr-spec-btn` + `<template>` | kropkowanego podkreślenia |
| filtra jednej opcji | `dr-seg` z `aria-pressed` | rozwijanej listy |
| liczby nad listą | `dr-stats` (maks. 4) | wykresów |
| komunikatu | `dr-alert` (info), `.success`, `.error` + `role="alert"` | `dr-callout-strong` |
| braku danych | `dr-empty` z ilustracją | pustej tabeli |
| ładowania | `dr-skel` w kształcie treści; przycisk z `aria-busy="true"` | samego kółka na środku ekranu |
| pola formularza | `dr-field` + `dr-input` + `.hint` + `.err` | placeholdera jako etykiety |
| wyboru planu | `dr-plans` / `dr-plan` + radio, `is-selected` | samych kart bez radio |
| włączenia dodatku | `dr-toggle` + `input[type=checkbox][role=switch]` | checkboxa bez opisu |

Pełna lista klas z przykładami: `biblioteka.html`.

## 7. Tokeny w skrócie

- Kolory: `--dr-bg`, `--dr-surface`, `--dr-surface-2`, `--dr-line`, `--dr-line-strong`, `--dr-line-field`, `--dr-row-hover`, `--dr-ink`, `--dr-muted`, `--dr-faint`, `--dr-action`, `--dr-action-hover`, `--dr-action-soft`, `--dr-yes/ask/no/none` (+ `-bg`, `-line`), `--dr-yes-ink`, `--dr-danger` (+ `-bg`, `-line`), ilustracje `--dr-illo-*`, `--dr-skin-1..3`.
- Typografia: `--dr-font` (DM Sans), `--dr-font-head` (Bricolage Grotesque); rozmiary `--dr-t-page` 28, `-h2` 20, `-name` 17, `-body` 15, `-table` 14, `-meta` 13, `-label` 12, `-num` 24, `-price` 30, `-score` 40. Liczby zawsze `.num` (cyfry tabelaryczne).
- Kształt: `--dr-r-card` 12, `--dr-r-field` 10, `--dr-r-pill` 999. Odstępy `--dr-s1…s10` (4–40, skala co 4). `--dr-row` 52, `--dr-sidebar` 232.
- Fokus: `--dr-focus-ring` (2 px koral, odstęp 2 px), ustawiony globalnie na `.dr :focus-visible`.
- Cienie: `--dr-shadow-1` (wybrany segment), `--dr-shadow-2` (dymek). Karty są płaskie.

Tokeny `--dr-line-field`, `--dr-row-hover`, `--dr-danger*`, `--dr-shadow-*`, `--dr-t-num/price/score`, `--dr-focus-ring` i klasy stanów (`dr-alert`, `dr-empty`, `dr-skel`, `dr-field`, `dr-input`) dodano w v1.18. To decyzje pakietu wynikające z przeglądu dokumentacji, nie odkryte wartości źródłowe.

## 8. Granice rozszerzania

- Nowy komponent: najpierw sprawdź, czy da się go złożyć z istniejących (`dr-card` + `dr-fact` + `dr-list`). Jeśli nie, dodaj klasę `dr-<nazwa>` w `doroboty.css` (w skillu, potem skopiuj), tylko z tokenów, i dopisz ją do `biblioteka.html` oraz historii zmian skilla.
- Nie nadpisuj stylów komponentów lokalnie (`style=""` tylko dla odstępów i szerokości kolumn, jak w przykładach).
- Tryb ciemny nie istnieje i nie był projektowany. Nie dodawaj go bez decyzji.

## 9. Dostępność (WCAG 2.2 AA)

- Kontrasty: tekst ≥ 4,5:1 (`--dr-muted` 6,4:1, chipy rekomendacji 5,3–6,4:1, biały na koralu 5,5:1). Granice pól i przełącznika ≥ 3:1.
- Semantyka: menu w `<nav aria-label="Menu panelu">`, okruszki w `<nav aria-label="Okruszki">` z `aria-current="page"`, prawdziwa `<table>` z `scope="col"`, jeden `h1` na widok.
- Interakcje: wszystko działa klawiaturą; dymek otwiera się fokusem, Esc zamyka i wraca fokusem; przełącznik `role="switch"`; suma zakupu `aria-live="polite"`; błąd formularza: `aria-invalid`, `aria-describedby`, fokus do pola, `role="alert"` w komunikacie.
- Ruch: animacje ilustracji kończą się same i wyłączają przy `prefers-reduced-motion`.
- Do testu we wdrożeniu (nie sprawdzone): czytnik ekranu (NVDA/VoiceOver) na tabeli w trybie kart i na dymku, powiększenie 200%, prawdziwe urządzenia dotykowe.

## 10. Jak sprawdzić wynik

Przed oddaniem ekranu:
1. Otwórz w przeglądarce na 1440, 1000, 760 i 400 px. `document.documentElement.scrollWidth` nie może być większy niż szerokość okna.
2. Przejdź ekran klawiszem Tab: każdy klikalny element ma widoczny obrys.
3. W narzędziach sieci przeglądarki nie ma żądań do innych domen (czcionki z `fonts/`).
4. Sprawdź cztery stany: dane, pusty, ładowanie, błąd. Dla formularza: błąd przy polu i komunikat.
5. Porównaj z `biblioteka.html` i checklistą „Przegląd przed oddaniem” w SKILL.md.

## 11. Otwarte kwestie

- Zmiana nazwy klasy `dr-verdict` na `dr-rec` (zgodność z „rekomendacja”). Do decyzji: zmiana wymaga poprawek we wszystkich ekranach.
- Stany jeszcze nie zaprojektowane: wyłączony przycisk z wyjaśnieniem, sortowanie przez użytkownika, paginacja, menu na telefonie przy wielu pozycjach.
- Zachowanie `doroboty.js` w aplikacji z frameworkiem (React, Vue): do przeniesienia przy pierwszym użyciu.
