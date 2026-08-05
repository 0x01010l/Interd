import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';

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
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
               By accessing or using the Interdot platform, operated by FIX FIGURES LLC and doing business as
    “Interdot,” you agree to be bound by these Terms of Use and all applicable laws and regulations.
    If you do not agree with these terms, you are prohibited from using the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Free AI Tools</h2>
              <p>
                Interdot provides free AI writing utilities for ecommerce content. Outputs are generated automatically and may contain errors.
                You are responsible for reviewing, editing, and verifying all generated content before publishing or relying on it commercially.
                Fair-use rate limits apply. Abuse, automated scraping, or attempts to bypass limits may result in blocked access.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
              <p>
                The &quot;Reasoning Layer,&quot; proprietary algorithms, vectorization protocols, website design, and guides
                are the exclusive intellectual property of Interdot / FIX FIGURES LLC.
                Subject to these terms, you may use tool outputs for your own business listings and marketing.
              </p>
            </section>

            <section className="glass p-8 rounded-2xl border-red-500/20">
              <h2 className="text-xl font-bold text-red-500 mb-4">Non-Reliance Clause</h2>
              <p className="text-sm">
                While Interdot provides high-fidelity reasoning, deterministic logic chains, and AI drafting tools, the 
                final financial, security, marketing, or strategic decisions rest solely with the user. Interdot 
                is not a financial advisor, licensed security firm, or legal counsel. Our outputs are intended to 
                assist in decision-making and drafting, not replace human judgment or professional consultation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Account Termination</h2>
              <p>
                We reserve the right to terminate or suspend access to our service immediately, without 
                prior notice or liability, for any reason whatsoever, including without limitation if 
                you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Governing Law</h2>
              <p>
                These terms shall be governed and construed in accordance with the laws of the State of Ohio, United States,
                without regard to its conflict of law provisions, unless mandatory local consumer law provides otherwise.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
              <p>
                In no event shall Interdot be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including without limitation, loss of profits, 
                data, or other intangible losses resulting from your use of the service or AI tools.
              </p>
            </section>
          </div>
          
          <div className="mt-16 pt-8 border-t border-brand-border text-xs font-mono text-white/30">
            LAST UPDATED: AUGUST 03, 2026
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
