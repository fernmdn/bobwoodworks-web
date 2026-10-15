import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { site, whatsappUrl } from "@/config/site";
import { getRoute, mainNav, servicePaths } from "@/config/routes";

const linkCls = "text-ivory-dim underline-offset-4 hover:text-ivory hover:underline";

export function Footer() {
  const wa = whatsappUrl();
  return (
    <footer className="on-dark bg-charcoal text-ivory">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 font-serif text-xl text-ivory">{site.slogan}</p>
          <p className="mt-3 max-w-xs text-sm text-ivory-dim">
            Restauración, renovación y acabados de madera. Atención exclusivamente con cita previa.
          </p>
        </div>

        <nav aria-label="Servicios" className="md:col-span-3">
          <h2 className="font-serif text-lg text-ivory">Servicios</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {servicePaths.map((p) => (
              <li key={p}>
                <Link href={p} className={linkCls}>{getRoute(p).label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Sitio" className="md:col-span-2">
          <h2 className="font-serif text-lg text-ivory">Sitio</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {mainNav.map((p) => (
              <li key={p}>
                <Link href={p} className={linkCls}>{getRoute(p).label}</Link>
              </li>
            ))}
            <li>
              <Link href="/aviso-de-privacidad" className={linkCls}>Aviso de privacidad</Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-serif text-lg text-ivory">Zona de atención</h2>
          <p className="mt-4 text-sm text-ivory-dim">
            {site.serviceArea.join(", ")}. {site.serviceAreaNote}
          </p>
          <p className="mt-3 text-sm text-ivory-dim">Taller en {site.workshop.area}.</p>
          <ul className="mt-4 space-y-2 text-sm">
            {wa && (
              <li><a href={wa} className={linkCls} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            )}
            {site.contact.phone && (
              <li><a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className={linkCls}>{site.contact.phone}</a></li>
            )}
            {site.contact.email && (
              <li><a href={`mailto:${site.contact.email}`} className={linkCls}>{site.contact.email}</a></li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-ivory/15">
        <Container className="py-6 text-xs text-ivory-dim">
          © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
        </Container>
      </div>
    </footer>
  );
}
