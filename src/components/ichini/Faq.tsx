/**
 * よくある質問（黒地版）。
 * details/summary で開閉するので、JavaScriptなしで動く。
 */
export function IchiniFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-white/[0.08]">
      {items.map((item, index) => (
        <details
          key={item.q}
          className="group border-b border-white/[0.08]"
          open={index === 0}
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <span className="font-mincho leading-relaxed font-bold text-ivory">
              {item.q}
            </span>
            <span
              aria-hidden
              className="mt-0.5 text-lg leading-none text-gold-400 transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-7 text-[0.92rem] leading-[2] text-ivory-dim">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
