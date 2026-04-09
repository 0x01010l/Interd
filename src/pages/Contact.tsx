import PageLayout from '../components/PageLayout';
import { Mail, MessageSquare, Globe, ArrowRight } from 'lucide-react';

export default function Contact() {
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
                    <div className="mono-label">Priority Email</div>
                    <div className="text-xl font-bold">contact@interdot.net</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <div className="mono-label">Technical Support</div>
                    <div className="text-xl font-bold">support@interdot.net</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <div className="mono-label">HQ</div>
                    <div className="text-xl font-bold">Zurich, Switzerland</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-10 rounded-[2.5rem] border-brand-border">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="mono-label ml-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-brand-border rounded-xl px-4 py-3 focus:border-brand-accent outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="mono-label ml-1">Work Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-brand-border rounded-xl px-4 py-3 focus:border-brand-accent outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="mono-label ml-1">Sector</label>
                  <select className="w-full bg-white/5 border border-brand-border rounded-xl px-4 py-3 focus:border-brand-accent outline-none transition-colors appearance-none">
                    <option className="bg-brand-bg">Finance / Quant</option>
                    <option className="bg-brand-bg">Cybersecurity / Defense</option>
                    <option className="bg-brand-bg">Enterprise AI / Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="mono-label ml-1">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/5 border border-brand-border rounded-xl px-4 py-3 focus:border-brand-accent outline-none transition-colors"
                    placeholder="How can we help you?"
                  />
                </div>
                <button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2">
                  <span>Send Inquiry</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
