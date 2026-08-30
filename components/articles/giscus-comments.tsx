"use client";

import { useEffect, useRef } from "react";
import { MessageSquareText } from "lucide-react";
import { useTheme } from "next-themes";

const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

export default function GiscusComments({ locale = "en" }: { locale?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const configured = Boolean(repo && repoId && category && categoryId);

  useEffect(() => {
    if (!configured || !container.current) return;

    container.current.replaceChildren();
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo!);
    script.setAttribute("data-repo-id", repoId!);
    script.setAttribute("data-category", category!);
    script.setAttribute("data-category-id", categoryId!);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", locale === "fr" ? "fr" : "en");
    script.setAttribute("data-loading", "lazy");
    container.current.appendChild(script);
  }, [configured, locale, resolvedTheme]);

  return (
    <section className="mt-16 border-t border-slate-200 pt-12 dark:border-slate-800">
      <div className="mb-8 flex items-start gap-3">
        <span className="rounded-xl bg-violet-100 p-2.5 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
          <MessageSquareText className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">
            Join the conversation
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Comments are powered by GitHub Discussions through Giscus.
          </p>
        </div>
      </div>
      {configured ? (
        <div ref={container} />
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:text-slate-300">
          Comments will appear here once the Giscus repository and discussion category
          are configured.
        </div>
      )}
    </section>
  );
}
