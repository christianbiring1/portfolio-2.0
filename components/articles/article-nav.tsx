import Link from "next/link";
import { Code2 } from "lucide-react";
import LanguageSwitcher from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function ArticleNav({ locale }: { locale: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-bold tracking-tight text-slate-950 dark:text-white"
        >
          <span className="rounded-lg bg-violet-600 p-1.5 text-white">
            <Code2 className="h-4 w-4" />
          </span>
          Christian Biringanine
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/articles`}
            className="mr-2 hidden text-sm font-semibold text-slate-600 hover:text-violet-700 dark:text-slate-300 dark:hover:text-violet-300 sm:block"
          >
            Writing
          </Link>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
