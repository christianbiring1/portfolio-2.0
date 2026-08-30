import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleCard from "@/components/articles/article-card";
import ArticleNav from "@/components/articles/article-nav";
import { getArticles } from "@/lib/articles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "fr" ? "Articles" : "Writing";
  const description =
    locale === "fr"
      ? "Réflexions de Christian Biringanine sur le logiciel, le produit et l’expérience utilisateur."
      : "Christian Biringanine’s practical notes on software, product, and user experience.";

  return { title, description };
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const articles = await getArticles(locale);
  const copy =
    locale === "fr"
      ? {
          eyebrow: "Journal",
          title: "Idées, leçons et notes de terrain.",
          body: "Des articles sur la création de logiciels fiables, d’interfaces utiles et de produits qui respectent leurs utilisateurs.",
          empty: "Aucun article publié pour le moment.",
          back: "Retour au portfolio",
        }
      : {
          eyebrow: "The journal",
          title: "Ideas, lessons, and notes from the field.",
          body: "Long-form writing about reliable software, useful interfaces, and products that respect the people who use them.",
          empty: "No articles have been published yet.",
          back: "Back to portfolio",
        };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <ArticleNav locale={locale} />
      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-4 py-20 dark:border-slate-800 dark:bg-slate-950 sm:px-6">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-700/10" />
        <div className="relative mx-auto max-w-6xl">
          <Link
            href={`/${locale}`}
            className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-700 dark:text-slate-400"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.back}
          </Link>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.26em] text-violet-600 dark:text-violet-400">
            {copy.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            {copy.body}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {articles.length ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            {copy.empty}
          </p>
        )}
      </section>
    </main>
  );
}
