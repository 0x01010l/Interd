import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { motion } from 'motion/react';
import { BarChart3, Shield, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const VectorAnimation = ({ type }: { type: number }) => {
  if (type === 0) {
    // Financial: Moving bars
    return (
      <div className="flex items-end gap-1 h-32">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 bg-brand-accent/40 rounded-t-sm"
            initial={{ height: 20 }}
            animate={{ 
              height: [20, 80, 40, 100, 30, 90, 20],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 0.1,
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>
    );
  }
  if (type === 1) {
    // Cyber: Scanning grid
    return (
      <div className="relative w-48 h-48 border border-red-500/20 rounded-lg overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="border-[0.5px] border-red-500/10" />
          ))}
        </div>
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Shield className="w-16 h-16 text-red-500/20" />
        </motion.div>
      </div>
    );
  }
  // Vector Training: Floating particles
  return (
    <div className="relative w-48 h-48">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-500 rounded-full"
          initial={{ 
            x: Math.random() * 100, 
            y: Math.random() * 100,
            opacity: 0 
          }}
          animate={{ 
            x: [Math.random() * 150, Math.random() * 150, Math.random() * 150],
            y: [Math.random() * 150, Math.random() * 150, Math.random() * 150],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 5 + Math.random() * 5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <Cpu className="w-16 h-16 text-purple-500/20" />
      </div>
    </div>
  );
};

export default function Services() {
  const services = [
    {
      icon: <BarChart3 className="w-8 h-8 text-brand-accent" />,
      title: 'Finance Decision Agents',
      description: 'Custom agents that turn market and ops data into audit-ready causal reasoning for finance teams.',
      features: [
        'High-frequency logic traces',
        'Causal relationship mapping',
        'Audit-ready synthesis reports',
        'Multi-vector market prediction'
      ]
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: 'Security Ops Agents',
      description: 'Custom agents for deterministic threat modeling and adversary logic prediction.',
      features: [
        'Attack surface vectorization',
        'Predictive adversary modeling',
        'Real-time logic-based alerts',
        'Zero-hallucination threat intel'
      ]
    },
    {
      icon: <Cpu className="w-8 h-8 text-purple-500" />,
      title: 'Custom Agent Training',
      description: 'Train niche agents on your proprietary datasets with absolute privacy — including ecommerce and ops workflows.',
      features: [
        'Zero-leakage training protocols',
        'Proprietary vector optimization',
        'Custom logic chain development',
        'Secure on-prem deployment options'
      ]
    }
  ];

  return (
    <PageLayout>
      <SEO
        title="Custom AI Agent Services | Interdot"
        description="Commission custom AI agents for finance, cybersecurity, and ecommerce workflows. Interdot designs niche agents and also publishes free tools that prove the approach."
        path="/services"
        keywords="custom AI agent services, finance AI agents, cybersecurity AI agents, ecommerce AI agents, Interdot"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Interdot Custom AI Agents',
          provider: {
            '@type': 'Organization',
            name: 'Interdot',
            url: 'https://interdot.net',
          },
          description:
            'Custom AI agents for ecommerce, finance, and cybersecurity niches, plus free public writing tools.',
          areaServed: 'Worldwide',
          url: 'https://interdot.net/services',
        }}
      />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <h2 className="mono-label mb-4">Our Services</h2>
            <h1 className="text-5xl font-bold mb-8">Custom AI agents for your niche</h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Generic AI guesses. Interdot builds custom agents scoped to ecommerce, finance,
              and cybersecurity workflows — with free tools that show the same approach in public
              for merchant writing tasks.
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
                  <ul className="space-y-4 mb-10">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center space-x-3 text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold transition-all border border-brand-border"
                  >
                    <span>Request custom agent</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className={`bg-brand-bg/50 rounded-3xl p-8 border border-brand-border h-full min-h-[350px] flex items-center justify-center relative overflow-hidden ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />
                  <div className="text-center relative z-10">
                    <VectorAnimation type={i} />
                    <div className="mono-label mt-8">Vector Synthesis Engine</div>
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
