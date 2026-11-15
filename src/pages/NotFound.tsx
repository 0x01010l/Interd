import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

export default function NotFound() {
  return (
    <PageLayout title="Page not found | Interdot" description="This page does not exist." noindex>
      <section className="px-4 py-32 text-center">
        <p className="mono-label mb-4 !text-brand-accent">404</p>
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-slate-500">This URL is not part of the Interdot advisory site.</p>
        <Link to="/" className="btn-primary mt-8">
          Return home
        </Link>
      </section>
    </PageLayout>
  );
}
