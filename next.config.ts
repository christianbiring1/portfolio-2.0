// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";
import i18nConfig from "./i18n/config";

const withNextIntl = createNextIntlPlugin(i18nConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
