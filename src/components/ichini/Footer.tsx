import Link from "next/link";
import { Container } from "@/components/Container";
import { IchiniWordmark } from "@/components/ichini/Logo";
import { ichini, ichiniNavigation } from "@/data/ichini";
import { disclosePartners, partners } from "@/data/partners";
import { site } from "@/data/site";

export function IchiniFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-noir-950 pt-16 pb-28 lg:pb-14">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <IchiniWordmark />
            <p className="mt-5 max-w-sm text-sm leading-[1.9] text-ivory-dim">
              {"2回目・3回目の転職で、年収とキャリアを上げたい方の相談窓口です。" +
                "相談は何度でも無料で、ご本人の費用負担はありません。"}
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[0.82rem]">
            <li>
              <Link
                href={ichini.home}
                className="text-ivory-dim transition hover:text-ivory"
              >
                トップ
              </Link>
            </li>
            {ichiniNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ivory-dim transition hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/" className="text-ivory-dim transition hover:text-ivory">
                {`未経験の方（${site.name}）`}
              </Link>
            </li>
            <li>
              <Link
                href="/privacy/"
                className="text-ivory-dim transition hover:text-ivory"
              >
                プライバシーポリシー
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-14 border-t border-white/[0.07] pt-8 text-xs leading-[1.9] text-ivory-faint">
          <p>
            {`${ichini.name}は${site.operator.name}が運営しています。` +
              "職業紹介事業者ではなく、キャリアに関する情報提供と初期相談を行い、" +
              "ご希望に応じて厚生労働大臣の許可を受けた提携先の有料職業紹介事業者へおつなぎする窓口です。" +
              "求人紹介・面接調整・雇用条件の提示および入社手続きは、すべて提携先が行います。"}
          </p>
          {disclosePartners ? (
            <ul className="mt-3 space-y-1">
              {partners.map((partner) => (
                <li key={partner.name}>
                  提携先：{partner.name}（{partner.role}／{partner.licenseLabel}{" "}
                  {partner.licenseNumber}）
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-3">
            {"掲載している求人情報は、経験者向け求人の条件傾向をまとめたモデルケースです。" +
              "年収アップを保証するものではありません。実際の募集要項は個別にご案内します。"}
          </p>
          <p className="mt-8">
            {`© ${new Date().getFullYear()} ${ichini.name}（運営：${site.operator.name}）`}
          </p>
        </div>
      </Container>
    </footer>
  );
}
