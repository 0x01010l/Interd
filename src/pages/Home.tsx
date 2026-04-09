import PageLayout from '../components/PageLayout';
import { motion } from 'motion/react';
import { Shield, BarChart3, Cpu, ArrowRight, Zap, Database, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0070FF22,transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass border-brand-accent/30 mb-8"
            >
              <Zap className="w-4 h-4 text-brand-accent" />
              <span className="mono-label !text-brand-accent">V2.0 Reasoning Engine Live</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Reasoning-as-a-<span className="text-brand-accent">Service</span>
            </h1>
            
            <p className="text-xl text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto">
              Interdot synthesizes raw data into deterministic logic chains. 
              High-fidelity intelligence for Finance and Cybersecurity sectors.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-xl shadow-brand-accent/20 flex items-center justify-center space-x-2">
                <span>Request API Access</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link to="/services" className="w-full sm:w-auto glass hover:bg-white/5 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Sectors */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="mono-label mb-4">Core Sectors</h2>
            <h3 className="text-3xl font-bold">Industry-Specific Logic Synthesis</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Bento Card: Finance */}
            <div className="md:col-span-2 bento-card flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 transition-colors">
                  <BarChart3 className="w-6 h-6 text-brand-accent" />
                </div>
                <h4 className="text-2xl font-bold mb-4">Financial Logic Synthesis</h4>
                <p className="text-white/50 leading-relaxed mb-8 max-w-lg">
                  Beyond simple trend analysis. Our engine reconstructs market movements 
                  into audit-ready logic traces, identifying causal relationships in 
                  high-frequency data streams.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-brand-border pt-6">
                <div>
                  <div className="mono-label mb-1">Accuracy</div>
                  <div className="text-xl font-mono font-bold">99.98%</div>
                </div>
                <div>
                  <div className="mono-label mb-1">Latency</div>
                  <div className="text-xl font-mono font-bold">12ms</div>
                </div>
                <div>
                  <div className="mono-label mb-1">Vectors</div>
                  <div className="text-xl font-mono font-bold">4.2B+</div>
                </div>
              </div>
            </div>

            {/* Small Bento Card: Cyber */}
            <div className="bento-card group">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <h4 className="text-xl font-bold mb-4">Automated Cyber Recon</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Deterministic threat modeling. We map attack surfaces and predict 
                adversary logic before the first packet is sent.
              </p>
              <div className="mt-8 pt-6 border-t border-brand-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/40">Threat Detection</span>
                  <span className="text-xs text-red-500 font-mono">ACTIVE</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    className="h-full bg-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Small Bento Card: Vector Training */}
            <div className="bento-card group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <Cpu className="w-6 h-6 text-purple-500" />
              </div>
              <h4 className="text-xl font-bold mb-4">Custom Vector Training</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Train reasoning models on your proprietary datasets with zero 
                leakage. Private, secure, and deterministic.
              </p>
            </div>

            {/* Medium Bento Card: Data Intelligence */}
            <div className="md:col-span-2 bento-card group flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                  <Database className="w-6 h-6 text-green-500" />
                </div>
                <h4 className="text-xl font-bold mb-4">Deterministic Intelligence</h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  Our "Reasoning Layer" ensures that every output is backed by a 
                  verifiable logic chain. No hallucinations, just pure synthesis.
                </p>
              </div>
              <div className="flex-1 glass rounded-xl p-4 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-4">
                  <span className="mono-label">Logic Trace</span>
                  <Activity className="w-4 h-4 text-brand-accent animate-pulse" />
                </div>
                <div className="space-y-2 font-mono text-[10px] text-white/40">
                  <div className="flex justify-between border-b border-brand-border pb-1">
                    <span>INPUT_VECTOR</span>
                    <span className="text-brand-accent">0x7F...3A</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border pb-1">
                    <span>REASONING_STEP_1</span>
                    <span className="text-green-500">VERIFIED</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border pb-1">
                    <span>REASONING_STEP_2</span>
                    <span className="text-green-500">VERIFIED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SYNTHESIS_OUTPUT</span>
                    <span className="text-brand-accent">DETERMINISTIC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works: Logic Flow */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mono-label mb-4">The Architecture</h2>
            <h3 className="text-4xl font-bold">The Reasoning Layer</h3>
          </div>
          
          <div className="relative">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {[
                { step: '01', title: 'Ingestion', desc: 'Raw multi-modal data streams ingested via secure API endpoints.' },
                { step: '02', title: 'Vectorization', desc: 'Data is mapped into high-dimensional vector space for relational analysis.' },
                { step: '03', title: 'Reasoning', desc: 'Our proprietary engine synthesizes causal logic chains across vectors.' },
                { step: '04', title: 'Synthesis', desc: 'Deterministic, audit-ready intelligence delivered to your stack.' },
              ].map((item, i) => (
                <div key={i} className="glass p-8 rounded-2xl relative group hover:border-brand-accent/50 transition-colors">
                  <div className="text-4xl font-mono font-bold text-brand-accent/20 mb-4 group-hover:text-brand-accent/40 transition-colors">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-12 rounded-[2.5rem] text-center border-brand-accent/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-accent/5" />
            <h3 className="text-4xl font-bold mb-6 relative">Ready to bridge the gap?</h3>
            <p className="text-white/60 mb-10 max-w-xl mx-auto relative">
              Join the world's leading quant funds and cybersecurity firms using 
              Interdot for deterministic reasoning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
              <button className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 rounded-xl font-bold transition-all">
                Request API Access
              </button>
              <Link to="/contact" className="text-white/60 hover:text-white transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
