import { ReactNode, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import { useLocation } from 'react-router-dom';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Prefer <SEO /> when present; PageLayout title is a fallback for pages without it.
    if (title) {
      document.title = `${title} | Interdot`;
    }
  }, [pathname, title]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
