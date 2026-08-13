import { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import { useLocation } from 'react-router-dom';

export default function PageLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="content" className="flex-grow">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
