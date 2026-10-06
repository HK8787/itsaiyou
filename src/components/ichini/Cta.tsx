import Link from "next/link";
import { Container } from "@/components/Container";
import { GoldLineButton, SalonLineNote } from "@/components/ichini/ui";
import { site } from "@/data/site";

export function IchiniCta({
  title = "今の経歴で、\nどこまで狙えるか。",
  lead = "転職するかどうかは、話してから決めてください。LINEで気軽に相談できますし、条件に合う求人も見られます。相談は何度でも無料です。",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="border-t border-white/[0.07] py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <h2 className="font-mincho text-[1.9rem] leading-[1.5] font-bold whitespace-pre-line text-ivory sm:text-[2.8rem]">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-[0.95rem] leading-[2] text-ivory-dim">
              {lead}
            </p>
          </div>
          <div className="lg:pb-2">
            <GoldLineButton size="lg" block>
              LINEで相談する（無料）
            </GoldLineButton>
            <div className="mt-4 space-y-1.5">
              <p className="text-xs text-ivory-faint">
                {`返信の目安：${site.contact.replyTime}`}
              </p>
              <SalonLineNote />
            </div>
            <Link
              href="/ichini/shindan/"
              className="mt-6 inline-block border-b border-ivory-faint/60 pb-1 text-sm text-ivory transition hover:border-gold-300"
            >
              先に年収アップ診断をしてみる（約1分）
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
