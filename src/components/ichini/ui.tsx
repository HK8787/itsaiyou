import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/data/site";

/**
 * イチニキャリアの部品。
 *
 * ── 「AIっぽさ」を避けるために決めたこと ──
 * 一度、ローマ数字・字間の広い英字・◆の飾り罫・四隅の額縁・金のグラデーション文字・
 * ぼかした光を全部入れた版を作ったところ、「AI感が強い」と言われた。
 * どれも「生成された高級LP」の定番で、全部そろうと型にしか見えない。
 *
 * - 飾りは足さない。罫線と余白と文字の大きさの差だけで見せる
 * - 金は単色。グラデーションや光沢アニメーションは使わない
 * - 見出しの上に英語を置かない。置くなら日本語の小さなラベル
 * - 全部を中央揃えにしない。基本は左揃え、ページの中で一度だけ大きく崩す
 * - 文章は「誰が言っているか」が見える一人称で、具体的に
 *
 * LINEボタンは緑ではなく金。黒と金の画面に緑を置くと浮くため。
 * そのかわり、ボタンの文言には必ず「LINE」を入れる。
 * target="_blank" を付けない理由は LineButton.tsx のコメントと同じ。
 */

/** 主導線。金の地に黒文字 */
export function GoldLineButton({
  children = "LINEで相談する",
  size = "md",
  block = false,
}: {
  children?: string;
  size?: "md" | "lg";
  block?: boolean;
}) {
  const sizing =
    size === "lg"
      ? `${block ? "px-5" : "px-9"} py-[1.15rem] text-base`
      : "px-6 py-3 text-sm";

  return (
    <a
      href={site.contact.lineUrl}
      className={`inline-flex items-center justify-between gap-8 bg-gold-400 font-bold tracking-[0.06em] whitespace-nowrap text-noir-950 transition-colors duration-300 hover:bg-gold-300 ${sizing} ${
        block ? "w-full" : ""
      }`}
    >
      <span>{children}</span>
      <span aria-hidden>→</span>
    </a>
  );
}

/** 副導線。下線だけのテキストリンク */
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 border-b border-ivory-faint/60 pb-1.5 text-sm tracking-[0.04em] text-ivory transition-colors duration-300 hover:border-gold-300 hover:text-gold-200"
    >
      {children}
      <span aria-hidden className="text-gold-400">
        →
      </span>
    </Link>
  );
}

/** ボタンが効かないときの逃げ道（LineIdNote の黒地版） */
export function SalonLineNote() {
  return (
    <p className="text-xs leading-relaxed text-ivory-faint">
      {"ボタンが反応しない場合は、LINEで "}
      <b className="font-bold text-ivory-dim select-all">
        {site.contact.lineId}
      </b>
      {" を検索してください"}
    </p>
  );
}

/**
 * セクション見出し。左揃え。
 * 上に小さな日本語のラベル（金）、下に明朝の見出し。
 */
export function SectionLabel({
  label,
  title,
  lead,
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-3 text-[0.78rem] tracking-[0.08em] text-gold-400">
        <span aria-hidden className="h-px w-6 bg-gold-400" />
        {label}
      </p>
      <h2 className="mt-5 font-mincho text-[1.65rem] leading-[1.55] font-bold text-ivory sm:text-[2.2rem] text-balance-ja">
        {title}
      </h2>
      {lead ? (
        <p className="mt-6 text-[0.95rem] leading-[2] text-ivory-dim">{lead}</p>
      ) : null}
    </div>
  );
}
