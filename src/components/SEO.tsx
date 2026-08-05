import { useEffect } from 'react';

type SEOProps = {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  type?: 'website' | 'article' | 'profile';
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function SEO({
  title,
  description,
  path,
  keywords,
  jsonLd,
  type = 'website',
}: SEOProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    upsertMeta('name', 'googlebot', 'index, follow');
    if (keywords) upsertMeta('name', 'keywords', keywords);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', 'Interdot');
    upsertMeta('property', 'og:locale', 'en_US');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    if (path) {
      const canonicalHref = `${window.location.origin}${path}`;
      let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonicalHref;
      upsertMeta('property', 'og:url', canonicalHref);
    }

    const scriptId = 'interdot-jsonld';
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script) script.remove();
    };
  }, [title, description, path, keywords, jsonLd, type]);

  return null;
}
