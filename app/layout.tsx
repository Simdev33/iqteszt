import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import { MatrixDefs } from "@/components/matrix/MatrixCell";
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

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `Online IQ-teszt azonnali eredménnyel · ${brand.name}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Mennyi az IQ-d? 30 feladat mintázatfelismerésből, számsorokból, verbális és logikai gondolkodásból. Regisztráció nélkül, azonnali IQ-becsléssel, percentilissel és területenkénti bontással.",
  keywords: ["IQ teszt", "online IQ teszt", "IQ mérés", "intelligencia teszt", "mátrix teszt", "IQ skála"],
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: brand.name,
    title: "Mennyi az IQ-d? · Online IQ-teszt",
    description: "30 feladat, kb. 12 perc, azonnali eredmény – regisztráció nélkül.",
  },
};

export const viewport: Viewport = {
  themeColor: "#13172d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${unbounded.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>
        <MatrixDefs />
        {children}
      </body>
    </html>
  );
}
