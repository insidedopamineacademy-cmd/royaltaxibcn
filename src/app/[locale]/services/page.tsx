import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {Button} from "@/components/Button";
import {Container} from "@/components/Container";
import {Section} from "@/components/Section";

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

export default async function ServicesPage({params}: PageProps) {
  const {locale} = params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: "servicesPage"});

  const whatsappHref =
    locale === "es"
      ? "https://wa.me/34617629115?text=Hola%20me%20gustar%C3%ADa%20reservar%20un%20taxi%20en%20Barcelona."
      : "https://wa.me/34617629115?text=Hello%20I%20would%20like%20to%20book%20a%20taxi%20in%20Barcelona.";

  const services = [
    {title: t("items.airportTitle"), description: t("items.airportDesc"), icon: "✈"},
    {title: t("items.cruiseTitle"), description: t("items.cruiseDesc"), icon: "🛳"},
    {title: t("items.cityTitle"), description: t("items.cityDesc"), icon: "🏙"},
    {title: t("items.longTitle"), description: t("items.longDesc"), icon: "🛣"},
    {title: t("items.businessTitle"), description: t("items.businessDesc"), icon: "💼"},
  ];

  return (
    <>
      <Section className="bg-gradient-to-br from-[#0F172A] to-gray-900 py-16 md:py-20">
        <Container>
          <h1 className="text-4xl text-white md:text-6xl">{t("title")}</h1>
          <p className="mt-4 max-w-3xl text-gray-400">{t("intro")}</p>
        </Container>
      </Section>

      <Section className="bg-[#F8F7F4]">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <section
                key={service.title}
                className="rounded-2xl border border-gray-100 bg-white p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#FBBF24] hover:shadow-2xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FBBF24] to-yellow-200 text-2xl shadow-md">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A]">{service.title}</h2>
                <p className="mt-3 text-gray-500">{service.description}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="primary">
                    {t("bookNow")}
                  </Button>
                  <Button href="tel:+34617629115" variant="outline">
                    {t("call")}
                  </Button>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
