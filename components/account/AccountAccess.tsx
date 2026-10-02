"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import LoginForm from "./LoginForm";

/**
 * Az „Előfizetés kezelése” oldal belépési része: belépés nélkül a kódos belépés (más eszközön vett
 * előfizetéshez), belépve a kijelentkezés. Siker után az oldal frissül, és megjelenik az előfizetés állapota.
 */
export default function AccountAccess({ signedIn, intro }: { signedIn: boolean; intro: string }) {
  const { t } = useI18n();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (signedIn) {
    const logout = async () => {
      setBusy(true);
      await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
      router.refresh();
      setBusy(false);
    };
    return (
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-2.5 text-haze">
          <span className="h-2.5 w-2.5 rounded-full bg-aqua" aria-hidden />
          {t.auth.signedIn}
        </p>
        <button type="button" onClick={logout} disabled={busy} className="btn-ghost !py-2.5 text-sm">
          {t.auth.logout}
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="font-display text-xl font-semibold tracking-tight">{t.auth.title}</p>
      <p className="mt-2 leading-relaxed text-haze">{intro}</p>
      <LoginForm className="mt-5 max-w-md" showIntro={false} onSuccess={() => router.refresh()} />
    </div>
  );
}
