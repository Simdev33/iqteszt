import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import "../globals.css";
import { MatrixDefs } from "@/components/matrix/MatrixCell";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { LOCALES, LOCALE_TAGS, path } from "@/lib/i18n/config";
import { getDict, langOf } from "@/lib/i18n/server";
import { prices } from "@/lib/pricing";
import { brand } from "@/lib/site";

const unbounded = Unbounded({
  subsets: ["latin", "latin-ext"],
  variable: "--font-unbounded",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const lang = await langOf(params);
  const t = getDict(lang);
  return {
    metadataBase: new URL(brand.url),
    title: {
      default: `${t.meta.siteTitle} · ${brand.name}`,
      template: `%s · ${brand.name}`,
    },
    description: t.meta.siteDescription,
    keywords: t.meta.keywords,
    alternates: {
      canonical: path(lang, "home"),
      languages: Object.fromEntries(LOCALES.map((l) => [l, path(l, "home")])),
    },
    openGraph: {
      type: "website",
      locale: LOCALE_TAGS[lang].replace("-", "_"),
      siteName: brand.name,
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#13172d",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = await langOf(params);
  return (
    <html lang={lang} className={`${unbounded.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>
        <MatrixDefs />
        <I18nProvider lang={lang} t={getDict(lang)} prices={prices(lang)}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
