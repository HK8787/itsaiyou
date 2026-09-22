import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { EntryForm } from "@/components/EntryForm";
import { LineButton } from "@/components/LineButton";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";

// 静的書き出し＋サブディレクトリ配信のため、public/ の画像は
// 自分で basePath を前置する必要がある。
const basePath = process.env.BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "無料相談フォーム",
  description:
    "IT未経験からの転職相談フォーム。13項目にお答えいただくと、LINEでそのまま送れる形に整形します。相談は何度でも無料、費用の負担はありません。",
};

const points = [
  "所要時間は約3分です",
  "入力内容は運営者にのみ送信されます",
  "相談したからといって、転職を決める必要はありません",
  "分からない項目は空欄のまま送っていただいても構いません",
];

export default function EntryPage() {
  return (
    <>
      <PageHero
        eyebrow="Entry"
        title="無料キャリア相談フォーム"
        lead="提携エージェントが事前に確認する13項目です。ここを埋めておくと初回のやり取りが一気に短くなり、その分だけ具体的な話ができます。"
      />

      <section className="py-14 sm:py-20">
        <Container size="narrow">
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 rounded-2xl bg-ink-50 px-5 py-3.5 text-sm text-ink-700"
              >
                <span className="mt-0.5 shrink-0 font-bold text-emerald-600">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 rounded-3xl border border-ink-200 bg-white p-6 sm:p-7">
            <p className="text-center text-sm text-ink-600">
              フォームが面倒であれば、LINEで直接お話しいただいても大丈夫です。
            </p>

            <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
              <LineButton note={`返信の目安：${site.contact.replyTime}`} />

              <div className="flex flex-col items-center">
                <Image
                  src={`${basePath}/line-qr.png`}
                  alt={`${site.name}のLINE友だち追加用QRコード`}
                  width={132}
                  height={132}
                  className="rounded-xl"
                  unoptimized
                />
                <p className="mt-2 text-xs text-ink-500">
                  パソコンの方はこちらを読み取り
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <EntryForm />
          </div>
        </Container>
      </section>
    </>
  );
}
