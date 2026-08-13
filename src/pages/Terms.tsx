import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { SITE } from '../data/site';
import { TERMS_SECTIONS } from '../data/staticPageCopy';

export default function Terms() {
  return (
    <PageLayout>
      <SEO
        title={`Terms of Use | ${SITE.name}`}
        description="Terms for using Interdot Study educational guides. Not official exam board material."
        path="/terms"
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="font-serif text-4xl font-semibold mb-10">Terms of Use</h1>
        <div className="prose-study">
          {TERMS_SECTIONS.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
