"use client";

import { signIn, signOut } from "next-auth/react";
import { Github, LogOut } from "lucide-react";

export function GitHubSignIn({ callbackUrl }: { callbackUrl: string }) {
  return (
    <button
      type="button"
      onClick={() => signIn("github", { callbackUrl })}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-200"
    >
      <Github className="h-5 w-5" />
      Continue with GitHub
    </button>
  );
}

export function GitHubSignOut() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/en/admin/articles" })}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}
