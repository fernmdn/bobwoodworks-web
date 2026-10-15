#!/usr/bin/env node
// Verifica que (1) cada ruta de config/routes.ts tenga su page.tsx y
// (2) cada enlace interno literal en src/ apunte a una ruta existente.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const appDir = join(root, "src", "app");
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

// Rutas existentes: carpetas con page.tsx, ignorando (grupos) y excluyendo segmentos dinámicos.
const existing = new Set(
  walk(appDir)
    .filter((f) => /(^|[\\/])page\.(tsx|mdx)$/.test(f))
    .map((f) => {
      const segs = relative(appDir, f).split(sep).slice(0, -1).filter((s) => !/^\(.*\)$/.test(s));
      return "/" + segs.join("/");
    }),
);
const hasDynamic = (p) =>
  [...existing].some((r) => r.includes("[") && new RegExp("^" + r.replace(/\[[^\]]+\]/g, "[^/]+") + "$").test(p));
const exists = (p) => existing.has(p) || hasDynamic(p);

const routesSrc = readFileSync(join(root, "src/config/routes.ts"), "utf8");
const declared = [...routesSrc.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);

const problems = [];
for (const p of declared) if (!exists(p)) problems.push(`Ruta declarada sin página: ${p}`);

const srcFiles = walk(join(root, "src")).filter((f) => /\.(tsx?|mdx)$/.test(f) && !f.endsWith(join("config", "routes.ts")));
const seen = new Set();
for (const f of srcFiles) {
  const txt = readFileSync(f, "utf8");
  for (const m of txt.matchAll(/(?:href|path)=?[:=]?\s*[{]?["'](\/[a-z0-9\-/]*)(?:[#?][^"']*)?["']/g)) {
    const p = m[1].replace(/\/$/, "") || "/";
    if (p.startsWith("/api") || p.startsWith("/brand")) continue;
    const key = `${relative(root, f)} → ${p}`;
    if (!exists(p) && !seen.has(key)) {
      seen.add(key);
      problems.push(`Enlace roto en ${key}`);
    }
  }
}

console.log(`Rutas con página: ${[...existing].sort().join(", ") || "(ninguna)"}`);
if (problems.length) {
  console.error(`\n${problems.length} problema(s):\n- ` + problems.join("\n- "));
  process.exit(process.argv.includes("--allow-missing") ? 0 : 1);
}
console.log("OK: todas las rutas declaradas existen y los enlaces internos resuelven.");
