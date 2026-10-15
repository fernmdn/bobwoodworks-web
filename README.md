# Bob Woodworks Monterrey — sitio web

Next.js (App Router) + TypeScript + Tailwind CSS, listo para Vercel.

## Estado
- Etapa 1 (base): completa. Config, layout, SEO utilities, sitemap, robots, 404.
- Etapas 2–6: homepage, servicios, formulario/analítica, blog/institucionales, documentación final.

`npm run check:routes` lista las páginas declaradas que aún no existen; debe quedar en verde al terminar la Etapa 5.

## Instalación
```bash
npm install
cp .env.example .env.local   # completa solo lo que esté confirmado
npm run dev                  # http://localhost:3000
npm run verify               # typecheck + lint + rutas + build
```
Requiere Node 20.9 o superior. Las fuentes se descargan de Google Fonts durante el build (requiere red).

## Datos del negocio
Todo vive en variables de entorno (ver `.env.example`) y se lee en `src/config/site.ts`.
Lo que no esté definido no se muestra ni aparece en JSON-LD.
