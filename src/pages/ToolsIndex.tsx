import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  Type,
  Tag,
  Heart,
  Megaphone,
  ListChecks,
  Search,
  RefreshCw,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { TOOLS } from '../data/tools';

const TOOL_ICONS: Record<string, LucideIcon> = {
  'product-description-generator': FileText,
  'shopify-title-generator': Type,
  'etsy-tag-generator': Tag,
  'review-reply-generator': Heart,
  'ad-copy-generator': Megaphone,
  'product-faq-generator': ListChecks,
  'seo-meta-generator': Search,
  'bulk-description-rewriter': RefreshCw,
};

export default function ToolsIndex() {
  const toolsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free Ecommerce AI Tools Suite | Interdot',
    description:
      'Free Interdot AI tools that demonstrate ecommerce writing agents — product descriptions, Shopify titles, Etsy tags, review replies, ad copy, FAQs, SEO metas, and bulk rewrites.',
    url: 'https://interdot.net/tools',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Interdot',
      url: 'https://interdot.net',
    },
    about: {
      '@type': 'Thing',
      name: 'Custom AI agents and free ecommerce writing tools',
    },
    hasPart: TOOLS.map((tool) => ({
      '@type': 'SoftwareApplication',
      name: tool.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      url: `https://interdot.net${tool.path}`,
      description: tool.metaDescription,
    })),
  };

  return (
    <PageLayout>
      <SEO
        title="Free Ecommerce AI Tools | Interdot Custom Agents"
        description="Free Interdot AI writing tools that prove our ecommerce agents in public — product descriptions, Shopify titles, Etsy tags, review replies, ads, FAQs, SEO metas, and bulk rewrites."
        path="/tools"
        keywords="free AI tools, ecommerce AI agents, product description generator, Shopify title generator, Etsy tag generator, SEO meta generator, Interdot"
        jsonLd={toolsJsonLd}
      />
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0070FF22,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-brand-accent/30 mb-6">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              <span className="mono-label !text-brand-accent">8 free tools</span>
            </div>
            <h2 className="mono-label mb-4">Free Agent Workflows</h2>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Ecommerce writing agents you can use free
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              These free tools are public proofs of Interdot&apos;s ecommerce agents —
              focused generators with human-written guides. Need a deeper custom agent for your catalog? Contact us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOOLS.map((tool, index) => {
              const Icon = TOOL_ICONS[tool.slug] || Sparkles;
              return (
                <Link key={tool.slug} to={tool.path} className="bento-card group block relative overflow-hidden">
                  <div className="absolute top-6 right-6 mono-label text-white/20 group-hover:text-brand-accent/40 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="w-14 h-14 bg-brand-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 transition-colors">
                    <Icon className="w-7 h-7 text-brand-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-accent transition-colors pr-10">
                    {tool.name}
                  </h3>
                  <p className="text-white/50 leading-relaxed mb-8">{tool.benefit}</p>
                  <span className="inline-flex items-center gap-2 text-brand-accent font-semibold text-sm">
                    Open tool <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
