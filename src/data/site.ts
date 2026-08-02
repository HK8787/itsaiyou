/**
 * サイト全体の設定。
 * ここだけ書き換えれば、屋号・連絡先・提携先の表記が全ページに反映されます。
 *
 * ★TODO と書いてある箇所は公開前に必ず実際の値へ差し替えてください。
 */

export const site = {
  /** 屋号（サイト名）。変えたい場合はここだけ変更すればOK */
  name: "ゼロイチIT",
  nameKana: "ゼロイチアイティー",
  tagline: "IT未経験・学歴不問のキャリア相談窓口",
  description:
    "高卒・専門卒・フリーター・異業種からのIT転職に特化した無料キャリア相談窓口。インフラエンジニア／WEBエンジニア／Salesforceエンジニアの3ルートから、あなたに合った一歩目を一緒に決めます。相談は何度でも無料。",

  /** 公開予定のURL（OGPやサイトマップに使用）★TODO: 独自ドメインが決まったら差し替え */
  url: "https://example.com",

  /** 問い合わせ導線 */
  contact: {
    /** ★TODO: LINE公式アカウント or 個人LINEの友だち追加URL（例: https://lin.ee/xxxxxxx） */
    lineUrl: "https://lin.ee/XXXXXXX",
    /** ★TODO: 問い合わせ用メールアドレス */
    email: "example@example.com",
    /** 返信の目安。実態に合わせて書き換えてください */
    replyTime: "原則24時間以内（土日祝含む）",
  },

  /**
   * 任意：入力フォームの内容を自分宛てに自動送信したい場合、
   * .env.local に NEXT_PUBLIC_FORM_ENDPOINT を設定してください。
   * 例) Google Apps Script の /exec URL、Formspree の https://formspree.io/f/xxxx など。
   * 未設定の場合はフォーム送信は行わず、LINEで送る用のテキスト生成のみ動作します。
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",

  /** 運営者情報（特定商取引法・景表法まわりの表示に使用） ★TODO: 実際の情報に差し替え */
  operator: {
    label: "運営者",
    name: "（屋号・氏名を記載してください）",
    representative: "（代表者氏名）",
    address: "（所在地）",
    /**
     * 当サイト運営者は職業紹介事業者ではなく、
     * 提携先の有料職業紹介事業者へおつなぎする「相談窓口／情報メディア」です。
     * この位置づけは全ページのフッターと /about に明示しています。
     */
    role: "情報提供および提携先への取次ぎ",
  },

  /**
   * 提携先（実際に職業紹介・案件紹介を行う会社）。
   * 公開情報にもとづく記載です。公開前に最新の許可番号・所在地をご本人に確認してください。
   */
  partners: [
    {
      name: "合同会社H CAREER",
      role: "正社員転職の職業紹介",
      licenseLabel: "有料職業紹介事業許可番号",
      licenseNumber: "13-ユ-316640",
      address: "東京都新宿区四谷三栄町9-6 四谷三栄町スクエア6F",
      representative: "代表社員 堀口 裕基",
      site: "https://humantalent-ml.com",
    },
    {
      name: "合同会社HTML（HTML Group）",
      role: "ITエンジニアの案件紹介・業務委託契約",
      licenseLabel: "所在地",
      licenseNumber: "東京都新宿区四谷三栄町9-6 四谷三栄町スクエア",
      address: "東京都新宿区四谷三栄町9-6 四谷三栄町スクエア",
      representative: "",
      site: "https://humantalent-ml.com",
    },
  ],
} as const;

/** ヘッダー／フッターの共通ナビゲーション */
export const navigation = [
  { href: "/courses/", label: "3つのルート" },
  { href: "/jobs/", label: "求人の例" },
  { href: "/guide/", label: "未経験ガイド" },
  { href: "/faq/", label: "よくある質問" },
  { href: "/about/", label: "このサイトについて" },
] as const;

export const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
] as const;
