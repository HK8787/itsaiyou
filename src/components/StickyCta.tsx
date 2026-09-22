import Link from "next/link";
import { site } from "@/data/site";

/** スマホ向けの追従CTA。フッターに余白(pb-28)を確保しているので重なりません。 */
export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 p-3 backdrop-blur lg:hidden">
      <div className="mx-auto max-w-md">
        <a
          href={site.contact.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-full bg-[#06c755] py-3.5 text-center font-bold text-white"
        >
          LINEで無料相談する
        </a>
        <Link
          href="/entry/"
          className="mt-1.5 block text-center text-xs text-ink-500 underline underline-offset-2"
        >
          フォームから送りたい方はこちら
        </Link>
      </div>
    </div>
  );
}
