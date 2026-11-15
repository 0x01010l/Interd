import { type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Waypoints, Linkedin } from 'lucide-react';
import { SITE } from '../data/site';

export default function Footer() {
  const location = useLocation();

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-[#f7faff] pb-8 pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" onClick={handleLogoClick} className="mb-5 flex items-center gap-2">
              <Waypoints className="h-5 w-5 text-brand-accent" />
              <span className="text-xl font-bold tracking-tighter">{SITE.brand}</span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              Technology advisory and partner matchmaking for growing companies making important
              technology decisions.
            </p>
            <a
              href={SITE.sameAs[1]}
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="mt-5 inline-flex text-slate-400 transition-colors hover:text-brand-accent"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

          <div>
            <h4 className="mono-label mb-5">Practice</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/approach" className="text-slate-500 hover:text-slate-950">
                  Approach
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-500 hover:text-slate-950">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-500 hover:text-slate-950">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mono-label mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-slate-500 hover:text-slate-950">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-500 hover:text-slate-950">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-500 hover:text-slate-950">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-500 hover:text-slate-950">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 md:flex-row md:justify-between">
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
