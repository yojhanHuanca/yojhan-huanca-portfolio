import type { MetadataRoute } from 'next';
import { projects, siteUrl } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  return ['', '/projects', '/about', '/contacto', ...projects.map(({ slug }) => `/projects/${slug}`)]
    .map((path) => ({ url: `${siteUrl}${path}` }));
}
