/**
 * Fuente única de datos del negocio.
 * Todo dato de contacto o comercial viene de variables de entorno (ver .env.example).
 * Lo que no esté definido NO se muestra ni se publica en JSON-LD.
 */

const clean = (v: string | undefined) => (v && v.trim() !== "" ? v.trim() : undefined);
const digits = (v: string | undefined) => clean(v)?.replace(/\D/g, "");

const siteUrl = (clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(/\/+$/, "");

const whatsappDigits = digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);

export const site = {
  name: "Bob Woodworks Monterrey",
  shortName: "Bob Woodworks",
  slogan: "Siempre buscar el 100.",
  url: siteUrl,
  locale: "es-MX",
  ogLocale: "es_MX",
  description:
    "Taller de restauración, renovación y acabados de muebles, puertas y cocinas de madera en Monterrey y área metropolitana.",

  contact: {
    whatsapp: whatsappDigits, // solo dígitos, formato internacional
    phone: clean(process.env.NEXT_PUBLIC_PHONE),
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  },

  /** Zona pública del taller. La calle solo se publica con autorización expresa. */
  workshop: {
    area: "Valle Oriente, San Pedro Garza García, Nuevo León",
    appointmentOnly: true,
    publishAddress: process.env.NEXT_PUBLIC_PUBLISH_ADDRESS === "true",
    streetAddress: clean(process.env.NEXT_PUBLIC_STREET_ADDRESS),
    postalCode: clean(process.env.NEXT_PUBLIC_POSTAL_CODE),
  },

  hoursText: clean(process.env.NEXT_PUBLIC_HOURS_TEXT),

  serviceArea: [
    "Monterrey",
    "San Pedro Garza García",
    "Santa Catarina",
    "Guadalupe",
    "San Nicolás de los Garza",
  ],
  serviceAreaNote: "Y municipios cercanos, sujeto a disponibilidad.",

  social: (clean(process.env.NEXT_PUBLIC_SOCIAL_URLS) ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),

  logoPath: clean(process.env.NEXT_PUBLIC_LOGO_PATH),

  /** Activa JSON-LD LocalBusiness solo cuando los datos están verificados. */
  businessVerified: process.env.NEXT_PUBLIC_BUSINESS_VERIFIED === "true",
} as const;

export function whatsappUrl(message?: string): string | undefined {
  if (!site.contact.whatsapp) return undefined;
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
