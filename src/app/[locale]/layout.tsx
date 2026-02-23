import type {Metadata} from "next";
import {Manrope, Playfair_Display} from "next/font/google";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {StickyMobileCTA} from "@/components/StickyMobileCTA";
import {FloatingContactButtons} from "@/components/FloatingContactButtons";
import "../globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://royaltaxibcn.com"),
  title: {
    default: "Royal Taxi Barcelona",
    template: "%s | Royal Taxi Barcelona",
  },
  description:
    "Premium Barcelona taxi service for airport transfers, city rides and executive travel.",
  alternates: {
    languages: {
      en: "/en",
      es: "/es",
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-[var(--color-surface)] text-[var(--color-ink)] antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <StickyMobileCTA />
          <FloatingContactButtons />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
