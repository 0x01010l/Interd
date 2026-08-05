import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';

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
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Interdot, a brand operated by FIX FIGURES LLC (“we,” “our,” or “us”), is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, and safeguard your information when you use our
                custom AI agent services and free AI writing tools at interdot.net.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Data Collection &amp; Usage</h2>
              <p>
                We collect information necessary to provide high-fidelity reasoning services and website functionality. This may include 
                technical identifiers (such as IP address for abuse prevention and rate limiting), API usage logs, contact form submissions,
                and any data you explicitly provide for vector training or enterprise services.
              </p>
            </section>

            <section className="glass p-8 rounded-2xl border-brand-accent/20">
              <h2 className="text-xl font-bold text-brand-accent mb-4">3. AI Tools &amp; Azure OpenAI</h2>
              <p className="text-sm mb-4">
                Our free ecommerce AI tools send your prompts to Microsoft Azure OpenAI for processing so we can return generated text.
                User inputs submitted to these tools are not stored in an Interdot user content database. Prompts are transmitted to Azure
                solely to generate a response and for short-lived operational needs such as in-memory rate limiting and identical-request caching
                (cache entries expire automatically).
              </p>
              <p className="text-sm">
                Do not submit passwords, payment card numbers, government IDs, or other highly sensitive personal data into tool prompts.
                Generation history saved in your browser (localStorage) stays on your device and is not uploaded to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
              <p>
                We use essential cookies and similar technologies to maintain session integrity and platform performance.
                Analytical cookies may be used to understand aggregate traffic patterns. Where required by law, non-essential cookies
                are used only with appropriate consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Google AdSense &amp; Advertising</h2>
              <p>
                We may display advertisements through Google AdSense or similar partners. Third-party vendors, including Google, may use
                cookies to serve ads based on a user&apos;s prior visits to this or other websites. You can opt out of personalized advertising
                by visiting Google&apos;s Ads Settings. Ad slots on tool pages may appear as placeholders until ads are enabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Data Encryption</h2>
              <p>
                Data in transit is protected using TLS. Enterprise reasoning workloads additionally employ encryption at rest
                using industry-standard protocols and access controls.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. GDPR &amp; Global Compliance</h2>
              <p>
                We adhere to GDPR, CCPA, and other applicable data protection regulations. Users may request access, rectification,
                or deletion of personal data we hold by contacting contact@interdot.net.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Children&apos;s Privacy</h2>
              <p>
                Our services are not directed to children under 13, and we do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact</h2>
              <p>
                Privacy questions: contact@interdot.net. Mailing address: 6545 Market Avenue North, North Canton, 44721, OH, US.
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
