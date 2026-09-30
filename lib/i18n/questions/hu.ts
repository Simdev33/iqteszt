// Magyar feladatszövegek – a forrás. A többi nyelv ugyanezeket az azonosítókat tölti ki (lib/i18n/questions/*.ts).
// A szerkezet (terület, nehézség, helyes válasz sorszáma, számsor) a lib/questions.ts-ben van, nyelvtől függetlenül:
// az options tömbben a helyes válasz helye (sorszáma) minden nyelven ugyanaz kell legyen!
import type { QuestionTexts } from "./types";

const hu: QuestionTexts = {
  matrixPrompt: "Melyik ábra illik a kérdőjel helyére?",
  items: {
    "m-count": { explain: "Soronként ugyanaz az alakzat marad, balról jobbra pedig eggyel nő a darabszám: 1, 2, 3. A harmadik sor végére így három háromszög kerül." },
    "m-countDown": { explain: "Soronként azonos az alakzat, balról jobbra pedig eggyel csökken a darabszám: 3, 2, 1. Az utolsó sor végére egyetlen hatszög kerül." },
    "m-countRows": { explain: "Minden oszlopnak saját alakzata van, lefelé haladva pedig eggyel nő a darabszám: 2, 3, 4. A rombuszok oszlopába tehát négy rombusz kerül." },
    "n-squares": {
      prompt: "Melyik szám folytatja a sort?",
      options: ["30", "34", "36", "49"],
      explain: "Ezek a négyzetszámok: 1², 2², 3², 4², 5² – a következő 6² = 36.",
    },
    "n-add": {
      prompt: "Melyik szám folytatja a sort?",
      options: ["17", "18", "19", "21"],
      explain: "Minden lépésben 3-mal nő a szám: 14 + 3 = 17.",
    },
    "n-halve": {
      prompt: "Melyik szám folytatja a sort?",
      options: ["2", "3", "4", "6"],
      explain: "Minden tag az előző fele: 12 : 2 = 6.",
    },
    "v-nest": {
      prompt: "Madár : fészek = méh : ?",
      options: ["méz", "virág", "kaptár", "fullánk"],
      explain: "A madár a fészekben lakik, a méh a kaptárban. A kapcsolat: élőlény → az otthona.",
    },
    "v-fish": {
      prompt: "Hal : úszik = madár : ?",
      options: ["fészek", "repül", "toll", "tojás"],
      explain: "A hal úszva, a madár repülve közlekedik. A kapcsolat: élőlény → jellemző mozgásforma.",
    },
    "v-doctor": {
      prompt: "Orvos : kórház = tanár : ?",
      options: ["diák", "iskola", "tankönyv", "óra"],
      explain: "Az orvos a kórházban dolgozik, a tanár az iskolában. A kapcsolat: foglalkozás → munkahely.",
    },
    "m-fillColumns": { explain: "Minden sornak saját alakzata van, az oszlopok pedig a kitöltést adják: üres, vonalkázott, teli. A csillag sorának harmadik eleme tehát teli csillag." },
    "m-fillRows": { explain: "Az oszlopok adják az alakzatot (háromszög, hatszög, plusz), a sorok a kitöltést: üres, félig kitöltött, teli. A hiányzó elem a teli plusz jel." },
    "m-fillReverse": { explain: "Minden sornak saját alakzata van, az oszlopok kitöltése pedig balról jobbra: teli, vonalkázott, üres. A négyzetek sorának végére üres négyzet kerül." },
    "l-days": {
      prompt: "Ha holnapután péntek lesz, milyen nap volt tegnapelőtt?",
      options: ["vasárnap", "hétfő", "kedd", "szerda"],
      explain: "Ha holnapután péntek, akkor ma szerda van. Szerdától két nappal korábban hétfő volt.",
    },
    "l-days2": {
      prompt: "Ha tegnapelőtt csütörtök volt, milyen nap lesz holnapután?",
      options: ["vasárnap", "hétfő", "kedd", "péntek"],
      explain: "Ha tegnapelőtt csütörtök volt, ma szombat van. Szombat után két nappal hétfő lesz.",
    },
    "l-bell": {
      prompt: "Egy harang 20 percenként üt egyet, és már az indulás pillanatában is üt. Hányat üt összesen 2 óra alatt, ha a 2. óra végén lévő ütést is beleszámoljuk?",
      options: ["6", "7", "8", "12"],
      explain: "Az ütések: 0, 20, 40, 60, 80, 100 és 120 percnél – ez 7 ütés. A 6-os válasz a klasszikus „kerítésoszlop-hiba”: kimarad az indulás pillanata.",
    },
    "m-rotation": { explain: "A nyíl minden lépésnél 45°-kal fordul az óramutató járásával egyezően, és minden sor 90°-kal elfordítva indul. Az utolsó sor 180°, 225° után 270°-nál, vagyis balra mutatva ér véget." },
    "m-rotationBack": { explain: "A nyíl lépésenként 45°-ot fordul balra (az óramutatóval ellentétesen), a sorok pedig 0°-ról, 90°-ról és 180°-ról indulnak. Az utolsó sor: lefelé, jobbra lefelé, majd jobbra." },
    "m-rotationHand": { explain: "A mutató minden lépésnél 90°-ot fordul jobbra, a sorok pedig 45°-kal eltolva indulnak. Az utolsó sor: 6 óra, 9 óra, majd 12 óra irányába mutat – vagyis felfelé." },
    "n-double": {
      prompt: "Melyik szám folytatja a sort?",
      options: ["47", "62", "63", "64"],
      explain: "Minden tag az előző kétszerese plusz egy: 31 × 2 + 1 = 63.",
    },
    "n-triangular": {
      prompt: "Melyik szám folytatja a sort?",
      options: ["18", "20", "21", "25"],
      explain: "A különbségek egyesével nőnek: +2, +3, +4, +5, így most +6 jön: 15 + 6 = 21.",
    },
    "n-primes": {
      prompt: "Melyik szám folytatja a sort?",
      options: ["12", "13", "15", "17"],
      explain: "Ezek a prímszámok (csak 1-gyel és önmagukkal oszthatók). A 11 után következő prím a 13.",
    },
    "v-opposite": {
      prompt: "Melyik szó áll legközelebb a BŐKEZŰ ellentétéhez?",
      options: ["gazdag", "fösvény", "szerény", "irigy"],
      explain: "A bőkezű ember szívesen és sokat ad. Az ellentéte a fösvény, aki a legkevesebbet is sajnálja.",
    },
    "v-brave": {
      prompt: "Melyik szó áll legközelebb a BÁTOR ellentétéhez?",
      options: ["erős", "gyáva", "csendes", "lusta"],
      explain: "A bátor ember szembenéz a veszéllyel, a gyáva kerüli. A többi szó egészen más tulajdonságot ír le.",
    },
    "v-diligent": {
      prompt: "Melyik szó jelentése áll legközelebb a SZORGALMAS szóhoz?",
      options: ["okos", "dolgos", "gyors", "pontos"],
      explain: "A szorgalmas és a dolgos ember is kitartóan, sokat dolgozik. Az okos, a gyors és a pontos más-más tulajdonság.",
    },
    "m-latin": { explain: "Minden sorban és minden oszlopban pontosan egyszer szerepel a kör, a négyzet és a háromszög, a kitöltés pedig soronként azonos. Az utolsó sorból a teli négyzet hiányzik." },
    "m-latinFill": { explain: "Soronként azonos az alakzat, a kitöltés (teli, vonalkázott, üres) pedig minden sorban és oszlopban pontosan egyszer fordul elő. A rombuszok sorából a vonalkázott rombusz hiányzik." },
    "m-latinCount": { explain: "Soronként azonos az alakzat, a darabszám (1, 2, 3) pedig minden sorban és oszlopban pontosan egyszer szerepel. Az utolsó sorból a három csillag hiányzik." },
    "l-painters": {
      prompt: "Ha 3 festő 3 nap alatt 3 falat fest ki, hány nap alatt fest ki 6 festő 6 falat?",
      options: ["1 nap", "3 nap", "6 nap", "12 nap"],
      explain: "Egy festő 3 nap alatt fest ki egy falat. Hat festő párhuzamosan dolgozik, így 6 fal is 3 nap alatt készül el.",
    },
    "l-hens": {
      prompt: "Ha 4 tyúk 4 nap alatt 4 tojást tojik, hány tojást tojik 8 tyúk 8 nap alatt?",
      options: ["8", "16", "32", "64"],
      explain: "Egy tyúk 4 nap alatt 1 tojást tojik, 8 nap alatt tehát 2-t. 8 tyúk így 8 × 2 = 16 tojást tojik.",
    },
    "l-snail": {
      prompt: "Egy csiga egy 10 méter mély kút aljáról indul. Nappal 3 métert mászik fel, éjjel 2 métert csúszik vissza. Hányadik napon ér ki a kútból?",
      options: ["az 5.", "a 7.", "a 8.", "a 10."],
      explain: "Hét nap és hét éjszaka után 7 méteren van. A 8. napon felmászik 3 métert, és eléri a 10 métert – onnan már nem csúszik vissza.",
    },
    "m-walker": { explain: "A narancs pont az óramutató járásával egyezően lép sarokról sarokra, a lila gyűrű pedig ellenkező irányban halad az oldalfelezőkön. Négy lépésenként ismétlődik a minta, így a kilencedik cella megegyezik az elsővel." },
    "m-orbit": { explain: "A keret mentén nyolc hely van. A narancs pont minden lépésnél egy hellyel halad az óramutató járása szerint, a lila gyűrű egy hellyel ellenkező irányban. Nyolc lépés után mindkettő visszaér a kiindulópontjára: a pont felül középen, a gyűrű a jobb alsó sarokban áll." },
    "m-quadrants": { explain: "A lila négyzet az óramutató járása szerint lép negyedről negyedre, a narancs ellentétes irányban. Négy lépésenként ismétlődik a minta, így a kilencedik cella az elsővel egyezik." },
    "n-alternate": {
      prompt: "Melyik szám folytatja a sort?",
      options: ["12", "24", "28", "30"],
      explain: "Két művelet váltakozik: ×2, majd −2. 5 → 10 → 8 → 16 → 14 → 28.",
    },
    "n-interleave": {
      prompt: "Melyik szám folytatja a sort?",
      options: ["4", "5", "6", "7"],
      explain: "Két sor fut egymásba fésülve: minden második tag 1, 3, 5 (+2), a többi 12, 10, 8 (−2). A hetedik tag az első sorba tartozik: 5 + 2 = 7.",
    },
    "n-fibo": {
      prompt: "Melyik szám folytatja a sort?",
      options: ["36", "42", "48", "52"],
      explain: "Minden tag az előző kettő összege: 16 + 26 = 42.",
    },
    "v-odd": {
      prompt: "Melyik a kakukktojás?",
      options: ["hegedű", "cselló", "fuvola", "nagybőgő"],
      explain: "A hegedű, a cselló és a nagybőgő vonós hangszer, a fuvola viszont fúvós.",
    },
    "v-planet": {
      prompt: "Melyik a kakukktojás?",
      options: ["Merkúr", "Vénusz", "Hold", "Mars"],
      explain: "A Merkúr, a Vénusz és a Mars bolygó, a Hold viszont a Föld kísérője, nem bolygó.",
    },
    "v-polygon": {
      prompt: "Melyik a kakukktojás?",
      options: ["háromszög", "négyzet", "kör", "ötszög"],
      explain: "A háromszög, a négyzet és az ötszög egyenes oldalú sokszög. A kör nem sokszög.",
    },
    "m-union": { explain: "Soronként a harmadik ábra az első kettő egymásra helyezése: minden vonal megmarad, ami bármelyikben szerepel. Az utolsó sorban így a függőleges középvonal, a felső él és a vízszintes középvonal együtt adja a választ." },
    "m-unionLines": { explain: "Soronként a harmadik ábra az első kettő egymásra helyezése. Az utolsó sorban a bal oldali él, a jobb oldali él és a vízszintes középvonal együtt egy H betűt ad." },
    "m-unionDots": { explain: "Soronként a harmadik ábrán minden pont szerepel, ami az első kettő bármelyikén megvan. Az utolsó sorban: bal alsó, középső, jobb felső és jobb alsó pont." },
    "l-ages": {
      prompt: "Anna idősebb Bélánál. Béla idősebb Dórinál. Csaba fiatalabb Dórinál. Ki a legfiatalabb?",
      options: ["Anna", "Béla", "Csaba", "Dóri"],
      explain: "A sorrend idősebbtől fiatalabbig: Anna > Béla > Dóri > Csaba. Csaba a legfiatalabb.",
    },
    "l-queue": {
      prompt: "Öten állnak sorban. Hanna Eszter előtt áll, Ivett Hanna és Eszter között, Eszter Feri előtt, Gábor pedig a sor végén. Ki áll a sor elején?",
      options: ["Eszter", "Hanna", "Ivett", "Feri"],
      explain: "A sorrend: Hanna, Ivett, Eszter, Feri, Gábor. A sor elején Hanna áll.",
    },
    "l-heights": {
      prompt: "Péter magasabb Zolinál, de alacsonyabb Rékánál. Réka alacsonyabb Tamásnál. Ki a második legmagasabb?",
      options: ["Péter", "Réka", "Tamás", "Zoli"],
      explain: "Magasság szerint csökkenő sorrendben: Tamás, Réka, Péter, Zoli. A második legmagasabb Réka.",
    },
    "m-countSum": { explain: "Soronként az első két cella elemszámának összege adja a harmadikat: 1 + 3 = 4, 2 + 1 = 3, tehát 3 + 2 = 5 vonalkázott háromszög." },
    "m-countDiff": { explain: "Soronként az első cella elemszámából kivonjuk a másodikét: 5 − 1 = 4, 6 − 4 = 2, tehát 4 − 1 = 3 csillag." },
    "m-countColumns": { explain: "Itt oszloponként kell összeadni: az első két sor elemszáma adja a harmadikat (1 + 1 = 2, 2 + 3 = 5). A rombuszoknál 1 + 3 = 4." },
    "n-bat": {
      prompt: "Egy ütő és egy labda együtt 1100 Ft. Az ütő 1000 Ft-tal drágább a labdánál. Mennyibe kerül a labda?",
      options: ["50 Ft", "100 Ft", "150 Ft", "1000 Ft"],
      explain: "Ha a labda x, az ütő x + 1000, együtt 2x + 1000 = 1100, így x = 50 Ft. A kézenfekvő 100 Ft-os válasz csapda: akkor az ütő 1100 lenne, az összeg 1200.",
    },
    "n-lily": {
      prompt: "Egy tavon a tavirózsák által borított terület minden nap megduplázódik. 48 nap alatt borítják be az egész tavat. Hány nap alatt borították be a tó felét?",
      options: ["24 nap", "36 nap", "46 nap", "47 nap"],
      explain: "Ha a terület naponta duplázódik, a teljes borítás előtti napon még csak a tó fele volt fedve: 48 − 1 = 47. A 24 napos válasz csapda – az egyenletes növekedésnél lenne igaz.",
    },
    "n-taps": {
      prompt: "Egy kád az egyik csapból 6 perc alatt telik meg, a másikból 3 perc alatt. Hány perc alatt telik meg, ha mindkét csapot egyszerre nyitjuk meg?",
      options: ["2 perc", "3 perc", "4,5 perc", "9 perc"],
      explain: "Az első csap percenként a kád 1/6-át, a második az 1/3-át tölti meg, együtt 1/6 + 2/6 = 1/2 részét. Így 2 perc alatt telik meg.",
    },
    "m-sides": { explain: "Balról jobbra minden lépésnél eggyel nő a sokszög oldalszáma, és minden sor eggyel több oldallal kezd. A soronként azonos kitöltéssel együtt a válasz egy teli hétszög." },
    "m-sidesDots": { explain: "Az oszlopok adják a sokszöget (3, 4, 5 oldal), a sorok a belső pöttyök számát (1, 2, 3). A jobb alsó cella: ötszög három pöttyel." },
    "m-sidesDown": { explain: "Balról jobbra minden lépésnél eggyel kevesebb oldala van a sokszögnek, és minden sor eggyel kevesebb oldallal indul (7, 6, 5). Az oszlopok a kitöltést adják. A hiányzó elem: teli háromszög." },
    "v-homonym": {
      prompt: "Melyik szó jelenti egyszerre a fa egyik részét és egy postán küldhető írást?",
      options: ["lap", "levél", "kéreg", "boríték"],
      explain: "A levél a fa lombjának része, és a postán küldött írás neve is.",
    },
    "v-feather": {
      prompt: "Melyik szó jelenti egyszerre a madár testét borító egyik elemet és egy íróeszközt?",
      options: ["szárny", "toll", "ceruza", "pihe"],
      explain: "A toll a madár tollazatának része, és az íróeszköz neve is.",
    },
    "v-pear": {
      prompt: "Melyik szó jelöl egyszerre egy gyümölcsöt és – a köznyelvben – egy villanyégőt?",
      options: ["alma", "körte", "lámpa", "izzó"],
      explain: "A körte gyümölcs, a köznyelvben pedig a villanykörtét, vagyis az izzót is így hívjuk.",
    },
    "m-nestedLatin": { explain: "Két szabály fut egymástól függetlenül: a külső alakzat (kör, négyzet, hatszög) és a belső narancs alakzat (háromszög, kör, négyzet) is soronként és oszloponként egyszer szerepel. A hiányzó cella: négyzetben felfelé mutató háromszög." },
    "m-nestedLatin2": { explain: "A külső alakzat (négyzet, háromszög, kör) és a belső narancs alakzat (plusz, csillag, rombusz) két független latin négyzetet alkot. A hiányzó cella: háromszögben álló plusz jel." },
    "m-nestedCount": { explain: "A külső alakzat (hatszög, rombusz, kör) és a pöttyök száma (1, 2, 3) is minden sorban és oszlopban pontosan egyszer szerepel. A hiányzó cella: rombusz egy pöttyel." },
    "l-cube": {
      prompt: "Egy 3×3×3-as kockát kívülről befestenek, majd 27 egyforma kis kockára vágják. Hány kis kockának van pontosan két festett lapja?",
      options: ["6", "8", "12", "24"],
      explain: "Két festett lapja az éleken ülő, de nem sarokban lévő kis kockáknak van. A kockának 12 éle van, mindegyiken 1 ilyen kis kocka: 12.",
    },
    "l-cube4": {
      prompt: "Egy 4×4×4-es kockát kívülről befestenek, majd 64 egyforma kis kockára vágják. Hány kis kockának van pontosan egy festett lapja?",
      options: ["16", "24", "32", "36"],
      explain: "Egy festett lapja a nagy kocka lapjainak belső részén lévő kis kockáknak van: minden lapon 2 × 2 = 4 ilyen, a 6 lapon összesen 24.",
    },
    "l-clock": {
      prompt: "Hány fokos szöget zár be az óra kismutatója és nagymutatója pontosan 3:30-kor?",
      options: ["60°", "75°", "90°", "105°"],
      explain: "A nagymutató a 6-oson áll (180°). A kismutató a 3-as és a 4-es között félúton jár: 90° + 15° = 105°. A kettő különbsége 180° − 105° = 75°.",
    },
    "n-power": {
      prompt: "Melyik szám folytatja a sort?",
      options: ["31", "32", "33", "34"],
      explain: "A különbségek duplázódnak: +1, +2, +4, +8, így a következő lépés +16: 17 + 16 = 33. (Másképp: 2ⁿ + 1.)",
    },
    "n-squareMinus": {
      prompt: "Melyik szám folytatja a sort?",
      options: ["46", "48", "49", "50"],
      explain: "A különbségek egymást követő páratlan számok: +5, +7, +9, +11, most +13: 35 + 13 = 48. (Másképp: n² − 1, itt 7² − 1.)",
    },
    "n-factorial": {
      prompt: "Melyik szám folytatja a sort?",
      options: ["240", "360", "600", "720"],
      explain: "Minden tagot egy eggyel nagyobb számmal szorzunk: ×2, ×3, ×4, ×5, most ×6: 120 × 6 = 720.",
    },
    "m-xor": { explain: "Soronként a harmadik ábrán csak azok a vonalak maradnak meg, amelyek a két első ábra közül pontosan egyben szerepelnek – a közös vonalak kiesnek. Az utolsó sorban a jobb oldali él közös, így az eltűnik." },
    "m-xorDots": { explain: "Soronként a harmadik ábrán csak azok a pontok maradnak, amelyek a két első közül pontosan egyben szerepelnek. Az utolsó sorban a bal alsó pont közös, ezért az kiesik." },
    "m-xorDiag": { explain: "Soronként a harmadik ábrán csak azok a vonalak maradnak, amelyek pontosan az egyik első ábrán szerepelnek. Az utolsó sorban a függőleges középvonal közös, ezért eltűnik." },
    "v-symphony": {
      prompt: "Könyv : fejezet = szimfónia : ?",
      options: ["karmester", "tétel", "hangjegy", "zenekar"],
      explain: "A könyv fejezetekből áll, a szimfónia tételekből. A kapcsolat: egész → nagyobb szerkezeti egysége.",
    },
    "v-tadpole": {
      prompt: "Hernyó : pillangó = ebihal : ?",
      options: ["hal", "béka", "gyík", "tavirózsa"],
      explain: "A hernyóból pillangó, az ebihalból béka lesz. A kapcsolat: fejlődési alak → kifejlett állat.",
    },
    "v-map": {
      prompt: "Térkép : táj = kotta : ?",
      options: ["hangszer", "zene", "zenész", "papír"],
      explain: "A térkép a tájat, a kotta a zenét rögzíti jelekkel. A kapcsolat: jelrendszer → amit leír.",
    },
    "m-rotateFill": { explain: "A háromszög soronként 90°-onként fordul az óramutató járásával egyezően, a kitöltésből pedig minden sorban és oszlopban mindhárom egyszer fordul elő. Az utolsó cella: felfelé mutató, üres háromszög." },
    "m-rotateFillArrow": { explain: "A nyíl soronként 90°-onként fordul balra, a kitöltésből (vonalkázott, teli, üres) pedig minden sorban és oszlopban mindhárom egyszer fordul elő. A hiányzó cella: felfelé mutató, teli nyíl." },
    "m-rotateSize": { explain: "A kör kitöltött fele soronként 90°-onként fordul az óramutató járása szerint, a méret (kicsi, közepes, nagy) pedig latin négyzetet alkot. A hiányzó elem: kicsi kör, a bal fele kitöltve." },
    "l-syllogism": {
      prompt: "Minden zorg blip. Néhány blip piros. Mi következik ebből biztosan?",
      options: ["Néhány zorg piros.", "Egyetlen zorg sem piros.", "Minden piros dolog zorg.", "Egyik sem következik biztosan."],
      explain: "Lehet, hogy a piros blipek épp azok, amelyek nem zorgok. A két állításból egyik lehetőség sem következik kényszerítően.",
    },
    "l-violin": {
      prompt: "Egyetlen hegedűs sem pilóta. Néhány pilóta sakkozó. Mi következik ebből biztosan?",
      options: ["Néhány sakkozó nem hegedűs.", "Egyetlen sakkozó sem hegedűs.", "Néhány hegedűs sakkozó.", "Egyik sem következik biztosan."],
      explain: "Azok a sakkozók, akik pilóták, biztosan nem hegedűsök – tehát néhány sakkozó nem hegedűs. Hogy a többi sakkozó hegedül-e, nem tudjuk.",
    },
    "l-boxes": {
      prompt: "Három doboz közül csak az egyikben van kincs. Az A dobozon ez áll: „A kincs itt van.” A B-n: „A kincs nincs itt.” A C-n: „A kincs nincs az A-ban.” Pontosan egy felirat igaz. Hol a kincs?",
      options: ["az A-ban", "a B-ben", "a C-ben", "nem dönthető el"],
      explain: "Ha az A-ban lenne, az A és a B felirata is igaz volna. Ha a C-ben, akkor a B és a C igaz. Csak akkor igaz pontosan egy felirat (a C-é), ha a kincs a B-ben van.",
    },
    "n-percent": {
      prompt: "Egy termék árát 20%-kal megemelik, majd az új árat 20%-kal csökkentik. Hogyan viszonyul a végső ár az eredetihez?",
      options: ["ugyanannyi", "4%-kal kevesebb", "4%-kal több", "2%-kal kevesebb"],
      explain: "1,2 × 0,8 = 0,96, vagyis a végső ár az eredeti 96%-a: 4%-kal kevesebb. A csökkentés már a nagyobb árból számol.",
    },
    "n-average": {
      prompt: "Egy diák négy dolgozatának átlaga 7,5 pont. Hány pontot kell elérnie az ötödiken, hogy az átlaga pontosan 8 legyen?",
      options: ["8,5", "9", "10", "12"],
      explain: "Az eddigi összpontszám 4 × 7,5 = 30. Öt dolgozatnál a 8-as átlaghoz 5 × 8 = 40 pont kell, tehát az ötödiken 40 − 30 = 10 pont.",
    },
    "n-speed": {
      prompt: "Egy autó A-ból B-be 60 km/h-val megy, visszafelé ugyanazon az úton 40 km/h-val. Mekkora az átlagsebessége a teljes oda-vissza úton?",
      options: ["48 km/h", "50 km/h", "52 km/h", "55 km/h"],
      explain: "Ha az út 120 km, odafelé 2 óra, visszafelé 3 óra kell: 240 km 5 óra alatt, vagyis 48 km/h. Az 50 km/h azért téves, mert a lassabb szakaszon több időt tölt az autó.",
    },
    "m-combine": { explain: "Minden sorban a harmadik ábra a külső alakzatát az első cellától, a belső narancs alakzatát a második cellától veszi. Az utolsó sorban tehát négyzet a külső és rombusz a belső." },
    "m-combineFill": { explain: "A harmadik oszlop a kitöltést az első cellától, az alakzatot a második cellától veszi. Az utolsó sorban: üres (mint az első cella) négyzet (mint a második cella)." },
    "m-combineCount": { explain: "A harmadik oszlop darabszámát az első cella, alakzatát a második cella adja. Az utolsó sorban: 1 darab (mint a rombusznál) hatszög." },
    "m-clock": { explain: "Két mutató forog olvasási sorrendben (soronként folytatva): a hosszú minden lépésnél 90°-ot fordul jobbra, a rövid narancs 45°-ot balra. Nyolc lépés után a hosszú felfelé, a rövid jobbra mutat." },
    "m-clockBack": { explain: "Olvasási sorrendben a hosszú mutató minden lépésnél 90°-ot fordul balra, a rövid narancs 45°-ot jobbra. Nyolc lépés után a hosszú felfelé, a rövid lefelé mutat." },
    "m-clockMixed": { explain: "Olvasási sorrendben a hosszú mutató 45°-ot fordul jobbra, a rövid narancs 90°-ot balra. Nyolc lépés után mindkettő visszaér a kiinduló állásba: a hosszú lefelé, a rövid jobbra mutat." },
    "m-tripleLatin": { explain: "Az alakzat (kitöltéssel együtt) és a darabszám két külön latin négyzetet alkot: soronként és oszloponként minden érték egyszer szerepel. A hiányzó cella: három vonalkázott háromszög." },
    "m-tripleLatin2": { explain: "Az alakzat (a hozzá tartozó kitöltéssel) és a darabszám két független latin négyzetet alkot. A hiányzó cella: két vonalkázott rombusz." },
    "m-tripleColumns": { explain: "Az alakzat és a kitöltés is minden sorban és oszlopban egyszer szerepel, a darabszámot pedig az oszlop adja (1, 2, 3). A hiányzó cella: három üres négyzet." },
  },
};

export default hu;
