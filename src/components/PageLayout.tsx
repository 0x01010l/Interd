import { ReactNode } from 'react';
import { motion } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  path?: string;
  breadcrumbLabel?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
}

export default function PageLayout({
  children,
  title,
  description,
  path,
  breadcrumbLabel,
  jsonLd,
  noindex,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={title}
        description={description}
        path={path}
        breadcrumbLabel={breadcrumbLabel}
        jsonLd={jsonLd}
        noindex={noindex}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main className="flex-grow pt-16" id="main-content">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
