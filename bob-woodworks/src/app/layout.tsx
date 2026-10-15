import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import { getRoute, mainNav } from "@/config/routes";
import { localBusinessSchema, organizationSchema } from "@/lib/schema";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

// Los despliegues de vista previa de Vercel no deben indexarse.
const isPreview = process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== "production";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  robots: isPreview ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F2EB",
};

const nav = mainNav.map((href) => ({ href, label: getRoute(href).label }));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale} className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-forest focus:px-4 focus:py-3 focus:text-ivory"
        >
          Saltar al contenido
        </a>
        <Header nav={nav} />
        <main id="contenido">{children}</main>
        <Footer />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
