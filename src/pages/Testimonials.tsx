import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Testimonials() {
  const scenarios = [
    {
      niche: 'Ecommerce listing ops',
      title: 'Catalog refresh without blank pages',
      summary:
        'A mid-size DTC team needs unique PDP copy across hundreds of SKUs. Illustrative workflow: use free Interdot writing tools for first drafts, then brief a custom catalog agent grounded on brand voice and prohibited claims.',
      outcome: 'Faster drafts, human QA still required',
    },
    {
      niche: 'Finance decision support',
      title: 'Audit-ready reasoning traces',
      summary:
        'A risk ops desk needs explanations they can review. Illustrative workflow: a custom finance agent that maps approved data into step-by-step rationale instead of opaque score-only outputs.',
      outcome: 'Clearer handoffs to analysts',
    },
    {
      niche: 'Security operations',
      title: 'Threat narrative assistants',
      summary:
        'A SOC wants structured first-pass narratives from alerts and logs. Illustrative workflow: a custom security agent that summarizes likely attack paths from provided telemetry — with analyst confirmation before action.',
      outcome: 'Faster triage, humans keep control',
    },
  ];

  return (
    <PageLayout>
      <SEO
        title="Illustrative Agent Scenarios | Interdot"
        description="Illustrative Interdot custom AI agent scenarios for ecommerce, finance, and cybersecurity — examples of how teams use agents and free tools, not client testimonials."
        path="/scenarios"
        keywords="Interdot agent scenarios, ecommerce AI agents, finance AI agents, cybersecurity AI agents"
      />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="mono-label mb-4">Scenarios</h2>
            <h1 className="text-5xl font-bold mb-8">Illustrative agent use cases</h1>
            <p className="text-xl text-white/60 leading-relaxed mb-6">
              These are example workflows that show how Interdot custom agents and free tools can fit
              real business niches. They are <span className="text-white/80">illustrative</span> — not
              client testimonials, case studies, or performance guarantees.
            </p>
            <p className="text-sm text-white/40 leading-relaxed">
              Named companies or fabricated quotes are not used here. For publisher identity, see{' '}
              <Link to="/about" className="text-brand-accent hover:underline">
                About
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scenarios.map((item) => (
              <div key={item.title} className="bento-card flex flex-col justify-between group">
                <div>
                  <div className="mono-label mb-4">{item.niche}</div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-brand-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed mb-6">{item.summary}</p>
                </div>
                <div className="pt-6 border-t border-brand-border">
                  <div className="mono-label mb-1">Example outcome</div>
                  <div className="text-sm text-white/80">{item.outcome}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 bento-card bg-brand-accent/5 border-brand-accent/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <Activity className="w-full h-full text-brand-accent" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl font-bold mb-6">Want a custom agent for your niche?</h3>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Tell us about ecommerce, finance, or cybersecurity workflows — or start with free
                tools that already demonstrate our writing-agent approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-accent/90 transition-all"
                >
                  Talk to Interdot
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/tools"
                  className="inline-flex items-center justify-center text-white/70 hover:text-white transition-colors px-2 py-4"
                >
                  Try free tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
