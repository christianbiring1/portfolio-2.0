import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";
import ArticleCard from "@/components/articles/article-card";
import type { ArticleMeta } from "@/types/article";

export default function ArticlesSection({
  articles,
  locale,
}: {
  articles: ArticleMeta[];
  locale: string;
}) {
  const copy =
    locale === "fr"
      ? {
          eyebrow: "Réflexions",
          title: "Derniers articles",
          subtitle:
            "Des notes pratiques sur le développement logiciel, le produit et la création d’expériences numériques de qualité.",
          emptyTitle: "De nouvelles idées arrivent bientôt.",
          emptyBody:
            "Je prépare mon premier article. Revenez bientôt pour le découvrir.",
          all: "Tous les articles",
        }
      : {
          eyebrow: "Field notes",
          title: "Latest articles",
          subtitle:
            "Practical thoughts on software engineering, product work, and building thoughtful digital experiences.",
          emptyTitle: "Fresh thinking is on the way.",
          emptyBody:
            "I’m preparing the first article for this space. Check back soon.",
          all: "Browse all articles",
        };

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-violet-300 to-transparent dark:via-violet-800" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-400">
              {copy.eyebrow}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {copy.subtitle}
            </p>
          </div>
          {articles.length > 0 && (
            <Link
              href={`/${locale}/articles`}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-violet-700 hover:text-violet-900 dark:text-violet-300 dark:hover:text-violet-200"
            >
              {copy.all}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {articles.length > 0 ? (
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-violet-200 bg-violet-50/50 p-8 text-center dark:border-violet-900 dark:bg-violet-950/20">
            <span className="mb-5 rounded-2xl bg-white p-3 text-violet-600 shadow-sm dark:bg-slate-900 dark:text-violet-300">
              <PenLine className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">
              {copy.emptyTitle}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
              {copy.emptyBody}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
