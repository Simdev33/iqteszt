import { isActive, memberCustomer, subscriptionOf } from "@/lib/payment";

/** Van-e ebben a böngészőben aktív előfizetés (a fizetési képernyő ennek alapján kínál ingyenes megnyitást). */
export async function GET() {
  const customer = await memberCustomer();
  const sub = customer ? await subscriptionOf(customer).catch(() => null) : null;
  return Response.json({ active: isActive(sub) }, { headers: { "Cache-Control": "no-store" } });
}
