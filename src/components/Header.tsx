"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";
import {Button} from "./Button";
import {Container} from "./Container";
import {LocaleSwitcher} from "./LocaleSwitcher";

const navItems = [
  {key: "home", href: "/"},
  {key: "services", href: "/services"},
  {key: "fleet", href: "/fleet"},
  {key: "why", href: "/why-us"},
  {key: "contact", href: "/contact"},
  {key: "quote", href: "/get-a-quote"},
] as const;

export function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--color-navy)] text-white backdrop-blur">
      <Container className="py-3">
        <div className="flex min-h-14 items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 rounded-md bg-white px-2 py-1"
            aria-label="Royal Taxi Barcelona"
          >
            <Image src="/logo.svg" alt="Royal Taxi Barcelona" width={170} height={38} priority />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.slice(1, 5).map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

        <div className="flex items-center gap-3">
          <Button href="/get-a-quote" variant="gold" className="hidden h-10 px-4 text-xs lg:inline-flex">
            {t("quote")}
          </Button>
          <LocaleSwitcher />
            <button
              type="button"
              aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={menuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white lg:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav className="mt-3 rounded-2xl border border-white/10 bg-[var(--color-navy)] p-3 shadow-soft lg:hidden">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
