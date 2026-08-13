import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SITE } from '../data/site';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks: { name: string; path: string; exact?: boolean }[] = [
    { name: 'Guides', path: '/guides', exact: true },
    { name: 'WAEC', path: '/guides/waec' },
    { name: 'BECE', path: '/guides/bece' },
    { name: 'Study tips', path: '/guides/study' },
    { name: 'How to write', path: '/guides/writing' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-brand-line bg-brand-paper/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-[4.25rem] items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-brand-accent text-white flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif font-semibold text-lg tracking-tight text-brand-ink">
                {SITE.name}
              </span>
              <span className="hidden sm:block text-[11px] text-brand-muted -mt-0.5">
                WAEC · BECE · how to write
              </span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = link.exact
                ? location.pathname === link.path
                : location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors ${
                    active ? 'text-brand-accent' : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="bg-brand-accent hover:bg-brand-accent-dark text-white px-4 py-2 rounded-full text-sm font-semibold"
            >
              Contact
            </Link>
          </div>

          <button
            className="lg:hidden text-brand-ink"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-brand-line bg-brand-paper p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-base font-semibold text-brand-ink"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-brand-accent text-white px-4 py-3 rounded-xl font-semibold"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
