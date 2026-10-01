"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import Logo from "./Logo";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { useI18n } from "@/components/i18n/I18nProvider";
import { path } from "@/lib/i18n/config";
import { nav } from "@/lib/site";

export default function Header() {
  const { lang, t } = useI18n();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));
  const items = nav.map((n) => ({ ...n, href: `${path(lang, n.route)}${n.hash ? `#${n.hash}` : ""}`, label: t.nav[n.key] }));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pr-2 pl-4 transition-all duration-500 sm:pl-5 ${
          scrolled || open ? "glass bg-ink-900/75" : "border border-transparent"
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t.nav.main}>
          {items.map((n) => {
            const active = n.href === pathname;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors ${active ? "text-paper" : "text-mist hover:text-paper"}`}
              >
                {active && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]" />}
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden lg:block" />
          <Link href={path(lang, "test")} className="btn-primary !px-4 !py-2.5 text-sm whitespace-nowrap sm:!px-5">
            <span className="hidden sm:inline">{t.nav.start}</span>
            <span className="sm:hidden">{t.nav.startShort}</span>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] lg:hidden"
            aria-label={open ? t.nav.close : t.nav.open}
            aria-expanded={open}
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-[1.5px] w-4 bg-paper transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-4 bg-paper transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-auto mt-2 max-w-6xl rounded-3xl bg-ink-900/90 p-2 lg:hidden"
            aria-label={t.nav.mobile}
          >
            {items.map((n, i) => (
              <motion.div key={n.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                <Link href={n.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-paper hover:bg-white/5">
                  {n.label}
                  <span className="font-mono text-xs text-mist">0{i + 1}</span>
                </Link>
              </motion.div>
            ))}
            <div className="mt-1 border-t border-white/[0.06] px-4 pt-3 pb-2">
              <p className="text-xs text-mist">{t.nav.language}</p>
              <LanguageSwitcher variant="list" className="mt-2.5" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
