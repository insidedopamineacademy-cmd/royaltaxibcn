import type {Metadata} from "next";
import Image from "next/image";
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

  const vehicles = [
    {
      title: t("cards.standardTitle"),
      capacity: t("cards.standardCapacity"),
      luggage: t("cards.standardLuggage"),
      description: t("cards.standardDesc"),
      image: "/fleet-standard.svg",
    },
    {
      title: t("cards.premiumTitle"),
      capacity: t("cards.premiumCapacity"),
      luggage: t("cards.premiumLuggage"),
      description: t("cards.premiumDesc"),
      image: "/fleet-premium.svg",
    },
    {
      title: t("cards.vanTitle"),
      capacity: t("cards.vanCapacity"),
      luggage: t("cards.vanLuggage"),
      description: t("cards.vanDesc"),
      image: "/fleet-van.svg",
    },
    {
      title: t("cards.executiveTitle"),
      capacity: t("cards.executiveCapacity"),
      luggage: t("cards.executiveLuggage"),
      description: t("cards.executiveDesc"),
      image: "/fleet-premium.svg",
    },
  ];

  return (
    <>
      <SectionContainer className="bg-white" containerClassName="max-w-7xl">
        <PageHeader title={t("title")} description={t("intro")} />
      </SectionContainer>

      <SectionContainer className="bg-[var(--color-navy)] text-white" containerClassName="max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {vehicles.map((vehicle, index) => (
            <Card key={vehicle.title} className="p-0 bg-white/5 border border-white/10 text-white shadow-none overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                <Image
                  src={vehicle.image}
                  alt={vehicle.title}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg text-white">{vehicle.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-white/80">
                  <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1">
                    {vehicle.capacity}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1">
                    {vehicle.luggage}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/90">{vehicle.description}</p>
                <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="gold" className="mt-6 w-full">
                  {t("bookVehicle")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
