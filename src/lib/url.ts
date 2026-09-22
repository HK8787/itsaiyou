import "server-only";

import { site } from "@/data/site";

/**
 * サイト内のパスから絶対URLを作る。
 *
 * site.url がサブディレクトリを含む場合（GitHub Pages の
 * https://hk8787.github.io/itsaiyou など）、new URL("/courses/", site.url) は
 * 絶対パスがベースのパスを上書きしてしまい、サブディレクトリが消える。
 * ベースを必ず "/" 終わりにし、パス側の先頭スラッシュを落として解決する。
 */
export function absoluteUrl(path: string): string {
  const base = site.url.endsWith("/") ? site.url : `${site.url}/`;
  return new URL(path.replace(/^\//, ""), base).toString();
}
