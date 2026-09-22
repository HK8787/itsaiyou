"use client";

import { useState } from "react";
import { prefectures, site } from "@/data/site";

/**
 * 提携先の事前ヒアリング13項目をそのまま入力できるフォーム。
 *
 * 送信の挙動：
 *  - NEXT_PUBLIC_FORM_ENDPOINT が設定されていれば、そのURLへPOSTします
 *    （Google Apps Script 経由でスプレッドシートとメールに届く）。
 *  - 未設定の場合は送信を行わず、LINEに貼り付けられる整形済みテキストのみ生成します。
 * いずれの場合も、このサイト自体はサーバーを持たないため、
 * 入力内容がサイト側に残ることはない。送信先は上記エンドポイントのみ。
 */

type FormState = {
  name: string;
  age: string;
  education: string;
  desiredPrefecture: string;
  desiredMonth: string;
  employmentStatus: string;
  lastEmploymentType: string;
  tenure: string;
  jobChangeCount: string;
  residence: string;
  reason: string;
  desiredIndustry: string;
  isJobTypeMandatory: string;
  contact: string;
  note: string;
};

const initialState: FormState = {
  name: "",
  age: "",
  education: "",
  desiredPrefecture: "",
  desiredMonth: "",
  employmentStatus: "",
  lastEmploymentType: "",
  tenure: "",
  jobChangeCount: "",
  residence: "",
  reason: "",
  desiredIndustry: "",
  isJobTypeMandatory: "",
  contact: "",
  note: "",
};

const educations = [
  "中学校卒業",
  "高校卒業",
  "高校中退",
  "専門学校卒業",
  "専門学校中退",
  "短期大学卒業",
  "高等専門学校卒業",
  "大学卒業",
  "大学中退",
  "大学院卒業",
  "その他",
];

const employmentTypes = [
  "正社員",
  "契約社員",
  "派遣社員",
  "アルバイト・パート",
  "業務委託・個人事業主",
  "就業経験なし",
];

const industries = [
  "インフラエンジニア（サーバー・ネットワーク）",
  "WEBエンジニア（開発）",
  "Salesforceエンジニア",
  "ヘルプデスク・ITサポート",
  "まだ決まっていない／相談して決めたい",
];

/**
 * 必須項目。
 *
 * contact（連絡先）は必須。ここが空だと、届いた相談に返信する手段が
 * 何も残らないため。13項目は提携先のヒアリング項目だが、そこには
 * 連絡先が含まれていないので、こちらで1項目足している。
 */
const requiredFields: (keyof FormState)[] = [
  "name",
  "age",
  "education",
  "desiredPrefecture",
  "desiredMonth",
  "employmentStatus",
  "lastEmploymentType",
  "jobChangeCount",
  "residence",
  "reason",
  "desiredIndustry",
  "isJobTypeMandatory",
  "contact",
];

/** 自由記述の上限。JSONPのURL長（実質8KB前後）に収めるための制限でもある。 */
const REASON_MAX = 200;
const NOTE_MAX = 300;

const labels: Record<keyof FormState, string> = {
  name: "氏名",
  age: "年齢",
  education: "最終学歴",
  desiredPrefecture: "入社希望都道府県",
  desiredMonth: "入社希望月",
  employmentStatus: "在職中／離職中",
  lastEmploymentType: "直近の雇用形態",
  tenure: "直近企業の在籍年数",
  jobChangeCount: "転職回数",
  residence: "現在居住の都道府県",
  reason: "転職理由",
  desiredIndustry: "希望業種・職種",
  isJobTypeMandatory: "希望職種は絶対条件か",
  contact: "連絡先（メールアドレス）",
  note: "その他伝えたいこと（任意）",
};

/**
 * Google Apps Script へ JSONP で送信する。
 *
 * なぜ fetch ではなく JSONP なのか：
 * GAS のウェブアプリは /exec へのリクエストを script.googleusercontent.com へ
 * 302 リダイレクトする。このリダイレクト先が Access-Control-Allow-Origin を
 * 返さないため、fetch では以下のどちらかにしかならない。
 *   - 通常モード → レスポンスを読めず reject。届いていても「失敗」と出る
 *   - no-cors    → レスポンスが opaque。届いていなくても「成功」と出る
 * どちらも「送信しました」の表示が実態と合わない。
 *
 * <script> タグによる読み込みは CORS の対象外でリダイレクトも追えるため、
 * GAS 側が返したコールバックが実行されたことをもって
 * 「サーバーに届いて処理された」と判定できる。
 *
 * ただしコールバックが必ず実行されるとは限らない。GAS がログインページや
 * エラーHTMLを返した場合、それはJavaScriptとして解釈できず実行時エラーになるが、
 * script 要素の onerror は発火しない（onerror は読み込み失敗時のみ）。
 * そのため「読み込めたのにコールバックが来ない」状態がありえる。
 * これを待ち続けると画面が「送信中…」のまま固まるので、3つの結果を返す。
 *
 *   confirmed   … コールバックが実行された。到達は確実
 *   unconfirmed … 読み込めたがコールバックが来ない。到達したかは不明
 *   （reject）  … 読み込み自体に失敗。到達していない
 *
 * GAS 側の受け口は docs/marketing/gas-form-receiver.gs の doGet()。
 */
type SendOutcome = "confirmed" | "unconfirmed";

function sendViaJsonp(
  endpoint: string,
  payload: Record<string, string>,
  timeoutMs = 10000,
): Promise<SendOutcome> {
  return new Promise((resolve, reject) => {
    const callbackName = `zeroichiFormCallback_${Date.now()}_${Math.floor(
      Math.random() * 1e6,
    )}`;
    const script = document.createElement("script");
    let settled = false;

    const globals = window as unknown as Record<string, unknown>;

    const cleanup = () => {
      settled = true;
      window.clearTimeout(timer);
      delete globals[callbackName];
      script.remove();
    };

    // 何も起きないまま終わる場合の最終的な打ち切り。
    const timer = window.setTimeout(() => {
      if (!settled) {
        cleanup();
        resolve("unconfirmed");
      }
    }, timeoutMs);

    globals[callbackName] = (response: { result?: string }) => {
      if (settled) return;
      cleanup();
      if (response && response.result === "ok") {
        resolve("confirmed");
      } else {
        // GAS まで届いたが、向こうで処理に失敗している。
        reject(new Error("rejected"));
      }
    };

    // 読み込みは成功。この時点でコールバックが未実行なら、
    // 返ってきたのが JSONP ではなかったということ。
    // 通常はスクリプト実行→コールバック→load の順なので、少しだけ待つ。
    script.onload = () => {
      window.setTimeout(() => {
        if (!settled) {
          cleanup();
          resolve("unconfirmed");
        }
      }, 1500);
    };

    // 読み込み自体に失敗（オフライン、URL間違い、デプロイが非公開など）
    script.onerror = () => {
      if (!settled) {
        cleanup();
        reject(new Error("network"));
      }
    };

    const url = new URL(endpoint);
    url.searchParams.set("callback", callbackName);
    url.searchParams.set("payload", JSON.stringify(payload));
    script.src = url.toString();
    document.body.appendChild(script);
  });
}

function buildMessage(form: FormState) {
  const lines = [
    "【キャリア相談の事前ヒアリング】",
    "",
    `1. 氏名：${form.name}`,
    `2. 年齢：${form.age}歳`,
    `3. 最終学歴：${form.education}`,
    `4. 入社希望都道府県：${form.desiredPrefecture}`,
    `5. 入社希望月：${form.desiredMonth}`,
    `6. 在職中／離職中：${form.employmentStatus}`,
    `7. 直近の雇用形態：${form.lastEmploymentType}`,
    `8. 直近企業の在籍年数：${form.tenure || "（就業経験なし）"}`,
    `9. 転職回数：${form.jobChangeCount}`,
    `10. 現在居住の都道府県：${form.residence}`,
    `11. 転職理由：${form.reason}`,
    `12. 希望業種：${form.desiredIndustry}`,
    `13. 希望職種は絶対条件か：${form.isJobTypeMandatory}`,
    `14. 連絡先：${form.contact}`,
  ];

  if (form.note) lines.push("", `その他：${form.note}`);

  return lines.join("\n");
}

export function EntryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<(keyof FormState)[]>([]);
  const [message, setMessage] = useState("");
  const [sendState, setSendState] = useState<
    "idle" | "sending" | "sent" | "unconfirmed" | "failed"
  >("idle");
  const [copied, setCopied] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => prev.filter((item) => item !== key));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const missing = requiredFields.filter((key) => !form[key].trim());
    if (missing.length > 0) {
      setErrors(missing);
      document
        .getElementById(`field-${missing[0]}`)
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    const text = buildMessage(form);
    setMessage(text);

    if (site.formEndpoint) {
      setSendState("sending");
      try {
        const outcome = await sendViaJsonp(site.formEndpoint, {
          ...form,
          formatted: text,
        });
        setSendState(outcome === "confirmed" ? "sent" : "unconfirmed");
      } catch {
        // 到達しなかった場合のみここに来る。
        // 画面には正直に「送れていない」と出し、LINE・メールへ誘導する。
        setSendState("failed");
      }
    }

    window.setTimeout(() => {
      document
        .getElementById("entry-result")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const errorFor = (key: keyof FormState) =>
    errors.includes(key) ? (
      <p className="mt-1.5 text-sm font-medium text-flame-700">
        {labels[key]}を入力してください
      </p>
    ) : null;

  const fieldClass = (key: keyof FormState) =>
    `w-full rounded-xl border px-4 py-3 text-base outline-none transition focus:border-flame-500 ${
      errors.includes(key) ? "border-flame-500 bg-flame-50" : "border-ink-200"
    }`;

  // メールアプリを本文入力済みで開くリンク。
  // 送信先の設定が一切不要で、LINEを使っていない人の受け皿になる。
  const mailtoHref = `mailto:${site.contact.email}?subject=${encodeURIComponent(
    `【キャリア相談】${form.name || "お名前未記入"}`,
  )}&body=${encodeURIComponent(message)}`;

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} noValidate className="space-y-7">
        <Field id="name" label="1. 氏名" required error={errorFor("name")}>
          <input
            type="text"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="山田 太郎"
            autoComplete="name"
            className={fieldClass("name")}
          />
        </Field>

        <Field id="age" label="2. 年齢" required error={errorFor("age")}>
          <div className="flex items-center gap-3">
            <input
              type="number"
              inputMode="numeric"
              min={15}
              max={70}
              value={form.age}
              onChange={(event) => update("age", event.target.value)}
              placeholder="24"
              className={`${fieldClass("age")} max-w-32`}
            />
            <span className="text-ink-600">歳</span>
          </div>
        </Field>

        <Field
          id="education"
          label="3. 最終学歴"
          required
          hint="学歴不問の求人が中心です。正直にお選びください。"
          error={errorFor("education")}
        >
          <select
            value={form.education}
            onChange={(event) => update("education", event.target.value)}
            className={fieldClass("education")}
          >
            <option value="">選択してください</option>
            {educations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="desiredPrefecture"
          label="4. 入社希望都道府県"
          required
          error={errorFor("desiredPrefecture")}
        >
          <select
            value={form.desiredPrefecture}
            onChange={(event) =>
              update("desiredPrefecture", event.target.value)
            }
            className={fieldClass("desiredPrefecture")}
          >
            <option value="">選択してください</option>
            {prefectures.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
            <option value="こだわらない">こだわらない</option>
          </select>
        </Field>

        <Field
          id="desiredMonth"
          label="5. 入社希望月"
          required
          hint="「できるだけ早く」でも構いません。"
          error={errorFor("desiredMonth")}
        >
          <input
            type="text"
            value={form.desiredMonth}
            onChange={(event) => update("desiredMonth", event.target.value)}
            placeholder="例）2026年11月／できるだけ早く"
            className={fieldClass("desiredMonth")}
          />
        </Field>

        <Field
          id="employmentStatus"
          label="6. 在職中か離職中か"
          required
          error={errorFor("employmentStatus")}
        >
          <RadioRow
            name="employmentStatus"
            value={form.employmentStatus}
            options={["在職中", "離職中"]}
            onChange={(value) => update("employmentStatus", value)}
          />
        </Field>

        <Field
          id="lastEmploymentType"
          label="7. 直近の雇用形態"
          required
          error={errorFor("lastEmploymentType")}
        >
          <select
            value={form.lastEmploymentType}
            onChange={(event) =>
              update("lastEmploymentType", event.target.value)
            }
            className={fieldClass("lastEmploymentType")}
          >
            <option value="">選択してください</option>
            {employmentTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="tenure"
          label="8. 直近企業の在籍年数"
          hint="就業経験がない場合は空欄で構いません。"
        >
          <input
            type="text"
            value={form.tenure}
            onChange={(event) => update("tenure", event.target.value)}
            placeholder="例）2年3ヶ月"
            className={fieldClass("tenure")}
          />
        </Field>

        <Field
          id="jobChangeCount"
          label="9. 転職回数"
          required
          hint="回数が多くても紹介できない、ということはありません。"
          error={errorFor("jobChangeCount")}
        >
          <select
            value={form.jobChangeCount}
            onChange={(event) => update("jobChangeCount", event.target.value)}
            className={fieldClass("jobChangeCount")}
          >
            <option value="">選択してください</option>
            {["0回", "1回", "2回", "3回", "4回", "5回以上"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="residence"
          label="10. 現在居住の都道府県"
          required
          error={errorFor("residence")}
        >
          <select
            value={form.residence}
            onChange={(event) => update("residence", event.target.value)}
            className={fieldClass("residence")}
          >
            <option value="">選択してください</option>
            {prefectures.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="reason"
          label="11. 転職理由"
          required
          hint="簡単で構いません。一言でも大丈夫です。"
          error={errorFor("reason")}
        >
          <textarea
            value={form.reason}
            onChange={(event) => update("reason", event.target.value)}
            rows={4}
            maxLength={REASON_MAX}
            placeholder="例）体力勝負の仕事ではなく、スキルを積み上げて長く働ける仕事に移りたい"
            className={fieldClass("reason")}
          />
        </Field>

        <Field
          id="desiredIndustry"
          label="12. 希望業種・職種"
          required
          hint="決まっていなければ「相談したい」で構いません。"
          error={errorFor("desiredIndustry")}
        >
          <select
            value={form.desiredIndustry}
            onChange={(event) => update("desiredIndustry", event.target.value)}
            className={fieldClass("desiredIndustry")}
          >
            <option value="">選択してください</option>
            {industries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="isJobTypeMandatory"
          label="13. 希望職種は絶対条件ですか"
          required
          hint="「条件次第で検討できる」と答えられると、紹介できる求人の幅が広がります。"
          error={errorFor("isJobTypeMandatory")}
        >
          <RadioRow
            name="isJobTypeMandatory"
            value={form.isJobTypeMandatory}
            options={["絶対条件", "条件次第で検討できる", "こだわらない"]}
            onChange={(value) => update("isJobTypeMandatory", value)}
          />
        </Field>

        <Field
          id="contact"
          label="14. 連絡先（メールアドレス）"
          required
          hint="ご返信はこちら宛にお送りします。LINEでやり取りしたい方も、行き違いを防ぐため入力してください。"
          error={errorFor("contact")}
        >
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.contact}
            onChange={(event) => update("contact", event.target.value)}
            placeholder="例）taro@example.com"
            className={fieldClass("contact")}
          />
        </Field>

        <div className="rounded-2xl bg-ink-50 p-6">
          <p className="mb-5 text-sm font-bold text-ink-800">
            任意項目（あるとやり取りがスムーズです）
          </p>

          <Field id="note" label="その他、伝えておきたいこと">
            <textarea
              value={form.note}
              onChange={(event) => update("note", event.target.value)}
              rows={3}
              maxLength={NOTE_MAX}
              placeholder="例）夜勤は難しい／扶養家族がいる／学習中の資格がある など"
              className={fieldClass("note")}
            />
          </Field>
        </div>

        <div className="rounded-2xl border border-ink-200 p-5 text-sm leading-relaxed text-ink-600">
          送信いただいた内容は
          <strong className="text-ink-800">運営者にのみ送信・保管されます</strong>
          。お預かりした情報は、ご相談への回答と、ご希望があった場合に提携先の
          職業紹介事業者へおつなぎする目的にのみ使用します。
          ご本人の同意なく第三者へ提供することはありません。
          詳細は
          <a href="/privacy/" className="text-flame-600 underline">
            プライバシーポリシー
          </a>
          をご確認ください。
        </div>

        {errors.length > 0 ? (
          <p
            role="alert"
            className="rounded-xl bg-flame-50 px-5 py-4 text-sm font-medium text-flame-700"
          >
            未入力の項目が {errors.length} 件あります。ご確認ください。
          </p>
        ) : null}

        <button
          type="submit"
          disabled={sendState === "sending"}
          className="w-full rounded-full bg-flame-500 py-4.5 text-lg font-bold text-white shadow-lg shadow-flame-500/25 transition hover:bg-flame-600 disabled:opacity-60"
        >
          {sendState === "sending" ? "送信中…" : "入力内容をまとめる"}
        </button>
      </form>

      {message ? (
        <section
          id="entry-result"
          className="scroll-mt-24 rounded-3xl border-2 border-flame-200 bg-flame-50 p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-ink-900">
            {sendState === "sent"
              ? "送信しました"
              : sendState === "unconfirmed"
                ? "送信しました"
                : "この内容をLINEで送ってください"}
          </h2>
          <p className="mt-2.5 text-sm text-ink-600">
            {sendState === "sent"
              ? `内容が届きました。${site.contact.replyTime}に、ご記入のメールアドレス宛にご返信します。このページを閉じていただいて構いません。`
              : sendState === "unconfirmed"
                ? "送信は完了しましたが、こちらで受信の確認が取れませんでした。念のため、下のテキストをLINEかメールでもお送りいただけると確実です。"
                : sendState === "failed"
                  ? "送信できませんでした。お手数ですが、下のテキストをコピーして、LINEまたはメールでお送りください。"
                  : "下のテキストをコピーして、LINEに貼り付けて送信するだけで完了です。"}
          </p>

          {sendState === "sent" ? (
            <p className="mt-6 mb-2 text-xs font-bold text-ink-500">
              送信した内容（控え）
            </p>
          ) : null}

          <pre
            className={`overflow-x-auto rounded-2xl bg-white p-5 text-sm leading-relaxed whitespace-pre-wrap text-ink-800 ${
              sendState === "sent" ? "" : "mt-5"
            }`}
          >
            {message}
          </pre>

          {/*
            送信が成功した場合、やることはもう残っていない。
            コピー・メール送信のボタンは「まだ何か送る必要がある」と
            読めてしまうため出さない。LINEは任意の連絡手段として残す。
          */}
          {sendState === "sent" ? (
            <div className="mt-6 rounded-2xl bg-white p-5">
              <p className="text-sm text-ink-600">
                LINEでのやり取りをご希望の方は、こちらから友だち追加できます（任意）。
                電話やメールより気軽にやり取りできます。
              </p>
              <a
                href={site.contact.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-full bg-[#06c755] py-3.5 text-center font-bold text-white transition hover:brightness-95"
              >
                LINEで相談する
              </a>
            </div>
          ) : (
            <>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={copy}
                  className="flex-1 rounded-full border border-ink-300 bg-white py-3.5 font-bold text-ink-700 transition hover:bg-ink-50"
                >
                  {copied ? "コピーしました" : "テキストをコピー"}
                </button>
                <a
                  href={site.contact.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full bg-[#06c755] py-3.5 text-center font-bold text-white transition hover:brightness-95"
                >
                  LINEを開いて送る
                </a>
              </div>

              <a
                href={mailtoHref}
                className="mt-3 block rounded-full border border-ink-300 bg-white py-3.5 text-center font-bold text-ink-700 transition hover:bg-ink-50"
              >
                メールで送る
              </a>
              <p className="mt-2.5 text-center text-xs text-ink-500">
                LINEを使っていない方はこちら。お使いのメールアプリが立ち上がり、
                本文が入力済みの状態で開きます。
              </p>
            </>
          )}
        </section>
      ) : null}
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div id={`field-${id}`} className="scroll-mt-24">
      <label className="mb-2 flex flex-wrap items-center gap-2 font-bold text-ink-800">
        {label}
        {required ? (
          <span className="rounded bg-flame-100 px-2 py-0.5 text-xs font-bold text-flame-700">
            必須
          </span>
        ) : (
          <span className="rounded bg-ink-100 px-2 py-0.5 text-xs font-bold text-ink-500">
            任意
          </span>
        )}
      </label>
      {hint ? <p className="mb-2.5 text-sm text-ink-500">{hint}</p> : null}
      {children}
      {error}
    </div>
  );
}

function RadioRow({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const active = value === option;
        return (
          <label
            key={option}
            className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition ${
              active
                ? "border-flame-500 bg-flame-500 text-white"
                : "border-ink-200 text-ink-700 hover:border-flame-300"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={active}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        );
      })}
    </div>
  );
}
