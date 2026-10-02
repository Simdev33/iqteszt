import "server-only";
import { fmt, type Locale } from "./i18n/config";
import { getDict } from "./i18n/server";
import { brand } from "./site";

// Tranzakciós e-mail (belépési kód) a Resend HTTP API-ján. API-kulcs nélkül fejlesztés közben
// a kód a szervernaplóba kerül; éles módban kulcs nélkül hiba.

export class EmailError extends Error {}

const escape = (text: string) => text.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function sendLoginCode(to: string, code: string, lang: Locale, minutes: number) {
  const t = getDict(lang).email;
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    if (process.env.NODE_ENV === "production") throw new EmailError("RESEND_API_KEY nincs beállítva");
    console.info(`[belépés] kód ${to} címre: ${code} (RESEND_API_KEY nélkül csak a naplóba kerül)`);
    return;
  }

  const lines = [fmt(t.intro, { site: brand.name }), code, fmt(t.validity, { minutes }), t.ignore];
  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;line-height:1.6;color:#13172d;max-width:480px">
<p style="font-weight:700;font-size:17px;margin:0 0 16px">${escape(brand.name)}</p>
<p>${escape(lines[0])}</p>
<p style="font-size:34px;font-weight:700;letter-spacing:8px;margin:24px 0;color:#4a36e8">${code}</p>
<p>${escape(lines[2])}</p>
<p style="color:#6f7384;font-size:13px">${escape(lines[3])}</p>
</div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM?.trim() || `${brand.name} <no-reply@${brand.domain}>`,
      to: [to],
      subject: fmt(t.subject, { code, site: brand.name }),
      text: lines.join("\n\n"),
      html,
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    console.error("[e-mail] Resend", res.status, await res.text().catch(() => ""));
    throw new EmailError("Az e-mail küldése nem sikerült.");
  }
}
