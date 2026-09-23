import Link from "next/link";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { disclosePartners, partners } from "@/data/partners";
import { navigation, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-50 pt-14 pb-28 lg:pb-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-7 w-7 shrink-0" />
              <p className="text-lg font-bold text-ink-900">{site.name}</p>
            </div>
            <p className="mt-1 text-sm text-ink-600">{site.tagline}</p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-600">
              高卒・専門卒・フリーター・異業種から、IT業界の一歩目を踏み出す方の相談窓口です。
              相談は何度でも無料。ご本人の費用負担は一切ありません。
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-ink-900">サイト内リンク</p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 text-sm md:grid-cols-1">
              <li>
                <Link href="/" className="text-ink-600 hover:text-flame-600">
                  トップ
                </Link>
              </li>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-600 hover:text-flame-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/entry/"
                  className="text-ink-600 hover:text-flame-600"
                >
                  無料で相談する
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy/"
                  className="text-ink-600 hover:text-flame-600"
                >
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-ink-200 bg-white p-6 text-xs leading-relaxed text-ink-600">
          <p className="mb-2 font-bold text-ink-800">
            当サイトの位置づけについて
          </p>
          <p>
            {site.name}
            は職業紹介事業者ではありません。キャリアに関する情報提供と初期相談を行い、
            ご希望に応じて厚生労働大臣の許可を受けた提携先の有料職業紹介事業者へおつなぎする窓口です。
            求人紹介・面接調整・雇用条件の提示および入社手続きは、すべて提携先が行います。
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
            掲載している求人情報は、未経験歓迎求人の条件傾向をまとめたモデルケースです。
            実際の募集要項は面談時に個別にご案内します。
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-ink-500">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
