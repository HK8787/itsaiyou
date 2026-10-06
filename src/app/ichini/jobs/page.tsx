import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { IchiniCta } from "@/components/ichini/Cta";
import { IchiniHero } from "@/components/ichini/Hero";
import { IchiniJobCard } from "@/components/ichini/JobCard";
import { SalonHeading } from "@/components/ichini/ui";
import { ichiniJobs } from "@/data/ichini";

export const metadata: Metadata = {
  title: "経験者向け 求人の例",
  description:
    "2回目・3回目の転職で狙いやすい、経験者向け正社員求人のモデルケース。社内SE・インフラ構築・カスタマーサクセス・施工管理など、IT・IT以外の両方を掲載。",
};

const fields = [
  { key: "IT", numeral: "I", eyebrow: "Information Technology", title: "IT業界の、求人の例" },
  { key: "IT以外", numeral: "II", eyebrow: "Other Industries", title: "IT以外の、求人の例" },
] as const;

export default function IchiniJobsPage() {
  return (
    <>
      <IchiniHero
        eyebrow="Selected Positions"
        title="経験者向け、求人の例"
        lead="今の経験を活かして、条件を上げやすい求人の例です。実際にどんな求人があるかは地域や時期によって変わるため、条件を伺ったうえで正直にお返しします。"
      />

      <section className="py-20 sm:py-28">
        <Container>
          <p className="mx-auto max-w-3xl border border-hairline px-6 py-5 text-center text-xs leading-loose text-ivory-faint">
            {"※ ここに載せているのは、経験者向け求人によくある条件の傾向をまとめたモデルケースです。" +
              "実在する特定企業の求人票ではありません。年収は経験・スキル・地域によって変わり、年収アップを保証するものではありません。"}
          </p>

          {fields.map((field) => (
            <div key={field.key} className="mt-24">
              <SalonHeading
                numeral={field.numeral}
                eyebrow={field.eyebrow}
                title={field.title}
              />
              <div className="mt-14 grid gap-6 md:grid-cols-2">
                {ichiniJobs
                  .filter((job) => job.field === field.key)
                  .map((job) => (
                    <IchiniJobCard key={job.slug} job={job} />
                  ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <div className="border-t border-hairline">
        <IchiniCta />
      </div>
    </>
  );
}
