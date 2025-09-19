// Hilfsfunktion: Baue gewichtsbasierte Auswahl
export function weightedPick(entries) {
  // entries: [{ weight: number, text: string }]
  const total = entries.reduce((s, e) => s + e.weight, 0);
  let r = Math.random() * total;
  for (const e of entries) {
    if ((r -= e.weight) <= 0) return e.text;
  }
  return entries.at(-1).text;
}

// --- Szenarien-Definitionen ---
// Platzhalter:
// {user} => wird zur User-Mention ersetzt
// @Law   => wird, wenn möglich, in die Rollenmention der Law-Rolle aufgelöst (sonst bleibt @Law stehen)

export const scenarios = {
  schmuggel: {
    command: "startschmuggel",
    label: "Schmuggel",
    start: `Der {user} begibt sich auf seine Schmuggelroute (Du darfst ab jetzt in Richtung deines Zielortes fahren)`,
    first: [
      { weight: 80, text: `Du kommst ungesehen durch bisher. Niemand wird gesondert alarmiert.` },
      { weight: 15, text: `Einem einsamen Reiter kommt es merkwürdig vor wie du dort unterwegs bist. Er reitet in höchstem Tempo zum nächsten Sheriffs Office und erstattet Meldung an das Gesetz. Die @Law machen sich auf den Weg zu der Stelle an der du gerade entdeckt wurdest und bekamen die Richtung vom Zeugen mitgeteilt in die du unterwegs bist. (Du muss dem Law einen Screenshot deiner Map schicken auf der deine Position zu erkennen ist und die Richtung in der du unterwegs bist, du darfst deinen Weg aber weiter fortsetzen und musst nicht warten, du bist selber aber nicht alarmiert darfst also nicht schneller werden als bisher)` },
      { weight: 5,  text: `Damn, du bist einer Patrouille der Sheriffs direkt in die Arme geraten. Jetzt heißt es kämpfen oder fliehen. (Du musst das Law über deine genaue Position informieren und warten bis die Sheriffs bei dir sind und das Startsignal geben)` }
    ],
    second: [
      { weight: 50, text: `Niemand hat dich gesehen und deine Spuren gehen in den Spuren aller anderen unter` },
      { weight: 20, text: `Du wurdest beobachtet und irgendjemand hat dem Law deinen Zielort verraten. (Du musst deinen Zielort an dem du verkaufst offenlegen für das Law)` },
      { weight: 20, text: `Du wurdest beobachtet wie du dich auf den Weg gemacht hast, natürlich hat die Ratte das dem Law gesteckt. (Du musst die Himmelsrichtung von der nächstgelegenen Stadt oder Farm an das Law mitteilen in der dein Versteck liegt)` },
      { weight: 10, text: `Irgendwie ist deine Maske verrutscht. Du wurdest erkannt @Law aber man findet dich nur verdächtig und weiß nicht was genau du getan hast.` }
    ],
    final: [
      { weight: 60, text: `Yes, das war ein erfolgreicher Tag. (Du hast alle Waren erfolgreich an den Verkäufer bringen können, sofern du am Zielort angekommen bist und nicht vom Law oder irgendwem anderen erwischt wurdest)` },
      { weight: 30, text: `Schade, da ist mir unterwegs irgendwie meine halbe Ware abhanden gekommen. (Du machst nur 50% von dem Gewinn den du eigentlich eingeplant hattest, aber nur, wenn du es bis zu deinem Zielort geschafft hast)` },
      { weight: 10, text: `Verfluchte Schweine, der Käufer hat nicht bezahlt und mich bedroht. Mit der Übermacht konnte ich nichts ausrichten und muss die Waren wohl abschreiben. (Du machst keinerlei Gewinn, ein Kampf gegen die Übermacht ist aussichtslos)` }
    ]
  },

  einbruch: {
    command: "starteinbruch",
    label: "Einbruch",
    start: `Der {user} versucht sich an einem Einbruch (Du darfst nun mit der Aktion beginnen)`,
    first: [
      { weight: 80, text: `Du schaffst es unbemerkt ins Haus zu gelangen. Niemand scheint aufmerksam geworden zu sein.` },
      { weight: 15, text: `Ein Nachbar hat verdächtige Geräusche gehört und schaut was los ist. (Ein neutraler Carakter (kein Law) bekommt deinen Standort und ihr spielt die Situation aus. Entweder der Zeuge alarmiert das Law, er lässt sich bestechen oder bedrohen, du kannst du Person als Geisel nehmen etc.)` },
      { weight: 5,  text: `Peinlich – du bist direkt in die Arme eines Sheriffs geraten, der zufällig vorbeikam. (Du musst sofort deine exakte Position mitteilen und warten, bis das Law mit dir interagiert)` }
    ],
    second: [
      { weight: 50, text: `Deine Werkzeuge waren leise, niemand hat etwas mitbekommen.` },
      { weight: 20, text: `Irgendwo bist du hängen geblieben. Ein Stofffetzen von deinem Mantel ist hängen geblieben und du bemerkst die Spur nicht. (Du musst in einer Storyrelevanz hinterlegen von welchem deiner Kleidungsstücke ein Fetzen fehlt, denke auch daran, dass dieser Fetzen auf der entsprechenden Kleidung nun fehlt bis du das reparieren lässt)` },
      { weight: 20, text: `Ein neugieriger Bürger beobachtet dich aus sicherer Entfernung. (Du musst dem Law die Himmelsrichtung des Ortes mitteilen, an den du flüchtest)` },
      { weight: 10, text: `Dein Tuch verrutscht und der Hauseigentümer erkennt dich beim verlassen des Tatorts. (Der Beklaute entscheidet was mit dieser Information geschieht. Er kann das gegen dich verwenden, selber Rechenschaft einfordern oder das Law informieren. Allerdings erst wenn die Aktion komplett beendet ist)` }
    ],
    final: [
      { weight: 60, text: `Der Einbruch war erfolgreich. (Du konntest alle geplanten Wertgegenstände erbeuten, solange du nicht vom Law oder Bürgern gestoppt wurdest)` },
      { weight: 30, text: `Nur ein Teil der Beute konnte gesichert werden. (Du erhältst lediglich 50% des geplanten Gewinns)` },
      { weight: 10, text: `Falle! Der Besitzer hat dich in die Irre geführt und du findest nur wertlosen Krempel. (Du machst keinerlei Gewinn aus dieser Aktion)` }
    ]
  },

  robbery: {
    command: "startrobbery",
    label: "Raub",
    start: `Der {user} wagt einen Raubüberfall (Du darfst den Überfall nun am Zielort starten)`,
    first: [
      { weight: 80, text: `Du schaffst es, die ersten Sekunden unbemerkt zu handeln – keine direkte Alarmierung.` },
      { weight: 15, text: `Ein Kunde oder Passant ergreift die Flucht und warnt sofort das Law. Die @Law sind nun unterwegs zum Überfallort. (Du musst dem Law deinen Standort mitteilen, darfst aber die Szene fortführen, bis sie eintreffen)` },
      { weight: 5,  text: `Genau in diesem Moment tritt ein Deputy ein. (Du musst dem Law deine Position durchgeben und das Spielgeschehen pausieren, bis die Sheriffs da sind)` }
    ],
    second: [
      { weight: 50, text: `Die Zeugen sind eingeschüchtert, niemand wagt etwas.` },
      { weight: 20, text: `Ein Zeuge beschreibt deine Art zu sprechen. (Einer der Überfallenen Spielercharaktere darf dem Law Besonderheiten in deiner Stimme verraten, der Charakter kann aufgrund deiner Maske aber nicht sicher sagen um wen es sich handelt und somit nicht deinen Namen nennen)` },
      { weight: 20, text: `Auf dem Weg nach draußen ergreift der Überfallene doch noch die Initiative und schießt hinter dir her (Alternativ macht das ein Zeuge wenn du alle Waffen eingesammelt hast) und trifft dich mit einem Streifschuss am Oberarm. (Du musst die Verletzung für 2 RP Wochen ausspielen. Dein Hemd und deine Jacke sind kaputt, dein Arm tut entsprechend weh und du kannst ihn nicht normal nutzen.)` },
      { weight: 10, text: `Deine Maske verrutscht – @Law erkennt dein Gesicht.` }
    ],
    final: [
      { weight: 60, text: `Der Raub war erfolgreich – du konntest Beute sichern. (Voller Gewinn, wenn du es aus der Situation heraus geschafft hast)` },
      { weight: 30, text: `Chaos beim Raub! Ein Teil der Beute ging verloren. (Du erhältst nur 50% des geplanten Gewinns)` },
      { weight: 10, text: `Alles verloren – das Geld war markiert oder der Tresor leer. (Kein Gewinn)` }
    ]
  },

  coach: {
    command: "startcoach",
    label: "Kutschenüberfall",
    start: `Der {user} lauert einer Kutsche auf (Du darfst die Überfall-Szene jetzt starten)`,
    first: [
      { weight: 80, text: `Die Kutsche stoppt ohne großes Aufsehen – bisher keine Zeugen.` },
      { weight: 15, text: `Ein Mitreisender flieht in Panik und rennt in Richtung der Stadt, um das Law zu alarmieren. Die @Law wissen nun, dass hier ein Überfall stattfindet. (Du musst deine aktuelle Position mitteilen, kannst aber weiterspielen, bis das Law eintrifft)` },
      { weight: 5,  text: `Eine Eskorte war in der Nähe – du wirst sofort gestellt. (Du musst deine Position offenlegen und auf das Law warten)` }
    ],
    second: [
      { weight: 50, text: `Niemand wagt Widerstand, die Fahrgäste fügen sich.` },
      { weight: 20, text: `Einer der Reisenden entkommt und verrät deinen Zielort. (Du musst den geplanten Ablieferort offenlegen)` },
      { weight: 20, text: `Ein Wagenlenker aus der Ferne hat alles gesehen. (Du musst die Richtung angeben, aus der du mit der Beute verschwinden willst)` },
      { weight: 10, text: `Die Maske verrutscht – der/die Überfallenen kennen dein Gesicht (Was sie mit dieser Information machen spielt ihr im RP aus.` }
    ],
    final: [
      { weight: 60, text: `Der Überfall war ein Erfolg – die Beute gehört dir. (Voller Gewinn, solange du nicht vorher gestellt wurdest)` },
      { weight: 30, text: `Ein Teil der Ladung ist verloren gegangen – nervöse Passagiere haben etwas entwendet. (Du erhältst 50% des geplanten Gewinns)` },
      { weight: 10, text: `Die Kutsche war leer oder wertlos – du gehst mit leeren Händen. (Kein Gewinn, Aktion gescheitert)` }
    ]
  }
};
