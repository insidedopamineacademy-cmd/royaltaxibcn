"use client";

import {useLocale, useTranslations} from "next-intl";
import {routing} from "@/i18n/routing";
import {usePathname, useRouter} from "@/i18n/navigation";

export function LocaleSwitcher() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <label className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)]">
      <span className="sr-only">{t("language")}</span>
      <select
        aria-label={t("language")}
        className="h-9 rounded-full border border-[var(--color-border)] bg-white px-3 text-[var(--color-navy)] outline-none transition focus:border-[var(--color-gold)]"
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value as (typeof routing.locales)[number];
          router.replace(pathname, {locale: nextLocale});
        }}
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    </label>
  );
}
