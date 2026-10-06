"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GoldLineButton, SalonLineNote } from "@/components/ichini/ui";

/**
 * 年収アップ診断。
 *
 * 6問に答えると「年収が上がる余地」を3段階で返し、
 * 今の職種に合わせた「上がりやすい動き方」を出す。
 *
 * ⚠️ 金額は出さない。
 *    当サイトに年収の実績データはないので、「◯万円アップ」のような
 *    数字を出すと根拠を示せない（景品表示法）。段階と動き方だけを返す。
 */

type Track = "it-up" | "it-step" | "sales" | "field" | "office";

type Choice = {
  label: string;
  hint?: string;
  score: number;
  track?: Track;
  /** 結果で使うフラグ */
  flag?: "short" | "many" | "low-pay";
};

type Question = {
  id: string;
  /** LINEに送る要約で使う短い見出し */
  label: string;
  title: string;
  note: string;
  choices: Choice[];
};

const questions: Question[] = [
  {
    id: "job",
    label: "今の仕事",
    title: "今の仕事に一番近いのは？",
    note: "職種によって、年収が上がりやすい動き方が変わります。",
    choices: [
      {
        label: "IT（開発・インフラ構築・社内SE）",
        score: 3,
        track: "it-up",
      },
      {
        label: "IT（ヘルプデスク・運用監視・テスト）",
        score: 3,
        track: "it-step",
      },
      { label: "営業・接客・販売", score: 2, track: "sales" },
      {
        label: "施工管理・設備管理・製造",
        score: 2,
        track: "field",
      },
      { label: "事務・管理部門", score: 1, track: "office" },
    ],
  },
  {
    id: "years",
    label: "経験年数",
    title: "今の職種での経験は何年ですか？",
    note: "前の会社も含めて、同じ職種なら合計で考えてください。",
    choices: [
      { label: "1年未満", score: 0, flag: "short" },
      { label: "1〜3年", score: 2 },
      { label: "3年以上", score: 3 },
    ],
  },
  {
    id: "age",
    label: "年齢",
    title: "年齢を教えてください",
    note: "年齢が上がるほど、経験の中身がより重視されます。",
    choices: [
      { label: "20代", score: 3 },
      { label: "30〜34歳", score: 2 },
      { label: "35〜39歳", score: 1 },
      { label: "40歳以上", score: 1 },
    ],
  },
  {
    id: "pay",
    label: "今の年収",
    title: "今の年収はどれくらいですか？",
    note: "今が低めの方ほど、相場に合わせるだけで上がる余地があります。",
    choices: [
      { label: "300万円未満", score: 3, flag: "low-pay" },
      { label: "300万〜400万円", score: 2 },
      { label: "400万〜500万円", score: 1 },
      { label: "500万円以上", score: 1 },
    ],
  },
  {
    id: "changes",
    label: "転職回数",
    title: "これまでの転職回数は？",
    note: "回数が多くても大丈夫です。伝え方の準備が変わるだけです。",
    choices: [
      { label: "1回", score: 2 },
      { label: "2〜3回", score: 1 },
      { label: "4回以上", score: 0, flag: "many" },
    ],
  },
  {
    id: "extra",
    label: "経験・資格",
    title: "当てはまるものはありますか？",
    note: "どちらもなくても問題ありません。",
    choices: [
      { label: "リーダー・後輩指導の経験がある", score: 2 },
      { label: "仕事に関係する資格を持っている", score: 2 },
      { label: "どちらもある", score: 3 },
      { label: "特にない", score: 0 },
    ],
  },
];

const levels = [
  {
    min: 12,
    label: "大きい",
    headline: "年収が上がる余地は「大きい」です",
    body: "今の経験は、転職市場でしっかり評価される段階にあります。経験を数字で伝えられれば、条件を上げての転職が十分に狙えます。",
  },
  {
    min: 8,
    label: "十分ある",
    headline: "年収が上がる余地は「十分ある」です",
    body: "経験の伝え方と、応募する会社の選び方次第で、条件を上げられる可能性があります。どの経験を前に出すかがポイントです。",
  },
  {
    min: 0,
    label: "組み立て次第",
    headline: "年収アップは「組み立て次第」です",
    body: "今すぐ大きく上げるより、次の転職で経験の幅を広げて、その次で上げる、という組み立てが合っているかもしれません。順番を一緒に考えましょう。",
  },
] as const;

const moves: Record<Track, { title: string; items: string[] }> = {
  "it-up": {
    title: "IT（開発・構築・社内SE）の方の動き方",
    items: [
      "規模の大きい会社や、要件定義など上流の役割へ移る",
      "SESから自社開発・社内SEへ移り、働き方と年収を両方上げる",
      "クラウドや業務システムなど、需要の高い領域の経験を前に出す",
    ],
  },
  "it-step": {
    title: "ヘルプデスク・運用監視の方の動き方",
    items: [
      "運用から構築へ。ここを上がると年収の幅が大きく広がる",
      "問い合わせ対応の経験を活かして、社内SEへ移る",
      "手順書づくりや後輩指導の経験を、リーダー候補として売り込む",
    ],
  },
  sales: {
    title: "営業・接客・販売の方の動き方",
    items: [
      "IT業界の法人営業やカスタマーサクセスへ。商材の単価が高く、相場も高め",
      "個人向けから法人向けへ移ると、条件が上がりやすい",
      "数字の実績（売上・継続率・担当数）を職務経歴書の中心に置く",
    ],
  },
  field: {
    title: "施工管理・設備・製造の方の動き方",
    items: [
      "資格を軸に、手当や役割の上がる会社へ移る",
      "規模の大きい現場・施設を担当できる会社を選ぶ",
      "現場の管理経験を活かして、ITインフラや設備系の上流へ広げる道もある",
    ],
  },
  office: {
    title: "事務・管理部門の方の動き方",
    items: [
      "一般事務より、経理・人事・労務など専門性のある方向へ寄せる",
      "同じ事務でも、IT企業など相場の高い業界へ移る",
      "Excelや社内ツールの改善経験があれば、社内SE寄りの仕事も狙える",
    ],
  },
};

export function IchiniDiagnosis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);

  const finished = step >= questions.length;

  const result = useMemo(() => {
    if (!finished) return null;

    let total = 0;
    let track: Track = "office";
    const flags = new Set<Choice["flag"]>();
    const picked: string[] = [];

    questions.forEach((question) => {
      const index = answers[question.id];
      if (index === undefined) return;
      const choice = question.choices[index];
      total += choice.score;
      if (choice.track) track = choice.track;
      if (choice.flag) flags.add(choice.flag);
      picked.push(`■${question.label}：${choice.label}`);
    });

    // 経験1年未満は、ほかの点数が高くても「経験者」としては見られにくい。
    // 結果の見出しと補足（経験年数について）が食い違わないよう、最下段に揃える。
    const level = flags.has("short")
      ? levels[2]
      : (levels.find((item) => total >= item.min) ?? levels[2]);

    const summary = [
      "年収アップ診断の結果を送ります。",
      `結果：年収が上がる余地は「${level.label}」`,
      "",
      ...picked,
    ].join("\n");

    return { level, track, flags, summary };
  }, [answers, finished]);

  const select = (questionId: string, choiceIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
    setStep((prev) => prev + 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setCopied(false);
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (finished && result) {
    const move = moves[result.track];

    return (
      <div className="border-t border-gold-400/50 pt-10">
        <p className="text-[0.8rem] text-gold-400">診断の結果</p>
        <h2 className="mt-4 font-mincho text-[1.7rem] leading-[1.5] font-bold text-ivory sm:text-[2.2rem]">
          {"年収が上がる余地は、"}
          <span className="text-gold-300">{`「${result.level.label}」`}</span>
          {"です。"}
        </h2>
        <p className="mt-6 text-[0.95rem] leading-[2] text-ivory-dim">
          {result.level.body}
        </p>

        <div className="mt-12 border-t border-white/[0.08] pt-8">
          <h3 className="font-mincho text-lg font-bold text-ivory">
            {move.title}
          </h3>
          <ul className="mt-5 space-y-3">
            {move.items.map((item) => (
              <li
                key={item}
                className="relative pl-5 text-[0.92rem] leading-[1.9] text-ivory-dim before:absolute before:top-[0.95em] before:left-0 before:h-px before:w-2.5 before:bg-gold-400"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {result.flags.size > 0 ? (
          <div className="mt-10 space-y-6 border-t border-white/[0.08] pt-8">
            {result.flags.has("many") ? (
              <Note title="転職回数について">
                回数そのものより「理由の一貫性」と「次はなぜ続けられるか」が見られます。職務経歴書での書き方を整えるだけで、書類の通り方が変わることは珍しくありません。
              </Note>
            ) : null}
            {result.flags.has("low-pay") ? (
              <Note title="今の年収について">
                同じ経験でも、会社や業界によって相場は変わります。今の条件が相場より低めの可能性もあるので、一度比べてみる価値があります。
              </Note>
            ) : null}
            {result.flags.has("short") ? (
              <Note title="経験年数について">
                1年未満だと「経験者」としては見られにくい時期です。今の職種で経験を積むか、未経験の職種に挑戦するかで動き方が変わるので、そこから一緒に考えましょう。
              </Note>
            ) : null}
          </div>
        ) : null}

        <p className="mt-8 text-[0.72rem] leading-[1.8] text-ivory-faint">
          ※ この診断は目安です。年収アップを保証するものではありません。実際の条件は、経験の内容・地域・その時期の求人によって変わります。
        </p>

        <div className="mt-12 bg-noir-850 p-6 sm:p-8">
          <p className="font-mincho text-lg font-bold text-ivory">
            この結果をLINEで送ってもらえれば、続きから話せます。
          </p>
          <pre className="mt-5 max-h-52 overflow-auto border border-white/[0.08] bg-noir-950 p-4 font-sans text-xs leading-relaxed whitespace-pre-wrap text-ivory-dim">
            {result.summary}
          </pre>
          <button
            type="button"
            onClick={() => copy(result.summary)}
            className="mt-4 border-b border-ivory-faint/60 pb-1 text-sm text-ivory transition hover:border-gold-300"
          >
            {copied ? "コピーしました" : "結果をコピーする"}
          </button>
          <div className="mt-7">
            <GoldLineButton block size="lg">
              LINEで結果を送る
            </GoldLineButton>
          </div>
          <div className="mt-3">
            <SalonLineNote />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm">
          <Link
            href="/ichini/jobs/"
            className="border-b border-ivory-faint/60 pb-1 text-ivory transition hover:border-gold-300"
          >
            経験者向けの求人の例を見る
          </Link>
          <button
            type="button"
            onClick={reset}
            className="border-b border-ivory-faint/40 pb-1 text-ivory-faint transition hover:text-ivory"
          >
            もう一度やり直す
          </button>
        </div>
      </div>
    );
  }

  const question = questions[step];

  return (
    <div>
      <div className="flex items-center justify-between text-[0.8rem]">
        <p className="text-gold-400">
          {`質問 ${step + 1}`}
          <span className="text-ivory-faint">{` ／ ${questions.length}`}</span>
        </p>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((prev) => prev - 1)}
            className="text-ivory-faint underline decoration-ivory-faint/40 underline-offset-4 transition hover:text-ivory"
          >
            ひとつ戻る
          </button>
        ) : null}
      </div>

      <div className="mt-4 h-px bg-white/[0.1]">
        <div
          className="h-px bg-gold-400 transition-all duration-500"
          style={{ width: `${(step / questions.length) * 100}%` }}
        />
      </div>

      <h2 className="mt-10 font-mincho text-[1.5rem] leading-[1.5] font-bold text-ivory sm:text-[1.9rem]">
        {question.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ivory-faint">
        {question.note}
      </p>

      <ul className="mt-8 border-t border-white/[0.08]">
        {question.choices.map((choice, index) => (
          <li key={choice.label}>
            <button
              type="button"
              onClick={() => select(question.id, index)}
              className="group flex w-full items-center justify-between gap-4 border-b border-white/[0.08] py-5 text-left transition-colors duration-200 hover:bg-white/[0.03]"
            >
              <span>
                <span className="block text-ivory sm:text-[1.05rem]">
                  {choice.label}
                </span>
                {choice.hint ? (
                  <span className="mt-1 block text-sm text-ivory-faint">
                    {choice.hint}
                  </span>
                ) : null}
              </span>
              <span
                aria-hidden
                className="pr-2 text-ivory-faint transition group-hover:translate-x-1 group-hover:text-gold-300"
              >
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Note({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <p className="font-bold text-ivory">{title}</p>
      <p className="mt-2 text-[0.88rem] leading-[1.9] text-ivory-dim">
        {children}
      </p>
    </div>
  );
}
