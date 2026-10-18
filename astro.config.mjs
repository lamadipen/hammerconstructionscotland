import { defineConfig } from 'astro/config';
import site from './src/content/settings/site.json' with { type: 'json' };

export default defineConfig({
  site: site.siteUrl,
  build: {
    // about.astro -> about.html, served as /about by Firebase cleanUrls
    format: 'file',
  },
});
