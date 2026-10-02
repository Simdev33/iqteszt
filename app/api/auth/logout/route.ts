import { logout } from "@/lib/login";

export const dynamic = "force-dynamic";

/** Kijelentkezés ezen az eszközön (az előfizetői süti törlése). */
export async function POST() {
  await logout();
  return Response.json({ signedOut: true });
}
