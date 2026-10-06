import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCta } from "@/components/StickyCta";

/**
 * ゼロイチIT（未経験向け）のページに共通の枠。
 *
 * (zeroichi) はルートグループなので、URLには出ない。
 * /about/ や /jobs/ などの既存URLはそのまま。
 */
export default function ZeroichiLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <StickyCta />
    </>
  );
}
