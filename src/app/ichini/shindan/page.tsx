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
        eyebrow="Private Assessment"
        title="年収アップ診断"
        lead="六つの質問にお答えいただくだけで、今の経験で年収が上がる余地と、あなたの職種で上がりやすい動き方をお返しします。所要時間は約1分です。"
      />
      <section className="py-20 sm:py-28">
        <Container size="narrow">
          <IchiniDiagnosis />
        </Container>
      </section>
    </>
  );
}
