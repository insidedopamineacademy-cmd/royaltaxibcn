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

  return (
    <>
      <SectionContainer className="bg-white" containerClassName="max-w-7xl">
        <PageHeader title={t("title")} description={t("intro")} />
      </SectionContainer>

      <SectionContainer className="bg-[var(--color-surface)]" containerClassName="max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title}>
              <h2 className="text-2xl">{feature.title}</h2>
              <p className="mt-3">{feature.description}</p>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
