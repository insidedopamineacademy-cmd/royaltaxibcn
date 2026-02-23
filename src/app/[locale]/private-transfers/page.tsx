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
  const t = await getTranslations({locale, namespace: "privateTransfersPage"});

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivateTransfersPage({params}: PageProps) {
  const {locale} = params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: "privateTransfersPage"});
  const whatsappHref =
    locale === "es"
      ? "https://wa.me/34617629115?text=Hola%20me%20gustar%C3%ADa%20reservar%20un%20taxi%20en%20Barcelona."
      : "https://wa.me/34617629115?text=Hello%20I%20would%20like%20to%20book%20a%20taxi%20in%20Barcelona.";

  return (
    <Section className="sm:py-20">
      <Container>
        <div className="mx-auto max-w-4xl rounded-3xl border border-[var(--color-border)] bg-white p-8 sm:p-12">
          <h1 className="text-4xl">{t("title")}</h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">{t("intro")}</p>
          <p className="mt-5 leading-relaxed text-[var(--color-muted)]">{t("paragraph1")}</p>
          <p className="mt-4 leading-relaxed text-[var(--color-muted)]">{t("paragraph2")}</p>
          <Button
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 h-12 px-8 text-base"
          >
            {t("cta")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
