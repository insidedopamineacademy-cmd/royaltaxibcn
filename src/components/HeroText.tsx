"use client";

import {motion} from "framer-motion";
import {Button} from "@/components/Button";

type HeroTextProps = {
  title: string;
  subtitle: string;
  whatsappLabel: string;
  callLabel: string;
  whatsappHref: string;
};

export function HeroText({title, subtitle, whatsappLabel, callLabel, whatsappHref}: HeroTextProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 10}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.35, ease: "easeOut"}}
      className="max-w-3xl"
    >
      <h1 className="text-4xl leading-tight sm:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">{subtitle}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href={whatsappHref} target="_blank" rel="noopener noreferrer">
          {whatsappLabel}
        </Button>
        <Button href="tel:+34617629115" variant="outline">
          {callLabel}
        </Button>
      </div>
    </motion.div>
  );
}
