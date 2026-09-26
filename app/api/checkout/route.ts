import { decodeVariants } from "@/lib/codec";
import { AGE_GROUPS } from "@/lib/norms";
import { createCheckout, demoToken, paymentMode, type TestPayload } from "@/lib/payment";
import { decodeAnswers } from "@/lib/scoring";

/** A kitöltés ellenőrzése: csak érvényes összeállítás és válaszkód mehet a fizetéshez. */
function validate(body: unknown): TestPayload | null {
  if (!body || typeof body !== "object") return null;
  const { k, v, a, t } = body as Record<string, unknown>;
  if (typeof k !== "string" || typeof v !== "string") return null;
  const variants = decodeVariants(k);
  if (!variants || !decodeAnswers(v, variants)) return null;
  const age = typeof a === "string" && AGE_GROUPS.some((g) => g.id === a) ? a : "";
  const secs = Math.max(0, Math.min(24 * 3600, Math.round(Number(t) || 0)));
  return { k, v, a: age, t: String(secs) };
}

export async function POST(request: Request) {
  const payload = validate(await request.json().catch(() => null));
  if (!payload) return Response.json({ error: "Érvénytelen kitöltés." }, { status: 400 });

  const origin = process.env.SITE_URL?.replace(/\/$/, "") || new URL(request.url).origin;
  const mode = paymentMode();

  if (mode === "stripe") {
    try {
      return Response.json({ url: await createCheckout(payload, origin) });
    } catch (e) {
      console.error("Stripe Checkout hiba:", e);
      return Response.json({ error: "A fizetési oldal most nem érhető el. Próbáld újra egy perc múlva." }, { status: 502 });
    }
  }
  if (mode === "demo") {
    return Response.json({ url: `/fizetes/demo?d=${encodeURIComponent(demoToken(payload, "pending"))}` });
  }
  return Response.json({ error: "A fizetés még nincs beállítva ezen az oldalon." }, { status: 503 });
}
