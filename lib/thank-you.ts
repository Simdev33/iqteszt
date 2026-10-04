// Köszönőoldal sikeres fizetés után – a Google Ads ennek a címnek a betöltését méri konverzióként, ezért
// minden nyelven ugyanaz, nyelvi előtag nélkül: a proxy a nyelvi sütiből (vagy a böngésző nyelvéből) szolgálja ki
// az app/[lang]/(site)/thank-you oldalt. Böngészőben és szerveren is használható.

export const THANK_YOU = "/thank-you";

/**
 * Az eredmény címe, amelyre a fizetés után küldtük volna a látogatót. A /thank-you címbe nem kerülhet (annak
 * pontosan így kell maradnia), ezért a fül sessionStorage-ában utazik a köszönőoldal gombjához.
 */
export const RESULT_URL_KEY = "elmeszint:result-url";
