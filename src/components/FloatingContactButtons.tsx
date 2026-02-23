import {useLocale, useTranslations} from "next-intl";

export function FloatingContactButtons() {
  const locale = useLocale();
  const t = useTranslations("cta");

  const whatsappHref =
    locale === "es"
      ? "https://wa.me/34617629115?text=Hola%20me%20gustar%C3%ADa%20reservar%20un%20taxi%20en%20Barcelona."
      : "https://wa.me/34617629115?text=Hello%20I%20would%20like%20to%20book%20a%20taxi%20in%20Barcelona.";

  return (
    <div
      className="fixed bottom-5 right-4 z-50 pb-safe md:hidden"
      style={{paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.25rem)"}}
    >
      <div className="flex flex-col items-end gap-3">
        <a
          href="tel:+34617629115"
          aria-label={t("call")}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-gold)] text-[var(--color-ink)] shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.1.37 2.28.57 3.5.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3.5a1 1 0 0 1 1-1H7.5a1 1 0 0 1 1 1c0 1.22.2 2.4.57 3.5a1 1 0 0 1-.24 1.01l-2.2 2.2z" />
          </svg>
        </a>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsapp")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-whatsapp)] text-white shadow-lg transition hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.43 0 .05 5.38.05 11.99c0 2.11.55 4.17 1.59 5.99L0 24l6.19-1.62a11.93 11.93 0 0 0 5.85 1.5h.01c6.61 0 11.99-5.38 11.99-11.99 0-3.2-1.25-6.2-3.52-8.41zM12.05 21.7h-.01a9.73 9.73 0 0 1-4.95-1.36l-.35-.21-3.67.96.98-3.58-.23-.37a9.75 9.75 0 0 1-1.5-5.17c0-5.39 4.38-9.77 9.77-9.77 2.61 0 5.07 1.02 6.92 2.87a9.72 9.72 0 0 1 2.86 6.92c0 5.39-4.39 9.77-9.78 9.77zm5.36-7.33c-.29-.14-1.72-.85-1.98-.95-.27-.1-.46-.14-.65.14-.19.29-.75.95-.92 1.14-.17.19-.34.22-.63.07-.29-.14-1.21-.45-2.3-1.44a8.62 8.62 0 0 1-1.6-1.99c-.17-.29-.02-.45.12-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.09-.19.05-.36-.02-.51-.07-.14-.65-1.57-.9-2.15-.24-.57-.48-.49-.65-.5-.17-.01-.37-.01-.56-.01-.2 0-.51.07-.78.36-.27.29-1.03 1.01-1.03 2.46s1.05 2.85 1.2 3.05c.14.19 2.05 3.13 4.96 4.39.69.3 1.24.48 1.66.61.7.22 1.34.19 1.84.11.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
