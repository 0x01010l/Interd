import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = 'G-CQY6T21J0M';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/** SPA pageview tracking; base gtag loads from index.html */
export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('config', GA_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location.pathname, location.search]);

  return null;
}
