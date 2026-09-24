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

  /**
   * 公開URL（OGP・サイトマップ・robots.txt に使用）。
   * 独自ドメインを繋いだらそのドメインに差し替えること。
   * あわせて .github/workflows/deploy.yml の BASE_PATH も "" にする。
   */
  url: "https://hk8787.github.io/itsaiyou",

  /** 問い合わせ導線 */
  contact: {
    /** LINE公式アカウントの友だち追加URL */
    lineUrl: "https://lin.ee/rbh7p1Q",
    /**
     * LINE公式アカウントのベーシックID。
     *
     * 主導線は上の lineUrl で、こちらは予備。
     * 知恵袋やnote、Xのアプリ内ブラウザからサイトを開いた場合、
     * lin.ee のリンクがLINEアプリを起動できないことがある。
     * そのとき、IDで検索すれば友だち追加までたどり着ける。
     *
     * スマホでは「リンクをタップ」が1アクション、
     * 「IDをコピーして検索」は5アクションかかる。
     * IDを主導線にはしないこと。あくまで失敗時の逃げ道。
     *
     * 値は管理画面の 設定 → アカウント設定 に表示されているもの。
     */
    lineId: "@098fausr",
    /**
     * 問い合わせ窓口。
     * 氏名・住所の開示請求を受ける窓口でもあるため、必ず受信・返信できること。
     */
    email: "pageya.info@gmail.com",
    /** 返信の目安。実態に合わせて書き換えてください */
    replyTime: "原則24時間以内（土日祝含む）",
  },

  /**
   * 相談フォームの送信先（Google Apps Script のウェブアプリURL）。
   *
   * 送信されるとスプレッドシートに1行追記され、contact.email に通知メールが届く。
   * スクリプトは docs/marketing/gas-form-receiver.gs、手順は同 form-setup.md。
   *
   * サイト側は JSONP（<script>タグ）で doGet を呼ぶ。GAS は CORS ヘッダを
   * 返さないため fetch では到達を判定できないのが理由。詳細は
   * src/components/EntryForm.tsx の sendViaJsonp() のコメントを参照。
   *
   * このURLは秘匿情報ではない。NEXT_PUBLIC_ の値はどのみちブラウザに
   * 配信されるため、環境変数にしてもソースに書いても露出度は変わらない。
   * 読み手にとって分かりやすい方を選んでここに直接置いている。
   *
   * スクリプトを更新したら「デプロイを管理 → 編集 → 新バージョン」で
   * 反映すること。新規デプロイするとURLが変わるので、その場合はここも更新する。
   * 環境変数 NEXT_PUBLIC_FORM_ENDPOINT を渡せば上書きできる。
   */
  formEndpoint:
    process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
    "https://script.google.com/macros/s/AKfycbygMJun9kow9VNim356HCv0O24gxMMEQ742PLYRkQPRPUcWi4Fu0oHxejjQ776VcHbx/exec",

  /**
   * アクセス解析（Cloudflare Web Analytics）のトークン。
   *
   * 空文字のあいだは計測タグを一切出力しない。導入するまで
   * 外部スクリプトが増えないので、空のままでも問題なく動く。
   *
   * 取得手順は docs/marketing/analytics-setup.md。
   * Cookieを使わず、個人を特定する情報も集めない仕組みのため、
   * Cookie同意バナーは不要（プライバシーポリシー7項に記載済み）。
   *
   * 環境変数 NEXT_PUBLIC_CF_BEACON_TOKEN でも上書きできる。
   */
  analyticsToken:
    process.env.NEXT_PUBLIC_CF_BEACON_TOKEN ||
    "85fa8ff7aba3483cabbaa2de4066e33c",

  /**
   * Google Search Console の所有権確認トークン。
   *
   * 空のあいだは <meta name="google-site-verification"> を出力しない。
   * 値を入れると全ページの <head> に出るので、Search Console の
   * 「HTMLタグ」方式で所有権を確認できる。
   *
   * 秘匿情報ではない（どのみちHTMLに出る）。所有権の証明にしか使えず、
   * これだけでアカウントに何かできるものではない。
   *
   * プロパティは URLプレフィックス型で https://hk8787.github.io/itsaiyou/ を登録済み。
   * ドメイン型は github.io のDNSを触れないため使えない。
   *
   * 環境変数 NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION でも上書きできる。
   * （Actions の Variables に GOOGLE_SITE_VERIFICATION を登録すると効く）
   *
   * 手順の全体は docs/marketing/search-console.md。
   */
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    "HRxvXW1roNuLW7EuHy_rJYoQSVN2n1yaZYMuq4kYjyo",

  /**
   * 運営者情報。
   *
   * 氏名と住所はサイトに常時掲載していません。
   * 個人情報保護法32条1項は、保有個人データに関する事項を「本人の知り得る状態」に
   * 置くことを求めていますが、条文の括弧書きで
   * 「本人の求めに応じて遅滞なく回答する場合を含む」と定められています。
   * 個人情報保護委員会のFAQでも、ホームページ掲載は必須ではなく、
   * 問い合わせ窓口を設けて回答できる体制があれば足りるとされています。
   *
   * したがって、氏名・住所は請求があり次第 contact.email から回答する運用とします。
   * この運用は「窓口が実際に機能していること」が前提です。
   * contact.email は必ず受信・返信できるアドレスにしてください。
   */
  operator: {
    label: "運営者",
    /** 屋号。個人事業のため、これが法でいう「名称」にあたる */
    name: "ゼロイチIT",
    /**
     * 当サイト運営者は職業紹介事業者ではなく、
     * 提携先の有料職業紹介事業者へおつなぎする「相談窓口／情報メディア」です。
     * この位置づけは全ページのフッターと /about に明示しています。
     */
    role: "情報提供および提携先への取次ぎ",
  },

} as const;

// 提携先の社名・許可番号は src/data/partners.ts（サーバー側限定）にあります。
// site.ts はクライアント側コンポーネントからも読み込まれるため、
// ブラウザに配信したくない情報はここに置かないでください。

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
