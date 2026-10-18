import type { APIRoute } from 'astro';
import { site } from '../lib/content';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nDisallow: /admin\n\nSitemap: ${new URL('/sitemap.xml', site.siteUrl).href}\n`);
