/**
 * イチニキャリアの印。高さの違う2本の柱だけ。
 * 左が「1回目の転職で得た経験」、右が「次の一段」。
 *
 * ファビコン（public/ichini-icon.svg）も同じ形。変えるときは両方そろえること。
 */
export function IchiniLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <rect x="3" y="9" width="5" height="9" fill="#d3ae68" />
      <rect x="11" y="2" width="5" height="16" fill="#d3ae68" />
    </svg>
  );
}

/** 印＋明朝の名前 */
export function IchiniWordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <IchiniLogo className="h-[1.1rem] w-[1.1rem]" />
      <span className="font-mincho text-[1.05rem] font-bold tracking-[0.08em] text-ivory">
        イチニキャリア
      </span>
    </span>
  );
}
