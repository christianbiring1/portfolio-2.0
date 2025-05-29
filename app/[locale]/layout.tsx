import type React from "react";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

// const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Christian Biringanine | Portfolio",
  description:
    "Chistian Biringanine's professional portfolio showcasing my skills and experience",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { children } = props;

  // ✅ Await the params explicitly
  const { locale } = await Promise.resolve(props.params);

  // console.log("locale >>>>>>>>", locale);

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;

    // console.log("messages >>>>>>>>>", messages);
  } catch (error) {
    console.error("❌ Error loading messages:", error);
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={raleway.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
