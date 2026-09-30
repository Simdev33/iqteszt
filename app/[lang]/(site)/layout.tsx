import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { langOf } from "@/lib/i18n/server";

export default async function SiteLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = await langOf(params);
  return (
    <SmoothScroll>
      <Header />
      <main>{children}</main>
      <Footer lang={lang} />
    </SmoothScroll>
  );
}
