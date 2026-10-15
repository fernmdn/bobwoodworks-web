import type { MetadataRoute } from "next";
import { routes } from "@/config/routes";
import { absoluteUrl } from "@/lib/seo";

// Sin lastModified: no se declaran fechas que no sean reales. Los artículos del blog
// (Etapa 5) añadirán su fecha de actualización real.
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
