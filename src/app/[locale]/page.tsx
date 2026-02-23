import type {Metadata} from "next";
import Image from "next/image";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/Button";
import {Container} from "@/components/Container";
import {HeroText} from "@/components/HeroText";
import {Section} from "@/components/Section";
import {TrustBadges} from "@/components/TrustBadges";

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

  const trustBadges = [
    t("trustBadges.always"),
    t("trustBadges.meet"),
    t("trustBadges.licensed"),
    t("trustBadges.fast"),
  ];

  const services = [
    {
      title: t("services.airportTitle"),
      description: t("services.airportDesc"),
    },
    {
      title: t("services.cityTitle"),
      description: t("services.cityDesc"),
    },
    {
      title: t("services.longTitle"),
      description: t("services.longDesc"),
    },
  ];

  const fleet = [
    {
      title: t("fleet.standardTitle"),
      description: t("fleet.standardDesc"),
      image: "/fleet-standard.svg",
      alt: t("fleet.standardTitle"),
    },
    {
      title: t("fleet.premiumTitle"),
      description: t("fleet.premiumDesc"),
      image: "/fleet-premium.svg",
      alt: t("fleet.premiumTitle"),
    },
    {
      title: t("fleet.vanTitle"),
      description: t("fleet.vanDesc"),
      image: "/fleet-van.svg",
      alt: t("fleet.vanTitle"),
    },
  ];

  return (
    <>
      <Section className="pb-8 pt-14 sm:pt-20">
        <Container>
          <HeroText
            title={t("heroTitle")}
            subtitle={t("heroSubtitle")}
            whatsappLabel={t("heroWhatsapp")}
            callLabel={t("heroCall")}
            whatsappHref={whatsappHref}
          />
        </Container>
      </Section>

      <Section className="py-8">
        <Container>
          <TrustBadges badges={trustBadges} />
        </Container>
      </Section>

      <Section id="services">
        <Container>
          <h2 className="text-3xl">{t("servicesTitle")}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {services.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{item.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" className="h-10 px-4 text-xs">
                    {t("services.whatsapp")}
                  </Button>
                  <Link
                    href="/services"
                    className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--color-border)] px-4 text-xs font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-gold)]"
                  >
                    {t("services.more")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="fleet">
        <Container>
          <h2 className="text-3xl">{t("fleetTitle")}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {fleet.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
                <Image src={item.image} alt={item.alt} width={1200} height={800} className="h-44 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{item.description}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" className="h-10 px-4 text-xs">
                      {t("fleet.whatsapp")}
                    </Button>
                    <Link
                      href="/fleet"
                      className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--color-border)] px-4 text-xs font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-gold)]"
                    >
                      {t("fleet.more")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="why">
        <Container>
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 sm:p-10">
            <h2 className="text-3xl">{t("whyTitle")}</h2>
            <p className="mt-4 max-w-3xl text-[var(--color-muted)]">{t("whyParagraph")}</p>
            <ul className="mt-6 grid gap-3 text-sm text-[var(--color-ink)] sm:grid-cols-2">
              <li>• {t("whyBullets.one")}</li>
              <li>• {t("whyBullets.two")}</li>
              <li>• {t("whyBullets.three")}</li>
              <li>• {t("whyBullets.four")}</li>
            </ul>
          </div>
        </Container>
      </Section>

      <Section id="contact" className="pt-4">
        <Container>
          <div className="rounded-3xl border border-[var(--color-border)] bg-white px-6 py-12 text-center sm:px-10">
            <h2 className="text-3xl">{t("finalTitle")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-muted)]">{t("finalSupport")}</p>
            <Button
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 h-12 px-8 text-base"
            >
              {t("finalButton")}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
