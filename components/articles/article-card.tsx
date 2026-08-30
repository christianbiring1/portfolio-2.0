import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import type { ArticleMeta } from "@/types/article";

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function ArticleCard({
  article,
  locale,
}: {
  article: ArticleMeta;
  locale: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70">
      <Link
        href={`/${locale}/articles/${article.slug}`}
        className="relative block aspect-[16/9] overflow-hidden bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-400"
      >
        {article.coverImage ? (
          // Article cover URLs are intentionally author-managed and can use any host.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.coverImage}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              Notes on software &amp; craft
            </span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt, locale)}
          </time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {article.readingTime} min read
          </span>
        </div>
        <h3 className="text-xl font-bold leading-snug tracking-tight text-slate-950 dark:text-white">
          <Link href={`/${locale}/articles/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {article.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/${locale}/articles/${article.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-violet-700 dark:text-violet-300"
        >
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
