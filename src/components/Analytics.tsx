import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCookieConsent, type ConsentValue } from './CookieConsent';

const GA_ID = 'G-CQY6T21J0M';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function loadGtag() {
  if (document.getElementById('interdot-gtag')) return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }
  const script = document.createElement('script');
  script.id = 'interdot-gtag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

/** Loads GA after Accept all; tracks SPA pageviews when allowed. */
export default function Analytics() {
  const location = useLocation();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const apply = (value: ConsentValue | null) => {
      if (value === 'accepted') {
        loadGtag();
        setAllowed(true);
      } else {
        setAllowed(false);
      }
    };

    apply(getCookieConsent());

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<ConsentValue>).detail;
      apply(detail);
    };
    window.addEventListener('interdot-consent', onConsent);
    return () => window.removeEventListener('interdot-consent', onConsent);
  }, []);

  useEffect(() => {
    if (!allowed || typeof window.gtag !== 'function') return;
    window.gtag('config', GA_ID, {
      page_path: location.pathname + location.search,
      anonymize_ip: true,
    });
  }, [allowed, location.pathname, location.search]);

  return null;
}
