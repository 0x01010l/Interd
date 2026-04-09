import { Link } from 'react-router-dom';
import { Terminal, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-bg pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Terminal className="w-6 h-6 text-brand-accent" />
              <span className="font-mono font-bold tracking-tighter text-xl">INTERDOT</span>
            </Link>
            <p className="text-white/50 max-w-sm mb-6 leading-relaxed">
              Bridging the gap between raw data and decision through deterministic, 
              audit-ready AI reasoning layers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/30 hover:text-brand-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/30 hover:text-brand-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/30 hover:text-brand-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/faq" className="text-sm text-white/60 hover:text-white transition-colors">Technical FAQ</Link></li>
              <li><Link to="/clients" className="text-sm text-white/60 hover:text-white transition-colors">Case Studies</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
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
