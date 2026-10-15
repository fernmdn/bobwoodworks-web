import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: { absolute: "Página no encontrada | Bob Woodworks Monterrey" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <h1 className="max-w-3xl text-h2">No encontramos esta página</h1>
        <p className="mt-6 max-w-prose text-muted">
          Es posible que la dirección haya cambiado o que el enlace esté incompleto. Puedes volver al inicio
          o revisar nuestros servicios.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/">Ir al inicio</ButtonLink>
          <ButtonLink href="/servicios" variant="secondary">Ver servicios</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
