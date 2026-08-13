import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <PageLayout>
      <SEO title="Page not found | Interdot Study" description="This page does not exist." path="/404" />
      <section className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-4xl font-semibold mb-4">Page not found</h1>
        <p className="text-brand-muted mb-8">That URL is not a guide on Interdot Study.</p>
        <Link to="/guides" className="text-brand-accent font-semibold">
          Browse guides
        </Link>
      </section>
    </PageLayout>
  );
}
