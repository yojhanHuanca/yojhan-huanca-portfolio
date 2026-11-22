export const categories = ['Frontend', 'Backend', 'Datos', 'Móvil y video', 'Herramientas'] as const;
type Category = (typeof categories)[number];

const entries: [string, string, string, Category, string][] = [
  ['React', 'react', '#61DAFB', 'Frontend', 'Interfaces con componentes reutilizables y vistas que reaccionan a los datos.'],
  ['Next.js', 'nextdotjs', '#F6FAFF', 'Frontend', 'Rutas, metadatos y renderizado del portafolio que estás viendo.'],
  ['Angular', 'angular', '#FF6FBD', 'Frontend', 'Aplicaciones estructuradas con componentes, rutas y servicios.'],
  ['TypeScript', 'typescript', '#6EB6FF', 'Frontend', 'Tipos para modelar datos y contratos entre componentes y servicios.'],
  ['JavaScript', 'javascript', '#F7DF1E', 'Frontend', 'Interacciones en el navegador e integración con servicios web.'],
  ['HTML', 'html5', '#FF875F', 'Frontend', 'Estructura semántica y accesible para interfaces web.'],
  ['CSS', 'css', '#A899FF', 'Frontend', 'Diseño adaptable y animaciones para la web.'],
  ['Tailwind CSS', 'tailwindcss', '#57E1ED', 'Frontend', 'Estilos utilitarios y composición adaptable.'],
  ['Node.js', 'nodedotjs', '#9FE078', 'Backend', 'Entorno para ejecutar servicios con JavaScript y TypeScript.'],
  ['Express', 'express', '#F6FAFF', 'Backend', 'Rutas HTTP y lógica para APIs REST.'],
  ['NestJS', 'nestjs', '#FA6786', 'Backend', 'Servicios de Node.js organizados en módulos e inyección de dependencias.'],
  ['Django', 'django', '#9DF1C6', 'Backend', 'Aplicaciones web y APIs con Python.'],
  ['Python', 'python', '#76B7E5', 'Backend', 'Programación de servicios y automatización de tareas.'],
  ['Java', 'openjdk', '#FFACA1', 'Backend', 'Desarrollo de aplicaciones y servicios en la JVM.'],
  ['Spring Boot', 'springboot', '#9CE584', 'Backend', 'Servicios y APIs con Java.'],
  ['Laravel', 'laravel', '#FF8B78', 'Backend', 'Aplicaciones web en PHP con rutas, modelos y controladores.'],
  ['PostgreSQL', 'postgresql', '#80C9FF', 'Datos', 'Base de datos relacional para persistencia y consultas SQL.'],
  ['MySQL', 'mysql', '#88CCE5', 'Datos', 'Persistencia relacional para catálogos y aplicaciones de comercio.'],
  ['MongoDB', 'mongodb', '#8EF3A3', 'Datos', 'Base de datos de documentos para modelos flexibles.'],
  ['Prisma', 'prisma', '#98E0D1', 'Datos', 'Consultas tipadas y modelado de datos desde TypeScript.'],
  ['Redis', 'redis', '#FF818F', 'Datos', 'Almacenamiento en memoria para caché y colas.'],
  ['Kotlin', 'kotlin', '#CF9DFF', 'Móvil y video', 'Desarrollo de aplicaciones Android con tipado estático.'],
  ['Jetpack Compose', 'jetpackcompose', '#81DFF0', 'Móvil y video', 'Interfaces declarativas para aplicaciones Android.'],
  ['Flutter', 'flutter', '#74D7FF', 'Móvil y video', 'Desarrollo de interfaces móviles multiplataforma.'],
  ['FFmpeg', 'ffmpeg', '#A4E98B', 'Móvil y video', 'Procesamiento, conversión y recorte de audio y video.'],
  ['Git', 'git', '#FF9A78', 'Herramientas', 'Control de versiones para trabajar con cambios e historial.'],
  ['GitHub', 'github', '#F6FAFF', 'Herramientas', 'Repositorios y colaboración alrededor del código.'],
  ['Docker', 'docker', '#65C0FF', 'Herramientas', 'Entornos reproducibles mediante contenedores.'],
  ['Postman', 'postman', '#FFAB7D', 'Herramientas', 'Exploración y validación de solicitudes a APIs.'],
  ['Figma', 'figma', '#F3B2FF', 'Herramientas', 'Diseño y prototipos para interfaces.'],
];

export const technologies = entries.map(([name, slug, color, category, description]) => ({ name, slug, color, category, description }));
export type Technology = (typeof technologies)[number];
