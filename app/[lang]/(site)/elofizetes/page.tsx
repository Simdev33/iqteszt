import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Rich from "@/components/i18n/Rich";
import { LOCALE_TAGS, fmt, type Locale } from "@/lib/i18n/config";
import { getDict, langOf } from "@/lib/i18n/server";
import { memberCustomer, paymentMode, portalLoginUrl, requestOrigin, subscriptionOf, type SubInfo } from "@/lib/payment";
import { money, prices } from "@/lib/pricing";
import { brand } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/elofizetes">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: getDict(lang).meta.subscriptionTitle, robots: { index: false } };
}

const date = (lang: Locale, sec: number | null) =>
  sec ? new Intl.DateTimeFormat(LOCALE_TAGS[lang], { year: "numeric", month: "long", day: "numeric" }).format(new Date(sec * 1000)) : "–";

/** Az előfizetés állapota egy mondatban. */
function statusText(lang: Locale, s: SubInfo | null) {
  const t = getDict(lang).subscriptionPage;
  if (!s || !["trialing", "active", "past_due"].includes(s.status)) return { text: t.none, tone: "bg-white/30" };
  const end = date(lang, s.status === "trialing" ? (s.trialEnd ?? s.periodEnd) : s.periodEnd);
  if (s.canceling) return { text: fmt(t.canceling, { date: end }), tone: "bg-sun" };
  if (s.status === "past_due") return { text: t.pastDue, tone: "bg-flame" };
  if (s.status === "trialing") return { text: fmt(t.trialing, { date: end, monthly: prices(lang).monthly }), tone: "bg-aqua" };
  const amount = s.amount != null ? money(lang, s.amount / 100, "EUR") : prices(lang).monthly;
  return { text: fmt(t.active, { date: end, amount }), tone: "bg-aqua" };
}

export default async function SubscriptionPage({ params, searchParams }: PageProps<"/[lang]/elofizetes">) {
  const lang = await langOf(params);
  const t = getDict(lang).subscriptionPage;
  const sp = await searchParams;
  const mode = paymentMode();
  const customer = await memberCustomer();
  const sub = customer ? await subscriptionOf(customer).catch(() => null) : null;
  const status = statusText(lang, sub);
  const loginUrl = await portalLoginUrl(await requestOrigin());
  const canManage = !!customer && customer !== "demo" && mode === "stripe" && !!sub;
  const mail = `[${brand.email}](mail)`;
  const links = { mail: `mailto:${brand.email}` };

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title.map((l, i) => <Rich key={i} text={l} />)} lead={t.lead} />
      <section className="pb-24">
        <div className="mx-auto grid max-w-3xl gap-4 px-5 sm:px-8">
          {sp.error === "1" && (
            <p className="rounded-2xl border border-flame/40 bg-flame/10 px-4 py-3 text-sm text-paper">
              <Rich text={fmt(t.portalError, { email: mail })} links={links} />
            </p>
          )}
          {mode === "demo" && <p className="rounded-2xl border border-sun/30 bg-sun/10 px-4 py-3 text-sm text-paper">{t.demoNote}</p>}

          <div className="panel ring-gradient rounded-[2rem] p-6 sm:p-8">
            <p className="eyebrow">{t.status}</p>
            <p className="mt-4 flex gap-3 text-lg leading-relaxed">
              <span className={`mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full ${status.tone}`} aria-hidden />
              <span>{status.text}</span>
            </p>
            {canManage && (
              <form action="/api/portal" method="post" className="mt-7">
                <input type="hidden" name="lang" value={lang} />
                <button type="submit" className="btn-primary w-full text-base sm:w-auto">
                  {t.manage}
                </button>
                <p className="mt-3 text-sm leading-relaxed text-mist">{t.manageHint}</p>
              </form>
            )}
          </div>

          <div className="panel rounded-[2rem] p-6 sm:p-8">
            <p className="leading-relaxed text-haze">{t.noDevice}</p>
            {loginUrl && (
              <a href={loginUrl} className="btn-ghost mt-5 w-full sm:w-auto" rel="noopener">
                {t.portalLogin}
              </a>
            )}
            <p className="mt-6 text-sm text-mist">
              <Rich text={fmt(t.help, { email: mail })} links={links} />
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
