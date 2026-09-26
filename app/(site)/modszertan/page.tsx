import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/motion";
import { PRICE_LABEL, DIFFICULTY_COUNTS, DOMAINS, DOMAIN_COUNTS, DOMAIN_POOL_COUNTS, POOL_SIZE, TOTAL, VARIANTS_PER_SLOT, type Domain } from "@/lib/meta";
import { AGE_GROUPS, IQ_MAX, IQ_MIN, NORM, WEIGHT } from "@/lib/norms";

export const metadata: Metadata = {
  title: "Módszertan – így számoljuk az IQ-t",
  description: "A feladatok felépítése, a nehézségi súlyozás, a korcsoportos korrekció és az IQ-skálára vetítés képlete – és az online teszt korlátai.",
};

const byDiff = (d: 1 | 2 | 3) => DIFFICULTY_COUNTS[d] ?? 0;

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-6 border-t border-white/[0.07] py-12 md:grid-cols-[14rem_1fr] md:gap-12 md:py-16">
      <div>
        <span className="font-mono text-xs text-iris">{n}</span>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="space-y-5 text-[1.02rem] leading-relaxed text-haze">{children}</div>
    </Reveal>
  );
}

export default function MethodPage() {
  const pct = (x: number) => String(x).replace(".", ",");
  return (
    <>
      <PageHeader
        eyebrow="Módszertan"
        title={[<span key="1">Így lesz a válaszaidból</span>, <span key="2" className="text-gradient">egy szám.</span>]}
        lead="Átlátható, ellenőrizhető számítás – és őszinte szavak arról, mire jó egy online IQ-teszt, és mire nem."
      />

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Block n="01" title="A feladatok">
            <p>
              A feladatbank {POOL_SIZE} saját fejlesztésű feladatból áll, ebből minden kitöltésnél {TOTAL} kerül elő. A teszt {TOTAL}{" "}
              helyének mindegyikére {VARIANTS_PER_SLOT} változat készült, amelyek azonos területről és azonos nehézségűek – így minden
              összeállítás ugyanolyan szerkezetű, és az eredmények összehasonlíthatók.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {(Object.keys(DOMAINS) as Domain[]).map((d) => (
                <div key={d} className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                  <span className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: DOMAINS[d].color }} />
                    {DOMAINS[d].name}
                  </span>
                  <span className="font-mono text-sm text-mist">
                    {DOMAIN_COUNTS[d]} / {DOMAIN_POOL_COUNTS[d]}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-mist">A számpár: tesztenként ennyi feladat / ennyi van a bankban.</p>
            <p>
              A mátrixfeladatok (Raven-típusú, 3×3-as ábrarácsok) a fluid intelligencia legtisztább mérői, ezért ezek adják a feladatok
              közel felét. A nehézség nagyjából növekszik: {byDiff(1)} könnyű, {byDiff(2)} közepes és {byDiff(3)} nehéz feladat jut egy
              tesztre, a területek pedig váltakoznak.
            </p>
            <p>
              A böngésző megjegyzi, mely feladatokat láttad már, és a következő kitöltésnél a még nem látottakat részesíti előnyben – így
              három egymás utáni kitöltésnél egyetlen feladat sem ismétlődik.
            </p>
          </Block>

          <Block n="02" title="Pontozás">
            <p>Minden helyes válasz a nehézségével súlyozott pontot ér; a kihagyott és a rossz válasz 0 pont.</p>
            <div className="flex flex-wrap gap-2">
              {([1, 2, 3] as const).map((d) => (
                <span key={d} className="chip">
                  {d === 1 ? "Könnyű" : d === 2 ? "Közepes" : "Nehéz"} = <span className="font-mono text-paper">{pct(WEIGHT[d])}</span> pont
                </span>
              ))}
            </div>
            <p>A súlyozott pontszámot elosztjuk az elérhető maximummal (így 0 és 1 közötti értéket kapunk), majd a szokásos IQ-skálára vetítjük:</p>
            <pre className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-ink-950 p-5 font-mono text-sm leading-7 text-paper">
              {`s  = súlyozott pont / maximum
z  = (s − (${pct(NORM.mean)} + korrekció)) / ${pct(NORM.sd)}
IQ = 100 + 15 · z        (${IQ_MIN} és ${IQ_MAX} közé szorítva)`}
            </pre>
            <p>
              A {pct(NORM.mean)}-es átlag és a {pct(NORM.sd)}-es szórás a feladatsor becsült népességi eloszlása. A percentilis a normáleloszlás
              eloszlásfüggvényéből adódik: az IQ 115 például kb. a 84. percentilis.
            </p>
          </Block>

          <Block n="03" title="Korcsoportos korrekció">
            <p>
              A fluid gondolkodás teljesítménye a húszas évek közepén tetőzik, utána lassan csökken. Ezért az idősebb és a 16 év alatti
              kitöltők eredményét kissé alacsonyabb elvárt átlaghoz mérjük.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {AGE_GROUPS.map((a) => (
                <div key={a.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                  <p className="text-sm">{a.label}</p>
                  <p className="mt-1 font-mono text-sm text-mist">{a.shift === 0 ? "±0" : pct(a.shift)}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block n="04" title="Korlátok">
            <ul className="space-y-3">
              {[
                "Egy 30 feladatos online teszt mérési hibája jóval nagyobb, mint egy pszichológus által felvett, 1–2 órás vizsgálaté. Az eredményt ±8–10 pontos sávként érdemes értelmezni.",
                "A norma becsült, nem reprezentatív mintán felvett – a pontos számérték tehát tájékoztató jellegű.",
                "Az ismételt kitöltés a tanulási hatás miatt felfelé torzít.",
                "Az eredmény nem diagnózis, és nem alkalmas oktatási, munkaügyi vagy orvosi döntések megalapozására.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flame" />
                  {t}
                </li>
              ))}
            </ul>
          </Block>

          <Block n="05" title="Fizetés és adatvédelem">
            <p>
              A kitöltés ingyenes; a részletes eredmény egyszeri {PRICE_LABEL}. A pontozás a szerveren történik, a helyes válaszok nem kerülnek
              a böngésződbe. Fizetéskor a válaszaid rövid, kódolt formában a Stripe fizetési tranzakciójához kapcsolódnak, és az
              eredményoldal ebből számolja ki az eredményt – külön adatbázisban nem tároljuk őket.
            </p>
            <p>
              A félbehagyott teszt állapotát csak a saját böngésződ őrzi, hogy folytatni tudd. Nevet vagy felhasználói fiókot nem kérünk; a
              kártyaadatokat a Stripe kezeli, azokat mi nem látjuk.
            </p>
            <Link href="/teszt" className="btn-primary">
              Teszt indítása
            </Link>
          </Block>
        </div>
      </section>
    </>
  );
}
