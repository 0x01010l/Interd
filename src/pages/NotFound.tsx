import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <PageLayout>
      <SEO title="Page not found | Interdot" description="The page you requested does not exist." noindex />
      <section className="py-32 text-center px-4">
        <p className="mono-label mb-4">404</p>
        <h1 className="text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          This URL is not part of the Interdot Reasoning-as-a-Service site.
        </p>
        <Link to="/" className="text-brand-accent font-bold hover:underline">
          Return home
        </Link>
      </section>
    </PageLayout>
  );
}
