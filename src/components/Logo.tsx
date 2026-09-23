/**
 * ゼロイチITのロゴマーク。
 *
 * 上りの階段を1本のストロークで描いている。
 * 「未経験から一段ずつ上がる」という事業の内容がそのまま形になるので、
 * 説明なしで意味が伝わる。
 *
 * ファビコン（scripts/make-brand-images.py の make_icon）も同じ形。
 * 変えるときは両方そろえること。
 *
 * ヘッダーとフッターの2箇所で描画されるため、グラデーションのid が
 * 重複する。同一内容なのでブラウザは先に見つけた定義を使い、表示は
 * どちらも正しくなる。
 */
export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="zeroichi-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#013b9e" />
          <stop offset="1" stopColor="#027ddb" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#zeroichi-mark)" />
      {/*
        段は2つ。3段にすると16pxで潰れて稲妻のように見える。
        線の太さも、小さいサイズで形が残るよう厚めに取っている。
      */}
      <path
        d="M8 23.5 H15 V16 H22 V8.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
