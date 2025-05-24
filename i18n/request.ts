import { getRequestConfig } from "next-intl/server";
// import { defaultLocale } from "./config";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    console.warn("⚠️ No locale found. Falling back to defaultLocale.");
  }

  const selectedLocale = locale || "en";

  return {
    locale: selectedLocale,
    messages: (await import(`@/messages/${selectedLocale}.json`)).default,
  };
});
