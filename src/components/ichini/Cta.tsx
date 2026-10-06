import Link from "next/link";
import { Container } from "@/components/Container";
import { LineButton, LineIdNote } from "@/components/LineButton";
import { site } from "@/data/site";

export function IchiniCta({
  title = "まずは、今の経験でどこまで狙えるか聞いてみませんか",
  lead = "転職するかどうかは、話してから決めて大丈夫です。LINEで気軽に相談できますし、条件に合う求人も見られます。相談は何度でも無料です。",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="bg-ink-900 py-16 sm:py-20">
      <Container size="narrow">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl text-balance-ja">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.98rem] text-ink-200">
            {lead}
          </p>
          <div className="mt-9 flex flex-col items-center">
            <LineButton size="lg" />
            <p className="mt-5 text-sm text-ink-300">
              返信の目安：{site.contact.replyTime}
            </p>
            <div className="mt-3">
              <LineIdNote tone="light" />
            </div>
            <Link
              href="/ichini/shindan/"
              className="mt-6 text-sm text-ink-300 underline underline-offset-4 transition hover:text-white"
            >
              先に年収アップ診断をしてみる（約1分）
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
