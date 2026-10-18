import type { APIRoute } from 'astro';
import { site, services, projects } from '../lib/content';

export const GET: APIRoute = () => {
  const paths = ['', '/services', '/projects', '/about', '/contact',
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`)];
  const urls = paths.map((p) => `  <url><loc>${new URL(p || '/', site.siteUrl).href}</loc></url>`).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
