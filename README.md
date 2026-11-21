# Portafolio de Yojhan Huanca Yucra

Portafolio profesional en Next.js con proyectos de desarrollo web, aplicaciones empresariales y video con inteligencia artificial.

## Ejecutar en local

```bash
npm ci
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Para compilar la versión de producción, ejecuta `npm run build`.

## Rutas del portafolio

- `/` presenta el perfil, el carrusel de proyectos y el acceso a contacto.
- `/projects` permite buscar proyectos por nombre o tecnología y filtrar por categoría.
- `/projects/[slug]` muestra la ficha y la imagen de cada proyecto.
- `/about` resume la formación, la experiencia y las tecnologías.
- `/contacto` muestra el correo y el perfil de GitHub.
- `/sitemap.xml` y `/robots.txt` se generan a partir de las rutas y del dominio de producción.

## Vercel y dominio

Vercel detecta el proyecto como Next.js. La URL de producción de Vercel se usa de forma automática mientras no se configure un dominio propio. Tras asociar y verificar el dominio, configura `SITE_URL` en el entorno de producción con su origen completo, por ejemplo `https://ejemplo.com`, y vuelve a desplegar. Los enlaces canónicos, el sitemap y la referencia del sitemap en `robots.txt` usarán ese dominio.

Las capturas y fotos de los proyectos proceden de sus repositorios. Cada ficha distingue una captura de la interfaz de una foto o banner del repositorio.
