import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { PRIVACY_SECTIONS } from '../data/staticPageCopy';

export default function Privacy() {
  return (
    <PageLayout title="Privacy Policy">
      <SEO
        title="Privacy Policy | Interdot"
        description="Interdot privacy policy for custom AI agents and free tools — covering Azure OpenAI processing, cookies, Google AdSense, and how tool inputs are handled."
        path="/privacy-policy"
      />

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mono-label mb-4">Legal</h2>
          <h1 className="text-5xl font-bold mb-12">Privacy Policy</h1>

          <div className="prose prose-invert max-w-none space-y-8 text-white/70 leading-relaxed">
            {PRIVACY_SECTIONS.map((section) => (
              <section
                key={section.heading}
                className={
                  section.heading.startsWith('3.')
                    ? 'glass p-8 rounded-2xl border-brand-accent/20'
                    : undefined
                }
              >
                <h2
                  className={
                    section.heading.startsWith('3.')
                      ? 'text-xl font-bold text-brand-accent mb-4'
                      : 'text-2xl font-bold text-white mb-4'
                  }
                >
                  {section.heading}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="mb-4 last:mb-0">
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
