"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Cell, Guide } from "@/lib/shapes";
import MatrixCell from "./MatrixCell";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * 3×3-as mátrix: 8 megadott cella + a kilencedik, ami vagy kérdőjel, vagy a (kiválasztott) válasz.
 */
export default function MatrixBoard({
  cells,
  guide,
  fill,
  state = "idle",
  animateIn = true,
  className = "",
  compact = false,
}: {
  cells: Cell[];
  guide?: Guide;
  fill?: Cell | null;
  state?: "idle" | "correct" | "wrong";
  animateIn?: boolean;
  className?: string;
  compact?: boolean;
}) {
  const gap = compact ? "gap-1.5 p-1.5 rounded-2xl" : "gap-2 p-2 sm:gap-2.5 sm:p-2.5 rounded-[1.6rem]";
  const tile = compact ? "rounded-lg" : "rounded-xl sm:rounded-2xl";
  return (
    <div
      className={`relative grid grid-cols-3 border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.015] shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_40px_80px_-40px_rgb(0_0_0/0.9)] ${gap} ${className}`}
    >
      {cells.map((c, i) => (
        <motion.div
          key={i}
          initial={animateIn ? { opacity: 0, scale: 0.86, filter: "blur(6px)" } : false}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: animateIn ? 0.05 + i * 0.045 : 0, ease }}
          className={`relative aspect-square border border-white/[0.06] bg-[radial-gradient(120%_120%_at_30%_0%,#2a3156_0%,#1d2340_70%)] shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] ${tile}`}
        >
          <MatrixCell cell={c} guide={guide} className="h-full w-full p-[8%]" />
        </motion.div>
      ))}

      <motion.div
        initial={animateIn ? { opacity: 0, scale: 0.86 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: animateIn ? 0.45 : 0, ease }}
        className={`relative aspect-square ${tile}`}
      >
        {/* Mozgó szaggatott keret */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <rect
            x="1"
            y="1"
            style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
            rx={compact ? 8 : 16}
            fill="none"
            stroke={state === "correct" ? "var(--color-aqua)" : state === "wrong" ? "var(--color-flame)" : "var(--color-iris)"}
            strokeOpacity={fill ? 0.9 : 0.75}
            strokeWidth="1.6"
            strokeDasharray={fill ? "0" : "6 6"}
            className={fill ? "" : "animate-dash"}
          />
        </svg>
        <div
          className={`absolute inset-0 ${tile} transition-[background,box-shadow] duration-500 ${
            state === "correct"
              ? "bg-aqua/10 shadow-[0_0_40px_-6px_rgb(69_227_196/0.55)]"
              : state === "wrong"
                ? "bg-flame/10 shadow-[0_0_40px_-6px_rgb(255_125_77/0.5)]"
                : "bg-iris/[0.07] shadow-[0_0_50px_-10px_rgb(139_123_255/0.6)]"
          }`}
        />
        <AnimatePresence mode="popLayout" initial={false}>
          {fill ? (
            <motion.div
              key={JSON.stringify(fill)}
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
              className="absolute inset-0"
            >
              <MatrixCell cell={fill} guide={guide} className="h-full w-full p-[8%]" />
            </motion.div>
          ) : (
            <motion.div
              key="q"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute inset-0 grid place-items-center"
            >
              <motion.span
                animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className={`font-display font-semibold text-gradient ${compact ? "text-2xl" : "text-4xl sm:text-5xl"}`}
              >
                ?
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
