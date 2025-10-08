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
      { weight: 15, text: "Einem einsamen Reiter kommt es merkwürdig vor... Die @Law machen sich auf den Weg. (Du musst deine aktuelle Position und die Richtung in die du fährst mitteilen und darfst deine Fahrt fortsetzen sobald das Law deine Position gesehen hat)" },
      { weight: 5, text: "Damn, du bist einer Patrouille der Sheriffs direkt in die Arme geraten... @Law (Du muss deine aktuelle Position dem Law mitteilen.  Der Schmuggel ist hier beendet, du musst warten bis das Law bei dir ist und dann spielt ihr alles weitere IC aus, keinesfalls kannst du dein Ziel erreichen mit deiner Schmuggelware, das Risiko das du dein Versteck oder deinen Käufer damit verräts ist viel zu hoch.)" }
    ],
    second: [
      { weight: 50, text: "Niemand hat dich gesehen und deine Spuren gehen unter." },
      { weight: 20, text: "Jemand verrät deinen Zielort an das @Law. (Du musst dem Law deinen Zielort verraten, beispielsweise Annesburg, @Law darf diese Information aber nur zur Ermittlung nutzen und nicht für diesen Schmuggel)" },
      { weight: 20, text: "Eine Ratte hat dem Law dein Versteck verraten.(Du musst dem Law dein Versteck verraten, beispielsweise Cumberland Forrest, @Law darf diese Information aber nur zur Ermittlung nutzen und nicht für diesen Schmuggel)" },
      { weight: 10, text: "Deine Maske verrutscht. @Law erkennt dich. (Jetzt  kann die @Law dich auf dein Verbrechen ansprechen. Aber sie haben dich nicht auf frischer Tat ertappt." }
    ],
    final: [
      { weight: 60, text: "Yes, das war ein erfolgreicher Tag. (Streiche den gesamten geplanten Gewinn für diese Schmuggeltour ein)" },
      { weight: 30, text: "Schade, halbe Ware verloren – nur 50% Gewinn.(Von dem Gewinn der mit der Tour erzielt worden wäre, erhälst du lediglich die Hälfte)" },
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
      { weight: 15, text: "Ein Nachbar hat verdächtige Geräusche gehört... (Der @Bürger der dem Einbruch am nächsten ist darf diese Information verwenden, du musst auf der Karte schauen wer am nächsten ist und diesem Char deine Position nennen. Ob dieser Bürger nun zum Law geht, den Einbrechenden erpresst oder einfach nichts damit macht muss IC ausgespielt werden" },
      { weight: 5, text: "Peinlich – direkt in die Arme eines Sheriffs geraten. (Du muss deine aktuelle Position dem Law mitteilen. Du musst warten bis das Law bei dir ist und dann spielt ihr alles weitere IC aus. Der Einbruch ist  damit nicht zwingend beendet, wenn das @Law korrupt ist und dich einfach gehen lässt geht es weiter, sonst sind die folgenden Nachrichten irrelevant.)" }
    ],
    second: [
      { weight: 50, text: "Deine Werkzeuge waren leise." },
      { weight: 20, text: "Ein Stofffetzen bleibt hängen – Spur für @Law (Beschreibe ein Stück Kleidung von deinem Char welches gefunden werden kann und entsprechend an deiner Kleidung kaputt ist." },
      { weight: 20, text: "Ein Bürger beobachtet dich aus Entfernung. (Suche auf der Map den nächstgelegenen Bürger raus der nicht Eigentümer der Immobilie ist und dieser darf deinen Char beschreiben aber nicht namentlich nennen. Der Bürger kann die Information natürlich auch für sich behalten oder dich erpressen." },
      { weight: 10, text: "Dein Tuch verrutscht – Eigentümer erkennt dich. (Der Eigentümer der Immobilie kennt deinen Namen. Was der Char mit dieser Information macht bleibt diesem selber überlassen." }
    ],
    final: [
      { weight: 60, text: "Der Einbruch war erfolgreich. (Du kannst alles klauen was in der Immobilie vorhanden ist und du mit den Händen tragen kannst (Nein, der Esstisch bleibt stehen!). Bargeld was in der Tasche von dem bestohlenenen Char ist zählt ebenfalls dazu wenn dieser gerade in der Immobilie ist. Bitte seid ehrlich zueinander und nennt ehrlich was gefunden werden kann bzw. wenn du einbrichst dann solltest du eventuelle Geheimverstecke vorher IC gefunden haben um diese auszurauben.)" },
      { weight: 30, text: "Nur 50% der Beute gesichert.(Du kannst alles klauen was in der Immobilie vorhanden ist und du mit den Händen tragen kannst (Nein, der Kleiderschrank bleibt stehen solange du nicht 2 Meter groß bist und aus 150kg Muskelmasse bestehst!). Bargeld was in der Tasche von dem bestohlenenen Char ist zählt ebenfalls dazu wenn dieser gerade in der Immobilie ist. Bitte seid ehrlich zueinander und nennt ehrlich was gefunden werden kann bzw. wenn du einbrichst dann solltest du eventuelle Geheimverstecke vorher IC gefunden haben um diese auszurauben.Die Hälfte der Wertgegenstände bleiben aber zurück.)" },
      { weight: 10, text: "Falle – wertloser Krempel.(Das Ganze Risiko dafür das du nichts gefunden hast.)" }
    ],
    phases: [
      { key: "first", delay: 2 },
      { key: "second", delay: 4 }
    ],
    finalDelay: 5
  },

  // --- Raub ---
  robbery: {
    command: "startrobbery",
    label: "Raub",
    start: `Der {user} wagt einen Raubüberfall (Du darfst den Überfall starten)`,
    first: [
      { weight: 80, text: "Die ersten Sekunden bleiben unbemerkt." },
      { weight: 15, text: "Ein Passant warnt sofort bemerkt dich/euch. (Wähle auf der Map den nächstgelegenen Charakter aus der nicht zum Law gehört und markiere diesen. Der Zeuge darf IC selber entscheiden was mit dieser Information geschieht." },
      { weight: 5, text: "Ein Deputy tritt herein – @Law direkt da. (Du musst deinen Standort dem Law sofort mitteilen und warten bis diese bei dir sind. Dann wird die Szene IC zu Ende gespielt, ob der Raub noch stattfinden kann spielt ihr ebenfalls aus, wenn ja gelten die Chancen auf Beute in der übernächsten Nachricht.)" }
    ],
    second: [
      { weight: 50, text: "Zeugen sind eingeschüchtert. (Niemand erkennt dich/euch, ihr hinterlasst somit keine Spuren solange ihr eine Maske getragen habt)" },
      { weight: 20, text: "Ein Zeuge beschreibt deine Stimme. (Der oder die überfallenen Bürger dürfen deine/eure Stimme/n beschreiben aber nicht eure Namen nennen (Zumindest nicht wenn ihr schlau genug wart euch nicht selber beim Überfall mit Namen anzureden.))" },
      { weight: 20, text: "Beim Fliehen triff dich ein Streifschuss.(Mindestens einer der Überfallenden Charaktere erleidet einen Streifschuss an Arm oder Bein. Das beinhaltet das dieser Charakter eine kaputte und blutige Jacke/Hemd oder Hose hat und entweder 1 Woche IC humpelt oder den Arm schont. Trefferlage und betroffener Charakter muss in der Storyrelevanz erwähnt sein.)" },
      { weight: 10, text: "Deine Maske verrutscht – man erkennt dich.(Die überfallene Person kennt dein Gesicht und sofern vorher schon IC bekannt auch deinen Namen. Was mit dieser Information geschieht, dass kann der Char selbsttändig entscheiden." }
    ],
    final: [
      { weight: 60, text: "Der Raub war erfolgreich.(Der überfallene Char muss dir das gesamte Bargeld aushändigen. Solltest du die Bank überfallen haben markiere @Admin damit dir der Inhalt des Bankvermögens übertragen wird.)" },
      { weight: 30, text: "Chaos – nur 50% Beute.(Der überfallene Char muss dir das halbe Bargeld aushändigen. Solltest du die Bank überfallen haben markiere @Admin damit dir die des Bankvermögens übertragen wird.)" },
      { weight: 10, text: "Alles verloren – markiertes Geld.(Soviel Risiko für Nichts. Da kann man nichts machen.)" }
    ],
    phases: [
      { key: "first", delay: 2 },
      { key: "second", delay: 4 }
    ],
    finalDelay: 5
  },

  // --- Kutschenüberfall ---
  coach: {
    command: "startcoach",
    label: "Kutschenüberfall",
    start: `Der {user} lauert einer Kutsche auf (Du darfst die Szene starten)`,
    first: [
      { weight: 80, text: "Die Kutsche stoppt ohne Aufsehen." },
      { weight: 15, text: "Ein Mitreisender flieht zum Law. @Law wird informiert. (Du musst deinen Standort @Law mitteilen. Du darfst die Szene aber direkt weiterspielen, @Law darf sich aber auf den Weg zum Überfall machen (Bitte kein voller Galopp, der Zeuge muss erst zum Law gekommen sein und eure Pferde müssen eine Verfolgung noch durchhalten, bleibt fair;).)" },
      { weight: 5, text: "Eine Eskorte stellt dich sofort. (Du musst deinen Standort dem Law sofort mitteilen und warten bis diese bei dir sind. Dann wird die Szene IC zu Ende gespielt, ob der Raub noch stattfinden kann spielt ihr ebenfalls aus, wenn ja gelten die Chancen auf Beute in der übernächsten Nachricht.) " }
    ],
    second: [
      { weight: 50, text: "Fahrgäste fügen sich." },
      { weight: 20, text: "Ein Reisender verrät deinen Zielort. (Der überfallene Char darf dem @Law mitteilen in welche Richtung du dich entfernt hast, allerdings ist der überfallene Char so aufgelöst, dass dieser sich weder an Stimme noch an Kleidung erinnern kann." },
      { weight: 20, text: "Ein Wagenlenker aus der Ferne beobachtet dich. (Du musst @Law mitteilen welche Kleidung du beim Überfall getragen hast und in welche Richtung du geflüchtet bist." },
      { weight: 10, text: "Maske verrutscht – dein Gesicht erkannt. (Der oder die überfallenen Chars kennen dein Gesicht, deine Kleidung und deine Stimme. Wenn sie dich vorher schon I kennen natürlich auch deinen Namen. Was die Chars mit der Information machen bleibt ihnen selber überlassen." }
    ],
    final: [
      { weight: 60, text: "Der Überfall war erfolgreich. (Du bekommst alle Wertgegenstände ausgehändigt, diese muss der Cahr der überfallen wird ehrlich nennen. Sollte es sich um mehr handeln als du auf deinem Pferd transportieren kannst, dann nimmst du die ganze Kutsche mit zur Flucht." },
      { weight: 30, text: "Ein Teil der Ladung verloren – 50% Gewinn. (Du musstest  Hals über Kopf flüchten, daher nimmst du nur das halbe Bargeld mit. Sollte es sich um Waren handeln und du hast die Kutsche ist die Hälfte der Ladung vom Wagen gefallen während der Flucht." },
      { weight: 10, text: "Die Kutsche war wertlos.(Irgendwie haben die den Braten gerochen. Da ist nichts drin in der Kutsche und alle überfallenen Chars haben ihr Bargeld vorher sicher bei der Bank deponiert." }
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
    start: `Der {user} beginnt eine Entführung (Markiere sofort dein Opfer und beginnt IC die Szene auszuspielen, Dein Opfer darf sich natürlich wehren)`,
    first: [
      { weight: 70, text: "Du schaffst es, das Opfer zu isolieren – niemand bemerkt euch." },
      { weight: 20, text: "Ein Passant sieht etwas und flüstert es weiter – @Law könnte Wind bekommen. (Markiere den nächstgelenen unbeteiligten Char, dieser kann mit der Information machen was er möchte.)" },
      { weight: 10, text: "Das Opfer leistet Widerstand – Tumult zieht Blicke auf sich. (Teile deinen Standort sofort @Law mit und pausiert die Szene bis das Law vor Ort ist. Danach spielt ihr die Szene IC mit dem Law aus." }
    ],
    second: [
      { weight: 50, text: "Fesseln sitzen, Knebel hält – der Transport beginnt ohne großen Lärm." },
      { weight: 25, text: "Jemand erkennt das Pferd/Outfit und meldet es dem Law – Fahndung läuft an. (Teile deine aktuelle Position und die Richtung in der du unterwegs bist dem @Law mit. Setze die Szene aber weiter fort." },
      { weight: 15, text: "Ein Komplize patzt – Stofffetzen bleibt am Tatort zurück. (Beschreibe in der Storyrelevanz welcher Teil deiner Kleidung nun kaputt ist und wie diese aussieht." },
      { weight: 10, text: "Maske verrutscht – ein Zeuge kann dein Gesicht vage beschreiben. (Markiere den nächsten unbeteiligten Char. Dieser kann nun dein Gesicht und deine Kleidung beschreiben aber nicht deinen Namen nennen." }
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
    finalDelay: 10
  },

  // === Mord (Slash: /mord) ===
  mord: {
    command: "mord",
    label: "Mord",
    start: `Der {user} bereitet einen Mordanschlag vor (Markiere den User den du als Opfer ausgewählt hast oder einen NPC)`,
    first: [
      { weight: 65, text: "Du findest einen günstigen Moment – kaum Zeugen in der Nähe." },
      { weight: 20, text: "Ein Schatten bewegt sich – möglicherweise doch ein Zeuge in Hörweite.(Markiere den nächstgelenen unbeteiligten Char, dieser kann mit der Information machen was er möchte.)" },
      { weight: 15, text: "Unerwartete Störung – da kommt ein Sherrif vorbei. (Teile @Law deinen Standort mit und pausiere die Szene bis Law da ist. Dann spielt ihr die Szene IC aus." }
    ],
    second: [
      { weight: 45, text: "Die Tat läuft schnell und leise – Spuren gibt es nicht." },
      { weight: 25, text: "Ein Schuss fällt/Schrei ertönt – Anwohner alarmieren @Law. (Markiere den nächstgelegenen unbeteiligten Bürger. Dieser kann deine Kleidung beschreiben, solltest du nicht maskiert sein kennt der Char natürlich auch dein Gesicht und wenn ihr euch IC vorher kanntet auch deinen Namen)." },
      { weight: 20, text: "Eine markante Spur bleibt: Schuhabdruck oder Pulverrückstände.(Markiere den nächstgelegenen unbeteiligten Bürger. Dieser kann deine Kleidung und Stimme beschreiben, solltest du nicht maskiert sein kennt der Char natürlich auch dein Gesicht und wenn ihr euch IC vorher kanntet auch deinen Namen. Auch hat das Opfer sich gewehrt, dadurch humpelt dein Char für 1 IC Woche.)" },
      { weight: 10, text: "Jemand erkennt deine Stimme/Körperhaltung. (Markiere den nächstgelegenen Bürger. Dieser kann deinen Namen nennen. Was der Char mit dieser Information macht bleibt diesem selber überlassen." }
    ],
    final: [
      { weight: 45, text: "Ziel ausgeschaltet & Flucht gelungen." },
      { weight: 30, text: "Du entkommst, aber **Gefahrenstufe steigt** – @Law setzt Priorität auf die Ermittlung. (Dein Opfer überlebt. Nicht unverletzt aber auch nichts was mit der Zeit nicht heilt. Schreibt eine Storyrelevanz welche Verletzung das Opfer erlitten hat." },
      { weight: 25, text: "Tat vereitelt, dein Opfer hat sich erfolgreich gewehrt und dir ins Bein geschossen. (Weder ist dein Opfer gestorben, noch bist du unverletzt aus der Situation entkommen. Durch die Schusswunde humpelst du deutlich und musst auch einen Arzt aufsuchen." }
    ],
    phases: [
      { key: "first", delay: 1 },
      { key: "second", delay: 2 }
    ],
    finalDelay: 2
  }
};
