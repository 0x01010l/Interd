import PageLayout from '../components/PageLayout';
import { Mail, MessageSquare, Globe } from 'lucide-react';
import { useEffect } from 'react';

export default function Contact() {
  useEffect(() => {
    // Load Tally script
    if (typeof window.Tally === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.onload = () => {
        if (typeof window.Tally !== 'undefined') {
          window.Tally.loadEmbeds();
        }
      };
      document.body.appendChild(script);
    } else {
      window.Tally.loadEmbeds();
    }
  }, []);

  return (
    <PageLayout title="Contact">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="mono-label mb-4">Contact Us</h2>
              <h1 className="text-5xl font-bold mb-8">Let's Synthesize.</h1>
              <p className="text-xl text-white/60 leading-relaxed mb-12">
                Ready to integrate the reasoning layer? Our team of engineers and 
                analysts is standing by to help you bridge the gap.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <div className="mono-label">Main Email</div>
                    <div className="text-xl font-bold">contact@interdot.net</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <div className="mono-label">Technical Support</div>
                    <div className="text-xl font-bold">advisory@interdot.net</div>
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

            <div className="glass p-10 rounded-[2.5rem] border-brand-border">
              <iframe
                data-tally-src="https://tally.so/embed/jaXl9Q?dynamicHeight=1&formEventsForwarding=1"
                loading="lazy"
                width="100%"
                height="447"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Contact Form"
              />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
