/**
 * Preparación multirregional. Hoy solo Monterrey (es-MX) está activa.
 * Para activar RGV Texas: definir contenido propio en inglés, cambiar `active` a true,
 * y pasar los equivalentes reales a `hreflangFor`. No se generan hreflang sin equivalentes.
 */
export type Region = {
  id: string;
  locale: string;
  pathPrefix: string; // "" = raíz
  active: boolean;
};

export const regions: Region[] = [
  { id: "mx-mty", locale: "es-MX", pathPrefix: "", active: true },
  { id: "us-rgv", locale: "en-US", pathPrefix: "/en", active: false },
];

/** Devuelve el mapa `languages` de Next solo si hay 2+ equivalentes reales activos. */
export function hreflangFor(
  equivalents: Partial<Record<string, string>>, // { "es-MX": "https://…", "en-US": "https://…" }
): Record<string, string> | undefined {
  const active = regions.filter((r) => r.active);
  const entries = active
    .map((r) => [r.locale, equivalents[r.locale]] as const)
    .filter((e): e is readonly [string, string] => Boolean(e[1]));
  return entries.length >= 2 ? Object.fromEntries(entries) : undefined;
}
