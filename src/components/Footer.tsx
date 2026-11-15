import { Link } from 'react-router-dom';
import { Waypoints, Linkedin } from 'lucide-react';
import { SITE } from '../data/site';

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-brand-line bg-brand-ink text-brand-paper">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="mb-5 flex items-center gap-2">
              <Waypoints className="h-5 w-5 text-teal-300" />
              <span className="font-display text-xl font-bold tracking-tight">{SITE.brand}</span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-white/60">
              B2B technology advisory and vendor matchmaking. We connect growing companies with the
              right technology partners—based on what is happening in their business right now.
            </p>
            <p className="mt-4 text-xs text-white/40">
              A practice of {SITE.legal}. Not a SaaS product.
            </p>
            <a
              href={SITE.sameAs[1]}
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="mt-5 inline-flex text-white/40 transition-colors hover:text-teal-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

          <div>
            <h4 className="eyebrow mb-4 !text-teal-300/80">Practice</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/approach" className="text-white/60 hover:text-white">
                  Approach
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/60 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/60 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4 !text-teal-300/80">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-white/60 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/60 hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/60 hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legal}. {SITE.name}.
          </p>
          <div className="space-y-1 md:text-right">
            <p>{SITE.email}</p>
            <p>{SITE.address.join(', ')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
