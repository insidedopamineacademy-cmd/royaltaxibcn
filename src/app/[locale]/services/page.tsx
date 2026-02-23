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
  <svg key="cruise" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M2 18c2 2 4 2 6 0 2 2 4 2 6 0 2 2 4 2 6 0v2c-2 2-4 2-6 0-2 2-4 2-6 0-2 2-4 2-6 0v-2zm2-7h16l-2 4H6l-2-4zm2-5h12v3H6V6z" /></svg>,
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
    {title: t("items.cruiseTitle"), description: t("items.cruiseDesc"), icon: icons[1]},
    {title: t("items.longTitle"), description: t("items.longDesc"), icon: icons[2]},
  ];

  const includedItems = [
    t("included.items.one"),
    t("included.items.two"),
    t("included.items.three"),
    t("included.items.four"),
    t("included.items.five"),
    t("included.items.six"),
  ];

  const routes = [
    t("popularRoutes.items.one"),
    t("popularRoutes.items.two"),
    t("popularRoutes.items.three"),
    t("popularRoutes.items.four"),
    t("popularRoutes.items.five"),
    t("popularRoutes.items.six"),
  ];

  const steps = [
    {title: t("howItWorks.steps.one.title"), desc: t("howItWorks.steps.one.desc")},
    {title: t("howItWorks.steps.two.title"), desc: t("howItWorks.steps.two.desc")},
    {title: t("howItWorks.steps.three.title"), desc: t("howItWorks.steps.three.desc")},
  ];

  const faqs = [
    {q: t("faq.items.one.q"), a: t("faq.items.one.a")},
    {q: t("faq.items.two.q"), a: t("faq.items.two.a")},
    {q: t("faq.items.three.q"), a: t("faq.items.three.a")},
    {q: t("faq.items.four.q"), a: t("faq.items.four.a")},
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

      <SectionContainer className="bg-white" containerClassName="max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-xl">{t("included.title")}</h3>
            <ul className="mt-4 space-y-2">
              {includedItems.map((item) => (
                <li key={item} className="text-sm leading-7 text-[var(--color-muted)]">
                  • {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="text-xl">{t("popularRoutes.title")}</h3>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {routes.map((route) => (
                <p key={route} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm">
                  {route}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-[var(--color-surface)]" containerClassName="max-w-7xl">
        <h3 className="text-xl">{t("howItWorks.title")}</h3>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title}>
              <h4 className="text-lg">{step.title}</h4>
              <p className="mt-3 text-sm leading-7">{step.desc}</p>
            </Card>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white" containerClassName="max-w-7xl">
        <h3 className="text-xl">{t("faq.title")}</h3>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {faqs.map((item) => (
            <Card key={item.q} className="shadow-none">
              <h4 className="text-base">{item.q}</h4>
              <p className="mt-2 text-sm leading-7">{item.a}</p>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
