import "server-only";

/**
 * 提携先（実際に職業紹介・案件紹介を行う会社）の情報。
 *
 * ⚠️ このファイルはサーバー側でのみ読み込まれます（先頭の "server-only" が保証）。
 *    site.ts に置くと、site.ts を読み込んでいるクライアント側コンポーネント経由で
 *    ブラウザに配信されるJSファイルにも社名・許可番号が含まれてしまうため、
 *    意図的に切り出しています。
 *    "use client" の付いたファイルからこれを import するとビルドが失敗します。
 */

/**
 * 提携先を実名で開示するかどうか。
 *
 * 既定では false です。他社の社名・許可番号を掲載するには、
 * その会社から掲載の了承を得ておく必要があるためです。
 * false の間は「厚生労働大臣の許可を受けた提携先の職業紹介事業者」という
 * 一般的な表記のみになり、社名・許可番号はHTMLにもJSにも一切出力されません。
 *
 * ★TODO 提携先から掲載許諾が取れたら true に変更してください。
 *   あわせて下の partners の内容が最新か必ず確認すること。
 *   下記は Web検索で得た公開情報にもとづく暫定値で、一次情報での裏取りは未実施です。
 *   有効化する前に、次のいずれかで確認してください。
 *     - 厚生労働省「人材サービス総合サイト」 https://jinzai.hellowork.mhlw.go.jp/
 *     - 提携先ご本人に直接確認（許可証は事業所への掲示義務があります）
 */
export const disclosePartners = false;

export type Partner = {
  name: string;
  role: string;
  licenseLabel: string;
  licenseNumber: string;
  address: string;
  representative: string;
  site: string;
};

export const partners: Partner[] = [
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
];
