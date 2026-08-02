import Link from "next/link";
import { site } from "@/data/site";

/** スマホ向けの追従CTA。フッターに余白(pb-28)を確保しているので重なりません。 */
export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 p-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md gap-2.5">
        <Link
          href="/entry/"
          className="flex-1 rounded-full border border-ink-300 py-3 text-center text-sm font-bold text-ink-700"
        >
          相談フォーム
        </Link>
        <a
          href={site.contact.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.3] rounded-full bg-[#06c755] py-3 text-center text-sm font-bold text-white"
        >
          LINEで無料相談
        </a>
      </div>
    </div>
  );
}
