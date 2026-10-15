import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";

/** Logo oficial si NEXT_PUBLIC_LOGO_PATH está definido; si no, wordmark tipográfico temporal. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-ivory" : "text-charcoal";
  return (
    <Link href="/" className={`inline-flex items-center ${color}`} aria-label={`${site.name}, ir al inicio`}>
      {site.logoPath ? (
        <Image src={site.logoPath} alt={site.name} width={160} height={48} priority className="h-10 w-auto" />
      ) : (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-2xl tracking-tight">Bob Woodworks</span>
          <span className={`mt-1 text-xs tracking-wide ${tone === "light" ? "text-ivory-dim" : "text-muted"}`}>
            Monterrey
          </span>
        </span>
      )}
    </Link>
  );
}
