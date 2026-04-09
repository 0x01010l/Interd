import PageLayout from '../components/PageLayout';
import { HelpCircle, ChevronRight } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      q: "How do you prevent hallucinations?",
      a: "Our engine uses a deterministic reasoning layer that requires every output to be synthesized from a verifiable chain of vector relationships. If a logic path cannot be validated against the source data, the system flags it as 'Inconclusive' rather than guessing."
    },
    {
      q: "What is the latency of the reasoning API?",
      a: "Our core engine is optimized for high-frequency environments. Standard reasoning synthesis for complex financial vectors averages 12-15ms. Custom deep-vector training models may vary based on dataset complexity."
    },
    {
      q: "How is data vectorized for cybersecurity?",
      a: "We map network behaviors, adversary tactics (MITRE ATT&CK), and system logs into a multi-dimensional vector space. This allows our engine to reason across disparate data sources to identify the logical progression of a threat."
    },
    {
      q: "Is my proprietary data used to train global models?",
      a: "No. Interdot employs strict data isolation protocols. Custom vector training is performed in siloed environments, and your data never leaks into our baseline reasoning engine."
    },
    {
      q: "Can I audit the reasoning chains?",
      a: "Yes. Every API response includes a 'Logic Trace' object—a step-by-step breakdown of the causal relationships the engine used to reach its conclusion."
    }
  ];

  return (
    <PageLayout title="FAQ">
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="mono-label mb-4">Technical FAQ</h2>
            <h1 className="text-5xl font-bold mb-8">Inside the Engine</h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Deep dives into the mechanics of reasoning-as-a-service.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bento-card group">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <HelpCircle className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-brand-accent transition-colors">
                      {faq.q}
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 glass p-12 rounded-[2.5rem] text-center">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-white/60 mb-8">
              Our technical team is available for deep-dive consultations.
            </p>
            <button className="inline-flex items-center space-x-2 text-brand-accent font-bold hover:underline">
              <span>Contact Technical Support</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
