import type { Dict } from "./hu";

// Deutsche Oberflächentexte (Übersetzung von hu.ts, gleiche Struktur).

const de: Dict = {
  lowerNames: false,

  meta: {
    siteTitle: "Online-IQ-Test mit sofortigem Ergebnis",
    siteDescription:
      "Wie hoch ist dein IQ? 30 Aufgaben aus Mustererkennung, Zahlenreihen, sprachlichem und logischem Denken. Ohne Registrierung, mit sofortiger IQ-Schätzung, Perzentil und Auswertung nach Bereichen.",
    keywords: ["IQ-Test", "Online-IQ-Test", "IQ messen", "Intelligenztest", "Matrizentest", "IQ-Skala"],
    ogTitle: "Wie hoch ist dein IQ? · Online-IQ-Test",
    ogDescription: "30 Aufgaben, ca. 12 Minuten, sofortiges Ergebnis – ohne Registrierung.",
    testTitle: "IQ-Test machen",
    testDescription: "30 Aufgaben aus Mustererkennung, Zahlenreihen, sprachlichem und logischem Denken. Ohne Zeitlimit, mit sofortigem Ergebnis.",
    scaleTitle: "IQ-Skala und Perzentil-Rechner",
    scaleDescription: "Was bedeutet ein IQ-Wert? Die Bereiche der IQ-Skala, die Anteile in der Bevölkerung und ein Perzentil-Rechner – verständlich erklärt.",
    methodTitle: "Methodik – so berechnen wir den IQ",
    methodDescription:
      "Der Aufbau der Aufgaben, die Gewichtung nach Schwierigkeit, die Alterskorrektur und die Formel für die Umrechnung auf die IQ-Skala – und die Grenzen eines Online-Tests.",
    resultTitle: "Ergebnis",
    resultTitleIq: "IQ {iq}: {band}",
    resultDescription: "IQ-Schätzung: {iq} ({band}). {correct}/{total} richtige Antworten. Mach den Test auch!",
    termsTitle: "Allgemeine Geschäftsbedingungen",
    privacyTitle: "Datenschutzerklärung",
    subscriptionTitle: "Abo verwalten",
    demoTitle: "Zahlung (Entwicklersimulation)",
  },

  brand: {
    tagline: "Online-IQ-Test mit sofortigem Ergebnis",
    home: "{brand} – Startseite",
  },

  nav: {
    test: "Der Test",
    scale: "IQ-Skala",
    method: "Methodik",
    faq: "FAQ",
    main: "Hauptnavigation",
    mobile: "Mobile Navigation",
    open: "Menü öffnen",
    close: "Menü schließen",
    start: "Test starten",
    startShort: "Test",
    language: "Sprache",
  },

  domains: {
    matrix: {
      name: "Mustererkennung",
      short: "Matrizen",
      blurb: "Visuelle Regeln in 3×3-Figurenrastern erkennen – das reinste Maß für fluide Intelligenz.",
    },
    numeric: {
      name: "Numerisches Denken",
      short: "Zahlen",
      blurb: "Gesetzmäßigkeiten in Zahlenreihen, Verhältnisse und kurze Textaufgaben im Kopf gerechnet.",
    },
    verbal: {
      name: "Sprachliches Denken",
      short: "Wörter",
      blurb: "Analogien, Gegensätze und Außenseiter – Beziehungen zwischen Begriffen erkennen.",
    },
    logic: {
      name: "Logisches Schließen",
      short: "Logik",
      blurb: "Reihenfolgen, Zeit, räumliches Vorstellungsvermögen und Syllogismen – schrittweises, regelgeleitetes Denken.",
    },
  },

  difficulty: { easy: "Leicht", medium: "Mittel", hard: "Schwer" },

  ages: { u16: "unter 16", none: "keine Angabe" },

  bands: {
    top: {
      label: "Außergewöhnlich hoch",
      text: "Nur etwa 2 % der Bevölkerung erreichen ein solches Ergebnis. Du erkennst abstrakte Regeln schnell und zuverlässig, selbst in komplexen Situationen.",
    },
    high: {
      label: "Hoch",
      text: "Du hast deutlich über dem Durchschnitt abgeschnitten: Auch kompliziertere Aufgaben, bei denen mehrere Regeln gleichzeitig gelten, liegen dir.",
    },
    above: {
      label: "Überdurchschnittlich",
      text: "Du hast besser abgeschnitten als die meisten Menschen. Neue Muster durchschaust du schnell, und Details behältst du gut im Kopf.",
    },
    avg: { label: "Durchschnittlich", text: "In diesen Bereich fällt die Hälfte der Bevölkerung. Ein stabiles, ausgewogenes Denkprofil." },
    below: {
      label: "Unterdurchschnittlich",
      text: "Das Ergebnis eines Online-Tests hängt von vielem ab – Müdigkeit, Konzentration, Zeitdruck. Versuch es ausgeruht noch einmal.",
    },
    low: { label: "Niedrig", text: "Dieses Ergebnis stammt aus einer kurzen Online-Aufgabenreihe – zieh daraus keine weitreichenden Schlüsse." },
    vlow: {
      label: "Sehr niedrig",
      text: "Eine kurze Online-Aufgabenreihe eignet sich nicht für eine Diagnose. Wenn du eine echte Messung brauchst, ist ein von Fachleuten durchgeführter Test die richtige Wahl.",
    },
  },

  scaleBands: {
    vlow: {
      label: "Sehr niedrig",
      desc: "Für eine echte Einschätzung ist eine standardisierte Untersuchung durch Fachleute nötig – ein Online-Test eignet sich dafür nicht.",
    },
    low: { label: "Niedrig", desc: "Bei Online-Tests drücken hier oft auch Müdigkeit, mangelnde Konzentration oder Sprachbarrieren das Ergebnis." },
    below: { label: "Unterdurchschnittlich", desc: "Etwas langsameres abstraktes Denken als im Durchschnitt – ein Bereich, der für den Alltag völlig ausreicht." },
    avg: { label: "Durchschnittlich", desc: "Hierher gehört die Hälfte der Bevölkerung: der „normale“ Bereich mit einem ausgewogenen Denkprofil." },
    above: { label: "Überdurchschnittlich", desc: "Schnelle Mustererkennung und ein gutes Arbeitsgedächtnis – neue Regeln werden rasch durchschaut." },
    high: { label: "Hoch", desc: "Auch komplexe Aufgaben, bei denen mehrere Regeln gleichzeitig gelten, gelingen gut." },
    top: { label: "Herausragend", desc: "Etwa 2 % der Bevölkerung. Schnelles und zuverlässiges Erkennen abstrakter Regeln, auch in komplizierten Situationen." },
  },

  ordinal: "{n}.",

  charts: {
    bellHint: "Fahr mit der Maus über einen Bereich (oder tippe darauf)",
    bellShare: "· ~{share} % der Bevölkerung",
    bellAria: "Normalverteilung der IQ-Werte",
    bellYou: "Du: {iq}",
    radarAria: "Ergebnis nach Bereichen",
    gaugeLabel: "IQ-Schätzung",
    betterThan: "Besser als {p} % der Bevölkerung",
  },

  home: {
    hero: {
      chip: "Online-IQ-Test · sofortiges Ergebnis",
      title: ["Wie hoch ist", "dein *IQ?*"],
      lead: "Aus einem Pool von {pool} Aufgaben bekommst du bei jedem Durchgang {total} neue Fragen aus Mustererkennung, Zahlenreihen, Wörtern und Logik. Am Ende: sofortige IQ-Schätzung, Perzentil und Auswertung nach Bereichen – ohne Registrierung.",
      cta: "Test starten",
      try: "Probier eine Aufgabe aus",
      facts: { tasks: "Aufgaben", minutes: "Minuten", areas: "Fähigkeitsbereiche" },
      scroll: "Scrollen",
      ruleLabel: "Regel:",
      rules: { nested: "Zwei lateinische Quadrate", sum: "1. + 2. = 3.", rotate: "Drehung +90°", fill: "Füllung pro Spalte" },
    },
    marquee: [
      "Muster",
      "Zahlenreihen",
      "Analogien",
      "Drehungen",
      "Lateinische Quadrate",
      "Syllogismen",
      "Räumliches Denken",
      "Außenseiter",
      "Verhältnisse",
      "Reihenfolgen",
    ],
    domains: {
      eyebrow: "Was misst der Test?",
      title: ["Vier Fähigkeiten,", "*eine Zahl.*"],
      lead: "Die Aufgaben decken vier sich ergänzende Bereiche ab. Am Ende bekommst du nicht nur einen IQ-Wert, sondern siehst auch, welcher Bereich deine Stärke ist.",
      count: "{n} Aufgaben",
      word: { a: "Hund", b: "Welpe", c: "Katze", tries: ["Maus", "Milch", "Kätzchen"] },
      people: ["Lukas", "Emma", "Mia", "Paul"],
      sorted: "älter → jünger",
      unsorted: "ungeordnete Aussagen",
    },
    steps: {
      eyebrow: "Wie läuft es ab?",
      title: ["Drei Schritte,", "etwa zwölf Minuten."],
      items: [
        {
          title: "Gib deine Altersgruppe an",
          text: "Ein einziger Klick. Anhand des Alters passen wir die Vergleichsbasis an – keine Registrierung, kein Benutzerkonto.",
        },
        {
          title: "Löse die {total} Aufgaben",
          text: "Kein Zeitlimit. Du kannst auch per Tastatur (A–F, Pfeiltasten) vorankommen, zurückgehen und zu jeder beliebigen Frage springen.",
        },
        {
          title: "Erhalte dein Ergebnis",
          text: "Direkt nach dem Freischalten: IQ-Schätzung mit Perzentil, Auswertung nach Bereichen und die Lösung jeder Aufgabe samt Erklärung.",
        },
      ],
    },
    tryIt: {
      eyebrow: "Probeaufgabe",
      title: ["Welche Figur passt", "an die Stelle des Fragezeichens?"],
      lead: "Eine leichte Aufwärmübung – {n} Aufgaben dieser Art erwarten dich im Test.",
      correct: "Genau! Das ist die richtige Antwort.",
      wrong: "Nicht ganz – die richtige Antwort ist {letter}.",
      explain:
        "In jeder Zeile sind Form und Füllung gleich, von links nach rechts wächst die Größe: klein, mittel, groß. Das fehlende Element ist der große, leere Stern.",
      full: "Weiter zum vollständigen Test",
      again: "Nochmal",
      hint: "Achte darauf, was sich pro Zeile und pro Spalte ändert – Form, Größe, Füllung – und wähle dann eine der sechs Möglichkeiten.",
    },
    scale: {
      eyebrow: "Die IQ-Skala",
      title: ["Der Durchschnitt liegt bei 100.", "Die meisten zwischen 85 und 115."],
      lead: "Der IQ ist kein absolutes Maß, sondern eine Vergleichszahl: Er zeigt, wo du in der Verteilung der Bevölkerung stehst. Der Mittelwert der Skala ist 100, die Standardabweichung 15 – so liegen etwa zwei Drittel der Menschen zwischen 85 und 115.",
      link: "Ausführliche IQ-Skala und Perzentil-Rechner →",
    },
    preview: {
      eyebrow: "Dein Ergebnis",
      title: ["Nicht nur eine Zahl –", "*ein vollständiges Profil.*"],
      sample: "Beispielergebnis",
      sampleChip: "{band} · {ord} Perzentil",
      points: [
        { t: "IQ-Schätzung und Perzentil", d: "Wo du im Vergleich zur Bevölkerung stehst – in einer einzigen, verständlichen Zahl." },
        { t: "Auswertung nach Bereichen", d: "Muster, Zahlen, Wörter, Logik: Du siehst, wo deine Stärke liegt." },
        { t: "Lösungen mit Erklärung", d: "Die richtige Antwort auf alle 30 Aufgaben, mit Herleitung." },
        { t: "Teilbarer Link", d: "Mit einem Klick an Freunde schicken – so können sie den Test auch ausprobieren." },
      ],
      price:
        "Der Test ist kostenlos. Das vollständige Ergebnis schaltest du mit dem {days}-tägigen Vollzugang für *{trial}* frei; wenn du nicht kündigst, läuft er ab dem {nextDay}. Tag für {monthly} pro Monat weiter – jederzeit kündbar.",
    },
    faq: {
      eyebrow: "FAQ",
      title: ["Häufige", "Fragen."],
      lead: "Alles, was du vor dem Test wissen solltest – kurz und ehrlich.",
    },
    final: {
      eyebrow: "Bereit?",
      title: "Zwölf Minuten, und *du weißt es.*",
      text: "{total} Aufgaben, ohne Zeitlimit und ohne Registrierung. Der Test ist kostenlos; das ausführliche Ergebnis erhältst du mit dem {days}-tägigen Vollzugang ({trial}).",
      cta: "Los geht’s!",
    },
  },

  faq: [
    {
      q: "Was kostet es?",
      a: "Der Test ist kostenlos und erfordert keine Registrierung. Das ausführliche Ergebnis schaltest du mit dem {days}-tägigen Vollzugang frei, der {trial} kostet; währenddessen kannst du unbegrenzt Tests machen und siehst jedes Ergebnis. Wenn du nicht innerhalb der ersten {days} Tage kündigst, läuft der Zugang ab dem {nextDay}. Tag als Monatsabo für {monthly} weiter, bis du kündigst – kündigen kannst du jederzeit mit einem Klick. Du kannst mit Kredit- oder Debitkarte, Apple Pay oder Google Pay bezahlen.",
    },
    {
      q: "Wie kann ich das Abo kündigen?",
      a: "Jederzeit mit wenigen Klicks: Über den Link „Abo verwalten / kündigen“ unten auf der Seite kündigst du im sicheren Kundenportal von Stripe. Wenn du während der Probezeit kündigst, wird nichts weiter abgebucht; dein Zugang bleibt bis zum Ende des bereits bezahlten Zeitraums bestehen.",
    },
    {
      q: "Wie lange dauert der Test?",
      a: "Die 30 Aufgaben lassen sich im Schnitt in 10–15 Minuten lösen. Es gibt kein Zeitlimit, und die Zeit fließt nicht in die Punktzahl ein – denk die Aufgaben lieber in Ruhe durch, statt zu hetzen.",
    },
    {
      q: "Wie genau ist ein Online-IQ-Test?",
      a: "Eine kurze Online-Aufgabenreihe liefert eine gute Schätzung, wie du bei Aufgaben zum abstrakten Denken abschneidest, ersetzt aber keine standardisierte, von Psychologen durchgeführte Untersuchung (z. B. WAIS). Betrachte das Ergebnis als unverbindliche Orientierung.",
    },
    {
      q: "Wie berechnet ihr den IQ?",
      a: "Jede richtige Antwort bringt Punkte, gewichtet nach ihrer Schwierigkeit (leicht 1, mittel 1,5, schwer 2). Diese Punktzahl vergleichen wir mit einer angenommenen Verteilung in der Bevölkerung – mit einer kleinen Korrektur je Altersgruppe – und rechnen sie dann auf die übliche Skala mit Mittelwert 100 und Standardabweichung 15 um. Die Details findest du auf der Seite Methodik.",
    },
    {
      q: "Kann ich zu einer früheren Frage zurückgehen?",
      a: "Ja. Während des Tests kannst du jederzeit zurückgehen, Fragen überspringen und über die obere Leiste zu jeder beliebigen Aufgabe springen. Vor dem Absenden siehst du außerdem eine Übersicht der übersprungenen Fragen.",
    },
    {
      q: "Was passiert mit meinen Antworten?",
      a: "Deine Antworten verwenden wir nur für die Auswertung: Beim Bezahlen werden sie in kurzer, codierter Form mit der Zahlungstransaktion verknüpft, und daraus berechnen wir das Ergebnis. Wir fragen weder nach deinem Namen noch nach einem Benutzerkonto; deine Kartendaten verarbeitet Stripe, wir sehen sie nicht. Für die Zahlung fragt Stripe nach einer E-Mail-Adresse für den Beleg. Bei Abonnenten setzen wir außerdem ein Cookie, damit der Browser das aktive Abo erkennt.",
    },
    {
      q: "Kann ich den Test mehrmals machen?",
      a: "Klar. Aus dem Pool von 90 Aufgaben bekommst du bei jedem Durchgang eine andere Zusammenstellung, und noch nicht gesehene Aufgaben haben Vorrang – bei drei aufeinanderfolgenden Durchgängen wiederholt sich keine einzige Frage. Mit den Aufgabentypen wirst du aber vertrauter, daher fällt ein wiederholtes Ergebnis meist etwas höher aus.",
    },
    {
      q: "Ist der Test auch für Kinder geeignet?",
      a: "Die Aufgaben sind ab 12 Jahren verständlich. Ergebnisse von unter 16-Jährigen berechnen wir mit einer kleinen Alterskorrektur, doch gerade bei Kindern gilt: Ein Online-Test dient nur der spielerischen Orientierung. Bezahlen und ein Abo abschließen können nur volljährige Nutzer (oder Nutzer, die mit Zustimmung ihres gesetzlichen Vertreters handeln).",
    },
  ],

  footer: {
    blurb: "90 selbst entwickelte Aufgaben in vier Fähigkeitsbereichen – ohne Registrierung.",
    pages: "Seiten",
    takeTest: "IQ-Test machen",
    important: "Wichtig",
    disclaimer:
      "Das Ergebnis ist eine unverbindliche Schätzung, keine medizinische oder psychologische Diagnose. Die Kartendaten verarbeitet Stripe; wir sehen und speichern sie nicht.",
    legal: "Rechtliches",
    terms: "AGB",
    privacy: "Datenschutzerklärung",
    subscription: "Abo verwalten / kündigen",
    operator: "Betreiber",
    companyId: "Firmennummer (IČO)",
    taxId: "Steuernummer (DIČ)",
    contact: "Kontakt",
  },

  test: {
    runner: {
      elapsed: "Verstrichene Zeit",
      exit: "Beenden",
      questions: "Fragen",
      questionN: "Frage {n}",
      answeredMark: " (beantwortet)",
      answeredCount: "{a} / {total} beantwortet",
      paging: "Navigation",
      back: "Zurück",
      keysAnswer: "Antwort ·",
      keysPage: "blättern",
      summary: "Übersicht",
      next: "Weiter",
      skip: "Überspringen",
    },
    intro: {
      eyebrow: "Bevor du loslegst",
      title: "Such dir eine ruhige *Ecke.*",
      lead: "Schalte Benachrichtigungen aus und löse die Aufgaben ohne Hilfe. Papier und Stift sind erlaubt – Taschenrechner und Internetsuche nicht.",
      rules: {
        tasks: "Aufgaben, ausgewählt aus einem Pool von {pool}",
        minutes: "Minuten durchschnittliche Bearbeitungszeit",
        noLimit: "kein Zeitlimit, die Zeit zählt nicht",
        back: "zurückgehen und überspringen möglich",
      },
      pendingTitle: "Das Ergebnis eines abgeschlossenen Tests wartet schon auf dich.",
      pendingText: "Du hast {a} von {total} Fragen beantwortet. Du kannst das Ergebnis jederzeit freischalten.",
      pendingCta: "Ergebnis freischalten",
      savedTitle: "Du hast einen unterbrochenen Test.",
      savedText: "Du hast bereits {a} von {total} Fragen beantwortet. Mach dort weiter, wo du aufgehört hast.",
      savedCta: "Fortsetzen",
      age: "Altersgruppe",
      ageHint: "– für die Vergleichsbasis (optional)",
      tip: "Tipp: Mit den Tasten {a}–{f} kannst du antworten, mit den Pfeiltasten blättern.",
      startNew: "Neuen Test starten",
      start: "Starten",
    },
    question: {
      difficulty: "Schwierigkeit: {d}",
      pickMissing: "Wähle das fehlende Element:",
    },
    review: {
      eyebrow: "Übersicht",
      allDone: "Du hast alle Fragen *beantwortet.*",
      open: { one: "Noch {n} Frage ist *offen.*", other: "Noch {n} Fragen sind *offen.*" },
      allDoneText: "Wenn du möchtest, kannst du deine Antworten noch einmal durchsehen – ein Klick auf die Nummer genügt.",
      openText: "Übersprungene Fragen zählen als falsch. Rate lieber, wenn du unsicher bist.",
      unanswered: " – unbeantwortet",
      answerLetter: " – Antwort {l}",
      toSkipped: "Zu den übersprungenen Fragen",
      toQuestions: "Zurück zu den Fragen",
      submit: "Auswerten",
    },
    analyzing: {
      title: "Auswertung läuft …",
      steps: ["Antworten prüfen", "Nach Schwierigkeit gewichten", "Mit der Altersgruppe vergleichen", "Perzentil berechnen", "Profil erstellen"],
    },
  },

  paywall: {
    eyebrow: "Auswertung abgeschlossen",
    title: "Dein Ergebnis ist *fertig.*",
    summary: "Du hast {a} von {total} Fragen beantwortet{time}. Schalte es frei und sieh, wo du stehst.",
    summaryTime: ", in {t}",
    preview: "Dein Ergebnis",
    cancelled: "Die Zahlung wurde abgebrochen – es wurde nichts abgebucht. Du kannst es jederzeit erneut versuchen.",
    includes: "Der {days}-tägige Vollzugang umfasst:",
    perks: [
      { t: "IQ-Schätzung und Perzentil", d: "Wo genau du im Vergleich zur Bevölkerung stehst." },
      { t: "Auswertung nach Bereichen", d: "Muster, Zahlen, Wörter, Logik – wo liegt deine Stärke?" },
      { t: "Lösungen aller {total} Aufgaben", d: "Die richtigen Antworten mit Herleitung, neben deinen eigenen Antworten." },
      { t: "Unbegrenzt neue Tests", d: "Solange dein Zugang läuft, siehst du auch jedes weitere Ergebnis sofort." },
    ],
    accessName: "{days}-tägiger Vollzugang",
    consent:
      "Ich akzeptiere die [AGB](terms) und die [Datenschutzerklärung](privacy), verlange den sofortigen Beginn der Leistung und nehme zur Kenntnis, dass ich dadurch mein 14-tägiges Widerrufsrecht verliere.",
    consentNeeded: "Bitte bestätige die obige Erklärung, um fortzufahren.",
    methodLabel: "Zahlungsart",
    card: "Debit- oder Kreditkarte",
    loading: "Zahlungsformular wird geladen …",
    email: "E-Mail-Adresse",
    emailPlaceholder: "name@beispiel.de",
    emailHint: "Hierhin schicken wir deine Quittung – damit kannst du auch dein Abo verwalten.",
    invalidEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
    pay: "{amount} bezahlen",
    processing: "Zahlung wird verarbeitet …",
    alreadySubscribed: "Für diese E-Mail-Adresse besteht bereits ein aktives Abo, daher buchen wir nicht erneut ab. Du findest es auf der Seite [Abo verwalten](subscription).",
    close: "Abbrechen",
    busy: "Weiterleitung …",
    trust: ["256-Bit-SSL", "Zahlung über Stripe", "Jederzeit kündbar"],
    renewal:
      "Wenn du nicht innerhalb der ersten {days} Tage kündigst, läuft dein Abo ab dem {nextDay}. Tag für {monthly} pro Monat weiter, bis du kündigst. Kündigen kannst du jederzeit mit einem Klick auf der Seite [Abo verwalten](subscription).",
    restart: "Lieber einen neuen Test starten",
    unknownError: "Unbekannter Fehler.",
    member: {
      title: "Du hast ein aktives Abo",
      text: "Während deines Abos kannst du alle deine Ergebnisse kostenlos öffnen.",
      cta: "Ergebnis öffnen",
      manage: "Abo verwalten",
    },
  },

  result: {
    eyebrow: "Dein Ergebnis",
    verdict: { top: "Herausragend", strong: "Stark", avg: "Durchschnittlich", grow: "Ausbaufähig" },
    shareText: "Meine IQ-Schätzung beim Elmeszint-Test: {iq}. Wie hoch ist deiner?",
    shareTitle: "Mein IQ-Ergebnis",
    copied: "Link kopiert!",
    share: "Ergebnis teilen",
    again: "Test wiederholen",
    stats: { correct: "richtige Antworten", time: "Bearbeitungszeit", percentile: "Perzentil", age: "Altersgruppe" },
    topShare: "Du gehörst ungefähr zu den besten {top} %.",
    strongest: "Dein stärkster Bereich: {domain}.",
    bell: {
      eyebrow: "Wo stehst du?",
      title: ["In der Verteilung", "der Bevölkerung."],
      lead: "Die schraffierte Fläche zeigt, welcher Anteil der Bevölkerung eine niedrigere Punktzahl erreicht als du: etwa {p} %.",
    },
    domains: { eyebrow: "Auswertung nach Bereichen", title: ["Hier bist du", "*am stärksten.*"] },
    solutions: { eyebrow: "Lösungen", title: ["Jede Aufgabe,", "mit Herleitung."] },
    subBanner:
      "Dein Abo ist aktiv – auch die Ergebnisse deiner nächsten Tests siehst du sofort, bis du kündigst. [Abo verwalten / kündigen](sub)",
    disclaimer:
      "*Wichtig:* Dies ist eine Schätzung auf Grundlage einer kurzen Online-Aufgabenreihe. Sie ersetzt keine standardisierte, von Psychologen durchgeführte Intelligenzdiagnostik und darf nicht als Grundlage für medizinische oder berufliche Entscheidungen dienen. Details zur Berechnung findest du auf der Seite [Methodik](method).",
    review: {
      all: "Alle",
      wrong: "Falsch / übersprungen",
      right: "Richtig",
      ok: "richtig",
      skipped: "übersprungen",
      bad: "falsch",
      matrixItem: "Matrix: Welche Figur passt an die Stelle des Fragezeichens?",
      you: "du:",
      good: "richtig:",
    },
    locked: {
      eyebrow: "Ergebnis",
      unpaidTitle: "Die Zahlung ist noch nicht eingegangen.",
      invalidTitle: "Zu diesem Link gibt es kein Ergebnis.",
      unpaidText:
        "Wenn du gerade bezahlt hast, lade die Seite in ein paar Sekunden neu. Wenn du die Zahlung abgebrochen hast, kannst du es auf der Testseite jederzeit erneut versuchen.",
      invalidText: "Möglicherweise wurde der Link beim Kopieren beschädigt. Wenn du den Test schon gemacht hast, kannst du dein Ergebnis auf der Testseite freischalten.",
      back: "Zurück zum Test",
      open: "Test öffnen",
    },
  },

  scalePage: {
    eyebrow: "IQ-Skala",
    title: ["Was bedeutet", "*ein IQ-Wert?*"],
    lead: "Der IQ zeigt, wo du in der Verteilung der Bevölkerung stehst. Bewege den Schieberegler und sieh dir an, wie viel Prozent ein Wert bedeutet.",
    bandsEyebrow: "Die Bereiche",
    bandsTitle: ["Die IQ-Skala", "nach Bereichen."],
    topics: [
      {
        t: "Warum liegt der Durchschnitt genau bei 100?",
        d: "Der IQ ist eine Vergleichszahl. Tests werden an großen Stichproben so kalibriert, dass eine durchschnittliche Leistung 100 Punkte und eine Abweichung um eine Standardabweichung 15 Punkte ergibt. So lässt sich jeder Wert sofort darin übersetzen, wie viel Prozent der Bevölkerung man übertrifft.",
      },
      {
        t: "Was er misst – und was nicht",
        d: "IQ-Tests messen abstraktes Denken, Mustererkennung, Arbeitsgedächtnis und sprachlich-logisches Schlussfolgern. Sie messen weder Kreativität noch emotionale Intelligenz, Fleiß oder Fachwissen – dabei zählen diese mindestens genauso viel.",
      },
      {
        t: "Der Flynn-Effekt",
        d: "Im Laufe des 20. Jahrhunderts verbesserten sich die Rohwerte in Tests in den Industrieländern um etwa 3 Punkte pro Jahrzehnt. Deshalb müssen die Normen regelmäßig neu berechnet werden – ein mit einer alten Norm gemessener IQ fällt zu hoch aus.",
      },
    ],
    cta: "Miss deinen eigenen IQ",
    calc: {
      eyebrow: "Perzentil-Rechner",
      iqValue: "IQ-Wert",
      percentile: "Perzentil",
      ofHundred: "von 100 Menschen liegen darunter",
    },
  },

  methodPage: {
    eyebrow: "Methodik",
    title: ["So wird aus deinen Antworten", "*eine Zahl.*"],
    lead: "Eine transparente, nachvollziehbare Berechnung – und ehrliche Worte darüber, wofür ein Online-IQ-Test taugt und wofür nicht.",
    tasks: {
      title: "Die Aufgaben",
      p1: "Der Aufgabenpool besteht aus {pool} selbst entwickelten Aufgaben, von denen bei jedem Durchgang {total} vorkommen. Für jeden der {total} Plätze im Test gibt es {variants} Varianten aus demselben Bereich und mit derselben Schwierigkeit – so hat jede Zusammenstellung denselben Aufbau, und die Ergebnisse sind vergleichbar.",
      pairNote: "Das Zahlenpaar: Aufgaben pro Test / Aufgaben im Pool.",
      p2: "Die Matrizenaufgaben (Raven-Typ, 3×3-Figurenraster) sind das reinste Maß für fluide Intelligenz und machen daher fast die Hälfte der Aufgaben aus. Die Schwierigkeit steigt ungefähr an: Auf einen Test kommen {easy} leichte, {medium} mittlere und {hard} schwere Aufgaben, und die Bereiche wechseln sich ab.",
      p3: "Der Browser merkt sich, welche Aufgaben du schon gesehen hast, und bevorzugt beim nächsten Durchgang die noch unbekannten – so wiederholt sich bei drei aufeinanderfolgenden Durchgängen keine einzige Aufgabe.",
    },
    scoring: {
      title: "Bewertung",
      p1: "Jede richtige Antwort bringt Punkte, gewichtet nach ihrer Schwierigkeit; übersprungene und falsche Antworten zählen 0 Punkte.",
      points: "{d} = {w} Punkte",
      p2: "Die gewichtete Punktzahl teilen wir durch das erreichbare Maximum (so erhalten wir einen Wert zwischen 0 und 1) und rechnen sie dann auf die übliche IQ-Skala um:",
      formula: "s  = gewichtete Punkte / Maximum\nz  = (s − ({mean} + Korrektur)) / {sd}\nIQ = 100 + 15 · z        (begrenzt auf {min} bis {max})",
      p3: "Der Mittelwert von {mean} und die Standardabweichung von {sd} beschreiben die geschätzte Verteilung der Aufgabenreihe in der Bevölkerung. Das Perzentil ergibt sich aus der Verteilungsfunktion der Normalverteilung: Ein IQ von 115 entspricht zum Beispiel etwa dem 84. Perzentil.",
    },
    age: {
      title: "Alterskorrektur",
      p1: "Die Leistung im fluiden Denken erreicht Mitte zwanzig ihren Höhepunkt und nimmt danach langsam ab. Deshalb messen wir die Ergebnisse älterer Teilnehmer und von Teilnehmern unter 16 Jahren an einem etwas niedrigeren erwarteten Mittelwert.",
    },
    limits: {
      title: "Grenzen",
      items: [
        "Der Messfehler eines Online-Tests mit 30 Aufgaben ist deutlich größer als der einer ein- bis zweistündigen Untersuchung durch Psychologen. Das Ergebnis solltest du als Bereich von ±8–10 Punkten verstehen.",
        "Die Norm ist geschätzt und nicht an einer repräsentativen Stichprobe erhoben – der genaue Zahlenwert dient also nur der Orientierung.",
        "Wiederholtes Ausfüllen verzerrt das Ergebnis aufgrund des Lerneffekts nach oben.",
        "Das Ergebnis ist keine Diagnose und eignet sich nicht als Grundlage für Entscheidungen in Bildung, Beruf oder Medizin.",
      ],
    },
    payment: {
      title: "Zahlung und Datenschutz",
      p1: "Der Test ist kostenlos; das ausführliche Ergebnis gibt es mit dem {days}-tägigen Vollzugang ({trial}; wenn du nicht kündigst, ab dem {nextDay}. Tag {monthly}/Monat, jederzeit kündbar). Die Bewertung erfolgt auf dem Server, die richtigen Antworten gelangen nicht in deinen Browser. Beim Bezahlen werden deine Antworten in kurzer, codierter Form mit der Zahlungstransaktion bei Stripe verknüpft, und die Ergebnisseite berechnet daraus das Ergebnis – in einer separaten Datenbank speichern wir sie nicht.",
      p2: "Den Stand eines unterbrochenen Tests speichert nur dein eigener Browser, damit du weitermachen kannst. Wir fragen weder nach Namen noch nach einem Benutzerkonto; die Kartendaten verarbeitet Stripe, wir sehen sie nicht.",
      cta: "Test starten",
    },
  },

  subscriptionPage: {
    eyebrow: "Abo",
    title: ["Abo", "*verwalten.*"],
    lead: "Hier siehst du den Status deines Abos und kannst es kündigen. Die Kündigung wird sofort erfasst; dein Zugang bleibt bis zum Ende des bereits bezahlten Zeitraums bestehen.",
    status: "Status",
    trialing: "Probezeit – endet am {date}. Wenn du bis dahin nicht kündigst, werden danach monatlich {monthly} abgebucht.",
    active: "Aktiv. Nächste Abbuchung: {date}, {amount}.",
    canceling: "Gekündigt. Dein Zugang gilt bis {date}; es erfolgen keine weiteren Abbuchungen.",
    pastDue: "Die letzte Abbuchung ist fehlgeschlagen. Aktualisiere deine Zahlungsmethode im Kundenportal.",
    none: "Auf diesem Gerät gibt es kein aktives Abo.",
    manage: "Abo verwalten / kündigen",
    manageHint: "Das sichere Kundenportal von Stripe öffnet sich: Dort kannst du das Abo kündigen, die Karte wechseln und deine Rechnungen herunterladen.",
    noDevice:
      "Wenn du auf einem anderen Gerät oder in einem anderen Browser abonniert hast, melde dich im Kundenportal mit der E-Mail-Adresse an, die du bei der Zahlung angegeben hast – wir schicken dir einen Einmalcode, und dort kannst du das Abo kündigen.",
    portalLogin: "Mit E-Mail-Adresse im Kundenportal anmelden",
    help: "Hast du eine Frage, oder klappt die Kündigung nicht? Schreib uns: {email}",
    portalError: "Das Kundenportal ist gerade nicht erreichbar. Versuch es in einer Minute noch einmal oder schreib uns: {email}",
    demoNote: "Entwicklermodus: Es ist kein Stripe-Schlüssel eingerichtet, daher gibt es hier kein echtes Abo.",
  },

  demoPay: {
    chip: "Entwicklermodus – keine echte Zahlung",
    title: "Zahlung simulieren",
    text: "Es ist kein Stripe-Schlüssel eingerichtet, daher ersetzt diese Seite die Stripe-Zahlungsseite. Sobald STRIPE_SECRET_KEY gesetzt ist, erscheint hier die echte Kartenzahlung.",
    item: "IQ-Test-Ergebnis",
    pay: "Erfolgreiche Zahlung simulieren",
    cancel: "Zahlung abbrechen",
  },

  notFound: {
    title: "Diese Seite gibt es nicht.",
    text: "Vielleicht enthält die Adresse einen Tippfehler, oder die Seite wurde entfernt.",
    home: "Zurück zur Startseite",
  },

  legal: {
    updated: "Gültig ab: {date}",
    draftNote: "",
    toc: "Inhalt",
  },

  stripe: {
    subName: "Elmeszint-Abo",
    subDesc: "Unbegrenzt IQ-Tests und ausführliche Ergebnisse. Verlängert sich monatlich, jederzeit kündbar.",
    trialName: "{days}-tägiger Vollzugang",
    submitNote:
      "Heute werden {trial} für den {days}-tägigen Vollzugang abgebucht. Wenn du nicht innerhalb der ersten {days} Tage kündigst, werden ab dem {nextDay}. Tag automatisch monatlich {monthly} abgebucht, bis du kündigst. Kündigen kannst du jederzeit unten auf der Website über den Link „Abo verwalten / kündigen“.",
  },

  api: {
    invalid: "Ungültige Eingabe.",
    unavailable: "Die Zahlungsseite ist gerade nicht erreichbar. Versuch es in einer Minute noch einmal.",
    notConfigured: "Die Zahlung ist auf dieser Seite noch nicht eingerichtet.",
    notMember: "Auf diesem Gerät gibt es kein aktives Abo.",
  },
};

export default de;
