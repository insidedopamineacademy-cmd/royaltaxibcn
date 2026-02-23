import Image from "next/image";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {Container} from "./Container";
import {LocaleSwitcher} from "./LocaleSwitcher";

export function Header() {
  const t = useTranslations("header");

  return (
    <header className="border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label="Royal Taxi Barcelona">
          <Image src="/logo.svg" alt="Royal Taxi Barcelona" width={180} height={40} priority />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#services" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-ink)]">
            {t("services")}
          </a>
          <a href="#fleet" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-ink)]">
            {t("fleet")}
          </a>
          <Link href="/get-a-quote" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-ink)]">
            {t("quote")}
          </Link>
          <a href="#why" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-ink)]">
            {t("why")}
          </a>
          <a href="#contact" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-ink)]">
            {t("contact")}
          </a>
        </nav>

        <LocaleSwitcher />
      </Container>
    </header>
  );
}
