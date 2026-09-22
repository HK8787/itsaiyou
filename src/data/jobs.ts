/**
 * 求人の「イメージ」を伝えるためのモデルケースです。
 *
 * ⚠️ ここに載せているのは実在する特定企業の求人票ではありません。
 *    未経験歓迎求人によくある条件の傾向をまとめたサンプルです。
 *    実在の求人票を掲載する場合は、必ず求人企業／提携エージェントから
 *    正式な求人情報を受け取り、賃金・就業時間・雇用形態などの
 *    明示事項（職業安定法5条の3）を満たした内容に差し替えてください。
 */

export type Job = {
  slug: string;
  title: string;
  courseSlug: "infra" | "web" | "salesforce";
  /** 企業名は出さず、業種と規模で表現する */
  companyType: string;
  area: string;
  salary: string;
  salaryNote: string;
  employment: string;
  workStyle: string;
  holidays: string;
  requirements: string[];
  welcome: string[];
  training: string;
  appeal: string[];
  tags: string[];
};

export const jobs: Job[] = [
  {
    slug: "infra-monitoring-tokyo",
    title: "サーバー・ネットワーク運用監視（未経験歓迎）",
    courseSlug: "infra",
    companyType: "ITインフラ専門／社員300名規模",
    area: "東京都・神奈川県（配属先による）",
    salary: "月給21万円〜28万円",
    salaryNote: "深夜手当・残業代は全額別途支給。賞与年2回。",
    employment: "正社員（試用期間3ヶ月・条件変更なし）",
    workStyle: "シフト制（日勤/夜勤あり・実働8時間）",
    holidays: "年間休日125日／シフトによる週休2日",
    requirements: ["学歴不問", "18歳以上（深夜シフトのため）", "基本的なPC操作"],
    welcome: [
      "何かを継続して続けた経験がある方",
      "CCNA・ITパスポート等の学習を始めている方",
      "接客・製造・運輸などからのキャリアチェンジ希望の方",
    ],
    training: "入社後1〜2ヶ月の研修あり（座学＋OJT）。資格取得の受験費用は会社負担。",
    appeal: [
      "未経験入社が社員の7割以上を占める",
      "入社初日から「実務経験」としてカウントされる",
      "2〜3年で構築・設計へステップアップする社内ルートがある",
    ],
    tags: ["学歴不問", "未経験歓迎", "資格支援", "研修あり"],
  },
  {
    slug: "infra-cloud-osaka",
    title: "クラウド（AWS）構築アシスタント",
    courseSlug: "infra",
    companyType: "システム開発／社員80名規模",
    area: "大阪府・兵庫県",
    salary: "月給22万円〜30万円",
    salaryNote: "資格手当あり（AWS認定：月5,000円〜20,000円）",
    employment: "正社員",
    workStyle: "日勤（9:00〜18:00）／リモート併用あり",
    holidays: "完全週休2日制（土日祝）・年間休日123日",
    requirements: ["学歴不問", "ITへの学習意欲があること"],
    welcome: [
      "Linuxコマンドを触ったことがある方",
      "AWS認定資格を学習中の方",
      "チームでの作業経験がある方",
    ],
    training: "OJT中心。先輩エンジニアが1名専任でつく体制。",
    appeal: [
      "土日祝休みで生活リズムを崩さず働ける",
      "クラウド案件が中心で、今後の市場価値が上がりやすい",
      "資格手当が給与に直接反映される",
    ],
    tags: ["学歴不問", "土日祝休み", "リモート可", "資格手当"],
  },
  {
    slug: "web-frontend-tokyo",
    title: "WEBエンジニア（スクール無料受講つき・内定先行型）",
    courseSlug: "web",
    companyType: "WEB受託開発／社員150名規模",
    area: "東京都（リモート併用）",
    salary: "月給23万円〜32万円",
    salaryNote: "学習期間中も雇用契約あり。詳細は面談時にご説明します。",
    employment: "正社員",
    workStyle: "日勤（10:00〜19:00）／現場デビュー後はリモート中心",
    holidays: "完全週休2日制（土日祝）・年間休日125日",
    requirements: ["学歴不問", "3〜6ヶ月の学習時間を確保できること"],
    welcome: [
      "HTML/CSSを少しでも触ったことがある方",
      "自作サイト・ポートフォリオがある方",
      "モノづくりが好きな方",
    ],
    training: "本来 月額7万円のスクールを特別推薦枠で無料受講（3〜6ヶ月）。",
    appeal: [
      "先に正社員内定 → その後に無料でスクール受講",
      "「学習費用を払ったのに就職できない」リスクがない",
      "現場デビュー後はリモート勤務が中心",
    ],
    tags: ["学歴不問", "スクール無料", "リモート可", "土日祝休み"],
  },
  {
    slug: "web-backend-nagoya",
    title: "WEBアプリケーション開発（バックエンド）",
    courseSlug: "web",
    companyType: "自社サービス開発／社員60名規模",
    area: "愛知県",
    salary: "月給22万円〜30万円",
    salaryNote: "賞与年2回（前年度実績3.5ヶ月）",
    employment: "正社員",
    workStyle: "フレックスタイム制（コアタイム11:00〜15:00）",
    holidays: "完全週休2日制（土日祝）・年間休日126日",
    requirements: ["学歴不問", "プログラミング学習を始めている方"],
    welcome: [
      "Java・PHP・Rubyのいずれかを学習中の方",
      "Gitを使ったことがある方",
    ],
    training: "3ヶ月の研修後、既存サービスの改修タスクからスタート。",
    appeal: [
      "自社サービスなので、企画から関われる",
      "フレックス制で生活に合わせて働ける",
      "地方でも都市部と同水準の給与レンジ",
    ],
    tags: ["学歴不問", "フレックス", "自社サービス"],
  },
  {
    slug: "salesforce-engineer-tokyo",
    title: "Salesforceエンジニア（資格取得支援つき）",
    courseSlug: "salesforce",
    companyType: "Salesforce導入支援／外資系グループ",
    area: "東京都（リモート中心）",
    salary: "月給25万円〜35万円",
    salaryNote: "認定資格の取得数に応じて手当加算。",
    employment: "正社員",
    workStyle: "日勤／リモート中心（月数回の出社）",
    holidays: "完全週休2日制（土日祝）・年間休日128日",
    requirements: ["学歴不問", "6〜9ヶ月の資格取得期間に取り組めること"],
    welcome: [
      "営業・事務など、業務フローを理解する仕事の経験がある方",
      "英語に抵抗がない方（必須ではありません）",
    ],
    training: "Salesforce認定資格＋Java等の基礎学習を6〜9ヶ月かけて実施。受験費用は会社負担。",
    appeal: [
      "扱える人材が国内で慢性的に不足している領域",
      "実務経験4年以内に年収1000万円以上を狙えるキャリアパス",
      "グローバル企業のプロジェクトに参画できる",
    ],
    tags: ["学歴不問", "資格支援", "リモート可", "高年収を狙える"],
  },
  {
    slug: "infra-helpdesk-fukuoka",
    title: "社内ヘルプデスク／ITサポート",
    courseSlug: "infra",
    companyType: "ITサポート専門／社員120名規模",
    area: "福岡県",
    salary: "月給20万円〜26万円",
    salaryNote: "残業月平均10時間程度。",
    employment: "正社員",
    workStyle: "日勤（9:00〜18:00）",
    holidays: "完全週休2日制（土日祝）・年間休日122日",
    requirements: ["学歴不問", "人と話すことに抵抗がない方"],
    welcome: [
      "接客・販売・コールセンターの経験がある方",
      "ITパスポートを学習中の方",
    ],
    training: "1ヶ月の座学研修後、先輩と2人1組でOJT。",
    appeal: [
      "接客経験がそのまま強みになる職種",
      "ITの入口として最も心理的ハードルが低い",
      "夜勤なし・土日祝休み",
    ],
    tags: ["学歴不問", "夜勤なし", "土日祝休み", "接客経験が活きる"],
  },
];

export const jobBySlug = (slug: string) => jobs.find((job) => job.slug === slug);
