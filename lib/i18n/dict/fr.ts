// Textes d'interface en français – traduction de hu.ts (même structure, voir les conventions de balisage dans hu.ts).
import type { Dict } from "./hu";

const fr: Dict = {
  lowerNames: true,

  meta: {
    siteTitle: "Test de QI en ligne avec résultat immédiat",
    siteDescription:
      "Quel est ton QI ? 30 questions de reconnaissance de motifs, de suites numériques, de raisonnement verbal et logique. Sans inscription, avec estimation immédiate du QI, centile et détail par domaine.",
    keywords: ["test de QI", "test de QI en ligne", "mesure du QI", "test d'intelligence", "test de matrices", "échelle de QI"],
    ogTitle: "Quel est ton QI ? · Test de QI en ligne",
    ogDescription: "30 questions, env. 12 minutes, résultat immédiat – sans inscription.",
    testTitle: "Passer le test de QI",
    testDescription: "30 questions de reconnaissance de motifs, de suites numériques, de raisonnement verbal et logique. Sans limite de temps, avec résultat immédiat.",
    scaleTitle: "Échelle de QI et calculateur de centile",
    scaleDescription: "Que signifie une valeur de QI ? Les tranches de l'échelle de QI, leur proportion dans la population et un calculateur de centile – expliqués simplement.",
    methodTitle: "Méthodologie – comment nous calculons le QI",
    methodDescription:
      "La structure des questions, la pondération selon la difficulté, la correction par tranche d'âge et la formule de conversion sur l'échelle de QI – ainsi que les limites d'un test en ligne.",
    resultTitle: "Résultat",
    resultTitleIq: "QI {iq} – {band}",
    resultDescription: "Estimation du QI : {iq} ({band}). {correct}/{total} bonnes réponses. Passe le test toi aussi !",
    termsTitle: "Conditions générales de vente",
    privacyTitle: "Politique de confidentialité",
    subscriptionTitle: "Gérer l'abonnement",
    demoTitle: "Paiement (simulation de développement)",
    thankYouTitle: "Paiement réussi",
  },

  brand: {
    tagline: "Test de QI en ligne, avec résultat immédiat",
    home: "{brand} – accueil",
  },

  nav: {
    test: "Le test",
    scale: "Échelle de QI",
    method: "Méthodologie",
    faq: "FAQ",
    main: "Navigation principale",
    mobile: "Navigation mobile",
    open: "Ouvrir le menu",
    close: "Fermer le menu",
    start: "Commencer le test",
    startShort: "Test",
    language: "Langue",
  },

  domains: {
    matrix: {
      name: "Reconnaissance de motifs",
      short: "Matrices",
      blurb: "Repérer des règles visuelles dans des grilles de figures 3×3 – la mesure la plus pure de l'intelligence fluide.",
    },
    numeric: {
      name: "Raisonnement numérique",
      short: "Nombres",
      blurb: "Logique des suites de nombres, proportions et petits problèmes à résoudre de tête.",
    },
    verbal: {
      name: "Raisonnement verbal",
      short: "Mots",
      blurb: "Analogies, contraires et intrus – repérer les relations entre les notions.",
    },
    logic: {
      name: "Raisonnement logique",
      short: "Logique",
      blurb: "Classements, temps, vision spatiale et syllogismes – la pensée méthodique, étape par étape.",
    },
  },

  difficulty: { easy: "Facile", medium: "Moyenne", hard: "Difficile" },

  ages: { u16: "moins de 16 ans", none: "non renseigné" },

  bands: {
    top: {
      label: "Exceptionnellement élevé",
      text: "Environ 2 % de la population obtient un tel résultat. Tu repères les règles abstraites rapidement et de façon fiable, même dans des situations complexes.",
    },
    high: {
      label: "Élevé",
      text: "Tu as obtenu un résultat nettement supérieur à la moyenne : les problèmes plus complexes, qui demandent de suivre plusieurs règles à la fois, te réussissent bien.",
    },
    above: {
      label: "Supérieur à la moyenne",
      text: "Tu t'en es mieux sorti que la plupart des gens. Tu saisis vite les nouveaux motifs et tu retiens bien les détails.",
    },
    avg: { label: "Moyen", text: "La moitié de la population se situe dans cette tranche. Un profil de raisonnement stable et équilibré." },
    below: {
      label: "Inférieur à la moyenne",
      text: "Le résultat d'un test en ligne dépend de beaucoup de choses – fatigue, attention, pression du temps. Ça vaut la peine de réessayer à tête reposée.",
    },
    low: { label: "Faible", text: "Ce résultat provient d'une courte série de questions en ligne : n'en tire pas de conclusions hâtives." },
    vlow: {
      label: "Très faible",
      text: "Une courte série de questions en ligne ne permet pas de poser un diagnostic. Si tu as besoin d'une vraie mesure, un test administré par un professionnel est la solution.",
    },
  },

  scaleBands: {
    vlow: {
      label: "Très faible",
      desc: "Une évaluation fiable nécessite un examen standardisé administré par un professionnel – un test en ligne n'est pas fait pour cela.",
    },
    low: { label: "Faible", desc: "Dans un test en ligne, la fatigue, le manque d'attention ou la barrière de la langue suffisent souvent à faire tomber le résultat dans cette tranche." },
    below: { label: "Inférieur à la moyenne", desc: "Un raisonnement abstrait un peu plus lent que la moyenne – une plage largement suffisante pour la vie quotidienne." },
    avg: { label: "Moyen", desc: "La moitié de la population se situe ici : c'est la plage « normale », avec un profil de raisonnement équilibré." },
    above: { label: "Supérieur à la moyenne", desc: "Reconnaissance rapide des motifs et bonne mémoire de travail – les nouvelles règles sont vite comprises." },
    high: { label: "Élevé", desc: "Les problèmes complexes, qui demandent de suivre plusieurs règles à la fois, sont bien maîtrisés." },
    top: { label: "Exceptionnel", desc: "Environ 2 % de la population. Reconnaissance rapide et fiable des règles abstraites, même dans des situations complexes." },
  },

  ordinal: "{n}e",

  charts: {
    bellHint: "Survole (ou touche) une tranche",
    bellShare: "· ~{share} % de la population",
    bellAria: "Distribution normale des valeurs de QI",
    bellYou: "Toi : {iq}",
    radarAria: "Résultat par domaine",
    gaugeLabel: "Estimation du QI",
    betterThan: "Meilleur que {p} % de la population",
  },

  home: {
    hero: {
      chip: "Test de QI en ligne · résultat immédiat",
      title: ["Quel est", "ton *QI ?*"],
      lead: "À chaque passage, tu reçois {total} nouvelles questions tirées d'une banque de {pool} : reconnaissance de motifs, suites numériques, mots et logique. À la fin, estimation immédiate du QI, centile et détail par domaine – sans inscription.",
      cta: "Commencer le test",
      try: "Essaie sur une question",
      facts: { tasks: "questions", minutes: "minutes", areas: "domaines de compétence" },
      scroll: "Défile",
      ruleLabel: "Règle :",
      rules: { nested: "Deux carrés latins", sum: "1ʳᵉ + 2ᵉ = 3ᵉ", rotate: "Rotation +90°", fill: "Remplissage par colonne" },
    },
    marquee: ["Motifs", "Suites numériques", "Analogies", "Rotations", "Carrés latins", "Syllogismes", "Vision spatiale", "Intrus", "Proportions", "Classements"],
    domains: {
      eyebrow: "Que mesure le test ?",
      title: ["Quatre compétences,", "*un seul chiffre.*"],
      lead: "Les questions couvrent quatre domaines complémentaires. À la fin, tu n'obtiens pas seulement une valeur de QI : tu vois aussi quel domaine est ton point fort.",
      count: "{n} questions",
      word: { a: "chien", b: "chiot", c: "chat", tries: ["souris", "lait", "chaton"] },
      people: ["Louis", "Chloé", "Emma", "Lucas"],
      sorted: "plus âgé → plus jeune",
      unsorted: "affirmations dans le désordre",
    },
    steps: {
      eyebrow: "Comment ça se passe ?",
      title: ["Trois étapes,", "environ douze minutes."],
      items: [
        {
          title: "Indique ta tranche d'âge",
          text: "Un seul clic. Nous ajustons la base de comparaison selon l'âge – pas d'inscription ni de compte utilisateur.",
        },
        {
          title: "Réponds aux {total} questions",
          text: "Pas de limite de temps. Tu peux aussi avancer au clavier (A–F, flèches), revenir en arrière et sauter à n'importe quelle question.",
        },
        {
          title: "Reçois ton résultat",
          text: "Immédiatement après le déblocage : estimation du QI avec centile, détail par domaine et la solution de chaque question avec explication.",
        },
      ],
    },
    tryIt: {
      eyebrow: "Question d'essai",
      title: ["Quelle figure remplace", "le point d'interrogation ?"],
      lead: "Un échauffement facile – {n} questions de ce type t'attendent dans le test.",
      correct: "Exactement ! C'est la bonne réponse.",
      wrong: "Pas tout à fait – la bonne réponse est la {letter}.",
      explain:
        "Dans chaque ligne, la forme et le remplissage sont identiques, et de gauche à droite la taille augmente : petit, moyen, grand. L'élément manquant est la grande étoile vide.",
      full: "Passer au test complet",
      again: "Recommencer",
      hint: "Observe ce qui change d'une ligne et d'une colonne à l'autre – forme, taille, remplissage –, puis choisis l'une des six possibilités.",
    },
    scale: {
      eyebrow: "L'échelle de QI",
      title: ["La moyenne est de 100.", "La majorité entre 85 et 115."],
      lead: "Le QI n'est pas une mesure absolue, mais relative : il indique ta position dans la distribution de la population. L'échelle a une moyenne de 100 et un écart-type de 15 – environ deux tiers des gens se situent donc entre 85 et 115.",
      link: "Échelle de QI détaillée et calculateur de centile →",
    },
    preview: {
      eyebrow: "Ton résultat",
      title: ["Pas juste un chiffre –", "*un profil complet.*"],
      sample: "Exemple de résultat",
      sampleChip: "{band} · {ord} centile",
      points: [
        { t: "Estimation du QI et centile", d: "Où tu te situes par rapport à la population – en un seul chiffre, facile à comprendre." },
        { t: "Détail par domaine", d: "Motifs, nombres, mots, logique : tu vois quel est ton point fort." },
        { t: "Solutions expliquées", d: "La bonne réponse aux 30 questions, avec le raisonnement." },
        { t: "Lien à partager", d: "Envoie-le à tes amis en un clic – ils pourront essayer à leur tour." },
      ],
      price:
        "Le test est gratuit. Tu peux débloquer tout ton résultat avec l'accès complet de {days} jours à *{trial}* ; si tu ne résilies pas, c'est ensuite {monthly} par mois à partir du {nextDay}e jour – résiliable à tout moment.",
    },
    faq: {
      eyebrow: "FAQ",
      title: ["Questions", "fréquentes."],
      lead: "Tout ce qu'il faut savoir avant de commencer – brièvement et honnêtement.",
    },
    final: {
      eyebrow: "Prêt ?",
      title: "Douze minutes, et *tu sauras.*",
      text: "{total} questions, sans limite de temps ni inscription. Le test est gratuit ; le résultat détaillé est disponible avec l'accès complet de {days} jours ({trial}).",
      cta: "C'est parti !",
    },
  },

  faq: [
    {
      q: "Combien ça coûte ?",
      a: "Passer le test est gratuit et ne demande aucune inscription. Tu peux débloquer le résultat détaillé avec l'accès complet de {days} jours, au prix de {trial} ; pendant cette période, tu peux passer autant de tests que tu veux et voir tous leurs résultats. Si tu ne résilies pas au cours des {days} premiers jours, l'accès se poursuit à partir du {nextDay}e jour sous forme d'abonnement à {monthly} par mois jusqu'à ce que tu le résilies – tu peux résilier à tout moment, en un clic. Tu peux payer par carte bancaire, Apple Pay ou Google Pay.",
    },
    {
      q: "Comment résilier l'abonnement ?",
      a: "À tout moment, en quelques clics : en bas de page, clique sur le lien « Gérer / résilier l'abonnement » pour résilier sur le portail client sécurisé de Stripe. Si tu résilies pendant la période d'essai, aucun autre montant ne sera prélevé ; ton accès reste actif jusqu'à la fin de la période déjà payée.",
    },
    {
      q: "Combien de temps dure le test ?",
      a: "Les 30 questions se résolvent en 10 à 15 minutes en moyenne. Il n'y a pas de limite de temps et le temps n'entre pas dans le score – mieux vaut bien réfléchir que se précipiter.",
    },
    {
      q: "Un test de QI en ligne est-il fiable ?",
      a: "Une courte série de questions en ligne donne une bonne estimation de tes performances dans les tâches de raisonnement abstrait, mais elle ne remplace pas un examen standardisé administré par un psychologue (p. ex. la WAIS). Considère le résultat comme indicatif.",
    },
    {
      q: "Comment calculez-vous le QI ?",
      a: "Chaque bonne réponse rapporte des points pondérés selon sa difficulté (facile 1, moyenne 1,5, difficile 2). Ce score est comparé à une distribution supposée de la population – avec une petite correction par tranche d'âge –, puis converti sur l'échelle habituelle de moyenne 100 et d'écart-type 15. Les détails se trouvent sur la page Méthodologie.",
    },
    {
      q: "Puis-je revenir à une question précédente ?",
      a: "Oui. Pendant le test, tu peux revenir en arrière à tout moment, passer une question et sauter à n'importe quelle question depuis la barre du haut. Avant d'envoyer, un récapitulatif t'indique aussi les questions laissées sans réponse.",
    },
    {
      q: "Que deviennent mes réponses ?",
      a: "Tes réponses servent uniquement à l'évaluation : lors du paiement, elles sont associées à la transaction sous une forme courte et codée, et c'est à partir de là que nous calculons le résultat. Nous ne demandons ni nom ni compte utilisateur ; tes données de carte sont gérées par Stripe, nous ne les voyons pas. Pour le paiement, Stripe demande une adresse e-mail pour le reçu. Pour les abonnés, nous plaçons aussi un cookie afin que le navigateur reconnaisse l'abonnement actif.",
    },
    {
      q: "Puis-je passer le test plusieurs fois ?",
      a: "Bien sûr. Grâce à la banque de 90 questions, tu reçois une sélection différente à chaque passage, et les questions que tu n'as pas encore vues sont prioritaires – sur trois passages consécutifs, aucune question ne se répète. En revanche, tu t'habitues aux types de questions : un nouveau résultat est donc généralement un peu plus élevé.",
    },
    {
      q: "Le test convient-il aux enfants ?",
      a: "Les questions sont compréhensibles à partir de 12 ans. Le résultat des moins de 16 ans est calculé avec une petite correction par tranche d'âge, mais pour les enfants plus encore, un test en ligne n'est qu'une façon ludique de se situer. Seul un utilisateur majeur (ou agissant avec l'accord de son représentant légal) peut payer et s'abonner.",
    },
  ],

  footer: {
    blurb: "90 questions conçues par nos soins dans quatre domaines de compétence – sans inscription.",
    pages: "Pages",
    takeTest: "Passer le test de QI",
    important: "Important",
    disclaimer:
      "Le résultat est une estimation indicative, pas un diagnostic médical ou psychologique. Les données de carte sont gérées par Stripe : nous ne les voyons pas et ne les conservons pas.",
    legal: "Informations légales",
    terms: "CGV",
    privacy: "Politique de confidentialité",
    subscription: "Gérer / résilier l'abonnement",
    operator: "Exploitant",
    companyId: "N° d'entreprise (IČO)",
    taxId: "N° fiscal (DIČ)",
    contact: "Contact",
  },

  test: {
    runner: {
      elapsed: "Temps écoulé",
      exit: "Quitter",
      questions: "Questions",
      questionN: "Question {n}",
      answeredMark: " (répondue)",
      answeredCount: "{a} / {total} répondues",
      paging: "Navigation",
      back: "Retour",
      keysAnswer: "répondre ·",
      keysPage: "naviguer",
      summary: "Récapitulatif",
      next: "Suivant",
      skip: "Passer",
    },
    intro: {
      eyebrow: "Avant de commencer",
      title: "Trouve un coin *tranquille.*",
      lead: "Désactive les notifications et résous les questions sans aide. Papier et crayon sont autorisés – calculatrice et recherche sur Internet ne le sont pas.",
      rules: {
        tasks: "questions, tirées d'une banque de {pool}",
        minutes: "minutes en moyenne pour le compléter",
        noLimit: "pas de limite de temps, la durée ne compte pas",
        back: "tu peux revenir en arrière et passer des questions",
      },
      pendingTitle: "Le résultat d'un test terminé t'attend déjà.",
      pendingText: "Tu as répondu à {a} questions sur {total}. Tu peux débloquer le résultat à tout moment.",
      pendingCta: "Débloquer le résultat",
      savedTitle: "Tu as un test inachevé.",
      savedText: "Tu as déjà répondu à {a} questions sur {total}. Tu peux reprendre là où tu t'es arrêté.",
      savedCta: "Reprendre",
      age: "Tranche d'âge",
      ageHint: "– pour la base de comparaison (facultatif)",
      tip: "Astuce : réponds avec les touches {a} à {f} et navigue avec les flèches.",
      startNew: "Commencer un nouveau test",
      start: "Commencer",
    },
    question: {
      difficulty: "Difficulté : {d}",
      pickMissing: "Choisis l'élément manquant :",
    },
    review: {
      eyebrow: "Récapitulatif",
      allDone: "Tu as répondu à *toutes les questions.*",
      open: { one: "Il reste {n} question *sans réponse.*", other: "Il reste {n} questions *sans réponse.*" },
      allDoneText: "Si tu veux, tu peux encore revoir tes réponses – un clic sur le numéro suffit.",
      openText: "Les questions passées comptent comme de mauvaises réponses. En cas de doute, mieux vaut deviner.",
      unanswered: " – sans réponse",
      answerLetter: " – réponse {l}",
      toSkipped: "Aux questions passées",
      toQuestions: "Retour aux questions",
      submit: "Évaluer",
    },
    analyzing: {
      title: "Évaluation en cours…",
      steps: ["Vérification des réponses", "Pondération selon la difficulté", "Comparaison par tranche d'âge", "Calcul du centile", "Établissement du profil"],
    },
  },

  paywall: {
    eyebrow: "Évaluation terminée",
    title: "Ton résultat est *prêt.*",
    summary: "Tu as répondu à {a} questions sur {total}{time}. Débloque-le et découvre où tu te situes.",
    summaryTime: " en {t}",
    preview: "Ton résultat",
    cancelled: "Le paiement a été interrompu – rien n'a été débité. Tu peux réessayer à tout moment.",
    includes: "L'accès complet comprend :",
    perks: [
      { t: "Estimation du QI et centile", d: "Où tu te situes exactement par rapport à la population." },
      { t: "Détail par domaine", d: "Motifs, nombres, mots, logique – lequel est ton point fort." },
      { t: "La solution des {total} questions", d: "Les bonnes réponses avec le raisonnement, à côté de tes propres réponses." },
      { t: "Nouveaux tests illimités", d: "Pendant toute la durée de l'accès, tu vois aussi immédiatement chacun de tes résultats suivants." },
    ],
    accessName: "Paiement",
    consent:
      "J'accepte les [CGV](terms) et la [politique de confidentialité](privacy), je demande le démarrage immédiat du service et je reconnais perdre ainsi mon droit de rétractation de 14 jours.",
    consentNeeded: "Pour continuer, accepte la déclaration ci-dessus.",
    methodLabel: "Moyen de paiement",
    card: "Carte bancaire",
    loading: "Chargement du formulaire de paiement…",
    email: "Adresse e-mail",
    emailPlaceholder: "nom@exemple.fr",
    emailHint: "Nous t'y enverrons ton reçu – elle te sert aussi à gérer ton abonnement.",
    invalidEmail: "Saisis une adresse e-mail valide.",
    pay: "Payer {amount}",
    processing: "Traitement du paiement…",
    close: "Annuler",
    busy: "Redirection…",
    trust: ["SSL 256 bits", "Paiement via Stripe", "Résiliable à tout moment"],
    renewal:
      "Si tu ne résilies pas au cours des {days} premiers jours, ton abonnement se poursuit à partir du {nextDay}e jour au tarif de {monthly} par mois, jusqu'à ce que tu le résilies. Tu peux résilier à tout moment, en un clic, sur la page [Gérer l'abonnement](subscription).",
    restart: "Je préfère commencer un nouveau test",
    unknownError: "Erreur inconnue.",
    member: {
      title: "Tu as un abonnement actif",
      text: "Pendant ton abonnement, tous tes résultats sont accessibles gratuitement.",
      cta: "Ouvrir le résultat",
      manage: "Gérer l'abonnement",
    },
  },

  result: {
    eyebrow: "Ton résultat",
    verdict: { top: "Exceptionnel", strong: "Solide", avg: "Moyen", grow: "À développer" },
    shareText: "Mon QI estimé au test TestMyAbilities : {iq}. Et toi ?",
    shareTitle: "Mon résultat de QI",
    copied: "Lien copié !",
    share: "Partager le résultat",
    again: "Refaire le test",
    stats: { correct: "bonnes réponses", time: "durée du test", percentile: "centile", age: "tranche d'âge" },
    topShare: "Tu fais à peu près partie des {top} % les meilleurs.",
    strongest: "Ton domaine le plus fort : {domain}.",
    bell: {
      eyebrow: "Où te situes-tu ?",
      title: ["Dans la distribution", "de la population."],
      lead: "La zone hachurée indique la part de la population qui obtient un score inférieur au tien : environ {p} %.",
    },
    domains: { eyebrow: "Détail par domaine", title: ["C'est ici que tu es", "*le plus fort.*"] },
    solutions: { eyebrow: "Solutions", title: ["Chaque question,", "avec le raisonnement."] },
    subBanner:
      "Ton abonnement est actif – tu verras aussi immédiatement le résultat de tes prochains tests, jusqu'à ce que tu le résilies. [Gérer / résilier l'abonnement](sub)",
    disclaimer:
      "*Important :* il s'agit d'une estimation fondée sur une courte série de questions en ligne. Elle ne remplace pas un test d'intelligence standardisé administré par un psychologue et ne peut servir de base à aucune décision médicale ou professionnelle. Le détail du calcul se trouve sur la page [Méthodologie](method).",
    review: {
      all: "Toutes",
      wrong: "Fausses / passées",
      right: "Justes",
      ok: "juste",
      skipped: "passée",
      bad: "fausse",
      matrixItem: "Matrice : quelle figure remplace le point d'interrogation ?",
      you: "toi :",
      good: "bonne :",
    },
    locked: {
      eyebrow: "Résultat",
      unpaidTitle: "Le paiement n'est pas encore arrivé.",
      invalidTitle: "Aucun résultat n'est associé à ce lien.",
      unpaidText:
        "Si tu viens de payer, actualise la page dans quelques secondes. Si tu as interrompu le paiement, tu peux réessayer à tout moment depuis la page du test.",
      invalidText: "Le lien a peut-être été abîmé lors de la copie. Si tu as déjà passé le test, tu peux débloquer ton résultat depuis la page du test.",
      back: "Retour au test",
      open: "Ouvrir le test",
    },
  },

  scalePage: {
    eyebrow: "Échelle de QI",
    title: ["Que signifie", "*une valeur de QI ?*"],
    lead: "Le QI indique ta position dans la distribution de la population. Fais glisser le curseur pour voir à quel pourcentage correspond chaque valeur.",
    bandsEyebrow: "Les tranches",
    bandsTitle: ["L'échelle de QI", "tranche par tranche."],
    topics: [
      {
        t: "Pourquoi la moyenne est-elle de 100 ?",
        d: "Le QI est une valeur relative. Les tests sont étalonnés sur un large échantillon de sorte que la performance moyenne vaille 100 points et qu'un écart-type corresponde à 15 points. Chaque valeur se traduit ainsi immédiatement en pourcentage de la population que l'on dépasse.",
      },
      {
        t: "Ce qu'il mesure – et ce qu'il ne mesure pas",
        d: "Les tests de QI mesurent le raisonnement abstrait, la reconnaissance de motifs, la mémoire de travail et le raisonnement verbal et logique. Ils ne mesurent ni la créativité, ni l'intelligence émotionnelle, ni l'assiduité, ni les connaissances professionnelles – qui comptent pourtant au moins autant.",
      },
      {
        t: "L'effet Flynn",
        d: "Au cours du XXᵉ siècle, les scores bruts aux tests ont progressé d'environ 3 points par décennie dans les pays développés. C'est pourquoi les normes doivent être recalculées régulièrement – un QI mesuré avec une norme ancienne est surestimé.",
      },
    ],
    cta: "Évalue le tien",
    calc: {
      eyebrow: "Calculateur de centile",
      iqValue: "Valeur de QI",
      percentile: "centile",
      ofHundred: "personnes sur 100 ont un score inférieur",
    },
  },

  methodPage: {
    eyebrow: "Méthodologie",
    title: ["Comment tes réponses deviennent", "*un chiffre.*"],
    lead: "Un calcul transparent et vérifiable – et des mots honnêtes sur ce qu'un test de QI en ligne peut faire, et ce qu'il ne peut pas faire.",
    tasks: {
      title: "Les questions",
      p1: "La banque compte {pool} questions conçues par nos soins, dont {total} sont proposées à chaque passage. Pour chacune des {total} positions du test, {variants} variantes ont été créées, issues du même domaine et de même difficulté – ainsi, chaque sélection a la même structure et les résultats restent comparables.",
      pairNote: "La paire de chiffres : questions par test / questions dans la banque.",
      p2: "Les questions de matrices (grilles de figures 3×3 de type Raven) sont la mesure la plus pure de l'intelligence fluide : elles représentent donc près de la moitié des questions. La difficulté augmente globalement : chaque test comprend {easy} questions faciles, {medium} moyennes et {hard} difficiles, et les domaines alternent.",
      p3: "Le navigateur mémorise les questions que tu as déjà vues et donne la priorité aux autres lors du passage suivant – ainsi, sur trois passages consécutifs, aucune question ne se répète.",
    },
    scoring: {
      title: "Notation",
      p1: "Chaque bonne réponse rapporte des points pondérés selon sa difficulté ; une question passée ou une mauvaise réponse vaut 0 point.",
      points: "{d} = {w} pt",
      p2: "Le score pondéré est divisé par le maximum possible (ce qui donne une valeur entre 0 et 1), puis converti sur l'échelle de QI habituelle :",
      formula: "s  = points pondérés / maximum\nz  = (s − ({mean} + correction)) / {sd}\nQI = 100 + 15 · z        (borné entre {min} et {max})",
      p3: "La moyenne de {mean} et l'écart-type de {sd} correspondent à la distribution estimée de la population pour cette série de questions. Le centile découle de la fonction de répartition de la loi normale : un QI de 115 correspond par exemple à peu près au 84e centile.",
    },
    age: {
      title: "Correction par tranche d'âge",
      p1: "Les performances de raisonnement fluide culminent vers le milieu de la vingtaine, puis déclinent lentement. C'est pourquoi le résultat des personnes plus âgées et des moins de 16 ans est comparé à une moyenne attendue légèrement plus basse.",
    },
    limits: {
      title: "Limites",
      items: [
        "L'erreur de mesure d'un test en ligne de 30 questions est bien plus grande que celle d'un examen de 1 à 2 heures administré par un psychologue. Mieux vaut interpréter le résultat comme une fourchette de ±8 à 10 points.",
        "La norme est estimée et n'a pas été établie sur un échantillon représentatif – la valeur exacte est donc indicative.",
        "Repasser le test fausse le résultat vers le haut en raison de l'effet d'apprentissage.",
        "Le résultat n'est pas un diagnostic et ne peut servir de base à aucune décision scolaire, professionnelle ou médicale.",
      ],
    },
    payment: {
      title: "Paiement et protection des données",
      p1: "Le test est gratuit ; le résultat détaillé est disponible avec l'accès complet de {days} jours ({trial} ; si tu ne résilies pas, {monthly}/mois à partir du {nextDay}e jour, résiliable à tout moment). La notation se fait sur le serveur : les bonnes réponses ne sont jamais envoyées à ton navigateur. Lors du paiement, tes réponses sont associées à la transaction Stripe sous une forme courte et codée, et la page de résultat calcule le résultat à partir de là – nous ne les conservons pas dans une base de données séparée.",
      p2: "L'état d'un test inachevé est conservé uniquement par ton propre navigateur, pour que tu puisses le reprendre. Nous ne demandons ni nom ni compte utilisateur ; les données de carte sont gérées par Stripe, nous ne les voyons pas.",
      cta: "Commencer le test",
    },
  },

  subscriptionPage: {
    eyebrow: "Abonnement",
    title: ["Gérer", "*l'abonnement.*"],
    lead: "Ici, tu vois l'état de ton abonnement et tu peux le résilier. La résiliation est enregistrée immédiatement ; ton accès reste actif jusqu'à la fin de la période déjà payée.",
    status: "État",
    trialing: "Période d'essai – fin : {date}. Si tu ne résilies pas d'ici là, {monthly} par mois seront ensuite prélevés.",
    active: "Actif. Prochain prélèvement : {date}, {amount}.",
    canceling: "Résilié. Ton accès reste actif jusqu'au {date} ; aucun autre prélèvement n'aura lieu.",
    pastDue: "Le dernier prélèvement a échoué. Mets à jour ton moyen de paiement sur le portail client.",
    none: "Aucun abonnement actif sur cet appareil.",
    manage: "Gérer / résilier l'abonnement",
    manageHint: "Le portail client sécurisé de Stripe s'ouvre : tu peux y résilier l'abonnement, changer de carte et télécharger tes factures.",
    noDevice: "Abonné sur un autre appareil ou navigateur ? Connecte-toi avec l'adresse e-mail utilisée lors du paiement : nous t'enverrons un code à 6 chiffres, et tes résultats s'ouvriront aussi ici.",
    help: "Une question, ou la résiliation ne fonctionne pas ? Écris-nous : {email}",
    portalError: "Le portail client est indisponible pour le moment. Réessaie dans une minute ou écris-nous : {email}",
    demoNote: "Mode développement : aucune clé Stripe n'est configurée, il n'y a donc pas de véritable abonnement ici.",
  },

  demoPay: {
    chip: "Mode développement – aucun paiement réel",
    title: "Simulation de paiement",
    text: "Aucune clé Stripe n'est configurée : cette page remplace donc la page de paiement Stripe. Une fois STRIPE_SECRET_KEY renseignée, le véritable paiement par carte s'affiche ici.",
    item: "Résultat du test de QI",
    pay: "Simuler un paiement réussi",
    cancel: "Annuler le paiement",
  },

  thankYou: {
    title: "Merci !",
    lead: "Ton paiement a bien été effectué.",
    unlocked: "Ton résultat complet est maintenant débloqué – découvre où tu te situes.",
    cta: "Voir mon résultat",
    cancel: "Tu peux résilier ton abonnement à tout moment, en un clic, sur la page [Gérer l'abonnement](subscription).",
  },

  cookies: {
    title: "Cookies",
    text: "Nous utilisons des cookies nécessaires pour te garder connecté et mémoriser ta langue. Avec ton accord, nous utilisons aussi des cookies d'analyse et publicitaires, pour comprendre comment le site est utilisé et mesurer l'efficacité de nos annonces. [Politique de confidentialité](privacy)",
    accept: "Accepter",
    reject: "Refuser",
    settings: "Paramètres des cookies",
  },

  notFound: {
    title: "Cette page n'existe pas.",
    text: "L'adresse contient peut-être une faute de frappe, ou la page a été supprimée.",
    home: "Retour à l'accueil",
  },

  legal: {
    updated: "En vigueur à compter du {date}",
    draftNote: "",
    toc: "Sommaire",
  },

  stripe: {
    subName: "Abonnement TestMyAbilities",
    subDesc: "Tests de QI et résultats détaillés illimités. Renouvellement mensuel, résiliable à tout moment.",
    trialName: "Accès complet de {days} jours",
    submitNote:
      "Aujourd'hui, {trial} est débité pour l'accès complet de {days} jours. Si tu ne résilies pas au cours des {days} premiers jours, {monthly} par mois sera prélevé automatiquement à partir du {nextDay}e jour, jusqu'à ce que tu résilies. Tu peux résilier à tout moment via le lien « Gérer / résilier l'abonnement » en bas du site.",
  },

  auth: {
    title: "Connexion",
    intro: "Saisis l'adresse e-mail liée à ton abonnement : nous t'enverrons un code de connexion à 6 chiffres.",
    email: "Adresse e-mail",
    sendCode: "Envoyer le code",
    sent: "Si un abonnement est lié à {email}, nous y avons envoyé le code. Pense à vérifier tes spams.",
    code: "Code de connexion",
    verify: "Se connecter",
    resend: "Demander un nouveau code",
    otherEmail: "Utiliser une autre adresse",
    haveAccount: "Déjà abonné ?",
    login: "Se connecter",
    backToPay: "Retour au paiement",
    alreadyNote: "Cette adresse e-mail a déjà un abonnement : nous ne te débiterons pas une seconde fois. Nous t'avons envoyé un code de connexion – connecte-toi et ton résultat s'ouvrira.",
    signedIn: "Tu es connecté sur cet appareil.",
    logout: "Se déconnecter",
    errors: {
      invalidEmail: "Saisis une adresse e-mail valide.",
      rateLimited: "Trop de tentatives. Patiente quelques minutes et réessaie.",
      emailFailed: "Impossible d'envoyer l'e-mail. Réessaie dans une minute.",
      unavailable: "La connexion est indisponible pour le moment. Réessaie dans une minute.",
      codeInvalid: "Ce code est incorrect. Vérifie-le et réessaie.",
      codeExpired: "Le code a expiré. Demandes-en un nouveau.",
      codeLocked: "Trop de tentatives erronées. Demande un nouveau code.",
    },
  },

  email: {
    subject: "{code} – ton code de connexion ({site})",
    intro: "Utilise ce code pour te connecter à {site} :",
    validity: "Le code est valable {minutes} minutes.",
    ignore: "Si tu n'es pas à l'origine de cette demande, ignore simplement cet e-mail.",
  },

  api: {
    invalid: "Test invalide.",
    unavailable: "La page de paiement est indisponible pour le moment. Réessaie dans une minute.",
    notConfigured: "Le paiement n'est pas encore configuré sur ce site.",
    notMember: "Aucun abonnement actif sur cet appareil.",
  },
};

export default fr;
