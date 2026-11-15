import { useEffect } from 'react';
import { Mail, MessageSquare, MapPin, Phone } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { SITE } from '../data/site';
import { getPageSeo } from '../data/seo';

export default function Contact() {
  const seo = getPageSeo('/contact');

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}`;
    document.body.appendChild(script);
  }, []);

  return (
    <PageLayout
      title={seo.title}
      description={seo.description}
      path="/contact"
      breadcrumbLabel="Contact"
    >
      <section className="relative overflow-hidden bg-[#f7faff] py-24 md:py-32">
        <div className="blueprint-grid absolute inset-0" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative grid grid-cols-1 gap-14 lg:grid-cols-2">
            <div className="lg:pt-6">
              <p className="eyebrow">Contact</p>
              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-7xl">
                Start with the challenge.
              </h1>
              <p className="mt-7 text-xl leading-relaxed text-slate-600">
                Tell us what your business is trying to achieve, where technology is creating
                friction, or what kind of partnership you want to explore.
              </p>

              <div className="mt-12 space-y-7">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/15 text-brand-accent">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="mono-label">Main</p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-lg font-semibold hover:text-brand-accent"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/15 text-brand-accent">
                    <MessageSquare className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="mono-label">Advisory</p>
                    <a
                      href={`mailto:${SITE.support}`}
                      className="text-lg font-semibold hover:text-brand-accent"
                    >
                      {SITE.support}
                    </a>
                  </div>
                </div>
                {SITE.phone ? (
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/15 text-brand-accent">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="mono-label">Phone</p>
                      <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="text-lg font-semibold hover:text-brand-accent">
                        {SITE.phone}
                      </a>
                    </div>
                  </div>
                ) : null}
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/15 text-brand-accent">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="mono-label">HQ</p>
                    <p className="text-lg font-semibold">{SITE.address.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-[2rem] p-4 sm:p-6">
              <iframe
                data-tally-src={`https://tally.so/embed/${SITE.tallyFormId}?dynamicHeight=1`}
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
