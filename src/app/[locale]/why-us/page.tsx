import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {Card} from "@/components/Card";
import {PageHeader} from "@/components/PageHeader";
import {SectionContainer} from "@/components/SectionContainer";

type PageProps = {
  params: {locale: string};
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: "whyUsPage"});

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function WhyUsPage({params}: PageProps) {
  const {locale} = params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: "whyUsPage"});

  const features = [
    {title: t("items.reliabilityTitle"), description: t("items.reliabilityDesc")},
    {title: t("items.driversTitle"), description: t("items.driversDesc")},
    {title: t("items.communicationTitle"), description: t("items.communicationDesc")},
    {title: t("items.coverageTitle"), description: t("items.coverageDesc")},
  ];

  const standards = [
    t("standards.items.one"),
    t("standards.items.two"),
    t("standards.items.three"),
    t("standards.items.four"),
    t("standards.items.five"),
    t("standards.items.six"),
  ];

  const whoServe = [
    t("whoServe.items.one"),
    t("whoServe.items.two"),
    t("whoServe.items.three"),
    t("whoServe.items.four"),
  ];

  return (
    <>
      <SectionContainer className="bg-white" containerClassName="max-w-7xl">
        <PageHeader title={t("title")} description={t("intro")} />
        <div className="mt-6 max-w-prose space-y-4 text-sm leading-7 text-[var(--color-muted)]">
          <p>{t("paragraphs.one")}</p>
          <p>{t("paragraphs.two")}</p>
          <p>{t("paragraphs.three")}</p>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-[var(--color-navy)] text-white" containerClassName="max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-white/5 border border-white/10 text-white shadow-none">
              <h2 className="text-xl text-white">{feature.title}</h2>
              <p className="mt-3 max-w-prose text-sm leading-7 text-white/90">{feature.description}</p>
            </Card>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white" containerClassName="max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-xl">{t("standards.title")}</h3>
            <ul className="mt-4 space-y-2">
              {standards.map((item) => (
                <li key={item} className="text-sm leading-7 text-[var(--color-muted)]">
                  • {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="text-xl">{t("whoServe.title")}</h3>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {whoServe.map((item) => (
                <p key={item} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm">
                  {item}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </SectionContainer>
    </>
  );
}
