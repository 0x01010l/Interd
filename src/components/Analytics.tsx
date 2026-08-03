import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const CONSENT_KEY = 'interdot_cookie_consent_v1';
export const CONSENT_EVENT = 'interdot-consent-changed';
const GA_ID = 'G-CQY6T21J0M';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function loadGoogleTag() {
  if (typeof window === 'undefined') return;
  if (document.getElementById('ga-gtag-js')) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  const script = document.createElement('script');
  script.id = 'ga-gtag-js';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

function hasAnalyticsConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

/** Loads GA only after cookie "Accept"; tracks SPA route changes. */
export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    const enable = () => {
      if (hasAnalyticsConsent()) loadGoogleTag();
    };

    enable();
    window.addEventListener(CONSENT_EVENT, enable);
    return () => window.removeEventListener(CONSENT_EVENT, enable);
  }, []);

  useEffect(() => {
    if (!hasAnalyticsConsent() || typeof window.gtag !== 'function') return;
    window.gtag('config', GA_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location.pathname, location.search]);

  return null;
}
