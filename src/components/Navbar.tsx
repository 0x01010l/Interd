import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Waypoints, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SITE } from '../data/site';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.35 });

  const navLinks = [
    { name: 'Approach', path: '/approach' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-accent text-white shadow-[0_8px_24px_rgba(0,112,255,0.24)] transition-transform group-hover:-rotate-3 group-hover:scale-105">
            <Waypoints className="h-5 w-5" />
          </span>
          <span className="font-bold tracking-tighter text-xl">{SITE.brand}</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-brand-accent'
                  : 'text-slate-500 hover:text-slate-950'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary !py-2.5 !px-5 !rounded-full">
            Get in touch
          </Link>
        </div>

        <button
          type="button"
          className="text-slate-700 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3 border-t border-slate-200 bg-white p-4 shadow-xl md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-slate-700"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsOpen(false)} className="btn-primary w-full">
              Get in touch
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left bg-brand-accent"
        style={{ scaleX: progress }}
        aria-hidden
      />
    </nav>
  );
}
