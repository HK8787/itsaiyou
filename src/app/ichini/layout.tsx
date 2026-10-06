import type { Metadata } from "next";
import { Shippori_Mincho } from "next/font/google";
import { IchiniFooter } from "@/components/ichini/Footer";
import { IchiniHeader } from "@/components/ichini/Header";
import { IchiniStickyCta } from "@/components/ichini/StickyCta";
import { ichini } from "@/data/ichini";
import { absoluteUrl } from "@/lib/url";

/**
 * イチニキャリア（2回目・3回目の転職向け）の枠。
 *
 * ゼロイチITとは別ブランドとして見せるため、ヘッダー・フッター・
 * タイトル・アイコン・フォント・配色（黒 × 金）を
 * すべてここで差し替える。
 * LINE公式アカウントと運営者は共通。
 *
 * OGP画像はまだ専用のものがないので指定していない
 * （ゼロイチITの画像が出ると別ブランドに見えないため、あえて継承させない）。
 */
/*
 * 見出しは明朝（しっぽり明朝）。本文はゼロイチITと同じゴシック体のまま。
 * next/font はビルド時にフォントを取り込んで自サイトから配信するので、
 * 閲覧時に Google へリクエストは飛ばない。
 *
 * しっぽり明朝の日本語部分は、Google Fonts の unicode-range 分割どおりに
 * 使った文字の分だけ読み込まれる。preload は欧文の分だけ。
 */
const mincho = Shippori_Mincho({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
});


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
    <div
      className={`ichini-root ${mincho.variable} min-h-screen bg-noir-950 text-ivory selection:bg-gold-400/30 selection:text-ivory`}
    >
      <IchiniHeader />
      <main id="main">{children}</main>
      <IchiniFooter />
      <IchiniStickyCta />
    </div>
  );
}
