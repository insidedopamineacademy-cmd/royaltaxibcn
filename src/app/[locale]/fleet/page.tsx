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
      image: "/fleet-standard.svg",
    },
    {
      title: t("cards.premiumTitle"),
      capacity: t("cards.premiumCapacity"),
      description: t("cards.premiumDesc"),
      image: "/fleet-premium.svg",
    },
    {
      title: t("cards.vanTitle"),
      capacity: t("cards.vanCapacity"),
      description: t("cards.vanDesc"),
      image: "/fleet-van.svg",
    },
  ];

  return (
    <Section>
      <Container>
        <h1 className="text-4xl">{t("title")}</h1>
        <p className="mt-4 max-w-3xl text-[var(--color-muted)]">{t("intro")}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {fleetCards.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
              <Image src={item.image} alt={item.title} width={1200} height={800} className="h-48 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm font-medium text-[var(--color-ink)]">{item.capacity}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{item.description}</p>
                <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-6">
                  {t("whatsapp")}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
