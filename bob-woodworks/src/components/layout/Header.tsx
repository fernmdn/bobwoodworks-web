"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export type NavItem = { href: string; label: string };

export function Header({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-stone/50 bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/85">
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={`py-2 text-[0.9375rem] underline-offset-8 hover:underline ${
                isCurrent(item.href) ? "underline decoration-walnut decoration-2" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/contacto#cotizacion" className="!min-h-11 !px-5 !py-2">
            Solicitar cotización
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex h-12 w-12 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </Container>

      <div id="menu-movil" hidden={!open} className="border-t border-stone/50 bg-ivory md:hidden">
        <Container>
          <nav aria-label="Principal móvil" className="flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={`border-b border-stone/30 py-4 font-serif text-xl ${
                  isCurrent(item.href) ? "text-forest" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/contacto#cotizacion" className="mt-5" onClick={() => setOpen(false)}>
              Solicitar cotización
            </ButtonLink>
          </nav>
        </Container>
      </div>
    </header>
  );
}
