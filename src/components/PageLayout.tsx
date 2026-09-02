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
      <Navbar />
      <main className="flex-grow pt-16" id="main-content">
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
