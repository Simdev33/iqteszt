# TestMyAbilities – online IQ-teszt (testmyabilities.com)

Next.js 16 + Tailwind v4 + Motion. 90 kérdéses bank, kitöltésenként 30 kérdés; a részletes eredmény
díj ellenében (Stripe Checkout) oldható fel. Hat nyelven: magyar, angol, német, francia, olasz, spanyol.

## Fejlesztés

```bash
npm install
npm run dev   # http://localhost:3236
```

Stripe-kulcs nélkül fejlesztői módban **szimulált fizetés** fut (`/hu/fizetes/demo`), így a teljes
folyamat kipróbálható. Éles módban kulcs nélkül a fizetés le van tiltva.

## Nyelvek

- Minden oldal nyelvi előtaggal él, lokalizált címmel: `/hu/teszt`, `/en/test`, `/de/ergebnis`, `/fr/cgv` …
  A címek táblája: `lib/i18n/config.ts` → `ROUTES`. A mappák a magyar nevet viselik (`app/[lang]/teszt`),
  a `proxy.ts` írja át a lokalizált címet a mappára.
- Előtag nélküli címnél (`/`, régi `/teszt` linkek) a proxy a választott nyelvre (süti), különben a böngésző
  nyelvére irányít; nem támogatott nyelvnél angolra, nyelv nélkül magyarra.
- Szövegek:
  - `lib/i18n/dict/*.ts` – a felület (a `hu.ts` a forrás, a `Dict` típus ebből jön);
  - `lib/i18n/questions/*.ts` – a feladatok szövege (a szerkezet és a helyes válasz sorszáma a `lib/questions.ts`-ben, nyelvtől függetlenül);
  - `lib/i18n/legal/*.ts` – ÁSZF és adatkezelési tájékoztató.
- Ellenőrzés fordítás után: `node scripts/check-i18n.mjs` (kulcsok, helyőrzők, hivatkozások, opciók száma).
  A `lib/questions.ts` betöltéskor is ellenőrzi, hogy minden nyelv minden feladatot kitölt, és a helyes válasz
  helye egyezik.

## Fizetés (Stripe)

Egy csomag a kitöltés után: **7 napos teljes hozzáférés 3,90 €-ért** (azonnal terhelve), amely – ha az első
7 napban nem mondják le – a 8. naptól **9,90 €/hó** előfizetésként folytatódik. A hozzáférés ideje alatt korlátlan
teszt és eredmény jár. A fizetési adatokat a Stripe saját, hosztolt fizetési oldalán (Stripe Checkout) adják meg:
a fizetőfalon csak az ár, a tartalom, a kötelező nyilatkozat és a „Tovább a fizetéshez” gomb van, ami átirányít.

Az árak egy helyen: `lib/pricing.ts`.

### Beüzemelés

1. Környezeti változók (tárhelyen, pl. Vercel → Environment Variables; helyben `.env.local`):
   - `STRIPE_SECRET_KEY` – `sk_test_…` teszteléshez, `sk_live_…` élesben
   - `SITE_URL` – az oldal nyilvános címe (pl. `https://testmyabilities.com`), ide irányít vissza a Stripe
   - `RESULT_SECRET` – hosszú, véletlen szöveg; ezzel írjuk alá az előfizetői sütit és az eredménylinkeket.
     Ha üres, a Stripe-kulcsból származtatjuk – ekkor kulcscserénél a régi előfizetői linkek érvénytelenné válnak.
   - `RESEND_API_KEY` és `EMAIL_FROM` (pl. `TestMyAbilities <no-reply@testmyabilities.com>`) – a belépési kód
     e-mailhez. A feladó domainjét a Resendben igazolni kell (DNS-rekordok).
2. Stripe Dashboard, élesítés előtt:
   - *Settings → Public details*: a cégnév / megjelenített név (ez látszik a fizetési oldalon és a számlákon).
   - *Settings → Branding*: a fizetési oldal logója és színei (hogy illeszkedjen az oldalhoz).
   - *Settings → Billing → Subscriptions and emails*: nyugták és a **próbaidő lejárta előtti emlékeztető e-mail** bekapcsolása.
   - *Settings → Emails*: sikeres fizetésről szóló nyugta e-mail.
3. Az ügyfélportált (lemondás, kártyacsere, számlák, e-mailes belépés) a kód magától létrehozza / frissíti
   (`metadata.app = testmyabilities`), külön beállítás nem kell.

### Hogyan működik

- A böngésző csak a kérdéseket kapja meg (`publicSlots()`); a helyes válaszok, a magyarázatok és a
  pontozás a szerveren maradnak (`lib/questions.ts`, `lib/matrix.ts`, `lib/scoring.ts` – `server-only`).
- A „Tovább a fizetéshez” gombra (a nyilatkozat elfogadása után) a `/api/checkout` Checkout Session-t nyit a Stripe
  hosztolt fizetési oldalához (előfizetés, 7 nap próbaidő + 3,90 €-s első tétel, az oldal nyelvén), és a böngésző
  a válaszban kapott `url`-re lép. A válaszok kódja a munkamenet metaadataiban utazik, adatbázis nem kell. Az
  e-mail-címet a Stripe kéri be. Megszakításkor a Stripe a tesztre hoz vissza (`?canceled=1`): a ki nem fizetett
  kitöltés a böngészőben (localStorage) vár, és újra a fizetőfal jelenik meg.
- A Stripe-fiók más alkalmazásokkal közös lehet: minden saját objektum `metadata.app = testmyabilities`, és a hozzáférés
  csak a saját előfizetést számolja.
- Fizetés után a Stripe a `/api/stripe/return`-re irányít (success_url), ami aláírt, httpOnly sütit (`elm_sub`) tesz a
  böngészőbe a Stripe ügyfél-azonosítóval, majd a köszönőoldalra (`/thank-you`) visz, ahonnan az eredmény nyílik.
- Az eredményoldal (`/{lang}/…?session_id=…`) a Stripe-tól kérdezi le, hogy a munkamenet ki van-e fizetve,
  és csak akkor számolja ki és mutatja meg az eredményt.
- Aktív előfizetőnek a fizetőfal „Eredmény megnyitása” gombot mutat: a szerver a Stripe-tól ellenőrzi az
  előfizetést, és aláírt eredménylinket ad (`?r=…`).
- Lemondás: az „Előfizetés kezelése” oldal (`/hu/elofizetes`) → Stripe ügyfélportál.
- Más eszközön: kódos belépés (a DoneSignIn mintájára) – e-mail → 6 jegyű kód Resenddel (`/api/auth/request`,
  `/api/auth/verify`). Csak élő előfizetéssel lehet belépni; a kód lenyomata, lejárata (10 perc) és a próbálkozások
  száma (max. 5) a Stripe-ügyfél metaadataiban van, így ehhez sem kell adatbázis. Siker után ugyanaz az előfizetői
  süti kerül a böngészőbe, mint fizetés után. A fizetőfalon a „Már előfizető vagy? Lépj be” link vezet ide.
  Kijelentkezés: `/api/auth/logout`.
