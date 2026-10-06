import type { Metadata } from "next";
import { IchiniFooter } from "@/components/ichini/Footer";
import { IchiniHeader } from "@/components/ichini/Header";
import { IchiniStickyCta } from "@/components/ichini/StickyCta";
import { ichini } from "@/data/ichini";
import { absoluteUrl } from "@/lib/url";

/**
 * イチニキャリア（2回目・3回目の転職向け）の枠。
 *
 * ゼロイチITとは別ブランドとして見せるため、ヘッダー・フッター・
 * タイトル・アイコンをすべてここで差し替える。
 * LINE公式アカウントと運営者は共通。
 *
 * OGP画像はまだ専用のものがないので指定していない
 * （ゼロイチITの画像が出ると別ブランドに見えないため、あえて継承させない）。
 */
const title = `${ichini.name}｜${ichini.tagline}`;
const iconUrl = absoluteUrl("/ichini-icon.svg");

export const metadata: Metadata = {
  title: {
    // default だと親（ゼロイチIT）の template が掛かり「｜ゼロイチIT」が付くため absolute にする
    absolute: title,
    template: `%s｜${ichini.name}`,
  },
  description: ichini.description,
  icons: { icon: iconUrl, apple: iconUrl },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: ichini.name,
    url: absoluteUrl(ichini.home),
    title,
    description: ichini.description,
  },
  twitter: {
    card: "summary",
    title,
    description: ichini.description,
  },
};

export default function IchiniLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <IchiniHeader />
      <main id="main">{children}</main>
      <IchiniFooter />
      <IchiniStickyCta />
    </>
  );
}
