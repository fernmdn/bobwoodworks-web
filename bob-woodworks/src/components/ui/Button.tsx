import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "light";

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium transition-colors duration-200 min-h-12";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-ivory hover:bg-charcoal",
  secondary: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory",
  light: "bg-ivory text-charcoal hover:bg-ivory-dim",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Para enlaces externos (WhatsApp, redes): abre en pestaña nueva con rel seguro. */
  external?: boolean;
  onClick?: () => void;
};

export function ButtonLink({ href, children, variant = "primary", className = "", external, onClick }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}
