import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Github, LockKeyhole, PenTool } from "lucide-react";
import ArticleEditor from "@/components/articles/article-editor";
import ArticleNav from "@/components/articles/article-nav";
import { GitHubSignIn, GitHubSignOut } from "@/components/articles/admin-auth";
import {
  authOptions,
  isAdminLogin,
  isGitHubAuthConfigured,
} from "@/lib/auth";

export const metadata: Metadata = {
  title: "Article studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ArticleAdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const authConfigured = isGitHubAuthConfigured();
  const session = authConfigured ? await getServerSession(authOptions) : null;
  const adminLogin = session?.user?.login;
  const isAdmin = isAdminLogin(adminLogin);

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <ArticleNav locale={locale} />
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-16">
          <section className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
              <LockKeyhole className="h-6 w-6" />
            </span>
            <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-400">
              Private workspace
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              Article studio
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Sign in with the portfolio owner’s GitHub account to write and publish articles.
              Every other GitHub identity is rejected.
            </p>
            <div className="mt-7">
              {authConfigured ? (
                <GitHubSignIn callbackUrl={`/${locale}/admin/articles`} />
              ) : (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-left text-sm leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                  GitHub authentication is not configured yet. Add the required environment variables from <code>.env.example</code>.
                </div>
              )}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <Github className="h-4 w-4" /> OAuth identity verification
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <ArticleNav locale={locale} />
      <div className="mx-auto max-w-[1480px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
              <PenTool className="h-4 w-4" /> Owner workspace
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              Create an article
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Signed in as @{adminLogin}
            </p>
          </div>
          <GitHubSignOut />
        </div>
        <ArticleEditor locale={locale} />
      </div>
    </main>
  );
}
