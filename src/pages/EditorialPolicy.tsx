import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { SITE } from '../data/site';
import { AUTHORS, EDITORIAL_POLICY_SECTIONS, REVIEWERS } from '../data/editorial';

export default function EditorialPolicy() {
  return (
    <PageLayout>
      <SEO
        title={`Editorial policy | ${SITE.name}`}
        description="How Interdot Study assigns writers, reviews guides, cites sources, and handles corrections."
        path="/editorial-policy"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Editorial policy',
          url: `${SITE.url}/editorial-policy`,
          publisher: { '@type': 'Organization', name: SITE.name, legalName: SITE.legal },
        }}
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <p className="eyebrow mb-3">Publisher</p>
        <h1 className="font-serif text-4xl font-semibold mb-10">Editorial policy</h1>
        <div className="prose-study">
          {EDITORIAL_POLICY_SECTIONS.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </section>
          ))}
          <h2>Writers</h2>
          <ul>
            {AUTHORS.map((a) => (
              <li key={a.id}>
                <strong>{a.name}</strong> — {a.role}. {a.credentials}. {a.bio}
              </li>
            ))}
          </ul>
          <h2>Reviewers</h2>
          <ul>
            {REVIEWERS.map((r) => (
              <li key={r.id}>
                <strong>{r.name}</strong> — {r.role}. {r.credentials}. {r.bio}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10">
          <Link to="/about" className="text-brand-accent font-semibold">
            About the publisher →
          </Link>
        </p>
      </section>
    </PageLayout>
  );
}
