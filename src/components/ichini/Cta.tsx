import Link from "next/link";
import { Container } from "@/components/Container";
import {
  CornerFrame,
  GoldLineButton,
  Ornament,
  SalonLineNote,
} from "@/components/ichini/ui";
import { site } from "@/data/site";

export function IchiniCta({
  title = "その経験で、どこまで届くか。まずはお聞かせください。",
  lead = "転職するかどうかは、お話ししてから決めていただいて構いません。LINEで気軽にご相談いただけますし、条件に合う求人もご覧いただけます。相談は何度でも無料です。",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="bg-grain absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-gold-500/10 to-transparent"
      />
      <Container size="narrow" className="relative">
        <CornerFrame className="px-6 py-14 text-center sm:px-14 sm:py-16">
          <p className="font-display text-xs tracking-salon text-gold-300 uppercase">
            Your Next Chapter
          </p>
          <h2 className="mt-6 font-mincho text-[1.5rem] leading-[1.7] font-bold text-ivory sm:text-[2rem] text-balance-ja">
            {title}
          </h2>
          <Ornament className="mt-8" />
          <p className="mx-auto mt-8 max-w-xl text-[0.95rem] leading-loose text-ivory-dim">
            {lead}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <GoldLineButton size="lg">LINEで相談する（無料）</GoldLineButton>
            <p className="text-xs text-ivory-faint">
              {`返信の目安：${site.contact.replyTime}`}
            </p>
            <SalonLineNote />
            <Link
              href="/ichini/shindan/"
              className="mt-4 font-mincho text-sm tracking-[0.1em] text-gold-200 underline decoration-gold-400/40 underline-offset-8 transition hover:decoration-gold-300"
            >
              先に年収アップ診断を受ける（約1分）
            </Link>
          </div>
        </CornerFrame>
      </Container>
    </section>
  );
}
