import type { Dict } from "./hu";

// Testi dell'interfaccia in italiano – stessa struttura del sorgente ungherese (hu.ts).

const it: Dict = {
  lowerNames: true,

  meta: {
    siteTitle: "Test del QI online con risultato immediato",
    siteDescription:
      "Qual è il tuo QI? 30 domande di riconoscimento di schemi, successioni numeriche, ragionamento verbale e logico. Senza registrazione, con stima del QI immediata, percentile e analisi per area.",
    keywords: ["test del QI", "test del QI online", "misurare il QI", "test di intelligenza", "test a matrici", "scala del QI"],
    ogTitle: "Qual è il tuo QI? · Test del QI online",
    ogDescription: "30 domande, circa 12 minuti, risultato immediato – senza registrazione.",
    testTitle: "Fai il test del QI",
    testDescription:
      "30 domande di riconoscimento di schemi, successioni numeriche, ragionamento verbale e logico. Senza limiti di tempo, con risultato immediato.",
    scaleTitle: "Scala del QI e calcolatore di percentile",
    scaleDescription:
      "Che cosa significa un valore di QI? Le fasce della scala del QI, le proporzioni nella popolazione e un calcolatore di percentile – spiegati in modo chiaro.",
    methodTitle: "Metodologia – come calcoliamo il QI",
    methodDescription:
      "La struttura delle domande, la ponderazione per difficoltà, la correzione per fascia d'età e la formula di conversione sulla scala del QI – e i limiti di un test online.",
    resultTitle: "Risultato",
    resultTitleIq: "QI {iq} – {band}",
    resultDescription: "Stima del QI: {iq} ({band}). {correct}/{total} risposte corrette. Fai anche tu il test!",
    termsTitle: "Termini e condizioni",
    privacyTitle: "Informativa sulla privacy",
    subscriptionTitle: "Gestione abbonamento",
    demoTitle: "Pagamento (simulazione per sviluppatori)",
  },

  brand: {
    tagline: "Test del QI online, con risultato immediato",
    home: "{brand} – pagina iniziale",
  },

  nav: {
    test: "Il test",
    scale: "Scala del QI",
    method: "Metodologia",
    faq: "FAQ",
    main: "Navigazione principale",
    mobile: "Navigazione mobile",
    open: "Apri il menu",
    close: "Chiudi il menu",
    start: "Inizia il test",
    startShort: "Test",
    language: "Lingua",
  },

  domains: {
    matrix: {
      name: "Riconoscimento di schemi",
      short: "Matrici",
      blurb: "Individuare regole visive in griglie di figure 3×3: è la misura più pura dell'intelligenza fluida.",
    },
    numeric: {
      name: "Ragionamento numerico",
      short: "Numeri",
      blurb: "Le regole delle successioni numeriche, proporzioni e brevi problemi da risolvere a mente.",
    },
    verbal: {
      name: "Ragionamento verbale",
      short: "Parole",
      blurb: "Analogie, contrari e intrusi: riconoscere i rapporti tra i concetti.",
    },
    logic: {
      name: "Ragionamento logico",
      short: "Logica",
      blurb: "Ordinamenti, tempo, visione spaziale e sillogismi: il pensiero che procede passo dopo passo, seguendo le regole.",
    },
  },

  difficulty: { easy: "Facile", medium: "Media", hard: "Difficile" },

  ages: { u16: "Sotto i 16 anni", none: "non indicata" },

  bands: {
    top: {
      label: "Eccezionalmente alto",
      text: "Circa il 2% della popolazione raggiunge un risultato simile. Riconosci le regole astratte in modo rapido e affidabile, anche in situazioni complesse.",
    },
    high: {
      label: "Alto",
      text: "Hai ottenuto un risultato ben sopra la media: te la cavi bene anche con i compiti più complessi, che richiedono di seguire più regole contemporaneamente.",
    },
    above: {
      label: "Sopra la media",
      text: "Te la sei cavata meglio della maggior parte delle persone. Cogli rapidamente i nuovi schemi e tieni bene a mente i dettagli.",
    },
    avg: { label: "Nella media", text: "In questa fascia rientra metà della popolazione. Un profilo di ragionamento stabile ed equilibrato." },
    below: {
      label: "Sotto la media",
      text: "Il risultato di un test online dipende da molti fattori: stanchezza, attenzione, fretta. Vale la pena riprovare quando sei riposato.",
    },
    low: { label: "Basso", text: "Questo risultato deriva da una breve serie di domande online, quindi non trarne conclusioni affrettate." },
    vlow: {
      label: "Molto basso",
      text: "Una breve serie di domande online non è adatta a fare una diagnosi. Se serve una misurazione vera, la soluzione è un test somministrato da uno specialista.",
    },
  },

  scaleBands: {
    vlow: {
      label: "Molto basso",
      desc: "Per una valutazione reale serve un esame standardizzato condotto da uno specialista: un test online non è adatto a questo scopo.",
    },
    low: { label: "Basso", desc: "Nei test online, spesso sono la stanchezza, la disattenzione o una barriera linguistica ad abbassare il risultato fino a questa fascia." },
    below: { label: "Sotto la media", desc: "Un ragionamento astratto un po' più lento della media: una fascia più che sufficiente per la vita di tutti i giorni." },
    avg: { label: "Nella media", desc: "Qui rientra metà della popolazione: è la fascia «normale», con un profilo di ragionamento equilibrato." },
    above: { label: "Sopra la media", desc: "Riconoscimento rapido degli schemi e buona memoria di lavoro: le nuove regole si colgono in fretta." },
    high: { label: "Alto", desc: "Anche i compiti complessi, che richiedono di seguire più regole insieme, riescono bene." },
    top: { label: "Eccezionale", desc: "Circa il 2% della popolazione. Riconoscimento rapido e affidabile delle regole astratte, anche in situazioni complicate." },
  },

  ordinal: "{n}°",

  charts: {
    bellHint: "Passa il mouse (o tocca) su una fascia",
    bellShare: "· circa il {share}% della popolazione",
    bellAria: "Distribuzione normale dei valori di QI",
    bellYou: "Tu: {iq}",
    radarAria: "Risultato per area",
    gaugeLabel: "Stima del QI",
    betterThan: "Meglio del {p}% della popolazione",
  },

  home: {
    hero: {
      chip: "Test del QI online · risultato immediato",
      title: ["Qual è", "il tuo *QI?*"],
      lead: "Da una banca di {pool} domande ne ricevi ogni volta {total} nuove, di riconoscimento di schemi, successioni numeriche, parole e logica. Alla fine: stima del QI immediata, percentile e analisi per area – senza registrazione.",
      cta: "Inizia il test",
      try: "Prova con una domanda",
      facts: { tasks: "domande", minutes: "minuti", areas: "aree di abilità" },
      scroll: "Scorri",
      ruleLabel: "Regola:",
      rules: { nested: "Due quadrati latini", sum: "1ª + 2ª = 3ª", rotate: "Rotazione +90°", fill: "Riempimento per colonna" },
    },
    marquee: ["Schemi", "Successioni", "Analogie", "Rotazioni", "Quadrati latini", "Sillogismi", "Visione spaziale", "Intrusi", "Proporzioni", "Ordinamenti"],
    domains: {
      eyebrow: "Che cosa misura il test?",
      title: ["Quattro abilità,", "*un solo numero.*"],
      lead: "Le domande coprono quattro aree complementari. Alla fine non ottieni solo un valore di QI, ma vedi anche in quale area sei più forte.",
      count: "{n} domande",
      word: { a: "cane", b: "cucciolo", c: "gatto", tries: ["topo", "latte", "gattino"] },
      people: ["Marco", "Giulia", "Sara", "Luca"],
      sorted: "più grande → più giovane",
      unsorted: "affermazioni in disordine",
    },
    steps: {
      eyebrow: "Come funziona?",
      title: ["Tre passaggi,", "circa dodici minuti."],
      items: [
        {
          title: "Indica la tua fascia d'età",
          text: "Basta un clic. In base all'età affiniamo il termine di confronto – non servono registrazione né account.",
        },
        {
          title: "Risolvi le {total} domande",
          text: "Nessun limite di tempo. Puoi procedere anche con la tastiera (A–F, frecce), tornare indietro e saltare a qualsiasi domanda.",
        },
        {
          title: "Ricevi il risultato",
          text: "Subito dopo lo sblocco: stima del QI con percentile, analisi per area e la soluzione di ogni domanda con spiegazione.",
        },
      ],
    },
    tryIt: {
      eyebrow: "Domanda di prova",
      title: ["Quale figura va", "al posto del punto interrogativo?"],
      lead: "Un facile riscaldamento: nel test ti aspettano {n} domande di questo tipo.",
      correct: "Esatto! È la risposta giusta.",
      wrong: "Non proprio: la risposta giusta è la {letter}.",
      explain:
        "In ogni riga la forma e il riempimento sono uguali, mentre da sinistra a destra cresce la dimensione: piccola, media, grande. L'elemento mancante è la stella grande e vuota.",
      full: "Passa al test completo",
      again: "Di nuovo",
      hint: "Osserva che cosa cambia lungo le righe e le colonne – forma, dimensione, riempimento – poi scegli una delle sei opzioni.",
    },
    scale: {
      eyebrow: "La scala del QI",
      title: ["La media è 100.", "La maggioranza sta tra 85 e 115."],
      lead: "Il QI non è una misura assoluta, ma relativa: indica dove ti collochi nella distribuzione della popolazione. La scala ha media 100 e deviazione standard 15, quindi circa due terzi delle persone si trovano tra 85 e 115.",
      link: "Scala del QI dettagliata e calcolatore di percentile →",
    },
    preview: {
      eyebrow: "Il tuo risultato",
      title: ["Non solo un numero:", "*un profilo completo.*"],
      sample: "Risultato di esempio",
      sampleChip: "{band} · {ord} percentile",
      points: [
        { t: "Stima del QI e percentile", d: "Dove ti collochi rispetto alla popolazione, con un solo numero chiaro." },
        { t: "Analisi per area", d: "Schemi, numeri, parole, logica: vedi qual è il tuo punto di forza." },
        { t: "Soluzioni con spiegazione", d: "La risposta corretta a tutte le 30 domande, con il ragionamento." },
        { t: "Link condivisibile", d: "Con un clic puoi inviarlo ai tuoi amici, così possono provarci anche loro." },
      ],
      price:
        "Il test è gratuito. Puoi sbloccare tutto il risultato con l'accesso completo di {days} giorni a *{trial}*; se non disdici, dal {nextDay}° giorno costa {monthly} al mese – disdicibile in qualsiasi momento.",
    },
    faq: {
      eyebrow: "FAQ",
      title: ["Domande", "frequenti."],
      lead: "Tutto quello che vale la pena sapere prima di iniziare – in breve e con sincerità.",
    },
    final: {
      eyebrow: "Sei pronto?",
      title: "Dodici minuti e *lo scopri.*",
      text: "{total} domande, senza limiti di tempo né registrazione. Il test è gratuito; il risultato dettagliato è disponibile con l'accesso completo di {days} giorni ({trial}).",
      cta: "Iniziamo!",
    },
  },

  faq: [
    {
      q: "Quanto costa?",
      a: "Fare il test è gratuito e non richiede registrazione. Puoi sbloccare il risultato dettagliato con l'accesso completo di {days} giorni, che costa {trial}; in questo periodo puoi fare test illimitati e vedere tutti i risultati. Se non disdici entro i primi {days} giorni, dal {nextDay}° giorno l'accesso prosegue come abbonamento mensile a {monthly} fino alla disdetta: puoi disdire in qualsiasi momento, con un clic. Puoi pagare con carta, Apple Pay o Google Pay.",
    },
    {
      q: "Come posso disdire l'abbonamento?",
      a: "In qualsiasi momento, con pochi clic: clicca sul link «Gestisci / disdici l'abbonamento» in fondo alla pagina e disdici nel portale clienti sicuro di Stripe. Se disdici durante il periodo di prova, non ci saranno altri addebiti; l'accesso resta attivo fino alla fine del periodo già pagato.",
    },
    {
      q: "Quanto tempo ci vuole?",
      a: "Le 30 domande si risolvono in media in 10–15 minuti. Non c'è limite di tempo e il tempo non influisce sul punteggio: meglio ragionare sulle domande che andare di fretta.",
    },
    {
      q: "Quanto è preciso un test del QI online?",
      a: "Una breve serie di domande online dà una buona stima di come te la cavi nei compiti che misurano il ragionamento astratto, ma non sostituisce un esame standardizzato somministrato da uno psicologo (per es. la WAIS). Considera il risultato come puramente indicativo.",
    },
    {
      q: "Come calcolate il QI?",
      a: "Ogni risposta corretta vale un punteggio ponderato in base alla difficoltà (facile 1, media 1,5, difficile 2). Questo punteggio viene confrontato con una distribuzione ipotetica della popolazione – con una piccola correzione per fascia d'età – e poi riportato sulla consueta scala con media 100 e deviazione standard 15. I dettagli sono nella pagina Metodologia.",
    },
    {
      q: "Posso tornare a una domanda precedente?",
      a: "Sì. Durante il test puoi tornare indietro in qualsiasi momento, saltare una domanda e, dalla barra in alto, passare a qualsiasi domanda. Prima dell'invio vedi anche un riepilogo delle domande saltate.",
    },
    {
      q: "Che cosa succede alle mie risposte?",
      a: "Usiamo le tue risposte solo per la valutazione: al momento del pagamento vengono associate alla transazione in forma breve e codificata, e da lì calcoliamo il risultato. Non chiediamo nome né account; i dati della tua carta sono gestiti da Stripe e noi non li vediamo. Per il pagamento Stripe chiede un indirizzo e-mail per la ricevuta. Per gli abbonati impostiamo anche un cookie, così il browser riconosce l'abbonamento attivo.",
    },
    {
      q: "Posso fare il test più volte?",
      a: "Certo. Dalla banca di 90 domande ricevi ogni volta una combinazione diversa, e le domande che non hai ancora visto hanno la precedenza: in tre tentativi consecutivi nessuna domanda si ripete. Però prendi confidenza con i tipi di domanda, quindi il risultato di un nuovo tentativo tende a essere un po' più alto.",
    },
    {
      q: "È adatto anche ai ragazzi?",
      a: "Le domande sono comprensibili a partire dai 12 anni. Per chi ha meno di 16 anni applichiamo una piccola correzione per fascia d'età, ma per i ragazzi vale ancora di più che un test online serve solo come orientamento giocoso. Pagare e abbonarsi è possibile solo per utenti maggiorenni (o che agiscono con il consenso del proprio rappresentante legale).",
    },
  ],

  footer: {
    blurb: "90 domande sviluppate da noi, in quattro aree di abilità – senza registrazione.",
    pages: "Pagine",
    takeTest: "Fai il test del QI",
    important: "Importante",
    disclaimer:
      "Il risultato è una stima indicativa, non una diagnosi medica o psicologica. I dati della carta sono gestiti da Stripe: noi non li vediamo e non li conserviamo.",
    legal: "Informazioni legali",
    terms: "Termini e condizioni",
    privacy: "Informativa sulla privacy",
    subscription: "Gestisci / disdici l'abbonamento",
    operator: "Gestore",
    companyId: "Numero di identificazione (IČO)",
    taxId: "Codice fiscale (DIČ)",
    contact: "Contatti",
  },

  test: {
    runner: {
      elapsed: "Tempo trascorso",
      exit: "Esci",
      questions: "Domande",
      questionN: "Domanda {n}",
      answeredMark: " (con risposta)",
      answeredCount: "{a} / {total} con risposta",
      paging: "Navigazione",
      back: "Indietro",
      keysAnswer: "risposta ·",
      keysPage: "navigazione",
      summary: "Riepilogo",
      next: "Avanti",
      skip: "Salta",
    },
    intro: {
      eyebrow: "Prima di iniziare",
      title: "Trova un *angolo tranquillo.*",
      lead: "Disattiva le notifiche e risolvi le domande senza aiuto. Carta e penna sono ammesse; calcolatrice e ricerche su internet no.",
      rules: {
        tasks: "domande, scelte da una banca di {pool}",
        minutes: "minuti: il tempo medio per completarlo",
        noLimit: "nessun limite di tempo, il tempo non conta",
        back: "puoi tornare indietro e saltare domande",
      },
      pendingTitle: "Ti aspetta già il risultato di un test completato.",
      pendingText: "Hai risposto a {a} / {total} domande. Puoi sbloccare il risultato in qualsiasi momento.",
      pendingCta: "Sblocca il risultato",
      savedTitle: "Hai un test lasciato a metà.",
      savedText: "Hai già risposto a {a} / {total} domande. Puoi riprendere da dove avevi lasciato.",
      savedCta: "Continua",
      age: "Fascia d'età",
      ageHint: "– per il termine di confronto (facoltativa)",
      tip: "Suggerimento: puoi rispondere con i tasti {a}–{f} e spostarti con le frecce.",
      startNew: "Inizia un nuovo test",
      start: "Inizia",
    },
    question: {
      difficulty: "Difficoltà: {d}",
      pickMissing: "Scegli l'elemento mancante:",
    },
    review: {
      eyebrow: "Riepilogo",
      allDone: "Hai risposto a *tutte le domande.*",
      open: { one: "C'è ancora {n} domanda *senza risposta.*", other: "Ci sono ancora {n} domande *senza risposta.*" },
      allDoneText: "Se vuoi, puoi ancora ricontrollare le tue risposte: basta un clic sul numero.",
      openText: "Le domande saltate contano come risposte sbagliate. Se sei in dubbio, conviene tirare a indovinare.",
      unanswered: " – senza risposta",
      answerLetter: " – risposta {l}",
      toSkipped: "Vai alle domande saltate",
      toQuestions: "Torna alle domande",
      submit: "Valuta",
    },
    analyzing: {
      title: "Valutazione in corso…",
      steps: ["Controllo delle risposte", "Ponderazione per difficoltà", "Confronto per fascia d'età", "Calcolo del percentile", "Creazione del profilo"],
    },
  },

  paywall: {
    eyebrow: "Valutazione completata",
    title: "Il tuo risultato *è pronto.*",
    summary: "Hai risposto a {a} / {total} domande{time}. Sblocca il risultato e scopri dove ti collochi.",
    summaryTime: " in {t}",
    preview: "Il tuo risultato",
    cancelled: "Il pagamento è stato interrotto: non ti è stato addebitato nulla. Puoi riprovare in qualsiasi momento.",
    includes: "L'accesso completo comprende:",
    perks: [
      { t: "Stima del QI e percentile", d: "Esattamente dove ti collochi rispetto alla popolazione." },
      { t: "Analisi per area", d: "Schemi, numeri, parole, logica: qual è il tuo punto di forza." },
      { t: "La soluzione di tutte le {total} domande", d: "Le risposte corrette con il ragionamento, accanto alle tue." },
      { t: "Nuovi test illimitati", d: "Per tutta la durata dell'accesso vedi subito anche ogni tuo risultato successivo." },
    ],
    accessName: "Pagamento",
    consent:
      "Accetto i [Termini e condizioni](terms) e l'[Informativa sulla privacy](privacy), chiedo l'avvio immediato del servizio e prendo atto che in tal modo perdo il diritto di recesso di 14 giorni.",
    consentNeeded: "Per continuare, accetta la dichiarazione qui sopra.",
    methodLabel: "Metodo di pagamento",
    card: "Carta di debito o di credito",
    loading: "Caricamento del modulo di pagamento…",
    email: "Indirizzo e-mail",
    emailPlaceholder: "nome@esempio.it",
    emailHint: "Qui ti invieremo la ricevuta – con questo indirizzo puoi anche gestire l'abbonamento.",
    invalidEmail: "Inserisci un indirizzo e-mail valido.",
    pay: "Paga {amount}",
    processing: "Elaborazione del pagamento…",
    close: "Annulla",
    busy: "Reindirizzamento…",
    trust: ["SSL a 256 bit", "Pagamento tramite Stripe", "Disdici quando vuoi"],
    renewal:
      "Se non disdici entro i primi {days} giorni, dal {nextDay}° giorno il tuo abbonamento prosegue a {monthly} al mese fino alla disdetta. Puoi disdire in qualsiasi momento, con un clic, nella pagina [Gestisci l'abbonamento](subscription).",
    restart: "Preferisco iniziare un nuovo test",
    unknownError: "Errore sconosciuto.",
    member: {
      title: "Hai un abbonamento attivo",
      text: "Per tutta la durata dell'abbonamento puoi aprire gratuitamente tutti i tuoi risultati.",
      cta: "Apri il risultato",
      manage: "Gestisci l'abbonamento",
    },
  },

  result: {
    eyebrow: "Il tuo risultato",
    verdict: { top: "Eccellente", strong: "Forte", avg: "Nella media", grow: "Migliorabile" },
    shareText: "La mia stima del QI nel test di TestMyAbilities è {iq}. E la tua?",
    shareTitle: "Il mio risultato del QI",
    copied: "Link copiato!",
    share: "Condividi il risultato",
    again: "Rifaccio il test",
    stats: { correct: "risposte corrette", time: "tempo impiegato", percentile: "percentile", age: "fascia d'età" },
    topShare: "Rientri all'incirca nel {top}% migliore.",
    strongest: "La tua area più forte: {domain}.",
    bell: {
      eyebrow: "Dove ti collochi?",
      title: ["Nella distribuzione", "della popolazione."],
      lead: "L'area evidenziata mostra quale parte della popolazione ottiene un punteggio inferiore al tuo: circa il {p}%.",
    },
    domains: { eyebrow: "Analisi per area", title: ["Ecco il tuo", "*punto di forza.*"] },
    solutions: { eyebrow: "Soluzioni", title: ["Ogni domanda,", "con il ragionamento."] },
    subBanner:
      "Il tuo abbonamento è attivo: vedrai subito anche i risultati dei tuoi prossimi test, finché non lo disdici. [Gestisci / disdici l'abbonamento](sub)",
    disclaimer:
      "*Importante:* si tratta di una stima basata su una breve serie di domande online. Non sostituisce un test di intelligenza standardizzato somministrato da uno psicologo e non può servire come base per decisioni mediche o lavorative. I dettagli del calcolo si trovano nella pagina [Metodologia](method).",
    review: {
      all: "Tutte",
      wrong: "Sbagliate / saltate",
      right: "Corrette",
      ok: "corretta",
      skipped: "saltata",
      bad: "sbagliata",
      matrixItem: "Matrice: quale figura va al posto del punto interrogativo?",
      you: "tu:",
      good: "giusta:",
    },
    locked: {
      eyebrow: "Risultato",
      unpaidTitle: "Il pagamento non è ancora arrivato.",
      invalidTitle: "A questo link non corrisponde alcun risultato.",
      unpaidText:
        "Se hai appena pagato, aggiorna la pagina tra qualche secondo. Se hai interrotto il pagamento, puoi riprovare in qualsiasi momento dalla pagina del test.",
      invalidText: "Forse il link si è danneggiato durante la copia. Se hai già completato il test, puoi sbloccare il risultato dalla pagina del test.",
      back: "Torna al test",
      open: "Apri il test",
    },
  },

  scalePage: {
    eyebrow: "Scala del QI",
    title: ["Che cosa significa", "*un valore di QI?*"],
    lead: "Il QI indica dove ti collochi nella distribuzione della popolazione. Sposta il cursore e guarda a quale percentuale corrisponde ogni valore.",
    bandsEyebrow: "Le fasce",
    bandsTitle: ["La scala del QI,", "fascia per fascia."],
    topics: [
      {
        t: "Perché la media è proprio 100?",
        d: "Il QI è un valore relativo. I test vengono tarati su un ampio campione in modo che la prestazione media valga 100 punti e uno scarto pari a una deviazione standard valga 15 punti. Così qualsiasi valore si traduce subito nella percentuale di popolazione che superi.",
      },
      {
        t: "Che cosa misura – e che cosa no?",
        d: "I test del QI misurano il ragionamento astratto, il riconoscimento di schemi, la memoria di lavoro e il ragionamento linguistico-logico. Non misurano la creatività, l'intelligenza emotiva, l'impegno o le conoscenze professionali, che contano almeno altrettanto.",
      },
      {
        t: "L'effetto Flynn",
        d: "Nel corso del Novecento i punteggi grezzi nei test sono migliorati di circa 3 punti per decennio nei paesi sviluppati. Per questo le norme vanno ricalcolate regolarmente: un QI misurato con norme vecchie risulta gonfiato verso l'alto.",
      },
    ],
    cta: "Misura il tuo",
    calc: {
      eyebrow: "Calcolatore di percentile",
      iqValue: "Valore di QI",
      percentile: "percentile",
      ofHundred: "persone su 100 hanno un valore più basso",
    },
  },

  methodPage: {
    eyebrow: "Metodologia",
    title: ["Come le tue risposte diventano", "*un numero.*"],
    lead: "Un calcolo trasparente e verificabile – e parole sincere su che cosa può fare un test del QI online e che cosa no.",
    tasks: {
      title: "Le domande",
      p1: "La banca è composta da {pool} domande sviluppate da noi, di cui {total} compaiono in ogni test. Per ciascuna delle {total} posizioni del test esistono {variants} varianti, della stessa area e della stessa difficoltà: così ogni combinazione ha la stessa struttura e i risultati sono confrontabili.",
      pairNote: "La coppia di numeri: domande per test / domande nella banca.",
      p2: "Le matrici (griglie di figure 3×3 di tipo Raven) sono la misura più pura dell'intelligenza fluida, per questo costituiscono quasi metà delle domande. La difficoltà cresce più o meno progressivamente: in ogni test ci sono {easy} domande facili, {medium} medie e {hard} difficili, e le aree si alternano.",
      p3: "Il browser ricorda quali domande hai già visto e, al tentativo successivo, dà la precedenza a quelle nuove: così in tre tentativi consecutivi nessuna domanda si ripete.",
    },
    scoring: {
      title: "Punteggio",
      p1: "Ogni risposta corretta vale un punteggio ponderato in base alla difficoltà; le risposte saltate e quelle sbagliate valgono 0 punti.",
      points: "{d} = {w} pt",
      p2: "Il punteggio ponderato viene diviso per il massimo ottenibile (si ottiene così un valore tra 0 e 1) e poi riportato sulla consueta scala del QI:",
      formula: "s  = punteggio ponderato / massimo\nz  = (s − ({mean} + correzione)) / {sd}\nQI = 100 + 15 · z        (limitato tra {min} e {max})",
      p3: "La media di {mean} e la deviazione standard di {sd} descrivono la distribuzione stimata della popolazione per questa serie di domande. Il percentile si ricava dalla funzione di ripartizione della distribuzione normale: un QI di 115, per esempio, corrisponde circa all'84° percentile.",
    },
    age: {
      title: "Correzione per fascia d'età",
      p1: "Le prestazioni del ragionamento fluido raggiungono il picco verso la metà dei vent'anni e poi calano lentamente. Per questo il risultato delle persone più anziane e di chi ha meno di 16 anni viene confrontato con una media attesa leggermente più bassa.",
    },
    limits: {
      title: "Limiti",
      items: [
        "L'errore di misura di un test online di 30 domande è molto più grande di quello di un esame di 1–2 ore condotto da uno psicologo. È meglio interpretare il risultato come una fascia di ±8–10 punti.",
        "La norma è stimata, non rilevata su un campione rappresentativo: il valore numerico esatto è quindi indicativo.",
        "Ripetere il test gonfia il risultato verso l'alto a causa dell'effetto di apprendimento.",
        "Il risultato non è una diagnosi e non è adatto a supportare decisioni scolastiche, lavorative o mediche.",
      ],
    },
    payment: {
      title: "Pagamento e protezione dei dati",
      p1: "Il test è gratuito; il risultato dettagliato è disponibile con l'accesso completo di {days} giorni ({trial}; se non disdici, dal {nextDay}° giorno {monthly}/mese, disdicibile in qualsiasi momento). Il punteggio viene calcolato sul server e le risposte corrette non arrivano mai al tuo browser. Al momento del pagamento le tue risposte vengono associate alla transazione Stripe in forma breve e codificata, e la pagina del risultato calcola il risultato da lì: non le conserviamo in un database separato.",
      p2: "Lo stato di un test lasciato a metà viene conservato solo dal tuo browser, così puoi riprenderlo. Non chiediamo nome né account; i dati della carta sono gestiti da Stripe e noi non li vediamo.",
      cta: "Inizia il test",
    },
  },

  subscriptionPage: {
    eyebrow: "Abbonamento",
    title: ["Gestisci il tuo", "*abbonamento.*"],
    lead: "Qui vedi lo stato del tuo abbonamento e puoi disdirlo. La disdetta viene registrata subito; l'accesso resta attivo fino alla fine del periodo già pagato.",
    status: "Stato",
    trialing: "Periodo di prova – termina il {date}. Se non disdici entro quella data, in seguito ti verranno addebitati {monthly} al mese.",
    active: "Attivo. Prossimo addebito: {date}, {amount}.",
    canceling: "Disdetto. L'accesso resta attivo fino al {date}; non ci saranno altri addebiti.",
    pastDue: "L'ultimo addebito non è andato a buon fine. Aggiorna il metodo di pagamento nel portale clienti.",
    none: "Su questo dispositivo non c'è alcun abbonamento attivo.",
    manage: "Gestisci / disdici l'abbonamento",
    manageHint: "Si apre il portale clienti sicuro di Stripe: lì puoi disdire l'abbonamento, cambiare carta e scaricare le tue fatture.",
    noDevice: "Ti sei abbonato su un altro dispositivo o browser? Accedi con l'indirizzo e-mail usato al pagamento: ti invieremo un codice di 6 cifre e i tuoi risultati si apriranno anche qui.",
    help: "Hai domande o la disdetta non va a buon fine? Scrivici: {email}",
    portalError: "Il portale clienti non è disponibile al momento. Riprova tra un minuto, oppure scrivici: {email}",
    demoNote: "Modalità sviluppatore: nessuna chiave Stripe configurata, quindi qui non esiste un vero abbonamento.",
  },

  demoPay: {
    chip: "Modalità sviluppatore – nessun pagamento reale",
    title: "Simulazione del pagamento",
    text: "Non è configurata alcuna chiave Stripe, quindi questa pagina sostituisce la pagina di pagamento di Stripe. Dopo aver impostato STRIPE_SECRET_KEY, qui comparirà il vero pagamento con carta.",
    item: "Risultato del test del QI",
    pay: "Simula un pagamento riuscito",
    cancel: "Annulla il pagamento",
  },

  notFound: {
    title: "Questa pagina non esiste.",
    text: "Forse c'è un errore di battitura nell'indirizzo, oppure la pagina è stata rimossa.",
    home: "Torna alla home",
  },

  legal: {
    updated: "In vigore dal: {date}",
    draftNote: "",
    toc: "Indice",
  },

  stripe: {
    subName: "Abbonamento TestMyAbilities",
    subDesc: "Test del QI e risultati dettagliati illimitati. Rinnovo mensile, disdicibile in qualsiasi momento.",
    trialName: "Accesso completo di {days} giorni",
    submitNote:
      "Oggi ti viene addebitato l'importo di {trial} per l'accesso completo di {days} giorni. Se non disdici entro i primi {days} giorni, dal {nextDay}° giorno ti verrà addebitato automaticamente l'importo di {monthly} al mese, fino alla disdetta. Puoi disdire in qualsiasi momento tramite il link «Gestisci / disdici l'abbonamento» in fondo al sito.",
  },

  auth: {
    title: "Accedi",
    intro: "Inserisci l'indirizzo e-mail collegato al tuo abbonamento: ti invieremo un codice di accesso di 6 cifre.",
    email: "Indirizzo e-mail",
    sendCode: "Invia il codice",
    sent: "Se a {email} è collegato un abbonamento, ti abbiamo inviato il codice. Controlla anche lo spam.",
    code: "Codice di accesso",
    verify: "Accedi",
    resend: "Richiedi un nuovo codice",
    otherEmail: "Usa un altro indirizzo",
    haveAccount: "Sei già abbonato?",
    login: "Accedi",
    backToPay: "Torna al pagamento",
    alreadyNote: "Questo indirizzo e-mail ha già un abbonamento, quindi non ti addebiteremo di nuovo. Ti abbiamo inviato un codice di accesso: accedi e il tuo risultato si aprirà.",
    signedIn: "Hai effettuato l'accesso su questo dispositivo.",
    logout: "Esci",
    errors: {
      invalidEmail: "Inserisci un indirizzo e-mail valido.",
      rateLimited: "Troppi tentativi. Attendi qualche minuto e riprova.",
      emailFailed: "Non è stato possibile inviare l'e-mail. Riprova tra un minuto.",
      unavailable: "L'accesso non è disponibile al momento. Riprova tra un minuto.",
      codeInvalid: "Il codice non è corretto. Controllalo e riprova.",
      codeExpired: "Il codice è scaduto. Richiedine uno nuovo.",
      codeLocked: "Troppi tentativi errati. Richiedi un nuovo codice.",
    },
  },

  email: {
    subject: "{code} – il tuo codice di accesso ({site})",
    intro: "Usa questo codice per accedere a {site}:",
    validity: "Il codice è valido per {minutes} minuti.",
    ignore: "Se non l'hai richiesto tu, puoi ignorare questa e-mail.",
  },

  api: {
    invalid: "Compilazione non valida.",
    unavailable: "La pagina di pagamento non è disponibile al momento. Riprova tra un minuto.",
    notConfigured: "Il pagamento non è ancora configurato su questo sito.",
    notMember: "Su questo dispositivo non c'è alcun abbonamento attivo.",
  },
};

export default it;
