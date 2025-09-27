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
  }
};
