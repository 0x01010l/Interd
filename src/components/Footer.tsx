import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { SITE } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-brand-line bg-brand-paper mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-brand-accent" />
              <span className="font-serif font-semibold text-xl">{SITE.name}</span>
            </Link>
            <p className="text-brand-muted max-w-md leading-relaxed">{SITE.tagline}</p>
            <p className="text-sm text-brand-muted mt-4 leading-relaxed">
              Independent educational guides — not an official WAEC or BECE site. We do not sell
              leaked papers or grade promises.
            </p>
          </div>
          <div>
            <h4 className="eyebrow mb-4">Read</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/guides" className="text-brand-muted hover:text-brand-accent">
                  All guides
                </Link>
              </li>
              <li>
                <Link to="/guides/waec" className="text-brand-muted hover:text-brand-accent">
                  WAEC
                </Link>
              </li>
              <li>
                <Link to="/guides/bece" className="text-brand-muted hover:text-brand-accent">
                  BECE
                </Link>
              </li>
              <li>
                <Link to="/guides/writing" className="text-brand-muted hover:text-brand-accent">
                  How to write
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-4">Publisher</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-brand-muted hover:text-brand-accent">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-brand-muted hover:text-brand-accent">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-brand-muted hover:text-brand-accent">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/editorial-policy" className="text-brand-muted hover:text-brand-accent">
                  Editorial policy
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-brand-muted hover:text-brand-accent">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-brand-muted hover:text-brand-accent">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-brand-line flex flex-col md:flex-row justify-between gap-3 text-xs text-brand-muted">
          <p>
            © 2026 {SITE.legal}. {SITE.name} is a publication of {SITE.legal}.
          </p>
          <p>{SITE.email}</p>
        </div>
      </div>
    </footer>
  );
}
