# TSV Arnbach – Vereins-Webseite

Statische Webseite des TSV Arnbach 1951 e.V., gebaut mit [Eleventy](https://www.11ty.dev/)
und gepflegt über [Decap CMS](https://decapcms.org/). Gehostet auf Cloudflare Pages.

## Lokal entwickeln

Voraussetzung: [Node.js](https://nodejs.org/) ist installiert.

- **Server starten:** `start.cmd` doppelklicken → Seite läuft auf http://localhost:8080/
- **Einmal bauen:** `build.cmd` doppelklicken → Ergebnis liegt in `_site/`

> Hinweis: Falls `npm` in PowerShell durch die Execution Policy blockiert wird,
> nutzen die `.cmd`-Dateien Node direkt und umgehen das Problem.

## Inhalte pflegen

Redakteure öffnen `/admin/` auf der veröffentlichten Seite, melden sich per
GitHub an und pflegen Termine, Neuigkeiten und Turniere/Fotos über eine Maske.

## Struktur

- `src/` – Quelldateien (Seiten, Layouts, Inhalte, CSS)
- `src/admin/` – Decap-CMS-Oberfläche und Konfiguration
- `functions/api/` – Cloudflare Pages Functions für den GitHub-OAuth-Login
- `_site/` – generierte Seite (wird nicht eingecheckt)
