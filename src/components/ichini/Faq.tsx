/**
 * よくある質問（黒金版）。
 * details/summary で開閉するので、JavaScriptなしで動く。
 */
export function IchiniFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-hairline">
      {items.map((item, index) => (
        <details
          key={item.q}
          className="group border-b border-hairline"
          open={index === 0}
        >
          <summary className="flex cursor-pointer list-none items-start gap-5 py-6 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-lg text-gold-400 italic">
              {`Q${index + 1}`}
            </span>
            <span className="flex-1 font-mincho leading-relaxed font-bold text-ivory">
              {item.q}
            </span>
            <span
              aria-hidden
              className="mt-1 font-display text-xl leading-none text-gold-300 transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-7 pl-11 text-[0.92rem] leading-loose text-ivory-dim">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
