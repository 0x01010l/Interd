import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { motion } from 'motion/react';
import { Shield, BarChart3, Cpu, ArrowRight, Zap, Database, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const HOME_DESCRIPTION =
  'Interdot builds custom AI agents for ecommerce, finance, and cybersecurity — plus free AI writing tools that show those agent workflows in action. Contact us for custom agents or try free tools now.';

const HOME_KEYWORDS =
  'custom AI agents, ecommerce AI agents, finance AI agents, cybersecurity AI agents, free AI tools, product description generator, Shopify title generator, Etsy tag generator, Interdot, FIX FIGURES LLC';

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Interdot',
    legalName: 'FIX FIGURES LLC',
    url: 'https://interdot.net',
    logo: 'https://interdot.net/',
    email: 'contact@interdot.net',
    description: HOME_DESCRIPTION,
    sameAs: [
      'https://github.com/0x01010l',
      'https://www.linkedin.com/company/interdot-ai/',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6545 Market Avenue North',
      addressLocality: 'North Canton',
      addressRegion: 'OH',
      postalCode: '44721',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@interdot.net',
      contactType: 'customer support',
      availableLanguage: 'English',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Interdot',
    url: 'https://interdot.net',
    description: HOME_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: 'Interdot',
    },
    potentialAction: {
      '@type': 'ReadAction',
      target: 'https://interdot.net/tools',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Interdot custom AI agent niches and free tools',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ecommerce AI agents and free writing tools',
        url: 'https://interdot.net/tools',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Finance decision agents',
        url: 'https://interdot.net/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cybersecurity ops agents',
        url: 'https://interdot.net/services',
      },
    ],
  },
];

export default function Home() {
  return (
    <PageLayout>
      <SEO
        title="Interdot | Custom AI Agents & Free AI Tools"
        description={HOME_DESCRIPTION}
        path="/"
        keywords={HOME_KEYWORDS}
        jsonLd={homeJsonLd}
      />
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
              <span className="mono-label !text-brand-accent">Custom Agents · Free Tools</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Custom AI <span className="text-brand-accent">Agents</span>
            </h1>
            
            <p className="text-xl text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto">
              Interdot designs custom AI agents for ecommerce, finance, and cybersecurity
              niches — then proves the workflows in public with free tools merchants can use today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-xl shadow-brand-accent/20 flex items-center justify-center space-x-2">
                <span>Get In Touch</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/tools" className="w-full sm:w-auto glass hover:bg-white/5 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center">
                Free Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Sectors */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="mono-label mb-4">Agent Niches</h2>
            <h3 className="text-3xl font-bold">Custom agents for the sectors that need them</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Bento Card: Finance */}
            <div className="md:col-span-2 bento-card flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 transition-colors">
                  <BarChart3 className="w-6 h-6 text-brand-accent" />
                </div>
                <h4 className="text-2xl font-bold mb-4">Finance Decision Agents</h4>
                <p className="text-white/50 leading-relaxed mb-8 max-w-lg">
                  Custom agents that turn market and operational data into audit-ready
                  reasoning traces — built for teams that need causal answers, not black-box guesses.
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
              <h4 className="text-xl font-bold mb-4">Security Ops Agents</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Custom agents for threat modeling and attack-surface reasoning —
                designed to map adversary logic before the first packet is sent.
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
              <h4 className="text-xl font-bold mb-4">Custom Agent Training</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Train niche agents on your proprietary data with zero leakage —
                private, secure, and tuned to your workflows.
              </p>
            </div>

            {/* Medium Bento Card: Data Intelligence */}
            <div className="md:col-span-2 bento-card group flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                  <Database className="w-6 h-6 text-green-500" />
                </div>
                <h4 className="text-xl font-bold mb-4">Ecommerce Writing Agents</h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  Product, SEO, and support agents for catalogs — available as free tools
                  now, and as deeper custom agents when your team is ready to scale.
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
            <h2 className="mono-label mb-4">How Agents Ship</h2>
            <h3 className="text-4xl font-bold">From workflow to working agent</h3>
          </div>
          
          <div className="relative">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {[
                { step: '01', title: 'Brief', desc: 'Map the niche workflow — listings, risk review, alerts, or ops tasks — into clear agent goals.' },
                { step: '02', title: 'Ground', desc: 'Connect your data, policies, and examples so the agent reasons from facts, not guesses.' },
                { step: '03', title: 'Reason', desc: 'Run structured agent logic with verifiable steps your team can audit and improve.' },
                { step: '04', title: 'Ship', desc: 'Deploy a custom agent for your stack — or use our free tools as live, public proofs.' },
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

      {/* Free AI Tools */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="mono-label mb-4">Free Tools</h2>
              <h3 className="text-3xl font-bold">Live proofs of our ecommerce agents</h3>
            </div>
            <Link to="/tools" className="text-brand-accent font-semibold inline-flex items-center gap-2 hover:underline">
              View all tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { to: '/tools/product-description-generator', title: 'Product Descriptions', desc: 'Convert specs into benefit-led listing copy.' },
              { to: '/tools/shopify-title-generator', title: 'Shopify Titles', desc: 'Clear, searchable titles built for click-through.' },
              { to: '/tools/etsy-tag-generator', title: 'Etsy Tags', desc: 'Fill all 13 tags with buyer-intent phrases.' },
              { to: '/tools/ad-copy-generator', title: 'Ad Copy', desc: 'Test urgency, proof, and benefit angles fast.' },
            ].map((item) => (
              <Link key={item.to} to={item.to} className="bento-card group block">
                <h4 className="text-lg font-bold mb-2 group-hover:text-brand-accent transition-colors">{item.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-12 rounded-[2.5rem] text-center border-brand-accent/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-accent/5" />
            <h3 className="text-4xl font-bold mb-6 relative">Need a custom agent for your niche?</h3>
            <p className="text-white/60 mb-10 max-w-xl mx-auto relative">
              Talk to us about finance, security, or ecommerce agents — or start with free
              tools that already run the same writing workflows in the browser.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
              <Link to="/contact" className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 rounded-xl font-bold transition-all">
                Get In Touch
              </Link>
              <Link to="/tools" className="text-white/60 hover:text-white transition-colors">
                Try free AI tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
