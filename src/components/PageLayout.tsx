import { ReactNode, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (title) {
      document.title = `${title} | Interdot`;
    } else {
      document.title = 'Interdot | Reasoning-as-a-Service';
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
    </div>
  );
}
