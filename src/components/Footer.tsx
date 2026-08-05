import { Link } from 'react-router-dom';
import { Waypoints, Github, Linkedin } from 'lucide-react';
import { TOOLS } from '../data/tools';

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-bg pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Waypoints className="w-6 h-6 text-brand-accent" />
              <span className="font-mono font-bold tracking-tighter text-xl">INTERDOT</span>
            </Link>
            <p className="text-white/50 max-w-sm mb-6 leading-relaxed">
              Custom AI agents for ecommerce, finance, and cybersecurity — with free
              writing tools that prove the workflows in the open.
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <a
                href="https://github.com/0x01010l"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-brand-accent transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/interdot-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-brand-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <a
              href="mailto:contact@interdot.net"
              className="text-sm text-brand-accent hover:underline"
            >
              contact@interdot.net
            </a>
          </div>
          
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">AI Tools</h4>
            <ul className="space-y-3">
              {TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link to={tool.path} className="text-sm text-white/60 hover:text-white transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/tools" className="text-sm text-white/60 hover:text-white transition-colors">All Tools</Link></li>
              <li><Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/blog" className="text-sm text-white/60 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="text-sm text-white/60 hover:text-white transition-colors">Technical FAQ</Link></li>
              <li><Link to="/clients" className="text-sm text-white/60 hover:text-white transition-colors">Case Studies</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy-policy" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-white/60 hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-white/30 font-mono">
            © 2026 INTERDOT NETWORKS. ALL RIGHTS RESERVED.
          </p>
          <p className="text-xs text-white/30 font-mono">
            CONTACT@INTERDOT.NET
          </p>
        </div>
      </div>
    </footer>
  );
}
