import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import ArticleBody from "@/components/articles/article-body";
import ArticleNav from "@/components/articles/article-nav";
import GiscusComments from "@/components/articles/giscus-comments";
import ShareArticle from "@/components/articles/share-article";
import { getArticle, getArticleSlugs } from "@/lib/articles";

export async function generateStaticParams() {
  return getArticleSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticle(slug);

  if (!article || article.locale !== locale) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const url = siteUrl ? `${siteUrl}/${locale}/articles/${slug}` : undefined;

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: "Christian Biringanine" }],
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      tags: article.tags,
      images: article.coverImage ? [{ url: article.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  };
}

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = await getArticle(slug);

  if (!article || article.locale !== locale) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const articleUrl = siteUrl ? `${siteUrl}/${locale}/articles/${slug}` : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Person", name: "Christian Biringanine" },
    mainEntityOfPage: articleUrl,
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ArticleNav locale={locale} />
      <article>
        <header className="relative overflow-hidden border-b border-slate-200 bg-slate-50 px-4 py-16 dark:border-slate-800 dark:bg-slate-950 sm:px-6 sm:py-24">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-700/10" />
          <div className="relative mx-auto max-w-3xl">
            <Link
              href={`/${locale}/articles`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-700 dark:text-slate-400"
            >
              <ArrowLeft className="h-4 w-4" />
              All articles
            </Link>
            <div className="mt-10 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {article.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-slate-200 pt-6 dark:border-slate-800">
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Christian Biringanine
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt, locale)}
                </time>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" />
                  {article.readingTime} min
                </span>
              </div>
              <ShareArticle title={article.title} />
            </div>
          </div>
        </header>

        {article.coverImage && (
          <div className="mx-auto -mb-4 max-w-5xl px-4 pt-10 sm:px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage}
              alt=""
              className="aspect-[16/8] w-full rounded-3xl object-cover shadow-xl"
            />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <ArticleBody content={article.content} />
          <GiscusComments locale={locale} />
        </div>
      </article>
    </main>
  );
}
