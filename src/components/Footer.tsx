import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {Container} from "./Container";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const whatsappHref =
    locale === "es"
      ? "https://wa.me/34617629115?text=Hola%20me%20gustar%C3%ADa%20reservar%20un%20taxi%20en%20Barcelona."
      : "https://wa.me/34617629115?text=Hello%20I%20would%20like%20to%20book%20a%20taxi%20in%20Barcelona.";

  return (
    <footer className="mt-20 bg-[var(--color-navy)] text-white">
      <Container className="py-14">
        {/* Top Grid */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand Column */}
          <div>
            <h3 className="text-lg font-semibold tracking-wide">
              Royal Taxi Barcelona
            </h3>
            <p className="mt-4 text-sm leading-6 text-white/80">
              Private airport transfers, cruise port pickups and long‑distance
              travel across Barcelona and Catalonia. Reliable service, licensed
              drivers and direct communication.
            </p>
            <div className="mt-5 h-[2px] w-16 bg-[var(--color-gold)]" />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <Link href={`/${locale}`} className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="transition hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fleet`} className="transition hover:text-white">
                  Fleet
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/why-us`} className="transition hover:text-white">
                  Why Us
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/get-a-quote`} className="transition hover:text-white">
                  Request Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <a
                  href="tel:+34617629115"
                  className="transition hover:text-white"
                >
                  +34 617 629 115
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  WhatsApp Booking
                </a>
              </li>
              <li>
                <span>Barcelona, Spain</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/60 md:flex md:items-center md:justify-between">
          <p>
            © {year} Royal Taxi Barcelona. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Licensed Taxi Service • 24/7 Availability • Secure Booking
          </p>
        </div>
      </Container>
    </footer>
  );
}
