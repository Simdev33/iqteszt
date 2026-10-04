"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CONSENT_EVENT, readConsent, type Consent } from "@/lib/consent";
import { tracking } from "@/lib/site";
import { GTAG_READY_EVENT } from "@/lib/thank-you";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const ADS_ID = tracking.googleAdsId;
const GA_ID = tracking.googleAnalyticsId;
const ENABLED = Boolean(ADS_ID || GA_ID);
const GRANTED = { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" };
const DENIED = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" };

/**
 * Google-címke (gtag.js: Ads + Analytics) Consent Mode v2-vel, „alap” módban, a DoneSignIn mintájára: csak az
 * „Elfogadom” után töltődik be, előtte semmi nem megy a Google-hoz; visszavonáskor a hozzájárulás „denied”-re vált.
 * Kliensoldali oldalváltáskor page_view-t küldünk az Adsnek; az Analytics ezt magától méri (a böngésző-előzmények
 * változásából), oda nem küldjük, hogy ne duplázzon. Amíg a lib/site.ts-ben nincs azonosító, semmit nem csinál.
 */
export default function GoogleTag() {
  const pathname = usePathname();
  const [granted, setGranted] = useState(false);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!ENABLED) return;
    // A süti csak a böngészőben olvasható.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGranted(readConsent() === "granted");
    const onChange = (event: Event) => {
      const value = (event as CustomEvent<Consent>).detail;
      window.gtag?.("consent", "update", value === "granted" ? GRANTED : DENIED);
      if (value === "granted") setGranted(true);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  // Az első oldalmegtekintést a `config` küldi; a későbbi (kliensoldali) váltásokat mi.
  useEffect(() => {
    if (!granted) return;
    if (ADS_ID && lastPath.current !== null && lastPath.current !== pathname) {
      window.gtag?.("event", "page_view", { send_to: ADS_ID, page_location: window.location.href, page_path: pathname });
    }
    lastPath.current = pathname;
  }, [granted, pathname]);

  if (!ENABLED || !granted) return null;
  const configs = [ADS_ID, GA_ID]
    .filter(Boolean)
    .map((id) => `gtag('config', ${JSON.stringify(id)});`)
    .join("\n");
  return (
    <>
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', ${JSON.stringify(DENIED)});
gtag('consent', 'update', ${JSON.stringify(GRANTED)});
gtag('js', new Date());
${configs}
window.dispatchEvent(new Event(${JSON.stringify(GTAG_READY_EVENT)}));`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ADS_ID || GA_ID)}`} strategy="afterInteractive" />
    </>
  );
}
