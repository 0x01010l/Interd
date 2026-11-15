import { Link } from 'react-router-dom';
import { Waypoints, Linkedin } from 'lucide-react';
import { SITE } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-bg pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="mb-5 flex items-center gap-2">
              <Waypoints className="h-5 w-5 text-brand-accent" />
              <span className="text-xl font-bold tracking-tighter">{SITE.brand}</span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-white/50">
              B2B technology advisory and vendor matchmaking. We connect growing companies with the
              right technology partners—based on what is happening in their business right now.
            </p>
            <p className="mt-4 text-xs text-white/30">
              A practice of {SITE.legal}. Not a SaaS product.
            </p>
            <a
              href={SITE.sameAs[1]}
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="mt-5 inline-flex text-white/30 transition-colors hover:text-brand-accent"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

          <div>
            <h4 className="mono-label mb-5">Practice</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/approach" className="text-white/50 hover:text-white">
                  Approach
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/50 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/50 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mono-label mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-white/50 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/50 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/50 hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/50 hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-brand-border pt-6 text-xs text-white/30 md:flex-row md:justify-between">
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
