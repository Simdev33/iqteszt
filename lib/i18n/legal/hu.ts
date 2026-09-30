import type { LegalTexts } from "./types";

// Magyar jogi szövegek – ez a forrás, a többi nyelv ennek a fordítása.

const hu: LegalTexts = {
  terms: {
    title: "Általános Szerződési Feltételek",
    lead: "Ezek a feltételek szabályozzák a(z) {site} weboldalon elérhető online IQ-teszt és a hozzá tartozó fizetős eredmény, illetve előfizetés igénybevételét. Kérjük, fizetés előtt figyelmesen olvasd el.",
    sections: [
      {
        h: "1. A szolgáltató adatai",
        p: [
          "- Cégnév: {company}",
          "- Székhely: {address}, {country}",
          "- Nyilvántartás: {register}",
          "- Cégazonosító szám (IČO): {ico}",
          "- Adóazonosító szám (DIČ): {dic}",
          "- Törzstőke: {capital}",
          "- E-mail: {email}",
          "- Weboldal: {site}",
          "A továbbiakban: „Szolgáltató”. A weboldalt használó természetes személy a továbbiakban: „Felhasználó”.",
        ],
      },
      {
        h: "2. A szolgáltatás",
        p: [
          "A weboldalon egy 30 feladatból álló online IQ-teszt tölthető ki ingyenesen, regisztráció nélkül. A kitöltés után a részletes eredmény (IQ-becslés, percentilis, területenkénti bontás és a feladatok megoldása magyarázattal) díj ellenében oldható fel.",
          "Az eredmény egy rövid online feladatsoron alapuló, *tájékoztató jellegű becslés*. Nem minősül orvosi, pszichológiai vagy egyéb szakmai diagnózisnak, és nem alkalmas oktatási, munkaügyi, egészségügyi vagy jogi döntések megalapozására.",
          "A szolgáltatást 18 éven felüli személyek, illetve kiskorúak kizárólag törvényes képviselőjük hozzájárulásával vehetik igénybe fizetős formában.",
        ],
      },
      {
        h: "3. Csomagok és árak",
        p: [
          "A Felhasználó a teszt kitöltése után az alábbi lehetőségek közül választhat:",
          "- *Egyszeri feloldás – {oneTime}:* az adott kitöltés részletes eredménye. Egyszeri díj, nincs előfizetés és nincs ismétlődő terhelés.",
          "- *Próbaidős hozzáférés – {trial} a {days} napos próbaidőre:* az adott kitöltés részletes eredménye, valamint az előfizetés ideje alatt korlátlan számú további teszt és eredmény. A próbaidő leteltével a hozzáférés *automatikusan havi {monthly} díjú előfizetéssé alakul*, amely havonta, előre fizetendő, és addig tart, amíg a Felhasználó le nem mondja.",
          "A feltüntetett árak a Felhasználó által ténylegesen fizetendő végösszegek; további díj (pl. szállítási vagy kezelési költség) nincs. Az euróban megadott árak átváltásakor a Felhasználó bankja saját árfolyamot és díjat alkalmazhat.",
          "A Szolgáltató fenntartja a jogot az árak jövőbeli módosítására. A módosítás a már megkötött egyszeri vásárlást nem érinti; előfizetés esetén a Szolgáltató legalább 30 nappal a hatálybalépés előtt e-mailben értesíti a Felhasználót, aki az új ár hatálybalépése előtt díjmentesen lemondhatja az előfizetést.",
        ],
      },
      {
        h: "4. A szerződés létrejötte és a fizetés",
        p: [
          "A Felhasználó a fizetési képernyőn kiválasztja a csomagot, elfogadja ezeket a feltételeket és a digitális tartalom azonnali teljesítésére vonatkozó nyilatkozatot, majd átirányítást kap a Stripe biztonságos fizetési oldalára. A fizetés elküldése előtt a Felhasználó bármikor visszaléphet, a válaszait és a megadott adatokat módosíthatja.",
          "A szerződés a fizetés sikeres teljesítésével jön létre a Szolgáltató és a Felhasználó között, azon a nyelven, amelyen a Felhasználó a weboldalt használja. A szerződést a Szolgáltató külön nem iktatja; a fizetésről a Stripe e-mailben nyugtát küld a Felhasználó által megadott címre. Ezek a feltételek a weboldalon bármikor elérhetők és elmenthetők.",
          "A fizetést a Stripe Payments Europe, Ltd. dolgozza fel. Elfogadott fizetési módok: bankkártya, Apple Pay, Google Pay. A kártyaadatokat kizárólag a Stripe kezeli, azokhoz a Szolgáltató nem fér hozzá.",
          "Előfizetés esetén a Felhasználó hozzájárul, hogy a Szolgáltató a Stripe-on keresztül a próbaidő végén, majd havonta a megadott fizetési módot terhelje a havidíjjal, amíg az előfizetést le nem mondja. Sikertelen terhelés esetén a Stripe a terhelést újrapróbálhatja; tartós fizetési hiba esetén az előfizetés megszűnik.",
        ],
      },
      {
        h: "5. Teljesítés és hozzáférés",
        p: [
          "A részletes eredmény a sikeres fizetés után azonnal megjelenik, és az eredményoldal linkjén később is elérhető.",
          "Az előfizetéshez tartozó korlátlan hozzáférést a weboldal abban a böngészőben biztosítja, amelyben az előfizetés létrejött (ehhez egy szükséges sütit helyez el). Más eszközön a Felhasználó az [Előfizetés kezelése](subscription) oldalon, az e-mail-címével léphet be az ügyfélportálra.",
        ],
      },
      {
        h: "6. Az előfizetés lemondása",
        p: [
          "Az előfizetés *bármikor, indoklás nélkül lemondható*: a weboldal alján található [Előfizetés kezelése](subscription) linken keresztül, a Stripe ügyfélportálján néhány kattintással, vagy a(z) {email} címre küldött e-mailben.",
          "A lemondás a folyamatban lévő (próba)időszak végén lép hatályba; addig a hozzáférés megmarad, további terhelés nem történik. Ha a Felhasználó a próbaidő alatt mondja le az előfizetést, a havidíj egyszer sem kerül terhelésre.",
          "A már megkezdett időszak díját a Szolgáltató – a jogszabály által előírt eseteket kivéve – nem téríti vissza.",
        ],
      },
      {
        h: "7. Elállási jog",
        p: [
          "A fogyasztót távollévők között kötött szerződés esetén főszabály szerint 14 napos elállási jog illeti meg (az Európai Parlament és a Tanács 2011/83/EU irányelve, valamint a szlovák 108/2024 Z. z. törvény alapján).",
          "A szolgáltatás nem tárgyi adathordozón nyújtott digitális tartalom. A fizetés előtt a Felhasználó *kifejezetten kéri a teljesítés azonnali megkezdését*, és tudomásul veszi, hogy ezzel elveszíti az elállási jogát. Erre tekintettel a teljesítés (az eredmény megjelenítése) megkezdése után a Felhasználót elállási jog nem illeti meg. Az előfizetés ettől függetlenül bármikor lemondható a 6. pont szerint.",
          "Ha a teljesítés valamilyen okból nem kezdődött meg (például a fizetés után az eredmény nem jelent meg), a Felhasználó a szerződés megkötésétől számított 14 napon belül a(z) {email} címre küldött egyértelmű nyilatkozattal elállhat; ebben az esetben a Szolgáltató a teljes díjat legkésőbb 14 napon belül, az eredeti fizetési módra visszatéríti.",
        ],
      },
      {
        h: "8. Szavatosság és felelősség",
        p: [
          "A Szolgáltató szavatolja, hogy a digitális tartalom megfelel a leírásnak. Ha az eredmény nem jelenik meg vagy hibás, a Felhasználó a(z) {email} címen jelezheti; a Szolgáltató a hibát észszerű határidőn belül kijavítja, ennek hiányában a Felhasználó árleszállítást kérhet vagy a szerződést megszüntetheti (az (EU) 2019/770 irányelv szerint).",
          "Az eredmény becslés; a Szolgáltató nem felel az eredmény alapján hozott döntésekért. A Szolgáltató felelőssége – a szándékosan vagy súlyos gondatlansággal okozott károk, valamint az életet, testi épséget vagy egészséget megkárosító szerződésszegés kivételével – a Felhasználó által az adott szolgáltatásért kifizetett összegre korlátozódik.",
          "A Szolgáltató a weboldal folyamatos elérhetőségére törekszik, de a karbantartásból vagy harmadik fél (pl. tárhely- vagy fizetési szolgáltató) hibájából eredő átmeneti kiesésért nem felel.",
        ],
      },
      {
        h: "9. Panaszkezelés és jogorvoslat",
        p: [
          "Panaszodat a(z) {email} címre küldheted. A Szolgáltató a panaszt legkésőbb 30 napon belül megvizsgálja és írásban megválaszolja.",
          "Felügyeleti hatóság: Slovenská obchodná inšpekcia (Szlovák Kereskedelmi Felügyelet), Bajkalská 21/A, 827 99 Bratislava, www.soi.sk. A fogyasztói jogviták bírósági eljáráson kívüli rendezésére a Slovenská obchodná inšpekcia alternatív vitarendezési testületként is eljár.",
          "Más uniós tagállamban élő fogyasztók határon átnyúló vitában ingyenes segítséget kérhetnek a lakóhelyük szerinti Európai Fogyasztói Központtól (ECC-Net); Magyarországon: Európai Fogyasztói Központ Magyarország, www.magyarefk.hu.",
        ],
      },
      {
        h: "10. Szellemi tulajdon",
        p: [
          "A weboldal feladatai, szövegei, ábrái, grafikai elemei és forráskódja a Szolgáltató (illetve jogosultjai) szellemi tulajdonát képezik. Ezek másolása, terjesztése vagy üzleti célú felhasználása a Szolgáltató előzetes írásos engedélye nélkül tilos. A saját eredmény linkjének megosztása megengedett.",
        ],
      },
      {
        h: "11. Adatvédelem",
        p: ["A személyes adatok kezelését az [Adatkezelési tájékoztató](privacy) részletezi."],
      },
      {
        h: "12. Irányadó jog, a feltételek módosítása",
        p: [
          "A szerződésre a Szlovák Köztársaság joga irányadó. Ez nem fosztja meg a fogyasztót azoktól a védelmet nyújtó rendelkezésektől, amelyektől a szokásos tartózkodási helye szerinti jog alapján megállapodással nem lehet eltérni; a fogyasztó a lakóhelye szerinti bíróság előtt is eljárást indíthat.",
          "A Szolgáltató ezeket a feltételeket a jövőre nézve módosíthatja. A már megkötött szerződésekre a megkötéskor hatályos feltételek irányadók; előfizetés esetén a lényeges változásról a Szolgáltató legalább 30 nappal előre e-mailben értesít, és a Felhasználó díjmentesen lemondhatja az előfizetést.",
          "Ha e feltételek valamely rendelkezése érvénytelen, az a többi rendelkezés érvényességét nem érinti.",
        ],
      },
    ],
  },

  privacy: {
    title: "Adatkezelési tájékoztató",
    lead: "Ez a tájékoztató elmondja, milyen személyes adatokat kezelünk, amikor a(z) {site} weboldalt használod, milyen célból, meddig, és milyen jogaid vannak. Az adatkezelés az (EU) 2016/679 általános adatvédelmi rendelet (GDPR) szerint történik.",
    sections: [
      {
        h: "1. Az adatkezelő",
        p: [
          "{company}, {address}, {country} · Cégazonosító (IČO): {ico} · Nyilvántartás: {register}",
          "Kapcsolat adatvédelmi ügyekben: {email}",
        ],
      },
      {
        h: "2. Milyen adatokat, milyen célból kezelünk?",
        p: [
          "*A teszt kitöltése.* A válaszaidat, a megadott korcsoportot és a kitöltési időt a saját böngésződ tárolja (localStorage), hogy a tesztet folytatni tudd. Név, e-mail-cím vagy felhasználói fiók a kitöltéshez nem kell. Ezek az adatok csak akkor kerülnek hozzánk, amikor az eredményt feloldod.",
          "*Az eredmény feloldása és a fizetés.* Feloldáskor a válaszaid rövid, kódolt formában a fizetési tranzakció adataihoz kapcsolódnak, hogy a szerver ebből kiszámíthassa az eredményt. A fizetést a Stripe végzi: ő kéri be a kártyaadatokat (ezekhez mi nem férünk hozzá), valamint az e-mail-címedet a nyugtához és az előfizetés kezeléséhez. Tőle a fizetés állapotát, az e-mail-címedet, az országodat és egy ügyfél-azonosítót kapjuk meg. Jogalap: a szerződés teljesítése (GDPR 6. cikk (1) b)) és a számviteli kötelezettség teljesítése (6. cikk (1) c)).",
          "*Az előfizetés felismerése.* Előfizetés esetén a böngésződben egy aláírt, szükséges sütit (elm_sub) helyezünk el, amely a Stripe ügyfél-azonosítódat tartalmazza, hogy a böngésző felismerje az aktív előfizetést. Jogalap: a szerződés teljesítése.",
          "*Kapcsolattartás.* Ha e-mailt írsz nekünk, a nevedet, e-mail-címedet és az üzenetedet a megkeresés megválaszolásához kezeljük. Jogalap: jogos érdek, illetve a szerződés teljesítése.",
          "*Technikai naplók.* A weboldal kiszolgálása során a tárhelyszolgáltató a biztonság és a hibaelhárítás érdekében rövid ideig technikai adatokat (IP-cím, időpont, böngésző típusa) naplózhat. Jogalap: jogos érdek (GDPR 6. cikk (1) f)).",
          "Automatizált döntéshozatal vagy profilalkotás, amely rád nézve joghatással járna, nem történik. Az IQ-becslés kiszámítása tájékoztató jellegű, és semmilyen döntés alapjául nem szolgál.",
        ],
      },
      {
        h: "3. Sütik és helyi tárolás",
        p: [
          "Kizárólag a működéshez szükséges sütiket és helyi tárolást használunk; ezekhez nem kell hozzájárulás. Analitikai, reklám- vagy követő sütit nem használunk.",
          "- *lang* – a választott nyelv (1 év)",
          "- *elm_sub* – előfizetés felismerése, csak előfizetőknél (legfeljebb 400 nap vagy a törléséig)",
          "- *localStorage* – a teszt állapota, a már látott feladatok és a még fel nem oldott eredmény (a böngésződben, amíg nem törlöd)",
        ],
      },
      {
        h: "4. Kik kapják meg az adatokat?",
        p: [
          "- *Stripe Payments Europe, Ltd.* (1 Grand Canal Street Lower, Dublin 2, Írország) – fizetés, előfizetés és számlázás. A Stripe egyes adatokat az Egyesült Államokba is továbbíthat; ennek alapja az EU–USA adatvédelmi keretrendszer (Data Privacy Framework) és az Európai Bizottság által elfogadott általános adatvédelmi kikötések (standard szerződési feltételek).",
          "- *Tárhelyszolgáltató* – a weboldal üzemeltetése, adatfeldolgozóként.",
          "Adatot nem adunk el, és marketingcélra nem adunk át harmadik félnek. Hatóság részére csak jogszabályi kötelezettség alapján adunk ki adatot.",
        ],
      },
      {
        h: "5. Meddig őrizzük az adatokat?",
        p: [
          "- Fizetési és számviteli adatok: a szlovák számviteli törvény szerint 10 évig.",
          "- Előfizetői adatok: az előfizetés fennállásáig, utána a számviteli megőrzési időig.",
          "- Levelezés: az ügy lezárását követő legfeljebb 3 évig (az elévülési időn belüli igényérvényesítéshez).",
          "- Technikai naplók: legfeljebb 30 napig.",
        ],
      },
      {
        h: "6. A jogaid",
        p: [
          "Kérhetsz tájékoztatást a rólad kezelt adatokról, kérheted azok helyesbítését, törlését, kezelésük korlátozását, az adathordozhatóságot, és tiltakozhatsz a jogos érdeken alapuló adatkezelés ellen. Kérésedet a(z) {email} címre küldd; legkésőbb egy hónapon belül válaszolunk.",
          "Panaszt tehetsz a szlovák adatvédelmi hatóságnál (Úrad na ochranu osobných údajov Slovenskej republiky, Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk), vagy a lakóhelyed szerinti hatóságnál – Magyarországon: Nemzeti Adatvédelmi és Információszabadság Hatóság (1055 Budapest, Falk Miksa utca 9–11., www.naih.hu).",
        ],
      },
      {
        h: "7. Biztonság, kiskorúak",
        p: [
          "Az adatokat titkosított (HTTPS) kapcsolaton továbbítjuk; a helyes válaszok és a pontozás a szerveren maradnak, a sütiket kriptográfiai aláírással védjük. Fizetni csak nagykorú vagy törvényes képviselője hozzájárulásával eljáró felhasználó tud; 16 év alatti személy adatait tudatosan nem kezeljük a szülő hozzájárulása nélkül.",
          "Ezt a tájékoztatót a szolgáltatás változásakor frissíthetjük; a mindenkori változat ezen az oldalon érhető el.",
        ],
      },
    ],
  },
};

export default hu;
