import { Container } from "@/components/Container";

/** 下層ページの見出し。左揃えで、大きな明朝と短い説明だけ */
export function IchiniHero({
  label,
  title,
  lead,
}: {
  label: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="border-b border-white/[0.07] pt-16 pb-14 sm:pt-24 sm:pb-20">
      <Container>
        <p className="flex items-center gap-3 text-[0.78rem] tracking-[0.08em] text-gold-400">
          <span aria-hidden className="h-px w-6 bg-gold-400" />
          {label}
        </p>
        <h1 className="mt-6 font-mincho text-[2.1rem] leading-snug font-bold text-ivory sm:text-[3.2rem] text-balance-ja">
          {title}
        </h1>
        {lead ? (
          <p className="mt-7 max-w-2xl text-[0.95rem] leading-[2] text-ivory-dim">
            {lead}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
