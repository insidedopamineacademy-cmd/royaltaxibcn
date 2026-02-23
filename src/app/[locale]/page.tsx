import type {Metadata} from "next";
import Image from "next/image";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {Button} from "@/components/Button";
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
    "https://wa.me/34617629115?text=Hi%20I%20want%20to%20book%20a%20transfer%20in%20Barcelona";

  const whyChooseFeatures = [
    t("whyChoose.features.one"),
    t("whyChoose.features.two"),
    t("whyChoose.features.three"),
    t("whyChoose.features.four"),
  ];

  const services = [
    {
      title: t("services.airportTitle"),
      description: t("services.airportDesc"),
    },
    {
      title: t("services.cruiseTitle"),
      description: t("services.cruiseDesc"),
    },
    {
      title: t("services.longTitle"),
      description: t("services.longDesc"),
    },
  ];

  const fleetCards = [
    {
      title: t("fleet.standardTitle"),
      description: t("fleet.standardDesc"),
      imageSrc: "/images/taxi-barcelona-prius-plus.webp",
      href: "/fleet",
    },
    {
      title: t("fleet.premiumTitle"),
      description: t("fleet.premiumDesc"),
      imageSrc: "/images/taxi-class-barcelona-mercedes.webp",
      href: "/fleet",
    },
    {
      title: t("fleet.vanTitle"),
      description: t("fleet.vanDesc"),
      imageSrc: "/images/taxi-van-barcelona.webp",
      href: "/fleet",
    },
    {
      title: t("fleet.executiveTitle"),
      description: t("fleet.executiveDesc"),
      imageSrc: "/images/luxury-chauffeur-van-barcelona-service.webp",
      href: "/fleet",
    },
  ];

  const howItWorksSteps = [
    {
      iconSrc: "/icons/details.svg",
      title: t("howItWorks.steps.one.title"),
      description: t("howItWorks.steps.one.description"),
    },
    {
      iconSrc: "/icons/confirm.svg",
      title: t("howItWorks.steps.two.title"),
      description: t("howItWorks.steps.two.description"),
    },
    {
      iconSrc: "/icons/driver.svg",
      title: t("howItWorks.steps.three.title"),
      description: t("howItWorks.steps.three.description"),
    },
    {
      iconSrc: "/icons/arrival.svg",
      title: t("howItWorks.steps.four.title"),
      description: t("howItWorks.steps.four.description"),
    },
  ];

  const coreValues = [
    t("coreValues.items.one"),
    t("coreValues.items.two"),
    t("coreValues.items.three"),
    t("coreValues.items.four"),
    t("coreValues.items.five"),
    t("coreValues.items.six"),
    t("coreValues.items.seven"),
  ];

  const valuePositions = [
    "left-1/2 top-[-18px] -translate-x-1/2",
    "right-[-58px] top-[70px]",
    "right-[-88px] top-1/2 -translate-y-1/2",
    "right-[-58px] bottom-[70px]",
    "left-1/2 bottom-[-18px] -translate-x-1/2",
    "left-[-58px] bottom-[70px]",
    "left-[-88px] top-1/2 -translate-y-1/2",
  ];

  const serviceAreas = [
    t("serviceAreas.items.one"),
    t("serviceAreas.items.two"),
    t("serviceAreas.items.three"),
    t("serviceAreas.items.four"),
    t("serviceAreas.items.five"),
    t("serviceAreas.items.six"),
    t("serviceAreas.items.seven"),
    t("serviceAreas.items.eight"),
    t("serviceAreas.items.nine"),
  ];

  return (
    <>
      <SectionContainer className="bg-[#f9f9f9]" containerClassName="max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)]">
            {t("heroBadge")}
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-5 max-w-prose text-base leading-7 text-[var(--color-muted)]">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href={whatsappHref}
              variant="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("heroWhatsapp")}
              className="h-12 px-7"
            >
              {t("heroWhatsapp")}
            </Button>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white" id="services" containerClassName="max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl">{t("servicesTitle")}</h2>
          <Link href="/services" className="text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-gold)]">
            {t("services.more")}
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg">{service.title}</h3>
              <p className="mt-3 max-w-prose text-sm leading-7 text-[var(--color-muted)]">{service.description}</p>
            </article>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-[#0f0f0f] text-white" id="why" containerClassName="max-w-7xl">
        <h2 className="text-2xl text-white md:text-3xl">{t("whyChoose.title")}</h2>
        <p className="mt-4 max-w-prose leading-7 text-white/80">{t("whyChoose.intro")}</p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {whyChooseFeatures.map((feature) => (
            <article
              key={feature}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)]"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M9.55 18 4 12.45l1.4-1.4 4.15 4.15 9.05-9.05 1.4 1.4z" />
                  </svg>
                </span>
                <h3 className="text-base font-semibold text-white">{feature}</h3>
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-[#f9f9f9]" id="fleet" containerClassName="max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl">{t("fleetTitle")}</h2>
            <p className="mt-3 max-w-prose text-sm leading-7 text-[var(--color-muted)]">{t("fleetIntro")}</p>
          </div>
          <Link href="/fleet" className="text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-gold)]">
            {t("fleet.more")}
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {fleetCards.map((item, index) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex text-sm font-semibold text-[var(--color-navy)] underline-offset-4 hover:text-[var(--color-gold)] hover:underline"
                >
                  {t("fleet.viewVehicle")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white" containerClassName="max-w-7xl">
        <h2 className="text-2xl md:text-3xl">{t("howItWorks.title")}</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {howItWorksSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Image src={step.iconSrc} alt="" width={40} height={40} aria-hidden="true" />
              <h3 className="mt-4 text-base">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{step.description}</p>
            </article>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white" containerClassName="max-w-7xl">
        <h2 className="text-center text-2xl text-[var(--color-ink)] md:text-3xl">{t("coreValues.title")}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-7 text-[var(--color-muted)]">
          {t("coreValues.subtitle")}
        </p>

        {/* Desktop diagram (matches original HTML) */}
        <div className="relative mx-auto mt-10 hidden h-[500px] w-[500px] items-center justify-center rounded-full border-2 border-dashed border-[var(--color-border)] md:flex">
          <div className="absolute flex h-[220px] w-[220px] flex-col items-center justify-center rounded-full bg-[#f9f9f9] px-6 text-center shadow-sm">
            <h3 className="text-sm font-extrabold tracking-wide text-[var(--color-gold)]">{t("coreValues.centerTitle")}</h3>
            <p className="mt-2 text-xs leading-6 text-[var(--color-ink)]/80">{t("coreValues.centerSubtitle")}</p>
          </div>

          {coreValues.map((value, index) => {
            const positions = [
              "top-[-30px] left-1/2 -translate-x-1/2",
              "top-[60px] right-[-60px]",
              "top-1/2 right-[-90px] -translate-y-1/2",
              "bottom-[60px] right-[-60px]",
              "bottom-[-30px] left-1/2 -translate-x-1/2",
              "bottom-[60px] left-[-60px]",
              "top-1/2 left-[-90px] -translate-y-1/2",
            ];

            return (
              <div
                key={value}
                className={`absolute w-[160px] rounded-xl bg-white px-3.5 py-2 text-[13px] font-medium leading-snug text-[var(--color-ink)] shadow-md ring-1 ring-[var(--color-border)] ${positions[index]}`}
              >
                <span className="mr-2 text-[var(--color-gold)]">✔</span>
                {value}
              </div>
            );
          })}
        </div>

        {/* Mobile / small screens: clean stacked fallback */}
        <div className="mx-auto mt-8 max-w-xl space-y-3 md:hidden">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[#f9f9f9] px-5 py-4 text-center">
            <p className="text-xs font-extrabold tracking-wide text-[var(--color-gold)]">{t("coreValues.centerTitle")}</p>
            <p className="mt-2 text-sm font-semibold text-[var(--color-ink)]">{t("coreValues.centerTitleMobile")}</p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{t("coreValues.centerSubtitle")}</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {coreValues.map((value) => (
              <div
                key={value}
                className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-ink)] shadow-sm"
              >
                <span className="mr-2 text-[var(--color-gold)]">✔</span>
                {value}
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white" containerClassName="max-w-7xl">
        <h2 className="text-2xl md:text-3xl">{t("serviceAreas.title")}</h2>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((area) => (
            <p key={area} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm">
              {area}
            </p>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-[#0f0f0f] text-white" id="contact" containerClassName="max-w-5xl text-center">
        <h2 className="text-2xl text-white md:text-3xl">{t("closing.title")}</h2>
        <p className="mx-auto mt-4 max-w-prose leading-7 text-white/80">{t("closing.paragraph")}</p>
        <div className="mt-8 flex justify-center">
          <Button href={whatsappHref} variant="whatsapp" target="_blank" rel="noopener noreferrer" className="h-12 px-8">
            {t("closing.cta")}
          </Button>
        </div>
      </SectionContainer>
    </>
  );
}
