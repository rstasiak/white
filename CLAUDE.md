# White — Design System

Statyczny design system dla paneli administracyjnych. HTML + CSS + vanilla JS, bez frameworków.
SCSS kompilowane do `dist/white.css` — gotowy plik do użycia w zewnętrznych projektach.

## Struktura

```
index.html          — Design Tokens (kolory, theme, typography, borders, radii, spacing, sizing, shadows)
typography.html     — Hierarchia typograficzna (H1-H3, Body, Small, Caption) + przegląd wizualny
icons.html          — Katalog ikon SVG (inline, widoczne z file://), spec
icons.svg           — SVG sprite z <symbol> (do użycia przez <use href> na serwerze HTTP)
forms.html          — Buttons, Inputs, Selects, Checkboxes & Toggles
badges.html         — Badge warianty (outlined/filled), rozmiary, kolory
list-cards.html     — List Row, Kebab Menu
layout.html         — Desktop, Widescreen, Mobile, Content Layouts
patterns.html       — Tabs, Sidebar, Page Header, Item List, Image Gallery, Description List, Content Section
styles.css          — Style dokumentacji White + tokeny + komponenty (legacy, monolityczny)
nav.js              — Sidebar nawigacja (collapsible grupy, separatory, chevron toggle)

scss/               — SCSS source do kompilacji white.css
  white.scss        — główny plik, @use wszystkich partiali
  _tokens.scss      — CSS custom properties (:root)
  _buttons.scss     — .admin-btn
  _fields.scss      — .admin-field, .admin-select
  _badges.scss      — .admin-badge
  _checkbox.scss    — .admin-checkbox, .admin-toggle
  _kebab.scss       — .admin-kebab
  _item-list.scss   — .item-list
  _page-header.scss — .page-header
  _image-gallery.scss — .image-gallery
  _description-list.scss — .description-list
  _content-section.scss  — .content-section
  _tabs.scss        — .tabs-underline, .tabs-pill

dist/
  white.css         — skompilowany CSS do użycia w projektach
```

## Komendy

- `sass scss/white.scss dist/white.css --no-source-map` — kompilacja SCSS
- **WAŻNE**: ZAWSZE kompiluj po dodaniu/zmianie SCSS partiali. Zewnętrzne projekty widzą tylko `dist/white.css`

## Decyzje architektoniczne

- **Pełna tokenizacja** — ŻADNYCH hardcoded wartości w spec-table. Każdy `px`, `color`, `weight` musi referencjonować token. Jak brakuje — dodaj do `:root` i do index.html
- **Spacing skala numeryczna** — porzucono nazwy `xs/sm/md/lg/xl` na rzecz `--space-0-5` do `--space-8` (Tailwind-like). UWAGA: replace_all na `--space-1` zamieni też `--space-1-5` — rób ostrożnie
- **Białe tło contentu** — White zobowiązuje! Content area ZAWSZE `#fff`, nigdy `--color-bg-page`
- **Dekoracja minimalna** — zero dekoracyjnych elementów (paski, boxy). Hierarchia przez typografię i whitespace. Nie proponuj accent barów, colored borders, tinted backgrounds
- **Content Section** — nagłówek = uppercase label (spójny z sidebar group labels). Między sekcjami `--space-8` (48px). Odrzucono accent bar (za ciężki)
- **Page Header** — back link POD tytułem, przyciski `admin-btn--small` po prawej, `align-items: flex-start`
- **Description List** — bez borderów między wierszami, sam spacing (`--space-5` gap)
- **SCSS jako dystrybuowany CSS** — tokeny jako CSS custom properties (nie Sass vars) żeby override'y działały w runtime. Projekty konsumujące importują `white.css` i używają klas BEM
- **Instrukcje agenta** — zamiast tabów Human/Machine, zwijany `<details class="agent-instructions">` pod każdym patternem. Domyślnie zamknięty. Style w styles.css. Human widok: taby Preview/HTML/CSS per przykład
- **Tabs** — dwa warianty: `.tabs-underline` (kreska 2px, gap --space-6) i `.tabs-pill` (segment control, bg-muted kontener, active = biały + shadow). SCSS w `_tabs.scss`
- **Icons** — osobna strona `icons.html` z inline SVG (działa z file://). Sprite `icons.svg` z `<symbol>` do `<use href>` (wymaga HTTP). Styl Feather/Lucide, stroke 1.5px, currentColor
- **Sidebar przeniesiony** — z layout.html do patterns.html jako reużywalny pattern. Klasy `admin-sidebar-preview` w styles.css (legacy, nie w SCSS jeszcze)
- **Dogfooding** — podglądy w patterns.html używają klas z `dist/white.css` (nie inline styles). `patterns.html` importuje `dist/white.css` obok `styles.css`
- **Refaktoring patterns** — usunięty `<style>` blok z Item List, usunięte wszystkie spec tables, inline styles zamienione na klasy BEM. Klasy `ex-product-*` → `item-list__*`

## Gotchas

- **Duplikaty przy replace_all** — `--space-1` matchuje `--space-1-5`. Zawsze sprawdź po masowym replace
- **`.example__spec` border** — przy column layout trzeba inline: `border-left: none; border-top: 1px solid var(--color-border-light)`
- **nav.js separator** — obiekty `{ separator: true }` w tablicy pages, renderNav musi mieć `continue`
- **nav.js collapsible** — parent z children → `<button class="sidebar__toggle">` z chevronem. Aktywna strona = domyślnie otwarta
- **switchTab()** — w patterns.html, scoped do `.tabs` parent (`btn.closest('.tabs')`), szuka sibling paneli. Obsługuje zagnieżdżone taby (Preview/HTML/CSS). Style doc-tabów (`.tabs`, `.tabs__btn`) w styles.css — to NIE to samo co `.tabs-underline`/`.tabs-pill` z white.css
- **SVG sprite file://** — `<use href="icons.svg#...">` NIE działa z `file://` (CORS). Dlatego icons.html ma inline SVG. Na serwerze HTTP sprite działa OK
- **sass** — dostępny globalnie `/usr/local/bin/sass`
- **page-header width** — `.page-header` wymaga `width: 100%` aby `space-between` działał wewnątrz `.example__preview` (flex container z `flex-wrap: wrap`)

## Tokeny (styles.css :root)

### Kolory
- Primitive: `--blue-500/600/50`, `--red-500/50`, `--green-500/50`, `--amber-500/50`, `--purple-500/50`, `--pink-500/50`, `--teal-500/50`, `--lime-500/50`, `--gray-900..50`
- Theme: `--color-primary`, `--color-primary-hover`, `--color-danger`, `--color-success`, `--color-warning`
- Text: `--color-text`, `--color-text-strong`, `--color-text-light`, `--color-text-muted`
- Border: `--color-border`, `--color-border-light`, `--color-border-default`
- Background: `--color-bg`, `--color-bg-page`, `--color-bg-muted`

### Spacing (numeryczna skala)
`--space-0-5` (2px) → `--space-1` (3px) → `--space-1-5` (4px) → `--space-2` (6px) → `--space-2-5` (7px) → `--space-3` (8px) → `--space-3-5` (10px) → `--space-4` (12px) → `--space-4-5` (14px) → `--space-5` (16px) → `--space-6` (24px) → `--space-7` (32px) → `--space-8` (48px)

### Typography
- Fonts: `--font-sans` (sohne-var → Helvetica Neue → system), `--font-doc` (Inter → system)
- Sizes: `--font-size-lg` (17px) → `--font-size-base` (16px) → `--font-size-md` (15px) → `--font-size-sm` (14px) → `--font-size-caption` (13px) → `--font-size-xs` (12px) → `--font-size-2xs` (10px)
- Weights: `--font-weight-regular` (400), `--font-weight-medium` (500), `--font-weight-semibold` (600), `--font-weight-bold` (700)
- Leading: `--leading-tight` (1.3), `--leading-snug` (1.4), `--leading-normal` (1.5), `--leading-relaxed` (1.6)

### Borders, Radii, Sizing, Inne
- Borders: `--border-field`, `--border-control`, `--border-checkbox`
- Radii: `--radius-field` (6px), `--radius-card` (10px), `--radius-button` (12px), `--radius-pill` (9999px)
- Heights: `--height-control` (44px), `--height-control-sm` (32px), `--height-control-lg` (50px)
- Transitions: `--duration-fast/normal/slow`, `--transition-control`
- `--focus-ring`, `--opacity-disabled`, `--cursor-action`, `--cursor-disabled`

## Konwencje

- Dokumentacja: `<aside class="sidebar">` + `<main class="content">` + `renderNav('page-id')`
- Patterns: Human tab z Preview/HTML/CSS subtabami + Machine tab z opisem + HTML tree
- Stare strony (forms, badges, layout): `.example` z `.example__preview` + `.example__spec` (border-top)
- BEM: `.admin-btn--primary--small`, `.image-gallery__thumb--active`
- Język interfejsu: polski. Nazwy tokenów/klas: angielski

## Wzorce — jak dodać nowy pattern

1. Dodaj `<article id="nazwa" class="component">` w patterns.html
2. Dodaj zakładki Human/Machine (patrz Image Gallery jako wzorzec)
3. Human: podgląd w `.example__preview` + spec table
4. Machine: `<pre>` z opisem struktury HTML, uwagi, wskaźnik na plik SCSS
5. Stwórz `scss/_nazwa.scss` z klasami BEM
6. Dodaj `@use 'nazwa'` w `scss/white.scss`
7. Dodaj do nav.js w children patterns
8. Kompiluj: `sass scss/white.scss dist/white.css --no-source-map`

## Co dalej

- Sidebar collapsible — zaimplementować faktycznie (teraz jest tylko spec w layout.html)
- list-cards.html i layout.html — spec tables jeszcze NIE stokenizowane (hardcoded hex/px)
- Więcej patterns: formularz edycji, dashboard, settings page
- Content Section danger zone — `__danger-row` potrzebuje klasy w SCSS (teraz inline styles na div wewnątrz)
