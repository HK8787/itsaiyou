/**
 * イチニキャリアのロゴマーク。
 *
 * 高さの違う2本の柱。左が「1回目の転職で得た経験」、右が「次の一段」。
 * ゼロイチITの階段マークと並べても別物と分かるよう、
 * 色は濃紺 × 琥珀にしている。
 *
 * ファビコン（public/ichini-icon.svg）も同じ形。変えるときは両方そろえること。
 */
export function IchiniLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#121b27" />
      <rect x="8" y="15" width="6" height="10" rx="2" fill="#fcd34d" />
      <rect x="18" y="7" width="6" height="18" rx="2" fill="#f59e0b" />
    </svg>
  );
}
