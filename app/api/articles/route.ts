import matter from "gray-matter";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  authOptions,
  isAdminLogin,
  isGitHubAuthConfigured,
} from "@/lib/auth";

const articleSchema = z.object({
  title: z.string().trim().min(3).max(120),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100),
  excerpt: z.string().trim().min(20).max(320),
  coverImage: z.union([
    z.literal(""),
    z
      .string()
      .url()
      .max(1000)
      .refine(
        (value) => ["http:", "https:"].includes(new URL(value).protocol),
        "Cover image must use HTTP or HTTPS",
      ),
  ]),
  tags: z.array(z.string().trim().min(1).max(30)).max(8),
  locale: z.enum(["en", "fr"]),
  content: z.string().trim().min(50).max(100_000),
});

function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 220));
}

export async function POST(request: Request) {
  if (!isGitHubAuthConfigured()) {
    return NextResponse.json(
      { error: "GitHub authentication is not configured on the server." },
      { status: 503 },
    );
  }

  const session = await getServerSession(authOptions);

  if (!isAdminLogin(session?.user?.login)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = articleSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid article" },
      { status: 400 },
    );
  }

  const token = process.env.GITHUB_CONTENT_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const branch = process.env.GITHUB_REPO_BRANCH ?? "main";

  if (!token || !owner || !repo) {
    return NextResponse.json(
      { error: "Article publishing is not configured on the server." },
      { status: 503 },
    );
  }

  const article = parsed.data;
  const publishedAt = new Date().toISOString();
  const markdown = matter.stringify(article.content, {
    title: article.title,
    excerpt: article.excerpt,
    publishedAt,
    coverImage: article.coverImage || undefined,
    tags: [...new Set(article.tags)],
    locale: article.locale,
    readingTime: readingTime(article.content),
  });
  const filePath = `content/articles/${article.slug}.md`;
  const endpoint = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${filePath}`;

  const githubResponse = await fetch(endpoint, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      message: `content: publish ${article.slug}`,
      content: Buffer.from(markdown).toString("base64"),
      branch,
    }),
  });

  if (!githubResponse.ok) {
    const details = (await githubResponse.json().catch(() => null)) as
      | { message?: string }
      | null;
    const status = githubResponse.status === 422 ? 409 : 502;
    return NextResponse.json(
      { error: details?.message ?? "GitHub could not publish the article." },
      { status },
    );
  }

  const result = (await githubResponse.json()) as {
    commit?: { html_url?: string };
  };

  return NextResponse.json(
    {
      slug: article.slug,
      locale: article.locale,
      commitUrl: result.commit?.html_url,
      message: "Published. Your deployment will include the article after it rebuilds.",
    },
    { status: 201 },
  );
}
