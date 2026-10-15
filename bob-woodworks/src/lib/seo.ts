import type { Metadata } from "next";
import { site } from "@/config/site";
import { getRoute } from "@/config/routes";

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${site.url}/`).toString();
}

type Options = {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  image?: { url: string; alt: string; width?: number; height?: number };
  noindex?: boolean;
  languages?: Record<string, string>;
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata(o: Options): Metadata {
  const url = absoluteUrl(o.path);
  const images = o.image
    ? [{ url: absoluteUrl(o.image.url), alt: o.image.alt, width: o.image.width, height: o.image.height }]
    : undefined;

  return {
    title: { absolute: o.title },
    description: o.description,
    alternates: { canonical: url, ...(o.languages ? { languages: o.languages } : {}) },
    robots: o.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: o.type ?? "website",
      url,
      title: o.title,
      description: o.description,
      siteName: site.name,
      locale: site.ogLocale,
      images,
      ...(o.type === "article"
        ? { publishedTime: o.publishedTime, modifiedTime: o.modifiedTime }
        : {}),
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: o.title,
      description: o.description,
      images: images?.map((i) => i.url),
    },
  };
}

/** Metadata de una ruta definida en config/routes.ts. */
export function routeMetadata(path: string, extra?: Partial<Options>): Metadata {
  const r = getRoute(path);
  return buildMetadata({ path, title: r.title, description: r.description, ...extra });
}
