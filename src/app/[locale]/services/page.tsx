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
    {title: t("items.airportTitle"), description: t("items.airportDesc")},
    {title: t("items.cruiseTitle"), description: t("items.cruiseDesc")},
    {title: t("items.cityTitle"), description: t("items.cityDesc")},
    {title: t("items.longTitle"), description: t("items.longDesc")},
    {title: t("items.businessTitle"), description: t("items.businessDesc")},
  ];

  return (
    <Section>
      <Container>
        <h1 className="text-4xl">{t("title")}</h1>
        <p className="mt-4 max-w-3xl text-[var(--color-muted)]">{t("intro")}</p>

        <div className="mt-10 space-y-5">
          {services.map((service) => (
            <section key={service.title} className="rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-8">
              <h2 className="text-2xl">{service.title}</h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-[var(--color-muted)]">{service.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  {t("whatsapp")}
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
  );
}
