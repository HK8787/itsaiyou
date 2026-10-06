import Link from "next/link";
import { Container } from "@/components/Container";
import { IchiniWordmark } from "@/components/ichini/Logo";
import { Ornament } from "@/components/ichini/ui";
import { ichini, ichiniNavigation } from "@/data/ichini";
import { disclosePartners, partners } from "@/data/partners";
import { site } from "@/data/site";

export function IchiniFooter() {
  return (
    <footer className="border-t border-hairline bg-noir-950 pt-20 pb-32 lg:pb-16">
      <Container>
        <div className="flex flex-col items-center text-center">
          <IchiniWordmark />
          <p className="mt-6 font-mincho text-sm tracking-[0.12em] text-ivory-dim">
            {ichini.tagline}
          </p>
          <Ornament className="mt-10" />

          <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 font-mincho text-[0.82rem] tracking-[0.12em]">
            <li>
              <Link
                href={ichini.home}
                className="text-ivory-dim transition hover:text-gold-200"
              >
                トップ
              </Link>
            </li>
            {ichiniNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ivory-dim transition hover:text-gold-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/"
                className="text-ivory-dim transition hover:text-gold-200"
              >
                {`未経験の方（${site.name}）`}
              </Link>
            </li>
            <li>
              <Link
                href="/privacy/"
                className="text-ivory-dim transition hover:text-gold-200"
              >
                プライバシーポリシー
              </Link>
            </li>
          </ul>
        </div>

        <div className="mx-auto mt-14 max-w-3xl border border-hairline p-6 text-xs leading-loose text-ivory-faint sm:p-8">
          <p className="mb-3 font-mincho tracking-[0.12em] text-ivory-dim">
            当サイトの位置づけについて
          </p>
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
        </div>

        <p className="mt-12 text-center font-display text-xs tracking-salon text-ivory-faint uppercase">
          {`© ${new Date().getFullYear()} Ichini Career`}
        </p>
        <p className="mt-2 text-center text-[0.7rem] text-ivory-faint">
          {`運営：${site.operator.name}`}
        </p>
      </Container>
    </footer>
  );
}
