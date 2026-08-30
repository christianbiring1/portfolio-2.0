"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Bold,
  Code2,
  Eye,
  Heading2,
  ImageIcon,
  Italic,
  Link2,
  List,
  Loader2,
  Quote,
  Rocket,
} from "lucide-react";
import ArticleBody from "@/components/articles/article-body";

type Notice =
  | { kind: "success"; text: string; commitUrl?: string }
  | { kind: "error"; text: string }
  | null;

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

const starter = `Start with a clear opening that tells the reader what they will learn.

## The core idea

Use **Markdown** to structure your thinking. You can add links, images, code, tables, quotes, and lists.

\`\`\`ts
const craft = "clarity over cleverness";
\`\`\`

Finish with a useful takeaway or a question for the reader.`;

export default function ArticleEditor({ locale }: { locale: string }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState("");
  const [language, setLanguage] = useState(locale === "fr" ? "fr" : "en");
  const [content, setContent] = useState(starter);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [publishing, setPublishing] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const previewTitle = useMemo(() => title || "Your article title", [title]);

  function updateTitle(value: string) {
    setTitle(value);
    if (!slugEdited) setSlug(slugify(value));
  }

  function insert(before: string, after = "", placeholder = "text") {
    const input = textarea.current;
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selected = content.slice(start, end) || placeholder;
    const next = `${content.slice(0, start)}${before}${selected}${after}${content.slice(end)}`;
    setContent(next);
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  async function publish(event: FormEvent) {
    event.preventDefault();
    setPublishing(true);
    setNotice(null);

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          coverImage,
          locale: language,
          tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
          content,
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        message?: string;
        commitUrl?: string;
      };

      if (!response.ok) throw new Error(result.error || "Publishing failed.");
      setNotice({
        kind: "success",
        text: result.message || "Article published.",
        commitUrl: result.commitUrl,
      });
    } catch (error) {
      setNotice({
        kind: "error",
        text: error instanceof Error ? error.message : "Publishing failed.",
      });
    } finally {
      setPublishing(false);
    }
  }

  const tools = [
    { label: "Heading", icon: Heading2, action: () => insert("## ", "", "Heading") },
    { label: "Bold", icon: Bold, action: () => insert("**", "**") },
    { label: "Italic", icon: Italic, action: () => insert("_", "_") },
    { label: "Link", icon: Link2, action: () => insert("[", "](https://)", "label") },
    { label: "Image", icon: ImageIcon, action: () => insert("![", "](https://)", "alt text") },
    { label: "Quote", icon: Quote, action: () => insert("> ", "", "Quote") },
    { label: "List", icon: List, action: () => insert("- ", "", "List item") },
    { label: "Code", icon: Code2, action: () => insert("`", "`") },
  ];

  return (
    <form onSubmit={publish} className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-2 border-b border-slate-200 dark:border-slate-800 md:hidden">
          {(["write", "preview"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold capitalize ${
                tab === value
                  ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
                  : "text-slate-500"
              }`}
            >
              {value === "write" ? <Code2 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {value}
            </button>
          ))}
        </div>

        <div className="grid min-h-[760px] md:grid-cols-2">
          <div className={`${tab === "preview" ? "hidden" : "flex"} min-w-0 flex-col md:flex`}>
            <div className="flex flex-wrap gap-1 border-b border-slate-200 p-2 dark:border-slate-800">
              {tools.map(({ label, icon: Icon, action }) => (
                <button
                  key={label}
                  type="button"
                  title={label}
                  aria-label={label}
                  onClick={action}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-violet-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-violet-300"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <textarea
              ref={textarea}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              aria-label="Article Markdown"
              className="min-h-[710px] flex-1 resize-none bg-transparent p-6 font-mono text-sm leading-7 text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-200"
              placeholder="Write your story in Markdown…"
            />
          </div>

          <div className={`${tab === "write" ? "hidden" : "block"} min-w-0 overflow-y-auto border-l border-slate-200 bg-slate-50/50 p-7 dark:border-slate-800 dark:bg-slate-950/40 md:block`}>
            <span className="mb-6 hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 md:flex">
              <Eye className="h-4 w-4" /> Live preview
            </span>
            <h1 className="mb-8 text-3xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white">
              {previewTitle}
            </h1>
            <ArticleBody content={content} />
          </div>
        </div>
      </div>

      <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <label htmlFor="article-title" className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Title
            </label>
            <input
              id="article-title"
              value={title}
              onChange={(event) => updateTitle(event.target.value)}
              required
              maxLength={120}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700"
              placeholder="A clear, useful title"
            />
          </div>
          <div>
            <label htmlFor="article-slug" className="text-sm font-bold text-slate-800 dark:text-slate-200">
              URL slug
            </label>
            <input
              id="article-slug"
              value={slug}
              onChange={(event) => {
                setSlugEdited(true);
                setSlug(slugify(event.target.value));
              }}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 font-mono text-xs outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700"
              placeholder="article-url"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="article-excerpt" className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Excerpt
              </label>
              <span className="text-xs text-slate-400">{excerpt.length}/320</span>
            </div>
            <textarea
              id="article-excerpt"
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              required
              minLength={20}
              maxLength={320}
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-sm leading-6 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700"
              placeholder="What will readers get from this article?"
            />
          </div>
          <div>
            <label htmlFor="article-cover" className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Cover image URL <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              id="article-cover"
              type="url"
              value={coverImage}
              onChange={(event) => setCoverImage(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700"
              placeholder="https://…"
            />
          </div>
          <div>
            <label htmlFor="article-tags" className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Tags
            </label>
            <input
              id="article-tags"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700"
              placeholder="Next.js, UX, Engineering"
            />
            <p className="mt-1.5 text-xs text-slate-400">Separate up to 8 tags with commas.</p>
          </div>
          <div>
            <label htmlFor="article-language" className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Language
            </label>
            <select
              id="article-language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>

        {notice && (
          <div
            role="status"
            className={`rounded-xl border p-4 text-sm leading-6 ${
              notice.kind === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                : "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
            }`}
          >
            {notice.text}
            {notice.kind === "success" && notice.commitUrl && (
              <Link href={notice.commitUrl} target="_blank" className="ml-1 font-bold underline">
                View commit
              </Link>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={publishing}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {publishing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Rocket className="h-5 w-5" />}
          {publishing ? "Publishing…" : "Publish article"}
        </button>
        <p className="text-center text-xs leading-5 text-slate-400">
          Publishing creates a Markdown commit. Your hosting provider will rebuild the site from it.
        </p>
      </aside>
    </form>
  );
}
