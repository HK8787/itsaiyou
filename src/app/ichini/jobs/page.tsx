import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { IchiniCta } from "@/components/ichini/Cta";
import { IchiniHero } from "@/components/ichini/Hero";
import { IchiniJobRow } from "@/components/ichini/JobCard";
import { ichiniJobs } from "@/data/ichini";

export const metadata: Metadata = {
  title: "経験者向け 求人の例",
  description:
    "2回目・3回目の転職で狙いやすい、経験者向け正社員求人のモデルケース。社内SE・インフラ構築・カスタマーサクセス・施工管理など、IT・IT以外の両方を掲載。",
};

const fields = [
  { key: "IT", title: "IT業界" },
  { key: "IT以外", title: "IT以外" },
] as const;

export default function IchiniJobsPage() {
  return (
    <>
      <IchiniHero
        label="求人の例"
        title="経験者向けの求人"
        lead="今の経験を活かして、条件を上げやすい求人の例です。実際にどんな求人があるかは地域や時期によって変わるので、条件を伺ったうえで、あるかないかを正直にお返しします。"
      />

      <section className="py-16 sm:py-24">
        <Container>
          {fields.map((field, index) => (
            <div key={field.key} className={index > 0 ? "mt-20" : ""}>
              <h2 className="font-mincho text-2xl font-bold text-ivory">
                {field.title}
              </h2>
              <ul className="mt-6 border-t border-white/[0.08]">
                {ichiniJobs
                  .filter((job) => job.field === field.key)
                  .map((job) => (
                    <IchiniJobRow key={job.slug} job={job} detailed />
                  ))}
              </ul>
            </div>
          ))}

          <p className="mt-12 text-xs leading-[1.9] text-ivory-faint">
            {"※ ここに載せているのは、経験者向け求人によくある条件の傾向をまとめたモデルケースです。" +
              "実在する特定企業の求人票ではありません。年収は経験・スキル・地域によって変わり、年収アップを保証するものではありません。"}
          </p>
        </Container>
      </section>

      <IchiniCta />
    </>
  );
}
