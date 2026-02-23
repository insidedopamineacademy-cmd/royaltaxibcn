import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {Button} from "@/components/Button";
import {PageHeader} from "@/components/PageHeader";
import {QuoteForm} from "@/components/QuoteForm";
import {SectionContainer} from "@/components/SectionContainer";

type PageProps = {
  params: {locale: string};
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: "quotePage"});

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function GetQuotePage({params}: PageProps) {
  const {locale} = params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: "quotePage"});

  const whatsappHref =
    locale === "es"
      ? "https://wa.me/34617629115?text=Hola%20me%20gustar%C3%ADa%20pedir%20un%20presupuesto%20para%20un%20taxi%20en%20Barcelona."
      : "https://wa.me/34617629115?text=Hello%20I%20would%20like%20a%20quote%20for%20a%20taxi%20in%20Barcelona.";

  return (
    <>
      <SectionContainer className="bg-white" containerClassName="max-w-7xl">
        <PageHeader title={t("title")} description={t("intro")} />
      </SectionContainer>

      <SectionContainer className="bg-[var(--color-surface)]" containerClassName="max-w-4xl">
        <QuoteForm locale={locale} />

        <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-4">
          <p className="text-sm font-medium text-[var(--color-navy)]">{t("reassurance")}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]">
            <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1">✓ {t("chips.fast")}</span>
            <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1">✓ {t("chips.licensed")}</span>
            <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1">✓ {t("chips.airport")}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="whatsapp" className="h-10 px-4 text-xs">
              {t("whatsapp")}
            </Button>
            <Button href="tel:+34617629115" variant="secondary" className="h-10 px-4 text-xs">
              {t("callNow")}
            </Button>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
