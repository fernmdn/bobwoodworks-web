import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

type Json = Record<string, unknown>;

const areaServed = () =>
  site.serviceArea.map((name) => ({ "@type": "City", name }));

/** Organization: solo datos presentes y verificables. */
export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    ...(site.logoPath ? { logo: absoluteUrl(site.logoPath) } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.social.length ? { sameAs: site.social } : {}),
  };
}

/**
 * LocalBusiness solo se emite con NEXT_PUBLIC_BUSINESS_VERIFIED=true.
 * La dirección postal solo aparece si se autorizó publicarla.
 */
export function localBusinessSchema(): Json | null {
  if (!site.businessVerified) return null;
  const w = site.workshop;
  const address =
    w.publishAddress && w.streetAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: w.streetAddress,
            addressLocality: "San Pedro Garza García",
            addressRegion: "Nuevo León",
            addressCountry: "MX",
            ...(w.postalCode ? { postalCode: w.postalCode } : {}),
          },
        }
      : {};
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": absoluteUrl("/#localbusiness"),
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    areaServed: areaServed(),
    ...(site.logoPath ? { logo: absoluteUrl(site.logoPath), image: absoluteUrl(site.logoPath) } : {}),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.social.length ? { sameAs: site.social } : {}),
    ...address,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
