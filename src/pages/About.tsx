import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { Target, Eye, ShieldCheck, Zap, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ABOUT_COPY } from '../data/staticPageCopy';

const ABOUT_DESCRIPTION =
  'Interdot (FIX FIGURES LLC) builds custom AI agents for ecommerce, finance, and cybersecurity niches, and publishes free AI writing tools that demonstrate those agent workflows.';

export default function About() {
  const { publisher: pub } = ABOUT_COPY;

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
            <h1 className="text-5xl font-bold mb-8">{ABOUT_COPY.missionTitle}</h1>
            <p className="text-xl text-white/60 leading-relaxed">{ABOUT_COPY.missionBody}</p>
          </div>

          <div className="bento-card mb-24">
            <h2 className="mono-label mb-4">Publisher identity</h2>
            <h3 className="text-2xl font-bold mb-6">Who publishes Interdot</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/60 leading-relaxed">
              <div className="space-y-3">
                <p>
                  <span className="text-white font-semibold">Brand:</span> {pub.brand}
                </p>
                <p>
                  <span className="text-white font-semibold">Legal entity:</span> {pub.legal}
                </p>
                <p>
                  <span className="text-white font-semibold">Website:</span>{' '}
                  <a href={pub.website} className="text-brand-accent hover:underline">
                    {pub.website}
                  </a>
                </p>
                <p>
                  <span className="text-white font-semibold">Primary contact:</span>{' '}
                  <a href={`mailto:${pub.email}`} className="text-brand-accent hover:underline">
                    {pub.email}
                  </a>
                </p>
                <p>
                  <span className="text-white font-semibold">Support:</span>{' '}
                  <a href={`mailto:${pub.support}`} className="text-brand-accent hover:underline">
                    {pub.support}
                  </a>
                </p>
              </div>
              <div className="space-y-3">
                <p>
                  <span className="text-white font-semibold">Business address:</span>
                  <br />
                  {pub.addressLines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                <p>{pub.publishNote}</p>
                <p>
                  <span className="text-white font-semibold">What we publish:</span>{' '}
                  {pub.whatWePublish}
                </p>
                <p>
                  For privacy or legal requests, email{' '}
                  <a href={`mailto:${pub.email}`} className="text-brand-accent hover:underline">
                    {pub.email}
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
              <p className="text-white/50 leading-relaxed">{ABOUT_COPY.nicheAgents}</p>
            </div>
            <div className="bento-card">
              <Eye className="w-10 h-10 text-brand-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">Proof before pitch</h3>
              <p className="text-white/50 leading-relaxed">{ABOUT_COPY.proofBeforePitch}</p>
            </div>
          </div>

          <div className="bento-card mb-24">
            <Wrench className="w-10 h-10 text-brand-accent mb-6" />
            <h3 className="text-2xl font-bold mb-4">Custom agents + free tools</h3>
            <p className="text-white/50 leading-relaxed mb-6">{ABOUT_COPY.agentsAndTools}</p>
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
              <p className="text-lg text-white/70 mb-8 leading-relaxed">{ABOUT_COPY.commitment}</p>
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
