import Link from "next/link";
import { Magnetic, Reveal } from "@/components/ui/motion";
import MatrixCell from "@/components/matrix/MatrixCell";
import { MATRICES } from "@/lib/matrix";
import { TOTAL } from "@/lib/questions";

export default function FinalCta() {
  const deco = [...MATRICES.nestedLatin.cells, ...MATRICES.tripleLatin.cells, ...MATRICES.sides.cells];
  return (
    <section className="relative px-5 pb-16 sm:px-8 sm:pb-24">
      <Reveal className="grain ring-gradient relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[radial-gradient(120%_120%_at_50%_0%,#2a2170_0%,#141029_45%,#0a0b14_100%)] px-6 py-20 text-center sm:px-12 sm:py-28">
        {/* Dekoratív cellarács a háttérben */}
        <div aria-hidden className="absolute inset-0 grid grid-cols-6 gap-3 p-3 opacity-[0.11] [mask-image:radial-gradient(ellipse_at_center,transparent_25%,black_75%)] sm:grid-cols-12">
          {Array.from({ length: 36 }, (_, i) => (
            <div key={i} className="aspect-square rounded-xl border border-white/20">
              <MatrixCell cell={deco[i % deco.length]} className="h-full w-full p-2" />
            </div>
          ))}
        </div>
        <div aria-hidden className="absolute -bottom-40 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-iris/40 blur-[120px]" />

        <div className="relative">
          <p className="eyebrow justify-center">Készen állsz?</p>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.3rem,6vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
            Tizenkét perc, és <span className="text-gradient">kiderül.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-haze">
            {TOTAL} feladat, időkorlát nélkül. Azonnali eredmény, regisztráció és e-mail-cím nélkül.
          </p>
          <div className="mt-10 flex justify-center">
            <Magnetic strength={0.3}>
              <Link href="/teszt" className="btn-primary px-9 py-5 text-lg">
                Kezdjük!
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                  <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
