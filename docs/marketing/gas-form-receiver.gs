/**
 * 相談フォームの受信スクリプト（Google Apps Script）
 *
 * サイトの /entry フォームから送られてきた内容を
 *   1. スプレッドシートに1行追記し
 *   2. 通知メールを送る
 * だけのスクリプトです。
 *
 * セットアップ手順は docs/marketing/form-setup.md を参照。
 * このファイルの中身を、Apps Script エディタに丸ごと貼り付けてください。
 */

// 通知メールの宛先。変えたいときはここだけ書き換える。
const NOTIFY_TO = 'pageya.info@gmail.com';

// スプレッドシートの見出し行。フォームの13項目＋任意項目に対応。
const HEADERS = [
  '受信日時',
  '1.氏名',
  '2.年齢',
  '3.最終学歴',
  '4.入社希望都道府県',
  '5.入社希望月',
  '6.在職／離職',
  '7.直近の雇用形態',
  '8.在籍年数',
  '9.転職回数',
  '10.居住都道府県',
  '11.転職理由',
  '12.希望業種',
  '13.希望職種は絶対条件か',
  '連絡先',
  'その他',
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // 初回だけ見出し行を作る
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.age || '',
      data.education || '',
      data.desiredPrefecture || '',
      data.desiredMonth || '',
      data.employmentStatus || '',
      data.lastEmploymentType || '',
      data.tenure || '',
      data.jobChangeCount || '',
      data.residence || '',
      data.reason || '',
      data.desiredIndustry || '',
      data.isJobTypeMandatory || '',
      data.contact || '',
      data.note || '',
    ]);

    // 通知メール。data.formatted はサイト側で整形済みの全文。
    MailApp.sendEmail({
      to: NOTIFY_TO,
      subject: '【相談フォーム】' + (data.name || '名前未記入') + ' さんから届きました',
      body:
        (data.formatted || JSON.stringify(data, null, 2)) +
        '\n\n----\nスプレッドシート：\n' +
        SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    });

    return ContentService.createTextOutput(
      JSON.stringify({ result: 'ok' }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    // 失敗しても、届いた内容だけは自分に飛ばしておく（取りこぼし防止）
    MailApp.sendEmail({
      to: NOTIFY_TO,
      subject: '【相談フォーム】受信処理でエラー',
      body:
        'エラー: ' +
        err +
        '\n\n受信した生データ:\n' +
        (e && e.postData ? e.postData.contents : '(なし)'),
    });
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error' }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 動作確認用。Apps Script エディタで この関数を選んで実行すると、
 * テストデータが1行追加され、通知メールが届きます。
 * 初回実行時に権限の承認を求められるので、許可してください。
 */
function testRun() {
  doPost({
    postData: {
      contents: JSON.stringify({
        name: 'テスト 太郎',
        age: '28',
        education: '高校卒業',
        desiredPrefecture: '東京都',
        desiredMonth: '2026年11月',
        employmentStatus: '在職中',
        lastEmploymentType: 'アルバイト・パート',
        tenure: '2年3ヶ月',
        jobChangeCount: '2回',
        residence: '千葉県',
        reason: 'スキルを積み上げて長く働ける仕事に移りたい',
        desiredIndustry: 'インフラエンジニア（サーバー・ネットワーク）',
        isJobTypeMandatory: '条件次第で検討できる',
        contact: 'LINE名：タロウ',
        note: '夜勤NG',
        formatted: '（これはテスト送信です）',
      }),
    },
  });
}
