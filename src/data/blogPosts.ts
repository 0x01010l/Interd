import { POSTS1 } from './_posts1';
import { POSTS2 } from './_posts2';
import { POSTS3 } from './_posts3';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: 'waec' | 'bece' | 'study' | 'writing';
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [...POSTS1, ...POSTS2, ...POSTS3].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function postsByCategory(category: BlogPost['category']): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category);
}
