/**
 * イチニキャリアの紋章。
 *
 * 細い金の菱形の額に、高さの違う2本の柱。
 * 左が「1回目の転職で得た経験」、右が「次の一段」。
 *
 * ファビコン（public/ichini-icon.svg）も同じ形。変えるときは両方そろえること。
 * グラデーションの id はヘッダーとフッターで重複するが、内容が同じなので表示は崩れない。
 */
export function IchiniLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ichini-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a8833f" />
          <stop offset="0.45" stopColor="#f3e6c4" />
          <stop offset="1" stopColor="#9f7d3e" />
        </linearGradient>
      </defs>
      <rect
        x="6.5"
        y="6.5"
        width="27"
        height="27"
        transform="rotate(45 20 20)"
        fill="none"
        stroke="url(#ichini-gold)"
        strokeWidth="1"
      />
      <rect x="14.5" y="19" width="3.6" height="9" fill="url(#ichini-gold)" />
      <rect x="21.9" y="12" width="3.6" height="16" fill="url(#ichini-gold)" />
    </svg>
  );
}

/** 紋章＋欧文のロゴタイプ */
export function IchiniWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <IchiniLogo className={compact ? "h-8 w-8" : "h-10 w-10"} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-medium tracking-[0.34em] text-gold-200">
          ICHINI
        </span>
        <span className="mt-1.5 font-mincho text-[0.62rem] tracking-[0.3em] text-ivory-faint">
          イチニキャリア
        </span>
      </span>
    </span>
  );
}
