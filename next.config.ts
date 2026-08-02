import type { NextConfig } from "next";

/**
 * 静的書き出し（output: "export"）でビルドします。
 * out/ ディレクトリがそのまま公開できるので、
 * Vercel / Netlify / Cloudflare Pages / さくらのレンタルサーバ等どこにでも置けます。
 *
 * GitHub Pages のようにサブディレクトリ配信をする場合のみ
 * BASE_PATH=/リポジトリ名 を指定してビルドしてください。
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
