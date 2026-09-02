import { POSTS1 } from './_posts1';
import { POSTS2 } from './_posts2';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: 'agents' | 'reasoning' | 'enterprise';
  keywords: string[];
  content: string[];
};

export const BLOG_CATEGORIES = {
  agents: { label: 'AI Agents', description: 'Orchestration, memory, and production reliability.' },
  reasoning: { label: 'AI Reasoning', description: 'RAG vs synthesis, latency, and reasoning engineering.' },
  enterprise: { label: 'Enterprise', description: 'Compliance, security, and copilot trust.' },
} as const;

export type BlogCategory = keyof typeof BLOG_CATEGORIES;

export const BLOG_POSTS: BlogPost[] = [...POSTS1, ...POSTS2].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function postsByCategory(category: BlogCategory): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category);
}
