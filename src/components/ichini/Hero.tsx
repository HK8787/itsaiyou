import { Container } from "@/components/Container";
import { Ornament } from "@/components/ichini/ui";

/** 下層ページの見出し帯 */
export function IchiniHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline py-20 sm:py-28">
      <div className="bg-grain absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />
      <Container size="narrow" className="relative text-center">
        <p className="font-display text-xs tracking-salon text-gold-300 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-6 font-mincho text-[1.9rem] leading-snug font-bold text-ivory sm:text-[2.6rem] text-balance-ja">
          {title}
        </h1>
        <Ornament className="mt-8" />
        {lead ? (
          <p className="mx-auto mt-8 max-w-2xl text-[0.95rem] leading-loose text-ivory-dim">
            {lead}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
