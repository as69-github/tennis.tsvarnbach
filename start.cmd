@echo off
REM Startet den lokalen Entwicklungsserver mit Live-Reload.
REM Danach die Seite im Browser oeffnen: http://localhost:8080/
node "%~dp0node_modules\@11ty\eleventy\cmd.cjs" --serve --port 8080
