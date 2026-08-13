import { useEffect } from 'react';
import { SITE } from '../data/site';

type Props = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  jsonLd?: unknown;
  published?: string;
};

export default function SEO({ title, description, path, type = 'website', jsonLd, published }: Props) {
  useEffect(() => {
    const canonical = `${SITE.url}${path === '/' ? '/' : path}`;
    document.title = title;
    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = value;
    };
    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('name', 'author', SITE.legal);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:site_name', SITE.name);
    setMeta('property', 'og:locale', 'en_GB');
    setMeta('name', 'twitter:card', 'summary');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    if (published) setMeta('property', 'article:published_time', published);

    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;

    const id = 'interdot-jsonld';
    document.getElementById(id)?.remove();
    if (jsonLd) {
      const s = document.createElement('script');
      s.id = id;
      s.type = 'application/ld+json';
      s.text = JSON.stringify(jsonLd);
      document.head.appendChild(s);
    }
  }, [title, description, path, type, jsonLd, published]);

  return null;
}
