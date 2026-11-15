import { lazy, Suspense } from 'react';
import SEO from '../components/SEO';
import { getPageSeo } from '../data/seo';

const ScrollWorld = lazy(() => import('../components/ScrollWorld'));

export default function Home() {
  const seo = getPageSeo('/');

  return (
    <>
      <SEO title={seo.title} description={seo.description} path="/" />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white/50">
            Loading the world…
          </div>
        }
      >
        <ScrollWorld />
      </Suspense>
    </>
  );
}
