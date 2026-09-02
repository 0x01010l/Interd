import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Waypoints, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Case Studies', path: '/clients' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-brand-border/50" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,112,255,0.5)] transition-shadow">
              <Waypoints className="w-5 h-5 text-white" />
            </div>
            <span className="font-mono font-bold tracking-tighter text-xl">INTERDOT</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-accent ${
                  location.pathname === link.path ||
                  (link.path === '/blog' && location.pathname.startsWith('/blog'))
                    ? 'text-brand-accent'
                    : 'text-white/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="bg-brand-accent hover:bg-brand-accent/90 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-accent/20">
               Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white/70 hover:text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-brand-border/50 p-4 space-y-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-white/70 hover:text-brand-accent"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className="block w-full bg-brand-accent text-white px-5 py-3 rounded-xl text-sm font-semibold text-center"
          >
            Request API Access
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
