import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/data/site";

/**
 * イチニキャリアの部品（漆黒 × シャンパンゴールド）。
 *
 * ゼロイチITの LineButton は LINE の緑だが、こちらは金で統一する。
 * 緑のボタンを置くと、黒と金の空気が一気に崩れるため。
 * そのかわり、ボタンの文言には必ず「LINE」を入れ、小さな吹き出しの印を付ける。
 *
 * target="_blank" を付けない理由は LineButton.tsx のコメントと同じ
 * （アプリ内ブラウザでLINEアプリへ受け渡せなくなる）。
 */

function Bubble({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}

/** 主導線。金箔のボタンでLINEへ */
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
      ? `${block ? "px-5" : "px-10"} py-5 text-[1.05rem]`
      : "px-7 py-3.5 text-sm";

  return (
    <a
      href={site.contact.lineUrl}
      className={`group bg-gold-foil relative inline-flex items-center justify-center gap-3 overflow-hidden font-mincho font-bold tracking-[0.12em] text-noir-950 shadow-[0_10px_40px_-12px_rgba(211,174,104,0.55)] transition duration-500 hover:shadow-[0_14px_50px_-10px_rgba(211,174,104,0.75)] ${sizing} ${
        block ? "w-full" : ""
      }`}
    >
      {/* 光が一度だけ横切る */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/35 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
      />
      <Bubble className="h-5 w-5 shrink-0" />
      <span className="relative whitespace-nowrap">{children}</span>
    </a>
  );
}

/** 副導線。金の細枠 */
export function OutlineLink({
  href,
  children,
  block = false,
}: {
  href: string;
  children: ReactNode;
  block?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-3 border border-gold-400/60 px-8 py-[1.1rem] font-mincho text-sm tracking-[0.12em] text-gold-200 transition duration-500 hover:border-gold-300 hover:bg-gold-400/10 ${
        block ? "w-full" : ""
      }`}
    >
      {children}
      <span aria-hidden className="text-gold-400">
        →
      </span>
    </Link>
  );
}

/** ボタンが効かないときの逃げ道（LineIdNote の黒金版） */
export function SalonLineNote() {
  return (
    <p className="text-xs leading-relaxed text-ivory-faint">
      {"ボタンが反応しない場合は、LINEで "}
      <b className="font-bold text-gold-200 select-all">
        {site.contact.lineId}
      </b>
      {" を検索してください"}
    </p>
  );
}

/** ── ◆ ── の飾り罫 */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-4 ${className}`}
    >
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-400/70" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-400/70" />
    </div>
  );
}

/** 四隅だけに金の鉤を置く額縁 */
export function CornerFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const corner = "pointer-events-none absolute h-5 w-5 border-gold-400";
  return (
    <div className={`relative ${className}`}>
      <span aria-hidden className={`${corner} top-0 left-0 border-t border-l`} />
      <span aria-hidden className={`${corner} top-0 right-0 border-t border-r`} />
      <span
        aria-hidden
        className={`${corner} bottom-0 left-0 border-b border-l`}
      />
      <span
        aria-hidden
        className={`${corner} right-0 bottom-0 border-r border-b`}
      />
      {children}
    </div>
  );
}

/**
 * セクション見出し。
 * ローマ数字（欧文イタリック）→ 字間の広い英字 → 明朝の日本語見出し、の順。
 */
export function SalonHeading({
  numeral,
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  numeral?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {numeral ? (
        <p className="font-display text-3xl text-gold-400 italic">{numeral}</p>
      ) : null}
      <p className="mt-2 font-display text-xs tracking-salon text-gold-300 uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-6 font-mincho text-[1.6rem] leading-[1.6] font-bold text-ivory sm:text-[2.1rem] text-balance-ja">
        {title}
      </h2>
      <div className={center ? "mt-7 flex justify-center" : "mt-7"}>
        <span aria-hidden className="h-px w-12 bg-gold-400/70" />
      </div>
      {lead ? (
        <p className="mt-7 text-[0.95rem] leading-loose text-ivory-dim">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
