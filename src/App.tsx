/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Approach from './pages/Approach';
import Services from './pages/Services';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        {/* Legacy redirects from prior site versions */}
        <Route path="/clients" element={<Navigate to="/about" replace />} />
        <Route path="/blog" element={<Navigate to="/" replace />} />
        <Route path="/blog/:slug" element={<Navigate to="/" replace />} />
        <Route path="/tools" element={<Navigate to="/services" replace />} />
        <Route path="/tools/*" element={<Navigate to="/services" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
