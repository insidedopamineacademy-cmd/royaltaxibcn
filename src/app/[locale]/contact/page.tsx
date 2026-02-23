import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {Button} from "@/components/Button";
import {Card} from "@/components/Card";
import {PageHeader} from "@/components/PageHeader";
import {SectionContainer} from "@/components/SectionContainer";

type PageProps = {
  params: {locale: string};
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: "contactPage"});

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage({params}: PageProps) {
  const {locale} = params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: "contactPage"});

  const whatsappHref =
    locale === "es"
      ? "https://wa.me/34617629115?text=Hola%20me%20gustar%C3%ADa%20reservar%20un%20taxi%20en%20Barcelona."
      : "https://wa.me/34617629115?text=Hello%20I%20would%20like%20to%20book%20a%20taxi%20in%20Barcelona.";

  return (
    <>
      <SectionContainer className="bg-white" containerClassName="max-w-7xl">
        <PageHeader title={t("title")} description={t("intro")} />
      </SectionContainer>

      <SectionContainer className="bg-[var(--color-surface)]" containerClassName="max-w-5xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <h2 className="text-2xl">{t("callTitle")}</h2>
            <p className="mt-3">{t("callDescription")}</p>
            <Button href="tel:+34617629115" variant="primary" className="mt-6">
              {t("callNow")}
            </Button>
          </Card>

          <Card>
            <h2 className="text-2xl">{t("whatsappTitle")}</h2>
            <p className="mt-3">{t("whatsappDescription")}</p>
            <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="whatsapp" className="mt-6">
              {t("whatsappNow")}
            </Button>
          </Card>
        </div>
      </SectionContainer>
    </>
  );
}
