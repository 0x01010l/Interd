import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const faqs = [
    {
      q: 'What does Interdot do?',
      a: 'Interdot (FIX FIGURES LLC) builds custom AI agents for ecommerce, finance, and cybersecurity niches, and publishes free ecommerce writing tools that demonstrate those agent workflows. Contact us for custom agents, or start with free tools on this site.',
    },
    {
      q: 'Are the free tools really free?',
      a: 'Yes. Each writing tool is free to use in the browser. We apply a fair-use daily limit (20 generations per day per visitor) to prevent abuse. Demo samples are available when generation is unavailable.',
    },
    {
      q: 'Do you store my prompts in a user database?',
      a: 'Tool prompts are sent to Azure OpenAI to generate a response. We do not keep a user content database of your prompts. Generation history you save stays in your browser (localStorage) unless you clear it.',
    },
    {
      q: 'How do custom agents differ from free tools?',
      a: 'Free tools are public, scoped writing assistants for common ecommerce tasks. Custom agents are built for your niche workflow — grounded on your data, policies, and stack — and delivered as a commissioned project.',
    },
    {
      q: 'Which niches do you build agents for?',
      a: 'Primary niches are ecommerce ops (listing and support writing), finance decision workflows, and cybersecurity / security-ops investigation assistants. Tell us your use case on the Contact page.',
    },
    {
      q: 'How do you reduce hallucinations in agent outputs?',
      a: 'We scope agents to verified inputs, policies, and allowed actions. When a conclusion cannot be grounded, systems should flag uncertainty instead of inventing facts. Free tools also warn you to human-edit before publish.',
    },
    {
      q: 'Is proprietary training data shared into a global model?',
      a: 'No. Custom agent training for enterprise work is siloed. Your proprietary data is not used to train a shared public model for other customers.',
    },
    {
      q: 'Who publishes this website?',
      a: 'Interdot is operated by FIX FIGURES LLC, based at 6545 Market Avenue North, North Canton, OH 44721, US. Reach us at contact@interdot.net. Full publisher details are on the About page.',
    },
    {
      q: 'How do cookies and Analytics work?',
      a: 'Essential cookies run the site. Google Analytics and advertising cookies load only if you choose Accept all on the cookie banner. Essential only keeps measurement and ads cookies off.',
    },
    {
      q: 'Can I use generated copy commercially?',
      a: 'Yes, subject to our Terms of Use. You are responsible for reviewing accuracy, trademarks, and platform policies before publishing product or ad content.',
    },
    {
      q: 'Where can I learn how to write better listing copy?',
      a: 'Each tool includes a human-written guide and FAQ. The Blog has deeper ecommerce writing articles linked to the matching free tool.',
    },
    {
      q: 'How do I request a custom agent?',
      a: 'Email contact@interdot.net or use the Contact form. Describe the niche, workflow, data sources, and success criteria so we can scope the agent properly.',
    },
  ];

  return (
    <PageLayout>
      <SEO
        title="FAQ | Interdot Custom AI Agents & Free Tools"
        description="Answers about Interdot custom AI agents, free ecommerce writing tools, privacy, rate limits, cookies, and publisher identity (FIX FIGURES LLC)."
        path="/faq"
        keywords="Interdot FAQ, custom AI agents FAQ, free AI tools FAQ, FIX FIGURES LLC"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        }}
      />
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="mono-label mb-4">FAQ</h2>
            <h1 className="text-5xl font-bold mb-8">Agents, tools, and how Interdot works</h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Straight answers for merchants, operators, and anyone evaluating our free tools or custom agents.
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
                    <p className="text-white/60 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 glass p-12 rounded-[2.5rem] text-center">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-white/60 mb-8">
              Read publisher details on About, or contact the team directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/about" className="inline-flex items-center space-x-2 text-brand-accent font-bold hover:underline">
                <span>Publisher identity</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center space-x-2 text-brand-accent font-bold hover:underline">
                <span>Contact support</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
