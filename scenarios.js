// Zufalls-Auswahl nach Gewichtung
export function weightedPick(entries) {
  if (!entries?.length) return "⚠️ Kein Eintrag gefunden.";
  const total = entries.reduce((s, e) => s + e.weight, 0);
  let r = Math.random() * total;
  for (const e of entries) {
    if ((r -= e.weight) <= 0) return e.text;
  }
  return entries.at(-1).text;
}

export const scenarios = {
  // --- Schmuggel ---
  schmuggel: {
    command: "startschmuggel",
    label: "Schmuggel",
    start: `Der {user} begibt sich auf seine Schmuggelroute (Du darfst ab jetzt in Richtung deines Zielortes fahren)`,
    first: [
      { weight: 80, text: "Du kommst ungesehen durch bisher. Niemand wird gesondert alarmiert." },
      { weight: 15, text: "Einem einsamen Reiter kommt es merkwürdig vor... Die @Law machen sich auf den Weg." },
      { weight: 5, text: "Damn, du bist einer Patrouille der Sheriffs direkt in die Arme geraten..." }
    ],
    second: [
      { weight: 50, text: "Niemand hat dich gesehen und deine Spuren gehen unter." },
      { weight: 20, text: "Jemand verrät deinen Zielort an das Law." },
      { weight: 20, text: "Eine Ratte hat dem Law dein Versteck verraten." },
      { weight: 10, text: "Deine Maske verrutscht. @Law erkennt dich verdächtig." }
    ],
    final: [
      { weight: 60, text: "Yes, das war ein erfolgreicher Tag." },
      { weight: 30, text: "Schade, halbe Ware verloren – nur 50% Gewinn." },
      { weight: 10, text: "Der Käufer hat dich betrogen. Kein Gewinn." }
    ],
    phases: [
      { key: "first", delay: 4 },
      { key: "second", delay: 7 }
    ],
    finalDelay: 10
  },

  // --- Einbruch ---
  einbruch: {
    command: "starteinbruch",
    label: "Einbruch",
    start: `Der {user} versucht sich an einem Einbruch (Du darfst nun mit der Aktion beginnen)`,
    first: [
      { weight: 80, text: "Du schaffst es unbemerkt ins Haus zu gelangen." },
      { weight: 15, text: "Ein Nachbar hat verdächtige Geräusche gehört..." },
      { weight: 5, text: "Peinlich – direkt in die Arme eines Sheriffs geraten." }
    ],
    second: [
      { weight: 50, text: "Deine Werkzeuge waren leise." },
      { weight: 20, text: "Ein Stofffetzen bleibt hängen – Spur für Law." },
      { weight: 20, text: "Ein Bürger beobachtet dich aus Entfernung." },
      { weight: 10, text: "Dein Tuch verrutscht – Eigentümer erkennt dich." }
    ],
    final: [
      { weight: 60, text: "Der Einbruch war erfolgreich." },
      { weight: 30, text: "Nur 50% der Beute gesichert." },
      { weight: 10, text: "Falle – wertloser Krempel." }
    ],
    phases: [
      { key: "first", delay: 4 },
      { key: "second", delay: 7 }
    ],
    finalDelay: 10
  },

  // --- Raub ---
  robbery: {
    command: "startrobbery",
    label: "Raub",
    start: `Der {user} wagt einen Raubüberfall (Du darfst den Überfall starten)`,
    first: [
      { weight: 80, text: "Die ersten Sekunden bleiben unbemerkt." },
      { weight: 15, text: "Ein Passant warnt sofort das Law. @Law sind unterwegs." },
      { weight: 5, text: "Ein Deputy tritt herein – Law direkt da." }
    ],
    second: [
      { weight: 50, text: "Zeugen sind eingeschüchtert." },
      { weight: 20, text: "Ein Zeuge beschreibt deine Stimme." },
      { weight: 20, text: "Beim Fliehen triff dich ein Streifschuss." },
      { weight: 10, text: "Deine Maske verrutscht – @Law erkennt dich." }
    ],
    final: [
      { weight: 60, text: "Der Raub war erfolgreich." },
      { weight: 30, text: "Chaos – nur 50% Beute." },
      { weight: 10, text: "Alles verloren – markiertes Geld." }
    ],
    phases: [
      { key: "first", delay: 4 },
      { key: "second", delay: 7 }
    ],
    finalDelay: 10
  },

  // --- Kutschenüberfall ---
  coach: {
    command: "startcoach",
    label: "Kutschenüberfall",
    start: `Der {user} lauert einer Kutsche auf (Du darfst die Szene starten)`,
    first: [
      { weight: 80, text: "Die Kutsche stoppt ohne Aufsehen." },
      { weight: 15, text: "Ein Mitreisender flieht zum Law. @Law wird informiert." },
      { weight: 5, text: "Eine Eskorte stellt dich sofort." }
    ],
    second: [
      { weight: 50, text: "Fahrgäste fügen sich." },
      { weight: 20, text: "Ein Reisender verrät deinen Zielort." },
      { weight: 20, text: "Ein Wagenlenker aus der Ferne beobachtet dich." },
      { weight: 10, text: "Maske verrutscht – dein Gesicht erkannt." }
    ],
    final: [
      { weight: 60, text: "Der Überfall war erfolgreich." },
      { weight: 30, text: "Ein Teil der Ladung verloren – 50% Gewinn." },
      { weight: 10, text: "Die Kutsche war wertlos." }
    ],
    phases: [
      { key: "first", delay: 4 },
      { key: "second", delay: 7 }
    ],
    finalDelay: 10
  },

  // === Kidnapping (Slash: /kidnapping) ===
  kidnapping: {
    command: "kidnapping",
    label: "Kidnapping",
    start: `Der {user} plant eine Entführung (RP startklar – Opfer lokalisieren & Szene eröffnen)`,
    first: [
      { weight: 70, text: "Du schaffst es, das Opfer zu isolieren – niemand bemerkt euch." },
      { weight: 20, text: "Ein Passant sieht etwas und flüstert es weiter – @Law könnte Wind bekommen." },
      { weight: 10, text: "Das Opfer leistet Widerstand – Tumult zieht Blicke auf sich." }
    ],
    second: [
      { weight: 50, text: "Fesseln sitzen, Knebel hält – der Transport beginnt ohne großen Lärm." },
      { weight: 25, text: "Jemand erkennt das Pferd/Outfit und meldet es dem Law – Fahndung läuft an." },
      { weight: 15, text: "Ein Komplize patzt – Spur (Seil/Stofffetzen) bleibt am Tatort zurück." },
      { weight: 10, text: "Maske verrutscht – ein Zeuge kann dein Gesicht vage beschreiben." }
    ],
    final: [
      { weight: 55, text: "Ihr erreicht das Versteck – Forderung kann gestellt werden. (Volle Kontrolle)" },
      { weight: 30, text: "Stress auf der Route – Versteck wechseln, nur **50%** eurer Pläne umsetzbar." },
      { weight: 15, text: "@Law kommt zu nah – ihr müsst das Opfer freilassen. **Kein Gewinn**." }
    ],
    phases: [
      { key: "first", delay: 5 },
      { key: "second", delay: 7 }
    ],
    finalDelay: 9
  },

  // === Mord (Slash: /mord) ===
  mord: {
    command: "mord",
    label: "Mord",
    start: `Der {user} bereitet einen Mordanschlag vor (Ort wählen, Alibi/Fluchtweg im RP klären)`,
    first: [
      { weight: 65, text: "Du findest einen günstigen Moment – kaum Zeugen in der Nähe." },
      { weight: 20, text: "Ein Schatten bewegt sich – möglicherweise doch ein Zeuge in Hörweite." },
      { weight: 15, text: "Unerwartete Störung – Ziel ändert die Routine, du musst improvisieren." }
    ],
    second: [
      { weight: 45, text: "Die Tat läuft schnell und leise – Spuren minimal." },
      { weight: 25, text: "Ein Schuss fällt/Schrei ertönt – Anwohner alarmieren @Law." },
      { weight: 20, text: "Eine markante Spur bleibt: Schuhabdruck oder Pulverrückstände." },
      { weight: 10, text: "Jemand erkennt deine Stimme/Körperhaltung – vage Täterbeschreibung." }
    ],
    final: [
      { weight: 50, text: "Ziel ausgeschaltet & Flucht gelungen – vorerst **keine direkte Spur**." },
      { weight: 35, text: "Du entkommst, aber **Gefahrenstufe steigt** – @Law setzt Priorität auf die Ermittlung." },
      { weight: 15, text: "Tat vereitelt oder unterbrochen – **kein Erfolg**, erhöhte Aufmerksamkeit im Gebiet." }
    ],
    phases: [
      { key: "first", delay: 4 },
      { key: "second", delay: 6 }
    ],
    finalDelay: 10
  }
};
