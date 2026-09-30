// Magyar felületi szövegek – ez a forrás, a többi nyelv ugyanezt a szerkezetet követi (Dict típus).
//
// Jelölések a szövegekben:
//   *szöveg*        → kiemelt (színátmenetes) rész
//   [szöveg](kulcs) → hivatkozás; a kulcsot a komponens adja meg (pl. terms, privacy, method)
//   {név}           → behelyettesített érték (szám, ár, dátum…)
//   { one, other }  → többes szám ({n} a darabszám)

const hu = {
  /** A domain-nevek (Mintázatfelismerés…) kisbetűsíthetők-e mondat közepén (németben nem). */
  lowerNames: true,

  meta: {
    siteTitle: "Online IQ-teszt azonnali eredménnyel",
    siteDescription:
      "Mennyi az IQ-d? 30 feladat mintázatfelismerésből, számsorokból, verbális és logikai gondolkodásból. Regisztráció nélkül, azonnali IQ-becsléssel, percentilissel és területenkénti bontással.",
    keywords: ["IQ teszt", "online IQ teszt", "IQ mérés", "intelligencia teszt", "mátrix teszt", "IQ skála"],
    ogTitle: "Mennyi az IQ-d? · Online IQ-teszt",
    ogDescription: "30 feladat, kb. 12 perc, azonnali eredmény – regisztráció nélkül.",
    testTitle: "IQ-teszt kitöltése",
    testDescription: "30 feladat mintázatfelismerésből, számsorokból, verbális és logikai gondolkodásból. Időkorlát nélkül, azonnali eredménnyel.",
    scaleTitle: "IQ-skála és percentilis-kalkulátor",
    scaleDescription: "Mit jelent egy IQ-érték? Az IQ-skála sávjai, a népességen belüli arányok és egy percentilis-kalkulátor – érthetően.",
    methodTitle: "Módszertan – így számoljuk az IQ-t",
    methodDescription:
      "A feladatok felépítése, a nehézségi súlyozás, a korcsoportos korrekció és az IQ-skálára vetítés képlete – és az online teszt korlátai.",
    resultTitle: "Eredmény",
    resultTitleIq: "IQ {iq} – {band}",
    resultDescription: "IQ-becslés: {iq} ({band}). {correct}/{total} helyes válasz. Töltsd ki te is a tesztet!",
    termsTitle: "Általános Szerződési Feltételek",
    privacyTitle: "Adatkezelési tájékoztató",
    subscriptionTitle: "Előfizetés kezelése",
    demoTitle: "Fizetés (fejlesztői szimuláció)",
  },

  brand: {
    tagline: "Online IQ-teszt, azonnali eredménnyel",
    home: "{brand} – főoldal",
  },

  nav: {
    test: "A teszt",
    scale: "IQ-skála",
    method: "Módszertan",
    faq: "GYIK",
    main: "Fő navigáció",
    mobile: "Mobil navigáció",
    open: "Menü megnyitása",
    close: "Menü bezárása",
    start: "Teszt indítása",
    startShort: "Teszt",
    language: "Nyelv",
  },

  domains: {
    matrix: {
      name: "Mintázatfelismerés",
      short: "Mátrixok",
      blurb: "Vizuális szabályok felismerése 3×3-as ábrarácsokban – ez a fluid intelligencia legtisztább mérője.",
    },
    numeric: {
      name: "Számbeli gondolkodás",
      short: "Számok",
      blurb: "Számsorok törvényszerűségei, arányok és rövid szöveges feladatok fejszámolással.",
    },
    verbal: {
      name: "Verbális gondolkodás",
      short: "Szavak",
      blurb: "Analógiák, ellentétek és kakukktojások – a fogalmak közti kapcsolatok felismerése.",
    },
    logic: {
      name: "Logikai következtetés",
      short: "Logika",
      blurb: "Sorrendek, idő, térlátás és szillogizmusok – a lépésenkénti, szabálykövető gondolkodás.",
    },
  },

  difficulty: { easy: "Könnyű", medium: "Közepes", hard: "Nehéz" },

  ages: { u16: "16 év alatt", none: "nincs megadva" },

  /** Eredmény-sávok (lib/norms.ts BANDS, azonos azonosítókkal). */
  bands: {
    top: {
      label: "Kiemelkedően magas",
      text: "A népesség nagyjából 2%-a ér el ilyen eredményt. Az elvont szabályokat gyorsan és megbízhatóan ismered fel, még összetett helyzetekben is.",
    },
    high: {
      label: "Magas",
      text: "Jól az átlag fölött teljesítettél: a bonyolultabb, több szabályt egyszerre követő feladatok is jól mennek neked.",
    },
    above: {
      label: "Átlag feletti",
      text: "Az emberek többségénél jobban boldogultál. Az új mintázatokat gyorsan átlátod, és jól tartod fejben a részleteket.",
    },
    avg: { label: "Átlagos", text: "Ebbe a sávba tartozik a népesség fele. Stabil, kiegyensúlyozott gondolkodási profil." },
    below: {
      label: "Átlag alatti",
      text: "Egy online teszt eredménye sok mindentől függ – fáradtság, figyelem, időnyomás. Érdemes kipihenten újra próbálni.",
    },
    low: { label: "Alacsony", text: "Ez az eredmény egy rövid online feladatsoron született, ezért messzemenő következtetést ne vonj le belőle." },
    vlow: {
      label: "Nagyon alacsony",
      text: "Egy rövid online feladatsor nem alkalmas diagnózisra. Ha valódi mérésre van szükség, szakember által felvett teszt a megoldás.",
    },
  },

  /** Az IQ-skála sávjai (lib/scale.ts SCALE_BANDS, azonos azonosítókkal). */
  scaleBands: {
    vlow: {
      label: "Nagyon alacsony",
      desc: "Valódi megítéléséhez szakember által felvett, standardizált vizsgálat szükséges – egy online teszt erre nem alkalmas.",
    },
    low: { label: "Alacsony", desc: "Online tesztnél ide sokszor a fáradtság, a figyelem hiánya vagy a nyelvi akadály is lehúzza az eredményt." },
    below: { label: "Átlag alatti", desc: "Az átlagnál valamivel lassabb elvont gondolkodás – a mindennapi élethez bőven elegendő tartomány." },
    avg: { label: "Átlagos", desc: "Ide tartozik a népesség fele: ez a „normál” tartomány, kiegyensúlyozott gondolkodási profillal." },
    above: { label: "Átlag feletti", desc: "Gyors mintázatfelismerés és jó munkamemória – az új szabályok hamar átláthatók." },
    high: { label: "Magas", desc: "A több szabályt egyszerre követő, összetett feladatok is jól mennek." },
    top: { label: "Kiemelkedő", desc: "A népesség kb. 2%-a. Az elvont szabályok gyors és megbízható felismerése, bonyolult helyzetekben is." },
  },

  /** Sorszám a percentilishez: {n} → „84.” */
  ordinal: "{n}.",

  charts: {
    bellHint: "Vidd az egeret (vagy koppints) egy sávra",
    bellShare: "· a népesség ~{share}%-a",
    bellAria: "Az IQ-értékek normáleloszlása",
    bellYou: "Te: {iq}",
    radarAria: "Területenkénti eredmény",
    gaugeLabel: "IQ-becslés",
    betterThan: "Jobb, mint a népesség {p}%-a",
  },

  home: {
    hero: {
      chip: "Online IQ-teszt · azonnali eredmény",
      title: ["Mennyi", "az *IQ-d?*"],
      lead: "Egy {pool} feladatos bankból minden kitöltésnél {total} új kérdést kapsz mintázatfelismerésből, számsorokból, szavakból és logikából. A végén azonnali IQ-becslés, percentilis és területenkénti bontás – regisztráció nélkül.",
      cta: "Teszt indítása",
      try: "Próbáld ki egy feladaton",
      facts: { tasks: "feladat", minutes: "perc", areas: "képességterület" },
      scroll: "Görgess",
      ruleLabel: "Szabály:",
      rules: { nested: "Két latin négyzet", sum: "1. + 2. = 3.", rotate: "Forgás +90°", fill: "Kitöltés oszloponként" },
    },
    marquee: ["Mintázatok", "Számsorok", "Analógiák", "Forgatás", "Latin négyzetek", "Szillogizmusok", "Térlátás", "Kakukktojás", "Arányok", "Sorrendek"],
    domains: {
      eyebrow: "Mit mér a teszt?",
      title: ["Négy képesség,", "*egy szám.*"],
      lead: "A feladatok négy, egymást kiegészítő területet fednek le. A végén nem csak egy IQ-értéket kapsz, hanem azt is látod, melyik terület az erősséged.",
      count: "{n} feladat",
      /** Analógia-bemutató: A : B = C : ? – a kérdőjel helyén a próbálkozások, az utolsó a helyes. */
      word: { a: "kutya", b: "kölyök", c: "macska", tries: ["egér", "tej", "cica"] },
      /** Sorrend-bemutató: négy név; az életkor-sorrendet a komponens adja. */
      people: ["Olivér", "Lili", "Nóra", "Máté"],
      sorted: "idősebb → fiatalabb",
      unsorted: "rendezetlen állítások",
    },
    steps: {
      eyebrow: "Hogyan zajlik?",
      title: ["Három lépés,", "nagyjából tizenkét perc."],
      items: [
        {
          title: "Add meg a korcsoportod",
          text: "Egyetlen kattintás. Az életkor alapján finomhangoljuk a viszonyítási alapot – regisztráció és felhasználói fiók nem kell.",
        },
        {
          title: "Oldd meg a {total} feladatot",
          text: "Nincs időkorlát. Billentyűzettel (A–F, nyilak) is haladhatsz, visszaléphetsz, és bármelyik kérdésre ráugorhatsz.",
        },
        {
          title: "Kapd meg az eredményt",
          text: "A feloldás után azonnal: IQ-becslés percentilissel, területenkénti bontás és minden feladat megoldása magyarázattal együtt.",
        },
      ],
    },
    tryIt: {
      eyebrow: "Próbafeladat",
      title: ["Melyik ábra illik", "a kérdőjel helyére?"],
      lead: "Egy könnyű bemelegítő – ilyen típusú feladatból {n} vár rád a tesztben.",
      correct: "Pontosan! Ez a jó válasz.",
      wrong: "Nem egészen – a helyes válasz a(z) {letter}.",
      explain:
        "Soronként azonos az alakzat és a kitöltés, balról jobbra pedig nő a méret: kicsi, közepes, nagy. A hiányzó elem a nagy, üres csillag.",
      full: "Jöhet a teljes teszt",
      again: "Újra",
      hint: "Figyeld meg, mi változik soronként és oszloponként – alakzat, méret, kitöltés –, majd válassz egyet a hat lehetőség közül.",
    },
    scale: {
      eyebrow: "Az IQ-skála",
      title: ["Az átlag 100.", "A többség 85 és 115 között."],
      lead: "Az IQ nem abszolút mérték, hanem viszonyszám: azt mutatja, hol helyezkedsz el a népesség eloszlásában. A skála átlaga 100, szórása 15 – így az emberek kb. kétharmada 85 és 115 közé esik.",
      link: "Részletes IQ-skála és percentilis-kalkulátor →",
    },
    preview: {
      eyebrow: "Az eredményed",
      title: ["Nem csak egy szám –", "*egy teljes profil.*"],
      sample: "Minta-eredmény",
      sampleChip: "{band} · {ord} percentilis",
      points: [
        { t: "IQ-becslés és percentilis", d: "Hol állsz a népességhez képest – egyetlen, érthető számmal." },
        { t: "Területenkénti bontás", d: "Mintázat, számok, szavak, logika: látod, mi az erősséged." },
        { t: "Megoldások magyarázattal", d: "Mind a 30 feladat helyes válasza, levezetéssel." },
        { t: "Megosztható link", d: "Egy kattintással elküldheted a barátaidnak – ők is kipróbálhatják." },
      ],
      price:
        "A kitöltés ingyenes. A teljes eredményt a *{trial}* díjú, {days} napos teljes hozzáféréssel oldhatod fel; ha nem mondod le, a {nextDay}. naptól havi {monthly} – bármikor lemondható.",
    },
    faq: {
      eyebrow: "GYIK",
      title: ["Gyakori", "kérdések."],
      lead: "Minden, amit a kitöltés előtt tudni érdemes – röviden és őszintén.",
    },
    final: {
      eyebrow: "Készen állsz?",
      title: "Tizenkét perc, és *kiderül.*",
      text: "{total} feladat, időkorlát és regisztráció nélkül. A kitöltés ingyenes; a részletes eredmény a {days} napos teljes hozzáféréssel érhető el ({trial}).",
      cta: "Kezdjük!",
    },
  },

  faq: [
    {
      q: "Mennyibe kerül?",
      a: "A teszt kitöltése ingyenes, és regisztrációt sem kér. A részletes eredményt a {days} napos teljes hozzáféréssel oldhatod fel, amelynek díja {trial}; ez alatt korlátlanul tölthetsz ki teszteket, és mindegyik eredményét látod. Ha az első {days} napban nem mondod le, a hozzáférés a {nextDay}. naptól havi {monthly} díjú előfizetésként folytatódik, amíg le nem mondod – lemondani bármikor lehet, egy kattintással. Bankkártyával, Apple Pay-jel vagy Google Pay-jel fizethetsz.",
    },
    {
      q: "Hogyan mondhatom le az előfizetést?",
      a: "Bármikor, néhány kattintással: az oldal alján az „Előfizetés kezelése” linkre kattintva a Stripe biztonságos ügyfélportálján mondhatod le. Ha a próbaidő alatt lemondod, további terhelés nem lesz; a hozzáférésed a már kifizetett időszak végéig megmarad.",
    },
    {
      q: "Mennyi ideig tart a kitöltés?",
      a: "A 30 feladat átlagosan 10–15 perc alatt oldható meg. Időkorlát nincs, a pontszámba az idő nem számít bele – inkább gondold végig a feladatokat, mint hogy kapkodj.",
    },
    {
      q: "Mennyire pontos egy online IQ-teszt?",
      a: "Egy rövid online feladatsor jó becslést ad arról, hogyan teljesítesz az elvont gondolkodást mérő feladatokban, de nem helyettesíti a pszichológus által felvett, standardizált vizsgálatot (pl. WAIS). Az eredményt tájékoztató jellegűnek tekintsd.",
    },
    {
      q: "Hogyan számoljátok ki az IQ-t?",
      a: "Minden helyes válasz a nehézségével súlyozott pontot ér (könnyű 1, közepes 1,5, nehéz 2). Ezt a pontszámot egy feltételezett népességi eloszláshoz viszonyítjuk – korcsoportonként kis korrekcióval –, majd a szokásos 100-as átlagú, 15-ös szórású skálára vetítjük. A részletek a Módszertan oldalon vannak.",
    },
    {
      q: "Visszaléphetek egy korábbi kérdéshez?",
      a: "Igen. A teszt közben bármikor visszaléphetsz, átugorhatsz kérdést, és a felső sávban bármelyik feladatra ráugorhatsz. A beküldés előtt összesítőt is látsz a kihagyott kérdésekről.",
    },
    {
      q: "Mi történik a válaszaimmal?",
      a: "A válaszaidat csak a kiértékeléshez használjuk: a fizetéskor rövid, kódolt formában a fizetési tranzakcióhoz kapcsolódnak, és ebből számoljuk ki az eredményt. Nevet, felhasználói fiókot nem kérünk; a kártyaadataidat a Stripe kezeli, azokat mi nem látjuk. A fizetéshez a Stripe egy e-mail-címet kér a nyugtához. Előfizetőknél egy sütit is elhelyezünk, hogy a böngésző felismerje az aktív előfizetést.",
    },
    {
      q: "Kitölthetem többször is?",
      a: "Persze. A 90 feladatos bankból minden kitöltésnél más összeállítást kapsz, és a még nem látott feladatok élveznek elsőbbséget – három egymás utáni kitöltésnél egyetlen kérdés sem ismétlődik. A feladattípusokkal viszont gyakorlottabb leszel, ezért az ismételt eredmény jellemzően kicsit magasabb.",
    },
    {
      q: "Gyerekeknek is megfelelő?",
      a: "A feladatok 12 éves kortól értelmezhetők. A 16 év alattiak eredményét egy kis korcsoportos korrekcióval számoljuk, de gyermekek esetében különösen igaz, hogy egy online teszt csak játékos tájékozódásra való. Fizetni és előfizetni csak nagykorú (vagy törvényes képviselője hozzájárulásával eljáró) felhasználó tud.",
    },
  ],

  footer: {
    blurb: "90 saját fejlesztésű feladat négy képességterületen – regisztráció nélkül.",
    pages: "Oldalak",
    takeTest: "IQ-teszt kitöltése",
    important: "Fontos",
    disclaimer:
      "Az eredmény tájékoztató jellegű becslés, nem orvosi vagy pszichológiai diagnózis. A kártyaadatokat a Stripe kezeli, azokat mi nem látjuk és nem tároljuk.",
    legal: "Jogi információk",
    terms: "ÁSZF",
    privacy: "Adatkezelési tájékoztató",
    subscription: "Előfizetés kezelése / lemondása",
    operator: "Üzemeltető",
    companyId: "Cégazonosító (IČO)",
    taxId: "Adóazonosító (DIČ)",
    contact: "Kapcsolat",
  },

  test: {
    runner: {
      elapsed: "Eltelt idő",
      exit: "Kilépés",
      questions: "Kérdések",
      questionN: "{n}. kérdés",
      answeredMark: " (megválaszolva)",
      answeredCount: "{a} / {total} megválaszolva",
      paging: "Lapozás",
      back: "Vissza",
      keysAnswer: "válasz ·",
      keysPage: "lapozás",
      summary: "Összesítő",
      next: "Tovább",
      skip: "Kihagyom",
    },
    intro: {
      eyebrow: "Mielőtt belevágsz",
      title: "Keress egy csendes *sarkot.*",
      lead: "Kapcsold ki az értesítéseket, és oldd meg a feladatokat segítség nélkül. Papír és ceruza használható – számológép és internetes keresés nem.",
      rules: {
        tasks: "feladat, a {pool} feladatos bankból válogatva",
        minutes: "perc az átlagos kitöltési idő",
        noLimit: "nincs időkorlát, az idő nem számít",
        back: "visszaléphetsz és átugorhatsz",
      },
      pendingTitle: "Egy befejezett teszted eredménye már vár rád.",
      pendingText: "{a} / {total} kérdésre válaszoltál. Az eredményt bármikor feloldhatod.",
      pendingCta: "Eredmény feloldása",
      savedTitle: "Van egy félbehagyott teszted.",
      savedText: "{a} / {total} kérdésre már válaszoltál. Folytathatod, ahol abbahagytad.",
      savedCta: "Folytatás",
      age: "Korcsoport",
      ageHint: "– a viszonyítási alaphoz (nem kötelező)",
      tip: "Tipp: a {a}–{f} billentyűkkel válaszolhatsz, a nyilakkal lapozhatsz.",
      startNew: "Új teszt indítása",
      start: "Kezdés",
    },
    question: {
      difficulty: "Nehézség: {d}",
      pickMissing: "Válaszd ki a hiányzó elemet:",
    },
    review: {
      eyebrow: "Összesítő",
      allDone: "Minden kérdésre *válaszoltál.*",
      open: { one: "Még {n} kérdés *nyitva van.*", other: "Még {n} kérdés *nyitva van.*" },
      allDoneText: "Ha szeretnél, még átnézheted a válaszaidat – egy kattintás a számra.",
      openText: "A kihagyott kérdések rossz válasznak számítanak. Érdemes tippelni, ha bizonytalan vagy.",
      unanswered: " – megválaszolatlan",
      answerLetter: " – {l} válasz",
      toSkipped: "Kihagyott kérdésekhez",
      toQuestions: "Vissza a kérdésekhez",
      submit: "Kiértékelés",
    },
    analyzing: {
      title: "Kiértékelés folyamatban…",
      steps: ["Válaszok ellenőrzése", "Nehézségi súlyozás", "Korcsoportos viszonyítás", "Percentilis számítása", "Profil összeállítása"],
    },
  },

  paywall: {
    eyebrow: "Kész a kiértékelés",
    title: "Az eredményed *elkészült.*",
    summary: "{a} / {total} kérdésre válaszoltál{time}. Oldd fel, és nézd meg, hol állsz.",
    summaryTime: ", {t} alatt",
    preview: "Az eredményed",
    cancelled: "A fizetés megszakadt – nem terheltünk semmit. Bármikor újrapróbálhatod.",
    includes: "A {days} napos teljes hozzáférés tartalmazza:",
    perks: [
      { t: "IQ-becslés és percentilis", d: "Pontosan hol állsz a népességhez képest." },
      { t: "Területenkénti bontás", d: "Mintázat, számok, szavak, logika – melyik az erősséged." },
      { t: "Mind a {total} feladat megoldása", d: "A helyes válaszok levezetéssel, a saját válaszaid mellett." },
      { t: "Korlátlan új teszt", d: "A hozzáférés ideje alatt minden további eredményed is azonnal látod." },
    ],
    accessName: "{days} napos teljes hozzáférés",
    consent:
      "Elfogadom az [ÁSZF](terms)-et és az [Adatkezelési tájékoztató](privacy)t, kérem a szolgáltatás azonnali megkezdését, és tudomásul veszem, hogy ezzel elveszítem a 14 napos elállási jogomat.",
    consentNeeded: "A folytatáshoz fogadd el a fenti nyilatkozatot.",
    methodLabel: "Fizetési mód",
    card: "Bankkártya",
    loading: "A fizetési űrlap betöltése…",
    close: "Mégse",
    busy: "Átirányítás…",
    trust: ["256 bites SSL", "Fizetés a Stripe-on", "Bármikor lemondható"],
    renewal:
      "Ha az első {days} napban nem mondod le, az előfizetésed a {nextDay}. naptól havi {monthly} díjjal folytatódik, amíg le nem mondod. Lemondani bármikor lehet, egy kattintással, az [Előfizetés kezelése](subscription) oldalon.",
    restart: "Inkább új tesztet kezdek",
    unknownError: "Ismeretlen hiba.",
    member: {
      title: "Aktív előfizetésed van",
      text: "Az előfizetésed ideje alatt minden eredményed díjmentesen megnyitható.",
      cta: "Eredmény megnyitása",
      manage: "Előfizetés kezelése",
    },
  },

  result: {
    eyebrow: "Az eredményed",
    verdict: { top: "Kiemelkedő", strong: "Erős", avg: "Átlagos", grow: "Fejleszthető" },
    shareText: "{iq} lett az IQ-becslésem az Elmeszint tesztjén. Neked mennyi?",
    shareTitle: "Az IQ-eredményem",
    copied: "Link másolva!",
    share: "Eredmény megosztása",
    again: "Újra kitöltöm",
    stats: { correct: "helyes válasz", time: "kitöltési idő", percentile: "percentilis", age: "korcsoport" },
    topShare: "Nagyjából a legjobb {top}%-ba tartozol.",
    strongest: "A legerősebb területed: {domain}.",
    bell: {
      eyebrow: "Hol helyezkedsz el?",
      title: ["A népesség", "eloszlásában."],
      lead: "A satírozott terület azt mutatja, a népesség mekkora része ér el nálad alacsonyabb pontszámot: kb. {p}%.",
    },
    domains: { eyebrow: "Területenkénti bontás", title: ["Ebben vagy", "*a legerősebb.*"] },
    solutions: { eyebrow: "Megoldások", title: ["Minden feladat,", "levezetéssel."] },
    subBanner:
      "Előfizetésed aktív – a következő tesztjeid eredményét is azonnal látod, amíg le nem mondod. [Előfizetés kezelése / lemondása](sub)",
    disclaimer:
      "*Fontos:* ez egy rövid, online feladatsoron alapuló becslés. Nem helyettesíti a pszichológus által felvett, standardizált intelligenciavizsgálatot, és orvosi vagy munkaügyi döntés alapjául nem szolgálhat. A számítás részletei a [Módszertan](method) oldalon olvashatók.",
    review: {
      all: "Összes",
      wrong: "Hibás / kihagyott",
      right: "Helyes",
      ok: "helyes",
      skipped: "kihagyva",
      bad: "hibás",
      matrixItem: "Mátrix: melyik ábra illik a kérdőjel helyére?",
      you: "te:",
      good: "jó:",
    },
    locked: {
      eyebrow: "Eredmény",
      unpaidTitle: "A fizetés még nem érkezett meg.",
      invalidTitle: "Ehhez a linkhez nem tartozik eredmény.",
      unpaidText:
        "Ha most fizettél, frissítsd az oldalt néhány másodperc múlva. Ha megszakítottad a fizetést, a teszt oldalán bármikor újrapróbálhatod.",
      invalidText: "Lehet, hogy a link megsérült másolás közben. Ha már kitöltötted a tesztet, a teszt oldalán feloldhatod az eredményed.",
      back: "Vissza a teszthez",
      open: "Teszt megnyitása",
    },
  },

  scalePage: {
    eyebrow: "IQ-skála",
    title: ["Mit jelent", "*egy IQ-érték?*"],
    lead: "Az IQ azt mutatja meg, hol helyezkedsz el a népesség eloszlásában. Húzd a csúszkát, és nézd meg, melyik érték hány százalékot jelent.",
    bandsEyebrow: "A sávok",
    bandsTitle: ["Az IQ-skála", "sávonként."],
    topics: [
      {
        t: "Miért éppen 100 az átlag?",
        d: "Az IQ viszonyszám. A teszteket nagy mintán kalibrálják úgy, hogy az átlagos teljesítmény 100 pontot, egy szórásnyi eltérés 15 pontot érjen. Így bármely érték azonnal lefordítható arra, hogy a népesség hány százalékánál jobb.",
      },
      {
        t: "Mit mér – és mit nem?",
        d: "Az IQ-tesztek az elvont gondolkodást, a mintázatfelismerést, a munkamemóriát és a nyelvi-logikai következtetést mérik. Nem mérik a kreativitást, az érzelmi intelligenciát, a szorgalmat vagy a szakmai tudást – pedig ezek legalább annyira számítanak.",
      },
      {
        t: "A Flynn-hatás",
        d: "A 20. század során a nyers teszteredmények évtizedenként kb. 3 ponttal javultak a fejlett országokban. Ezért kell a normákat rendszeresen újraszámolni – egy régi normával mért IQ felfelé torzít.",
      },
    ],
    cta: "Mérd fel a sajátodat",
    calc: {
      eyebrow: "Percentilis-kalkulátor",
      iqValue: "IQ-érték",
      percentile: "percentilis",
      ofHundred: "emberből ennyinél magasabb",
    },
  },

  methodPage: {
    eyebrow: "Módszertan",
    title: ["Így lesz a válaszaidból", "*egy szám.*"],
    lead: "Átlátható, ellenőrizhető számítás – és őszinte szavak arról, mire jó egy online IQ-teszt, és mire nem.",
    tasks: {
      title: "A feladatok",
      p1: "A feladatbank {pool} saját fejlesztésű feladatból áll, ebből minden kitöltésnél {total} kerül elő. A teszt {total} helyének mindegyikére {variants} változat készült, amelyek azonos területről és azonos nehézségűek – így minden összeállítás ugyanolyan szerkezetű, és az eredmények összehasonlíthatók.",
      pairNote: "A számpár: tesztenként ennyi feladat / ennyi van a bankban.",
      p2: "A mátrixfeladatok (Raven-típusú, 3×3-as ábrarácsok) a fluid intelligencia legtisztább mérői, ezért ezek adják a feladatok közel felét. A nehézség nagyjából növekszik: {easy} könnyű, {medium} közepes és {hard} nehéz feladat jut egy tesztre, a területek pedig váltakoznak.",
      p3: "A böngésző megjegyzi, mely feladatokat láttad már, és a következő kitöltésnél a még nem látottakat részesíti előnyben – így három egymás utáni kitöltésnél egyetlen feladat sem ismétlődik.",
    },
    scoring: {
      title: "Pontozás",
      p1: "Minden helyes válasz a nehézségével súlyozott pontot ér; a kihagyott és a rossz válasz 0 pont.",
      points: "{d} = {w} pont",
      p2: "A súlyozott pontszámot elosztjuk az elérhető maximummal (így 0 és 1 közötti értéket kapunk), majd a szokásos IQ-skálára vetítjük:",
      formula: "s  = súlyozott pont / maximum\nz  = (s − ({mean} + korrekció)) / {sd}\nIQ = 100 + 15 · z        ({min} és {max} közé szorítva)",
      p3: "A {mean}-es átlag és a {sd}-es szórás a feladatsor becsült népességi eloszlása. A percentilis a normáleloszlás eloszlásfüggvényéből adódik: az IQ 115 például kb. a 84. percentilis.",
    },
    age: {
      title: "Korcsoportos korrekció",
      p1: "A fluid gondolkodás teljesítménye a húszas évek közepén tetőzik, utána lassan csökken. Ezért az idősebb és a 16 év alatti kitöltők eredményét kissé alacsonyabb elvárt átlaghoz mérjük.",
    },
    limits: {
      title: "Korlátok",
      items: [
        "Egy 30 feladatos online teszt mérési hibája jóval nagyobb, mint egy pszichológus által felvett, 1–2 órás vizsgálaté. Az eredményt ±8–10 pontos sávként érdemes értelmezni.",
        "A norma becsült, nem reprezentatív mintán felvett – a pontos számérték tehát tájékoztató jellegű.",
        "Az ismételt kitöltés a tanulási hatás miatt felfelé torzít.",
        "Az eredmény nem diagnózis, és nem alkalmas oktatási, munkaügyi vagy orvosi döntések megalapozására.",
      ],
    },
    payment: {
      title: "Fizetés és adatvédelem",
      p1: "A kitöltés ingyenes; a részletes eredmény a {days} napos teljes hozzáféréssel érhető el ({trial}; ha nem mondod le, a {nextDay}. naptól {monthly}/hó, bármikor lemondható). A pontozás a szerveren történik, a helyes válaszok nem kerülnek a böngésződbe. Fizetéskor a válaszaid rövid, kódolt formában a Stripe fizetési tranzakciójához kapcsolódnak, és az eredményoldal ebből számolja ki az eredményt – külön adatbázisban nem tároljuk őket.",
      p2: "A félbehagyott teszt állapotát csak a saját böngésződ őrzi, hogy folytatni tudd. Nevet vagy felhasználói fiókot nem kérünk; a kártyaadatokat a Stripe kezeli, azokat mi nem látjuk.",
      cta: "Teszt indítása",
    },
  },

  subscriptionPage: {
    eyebrow: "Előfizetés",
    title: ["Előfizetés", "*kezelése.*"],
    lead: "Itt látod az előfizetésed állapotát, és itt tudod lemondani. A lemondás azonnal rögzül; a már kifizetett időszak végéig a hozzáférésed megmarad.",
    status: "Állapot",
    trialing: "A próbaidőszak {date} napján ér véget; ha addig nem mondod le, utána havi {monthly} terhelődik.",
    active: "Aktív. A következő terhelés: {date}, {amount}.",
    canceling: "Lemondva. A hozzáférésed eddig él: {date}; további terhelés nem lesz.",
    pastDue: "A legutóbbi terhelés nem sikerült. Frissítsd a fizetési módot az ügyfélportálon.",
    none: "Ezen az eszközön nincs aktív előfizetés.",
    manage: "Előfizetés kezelése / lemondása",
    manageHint: "A Stripe biztonságos ügyfélportálja nyílik meg: itt mondhatod le az előfizetést, cserélhetsz kártyát, és letöltheted a számláidat.",
    noDevice:
      "Ha másik eszközön vagy böngészőben fizettél elő, lépj be az ügyfélportálra azzal az e-mail-címmel, amelyet a fizetésnél megadtál – egy egyszer használatos kódot küldünk rá, és ott lemondhatod az előfizetést.",
    portalLogin: "Belépés az ügyfélportálra e-mail-címmel",
    help: "Kérdésed van, vagy nem sikerül a lemondás? Írj nekünk: {email}",
    portalError: "Az ügyfélportál most nem érhető el. Próbáld újra egy perc múlva, vagy írj nekünk: {email}",
    demoNote: "Fejlesztői mód: nincs beállítva Stripe-kulcs, ezért itt nincs valódi előfizetés.",
  },

  demoPay: {
    chip: "Fejlesztői mód – nincs valódi fizetés",
    title: "Fizetés szimulálása",
    text: "Nincs beállítva Stripe-kulcs, ezért ez az oldal helyettesíti a Stripe fizetési oldalát. A STRIPE_SECRET_KEY megadása után itt a valódi kártyás fizetés jelenik meg.",
    item: "IQ-teszt eredmény",
    pay: "Sikeres fizetés szimulálása",
    cancel: "Fizetés megszakítása",
  },

  notFound: {
    title: "Ez az oldal nem létezik.",
    text: "Lehet, hogy elírás van a címben, vagy az oldal időközben megszűnt.",
    home: "Vissza a főoldalra",
  },

  legal: {
    updated: "Hatályos: {date}",
    draftNote: "",
    toc: "Tartalom",
  },

  /** A fizetési oldalon (Stripe) megjelenő szövegek. */
  stripe: {
    subName: "Elmeszint előfizetés",
    subDesc: "Korlátlan IQ-teszt és részletes eredmény. Havonta megújul, bármikor lemondható.",
    trialName: "{days} napos teljes hozzáférés",
    submitNote:
      "Ma {trial} kerül terhelésre a {days} napos teljes hozzáférésért. Ha az első {days} napban nem mondod le, a {nextDay}. naptól havi {monthly} automatikusan terhelődik, amíg le nem mondod. Lemondani bármikor lehet a weboldal alján, az „Előfizetés kezelése / lemondása” linknél.",
  },

  api: {
    invalid: "Érvénytelen kitöltés.",
    unavailable: "A fizetési oldal most nem érhető el. Próbáld újra egy perc múlva.",
    notConfigured: "A fizetés még nincs beállítva ezen az oldalon.",
    notMember: "Ezen az eszközön nincs aktív előfizetés.",
  },
};

export default hu;

type Widen<T> = T extends string
  ? string
  : T extends boolean
    ? boolean
    : T extends readonly (infer U)[]
      ? Widen<U>[]
      : T extends object
        ? { [K in keyof T]: Widen<T[K]> }
        : T;

/** A szótár szerkezete – minden nyelvnek pontosan ezt kell kitöltenie. */
export type Dict = Widen<typeof hu>;
