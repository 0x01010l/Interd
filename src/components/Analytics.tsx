import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCookieConsent, type ConsentValue } from './CookieConsent';
import { SITE } from '../data/site';

const GA_ID = SITE.gaId;

declare global {
  interface Window {
    dataLayer: IArguments[];
    // Google’s public gtag signature is intentionally loose.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

function ensureGtag() {
  if (document.getElementById('interdot-gtag') && typeof window.gtag === 'function') return;

  window.dataLayer = window.dataLayer || [];
  // Exact Google snippet shape — no rest params (bundlers break `arguments` otherwise).
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });

  if (!document.getElementById('interdot-gtag')) {
    const script = document.createElement('script');
    script.id = 'interdot-gtag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });
}

function grantAnalyticsConsent() {
  ensureGtag();
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
  });
}

function denyAnalyticsConsent() {
  ensureGtag();
  window.gtag('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

function sendPageView(path: string) {
  if (typeof window.gtag !== 'function') return;
  // Re-config after consent grant is the most reliable GA4 SPA pattern.
  window.gtag('config', GA_ID, {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    page_title: document.title,
    anonymize_ip: true,
    send_page_view: true,
  });
}

/** Loads GA with Consent Mode; full analytics_storage only after Accept all. */
export default function Analytics() {
  const location = useLocation();
  const [allowed, setAllowed] = useState(() => getCookieConsent() === 'accepted');

  useEffect(() => {
    ensureGtag();

    const apply = (value: ConsentValue | null) => {
      if (value === 'accepted') {
        grantAnalyticsConsent();
        setAllowed(true);
      } else if (value === 'essential') {
        denyAnalyticsConsent();
        setAllowed(false);
      }
    };

    apply(getCookieConsent());

    const onConsent = (event: Event) => {
      apply((event as CustomEvent<ConsentValue>).detail);
    };
    window.addEventListener('interdot-consent', onConsent);
    return () => window.removeEventListener('interdot-consent', onConsent);
  }, []);

  useEffect(() => {
    if (!allowed) return;
    const path = location.pathname + location.search;
    // Defer one tick so consent('update') is applied before page_view/config.
    const t = window.setTimeout(() => sendPageView(path), 0);
    return () => window.clearTimeout(t);
  }, [allowed, location.pathname, location.search]);

  return null;
}
