import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#202320",
        ivory: "#F5F2EB",
        forest: "#354A3C",
        walnut: "#765A43",
        stone: "#A5A29A",
        // Derivado del carbón para texto secundario (6.4:1 sobre marfil).
        muted: "#55594F",
        // Marfil atenuado para texto secundario sobre fondos oscuros (9.2:1 sobre carbón).
        "ivory-dim": "#C9C5BA",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.5rem, 6vw, 4.75rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.875rem, 3.6vw, 2.875rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        h3: ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.25" }],
      },
      maxWidth: { page: "75rem", prose: "40rem" },
    },
  },
  plugins: [],
};
export default config;
