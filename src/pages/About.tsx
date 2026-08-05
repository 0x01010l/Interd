import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { Target, Eye, ShieldCheck, Zap, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const ABOUT_DESCRIPTION =
  'Interdot (FIX FIGURES LLC) builds custom AI agents for ecommerce, finance, and cybersecurity niches, and publishes free AI writing tools that demonstrate those agent workflows.';

export default function About() {
  return (
    <PageLayout>
      <SEO
        title="About Interdot | Custom AI Agents & Free Tools"
        description={ABOUT_DESCRIPTION}
        path="/about"
        keywords="about Interdot, custom AI agents, FIX FIGURES LLC, free AI tools, ecommerce AI, finance AI agents, cybersecurity AI agents"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Interdot',
          description: ABOUT_DESCRIPTION,
          url: 'https://interdot.net/about',
          mainEntity: {
            '@type': 'Organization',
            name: 'Interdot',
            legalName: 'FIX FIGURES LLC',
            url: 'https://interdot.net',
            email: 'contact@interdot.net',
          },
        }}
      />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <h2 className="mono-label mb-4">Our Mission</h2>
            <h1 className="text-5xl font-bold mb-8">Custom AI agents for real business niches.</h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Interdot builds custom AI agents for ecommerce, finance, and cybersecurity —
              then proves the methods with free tools anyone can try. Operated by FIX FIGURES LLC,
              we focus on agent workflows teams can trust, audit, and ship.
            </p>
          </div>

          <div className="bento-card mb-24">
            <h2 className="mono-label mb-4">Publisher identity</h2>
            <h3 className="text-2xl font-bold mb-6">Who publishes Interdot</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/60 leading-relaxed">
              <div className="space-y-3">
                <p>
                  <span className="text-white font-semibold">Brand:</span> Interdot
                </p>
                <p>
                  <span className="text-white font-semibold">Legal entity:</span> FIX FIGURES LLC
                </p>
                <p>
                  <span className="text-white font-semibold">Website:</span>{' '}
                  <a href="https://interdot.net" className="text-brand-accent hover:underline">
                    https://interdot.net
                  </a>
                </p>
                <p>
                  <span className="text-white font-semibold">Primary contact:</span>{' '}
                  <a href="mailto:contact@interdot.net" className="text-brand-accent hover:underline">
                    contact@interdot.net
                  </a>
                </p>
                <p>
                  <span className="text-white font-semibold">Support:</span>{' '}
                  <a href="mailto:advisory@interdot.net" className="text-brand-accent hover:underline">
                    advisory@interdot.net
                  </a>
                </p>
              </div>
              <div className="space-y-3">
                <p>
                  <span className="text-white font-semibold">Business address:</span>
                  <br />
                  6545 Market Avenue North
                  <br />
                  North Canton, OH 44721
                  <br />
                  United States
                </p>
                <p>
                  We publish practical ecommerce writing tools, explanatory guides, and information
                  about custom AI agent services. Tool guides and blog articles are written for
                  merchants and operators — not as placeholders for advertising.
                </p>
                <p>
                  For privacy or legal requests, email{' '}
                  <a href="mailto:contact@interdot.net" className="text-brand-accent hover:underline">
                    contact@interdot.net
                  </a>
                  . See also our{' '}
                  <Link to="/privacy-policy" className="text-brand-accent hover:underline">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link to="/terms" className="text-brand-accent hover:underline">
                    Terms of Use
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="bento-card">
              <Target className="w-10 h-10 text-brand-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">Niche-first agents</h3>
              <p className="text-white/50 leading-relaxed">
                We do not ship generic chatbots. Each custom agent is scoped to a niche
                workflow — product listing ops, financial reasoning, or security investigation —
                with clear inputs, policies, and outputs.
              </p>
            </div>
            <div className="bento-card">
              <Eye className="w-10 h-10 text-brand-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">Proof before pitch</h3>
              <p className="text-white/50 leading-relaxed">
                Free ecommerce writing tools are living demos of the same agent approach:
                structured prompts, practical guides, and Azure OpenAI on the server so
                keys never touch the browser.
              </p>
            </div>
          </div>

          <div className="bento-card mb-24">
            <Wrench className="w-10 h-10 text-brand-accent mb-6" />
            <h3 className="text-2xl font-bold mb-4">Custom agents + free tools</h3>
            <p className="text-white/50 leading-relaxed mb-4">
              Custom agents are how we help teams automate niche work with guardrails.
              Free tools — product descriptions, Shopify titles, Etsy tags, review replies,
              ad copy, FAQs, SEO metas, and bulk rewrites — show how those writing agents
              behave in public, with human-written guidance on every page.
            </p>
            <p className="text-white/50 leading-relaxed mb-6">
              When you need a deeper agent for your catalog, risk desk, or security stack,
              the same Interdot team designs, grounds, and ships it. One company. One story.
              Agents and tools that work together.
            </p>
            <Link to="/tools" className="text-brand-accent font-semibold hover:underline">
              Browse free AI tools →
            </Link>
          </div>

          <div className="glass p-12 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap className="w-64 h-64 text-brand-accent" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl font-bold mb-6">Our Commitment</h3>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                We build AI that operators can explain. Custom agents are designed to be
                reviewable and useful in regulated or high-stakes niches, while free tools
                stay practical, private, and easy for merchants to adopt.
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
