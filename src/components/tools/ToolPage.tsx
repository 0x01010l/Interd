import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Copy,
  Download,
  Loader2,
  Sparkles,
  Check,
  Clock,
  FileText,
  Wand2,
  ArrowRight,
  Zap,
  PenLine,
  LayoutTemplate,
  Smile,
  Briefcase,
  Search,
  Minimize2,
  KeyRound,
  Gift,
  Tag,
  Heart,
  Wrench,
  Megaphone,
  Star,
  ListChecks,
  Truck,
  Ruler,
  MousePointerClick,
  Hash,
  Lightbulb,
  Type,
  RefreshCw,
  Shuffle,
  Palette,
  type LucideIcon,
} from 'lucide-react';
import PageLayout from '../PageLayout';
import SEO from '../SEO';
import AdSlot from '../AdSlot';
import { Accordion, AccordionItem } from '../Accordion';
import type { ToolDefinition } from '../../data/tools';
import {
  generateWithAzure,
  getDailyRemaining,
  loadHistory,
  saveHistory,
  type HistoryItem,
} from '../../lib/aiClient';

type Props = {
  tool: ToolDefinition;
};

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

const TEMPLATE_ICONS: Record<string, LucideIcon> = {
  funny: Smile,
  professional: Briefcase,
  seo: Search,
  concise: Minimize2,
  keyword: KeyRound,
  benefit: Gift,
  trending: Zap,
  niche: Tag,
  broad: LayoutTemplate,
  grateful: Heart,
  problem: Wrench,
  brand: Palette,
  urgency: Zap,
  social: Star,
  feature: Lightbulb,
  objections: Megaphone,
  shipping: Truck,
  specs: Ruler,
  click: MousePointerClick,
  dense: Hash,
  shorter: Minimize2,
  unique: Shuffle,
  tone: PenLine,
};

function CharMeter({ value, max = 8000 }: { value: number; max?: number }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-brand-accent/70 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="mono-label !normal-case tracking-normal shrink-0">
        {value.toLocaleString()} chars
      </span>
    </div>
  );
}

export default function ToolPage({ tool }: Props) {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<'ok' | 'err'>('ok');
  const [copied, setCopied] = useState(false);
  const [remaining, setRemaining] = useState(3);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const ToolIcon = TOOL_ICONS[tool.slug] || Wand2;

  useEffect(() => {
    setRemaining(getDailyRemaining());
    setHistory(loadHistory(tool.slug));
  }, [tool.slug]);

  const faqJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tool.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }),
    [tool.faqs]
  );

  const applyTemplate = (id: string) => {
    const tpl = tool.templates.find((t) => t.id === id);
    if (!tpl) return;
    setActiveTemplate(id);
    setPrompt(tpl.prompt);
    setStatus(`${tpl.label} template ready — edit details and generate.`);
    setStatusTone('ok');
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setStatus('Add a few product details before generating.');
      setStatusTone('err');
      return;
    }

    setLoading(true);
    setStatus(null);
    setCopied(false);

    const response = await generateWithAzure({
      prompt: prompt.trim(),
      systemPrompt: tool.systemPrompt,
      toolName: tool.slug,
    });

    const result = response.result || tool.demoOutput;
    setOutput(result);
    const next = saveHistory(tool.slug, { prompt: prompt.trim(), result });
    setHistory(next);

    if (response.result) {
      setStatus(response.cached ? 'Ready (matched a recent identical request).' : 'Ready — copy or download below.');
      setStatusTone('ok');
      if (typeof response.remaining === 'number') setRemaining(response.remaining);
      else setRemaining(getDailyRemaining());
    } else if (response.code === 'rate_limit') {
      setStatus(response.error || 'Daily limit reached. Try again tomorrow.');
      setStatusTone('err');
      setRemaining(0);
    } else if (response.code === 'content_filter') {
      setStatus(response.error || 'Please revise your prompt and try again.');
      setStatusTone('err');
      setRemaining(getDailyRemaining());
    } else {
      setStatus('Ready — copy or download below.');
      setStatusTone('ok');
      setRemaining(getDailyRemaining());
    }

    setLoading(false);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus('Could not copy. Select the text and copy manually.');
      setStatusTone('err');
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.slug}-output.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;

  return (
    <PageLayout title={tool.name}>
      <SEO
        title={`${tool.title} | Interdot`}
        description={tool.metaDescription}
        path={tool.path}
        jsonLd={faqJsonLd}
      />

      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,#0070FF22,transparent_45%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,#0070FF12,transparent_40%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Hero */}
          <div className="mb-12 md:mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-brand-accent/30 mb-6">
                  <ToolIcon className="w-4 h-4 text-brand-accent" />
                  <span className="mono-label !text-brand-accent">Free AI Tool</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight leading-[1.08]">
                  {tool.h1}
                </h1>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed">{tool.benefit}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full lg:w-auto lg:min-w-[340px]">
                {[
                  { label: 'Left today', value: String(remaining), icon: Zap },
                  { label: 'Templates', value: String(tool.templates.length), icon: LayoutTemplate },
                  { label: 'Saved', value: String(history.length), icon: Clock },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-2xl p-4 text-center">
                    <stat.icon className="w-4 h-4 text-brand-accent mx-auto mb-2" />
                    <div className="text-2xl font-mono font-bold">{stat.value}</div>
                    <div className="mono-label mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/tools" className="text-sm text-white/40 hover:text-brand-accent transition-colors">
                ← All tools
              </Link>
              <span className="text-white/20">·</span>
              <span className="mono-label !normal-case tracking-normal text-white/40">
                Azure-powered generation · results stay on your device
              </span>
            </div>
          </div>

          <AdSlot position="top" />

          {/* Workspace */}
          <div className="glass rounded-[2rem] md:rounded-[2.5rem] border-brand-border overflow-hidden mb-16">
            <div className="border-b border-brand-border px-6 md:px-10 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/15 flex items-center justify-center">
                  <Wand2 className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <div className="font-bold">Workspace</div>
                  <div className="mono-label !normal-case tracking-normal">Pick a tone → refine input → generate</div>
                </div>
              </div>
              {loading && (
                <div className="inline-flex items-center gap-2 text-brand-accent text-sm font-medium">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating
                </div>
              )}
            </div>

            <div className="p-6 md:p-10">
              {/* Templates */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <LayoutTemplate className="w-4 h-4 text-brand-accent" />
                  <span className="mono-label">Tone templates</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {tool.templates.map((tpl) => {
                    const Icon = TEMPLATE_ICONS[tpl.id] || Sparkles;
                    const active = activeTemplate === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => applyTemplate(tpl.id)}
                        className={`text-left rounded-2xl p-5 border transition-all ${
                          active
                            ? 'bg-brand-accent/15 border-brand-accent/50 shadow-[0_0_30px_rgba(0,112,255,0.12)]'
                            : 'bg-brand-bg/60 border-brand-border hover:border-brand-accent/40'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                            active ? 'bg-brand-accent text-white' : 'bg-brand-accent/10 text-brand-accent'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="font-bold mb-1">{tpl.label}</div>
                        <div className="text-xs text-white/40 leading-relaxed line-clamp-2">
                          Autofills a starter prompt you can edit
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                {/* Input */}
                <div className="flex flex-col rounded-2xl border border-brand-border bg-brand-bg/80 overflow-hidden min-h-[420px]">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-brand-border bg-white/[0.02]">
                    <label className="flex items-center gap-2 font-semibold text-sm" htmlFor={`${tool.slug}-input`}>
                      <PenLine className="w-4 h-4 text-brand-accent" />
                      Input
                    </label>
                    <span className="mono-label">Step 01</span>
                  </div>
                  <textarea
                    id={`${tool.slug}-input`}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={tool.placeholder}
                    rows={14}
                    className="flex-1 w-full bg-transparent p-5 text-sm md:text-[15px] leading-relaxed text-white/90 placeholder:text-white/30 focus:outline-none resize-none min-h-[280px]"
                  />
                  <div className="px-5 pb-3">
                    <CharMeter value={prompt.length} />
                  </div>
                  <div className="p-4 pt-0">
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={loading}
                      className="w-full bg-brand-accent hover:bg-brand-accent/90 disabled:opacity-60 text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Generating…</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Generate</span>
                          <ArrowRight className="w-4 h-4 opacity-70" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Output */}
                <div className="flex flex-col rounded-2xl border border-brand-border bg-brand-bg/80 overflow-hidden min-h-[420px]">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-brand-border bg-white/[0.02]">
                    <label className="flex items-center gap-2 font-semibold text-sm" htmlFor={`${tool.slug}-output`}>
                      <FileText className="w-4 h-4 text-brand-accent" />
                      Output
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="mono-label mr-1">Step 02</span>
                      <button
                        type="button"
                        onClick={handleCopy}
                        disabled={!output}
                        className="glass px-3 py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-white disabled:opacity-40 flex items-center gap-1.5"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                      <button
                        type="button"
                        onClick={handleDownload}
                        disabled={!output}
                        className="glass px-3 py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-white disabled:opacity-40 flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  </div>
                  <textarea
                    id={`${tool.slug}-output`}
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    placeholder="Your generated copy will appear here."
                    rows={14}
                    className="flex-1 w-full bg-transparent p-5 text-sm md:text-[15px] leading-relaxed text-white/90 placeholder:text-white/30 focus:outline-none resize-none min-h-[280px]"
                  />
                  <div className="px-5 py-3 border-t border-brand-border flex items-center justify-between gap-3">
                    <span className="mono-label !normal-case tracking-normal">
                      {wordCount > 0 ? `${wordCount} words` : 'Waiting for output'}
                    </span>
                    {output && (
                      <button
                        type="button"
                        onClick={() => setOutput('')}
                        className="text-xs text-white/40 hover:text-white transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {status && (
                <div
                  className={`mt-6 rounded-xl px-4 py-3 text-sm border ${
                    statusTone === 'err'
                      ? 'border-red-500/30 bg-red-500/10 text-red-300'
                      : 'border-brand-accent/30 bg-brand-accent/10 text-white/70'
                  }`}
                >
                  {status}
                </div>
              )}

              {history.length > 0 && (
                <div className="mt-10 pt-8 border-t border-brand-border">
                  <div className="flex items-center gap-2 mb-5">
                    <Clock className="w-4 h-4 text-brand-accent" />
                    <h3 className="font-bold">Recent on this device</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {history.slice(0, 6).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setPrompt(item.prompt);
                          setOutput(item.result);
                          setStatus('Loaded from history.');
                          setStatusTone('ok');
                        }}
                        className="text-left rounded-2xl p-4 border border-brand-border bg-brand-bg/50 hover:border-brand-accent/40 transition-colors group"
                      >
                        <div className="mono-label mb-2">
                          {new Date(item.createdAt).toLocaleString()}
                        </div>
                        <p className="text-sm text-white/60 line-clamp-3 group-hover:text-white/80 transition-colors">
                          {item.result}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Guide */}
          <div className="mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-brand-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">How to get the best results</h2>
          </div>

          <article className="glass rounded-[2rem] p-6 md:p-10 mb-16 space-y-6 text-white/70 leading-relaxed text-[15px] md:text-base">
            {tool.guide.body.split('\n\n').map((block, i) => {
              const trimmed = block.trim();
              if (!trimmed) return null;
              const isHeading =
                /^(What is |How to use|Why it |Practical tips|Common |How tags |Building |Testing |Where FAQs |Collection |Operational )/i.test(
                  trimmed
                ) &&
                !trimmed.includes('\n') &&
                trimmed.length < 90;
              if (isHeading) {
                return (
                  <h3 key={i} className="text-xl md:text-2xl font-bold text-white pt-2">
                    {trimmed}
                  </h3>
                );
              }
              if (/^\d+\.\s/.test(trimmed) && trimmed.includes('\n')) {
                return (
                  <div key={i} className="space-y-3 pl-1">
                    {trimmed.split('\n').map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </div>
                );
              }
              return (
                <p key={i} className="whitespace-pre-line">
                  {trimmed}
                </p>
              );
            })}
          </article>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                <ListChecks className="w-5 h-5 text-brand-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Frequently asked questions</h2>
            </div>
            <Accordion>
              {tool.faqs.map((faq, i) => (
                <AccordionItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </Accordion>
          </section>

          <AdSlot position="bottom" />
        </div>
      </section>
    </PageLayout>
  );
}
