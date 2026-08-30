import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Article, ArticleMeta } from "@/types/article";

const articlesDirectory = path.join(process.cwd(), "content", "articles");
const wordsPerMinute = 220;

function toString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function toTags(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter((tag): tag is string => typeof tag === "string");
  }

  return typeof value === "string"
    ? value.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];
}

function calculateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

async function readArticle(filename: string): Promise<Article | null> {
  try {
    const source = await fs.readFile(path.join(articlesDirectory, filename), "utf8");
    const { data, content } = matter(source);
    const slug = filename.replace(/\.mdx?$/, "");

    if (data.draft === true || !data.title || !data.excerpt || !data.publishedAt) {
      return null;
    }

    return {
      slug,
      title: toString(data.title),
      excerpt: toString(data.excerpt),
      publishedAt: new Date(data.publishedAt).toISOString(),
      updatedAt: data.updatedAt
        ? new Date(data.updatedAt).toISOString()
        : undefined,
      coverImage: toString(data.coverImage) || undefined,
      tags: toTags(data.tags),
      locale: toString(data.locale, "en"),
      readingTime:
        typeof data.readingTime === "number"
          ? data.readingTime
          : calculateReadingTime(content),
      content,
    };
  } catch {
    return null;
  }
}

export async function getArticles(locale?: string): Promise<ArticleMeta[]> {
  let files: string[] = [];

  try {
    files = await fs.readdir(articlesDirectory);
  } catch {
    return [];
  }

  const articles = await Promise.all(
    files
      .filter((filename) => /\.mdx?$/.test(filename))
      .map((filename) => readArticle(filename)),
  );

  return articles
    .filter((article): article is Article => Boolean(article))
    .filter((article) => !locale || article.locale === locale)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .map(({ content, ...meta }) => {
      void content;
      return meta;
    });
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return readArticle(`${slug}.md`);
}

export async function getArticleSlugs() {
  const articles = await getArticles();
  return articles.map(({ slug, locale }) => ({ slug, locale }));
}
