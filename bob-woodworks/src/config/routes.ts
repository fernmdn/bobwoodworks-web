/**
 * Mapa de rutas públicas. Alimenta navegación, metadata, sitemap y el verificador de rutas.
 * Cada ruta tiene title y description únicos.
 */

export type RouteDef = {
  path: string;
  title: string;
  description: string;
  label: string; // texto corto para navegación y breadcrumbs
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

export const routes: RouteDef[] = [
  {
    path: "/",
    label: "Inicio",
    title: "Restauración y renovación de muebles | Bob Woodworks Monterrey",
    description:
      "Taller en San Pedro Garza García para restaurar, pintar y renovar muebles, puertas y cocinas de madera. Atención con cita previa en Monterrey y área metropolitana.",
    priority: 1,
    changeFrequency: "monthly",
  },
  {
    path: "/servicios",
    label: "Servicios",
    title: "Servicios de restauración y renovación | Bob Woodworks",
    description:
      "Restauración, pintura, puertas, cocinas, reparaciones y carpintería personalizada. Conoce cada servicio y las líneas Essential Finish, Renova Color y Woodcare.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/restauracion-de-muebles-monterrey",
    label: "Restauración de muebles",
    title: "Restauración de muebles de madera en Monterrey | Bob Woodworks",
    description:
      "Recuperamos mesas, sillas, vitrinas, cómodas y muebles antiguos: retiro de acabados, reparaciones localizadas, tintes y barnizado, con valoración previa.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/pintura-de-muebles-monterrey",
    label: "Pintura de muebles",
    title: "Pintura y renovación de muebles en Monterrey | Bob Woodworks",
    description:
      "Cambio de color y renovación de muebles de madera con preparación de superficie, primer cuando se requiere y acabado uniforme. Solicita tu cotización.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/restauracion-de-puertas-monterrey",
    label: "Puertas",
    title: "Restauración y pintura de puertas en Monterrey | Bob Woodworks",
    description:
      "Renovamos puertas principales, interiores y de acceso: preparación, correcciones localizadas, imprimante de adherencia y pintura de acabado, según alcance.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/renovacion-de-cocinas-monterrey",
    label: "Cocinas",
    title: "Renovación de cocinas en Monterrey | Bob Woodworks",
    description:
      "Actualiza tu cocina sin reemplazarla: pintura de puertas y frentes, cambio de color de gabinetes, correcciones cosméticas y herrajes, sujeto a valoración.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/reparacion-de-muebles-monterrey",
    label: "Reparaciones",
    title: "Reparación de muebles y puertas de madera | Bob Woodworks",
    description:
      "Reparaciones localizadas en muebles y puertas de madera, ajustes y recuperación funcional y estética según las condiciones de cada pieza.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/carpinteria-personalizada-monterrey",
    label: "Carpintería personalizada",
    title: "Carpintería personalizada en Monterrey | Bob Woodworks",
    description:
      "Proyectos seleccionados de fabricación y adaptación de mobiliario en madera, según complejidad y disponibilidad. Consulta tu proyecto.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/proyectos",
    label: "Proyectos",
    title: "Proyectos de restauración y renovación | Bob Woodworks",
    description:
      "Trabajos realizados de restauración, pintura y renovación de muebles, puertas y cocinas, con fotografías del proceso.",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/nosotros",
    label: "Nosotros",
    title: "Sobre Bob Woodworks Monterrey | Taller de restauración",
    description:
      "Conoce el taller, la forma de trabajo y el criterio técnico detrás de cada proyecto de restauración y acabados en madera.",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    path: "/contacto",
    label: "Contacto",
    title: "Solicitar cotización | Bob Woodworks Monterrey",
    description:
      "Cuéntanos tu proyecto y recibe una valoración. Atención con cita previa en Monterrey y área metropolitana.",
    priority: 0.9,
    changeFrequency: "yearly",
  },
  {
    path: "/blog",
    label: "Blog",
    title: "Blog de restauración y acabados de madera | Bob Woodworks",
    description:
      "Guías sobre restauración, pintura y cuidado de muebles, puertas y cocinas de madera.",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    path: "/aviso-de-privacidad",
    label: "Aviso de privacidad",
    title: "Aviso de privacidad | Bob Woodworks Monterrey",
    description:
      "Cómo tratamos los datos personales que compartes al solicitar una cotización con Bob Woodworks Monterrey.",
    priority: 0.3,
    changeFrequency: "yearly",
  },
];

export const servicePaths = routes
  .filter((r) => r.path.endsWith("-monterrey"))
  .map((r) => r.path);

export const mainNav = ["/servicios", "/proyectos", "/nosotros", "/blog", "/contacto"];

export function getRoute(path: string): RouteDef {
  const r = routes.find((x) => x.path === path);
  if (!r) throw new Error(`Ruta no definida en config/routes.ts: ${path}`);
  return r;
}
