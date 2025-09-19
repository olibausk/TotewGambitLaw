export function weightedPick(entries) {
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
      { weight: 80, text: `Du kommst ungesehen durch bisher. Niemand wird gesondert alarmiert.` },
      { weight: 15, text: `Einem einsamen Reiter ... @Law ...` },
      { weight: 5,  text: `Damn, du bist einer Patrouille ...` }
    ],
    second: [
      { weight: 50, text: `Niemand hat dich gesehen ...` },
      { weight: 20, text: `Du wurdest beobachtet ... Zielort ...` },
      { weight: 20, text: `Du wurdest beobachtet ... Himmelsrichtung ...` },
      { weight: 10, text: `Irgendwie ist deine Maske verrutscht ... @Law ...` }
    ],
    final: [
      { weight: 60, text: `Yes, das war ein erfolgreicher Tag ...` },
      { weight: 30, text: `Schade, ... 50% Gewinn ...` },
      { weight: 10, text: `Verfluchte Schweine ...` }
    ]
  },

  // --- Einbruch ---
  einbruch: {
    command: "starteinbruch",
    label: "Einbruch",
    start: `Der {user} versucht sich an einem Einbruch (Du darfst nun mit der Aktion beginnen)`,
    first: [
      { weight: 80, text: `Du schaffst es unbemerkt ins Haus zu gelangen.` },
      { weight: 15, text: `Ein Nachbar hat verdächtige Geräusche gehört ...` },
      { weight: 5,  text: `Peinlich – du bist direkt in die Arme eines Sheriffs geraten ...` }
    ],
    second: [
      { weight: 50, text: `Deine Werkzeuge waren leise ...` },
      { weight: 20, text: `Irgendwo bist du hängen geblieben ... Fetzen ...` },
      { weight: 20, text: `Ein neugieriger Bürger beobachtet dich ...` },
      { weight: 10, text: `Dein Tuch verrutscht ...` }
    ],
    final: [
      { weight: 60, text: `Der Einbruch war erfolgreich ...` },
      { weight: 30, text: `Nur ein Teil der Beute ...` },
      { weight: 10, text: `Falle! ... wertlosen Krempel ...` }
    ]
  },

  // --- Raub ---
  robbery: {
    command: "startrobbery",
    label: "Raub",
    start: `Der {user} wagt einen Raubüberfall (Du darfst den Überfall nun am Zielort starten)`,
    first: [
      { weight: 80, text: `Du schaffst es, die ersten Sekunden unbemerkt zu handeln ...` },
      { weight: 15, text: `Ein Kunde oder Passant ergreift die Flucht ... @Law ...` },
      { weight: 5,  text: `Genau in diesem Moment tritt ein Deputy ein ...` }
    ],
    second: [
      { weight: 50, text: `Die Zeugen sind eingeschüchtert ...` },
      { weight: 20, text: `Ein Zeuge beschreibt deine Art zu sprechen ...` },
      { weight: 20, text: `Auf dem Weg nach draußen ... Streifschuss ...` },
      { weight: 10, text: `Deine Maske verrutscht – @Law erkennt dein Gesicht.` }
    ],
    final: [
      { weight: 60, text: `Der Raub war erfolgreich ... voller Gewinn ...` },
      { weight: 30, text: `Chaos beim Raub! ... 50% Gewinn ...` },
      { weight: 10, text: `Alles verloren – markiert oder Tresor leer ...` }
    ]
  },

  // --- Kutsche ---
  coach: {
    command: "startcoach",
    label: "Kutschenüberfall",
    start: `Der {user} lauert einer Kutsche auf (Du darfst die Überfall-Szene jetzt starten)`,
    first: [
      { weight: 80, text: `Die Kutsche stoppt ohne großes Aufsehen ...` },
      { weight: 15, text: `Ein Mitreisender flieht in Panik ... @Law ...` },
      { weight: 5,  text: `Eine Eskorte war in der Nähe – du wirst sofort gestellt ...` }
    ],
    second: [
      { weight: 50, text: `Niemand wagt Widerstand ...` },
      { weight: 20, text: `Einer der Reisenden entkommt ... Zielort ...` },
      { weight: 20, text: `Ein Wagenlenker aus der Ferne ... Richtung ...` },
      { weight: 10, text: `Die Maske verrutscht – Gesicht erkannt ...` }
    ],
    final: [
      { weight: 60, text: `Der Überfall war ein Erfolg – Beute gehört dir ...` },
      { weight: 30, text: `Ein Teil der Ladung ist verloren gegangen ... 50% Gewinn ...` },
      { weight: 10, text: `Die Kutsche war leer oder wertlos ... kein Gewinn ...` }
    ]
  }
};
