import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const ownerLogin = process.env.ADMIN_GITHUB_LOGIN?.trim().toLowerCase();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    error: "/en/admin/articles",
  },
  callbacks: {
    async signIn({ profile }) {
      if (!ownerLogin || !profile || !("login" in profile)) return false;
      return String(profile.login).toLowerCase() === ownerLogin;
    },
    async jwt({ token, profile }) {
      if (profile && "login" in profile) {
        token.githubLogin = String(profile.login);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.login = token.githubLogin;
      return session;
    },
  },
};

export function isAdminLogin(login?: string | null) {
  return Boolean(
    ownerLogin && login && login.toLowerCase() === ownerLogin,
  );
}

export function isGitHubAuthConfigured() {
  return Boolean(
    process.env.GITHUB_ID &&
      process.env.GITHUB_SECRET &&
      process.env.NEXTAUTH_SECRET &&
      process.env.ADMIN_GITHUB_LOGIN,
  );
}
