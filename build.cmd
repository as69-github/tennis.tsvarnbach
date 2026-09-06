@echo off
REM Baut die Webseite nach _site
REM Ruft Eleventy direkt ueber node auf, damit die PowerShell-Execution-Policy
REM (die npm.ps1 blockiert) umgangen wird.
node "%~dp0node_modules\@11ty\eleventy\cmd.cjs"
