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
  const t = await getTranslations({locale, namespace: "servicesPage"});

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const icons = [
  <svg key="airport" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M21 16v2l-8-1-4 3v-3l-6-1v-2l6 1V5.5a1.5 1.5 0 1 1 3 0V15l9 1z" /></svg>,
  <svg key="city" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M3 21h18v-2H3v2zm2-4h4V7H5v10zm6 0h4V3h-4v14zm6 0h2v-8h-2v8z" /></svg>,
  <svg key="long" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M3 18h3l2-3h8l2 3h3l-2.5-4.5A3 3 0 0 0 16 12H8a3 3 0 0 0-2.5 1.5L3 18zm2-8h14V8H5v2zm0-4h14V4H5v2z" /></svg>,
];

export default async function ServicesPage({params}: PageProps) {
  const {locale} = params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: "servicesPage"});

  const whatsappHref =
    locale === "es"
      ? "https://wa.me/34617629115?text=Hola%20me%20gustar%C3%ADa%20reservar%20un%20taxi%20en%20Barcelona."
      : "https://wa.me/34617629115?text=Hello%20I%20would%20like%20to%20book%20a%20taxi%20in%20Barcelona.";

  const services = [
    {title: t("items.airportTitle"), description: t("items.airportDesc"), icon: icons[0]},
    {title: t("items.cityTitle"), description: t("items.cityDesc"), icon: icons[1]},
    {title: t("items.longTitle"), description: t("items.longDesc"), icon: icons[2]},
  ];

  return (
    <>
      <SectionContainer className="bg-white" containerClassName="max-w-7xl">
        <PageHeader title={t("title")} description={t("intro")} />
      </SectionContainer>

      <SectionContainer className="bg-[var(--color-surface)]" containerClassName="max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface)] text-[var(--color-navy)]">
                {service.icon}
              </span>
              <h2 className="mt-4 text-xl">{service.title}</h2>
              <p className="mt-3 max-w-prose leading-7">{service.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                  {t("bookNow")}
                </Button>
                <Button href="tel:+34617629115" variant="secondary">
                  {t("call")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
