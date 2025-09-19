# Discord RP Events Bot

Zeitgestaffelte RP-Aktionen (Schmuggel, Einbruch, Raub, Kutschenüberfall) mit Würfelmechanik und Slash-Commands.

## Features
- 4 Slash-Commands:
  - `/startschmuggel`
  - `/starteinbruch`
  - `/startrobbery`
  - `/startcoach`
- 4 Nachrichten pro Auslösung:
  1. Sofortige Startmeldung
  2. Ereignis nach 4 Minuten
  3. Ereignis nach 7 Minuten
  4. Abschluss + letztes Ereignis nach 10 Minuten
- Gewichtsbasierte Wahrscheinlichkeiten pro Ereignis
- `@Law` wird (falls vorhanden) auf die gleichnamige **Rolle** gemappt
- Health-Endpoint für Render & UptimeRobot: `GET /health`

## Setup

### 1) Discord Application
1. Bot erstellen (https://discord.com/developers/applications)
2. Bot Token kopieren -> `.env`
3. Privileged Intents **nicht** nötig (nur Guilds)
4. Bot einladen mit Scope `bot applications.commands` und Berechtigungen zum Lesen/Schreiben in Kanälen

### 2) .env
Erstelle `.env` basierend auf `.env.example`:
