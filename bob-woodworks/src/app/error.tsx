"use client";

import { Container } from "@/components/ui/Container";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <h1 className="max-w-3xl text-h2">Algo salió mal al cargar la página</h1>
        <p className="mt-6 max-w-prose text-muted">
          Intenta cargarla de nuevo. Si el problema continúa, escríbenos y lo revisamos.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-forest px-6 py-3 text-base font-medium text-ivory hover:bg-charcoal"
        >
          Intentar de nuevo
        </button>
      </Container>
    </section>
  );
}
