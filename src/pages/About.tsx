import PageLayout from '../components/PageLayout';
import { Target, Eye, ShieldCheck, Zap } from 'lucide-react';

export default function About() {
  return (
    <PageLayout title="About Us">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <h2 className="mono-label mb-4">Our Mission</h2>
            <h1 className="text-5xl font-bold mb-8">Bridging the Gap between Raw Data and Decision.</h1>
            <p className="text-xl text-white/60 leading-relaxed">
              In an era of information overload, the bottleneck is no longer data 
              collection—it's reasoning. Interdot was founded to provide 
              deterministic, audit-ready AI outputs that leaders can trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="bento-card">
              <Target className="w-10 h-10 text-brand-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">Deterministic Logic</h3>
              <p className="text-white/50 leading-relaxed">
                We reject the "black box" approach to AI. Every conclusion drawn by 
                our engine is mapped to a verifiable logic chain, ensuring 
                transparency and accountability in critical sectors.
              </p>
            </div>
            <div className="bento-card">
              <Eye className="w-10 h-10 text-brand-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">High Fidelity</h3>
              <p className="text-white/50 leading-relaxed">
                Our models are trained for precision, not popularity. We focus on 
                the nuances of financial markets and cybersecurity landscapes where 
                a 1% margin of error is unacceptable.
              </p>
            </div>
          </div>

          <div className="glass p-12 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap className="w-64 h-64 text-brand-accent" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl font-bold mb-6">Our Commitment</h3>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                We are committed to building a future where AI is not just a 
                predictive tool, but a reasoning partner. Our systems are designed 
                to be audit-ready from day one, meeting the highest standards of 
                regulatory compliance in Finance and Defense.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-brand-accent">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-mono text-sm uppercase tracking-widest">GDPR Compliant</span>
                </div>
                <div className="w-px h-4 bg-brand-border" />
                <div className="flex items-center space-x-2 text-brand-accent">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-mono text-sm uppercase tracking-widest">SOC2 Type II</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
