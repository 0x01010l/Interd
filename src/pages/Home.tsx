import ScrollWorld from '../components/ScrollWorld';
import SEO from '../components/SEO';
import { getPageSeo } from '../data/seo';

export default function Home() {
  const seo = getPageSeo('/');

  return (
    <>
      <SEO title={seo.title} description={seo.description} path="/" />
      <ScrollWorld />
    </>
  );
}
