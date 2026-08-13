import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import Analytics from './components/Analytics';
import { CATEGORIES } from './data/site';

function CategoryOrPost() {
  const { slug } = useParams();
  if (CATEGORIES.some((c) => c.slug === slug)) return <Blog />;
  return <BlogPost />;
}

export default function App() {
  return (
    <Router>
      <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guides" element={<Blog />} />
        <Route path="/guides/:slug" element={<CategoryOrPost />} />
        <Route path="/blog" element={<Navigate to="/guides" replace />} />
        <Route path="/blog/:slug" element={<Navigate to="/guides" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/services" element={<Navigate to="/guides" replace />} />
        <Route path="/clients" element={<Navigate to="/about" replace />} />
        <Route path="/tools" element={<Navigate to="/guides" replace />} />
        <Route path="/tools/*" element={<Navigate to="/guides" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
