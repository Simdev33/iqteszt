import type { LegalTexts } from "./types";

// Deutsche Rechtstexte (Übersetzung von hu.ts).

const de: LegalTexts = {
  terms: {
    title: "Allgemeine Geschäftsbedingungen",
    lead: "Diese Bedingungen regeln die Nutzung des auf der Website {site} angebotenen Online-IQ-Tests sowie des zugehörigen kostenpflichtigen Ergebnisses bzw. Abonnements. Bitte lies sie vor der Zahlung aufmerksam durch.",
    sections: [
      {
        h: "1. Angaben zum Anbieter",
        p: [
          "- Firma: {company}",
          "- Sitz: {address}, {country}",
          "- Registereintrag: {register}",
          "- Identifikationsnummer (IČO): {ico}",
          "- Steuernummer (DIČ): {dic}",
          "- Stammkapital: {capital}",
          "- E-Mail: {email}",
          "- Website: {site}",
          "Im Folgenden: „Anbieter“. Die natürliche Person, die die Website nutzt, wird im Folgenden „Nutzer“ genannt.",
        ],
      },
      {
        h: "2. Die Leistung",
        p: [
          "Auf der Website kann ein Online-IQ-Test mit 30 Aufgaben kostenlos und ohne Registrierung absolviert werden. Nach dem Test kann das ausführliche Ergebnis (IQ-Schätzung, Perzentil, Auswertung nach Bereichen sowie die Lösungen der Aufgaben mit Erklärung) gegen Entgelt freigeschaltet werden.",
          "Das Ergebnis ist eine auf einer kurzen Online-Aufgabenreihe beruhende, *unverbindliche Schätzung*. Es stellt keine medizinische, psychologische oder sonstige fachliche Diagnose dar und eignet sich nicht als Grundlage für Entscheidungen in Bildung, Beruf, Gesundheit oder Recht.",
          "Die kostenpflichtigen Leistungen dürfen nur Personen über 18 Jahren sowie Minderjährige ausschließlich mit Zustimmung ihres gesetzlichen Vertreters in Anspruch nehmen.",
        ],
      },
      {
        h: "3. Angebote und Preise",
        p: [
          "Das ausführliche Ergebnis wird mit dem *{days}-tägigen Vollzugang* freigeschaltet, der *{trial}* kostet (bei der Zahlung sofort abgebucht). Der Zugang umfasst das ausführliche Ergebnis des jeweiligen Tests sowie während seiner Laufzeit beliebig viele weitere Tests und Ergebnisse.",
          "Kündigt der Nutzer nicht innerhalb der ersten {days} Tage, geht der Zugang nach Ablauf der {days} Tage *automatisch in ein Abonnement zu {monthly} pro Monat über*; die erste Monatsgebühr wird am {nextDay}. Tag abgebucht, danach monatlich im Voraus, bis der Nutzer kündigt.",
          "Die angegebenen Preise sind Endpreise, die der Nutzer tatsächlich zu zahlen hat; weitere Kosten (z. B. Versand- oder Bearbeitungsgebühren) fallen nicht an. Bei der Umrechnung von in Euro angegebenen Preisen kann die Bank des Nutzers eigene Wechselkurse und Gebühren anwenden.",
          "Der Anbieter behält sich künftige Preisänderungen vor. Bereits bezahlte Zeiträume sind davon nicht betroffen; der Anbieter informiert den Nutzer mindestens 30 Tage vor Inkrafttreten per E-Mail, und der Nutzer kann das Abonnement vor Inkrafttreten des neuen Preises kostenlos kündigen.",
        ],
      },
      {
        h: "4. Vertragsschluss und Zahlung",
        p: [
          "Der Nutzer akzeptiert auf der Zahlungsseite diese Bedingungen sowie die Erklärung zur sofortigen Bereitstellung digitaler Inhalte und wird anschließend über die Schaltfläche „Weiter zur Zahlung“ auf die sichere Zahlungsseite von Stripe weitergeleitet, wo er seine E-Mail-Adresse und seine Zahlungsdaten eingibt. Bis zum Absenden der Zahlung kann der Nutzer jederzeit zur Website zurückkehren und seine Antworten sowie die eingegebenen Daten ändern.",
          "Der Vertrag zwischen dem Anbieter und dem Nutzer kommt mit der erfolgreichen Zahlung zustande, und zwar in der Sprache, in der der Nutzer die Website verwendet. Der Vertragstext wird vom Anbieter nicht gesondert gespeichert; Stripe sendet eine Zahlungsbestätigung per E-Mail an die vom Nutzer angegebene Adresse. Diese Bedingungen sind auf der Website jederzeit abrufbar und können gespeichert werden.",
          "Die Zahlung wird von Stripe Payments Europe, Ltd. abgewickelt. Akzeptierte Zahlungsmethoden: Kredit- oder Debitkarte, Apple Pay, Google Pay. Die Kartendaten werden ausschließlich von Stripe verarbeitet; der Anbieter hat keinen Zugriff darauf.",
          "Bei einem Abonnement willigt der Nutzer ein, dass der Anbieter über Stripe am Ende der Probezeit und danach monatlich die Monatsgebühr von der angegebenen Zahlungsmethode abbucht, bis das Abonnement gekündigt wird. Schlägt eine Abbuchung fehl, kann Stripe sie erneut versuchen; bei dauerhaftem Zahlungsausfall endet das Abonnement.",
        ],
      },
      {
        h: "5. Leistungserbringung und Zugang",
        p: [
          "Das ausführliche Ergebnis wird unmittelbar nach erfolgreicher Zahlung angezeigt und ist auch später über den Link der Ergebnisseite abrufbar.",
          "Den unbegrenzten Zugang im Rahmen des Abonnements stellt die Website in dem Browser bereit, in dem das Abonnement abgeschlossen wurde (dazu wird ein technisch notwendiges Cookie gesetzt). Auf anderen Geräten kann sich der Nutzer über die Seite [Abo verwalten / kündigen](subscription) mit seiner E-Mail-Adresse im Kundenportal anmelden.",
        ],
      },
      {
        h: "6. Kündigung des Abonnements",
        p: [
          "Das Abonnement ist *jederzeit ohne Angabe von Gründen kündbar*: über den Link [Abo verwalten / kündigen](subscription) unten auf der Website mit wenigen Klicks im Kundenportal von Stripe oder per E-Mail an {email}.",
          "Die Kündigung wird zum Ende des laufenden (Probe-)Zeitraums wirksam; bis dahin bleibt der Zugang bestehen, und es erfolgen keine weiteren Abbuchungen. Kündigt der Nutzer das Abonnement während der Probezeit, wird die Monatsgebühr kein einziges Mal abgebucht.",
          "Die Gebühr für einen bereits begonnenen Zeitraum wird – abgesehen von gesetzlich vorgeschriebenen Fällen – nicht erstattet.",
        ],
      },
      {
        h: "7. Widerrufsrecht",
        p: [
          "Verbrauchern steht bei Fernabsatzverträgen grundsätzlich ein 14-tägiges Widerrufsrecht zu (gemäß der Richtlinie 2011/83/EU des Europäischen Parlaments und des Rates sowie dem slowakischen Gesetz Nr. 108/2024 Slg.).",
          "Die Leistung besteht in digitalen Inhalten, die nicht auf einem körperlichen Datenträger bereitgestellt werden. Vor der Zahlung *verlangt der Nutzer ausdrücklich den sofortigen Beginn der Leistungserbringung* und nimmt zur Kenntnis, dass er dadurch sein Widerrufsrecht verliert. Nach Beginn der Leistungserbringung (Anzeige des Ergebnisses) steht dem Nutzer daher kein Widerrufsrecht zu. Unabhängig davon kann das Abonnement jederzeit gemäß Abschnitt 6 gekündigt werden.",
          "Hat die Leistungserbringung aus irgendeinem Grund nicht begonnen (z. B. wurde das Ergebnis nach der Zahlung nicht angezeigt), kann der Nutzer innerhalb von 14 Tagen nach Vertragsschluss durch eine eindeutige Erklärung per E-Mail an {email} vom Vertrag zurücktreten; in diesem Fall erstattet der Anbieter den vollen Betrag spätestens innerhalb von 14 Tagen über die ursprüngliche Zahlungsmethode.",
        ],
      },
      {
        h: "8. Gewährleistung und Haftung",
        p: [
          "Der Anbieter gewährleistet, dass die digitalen Inhalte der Beschreibung entsprechen. Wird das Ergebnis nicht angezeigt oder ist es fehlerhaft, kann der Nutzer dies unter {email} melden; der Anbieter behebt den Mangel innerhalb einer angemessenen Frist. Geschieht dies nicht, kann der Nutzer eine Preisminderung verlangen oder den Vertrag beenden (gemäß der Richtlinie (EU) 2019/770).",
          "Das Ergebnis ist eine Schätzung; der Anbieter haftet nicht für Entscheidungen, die auf Grundlage des Ergebnisses getroffen werden. Die Haftung des Anbieters ist – mit Ausnahme vorsätzlich oder grob fahrlässig verursachter Schäden sowie von Vertragsverletzungen, die das Leben, den Körper oder die Gesundheit beeinträchtigen – auf den vom Nutzer für die jeweilige Leistung gezahlten Betrag beschränkt.",
          "Der Anbieter bemüht sich um eine ständige Verfügbarkeit der Website, haftet jedoch nicht für vorübergehende Ausfälle aufgrund von Wartungsarbeiten oder Störungen bei Dritten (z. B. Hosting- oder Zahlungsdienstleistern).",
        ],
      },
      {
        h: "9. Beschwerden und Rechtsbehelfe",
        p: [
          "Beschwerden kannst du an {email} senden. Der Anbieter prüft die Beschwerde und beantwortet sie spätestens innerhalb von 30 Tagen schriftlich.",
          "Aufsichtsbehörde: Slovenská obchodná inšpekcia (Slowakische Handelsinspektion), Bajkalská 21/A, 827 99 Bratislava, www.soi.sk. Für die außergerichtliche Beilegung verbraucherrechtlicher Streitigkeiten ist die Slovenská obchodná inšpekcia auch als Stelle für alternative Streitbeilegung tätig.",
          "Verbraucher mit Wohnsitz in einem anderen EU-Mitgliedstaat können bei grenzüberschreitenden Streitigkeiten kostenlose Unterstützung beim Europäischen Verbraucherzentrum ihres Landes erhalten (ECC-Net, https://www.eccnet.eu).",
        ],
      },
      {
        h: "10. Geistiges Eigentum",
        p: [
          "Die Aufgaben, Texte, Abbildungen, grafischen Elemente und der Quellcode der Website sind geistiges Eigentum des Anbieters (bzw. der jeweiligen Rechteinhaber). Ihre Vervielfältigung, Verbreitung oder gewerbliche Nutzung ohne vorherige schriftliche Genehmigung des Anbieters ist untersagt. Das Teilen des Links zum eigenen Ergebnis ist erlaubt.",
        ],
      },
      {
        h: "11. Datenschutz",
        p: ["Einzelheiten zur Verarbeitung personenbezogener Daten enthält die [Datenschutzerklärung](privacy)."],
      },
      {
        h: "12. Anwendbares Recht, Änderung der Bedingungen",
        p: [
          "Auf den Vertrag findet das Recht der Slowakischen Republik Anwendung. Dadurch wird dem Verbraucher nicht der Schutz der Bestimmungen entzogen, von denen nach dem Recht seines gewöhnlichen Aufenthaltsorts nicht durch Vereinbarung abgewichen werden darf; der Verbraucher kann auch vor dem Gericht seines Wohnsitzes klagen.",
          "Der Anbieter kann diese Bedingungen mit Wirkung für die Zukunft ändern. Für bereits geschlossene Verträge gelten die zum Zeitpunkt des Vertragsschlusses gültigen Bedingungen; bei Abonnements informiert der Anbieter mindestens 30 Tage im Voraus per E-Mail über wesentliche Änderungen, und der Nutzer kann das Abonnement kostenlos kündigen.",
          "Sollte eine Bestimmung dieser Bedingungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen davon unberührt.",
        ],
      },
    ],
  },

  privacy: {
    title: "Datenschutzerklärung",
    lead: "Diese Erklärung informiert dich darüber, welche personenbezogenen Daten wir verarbeiten, wenn du die Website {site} nutzt, zu welchem Zweck, wie lange und welche Rechte du hast. Die Verarbeitung erfolgt gemäß der Datenschutz-Grundverordnung (EU) 2016/679 (DSGVO).",
    sections: [
      {
        h: "1. Verantwortlicher",
        p: [
          "{company}, {address}, {country} · Identifikationsnummer (IČO): {ico} · Registereintrag: {register}",
          "Kontakt in Datenschutzangelegenheiten: {email}",
        ],
      },
      {
        h: "2. Welche Daten verarbeiten wir zu welchem Zweck?",
        p: [
          "*Durchführung des Tests.* Deine Antworten, die angegebene Altersgruppe und die Bearbeitungszeit speichert dein eigener Browser (localStorage), damit du den Test fortsetzen kannst. Für den Test sind weder Name noch E-Mail-Adresse oder Benutzerkonto erforderlich. Diese Daten gelangen erst zu uns, wenn du das Ergebnis freischaltest.",
          "*Freischaltung des Ergebnisses und Zahlung.* Bei der Freischaltung werden deine Antworten in kurzer, codierter Form mit den Daten der Zahlungstransaktion verknüpft, damit der Server daraus das Ergebnis berechnen kann. Die Zahlung wickelt Stripe ab: Stripe erhebt die Kartendaten (auf die wir keinen Zugriff haben) sowie deine E-Mail-Adresse für den Beleg und die Verwaltung des Abonnements. Von Stripe erhalten wir den Zahlungsstatus, deine E-Mail-Adresse, dein Land und eine Kundenkennung. Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) und Erfüllung buchhalterischer Pflichten (Art. 6 Abs. 1 lit. c DSGVO).",
          "*Erkennung des Abonnements.* Bei einem Abonnement setzen wir in deinem Browser ein signiertes, technisch notwendiges Cookie (elm_sub), das deine Stripe-Kundenkennung enthält, damit der Browser das aktive Abonnement erkennt. Rechtsgrundlage: Vertragserfüllung.",
          "*Kontakt.* Wenn du uns eine E-Mail schreibst, verarbeiten wir deinen Namen, deine E-Mail-Adresse und deine Nachricht, um deine Anfrage zu beantworten. Rechtsgrundlage: berechtigtes Interesse bzw. Vertragserfüllung.",
          "*Technische Protokolle.* Beim Betrieb der Website kann der Hosting-Anbieter aus Gründen der Sicherheit und Fehlerbehebung für kurze Zeit technische Daten (IP-Adresse, Zeitpunkt, Browsertyp) protokollieren. Rechtsgrundlage: berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO).",
          "Eine automatisierte Entscheidungsfindung oder ein Profiling, das dir gegenüber rechtliche Wirkung entfaltet, findet nicht statt. Die Berechnung der IQ-Schätzung dient nur der Orientierung und ist nicht Grundlage irgendeiner Entscheidung.",
        ],
      },
      {
        h: "3. Cookies und lokale Speicherung",
        p: [
          "Für technisch notwendige Cookies und lokale Speicherung (siehe unten) ist keine Einwilligung erforderlich. Analyse- und Werbe-Cookies verwenden wir nur mit deiner Einwilligung (siehe unten).",
          "- *lang* – die gewählte Sprache (1 Jahr)",
          "- *elm_sub* – Erkennung des Abonnements, nur bei Abonnenten (höchstens 400 Tage oder bis zur Löschung)",
          "- *tma_consent* – speichert deine Cookie-Auswahl (180 Tage)",
          "- *localStorage* – der Stand des Tests, die bereits gesehenen Aufgaben und das noch nicht freigeschaltete Ergebnis (in deinem Browser, bis du es löschst)",
          "- *sessionStorage* – nach der Zahlung der Link zu deinem Ergebnis für die Dankeseite (bis du den Tab schließt)",
          "*Analyse- und Werbe-Cookies – nur mit deiner Einwilligung.* Wenn du im Cookie-Banner auf „Akzeptieren“ klickst, laden wir das Google-Tag der Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland) für zwei Zwecke: Google Analytics zeigt uns, wie Besucher die Website nutzen, und die Google-Ads-Conversion-Messung zeigt, ob unsere Anzeigen zu Käufen führen. Google setzt dann eigene Cookies (zum Beispiel _ga und _ga_… bis zu 2 Jahre, _gcl_au bis zu 90 Tage) und erhält deine IP-Adresse, Browser- und Gerätedaten, die Adressen der besuchten Seiten, bei Ankunft über eine Anzeige die Kennung des Anzeigenklicks und bei einem Kauf dessen Betrag und die Transaktions-ID der Zahlung. Rechtsgrundlage: deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Ohne deine Einwilligung wird das Google-Tag überhaupt nicht geladen. Du kannst deine Einwilligung jederzeit über den Link „Cookie-Einstellungen“ in der Fußzeile erteilen oder widerrufen; der Widerruf berührt nicht die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung. Google kann Daten auch in die Vereinigten Staaten übermitteln (EU-US Data Privacy Framework); Datenschutzerklärung von Google: https://policies.google.com/privacy.",
        ],
      },
      {
        h: "4. Wer erhält die Daten?",
        p: [
          "- *Stripe Payments Europe, Ltd.* (1 Grand Canal Street Lower, Dublin 2, Irland) – Zahlung, Abonnement und Rechnungsstellung. Stripe kann bestimmte Daten auch in die Vereinigten Staaten übermitteln; Grundlage dafür sind das EU-US Data Privacy Framework und die Standardvertragsklauseln der Europäischen Kommission.",
          "- *Hosting-Anbieter* – Betrieb der Website, als Auftragsverarbeiter.",
          "- *Google Ireland Limited* (Gordon House, Barrow Street, Dublin 4, Irland) – Google Analytics und Google-Ads-Conversion-Messung, nur mit deiner Einwilligung (siehe Abschnitt 3).",
          "Wir verkaufen keine Daten. Abgesehen von der einwilligungsbasierten Google-Messung aus Abschnitt 3 geben wir keine Daten zu Marketingzwecken an Dritte weiter. An Behörden geben wir Daten nur aufgrund einer gesetzlichen Verpflichtung heraus.",
        ],
      },
      {
        h: "5. Wie lange speichern wir die Daten?",
        p: [
          "- Zahlungs- und Buchhaltungsdaten: gemäß dem slowakischen Rechnungslegungsgesetz 10 Jahre.",
          "- Abonnentendaten: für die Dauer des Abonnements, danach bis zum Ablauf der buchhalterischen Aufbewahrungsfrist.",
          "- Korrespondenz: höchstens 3 Jahre nach Abschluss der Angelegenheit (zur Geltendmachung von Ansprüchen innerhalb der Verjährungsfrist).",
          "- Technische Protokolle: höchstens 30 Tage.",
        ],
      },
      {
        h: "6. Deine Rechte",
        p: [
          "Du kannst Auskunft über die zu dir verarbeiteten Daten verlangen sowie deren Berichtigung, Löschung, die Einschränkung der Verarbeitung und die Datenübertragbarkeit verlangen, und du kannst der auf berechtigtem Interesse beruhenden Verarbeitung widersprechen. Richte deine Anfrage an {email}; wir antworten spätestens innerhalb eines Monats.",
          "Du kannst Beschwerde bei der slowakischen Datenschutzbehörde (Úrad na ochranu osobných údajov Slovenskej republiky, Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk) oder bei der Datenschutzaufsichtsbehörde deines Wohnsitzlandes einlegen.",
        ],
      },
      {
        h: "7. Sicherheit, Minderjährige",
        p: [
          "Die Daten werden über eine verschlüsselte Verbindung (HTTPS) übertragen; die richtigen Antworten und die Bewertung verbleiben auf dem Server, und die Cookies schützen wir durch eine kryptografische Signatur. Bezahlen können nur volljährige Nutzer oder Nutzer, die mit Zustimmung ihres gesetzlichen Vertreters handeln; Daten von Personen unter 16 Jahren verarbeiten wir nicht wissentlich ohne Zustimmung der Eltern.",
          "Wir können diese Erklärung bei Änderungen der Leistung aktualisieren; die jeweils aktuelle Fassung ist auf dieser Seite abrufbar.",
        ],
      },
    ],
  },
};

export default de;
