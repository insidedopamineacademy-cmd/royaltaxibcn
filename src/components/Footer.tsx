import {useLocale, useTranslations} from "next-intl";
import {Container} from "./Container";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  const whatsappHref =
    locale === "es"
      ? "https://wa.me/34617629115?text=Hola%20me%20gustar%C3%ADa%20reservar%20un%20taxi%20en%20Barcelona."
      : "https://wa.me/34617629115?text=Hello%20I%20would%20like%20to%20book%20a%20taxi%20in%20Barcelona.";

  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-white">
      <Container className="flex flex-col gap-6 py-10 text-sm text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
        <p>
          {t("copyright", {
            year,
          })}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="tel:+34617629115" className="transition hover:text-[var(--color-navy)]">
            {t("call")}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[var(--color-navy)]"
          >
            {t("whatsapp")}
          </a>
        </div>
      </Container>
    </footer>
  );
}
