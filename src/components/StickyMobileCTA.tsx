"use client";

import {motion} from "framer-motion";
import {useLocale, useTranslations} from "next-intl";

export function StickyMobileCTA() {
  const locale = useLocale();
  const t = useTranslations("cta");
  const whatsappHref =
    locale === "es"
      ? "https://wa.me/34617629115?text=Hola%20me%20gustar%C3%ADa%20reservar%20un%20taxi%20en%20Barcelona."
      : "https://wa.me/34617629115?text=Hello%20I%20would%20like%20to%20book%20a%20taxi%20in%20Barcelona.";

  return (
    <motion.div
      initial={{opacity: 0, y: 16}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.35, ease: "easeOut"}}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] bg-white/95 p-3 backdrop-blur md:hidden"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <a
          href="tel:+34617629115"
          className="flex h-11 flex-1 items-center justify-center rounded-full border border-[var(--color-ink)] text-sm font-semibold text-[var(--color-ink)]"
        >
          {t("call")}
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 flex-1 items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] text-sm font-semibold text-[var(--color-ink)]"
        >
          {t("whatsapp")}
        </a>
      </div>
    </motion.div>
  );
}
