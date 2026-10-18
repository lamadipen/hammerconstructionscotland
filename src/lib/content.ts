// Loads the JSON content files edited through the CMS (/admin).
// Singletons are imported directly; folder collections are globbed so new
// entries created in the CMS are picked up automatically on the next build.
import { marked } from 'marked';
import siteData from '../content/settings/site.json';
import homeData from '../content/pages/home.json';
import aboutData from '../content/pages/about.json';
import contactData from '../content/pages/contact.json';

export interface Link { label: string; link: string }

export interface Service {
  slug: string;
  title: string;
  order?: number;
  summary: string;
  image: string;
  intro?: string;
  body?: string;
  features?: string[];
}

export interface Project {
  slug: string;
  title: string;
  service: string;
  location?: string;
  date?: string;
  featured?: boolean;
  order?: number;
  image: string;
  summary?: string;
  body?: string;
  gallery?: string[];
}

export interface Testimonial {
  slug: string;
  name: string;
  location?: string;
  service?: string;
  rating?: number;
  order?: number;
  quote: string;
}

export const site = siteData;
export const home = homeData;
export const about = aboutData;
export const contact = contactData;

function loadFolder<T extends { slug: string; order?: number }>(
  files: Record<string, { default: Omit<T, 'slug'> }>,
): T[] {
  return Object.entries(files)
    .map(([path, mod]) => ({ ...mod.default, slug: path.split('/').pop()!.replace(/\.json$/, '') }) as T)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.slug.localeCompare(b.slug));
}

export const services = loadFolder<Service>(
  import.meta.glob('../content/services/*.json', { eager: true }),
);
export const projects = loadFolder<Project>(
  import.meta.glob('../content/projects/*.json', { eager: true }),
);
export const testimonials = loadFolder<Testimonial>(
  import.meta.glob('../content/testimonials/*.json', { eager: true }),
);

export const serviceTitle = (slug: string) =>
  services.find((s) => s.slug === slug)?.title ?? slug.replace(/-/g, ' ');

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Short headline text: `*word*` becomes the highlighted gradient word, new lines become <br>. */
export const rich = (text = '') =>
  escape(text).replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');

/** Long-form Markdown fields (service details, project write-ups, about story). */
export const md = (text = '') => marked.parse(text, { async: false });

/** "07123 456 789" -> "tel:+447123456789" */
export const telHref = (phone: string) => {
  const digits = phone.replace(/[^\d+]/g, '');
  return 'tel:' + (digits.startsWith('0') ? '+44' + digits.slice(1) : digits);
};

export const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : '';
