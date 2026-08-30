"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export default function ShareArticle({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const data = { title, url: window.location.href };

    if (navigator.share) {
      await navigator.share(data).catch(() => undefined);
      return;
    }

    await navigator.clipboard.writeText(data.url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-violet-300 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
