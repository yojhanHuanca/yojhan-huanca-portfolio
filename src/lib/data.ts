export const personalInfo = {
  name: 'Yojhan Huanca Yucra',
  title: 'Desarrollador de software',
  description: 'Portafolio de Yojhan Huanca Yucra, estudiante de Diseño y Desarrollo de Software en TECSUP. Proyectos de desarrollo web, móvil e inteligencia artificial.',
  email: 'yojhanhuanca@tecsup.edu.pe',
  github: 'https://github.com/yojhanHuanca',
};

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = (process.env.SITE_URL || (productionHost ? `https://${productionHost}` : '')).replace(/\/+$/, '');

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  context: string;
  image: string;
  imageAlt: string;
  imageKind: 'screenshot' | 'brand';
  technologies: string[];
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: 'autoclipper',
    title: 'AutoClipper',
    category: 'Video e inteligencia artificial',
    description: 'Transforma videos largos en clips cortos con transcripción asistida por IA.',
    context: 'Proyecto de fin de carrera en TECSUP. Reúne el procesamiento de video, la transcripción y la selección y edición de fragmentos.',
    image: '/art/autoclipper.webp',
    imageAlt: 'Editor de AutoClipper con vista previa vertical, subtítulos y línea de tiempo',
    imageKind: 'screenshot',
    technologies: ['Angular', 'FFmpeg', 'Whisper', 'APIs de IA'],
    githubUrl: 'https://github.com/yojhanHuanca/AutocliPper-final-pro',
  },
  {
    slug: 'linea-1',
    title: 'Seguridad Operativa · Línea 1',
    category: 'Software empresarial',
    description: 'Registro de hallazgos, incidentes y planes de acción de seguridad operativa.',
    context: 'Participé durante mi pasantía en Línea 1 del Metro de Lima. El sistema reúne el registro y el seguimiento de casos en una sola plataforma.',
    image: '/art/linea-1.webp',
    imageAlt: 'Banner visual del repositorio del sistema de Línea 1',
    imageKind: 'brand',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
  },
  {
    slug: 'dcampo',
    title: 'D’Campo',
    category: 'Comercio electrónico',
    description: 'Tienda de productos naturales con catálogo, cuentas de usuario y flujo de compra.',
    context: 'El proyecto reúne la administración del catálogo y el recorrido de compra para productos como mieles, harinas y derivados de la palta.',
    image: '/art/dcampo.webp',
    imageAlt: 'Fotografía de palta utilizada en el sitio de D’Campo',
    imageKind: 'brand',
    technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
    githubUrl: 'https://github.com/yojhanHuanca/D_Campo_web',
  },
  {
    slug: 'cinnsin',
    title: 'CinnSin',
    category: 'Entretenimiento',
    description: 'Cartelera web de cine que consume datos de películas de TMDB.',
    context: 'Proyecto web en React y TypeScript para explorar películas. La captura muestra la integración de la cartelera con los datos de TMDB.',
    image: '/art/cinnsin.webp',
    imageAlt: 'Interfaz de CinnSin con la cartelera de películas de TMDB',
    imageKind: 'screenshot',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'TMDB API'],
    githubUrl: 'https://github.com/yojhanHuanca/CinnSin',
  },
];
