import { NextResponse } from "next/server";
import { isLocale, path, type Locale } from "@/lib/i18n/config";
import { memberCustomer, paymentMode, portalUrl, siteOrigin } from "@/lib/payment";

/** Átirányítás a Stripe ügyfélportáljára (lemondás, kártyacsere, számlák) – az előfizetés-kezelő oldal űrlapjáról. */
export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const l = form?.get("lang");
  const lang: Locale = typeof l === "string" && isLocale(l) ? l : "hu";
  const back = new URL(path(lang, "subscription", { error: "1" }), siteOrigin(request));

  const customer = await memberCustomer();
  if (!customer || customer === "demo" || paymentMode() !== "stripe") return NextResponse.redirect(back, 303);
  try {
    return NextResponse.redirect(await portalUrl(customer, lang, siteOrigin(request)), 303);
  } catch (e) {
    console.error("Stripe ügyfélportál hiba:", e);
    return NextResponse.redirect(back, 303);
  }
}
