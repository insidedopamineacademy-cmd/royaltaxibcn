import type {Metadata} from "next";
import Image from "next/image";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {Button} from "@/components/Button";
import {Container} from "@/components/Container";
import {Section} from "@/components/Section";

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
    {
      title: t("services.airportTitle"),
      description: t("services.airportDesc"),
      icon: "✈",
    },
    {
      title: t("services.cityTitle"),
      description: t("services.cityDesc"),
      icon: "🏙",
    },
    {
      title: t("services.longTitle"),
      description: t("services.longDesc"),
      icon: "🛣",
    },
  ];

  const fleet = [
    {
      title: t("fleet.standardTitle"),
      description: t("fleet.standardDesc"),
      price: t("fleet.standardPrice"),
      capacity: "4",
      image: "/fleet-standard.svg",
      alt: t("fleet.standardTitle"),
    },
    {
      title: t("fleet.premiumTitle"),
      description: t("fleet.premiumDesc"),
      price: t("fleet.premiumPrice"),
      capacity: "4",
      image: "/fleet-premium.svg",
      alt: t("fleet.premiumTitle"),
    },
    {
      title: t("fleet.vanTitle"),
      description: t("fleet.vanDesc"),
      price: t("fleet.vanPrice"),
      capacity: "8",
      image: "/fleet-van.svg",
      alt: t("fleet.vanTitle"),
    },
  ];

  const heroTitle = t("heroTitle");
  const heroParts = heroTitle.includes("Barcelona")
    ? heroTitle.split("Barcelona")
    : [heroTitle, ""];

  return (
    <>
      <Section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#111827] to-black py-20 md:py-28">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#FBBF24]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#2563EB]/25 blur-3xl" />
        <Container className="relative">
          <h1 className="max-w-5xl text-5xl font-bold leading-tight text-white md:text-7xl">
            {heroParts[0]}
            {heroParts.length > 1 && (
              <span className="bg-gradient-to-r from-[#FBBF24] to-yellow-200 bg-clip-text text-transparent">Barcelona</span>
            )}
            {heroParts[1]}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-gray-300 md:text-xl">{t("heroSubtitle")}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="whatsapp" className="h-12 px-8 text-base">
              {t("heroWhatsapp")}
            </Button>
            <Button
              href="tel:+34617629115"
              variant="outline"
              className="h-12 border-white px-8 text-base text-white hover:bg-white hover:text-[#0F172A]"
            >
              {t("heroCall")}
            </Button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white">✅ {t("trustBadges.always")}</div>
            <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white">✅ {t("trustBadges.licensed")}</div>
            <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white">✅ {t("trustBadges.airport")}</div>
            <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white">✅ {t("trustBadges.fast")}</div>
          </div>
        </Container>
      </Section>

      <Section id="services" className="bg-[#F8F7F4]">
        <Container>
          <h2 className="text-3xl md:text-4xl">{t("servicesTitle")}</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#FBBF24] hover:shadow-2xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FBBF24] to-yellow-200 text-2xl shadow-md">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A]">{item.title}</h3>
                <p className="mt-3 text-gray-500">{item.description}</p>
                <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="primary" className="mt-7">
                  {t("services.bookNow")}
                </Button>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="why" className="bg-gradient-to-br from-[#0F172A] to-gray-900">
        <Container>
          <h2 className="text-3xl text-white md:text-4xl">{t("whyTitle")}</h2>
          <p className="mt-4 max-w-3xl text-gray-400">{t("whyParagraph")}</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="mb-3 text-xl">✨</p>
              <h3 className="text-xl font-semibold text-white">{t("whyBullets.one")}</h3>
              <p className="mt-2 text-gray-400">{t("whyCards.one")}</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="mb-3 text-xl">🚖</p>
              <h3 className="text-xl font-semibold text-white">{t("whyBullets.two")}</h3>
              <p className="mt-2 text-gray-400">{t("whyCards.two")}</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="mb-3 text-xl">💬</p>
              <h3 className="text-xl font-semibold text-white">{t("whyBullets.three")}</h3>
              <p className="mt-2 text-gray-400">{t("whyCards.three")}</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="mb-3 text-xl">🛬</p>
              <h3 className="text-xl font-semibold text-white">{t("whyBullets.four")}</h3>
              <p className="mt-2 text-gray-400">{t("whyCards.four")}</p>
            </article>
          </div>
        </Container>
      </Section>

      <Section id="fleet" className="bg-[#F8F7F4]">
        <Container>
          <h2 className="text-3xl md:text-4xl">{t("fleetTitle")}</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fleet.map((item, index) => (
              <article key={item.title} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="inline-flex items-center gap-2 text-sm text-gray-600">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                        <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.41 0-8 2.24-8 5v1h16v-1c0-2.76-3.59-5-8-5z" />
                      </svg>
                      {item.capacity} {t("fleet.pax")}
                    </p>
                    <p className="text-lg font-bold text-[#2563EB]">{item.price}</p>
                  </div>

                  <p className="mt-3 text-gray-500">{item.description}</p>
                  <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="primary" className="mt-6">
                    {t("fleet.bookVehicle")}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="contact" className="bg-gradient-to-br from-[#0F172A] to-gray-900">
        <Container>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center backdrop-blur-sm sm:px-10">
            <h2 className="text-3xl text-white md:text-4xl">{t("finalTitle")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">{t("finalSupport")}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="whatsapp" className="h-12 px-8 text-base">
                {t("finalButton")}
              </Button>
              <Button
                href="tel:+34617629115"
                variant="outline"
                className="h-12 border-white px-8 text-base text-white hover:bg-white hover:text-[#0F172A]"
              >
                {t("heroCall")}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
