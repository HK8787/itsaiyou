import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { disclosePartners, partners } from "@/data/partners";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "このサイトについて",
  description:
    "運営者の立場、提携先との関係、どこからお金が出ているのか。安心して相談していただくために、仕組みをすべて公開しています。",
};

const roles = [
  {
    who: `${site.name}（当窓口）`,
    tone: "own" as const,
    items: [
      "IT業界・職種についての情報提供",
      "初回のヒアリングと方向性の整理",
      "面接で聞かれることの事前共有・壁打ち",
      "ご希望に応じて提携先へのお取次ぎ",
    ],
  },
  {
    who: "提携先（有料職業紹介事業者）",
    tone: "partner" as const,
    items: [
      "具体的な求人のご紹介",
      "応募書類の添削と企業への推薦",
      "面接日程の調整・条件交渉",
      "内定後の入社手続き、入社後のフォロー",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="このサイトの立場と、お金の流れ"
        lead="転職支援には不透明なイメージがつきものです。誰が何をして、どこからお金が出ているのかを先に公開しておきます。"
      />

      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">
            まず、いちばん大事なこと
          </h2>
          <div className="mt-6 rounded-3xl border-2 border-flame-200 bg-flame-50 p-7">
            <p className="leading-relaxed font-bold text-ink-900">
              {site.name}は、職業紹介事業者ではありません。
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-700">
              当窓口が行うのは、キャリアに関する情報提供と初期相談、そしてご希望があった場合に、
              厚生労働大臣の許可を受けた提携先へおつなぎすることまでです。
              求人のご紹介、企業への推薦、面接調整、雇用条件の提示、入社手続きは、
              すべて許可を受けた提携先が責任をもって行います。
            </p>
          </div>

          <h2 className="mt-16 text-xl font-bold text-ink-900 sm:text-2xl">
            誰が、何をするのか
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {roles.map((role) => (
              <div
                key={role.who}
                className={`rounded-3xl border p-7 ${
                  role.tone === "own"
                    ? "border-flame-200 bg-white"
                    : "border-ink-200 bg-ink-50"
                }`}
              >
                <h3 className="text-base font-bold text-ink-900">{role.who}</h3>
                <ul className="mt-4 space-y-2.5">
                  {role.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink-700">
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                          role.tone === "own" ? "bg-flame-500" : "bg-ink-400"
                        }`}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-xl font-bold text-ink-900 sm:text-2xl">
            お金の流れ
          </h2>
          <ol className="mt-6 space-y-4">
            {[
              "あなたが提携先を通じて企業に入社する",
              "採用が決まった企業が、提携先へ紹介手数料を支払う",
              "提携先から当窓口へ、取次ぎに対する紹介料が支払われる",
            ].map((item, index) => (
              <li
                key={item}
                className="flex gap-4 rounded-2xl border border-ink-200 p-5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-[0.95rem] leading-relaxed text-ink-700">
                  {item}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-3xl border border-ink-200 bg-ink-50 p-7">
            <p className="font-bold text-ink-900">
              つまり、あなたが支払う金額は0円です
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-700">
              相談料・紹介料・成功報酬など、求職者の方が費用を負担することは一切ありません。
              職業安定法により、職業紹介事業者が求職者から手数料を徴収することは原則として禁止されています。
              もし費用を請求されるようなことがあれば、その時点で関わるのをやめてください。
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-700">
              あわせて正直にお伝えしておくと、当窓口には
              <strong className="text-ink-900">
                提携先から紹介料が支払われる仕組み
              </strong>
              があります。だからこそ「合わないと思ったら、合わないと言う」を方針にしています。
              無理に入社していただいても、すぐ辞めてしまえばお互いにとって損だからです。
            </p>
          </div>

          <h2 className="mt-16 text-xl font-bold text-ink-900 sm:text-2xl">
            提携先について
          </h2>

          {disclosePartners ? null : (
            <div className="mt-6 rounded-3xl border border-ink-200 bg-ink-50 p-7">
              <p className="text-[0.95rem] leading-relaxed text-ink-700">
                お取次ぎ先は、
                <strong className="text-ink-900">
                  厚生労働大臣の許可を受けた有料職業紹介事業者
                </strong>
                です。求人紹介・企業への推薦・面接調整・雇用条件の提示および入社手続きは、
                すべて当該事業者が行います。
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-700">
                具体的な社名と許可番号は、ご相談の中で必ずお伝えします。
                お取次ぎの前に、どの会社にお繋ぎするのかを確認いただけますので、
                納得されてから進めてください。
              </p>
            </div>
          )}

          {disclosePartners ? (
            <div className="mt-6 space-y-5">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="rounded-3xl border border-ink-200 p-7"
                >
                  <h3 className="text-base font-bold text-ink-900">
                    {partner.name}
                  </h3>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex gap-3">
                      <dt className="w-28 shrink-0 text-ink-500">担当領域</dt>
                      <dd className="text-ink-700">{partner.role}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-28 shrink-0 text-ink-500">
                        {partner.licenseLabel}
                      </dt>
                      <dd className="text-ink-700">{partner.licenseNumber}</dd>
                    </div>
                    {partner.representative ? (
                      <div className="flex gap-3">
                        <dt className="w-28 shrink-0 text-ink-500">代表者</dt>
                        <dd className="text-ink-700">
                          {partner.representative}
                        </dd>
                      </div>
                    ) : null}
                    <div className="flex gap-3">
                      <dt className="w-28 shrink-0 text-ink-500">所在地</dt>
                      <dd className="text-ink-700">{partner.address}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-28 shrink-0 text-ink-500">
                        ウェブサイト
                      </dt>
                      <dd>
                        <a
                          href={partner.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-flame-600 underline"
                        >
                          {partner.site}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          ) : null}

          <h2 className="mt-16 text-xl font-bold text-ink-900 sm:text-2xl">
            運営者情報
          </h2>
          <dl className="mt-6 divide-y divide-ink-100 overflow-hidden rounded-3xl border border-ink-200">
            {[
              ["サイト名", site.name],
              [site.operator.label, site.operator.name],
              ["業務内容", site.operator.role],
              ["連絡先", site.contact.email],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 p-5 sm:grid-cols-[9rem_1fr] sm:gap-4"
              >
                <dt className="text-sm font-bold text-ink-500">{label}</dt>
                <dd className="text-[0.95rem] text-ink-800">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-sm leading-relaxed text-ink-600">
            運営者の氏名および住所は、ご請求があり次第、上記の連絡先より遅滞なく回答します。
            お気軽にお問い合わせください。
          </p>

          <h2 className="mt-16 text-xl font-bold text-ink-900 sm:text-2xl">
            掲載情報について
          </h2>
          <ul className="mt-6 space-y-3 text-[0.95rem] leading-relaxed text-ink-700">
            <li className="flex gap-3">
              <span
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400"
                aria-hidden
              />
              「求人の例」に掲載しているのは特定企業の求人票ではなく、未経験歓迎求人に多い条件の傾向をまとめたモデルケースです。
              実際の募集要項は面談時に提携先から個別にご案内します。
            </li>
            <li className="flex gap-3">
              <span
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400"
                aria-hidden
              />
              年収・期間・スキルに関する記載は一般的な傾向にもとづく目安であり、
              特定の待遇や採用結果を保証するものではありません。
            </li>
            <li className="flex gap-3">
              <span
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400"
                aria-hidden
              />
              ご相談内容は、提携先へおつなぎする目的以外には使用しません。詳しくは
              <Link href="/privacy/" className="text-flame-600 underline">
                プライバシーポリシー
              </Link>
              をご覧ください。
            </li>
          </ul>
        </Container>
      </section>

      <CtaBand
        title="仕組みを理解したうえで、話してみませんか"
        lead="納得できないまま進めても意味がありません。疑問があれば、そこから聞いてください。"
      />
    </>
  );
}
