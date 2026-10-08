import { isActive, memberCustomer, paymentMode, subscriptionOf } from "@/lib/payment";

/**
 * Van-e ebben a böngészőben aktív előfizetés (a fizetési képernyő ennek alapján kínál ingyenes megnyitást), és
 * működik-e a kódos belépés (csak valódi Stripe-előfizetéssel – fejlesztői szimulációban nem).
 */
export async function GET() {
  const customer = await memberCustomer();
  const sub = customer ? await subscriptionOf(customer).catch(() => null) : null;
  return Response.json({ active: isActive(sub), login: paymentMode() === "stripe" }, { headers: { "Cache-Control": "no-store" } });
}
