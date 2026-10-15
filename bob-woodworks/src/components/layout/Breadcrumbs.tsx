import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export type Crumb = { name: string; path: string };

/** `trail` NO incluye Inicio; se antepone automáticamente. La última migaja es la página actual. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all: Crumb[] = [{ name: "Inicio", path: "/" }, ...trail];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <Container as="nav" className="pt-6 text-sm text-muted">
        <ol aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-charcoal">{c.name}</span>
                ) : (
                  <>
                    <Link href={c.path} className="underline-offset-4 hover:underline">{c.name}</Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
