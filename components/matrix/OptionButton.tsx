"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export const LETTERS = ["A", "B", "C", "D", "E", "F"];

/**
 * Egy válaszlehetőség kártyája (ábrás vagy szöveges).
 * state: a kiértékelés utáni visszajelzés színe.
 */
export default function OptionButton({
  index,
  selected,
  state = "idle",
  onSelect,
  children,
  layoutGroup,
  variant = "tile",
  disabled,
}: {
  index: number;
  selected: boolean;
  state?: "idle" | "correct" | "wrong" | "dim";
  onSelect: () => void;
  children: ReactNode;
  layoutGroup: string;
  variant?: "tile" | "row";
  disabled?: boolean;
}) {
  const ring =
    state === "correct"
      ? "border-aqua/70 bg-aqua/10"
      : state === "wrong"
        ? "border-flame/70 bg-flame/10"
        : state === "dim"
          ? "border-white/[0.05] opacity-45"
          : selected
            ? "border-iris/80 bg-iris/[0.12]"
            : "border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]";

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={disabled ? undefined : { y: -3 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`group relative w-full border text-left transition-[border-color,background-color,opacity] duration-300 disabled:cursor-default ${ring} ${
        variant === "tile" ? "aspect-square rounded-2xl" : "flex min-h-[4.25rem] items-center gap-4 rounded-2xl px-4 py-3.5 sm:px-5"
      }`}
    >
      {selected && state === "idle" && (
        <motion.span
          layoutId={`sel-${layoutGroup}`}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_0_1.5px_var(--color-iris),0_0_36px_-6px_rgb(139_123_255/0.8)]"
        />
      )}
      <span
        className={`grid shrink-0 place-items-center rounded-lg font-mono text-[0.7rem] font-semibold transition-colors ${
          variant === "tile" ? "absolute top-2 left-2 h-6 w-6" : "h-8 w-8 text-xs"
        } ${
          state === "correct"
            ? "bg-aqua text-ink-950"
            : state === "wrong"
              ? "bg-flame text-ink-950"
              : selected
                ? "bg-iris text-white"
                : "bg-white/[0.07] text-haze group-hover:bg-white/15"
        }`}
      >
        {LETTERS[index]}
      </span>
      {variant === "tile" ? <span className="absolute inset-0 p-[14%]">{children}</span> : <span className="text-[1.02rem] leading-snug">{children}</span>}
    </motion.button>
  );
}
