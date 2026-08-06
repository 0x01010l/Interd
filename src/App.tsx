/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ToolsIndex from './pages/ToolsIndex';
import ProductDescriptionGenerator from './pages/tools/ProductDescriptionGenerator';
import ShopifyTitleGenerator from './pages/tools/ShopifyTitleGenerator';
import EtsyTagGenerator from './pages/tools/EtsyTagGenerator';
import ReviewReplyGenerator from './pages/tools/ReviewReplyGenerator';
import AdCopyGenerator from './pages/tools/AdCopyGenerator';
import ProductFaqGenerator from './pages/tools/ProductFaqGenerator';
import SeoMetaGenerator from './pages/tools/SeoMetaGenerator';
import BulkDescriptionRewriter from './pages/tools/BulkDescriptionRewriter';
import NotFound from './pages/NotFound';
import Analytics from './components/Analytics';

export default function App() {
  return (
    <Router>
      <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/clients" element={<Testimonials />} />
        <Route path="/scenarios" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/tools" element={<ToolsIndex />} />
        <Route path="/tools/product-description-generator" element={<ProductDescriptionGenerator />} />
        <Route path="/tools/shopify-title-generator" element={<ShopifyTitleGenerator />} />
        <Route path="/tools/etsy-tag-generator" element={<EtsyTagGenerator />} />
        <Route path="/tools/review-reply-generator" element={<ReviewReplyGenerator />} />
        <Route path="/tools/ad-copy-generator" element={<AdCopyGenerator />} />
        <Route path="/tools/product-faq-generator" element={<ProductFaqGenerator />} />
        <Route path="/tools/seo-meta-generator" element={<SeoMetaGenerator />} />
        <Route path="/tools/bulk-description-rewriter" element={<BulkDescriptionRewriter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
