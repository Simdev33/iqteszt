"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import MatrixBoard from "@/components/matrix/MatrixBoard";
import MatrixCell from "@/components/matrix/MatrixCell";
import OptionButton from "@/components/matrix/OptionButton";
import { Reveal, SplitLines } from "@/components/ui/motion";
import { DEMO } from "@/lib/demo-matrices";

export default function TryIt() {
  const [picked, setPicked] = useState<number | null>(null);
  const done = picked != null;
  const ok = picked === DEMO.answer;

  return (
    <section id="probafeladat" className="relative scroll-mt-20 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_40%,rgb(107_85_255/0.12),transparent)]" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow justify-center">Próbafeladat</p>
          </Reveal>
          <SplitLines
            className="mt-5 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.04] font-semibold tracking-[-0.04em]"
            lines={[<span key="l1">Melyik ábra illik</span>, <span key="l2">a kérdőjel helyére?</span>]}
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-haze">Egy könnyű bemelegítő – ilyen típusú feladatból 14 vár rád a tesztben.</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="panel ring-gradient mx-auto mt-14 grid max-w-5xl items-center gap-10 rounded-[2rem] p-5 sm:p-8 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:p-12">
          <div className="mx-auto w-full max-w-[400px]">
            <MatrixBoard
              cells={DEMO.cells}
              fill={done ? DEMO.options[picked] : null}
              state={done ? (ok ? "correct" : "wrong") : "idle"}
              animateIn={false}
            />
          </div>

          <div>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {DEMO.options.map((c, i) => (
                <OptionButton
                  key={i}
                  index={i}
                  layoutGroup="demo"
                  selected={picked === i}
                  disabled={done}
                  onSelect={() => setPicked(i)}
                  state={!done ? "idle" : i === DEMO.answer ? "correct" : i === picked ? "wrong" : "dim"}
                >
                  <MatrixCell cell={c} className="h-full w-full" />
                </OptionButton>
              ))}
            </div>

            <div className="mt-6 min-h-[9.5rem]">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="res"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className={`font-display text-xl font-semibold ${ok ? "text-aqua" : "text-flame"}`}>
                      {ok ? "Pontosan! Ez a jó válasz." : `Nem egészen – a helyes válasz a(z) ${String.fromCharCode(65 + DEMO.answer)}.`}
                    </p>
                    <p className="mt-2 leading-relaxed text-haze">{DEMO.explain}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link href="/teszt" className="btn-primary">
                        Jöhet a teljes teszt
                      </Link>
                      <button type="button" onClick={() => setPicked(null)} className="btn-ghost">
                        Újra
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-mist">
                    Figyeld meg, mi változik soronként és oszloponként – alakzat, méret, kitöltés –, majd válassz egyet a hat lehetőség közül.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
