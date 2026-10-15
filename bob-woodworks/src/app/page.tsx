import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";
import { routeMetadata } from "@/lib/seo";

export const metadata = routeMetadata("/");

/** Hero provisional de la Etapa 1. La homepage completa se construye en la Etapa 2. */
export default function HomePage() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <h1 className="max-w-4xl text-display">Restauración y renovación de muebles en Monterrey</h1>
        <p className="mt-8 max-w-prose text-lg text-muted">
          Recuperamos, renovamos y transformamos muebles, puertas y cocinas mediante procesos especializados
          de preparación y acabado.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/contacto#cotizacion">Solicitar cotización</ButtonLink>
          <ButtonLink href="/proyectos" variant="secondary">Explorar proyectos</ButtonLink>
        </div>
        <p className="mt-10 text-sm text-muted">
          Taller en {site.workshop.area}. Atención con cita previa.
        </p>
      </Container>
    </section>
  );
}
