import type { Metadata } from "next";
import Link from "next/link";
import ResultView from "@/components/result/ResultView";
import { decodeAnswers, decodeVariants, score } from "@/lib/scoring";

type SP = Record<string, string | string[] | undefined>;
const str = (v: SP[string]) => (typeof v === "string" ? v : undefined);

/** A linkből visszaállított teszt: változatok + válaszok. */
function parse(sp: SP) {
  const variants = decodeVariants(str(sp.k));
  const answers = variants ? decodeAnswers(str(sp.v), variants) : null;
  return variants && answers ? { variants, answers } : null;
}

export async function generateMetadata({ searchParams }: PageProps<"/eredmeny">): Promise<Metadata> {
  const sp = await searchParams;
  const t = parse(sp);
  if (!t) return { title: "Eredmény", robots: { index: false } };
  const r = score(t.answers, str(sp.a) ?? "", 0, t.variants);
  return {
    title: `IQ ${r.iq} – ${r.band.label}`,
    description: `IQ-becslés: ${r.iq} (${r.band.label}). ${r.correct}/${r.total} helyes válasz. Töltsd ki te is az ingyenes tesztet!`,
    robots: { index: false },
  };
}

export default async function ResultPage({ searchParams }: PageProps<"/eredmeny">) {
  const sp = await searchParams;
  const t = parse(sp);

  if (!t) {
    return (
      <section className="relative grid min-h-[80svh] place-items-center px-5 pt-28 text-center">
        <div>
          <p className="eyebrow justify-center">Eredmény</p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Ehhez a linkhez nem tartozik eredmény.</h1>
          <p className="mx-auto mt-5 max-w-md text-haze">Lehet, hogy a link megsérült másolás közben. Töltsd ki a tesztet – kb. 12 perc.</p>
          <Link href="/teszt" className="btn-primary mt-8">
            Teszt indítása
          </Link>
        </div>
      </section>
    );
  }

  const age = str(sp.a) ?? "";
  const secs = Math.max(0, Math.min(24 * 3600, Number(sp.t) || 0));
  return <ResultView result={score(t.answers, age, secs, t.variants)} />;
}
