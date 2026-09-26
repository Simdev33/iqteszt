# Elmeszint – online IQ-teszt

Next.js 16 + Tailwind v4 + Motion. 90 kérdéses bank, kitöltésenként 30 kérdés; a részletes eredmény
egyszeri díjért (Stripe Checkout) oldható fel.

## Fejlesztés

```bash
npm install
npm run dev   # http://localhost:3236
```

Stripe-kulcs nélkül fejlesztői módban **szimulált fizetés** fut (`/fizetes/demo`), így a teljes
folyamat kipróbálható. Éles módban kulcs nélkül a fizetés le van tiltva.

## Fizetés beüzemelése (Stripe)

1. Stripe-fiók → *Developers → API keys* → a **Secret key** (`sk_test_…` teszteléshez, `sk_live_…` élesben).
2. Környezeti változók (a tárhelyen, pl. Vercel → Settings → Environment Variables, vagy helyben `.env.local`):
   - `STRIPE_SECRET_KEY` – a titkos kulcs
   - `SITE_URL` – az oldal nyilvános címe, ide irányít vissza a Stripe (pl. `https://elmeszint.hu`)
3. Tesztkulccsal próbáld ki egy Stripe tesztkártyával, és ellenőrizd, hogy a fizetési oldalon **1 990 Ft** jelenik meg.

Az ár a `lib/meta.ts` → `PRICE_HUF` értékében módosítható.

## Hogyan működik

- A böngésző csak a kérdéseket kapja meg (`publicSlots()`); a helyes válaszok, a magyarázatok és a
  pontozás a szerveren maradnak (`lib/questions.ts`, `lib/matrix.ts`, `lib/scoring.ts` – `server-only`).
- A kitöltés végén a `/api/checkout` Stripe Checkout munkamenetet nyit; a válaszok kódja a munkamenet
  metaadataiban utazik. Adatbázis nem kell.
- Az `/eredmeny?session_id=…` oldal a Stripe-tól lekérdezi, hogy a munkamenet ki van-e fizetve, és csak
  akkor számolja ki és mutatja meg az eredményt.
