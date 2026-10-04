// Köszönőoldal sikeres fizetés után – a Google Ads ennek a címnek a betöltését méri konverzióként, ezért
// minden nyelven ugyanaz, nyelvi előtag nélkül: a proxy a nyelvi sütiből (vagy a böngésző nyelvéből) szolgálja ki
// az app/[lang]/(site)/thank-you oldalt. Böngészőben és szerveren is használható.

import { PRICING } from "./pricing";
import { tracking } from "./site";

export const THANK_YOU = "/thank-you";

/**
 * Az eredmény címe, amelyre a fizetés után küldtük volna a látogatót. A /thank-you címbe nem kerülhet (annak
 * pontosan így kell maradnia), ezért a fül sessionStorage-ában utazik a köszönőoldal gombjához.
 */
export const RESULT_URL_KEY = "elmeszint:result-url";

/** A GoogleTag ezt jelzi, amikor a gtag felállt (a hozzájárulás után). */
export const GTAG_READY_EVENT = "tma:gtag-ready";

/**
 * A „Purchase” konverzió a Google Adsnek – csak böngészőben, és csak ha a gtag be van töltve (vagyis a látogató
 * hozzájárult). A fizetés azonosítója a transaction_id, és a fülben egyszer küldjük el, így újratöltéskor
 * sem duplázódik. Ha a gtag még nem állt fel (pl. épp a köszönőoldalon fogadja el a sütiket), megvárjuk.
 */
export function reportPurchase(transactionId: string) {
  const label = tracking.googleAdsPurchase;
  if (!label || !transactionId) return;
  const sentKey = `tma:conversion:${transactionId}`;
  const send = () => {
    try {
      if (sessionStorage.getItem(sentKey)) return;
      sessionStorage.setItem(sentKey, "1");
    } catch {
      // Tiltott tárolónál is elküldjük; legfeljebb újratöltéskor ismétlődik (a transaction_id-t a Google kiszűri).
    }
    window.gtag?.("event", "conversion", {
      send_to: label,
      value: PRICING.trialEur,
      currency: "EUR",
      transaction_id: transactionId,
    });
  };
  if (window.gtag) send();
  else window.addEventListener(GTAG_READY_EVENT, send, { once: true });
}
