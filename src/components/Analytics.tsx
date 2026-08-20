import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCookieConsent, type ConsentValue } from './CookieConsent';
import { SITE } from '../data/site';

const GA_ID = SITE.gaId;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function ensureGtag() {
  if (typeof window.gtag === 'function' && document.getElementById('interdot-gtag')) return;

  window.dataLayer = window.dataLayer || [];
  // Google’s snippet pushes the Arguments object; a rest-array breaks the queue processor.
  window.gtag = function gtag(..._args: unknown[]) {
    window.dataLayer.push(arguments as unknown as IArguments);
  };

  // Consent Mode v2 defaults before any config hits fire.
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
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
    send_to: GA_ID,
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
      // null = banner still open; defaults stay denied until they choose
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
    sendPageView(path);
  }, [allowed, location.pathname, location.search]);

  return null;
}
