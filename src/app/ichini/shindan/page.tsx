import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { IchiniDiagnosis } from "@/components/ichini/Diagnosis";
import { IchiniHero } from "@/components/ichini/Hero";

export const metadata: Metadata = {
  title: "年収アップ診断",
  description:
    "6つの質問に答えるだけで、今の経験で年収が上がる余地と、上がりやすい動き方が分かります。2回目・3回目の転職を考えている方向け。",
};

export default function ShindanPage() {
  return (
    <>
      <IchiniHero
        label="年収アップ診断"
        title="6問で、上がる余地を見る"
        lead="今の仕事、経験年数、年齢、年収などを選ぶだけです。年収が上がる余地と、あなたの職種で上がりやすい動き方をお返しします。約1分です。"
      />
      <section className="py-14 sm:py-20">
        <Container size="narrow">
          <IchiniDiagnosis />
        </Container>
      </section>
    </>
  );
}
