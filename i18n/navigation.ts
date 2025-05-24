// i18n/navigation.ts
"use client";

import {
  useRouter as useNextRouter,
  usePathname as useNextPathname,
} from "next/navigation";
import { useLocale } from "next-intl";
import { locales, defaultLocale } from "./config";

export { locales, defaultLocale };

// Custom hook that wraps Next.js router
export function useRouter() {
  const nextRouter = useNextRouter();
  const locale = useLocale();

  return {
    ...nextRouter,
    push: (href: string, options?: { locale?: string }) => {
      const targetLocale = options?.locale || locale;
      const path =
        targetLocale === defaultLocale ? href : `/${targetLocale}${href}`;
      nextRouter.push(path);
    },
    replace: (href: string, options?: { locale?: string }) => {
      const targetLocale = options?.locale || locale;
      const path =
        targetLocale === defaultLocale ? href : `/${targetLocale}${href}`;
      nextRouter.replace(path);
    },
  };
}

// Custom hook that returns the current pathname
export function usePathname() {
  const pathname = useNextPathname();
  const locale = useLocale();

  // Remove the locale prefix from the pathname
  if (locale === defaultLocale) return pathname;
  return pathname.replace(new RegExp(`^/${locale}`), "") || "/";
}

// Placeholder for Link and redirect to avoid errors
// You'll need to implement these properly or use Next.js's Link directly
export const Link = null;
export const redirect = null;
