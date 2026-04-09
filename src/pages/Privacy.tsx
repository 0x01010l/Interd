import PageLayout from '../components/PageLayout';

export default function Privacy() {
  return (
    <PageLayout title="Privacy Policy">
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mono-label mb-4">Legal</h2>
          <h1 className="text-5xl font-bold mb-12">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-8 text-white/70 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Interdot ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, and safeguard your information when you use our 
                Reasoning-as-a-Service platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Data Collection & Usage</h2>
              <p>
                We collect information necessary to provide high-fidelity reasoning services. This includes 
                technical identifiers, API usage logs, and any data you explicitly provide for vector 
                training.
              </p>
            </section>

            <section className="glass p-8 rounded-2xl border-brand-accent/20">
              <h2 className="text-xl font-bold text-brand-accent mb-4">AI Reasoning & PII</h2>
              <p className="text-sm">
                Our reasoning engine is designed to process data at a structural and causal level. We 
                explicitly state that AI reasoning processes data without compromising individual 
                Personally Identifiable Information (PII). All vectorization processes employ 
                anonymization layers to ensure that causal logic is extracted without retaining 
                sensitive personal identifiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Encryption</h2>
              <p>
                All data is encrypted at rest and in transit using industry-standard protocols (AES-256 and 
                TLS 1.3). We employ strict access controls and regular security audits to ensure the 
                integrity of our reasoning environment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. GDPR & Global Compliance</h2>
              <p>
                We adhere to GDPR, CCPA, and other global data protection regulations. Users have the 
                right to access, rectify, or delete their data. For inquiries regarding data 
                sovereignty, please contact our Data Protection Officer at contact@interdot.net.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Cookies</h2>
              <p>
                We use essential cookies to maintain session integrity and platform performance. 
                Analytical cookies are used only with explicit consent to improve our reasoning 
                algorithms.
              </p>
            </section>
          </div>
          
          <div className="mt-16 pt-8 border-t border-brand-border text-xs font-mono text-white/30">
            LAST UPDATED: APRIL 09, 2026
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
