# Christian Biringanine — portfolio and writing

A Next.js portfolio with bilingual pages, a GitHub-backed Markdown publishing
studio, and Giscus comments.

## Article workflow

- Public article index: `/en/articles` and `/fr/articles`
- Private writing studio: `/en/admin/articles`
- Markdown files: `content/articles/*.md`
- Comments: one GitHub Discussion per article, managed by Giscus

The studio authenticates with GitHub OAuth and compares the returned GitHub
login with `ADMIN_GITHUB_LOGIN`. The publishing API performs the same check and
then uses a server-only, fine-grained token to commit the Markdown file. The
token is never included in the browser session.

## Getting started

Copy the environment template and install dependencies:

```bash
cp .env.example .env.local
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:8000](http://localhost:8000). The default locale is
redirected to `/en` by the locale middleware.

## Configure owner-only GitHub access

1. In GitHub, create an OAuth App under **Settings → Developer settings → OAuth Apps**.
2. For local development, use `http://localhost:8000` as the homepage and
   `http://localhost:8000/api/auth/callback/github` as the callback URL. Use the
   production domain for the production OAuth App.
3. Copy the client ID and client secret to `GITHUB_ID` and `GITHUB_SECRET`.
4. Generate `NEXTAUTH_SECRET` with `openssl rand -base64 32` and set
   `NEXTAUTH_URL` to the site origin.
5. Set `ADMIN_GITHUB_LOGIN` to the one GitHub username allowed into the studio.
6. Create a fine-grained personal access token limited to this repository with
   **Contents: Read and write**, then store it as `GITHUB_CONTENT_TOKEN`.
7. Set `GITHUB_REPO_OWNER`, `GITHUB_REPO_NAME`, and `GITHUB_REPO_BRANCH`.

Publishing creates `content/articles/<slug>.md` on the configured branch. A
connected host such as Vercel will rebuild automatically after the commit. If
the branch requires pull requests, either allow the token to push or adapt the
publishing endpoint to create a feature branch.

## Configure Giscus comments

1. Make the repository public, enable **Discussions**, and install the Giscus
   GitHub App for the repository.
2. Open [giscus.app](https://giscus.app), enter the repository, and choose a
   discussion category such as **Announcements**.
3. Copy the generated repository ID and category ID into the four
   `NEXT_PUBLIC_GISCUS_*` variables in `.env.local` and in the hosting provider.

Comments are mapped by pathname, so each localized article URL has its own
discussion. Visitors sign in with GitHub through Giscus; they never receive
access to the article studio.

## Content format

Each article is standard Markdown with YAML frontmatter:

```md
---
title: A useful article title
excerpt: A concise description used in cards and social previews.
publishedAt: 2026-08-30T12:00:00.000Z
coverImage: https://example.com/cover.jpg
tags:
  - Next.js
  - UX
locale: en
readingTime: 5
---

## Your article starts here

Write with **Markdown**, including tables, task lists, links, images, and code.
```

Raw HTML is intentionally not rendered. This keeps public article pages safe
while supporting GitHub-flavored Markdown.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```
