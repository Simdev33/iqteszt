import "server-only";
import { MATRICES, type MatrixId } from "./matrix";
import { matrixOptions, seededShuffle } from "./shapes";
import {
  DIFFICULTY_COUNTS,
  DOMAIN_COUNTS,
  DOMAIN_POOL_COUNTS,
  POOL_SIZE,
  TOTAL,
  VARIANTS_PER_SLOT,
  type Difficulty,
  type Domain,
} from "./meta";
import type { MatrixQuestion, PublicQuestion, Question, TextQuestion } from "./types";

// A teljes feladatbank a helyes válaszokkal és a magyarázatokkal – csak a szerveren fut.
// A böngésző a publicSlots() megoldás nélküli változatát kapja.

const MATRIX_PROMPT = "Melyik ábra illik a kérdőjel helyére?";

function m(id: MatrixId, difficulty: Difficulty, explain: string): MatrixQuestion {
  const spec = MATRICES[id];
  const { options, answer } = matrixOptions(id, spec);
  return {
    id: `m-${id}`,
    kind: "matrix",
    domain: "matrix",
    difficulty,
    prompt: MATRIX_PROMPT,
    cells: spec.cells,
    options,
    answer,
    guide: "guide" in spec ? spec.guide : undefined,
    explain,
  };
}

function t(
  id: string,
  domain: Exclude<Domain, "matrix">,
  difficulty: Difficulty,
  prompt: string,
  options: string[],
  answer: number,
  explain: string,
  sequence?: string[],
): TextQuestion {
  return { id, kind: "text", domain, difficulty, prompt, options, answer, explain, sequence };
}

/**
 * A feladatbank: 30 „hely”, mindegyiken 3 változat. Egy helyen belül a változatok azonos területről
 * és azonos nehézségűek, így bármelyik összeállítás ugyanolyan szerkezetű tesztet ad
 * (nagyjából növekvő nehézség, a négy terület váltakozva). Minden feladat saját fejlesztés.
 * Egy összeállítást helyenként a változat sorszáma ír le (0–2); a megosztható link ezt viszi magával.
 */
const RAW_SLOTS: Question[][] = [
  [
    m("count", 1, "Soronként ugyanaz az alakzat marad, balról jobbra pedig eggyel nő a darabszám: 1, 2, 3. A harmadik sor végére így három háromszög kerül."),
    m("countDown", 1, "Soronként azonos az alakzat, balról jobbra pedig eggyel csökken a darabszám: 3, 2, 1. Az utolsó sor végére egyetlen hatszög kerül."),
    m("countRows", 1, "Minden oszlopnak saját alakzata van, lefelé haladva pedig eggyel nő a darabszám: 2, 3, 4. A rombuszok oszlopába tehát négy rombusz kerül."),
  ],
  [
    t("n-squares", "numeric", 1, "Melyik szám folytatja a sort?", ["30", "34", "36", "49"], 2, "Ezek a négyzetszámok: 1², 2², 3², 4², 5² – a következő 6² = 36.", ["1", "4", "9", "16", "25", "?"]),
    t("n-add", "numeric", 1, "Melyik szám folytatja a sort?", ["17", "18", "19", "21"], 0, "Minden lépésben 3-mal nő a szám: 14 + 3 = 17.", ["2", "5", "8", "11", "14", "?"]),
    t("n-halve", "numeric", 1, "Melyik szám folytatja a sort?", ["2", "3", "4", "6"], 3, "Minden tag az előző fele: 12 : 2 = 6.", ["96", "48", "24", "12", "?"]),
  ],
  [
    t("v-nest", "verbal", 1, "Madár : fészek = méh : ?", ["méz", "virág", "kaptár", "fullánk"], 2, "A madár a fészekben lakik, a méh a kaptárban. A kapcsolat: élőlény → az otthona."),
    t("v-fish", "verbal", 1, "Hal : úszik = madár : ?", ["fészek", "repül", "toll", "tojás"], 1, "A hal úszva, a madár repülve közlekedik. A kapcsolat: élőlény → jellemző mozgásforma."),
    t("v-doctor", "verbal", 1, "Orvos : kórház = tanár : ?", ["diák", "iskola", "tankönyv", "óra"], 1, "Az orvos a kórházban dolgozik, a tanár az iskolában. A kapcsolat: foglalkozás → munkahely."),
  ],
  [
    m("fillColumns", 1, "Minden sornak saját alakzata van, az oszlopok pedig a kitöltést adják: üres, vonalkázott, teli. A csillag sorának harmadik eleme tehát teli csillag."),
    m("fillRows", 1, "Az oszlopok adják az alakzatot (háromszög, hatszög, plusz), a sorok a kitöltést: üres, félig kitöltött, teli. A hiányzó elem a teli plusz jel."),
    m("fillReverse", 1, "Minden sornak saját alakzata van, az oszlopok kitöltése pedig balról jobbra: teli, vonalkázott, üres. A négyzetek sorának végére üres négyzet kerül."),
  ],
  [
    t("l-days", "logic", 1, "Ha holnapután péntek lesz, milyen nap volt tegnapelőtt?", ["vasárnap", "hétfő", "kedd", "szerda"], 1, "Ha holnapután péntek, akkor ma szerda van. Szerdától két nappal korábban hétfő volt."),
    t("l-days2", "logic", 1, "Ha tegnapelőtt csütörtök volt, milyen nap lesz holnapután?", ["vasárnap", "hétfő", "kedd", "péntek"], 1, "Ha tegnapelőtt csütörtök volt, ma szombat van. Szombat után két nappal hétfő lesz."),
    t("l-bell", "logic", 1, "Egy harang 20 percenként üt egyet, és már az indulás pillanatában is üt. Hányat üt összesen 2 óra alatt, ha a 2. óra végén lévő ütést is beleszámoljuk?", ["6", "7", "8", "12"], 1, "Az ütések: 0, 20, 40, 60, 80, 100 és 120 percnél – ez 7 ütés. A 6-os válasz a klasszikus „kerítésoszlop-hiba”: kimarad az indulás pillanata."),
  ],
  [
    m("rotation", 1, "A nyíl minden lépésnél 45°-kal fordul az óramutató járásával egyezően, és minden sor 90°-kal elfordítva indul. Az utolsó sor 180°, 225° után 270°-nál, vagyis balra mutatva ér véget."),
    m("rotationBack", 1, "A nyíl lépésenként 45°-ot fordul balra (az óramutatóval ellentétesen), a sorok pedig 0°-ról, 90°-ról és 180°-ról indulnak. Az utolsó sor: lefelé, jobbra lefelé, majd jobbra."),
    m("rotationHand", 1, "A mutató minden lépésnél 90°-ot fordul jobbra, a sorok pedig 45°-kal eltolva indulnak. Az utolsó sor: 6 óra, 9 óra, majd 12 óra irányába mutat – vagyis felfelé."),
  ],
  [
    t("n-double", "numeric", 1, "Melyik szám folytatja a sort?", ["47", "62", "63", "64"], 2, "Minden tag az előző kétszerese plusz egy: 31 × 2 + 1 = 63.", ["3", "7", "15", "31", "?"]),
    t("n-triangular", "numeric", 1, "Melyik szám folytatja a sort?", ["18", "20", "21", "25"], 2, "A különbségek egyesével nőnek: +2, +3, +4, +5, így most +6 jön: 15 + 6 = 21.", ["1", "3", "6", "10", "15", "?"]),
    t("n-primes", "numeric", 1, "Melyik szám folytatja a sort?", ["12", "13", "15", "17"], 1, "Ezek a prímszámok (csak 1-gyel és önmagukkal oszthatók). A 11 után következő prím a 13.", ["2", "3", "5", "7", "11", "?"]),
  ],
  [
    t("v-opposite", "verbal", 1, "Melyik szó áll legközelebb a BŐKEZŰ ellentétéhez?", ["gazdag", "fösvény", "szerény", "irigy"], 1, "A bőkezű ember szívesen és sokat ad. Az ellentéte a fösvény, aki a legkevesebbet is sajnálja."),
    t("v-brave", "verbal", 1, "Melyik szó áll legközelebb a BÁTOR ellentétéhez?", ["erős", "gyáva", "csendes", "lusta"], 1, "A bátor ember szembenéz a veszéllyel, a gyáva kerüli. A többi szó egészen más tulajdonságot ír le."),
    t("v-diligent", "verbal", 1, "Melyik szó jelentése áll legközelebb a SZORGALMAS szóhoz?", ["okos", "dolgos", "gyors", "pontos"], 1, "A szorgalmas és a dolgos ember is kitartóan, sokat dolgozik. Az okos, a gyors és a pontos más-más tulajdonság."),
  ],
  [
    m("latin", 2, "Minden sorban és minden oszlopban pontosan egyszer szerepel a kör, a négyzet és a háromszög, a kitöltés pedig soronként azonos. Az utolsó sorból a teli négyzet hiányzik."),
    m("latinFill", 2, "Soronként azonos az alakzat, a kitöltés (teli, vonalkázott, üres) pedig minden sorban és oszlopban pontosan egyszer fordul elő. A rombuszok sorából a vonalkázott rombusz hiányzik."),
    m("latinCount", 2, "Soronként azonos az alakzat, a darabszám (1, 2, 3) pedig minden sorban és oszlopban pontosan egyszer szerepel. Az utolsó sorból a három csillag hiányzik."),
  ],
  [
    t("l-painters", "logic", 2, "Ha 3 festő 3 nap alatt 3 falat fest ki, hány nap alatt fest ki 6 festő 6 falat?", ["1 nap", "3 nap", "6 nap", "12 nap"], 1, "Egy festő 3 nap alatt fest ki egy falat. Hat festő párhuzamosan dolgozik, így 6 fal is 3 nap alatt készül el."),
    t("l-hens", "logic", 2, "Ha 4 tyúk 4 nap alatt 4 tojást tojik, hány tojást tojik 8 tyúk 8 nap alatt?", ["8", "16", "32", "64"], 1, "Egy tyúk 4 nap alatt 1 tojást tojik, 8 nap alatt tehát 2-t. 8 tyúk így 8 × 2 = 16 tojást tojik."),
    t("l-snail", "logic", 2, "Egy csiga egy 10 méter mély kút aljáról indul. Nappal 3 métert mászik fel, éjjel 2 métert csúszik vissza. Hányadik napon ér ki a kútból?", ["az 5.", "a 7.", "a 8.", "a 10."], 2, "Hét nap és hét éjszaka után 7 méteren van. A 8. napon felmászik 3 métert, és eléri a 10 métert – onnan már nem csúszik vissza."),
  ],
  [
    m("walker", 2, "A narancs pont az óramutató járásával egyezően lép sarokról sarokra, a lila gyűrű pedig ellenkező irányban halad az oldalfelezőkön. Négy lépésenként ismétlődik a minta, így a kilencedik cella megegyezik az elsővel."),
    m("orbit", 2, "A keret mentén nyolc hely van. A narancs pont minden lépésnél egy hellyel halad az óramutató járása szerint, a lila gyűrű egy hellyel ellenkező irányban. Nyolc lépés után mindkettő visszaér a kiindulópontjára: a pont felül középen, a gyűrű a jobb alsó sarokban áll."),
    m("quadrants", 2, "A lila négyzet az óramutató járása szerint lép negyedről negyedre, a narancs ellentétes irányban. Négy lépésenként ismétlődik a minta, így a kilencedik cella az elsővel egyezik."),
  ],
  [
    t("n-alternate", "numeric", 2, "Melyik szám folytatja a sort?", ["12", "24", "28", "30"], 2, "Két művelet váltakozik: ×2, majd −2. 5 → 10 → 8 → 16 → 14 → 28.", ["5", "10", "8", "16", "14", "?"]),
    t("n-interleave", "numeric", 2, "Melyik szám folytatja a sort?", ["4", "5", "6", "7"], 3, "Két sor fut egymásba fésülve: minden második tag 1, 3, 5 (+2), a többi 12, 10, 8 (−2). A hetedik tag az első sorba tartozik: 5 + 2 = 7.", ["1", "12", "3", "10", "5", "8", "?"]),
    t("n-fibo", "numeric", 2, "Melyik szám folytatja a sort?", ["36", "42", "48", "52"], 1, "Minden tag az előző kettő összege: 16 + 26 = 42.", ["2", "4", "6", "10", "16", "26", "?"]),
  ],
  [
    t("v-odd", "verbal", 2, "Melyik a kakukktojás?", ["hegedű", "cselló", "fuvola", "nagybőgő"], 2, "A hegedű, a cselló és a nagybőgő vonós hangszer, a fuvola viszont fúvós."),
    t("v-planet", "verbal", 2, "Melyik a kakukktojás?", ["Merkúr", "Vénusz", "Hold", "Mars"], 2, "A Merkúr, a Vénusz és a Mars bolygó, a Hold viszont a Föld kísérője, nem bolygó."),
    t("v-polygon", "verbal", 2, "Melyik a kakukktojás?", ["háromszög", "négyzet", "kör", "ötszög"], 2, "A háromszög, a négyzet és az ötszög egyenes oldalú sokszög. A kör nem sokszög."),
  ],
  [
    m("union", 2, "Soronként a harmadik ábra az első kettő egymásra helyezése: minden vonal megmarad, ami bármelyikben szerepel. Az utolsó sorban így a függőleges középvonal, a felső él és a vízszintes középvonal együtt adja a választ."),
    m("unionLines", 2, "Soronként a harmadik ábra az első kettő egymásra helyezése. Az utolsó sorban a bal oldali él, a jobb oldali él és a vízszintes középvonal együtt egy H betűt ad."),
    m("unionDots", 2, "Soronként a harmadik ábrán minden pont szerepel, ami az első kettő bármelyikén megvan. Az utolsó sorban: bal alsó, középső, jobb felső és jobb alsó pont."),
  ],
  [
    t("l-ages", "logic", 2, "Anna idősebb Bélánál. Béla idősebb Dórinál. Csaba fiatalabb Dórinál. Ki a legfiatalabb?", ["Anna", "Béla", "Csaba", "Dóri"], 2, "A sorrend idősebbtől fiatalabbig: Anna > Béla > Dóri > Csaba. Csaba a legfiatalabb."),
    t("l-queue", "logic", 2, "Öten állnak sorban. Hanna Eszter előtt áll, Ivett Hanna és Eszter között, Eszter Feri előtt, Gábor pedig a sor végén. Ki áll a sor elején?", ["Eszter", "Hanna", "Ivett", "Feri"], 1, "A sorrend: Hanna, Ivett, Eszter, Feri, Gábor. A sor elején Hanna áll."),
    t("l-heights", "logic", 2, "Péter magasabb Zolinál, de alacsonyabb Rékánál. Réka alacsonyabb Tamásnál. Ki a második legmagasabb?", ["Péter", "Réka", "Tamás", "Zoli"], 1, "Magasság szerint csökkenő sorrendben: Tamás, Réka, Péter, Zoli. A második legmagasabb Réka."),
  ],
  [
    m("countSum", 2, "Soronként az első két cella elemszámának összege adja a harmadikat: 1 + 3 = 4, 2 + 1 = 3, tehát 3 + 2 = 5 vonalkázott háromszög."),
    m("countDiff", 2, "Soronként az első cella elemszámából kivonjuk a másodikét: 5 − 1 = 4, 6 − 4 = 2, tehát 4 − 1 = 3 csillag."),
    m("countColumns", 2, "Itt oszloponként kell összeadni: az első két sor elemszáma adja a harmadikat (1 + 1 = 2, 2 + 3 = 5). A rombuszoknál 1 + 3 = 4."),
  ],
  [
    t("n-bat", "numeric", 2, "Egy ütő és egy labda együtt 1100 Ft. Az ütő 1000 Ft-tal drágább a labdánál. Mennyibe kerül a labda?", ["50 Ft", "100 Ft", "150 Ft", "1000 Ft"], 0, "Ha a labda x, az ütő x + 1000, együtt 2x + 1000 = 1100, így x = 50 Ft. A kézenfekvő 100 Ft-os válasz csapda: akkor az ütő 1100 lenne, az összeg 1200."),
    t("n-lily", "numeric", 2, "Egy tavon a tavirózsák által borított terület minden nap megduplázódik. 48 nap alatt borítják be az egész tavat. Hány nap alatt borították be a tó felét?", ["24 nap", "36 nap", "46 nap", "47 nap"], 3, "Ha a terület naponta duplázódik, a teljes borítás előtti napon még csak a tó fele volt fedve: 48 − 1 = 47. A 24 napos válasz csapda – az egyenletes növekedésnél lenne igaz."),
    t("n-taps", "numeric", 2, "Egy kád az egyik csapból 6 perc alatt telik meg, a másikból 3 perc alatt. Hány perc alatt telik meg, ha mindkét csapot egyszerre nyitjuk meg?", ["2 perc", "3 perc", "4,5 perc", "9 perc"], 0, "Az első csap percenként a kád 1/6-át, a második az 1/3-át tölti meg, együtt 1/6 + 2/6 = 1/2 részét. Így 2 perc alatt telik meg."),
  ],
  [
    m("sides", 2, "Balról jobbra minden lépésnél eggyel nő a sokszög oldalszáma, és minden sor eggyel több oldallal kezd. A soronként azonos kitöltéssel együtt a válasz egy teli hétszög."),
    m("sidesDots", 2, "Az oszlopok adják a sokszöget (3, 4, 5 oldal), a sorok a belső pöttyök számát (1, 2, 3). A jobb alsó cella: ötszög három pöttyel."),
    m("sidesDown", 2, "Balról jobbra minden lépésnél eggyel kevesebb oldala van a sokszögnek, és minden sor eggyel kevesebb oldallal indul (7, 6, 5). Az oszlopok a kitöltést adják. A hiányzó elem: teli háromszög."),
  ],
  [
    t("v-homonym", "verbal", 2, "Melyik szó jelenti egyszerre a fa egyik részét és egy postán küldhető írást?", ["lap", "levél", "kéreg", "boríték"], 1, "A levél a fa lombjának része, és a postán küldött írás neve is."),
    t("v-feather", "verbal", 2, "Melyik szó jelenti egyszerre a madár testét borító egyik elemet és egy íróeszközt?", ["szárny", "toll", "ceruza", "pihe"], 1, "A toll a madár tollazatának része, és az íróeszköz neve is."),
    t("v-pear", "verbal", 2, "Melyik szó jelöl egyszerre egy gyümölcsöt és – a köznyelvben – egy villanyégőt?", ["alma", "körte", "lámpa", "izzó"], 1, "A körte gyümölcs, a köznyelvben pedig a villanykörtét, vagyis az izzót is így hívjuk."),
  ],
  [
    m("nestedLatin", 2, "Két szabály fut egymástól függetlenül: a külső alakzat (kör, négyzet, hatszög) és a belső narancs alakzat (háromszög, kör, négyzet) is soronként és oszloponként egyszer szerepel. A hiányzó cella: négyzetben felfelé mutató háromszög."),
    m("nestedLatin2", 2, "A külső alakzat (négyzet, háromszög, kör) és a belső narancs alakzat (plusz, csillag, rombusz) két független latin négyzetet alkot. A hiányzó cella: háromszögben álló plusz jel."),
    m("nestedCount", 2, "A külső alakzat (hatszög, rombusz, kör) és a pöttyök száma (1, 2, 3) is minden sorban és oszlopban pontosan egyszer szerepel. A hiányzó cella: rombusz egy pöttyel."),
  ],
  [
    t("l-cube", "logic", 3, "Egy 3×3×3-as kockát kívülről befestenek, majd 27 egyforma kis kockára vágják. Hány kis kockának van pontosan két festett lapja?", ["6", "8", "12", "24"], 2, "Két festett lapja az éleken ülő, de nem sarokban lévő kis kockáknak van. A kockának 12 éle van, mindegyiken 1 ilyen kis kocka: 12."),
    t("l-cube4", "logic", 3, "Egy 4×4×4-es kockát kívülről befestenek, majd 64 egyforma kis kockára vágják. Hány kis kockának van pontosan egy festett lapja?", ["16", "24", "32", "36"], 1, "Egy festett lapja a nagy kocka lapjainak belső részén lévő kis kockáknak van: minden lapon 2 × 2 = 4 ilyen, a 6 lapon összesen 24."),
    t("l-clock", "logic", 3, "Hány fokos szöget zár be az óra kismutatója és nagymutatója pontosan 3:30-kor?", ["60°", "75°", "90°", "105°"], 1, "A nagymutató a 6-oson áll (180°). A kismutató a 3-as és a 4-es között félúton jár: 90° + 15° = 105°. A kettő különbsége 180° − 105° = 75°."),
  ],
  [
    t("n-power", "numeric", 3, "Melyik szám folytatja a sort?", ["31", "32", "33", "34"], 2, "A különbségek duplázódnak: +1, +2, +4, +8, így a következő lépés +16: 17 + 16 = 33. (Másképp: 2ⁿ + 1.)", ["2", "3", "5", "9", "17", "?"]),
    t("n-squareMinus", "numeric", 3, "Melyik szám folytatja a sort?", ["46", "48", "49", "50"], 1, "A különbségek egymást követő páratlan számok: +5, +7, +9, +11, most +13: 35 + 13 = 48. (Másképp: n² − 1, itt 7² − 1.)", ["3", "8", "15", "24", "35", "?"]),
    t("n-factorial", "numeric", 3, "Melyik szám folytatja a sort?", ["240", "360", "600", "720"], 3, "Minden tagot egy eggyel nagyobb számmal szorzunk: ×2, ×3, ×4, ×5, most ×6: 120 × 6 = 720.", ["1", "2", "6", "24", "120", "?"]),
  ],
  [
    m("xor", 3, "Soronként a harmadik ábrán csak azok a vonalak maradnak meg, amelyek a két első ábra közül pontosan egyben szerepelnek – a közös vonalak kiesnek. Az utolsó sorban a jobb oldali él közös, így az eltűnik."),
    m("xorDots", 3, "Soronként a harmadik ábrán csak azok a pontok maradnak, amelyek a két első közül pontosan egyben szerepelnek. Az utolsó sorban a bal alsó pont közös, ezért az kiesik."),
    m("xorDiag", 3, "Soronként a harmadik ábrán csak azok a vonalak maradnak, amelyek pontosan az egyik első ábrán szerepelnek. Az utolsó sorban a függőleges középvonal közös, ezért eltűnik."),
  ],
  [
    t("v-symphony", "verbal", 3, "Könyv : fejezet = szimfónia : ?", ["karmester", "tétel", "hangjegy", "zenekar"], 1, "A könyv fejezetekből áll, a szimfónia tételekből. A kapcsolat: egész → nagyobb szerkezeti egysége."),
    t("v-tadpole", "verbal", 3, "Hernyó : pillangó = ebihal : ?", ["hal", "béka", "gyík", "tavirózsa"], 1, "A hernyóból pillangó, az ebihalból béka lesz. A kapcsolat: fejlődési alak → kifejlett állat."),
    t("v-map", "verbal", 3, "Térkép : táj = kotta : ?", ["hangszer", "zene", "zenész", "papír"], 1, "A térkép a tájat, a kotta a zenét rögzíti jelekkel. A kapcsolat: jelrendszer → amit leír."),
  ],
  [
    m("rotateFill", 3, "A háromszög soronként 90°-onként fordul az óramutató járásával egyezően, a kitöltésből pedig minden sorban és oszlopban mindhárom egyszer fordul elő. Az utolsó cella: felfelé mutató, üres háromszög."),
    m("rotateFillArrow", 3, "A nyíl soronként 90°-onként fordul balra, a kitöltésből (vonalkázott, teli, üres) pedig minden sorban és oszlopban mindhárom egyszer fordul elő. A hiányzó cella: felfelé mutató, teli nyíl."),
    m("rotateSize", 3, "A kör kitöltött fele soronként 90°-onként fordul az óramutató járása szerint, a méret (kicsi, közepes, nagy) pedig latin négyzetet alkot. A hiányzó elem: kicsi kör, a bal fele kitöltve."),
  ],
  [
    t("l-syllogism", "logic", 3, "Minden zorg blip. Néhány blip piros. Mi következik ebből biztosan?", ["Néhány zorg piros.", "Egyetlen zorg sem piros.", "Minden piros dolog zorg.", "Egyik sem következik biztosan."], 3, "Lehet, hogy a piros blipek épp azok, amelyek nem zorgok. A két állításból egyik lehetőség sem következik kényszerítően."),
    t("l-violin", "logic", 3, "Egyetlen hegedűs sem pilóta. Néhány pilóta sakkozó. Mi következik ebből biztosan?", ["Néhány sakkozó nem hegedűs.", "Egyetlen sakkozó sem hegedűs.", "Néhány hegedűs sakkozó.", "Egyik sem következik biztosan."], 0, "Azok a sakkozók, akik pilóták, biztosan nem hegedűsök – tehát néhány sakkozó nem hegedűs. Hogy a többi sakkozó hegedül-e, nem tudjuk."),
    t("l-boxes", "logic", 3, "Három doboz közül csak az egyikben van kincs. Az A dobozon ez áll: „A kincs itt van.” A B-n: „A kincs nincs itt.” A C-n: „A kincs nincs az A-ban.” Pontosan egy felirat igaz. Hol a kincs?", ["az A-ban", "a B-ben", "a C-ben", "nem dönthető el"], 1, "Ha az A-ban lenne, az A és a B felirata is igaz volna. Ha a C-ben, akkor a B és a C igaz. Csak akkor igaz pontosan egy felirat (a C-é), ha a kincs a B-ben van."),
  ],
  [
    t("n-percent", "numeric", 3, "Egy termék árát 20%-kal megemelik, majd az új árat 20%-kal csökkentik. Hogyan viszonyul a végső ár az eredetihez?", ["ugyanannyi", "4%-kal kevesebb", "4%-kal több", "2%-kal kevesebb"], 1, "1,2 × 0,8 = 0,96, vagyis a végső ár az eredeti 96%-a: 4%-kal kevesebb. A csökkentés már a nagyobb árból számol."),
    t("n-average", "numeric", 3, "Egy diák négy dolgozatának átlaga 7,5 pont. Hány pontot kell elérnie az ötödiken, hogy az átlaga pontosan 8 legyen?", ["8,5", "9", "10", "12"], 2, "Az eddigi összpontszám 4 × 7,5 = 30. Öt dolgozatnál a 8-as átlaghoz 5 × 8 = 40 pont kell, tehát az ötödiken 40 − 30 = 10 pont."),
    t("n-speed", "numeric", 3, "Egy autó A-ból B-be 60 km/h-val megy, visszafelé ugyanazon az úton 40 km/h-val. Mekkora az átlagsebessége a teljes oda-vissza úton?", ["48 km/h", "50 km/h", "52 km/h", "55 km/h"], 0, "Ha az út 120 km, odafelé 2 óra, visszafelé 3 óra kell: 240 km 5 óra alatt, vagyis 48 km/h. Az 50 km/h azért téves, mert a lassabb szakaszon több időt tölt az autó."),
  ],
  [
    m("combine", 3, "Minden sorban a harmadik ábra a külső alakzatát az első cellától, a belső narancs alakzatát a második cellától veszi. Az utolsó sorban tehát négyzet a külső és rombusz a belső."),
    m("combineFill", 3, "A harmadik oszlop a kitöltést az első cellától, az alakzatot a második cellától veszi. Az utolsó sorban: üres (mint az első cella) négyzet (mint a második cella)."),
    m("combineCount", 3, "A harmadik oszlop darabszámát az első cella, alakzatát a második cella adja. Az utolsó sorban: 1 darab (mint a rombusznál) hatszög."),
  ],
  [
    m("clock", 3, "Két mutató forog olvasási sorrendben (soronként folytatva): a hosszú minden lépésnél 90°-ot fordul jobbra, a rövid narancs 45°-ot balra. Nyolc lépés után a hosszú felfelé, a rövid jobbra mutat."),
    m("clockBack", 3, "Olvasási sorrendben a hosszú mutató minden lépésnél 90°-ot fordul balra, a rövid narancs 45°-ot jobbra. Nyolc lépés után a hosszú felfelé, a rövid lefelé mutat."),
    m("clockMixed", 3, "Olvasási sorrendben a hosszú mutató 45°-ot fordul jobbra, a rövid narancs 90°-ot balra. Nyolc lépés után mindkettő visszaér a kiinduló állásba: a hosszú lefelé, a rövid jobbra mutat."),
  ],
  [
    m("tripleLatin", 3, "Az alakzat (kitöltéssel együtt) és a darabszám két külön latin négyzetet alkot: soronként és oszloponként minden érték egyszer szerepel. A hiányzó cella: három vonalkázott háromszög."),
    m("tripleLatin2", 3, "Az alakzat (a hozzá tartozó kitöltéssel) és a darabszám két független latin négyzetet alkot. A hiányzó cella: két vonalkázott rombusz."),
    m("tripleColumns", 3, "Az alakzat és a kitöltés is minden sorban és oszlopban egyszer szerepel, a darabszámot pedig az oszlop adja (1, 2, 3). A hiányzó cella: három üres négyzet."),
  ],
];

// A szavas és a névsoros feladatok válaszait kérdésenként (determinisztikusan) megkeverjük, hogy a helyes
// válasz ne mindig ugyanazon a betűn legyen. A számos és sorrendi opciók maradnak növekvő sorrendben.
const SHUFFLE_LOGIC = new Set(["l-ages", "l-queue", "l-heights"]);
function withMixedOptions(q: Question): Question {
  if (q.kind !== "text" || (q.domain !== "verbal" && !SHUFFLE_LOGIC.has(q.id))) return q;
  const mixed = seededShuffle(
    q.options.map((o, i) => ({ o, ok: i === q.answer })),
    `opt-${q.id}`,
  );
  return { ...q, options: mixed.map((x) => x.o), answer: mixed.findIndex((x) => x.ok) };
}

export const SLOTS: Question[][] = RAW_SLOTS.map((slot) => slot.map(withMixedOptions));

export const POOL = SLOTS.flat();

// Szerkezeti ellenőrzés: helyenként azonos terület és nehézség, egyedi azonosítók,
// és a böngészőnek szóló lib/meta.ts számai egyeznek a valós bankkal.
{
  const fail = (msg: string) => {
    throw new Error(`Feladatbank: ${msg}`);
  };
  if (SLOTS.length !== TOTAL) fail(`${SLOTS.length} hely van, a meta ${TOTAL}-at vár.`);
  if (POOL.length !== POOL_SIZE) fail(`${POOL.length} kérdés van, a meta ${POOL_SIZE}-at vár.`);
  const ids = new Set<string>();
  const perTest: Record<string, number> = {};
  const perPool: Record<string, number> = {};
  const perDiff: Record<string, number> = {};
  SLOTS.forEach((slot, i) => {
    if (slot.length !== VARIANTS_PER_SLOT) fail(`a(z) ${i + 1}. helyen ${slot.length} változat van.`);
    perTest[slot[0].domain] = (perTest[slot[0].domain] ?? 0) + 1;
    perDiff[slot[0].difficulty] = (perDiff[slot[0].difficulty] ?? 0) + 1;
    for (const q of slot) {
      if (q.domain !== slot[0].domain || q.difficulty !== slot[0].difficulty) fail(`a(z) ${q.id} nem illik a(z) ${i + 1}. helyre.`);
      if (ids.has(q.id)) fail(`ismétlődő azonosító: ${q.id}`);
      ids.add(q.id);
      perPool[q.domain] = (perPool[q.domain] ?? 0) + 1;
    }
  });
  const same = (a: Record<string, number>, b: Record<string, number>) => Object.keys(b).every((k) => a[k] === b[k]);
  if (!same(perTest, DOMAIN_COUNTS)) fail("a területenkénti darabszám eltér a meta DOMAIN_COUNTS-tól.");
  if (!same(perPool, DOMAIN_POOL_COUNTS)) fail("a bank területenkénti mérete eltér a meta DOMAIN_POOL_COUNTS-tól.");
  if (!same(perDiff, DIFFICULTY_COUNTS)) fail("a nehézségi eloszlás eltér a meta DIFFICULTY_COUNTS-tól.");
}

/** A kiválasztott változatokból összeálló 30 kérdés. */
export function buildTest(variants: number[]): Question[] {
  return SLOTS.map((slot, i) => slot[variants[i] ?? 0] ?? slot[0]);
}

/** Semleges nyilvános azonosító – a belső név (pl. „m-xorDots”) elárulná a feladat szabályát. */
function opaqueId(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `q${(h >>> 0).toString(36)}`;
}
if (new Set(POOL.map((q) => opaqueId(q.id))).size !== POOL.length) throw new Error("Feladatbank: ütköző nyilvános azonosító.");

/** A bank a böngészőnek: helyes válasz, magyarázat és beszédes azonosító nélkül. */
export function publicSlots(): PublicQuestion[][] {
  return SLOTS.map((slot) =>
    slot.map((q) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { answer, explain, ...pub } = q;
      return { ...pub, id: opaqueId(q.id) } as PublicQuestion;
    }),
  );
}
