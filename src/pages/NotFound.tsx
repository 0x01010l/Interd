import { Link } from 'react-router-dom';
import { ArrowLeft, SearchX } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <PageLayout title="Page Not Found">
      <SEO
        title="Page Not Found | Interdot"
        description="The page you requested could not be found on Interdot."
        path="/404"
      />
      <section className="py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center mx-auto mb-8">
            <SearchX className="w-8 h-8 text-brand-accent" />
          </div>
          <p className="mono-label mb-4">Error 404</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Page not found</h1>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            This URL doesn&apos;t match any page on Interdot. Check the address, or head back to
            a working section of the site.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white px-6 py-3 rounded-xl font-bold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/tools"
              className="glass hover:bg-white/5 text-white px-6 py-3 rounded-xl font-bold transition-all"
            >
              Free Tools
            </Link>
            <Link to="/contact" className="text-white/50 hover:text-white transition-colors text-sm">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
