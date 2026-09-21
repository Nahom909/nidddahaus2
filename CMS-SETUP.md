# Speisekarte selbst bearbeiten – Setup-Anleitung

Dieses Projekt ist eine Kopie der fertigen NIDDAHAUS-Website, ergänzt um **Decap CMS**:
eine Login-geschützte Bearbeitungsseite unter `/admin`, über die die komplette
Speisekarte ohne Programmierkenntnisse geändert werden kann (Texte, Preise,
Gerichte hinzufügen/entfernen/umsortieren).

## Was wurde geändert?

- `content/speisekarte.json` – die komplette Speisekarte als Datendatei (Kategorien,
  Gerichte, die hervorgehobene Sonntagsbraten-Box, der Getränke-Hinweistext, die
  beiden Fußnotizen unten). Diese Datei wird von Decap CMS bearbeitet.
- `index.html` – lädt die Speisekarte jetzt per JavaScript aus `content/speisekarte.json`
  und baut daraus automatisch das gleiche HTML wie vorher. Optisch **keine** Änderung.
- `admin/index.html` + `admin/config.yml` – die Bearbeitungsoberfläche (Decap CMS)
  und ihre Feld-Konfiguration.

Alle anderen Seiten (Hero, Küche-Karten, Bewertungen, Kontakt, Impressum,
Datenschutz …) sind unverändert und **nicht** über das CMS bearbeitbar – nur die
Speisekarte, wie besprochen.

## Lokal testen (ohne Netlify-Konto)

```bash
python -m http.server 8779          # Terminal 1: Website
npx decap-server                    # Terminal 2: lokaler CMS-Server
```

Dann `http://localhost:8779/admin/` öffnen, auf „Login" klicken (lokal reicht das,
kein echtes Passwort nötig) und Speisekarte bearbeiten. Änderungen landen direkt in
`content/speisekarte.json` auf der Festplatte.

## Damit es auf der echten, veröffentlichten Seite funktioniert

Sobald dieses Projekt in einem echten GitHub-Repo liegt und über Netlify deployt ist,
sind zwei einmalige Schritte **im Netlify-Dashboard** nötig (nicht im Code):

1. **Site settings → Identity → Enable Identity** aktivieren.
2. **Identity → Services → Git Gateway → Enable Git Gateway** aktivieren.
3. Unter **Identity → Invite users** den Inhaber per E-Mail einladen (er bekommt
   einen Link, setzt ein Passwort, kann sich danach unter `/admin` einloggen).

Optional: Unter **Identity → Registration** auf „Invite only" stellen, damit sich
niemand außer dem eingeladenen Inhaber anmelden kann.

Ab dann speichert jede Änderung im CMS automatisch einen Git-Commit im Repo und
löst ein neues Netlify-Deploy aus – der Inhaber sieht seine Änderung nach ca.
1–2 Minuten live, ganz ohne Code oder GitHub-Kenntnisse.

## Hinweis zu Datenschutz

`/admin` lädt Decap CMS von einem CDN (unpkg.com) und nutzt Netlify Identity zum
Login. Das betrifft **nur** den Inhaber beim Bearbeiten, nie normale Besucher der
Website – für die ändert sich datenschutzrechtlich nichts.
