import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCta } from "@/components/StickyCta";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/url";
import "./globals.css";

// OGP や favicon は絶対URLで指定する。
// site.url がサブディレクトリを含むため、"/ogp.png" のような絶対パスを
// metadataBase に対する相対指定として渡すと、サブディレクトリが落ちてしまう。
const ogImage = absoluteUrl("/ogp.png");
const iconUrl = absoluteUrl("/icon.png");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}｜${site.tagline}`,
    template: `%s｜${site.name}`,
  },
  description: site.description,
  icons: { icon: iconUrl, apple: iconUrl },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: site.name,
    url: site.url,
    title: `${site.name}｜${site.tagline}`,
    description: site.description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name}｜${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}｜${site.tagline}`,
    description: site.description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCta />

        {/*
          Cloudflare Web Analytics。site.analyticsToken が空のあいだは
          何も出力しないので、未設定でも外部リクエストは発生しない。
          Cookieを使わず個人を特定しないため、同意バナーは不要。
        */}
        {site.analyticsToken ? (
          <script
            type="module"
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: site.analyticsToken })}
          />
        ) : null}
      </body>
    </html>
  );
}
