import { decodeVariants } from "@/lib/codec";
import { isLocale, path, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/server";
import { AGE_GROUPS } from "@/lib/norms";
import { createCheckout, isActive, memberCustomer, paymentMode, resultToken, siteOrigin, subscriptionOf, type TestPayload } from "@/lib/payment";
import type { Plan } from "@/lib/pricing";
import { decodeAnswers } from "@/lib/scoring";

/** A kitöltés ellenőrzése: csak érvényes összeállítás és válaszkód mehet a fizetéshez. */
function validate(body: Record<string, unknown>): TestPayload | null {
  const { k, v, a, t } = body;
  if (typeof k !== "string" || typeof v !== "string") return null;
  const variants = decodeVariants(k);
  if (!variants || !decodeAnswers(v, variants)) return null;
  const age = typeof a === "string" && AGE_GROUPS.some((g) => g.id === a) ? a : "";
  const secs = Math.max(0, Math.min(24 * 3600, Math.round(Number(t) || 0)));
  return { k, v, a: age, t: String(secs) };
}

/**
 * A kész teszt feloldása. plan: „sub” (próbaidős előfizetés), „one” (egyszeri díj) vagy
 * „member” (aktív előfizető – fizetés nélkül, aláírt eredménylinkkel).
 */
export async function POST(request: Request) {
  const raw = ((await request.json().catch(() => null)) ?? {}) as Record<string, unknown>;
  const lang: Locale = typeof raw.lang === "string" && isLocale(raw.lang) ? raw.lang : "hu";
  const t = getDict(lang);
  const payload = validate(raw);
  const plan = raw.plan as Plan | "member";
  if (!payload || !["sub", "one", "member"].includes(plan)) return Response.json({ error: t.api.invalid }, { status: 400 });

  const mode = paymentMode();
  const customer = await memberCustomer();

  if (plan === "member") {
    const sub = customer ? await subscriptionOf(customer).catch(() => null) : null;
    if (!isActive(sub)) return Response.json({ error: t.api.notMember }, { status: 403 });
    return Response.json({ url: path(lang, "result", { r: resultToken(payload, "member") }) });
  }

  if (mode === "stripe") {
    try {
      return Response.json({ url: await createCheckout(payload, plan, lang, t, siteOrigin(request), customer) });
    } catch (e) {
      console.error("Stripe Checkout hiba:", e);
      return Response.json({ error: t.api.unavailable }, { status: 502 });
    }
  }
  if (mode === "demo") {
    return Response.json({ url: path(lang, "demoPay", { d: resultToken(payload, "pending", plan) }) });
  }
  return Response.json({ error: t.api.notConfigured }, { status: 503 });
}
