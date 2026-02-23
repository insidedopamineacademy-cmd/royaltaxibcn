import type {Metadata} from "next";
import Image from "next/image";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {Button} from "@/components/Button";
import {Card} from "@/components/Card";
import {PageHeader} from "@/components/PageHeader";
import {SectionContainer} from "@/components/SectionContainer";
import {Link} from "@/i18n/navigation";

type PageProps = {
  params: {locale: string};
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: "home"});

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function HomePage({params}: PageProps) {
  const {locale} = params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: "home"});

  const whatsappHref =
    locale === "es"
      ? "https://wa.me/34617629115?text=Hola%20me%20gustar%C3%ADa%20reservar%20un%20taxi%20en%20Barcelona."
      : "https://wa.me/34617629115?text=Hello%20I%20would%20like%20to%20book%20a%20taxi%20in%20Barcelona.";

  const services = [
    {title: t("services.airportTitle"), description: t("services.airportDesc")},
    {title: t("services.cruiseTitle"), description: t("services.cruiseDesc")},
    {title: t("services.longTitle"), description: t("services.longDesc")},
  ];

  const fleet = [
    {
      title: t("fleet.standardTitle"),
      description: t("fleet.standardDesc"),
      image: "/fleet-standard.svg",
    },
    {
      title: t("fleet.premiumTitle"),
      description: t("fleet.premiumDesc"),
      image: "/fleet-premium.svg",
    },
    {
      title: t("fleet.vanTitle"),
      description: t("fleet.vanDesc"),
      image: "/fleet-van.svg",
    },
  ];

  return (
    <>
      <SectionContainer className="bg-white" containerClassName="max-w-7xl">
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-7 shadow-soft md:p-10">
          <span className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-navy)]">
            {t("heroBadge")}
          </span>

          <PageHeader
            className="mt-5"
            title={t("heroTitle")}
            description={t("heroSubtitle")}
            action={
              <div className="flex flex-wrap gap-3">
                <Button
                  href={whatsappHref}
                  variant="whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<span aria-hidden="true">💬</span>}
                >
                  {t("heroWhatsapp")}
                </Button>
                <Button
                  href="tel:+34617629115"
                  variant="secondary"
                  leftIcon={<span aria-hidden="true">📞</span>}
                >
                  {t("heroCall")}
                </Button>
                <Button
                  href="/get-a-quote"
                  variant="gold"
                  leftIcon={<span aria-hidden="true">✦</span>}
                >
                  {t("heroQuote")}
                </Button>
              </div>
            }
          />
        </div>
      </SectionContainer>

      <SectionContainer className="bg-[var(--color-surface)]" id="services" containerClassName="max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl">{t("servicesTitle")}</h2>
          <Link href="/services" className="text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-gold)]">
            {t("services.more")}
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title}>
              <h3 className="text-lg">{service.title}</h3>
              <p className="mt-3 max-w-prose text-sm leading-7">{service.description}</p>
              <Button
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                className="mt-6 h-10 px-4 text-xs"
              >
                {t("services.bookNow")}
              </Button>
            </Card>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-[var(--color-navy)]" id="fleet" containerClassName="max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl text-white md:text-3xl">{t("fleetTitle")}</h2>
          <Link href="/fleet" className="text-sm font-semibold text-[var(--color-gold)] hover:text-[#e4cf95]">
            {t("fleet.more")}
          </Link>
        </div>
        <p className="mt-3 max-w-prose text-sm leading-7 text-gray-300">{t("fleet.darkSectionIntro")}</p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {fleet.map((item, index) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-0 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-gold)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg text-white">{item.title}</h3>
                <p className="mt-3 max-w-prose text-sm leading-7 text-gray-300">{item.description}</p>
                <Button
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold"
                  className="mt-6 h-10 px-4 text-xs"
                >
                  {t("fleet.bookVehicle")}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white" id="why" containerClassName="max-w-7xl">
        <h2 className="text-2xl md:text-3xl">{t("whyTitle")}</h2>
        <p className="mt-4 max-w-prose leading-7">{t("whyParagraph")}</p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="shadow-none">
            <h3 className="text-base">{t("whyBullets.one")}</h3>
            <p className="mt-2 text-sm leading-7">{t("whyCards.one")}</p>
          </Card>
          <Card className="shadow-none">
            <h3 className="text-base">{t("whyBullets.two")}</h3>
            <p className="mt-2 text-sm leading-7">{t("whyCards.two")}</p>
          </Card>
          <Card className="shadow-none">
            <h3 className="text-base">{t("whyBullets.three")}</h3>
            <p className="mt-2 text-sm leading-7">{t("whyCards.three")}</p>
          </Card>
          <Card className="shadow-none">
            <h3 className="text-base">{t("whyBullets.four")}</h3>
            <p className="mt-2 text-sm leading-7">{t("whyCards.four")}</p>
          </Card>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-[var(--color-ink)]" id="contact" containerClassName="max-w-5xl text-center">
        <h2 className="text-2xl text-white md:text-3xl">{t("finalTitle")}</h2>
        <p className="mx-auto mt-4 max-w-prose leading-7 text-gray-300">{t("finalSupport")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={whatsappHref} variant="whatsapp" target="_blank" rel="noopener noreferrer" className="h-12 px-8">
            {t("finalButton")}
          </Button>
          <Button href="tel:+34617629115" variant="secondary" className="h-12 px-8">
            {t("heroCall")}
          </Button>
        </div>
      </SectionContainer>
    </>
  );
}
