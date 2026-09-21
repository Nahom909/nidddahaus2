# NIDDAHAUS – Vorschau-Website

Eine einzelne HTML-Datei, kein Build-Step. Einfach `index.html` im Browser öffnen.
**Passwort:** `1292` (Prompt beim Laden).

- Adresse: Huizener Str. 9, 61118 Bad Vilbel
- Telefon: 06101 44342
- Öffnungszeiten: Fr–Mi 11:30–14:30 und 17:00–22:00 · So abends nur bis 21:00 · **Do geschlossen**
- Bewertung: 4,9 ★ bei 28 Google-Rezensionen

**Alles liegt auf einer Seite** – auch die Speisekarte (`#speisekarte`). Sprungknöpfe dorthin stehen
in der Navigation (immer sichtbar), im Hero und in einem eigenen Hinweis-Sektor darüber.

---

## Was noch eingetragen werden muss

| Stelle | Was fehlt |
|---|---|
| **Rezensionen** (`#bewertungen`) | 6 Karten mit `„[Rezension 1 hier einsetzen.]“` / `[Name]`. Bitte **echte** Google-Rezensionen eintragen – es ist bewusst nichts erfunden. Weitere Karte = einfach ein weiteres `<div class="rev"> … </div>` ergänzen, das Laufband verdoppelt sich automatisch. |
| **Getränke** (in der Speisekarte) | Komplett Platzhalter. Auf der ausgehängten Karte stehen **nur die Aperitifs** – eine eigene Getränkekarte war nicht auffindbar. Struktur steht (Weine · Bier · Kaffee & Tee · Alkoholfreie Getränke). |
| **`[E-Mail]`** | 3× im Dokument (Kontakt, Footer). |
| **Impressum / Datenschutz** | Bewusst noch nicht angelegt. Footer-Links sind Platzhalter und zeigen auf `#kontakt`. Vor einem echten Livegang zwingend nachziehen. |

Alle offenen Angaben stehen in eckigen Klammern `[ … ]` – einfach im Editor danach suchen.

---

## Speisekarte

Die Karte ist **vollständig aus der echten, öffentlich ausgehängten Speisekarte** übernommen
(Foto aus dem Google-Maps-Eintrag, 1606 × 1145 px, vollständig lesbar). Übernommen wurden alle
Kategorien, alle Gerichte, alle Beschreibungen, alle Preise und die Artikelnummern der Küche
(1, 5, 6, … 116, 117) – diese Nummern sind die Bestellnummern und bleiben deshalb stehen.

Kategorien in dieser Reihenfolge: Aperitif · Vorspeisen · Für den kleinen Hunger ·
Argentinische Steaks · NIDDAHAUS Klassiker · Sonntagsbraten · Salate · Für unsere kleinen Gäste ·
Desserts · **Getränke (Platzhalter)**.

Wörtlich übernommen sind auch die Fußnoten der Karte (vegetarisch/vegan auf Anfrage, Allergene,
Konditorei-Hinweis, private Feiern & Gutscheine, Schlusssatz).

**Nichts wurde erfunden** – keine Gerichte, keine Preise, keine Zusätze.

---

## Bilder

Alle 12 Fotos liegen **lokal** in `images/` (kein Hotlinking → keine Drittanbieter-Requests, kein
Consent-Banner nötig). Google Fonts ist die einzige externe Verbindung.

Quelle: **Pexels**, Pexels-Lizenz (kommerziell frei, keine Namensnennung nötig, keine KI-Bilder).
Die vollständige Liste mit Foto-URL, Fotograf:in und Lizenz steht in **`BILDQUELLEN.md`** – dort
lässt sich jede einzelne Quelle nachprüfen.

⚠️ **Es sind Beispielbilder** – keines zeigt das echte NIDDAHAUS. Bewusst neutral gewählt (Teller,
Tisch, Terrasse, Wein), auf keinem ist ein fremder Betrieb erkennbar benannt.
**Vor dem Livegang durch eigene Fotos ersetzen** – gleiche Dateinamen überschreiben, dann muss am
HTML nichts geändert werden.

---

## Design & Technik

**Navyblau + helles Beige, Gold ausschließlich für Titel.**

- Farbregeln, streng eingehalten und im Browser nachgemessen:
  - Beige Hintergrund (`#F2E9D8`) → Schrift **Schwarz** (`#12161C`) oder **Navy** (`#0F2440`)
  - Navy Hintergrund (`#0F2440`) → Schrift **Weiß**
  - **Gold** (`#C29A45` auf Navy, `#8A6B22` auf Beige) nur an Überschriften, Kickern und der
    Wortmarke – **nie** an Fließtext, Preisen oder Knöpfen
  - Knöpfe ausschließlich Navy- oder Beige-gefüllt (bzw. transparent mit Navy-/Beige-Rand)
  - *Einzige Ausnahme von „Gold nur als Titel":* die **Sterne** in der Bewertungs-Sektion sind
    goldene Icons, kein Text. Sollen sie navy sein, in `.stars` die `color`-Angabe ändern.
- **Keine Verläufe** auf Schrift, Knöpfen oder Hintergründen – alles Volltonflächen. Die einzige
  Ausnahme ist die **Navy-Abdunklung über dem Hero-Foto** (`.hero-veil`), rein funktional, damit
  die weiße und goldene Schrift auf jedem Bildbereich lesbar bleibt.
- Typografie: Systemstack `-apple-system` / `SF Pro Display`, Fallback **Inter** (Google Fonts).
  Die Wortmarke ist nach dem Vorbild der echten Karte gesperrt gesetzt.

### Animationen

- **Hero verblasst beim Scrollen deutlich schneller** als bei den bisherigen Seiten: Die
  Hero-Strecke ist auf `135vh` verkürzt *und* der Scrub-Wert auf die ersten 60 % gestaucht.
  Gemessen bei 1280 × 800: Das Bild ist nach **168 px Scrollen** vollständig nach Navy verblendet
  (zum Vergleich Hessen Pizzeria: 880 px – also rund **5× schneller**).
- **Keinerlei Animation auf den Bildern selbst.** Kein Ken-Burns, kein Hover-Zoom in Galerie oder
  Karten, kein `transform`/`filter` auf `<img>`. Das Verblassen im Hero macht ausschließlich eine
  Navy-Fläche *über* dem Foto. Im Browser gegengeprüft: kein einziges `<img>` hat eine `animation`
  oder eine `transition` auf `transform`/`filter`.
- Bewertungs-Zahlen `4,9` und `28` zählen beim Scroll-Eintritt hoch (ease-out, 1,4 s).
- Rezensionen laufen als nahtlose Endlosschleife, pausieren bei Hover.
- Sektions-Reveals, wortweise Überschriften, Scroll-Fortschrittslinie.
- Alles per `prefers-reduced-motion: reduce` abschaltbar.

### Öffnungszeiten-Logik

Anders als bei den bisherigen Seiten gibt es **zwei Zeitfenster pro Tag** (Mittag + Abend).
Die Zeiten stehen als `data-slots="11:30-14:30,17:00-22:00"` an den Tabellenzeilen; offen ist,
wer in *irgendeinem* Fenster liegt. Der heutige Tag wird hervorgehoben, und dasselbe Abzeichen
erscheint im Hero **und** in der Kontakt-Sektion – grün „Jetzt geöffnet" (mit Schließzeit),
rot „Gerade geschlossen".

Geprüfte Fälle: Mi 12:00 offen · Mi 15:30 (Küchenpause) geschlossen · Mi 11:29 geschlossen ·
Mi 21:59 offen · Mi 22:00 geschlossen · Do ganztägig geschlossen · So 20:59 offen ·
So 21:30 geschlossen · Sa 21:00 offen.

### Sonstiges

- Keine iframes, Karten-Embeds, Widgets oder Analytics – nur `tel:`, `mailto:` und
  Google-Maps-**Such**-Links.
- Navigation ist immer sichtbar und enthält alle Sprungziele sowie die Knöpfe **Speisekarte** und
  **Anrufen**. Unter 1020 px klappt sie ins Burger-Menü, die beiden Knöpfe stehen dort ganz oben.
- Der aktive Sektor wird in der Navigation hervorgehoben.

## Bewusst nicht auf der Seite

- **Keine „Häufige Fragen"-Sektion.**
- Keine erfundenen Rezensionstexte, Namen, Gerichte, Preise, Gründungsjahre oder Inhabernamen.
- Keine zweite HTML-Datei – die Speisekarte ist ein Sektor derselben Seite.

## Responsive

Layout durchgehend mit **CSS Grid und Flexbox**, keine festen Pixelbreiten.
Breakpoints: **1440 px** (breiter Desktop, `--maxw` 1320 px, 18 px Grundschrift) ·
**1024 px** (Tablet: Burger-Menü, zweispaltige Raster, Touch-Ziele ≥ 44 px) ·
**768 px** (Smartphone: alles einspaltig, Kleinschrift angehoben) ·
**480 px** (kleine Geräte: 16 px Seitenrand, Knöpfe über volle Breite, Wortmarke skaliert mit
`clamp(30px,9.4vw,64px)`, Öffnungszeiten-Tabelle gestapelt statt zweispaltig).

Gemessene Ergebnisse:

| Breite | H-Scroll | Überstand | Knöpfe | Schrift | Küche-Karten | Speisekarte | Galerie | Kontakt | Navigation |
|---|---|---|---|---|---|---|---|---|---|
| 320 px | keiner | keiner | ≥ 44 px | ≥ 13 px | 1 Spalte | 1 | 1 | 1 | Burger |
| 375 px | keiner | keiner | ≥ 44 px | ≥ 13 px | 1 Spalte | 1 | 1 | 1 | Burger |
| 768 px | keiner | keiner | ≥ 44 px | ≥ 13 px | 1 Spalte | 1 | 2 | 1 | Burger |
| 1024 px | keiner | keiner | ≥ 44 px | ≥ 13 px* | 2 Spalten | 2 | 3 | 2 | Burger |
| 1440 px | keiner | keiner | Maus | ≥ 13 px* | 3 Spalten | 2 | 4 | 2 | voll ausgeklappt |

\* Der Kicker (Kleinkapitälchen-Label über den Überschriften) ist ab 769 px bewusst 12 px –
auf Mobil wird er auf 13 px angehoben.

## Geprüft

Zusätzlich: alle 14 Bild-Einbindungen laden, alle Sprungziele vorhanden und erreichbar (Nav,
Hero-Knopf, Hinweis-Sektor, beide „Zurück nach oben"-Knöpfe), Burger-Menü mit beiden Knöpfen oben,
Zähler enden auf `4,9` und `28`, Laufband verdoppelt sich auf 12 Karten und läuft,
Öffnungszeiten-Logik in 11 Fällen gegengerechnet, Farbregeln über alle Elemente gemessen,
Status-Element ohne Hintergrund/Rahmen/Innenabstand gegengeprüft (`background: rgba(0,0,0,0)`,
`border: none`, `padding: 0`, `border-radius: 0`).

## GitHub

Repository: <https://github.com/Nahom909/NIDDAHAUS> (Branch `main`).
