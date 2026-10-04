import type { RouteKey } from "./i18n/config";

export const brand = {
  name: "TestMyAbilities",
  domain: "testmyabilities.com",
  url: "https://testmyabilities.com",
  email: "help@testmyabilities.com",
};

/** Az üzemeltető cég adatai (Szlovák Cégjegyzék / finstat.sk) – az ÁSZF, az adatkezelési tájékoztató és a lábléc használja. */
export const company = {
  name: "TourCierge s. r. o.",
  address: "Karpatské námestie 10A, 831 06 Bratislava – Rača",
  country: { hu: "Szlovákia", en: "Slovakia", de: "Slowakei", fr: "Slovaquie", it: "Slovacchia", es: "Eslovaquia" },
  ico: "57383898",
  dic: "2122693199",
  register: "Obchodný register Mestského súdu Bratislava III, oddiel: Sro, vložka č. 194953/B",
  capital: "5 000 €",
};

/**
 * Google-címkék (Ads-konverziómérés, Analytics) — csak a süti-sávban adott hozzájárulás után töltődnek be.
 * A `googleAdsPurchase` a „Purchase” konverzió címkéje: a köszönőoldal küldi, fizetésenként egyszer.
 */
export const tracking = {
  googleAdsId: "AW-18493960626",
  googleAnalyticsId: "G-DMCPT8X95H",
  googleAdsPurchase: "AW-18493960626/6mCKCPeE6pAdELLjzfJE",
};

/** A fő navigáció: oldal + opcionális horgony; a feliratok a szótárban (t.nav). */
export const nav: { key: "test" | "scale" | "method" | "faq"; route: RouteKey; hash?: string }[] = [
  { key: "test", route: "home", hash: "teruletek" },
  { key: "scale", route: "scale" },
  { key: "method", route: "method" },
  { key: "faq", route: "home", hash: "gyik" },
];
