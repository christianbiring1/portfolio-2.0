export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  coverImage?: string;
  tags: string[];
  locale: string;
  readingTime: number;
};

export type Article = ArticleMeta & {
  content: string;
};
