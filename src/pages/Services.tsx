import PageLayout from '../components/PageLayout';
import { motion } from 'motion/react';
import { BarChart3, Shield, Cpu, Database, CheckCircle2 } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <BarChart3 className="w-8 h-8 text-brand-accent" />,
      title: 'Financial Logic Synthesis',
      description: 'Beyond standard data scraping. We provide deep causal analysis for market movements.',
      features: [
        'High-frequency logic traces',
        'Causal relationship mapping',
        'Audit-ready synthesis reports',
        'Multi-vector market prediction'
      ]
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: 'Automated Cyber Recon',
      description: 'Deterministic threat modeling and adversary logic prediction.',
      features: [
        'Attack surface vectorization',
        'Predictive adversary modeling',
        'Real-time logic-based alerts',
        'Zero-hallucination threat intel'
      ]
    },
    {
      icon: <Cpu className="w-8 h-8 text-purple-500" />,
      title: 'Custom Vector Training',
      description: 'Train reasoning models on your proprietary datasets with absolute privacy.',
      features: [
        'Zero-leakage training protocols',
        'Proprietary vector optimization',
        'Custom logic chain development',
        'Secure on-prem deployment options'
      ]
    }
  ];

  return (
    <PageLayout title="Services">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <h2 className="mono-label mb-4">Our Services</h2>
            <h1 className="text-5xl font-bold mb-8">The Reasoning Layer vs. Data Scraping</h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Standard AI models scrape data and guess patterns. Interdot synthesizes 
              reasoning chains. We don't just tell you what happened; we show you 
              the logical "why" behind every data point.
            </p>
          </div>

          <div className="space-y-12">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass p-12 rounded-[2.5rem] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-6">{service.title}</h3>
                  <p className="text-lg text-white/60 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-4">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center space-x-3 text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-brand-bg/50 rounded-3xl p-8 border border-brand-border h-full min-h-[300px] flex items-center justify-center ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className="text-center">
                    <Database className="w-24 h-24 text-white/10 mb-6 mx-auto" />
                    <div className="mono-label">Vector Visualization Placeholder</div>
                    <div className="mt-4 flex gap-2 justify-center">
                      {[1, 2, 3, 4, 5].map(dot => (
                        <div key={dot} className="w-2 h-2 rounded-full bg-brand-accent/30 animate-pulse" style={{ animationDelay: `${dot * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
