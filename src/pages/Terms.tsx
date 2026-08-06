import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { TERMS_SECTIONS } from '../data/staticPageCopy';

export default function Terms() {
  return (
    <PageLayout title="Terms of Use">
      <SEO
        title="Terms of Use | Interdot"
        description="Terms of use for Interdot custom AI agent services and free AI ecommerce writing tools operated by FIX FIGURES LLC."
        path="/terms"
      />
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mono-label mb-4">Legal</h2>
          <h1 className="text-5xl font-bold mb-12">Terms of Use</h1>

          <div className="prose prose-invert max-w-none space-y-8 text-white/70 leading-relaxed">
            {TERMS_SECTIONS.map((section) => (
              <section
                key={section.heading}
                className={
                  section.heading === 'Non-Reliance Clause'
                    ? 'glass p-8 rounded-2xl border-red-500/20'
                    : undefined
                }
              >
                <h2
                  className={
                    section.heading === 'Non-Reliance Clause'
                      ? 'text-xl font-bold text-red-500 mb-4'
                      : 'text-2xl font-bold text-white mb-4'
                  }
                >
                  {section.heading}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="mb-4 last:mb-0 text-sm md:text-base">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-brand-border text-xs font-mono text-white/30">
            LAST UPDATED: AUGUST 03, 2026
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
