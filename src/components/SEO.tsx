import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../data/site';
import {
  breadcrumbJsonLd,
  definedTermSetJsonLd,
  getPageSeo,
  organizationJsonLd,
  webSiteJsonLd,
} from '../data/seo';

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noindex?: boolean;
  jsonLd?: object | object[];
  breadcrumbLabel?: string;
};

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(data: object | object[]) {
  const id = 'interdot-jsonld';
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(Array.isArray(data) ? data : [data]);
}

export default function SEO({
  title,
  description,
  path,
  keywords,
  noindex,
  jsonLd,
  breadcrumbLabel,
}: SEOProps) {
  const location = useLocation();
  const routePath = path ?? location.pathname;
  const defaults = getPageSeo(routePath);
  const pageTitle = title ?? defaults.title;
  const pageDesc = description ?? defaults.description;
  const pageKeywords = keywords ?? defaults.keywords;
  const canonical = `${SITE.url}${routePath === '/' ? '/' : routePath}`;

  useEffect(() => {
    document.title = pageTitle;
    setMeta('name', 'description', pageDesc);
    setMeta('name', 'author', SITE.legal);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1');
    if (pageKeywords?.length) setMeta('name', 'keywords', pageKeywords.join(', '));

    setLink('canonical', canonical);
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', pageDesc);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:site_name', SITE.name);
    setMeta('property', 'og:locale', 'en_US');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', pageDesc);

    const graphs: object[] = [organizationJsonLd(), webSiteJsonLd(), definedTermSetJsonLd()];
    if (breadcrumbLabel) graphs.push(breadcrumbJsonLd(routePath, breadcrumbLabel));
    if (jsonLd) graphs.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]));
    setJsonLd(graphs);
  }, [pageTitle, pageDesc, canonical, pageKeywords, noindex, jsonLd, breadcrumbLabel, routePath]);

  return null;
}
