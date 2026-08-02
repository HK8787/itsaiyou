import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className="py-28">
      <Container size="narrow">
        <div className="text-center">
          <p className="text-6xl font-bold text-ink-100">404</p>
          <h1 className="mt-4 text-2xl font-bold text-ink-900">
            ページが見つかりませんでした
          </h1>
          <p className="mt-4 text-ink-600">
            アドレスが変更されたか、削除された可能性があります。
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-full bg-ink-900 px-7 py-3.5 font-bold text-white"
            >
              トップへ戻る
            </Link>
            <Link
              href="/entry/"
              className="rounded-full border border-ink-300 px-7 py-3.5 font-bold text-ink-700"
            >
              無料相談フォーム
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
