import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {Button} from "@/components/Button";
import {Container} from "@/components/Container";
import {QuoteForm} from "@/components/QuoteForm";
import {Section} from "@/components/Section";

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
    <Section className="sm:py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 max-w-3xl text-[var(--color-muted)]">{t("intro")}</p>

          <div className="mt-8">
            <QuoteForm locale={locale} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-5 py-4">
            <p className="text-sm text-[var(--color-muted)]">{t("reassurance")}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" className="h-10 px-4 text-xs">
                {t("whatsapp")}
              </Button>
              <Button href="tel:+34617629115" variant="outline" className="h-10 px-4 text-xs">
                {t("callNow")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
