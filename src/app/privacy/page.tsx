import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: `${site.name}における個人情報の取り扱いについて。`,
  robots: { index: false, follow: true },
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "1. 取得する情報",
    body: [
      "当サイトでは、キャリア相談のお申し込みにあたり、氏名・年齢・最終学歴・希望勤務地・入社希望月・就業状況・直近の雇用形態・在籍年数・転職回数・居住地・転職理由・希望業種・連絡先などをお伺いします。",
      "また、サイトの利用状況を把握するため、アクセスログ（IPアドレス、ブラウザの種類、閲覧ページ等）を取得する場合があります。",
    ],
  },
  {
    title: "2. フォーム入力内容の取り扱い",
    body: [
      "当サイトの相談フォームは、入力された内容を当サイトのサーバーに保存しません。入力内容はご利用の端末上でのみ処理され、LINE等でお送りいただくためのテキストに整形されます。",
      "ただし運営者が外部の送信先（フォーム送信サービス等）を設定している場合は、その送信先へ内容が送信されます。その場合も、利用目的は本ポリシーに定める範囲に限られます。",
    ],
  },
  {
    title: "3. 利用目的",
    body: [
      "取得した情報は、次の目的にのみ利用します。",
      "・キャリア相談へのご回答、および情報提供のため\n・ご本人の同意にもとづき、提携先の職業紹介事業者へお取次ぎするため\n・サービス改善のための統計的な分析のため（個人を特定しない形で行います）",
    ],
  },
  {
    title: "4. 第三者提供について",
    body: [
      "ご本人の同意なく、取得した個人情報を第三者へ提供することはありません。",
      "提携先の職業紹介事業者へのお取次ぎは、ご本人が希望された場合にのみ行います。お取次ぎ後の個人情報の取り扱いは、各提携先のプライバシーポリシーに従います。",
      "法令にもとづく開示請求があった場合など、正当な理由がある場合はこの限りではありません。",
    ],
  },
  {
    title: "5. 安全管理",
    body: [
      "取得した情報の漏えい・滅失・毀損を防ぐため、必要かつ適切な安全管理措置を講じます。",
      "利用目的を達成し、保有する必要がなくなった情報は、遅滞なく消去します。",
    ],
  },
  {
    title: "6. 開示・訂正・削除の請求",
    body: [
      "ご本人から、保有する個人情報の開示・訂正・利用停止・削除のご請求があった場合は、ご本人であることを確認のうえ、速やかに対応します。",
      "ご請求は、下記の連絡先までお願いします。",
    ],
  },
  {
    title: "7. アクセス解析ツールについて",
    body: [
      "当サイトでは、サイトの利用状況を把握するためにアクセス解析ツールを利用する場合があります。これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。",
      "Cookieの使用はブラウザの設定により無効にすることができます。",
    ],
  },
  {
    title: "8. 本ポリシーの変更",
    body: [
      "法令の改正やサービス内容の変更に伴い、本ポリシーを改定する場合があります。改定後の内容は、当ページに掲載した時点から効力を生じるものとします。",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="プライバシーポリシー"
        lead="ご相談にあたってお預かりする情報の取り扱いについて定めたものです。"
      />

      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <p className="leading-relaxed text-ink-700">
            {site.name}（以下「当サイト」）は、個人情報の保護に関する法律その他の関係法令を遵守し、
            ご利用いただく皆さまの個人情報を適切に取り扱います。
          </p>

          {sections.map((section) => (
            <div key={section.title} className="mt-12">
              <h2 className="text-lg font-bold text-ink-900">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 leading-relaxed whitespace-pre-line text-ink-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <div className="mt-14 rounded-3xl border border-ink-200 bg-ink-50 p-7">
            <h2 className="text-base font-bold text-ink-900">
              お問い合わせ窓口
            </h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-ink-500">サイト名</dt>
                <dd className="text-ink-700">{site.name}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-ink-500">
                  {site.operator.label}
                </dt>
                <dd className="text-ink-700">{site.operator.name}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-ink-500">連絡先</dt>
                <dd className="text-ink-700">{site.contact.email}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              個人情報保護法にもとづき開示すべき運営者の氏名および住所は、
              ご請求があり次第、上記の連絡先より遅滞なく回答します。
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
