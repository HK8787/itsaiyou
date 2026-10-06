import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { IchiniCta } from "@/components/ichini/Cta";
import { IchiniHero } from "@/components/ichini/Hero";
import { IchiniJobCard } from "@/components/ichini/JobCard";
import { ichiniJobs } from "@/data/ichini";

export const metadata: Metadata = {
  title: "経験者向け 求人の例",
  description:
    "2回目・3回目の転職で狙いやすい、経験者向け正社員求人のモデルケース。社内SE・インフラ構築・カスタマーサクセス・施工管理など、IT・IT以外の両方を掲載。",
};

const fields = ["IT", "IT以外"] as const;

export default function IchiniJobsPage() {
  return (
    <>
      <IchiniHero
        eyebrow="Jobs"
        title="経験者向け 求人の例"
        lead="今の経験を活かして、条件を上げやすい求人の例です。実際にどんな求人があるかは、地域や時期によって変わるので、条件を伺ったうえで正直にお返しします。"
      />

      <section className="py-14 sm:py-20">
        <Container>
          <p className="rounded-2xl border border-ink-200 bg-ink-50 p-5 text-sm leading-relaxed text-ink-600">
            ※ ここに載せているのは、経験者向け求人によくある条件の傾向をまとめたモデルケースです。実在する特定企業の求人票ではありません。年収は経験・スキル・地域によって変わり、年収アップを保証するものではありません。
          </p>

          {fields.map((field) => (
            <div key={field} className="mt-12">
              <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">
                {field === "IT" ? "IT業界の求人の例" : "IT以外の求人の例"}
              </h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {ichiniJobs
                  .filter((job) => job.field === field)
                  .map((job) => (
                    <IchiniJobCard key={job.slug} job={job} />
                  ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <IchiniCta />
    </>
  );
}
