import PageLayout from '../components/PageLayout';
import { Quote, ExternalLink, Activity } from 'lucide-react';

export default function Testimonials() {
  const caseStudies = [
    {
      quote: "The 'Logic Trace' feature changed how we approach high-frequency trading. We no longer just see the 'what'—we understand the causal chain behind every market shift.",
      author: "Dr. Elena Vance",
      role: "Chief Quant Analyst, Aether Capital",
      stats: { metric: "Alpha Increase", value: "+14.2%" }
    },
    {
      quote: "Interdot's automated recon predicted a multi-stage breach attempt three hours before our traditional SOC flagged it. The reasoning layer is our new baseline.",
      author: "Marcus Thorne",
      role: "CISO, Sentinel Defense Systems",
      stats: { metric: "Threat Detection", value: "3h Early" }
    },
    {
      quote: "Vector training on our proprietary datasets was seamless and, most importantly, secure. The deterministic outputs are now core to our decision-making stack.",
      author: "Sarah Chen",
      role: "VP of Engineering, NeoFinance",
      stats: { metric: "Model Accuracy", value: "99.9%" }
    }
  ];

  return (
    <PageLayout title="Case Studies">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <h2 className="mono-label mb-4">Case Studies</h2>
            <h1 className="text-5xl font-bold mb-8">Proven Logic. Real Results.</h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Leading institutions across Finance and Cybersecurity trust Interdot 
              to provide the reasoning layer for their most critical operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, i) => (
              <div key={i} className="bento-card flex flex-col justify-between group">
                <div>
                  <Quote className="w-10 h-10 text-brand-accent/20 mb-6 group-hover:text-brand-accent/40 transition-colors" />
                  <p className="text-lg text-white/80 italic mb-8 leading-relaxed">
                    "{study.quote}"
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-6 pt-6 border-t border-brand-border">
                    <div>
                      <div className="font-bold text-white">{study.author}</div>
                      <div className="text-xs text-white/40 font-mono uppercase tracking-wider">{study.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-brand-accent font-mono font-bold">{study.stats.value}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">{study.stats.metric}</div>
                    </div>
                  </div>
                  <button className="w-full glass py-3 rounded-xl text-xs font-mono uppercase tracking-widest hover:bg-white/5 flex items-center justify-center space-x-2">
                    <span>Read Full Case Study</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 bento-card bg-brand-accent/5 border-brand-accent/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <Activity className="w-full h-full text-brand-accent" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl font-bold mb-6">Join the 0.1%</h3>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                We work with a select group of partners to ensure the highest 
                fidelity of our reasoning engine. Apply for API access to see how 
                Interdot can transform your data intelligence.
              </p>
              <button className="bg-brand-accent text-white px-8 py-4 rounded-xl font-bold">
                Apply for Access
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
