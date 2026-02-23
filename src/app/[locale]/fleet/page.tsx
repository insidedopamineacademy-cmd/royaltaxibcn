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
  const t = await getTranslations({locale, namespace: "fleetPage"});

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function FleetPage({params}: PageProps) {
  const {locale} = params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: "fleetPage"});

  const whatsappHref =
    locale === "es"
      ? "https://wa.me/34617629115?text=Hola%20me%20gustar%C3%ADa%20reservar%20un%20taxi%20en%20Barcelona."
      : "https://wa.me/34617629115?text=Hello%20I%20would%20like%20to%20book%20a%20taxi%20in%20Barcelona.";

  const fleetCards = [
    {
      title: t("cards.standardTitle"),
      capacity: t("cards.standardCapacity"),
      description: t("cards.standardDesc"),
      price: t("cards.standardPrice"),
      image: "/fleet-standard.svg",
    },
    {
      title: t("cards.premiumTitle"),
      capacity: t("cards.premiumCapacity"),
      description: t("cards.premiumDesc"),
      price: t("cards.premiumPrice"),
      image: "/fleet-premium.svg",
    },
    {
      title: t("cards.vanTitle"),
      capacity: t("cards.vanCapacity"),
      description: t("cards.vanDesc"),
      price: t("cards.vanPrice"),
      image: "/fleet-van.svg",
    },
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
            {fleetCards.map((item, index) => (
              <article key={item.title} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="inline-flex items-center gap-2 text-sm text-gray-600">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                        <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.41 0-8 2.24-8 5v1h16v-1c0-2.76-3.59-5-8-5z" />
                      </svg>
                      {item.capacity}
                    </p>
                    <p className="text-lg font-bold text-[#2563EB]">{item.price}</p>
                  </div>
                  <p className="mt-3 text-gray-500">{item.description}</p>
                  <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="primary" className="mt-6">
                    {t("bookVehicle")}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
