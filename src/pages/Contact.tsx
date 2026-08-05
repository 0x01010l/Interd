import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { Mail, MessageSquare, Globe, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

const TALLY_SRC = 'https://tally.so/embed/jaXl9Q?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';

export default function Contact() {
  const [iframeFailed, setIframeFailed] = useState(false);

  useEffect(() => {
    const loadTally = () => {
      const tally = (window as Window & { Tally?: { loadEmbeds: () => void } }).Tally;
      if (tally) tally.loadEmbeds();
    };

    const existing = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
    if (existing) {
      loadTally();
    } else {
      const s = document.createElement('script');
      s.src = 'https://tally.so/widgets/embed.js';
      s.async = true;
      s.onload = loadTally;
      document.body.appendChild(s);
    }

    const timer = window.setTimeout(() => {
      const frame = document.querySelector<HTMLIFrameElement>('iframe[title="Contact Form"]');
      if (frame && frame.getBoundingClientRect().height < 50) setIframeFailed(true);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <PageLayout>
      <SEO
        title="Contact Interdot | Custom AI Agents & Free Tools"
        description="Contact Interdot to commission custom AI agents for ecommerce, finance, or cybersecurity — or ask about our free AI writing tools. Email contact@interdot.net."
        path="/contact"
        keywords="contact Interdot, custom AI agents, hire AI agent builders, ecommerce AI tools support"
      />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="mono-label mb-4">Contact Us</h2>
              <h1 className="text-5xl font-bold mb-8">Let&apos;s build your agent.</h1>
              <p className="text-xl text-white/60 leading-relaxed mb-12">
                Ready for a custom agent in ecommerce, finance, or cybersecurity — or have a question about our free AI writing tools? Our team is ready to help.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <div className="mono-label">Main Email</div>
                    <div className="text-xl font-bold">
                      <a href="mailto:contact@interdot.net" className="hover:text-brand-accent transition-colors">
                        contact@interdot.net
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <div className="mono-label">Technical Support</div>
                    <div className="text-xl font-bold">
                      <a href="mailto:advisory@interdot.net" className="hover:text-brand-accent transition-colors">
                        advisory@interdot.net
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <div className="mono-label">HQ</div>
                    <div className="text-xl font-bold">6545 Market Avenue North, North Canton, 44721, OH, US</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-6 md:p-10 rounded-[2.5rem] border-brand-border">
              <h3 className="text-xl font-bold mb-2">Send a message</h3>
              <p className="text-sm text-white/50 mb-6">
                Prefer email?{' '}
                <a href="mailto:contact@interdot.net" className="text-brand-accent hover:underline">
                  contact@interdot.net
                </a>
              </p>

              {!iframeFailed ? (
                <iframe
                  src={TALLY_SRC}
                  data-tally-src={TALLY_SRC}
                  loading="lazy"
                  width="100%"
                  height="480"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="Contact Form"
                  className="w-full min-h-[420px] rounded-xl bg-transparent"
                  onError={() => setIframeFailed(true)}
                />
              ) : (
                <div className="rounded-xl border border-brand-border p-6 text-center">
                  <p className="text-white/60 mb-4">The form could not load in this browser.</p>
                  <a
                    href="https://tally.so/r/jaXl9Q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-accent text-white px-5 py-3 rounded-xl font-semibold"
                  >
                    Open contact form <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              <p className="mt-4 text-xs text-white/35">
                If the embed is blank,{' '}
                <a
                  href="https://tally.so/r/jaXl9Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:underline"
                >
                  open the form in a new tab
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
