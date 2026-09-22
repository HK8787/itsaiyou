# デプロイ手順

GitHub だけで完結します。外部サービスのアカウントは不要、費用もかかりません。

`.github/workflows/deploy.yml` が入っているので、`main` にマージされるたびに
自動でビルドされて公開されます。

---

## 運営者がやること（2ステップ）

### 1. GitHub Pages を有効にする

1. https://github.com/HK8787/itsaiyou/settings/pages を開く
2. **Build and deployment → Source** を **「GitHub Actions」** に変更

以上です。保存ボタンはありません（選んだ時点で反映されます）。

### 2. PR #1 をマージする

https://github.com/HK8787/itsaiyou/pull/1

- 「Ready for review」を押してドラフトを解除
- 「Merge pull request」

マージすると自動でビルドが走り、1〜2分で公開されます。

**公開URL： https://hk8787.github.io/itsaiyou/**

進行状況は https://github.com/HK8787/itsaiyou/actions で見られます。

---

## 公開後の更新

`main` に変更が入るたびに自動で再デプロイされます。手動で流したい場合は
Actions タブ → 「Deploy to GitHub Pages」 → 「Run workflow」。

---

## 公開前に差し替えるもの

`src/data/site.ts` の `★TODO`：

| 項目 | 現在 | 影響 |
| --- | --- | --- |
| `contact.lineUrl` | プレースホルダ | **未設定だと集客しても1件も取れません** |
| `contact.email` | example@example.com | 問い合わせ窓口の表示 |
| `url` | https://example.com | OGP・サイトマップ |
| `operator.*` | 空欄 | 運営者情報の表示 |

とくに **LINE URL と運営者情報** は空欄のまま公開しないでください。
運営者不明のサイトは、求職者から見ていちばん信用できません。

`url` は当面 `https://hk8787.github.io/itsaiyou` で構いません。

---

## 独自ドメインを繋ぐ場合

1. Cloudflare Registrar か お名前.com でドメインを取得（年1,000〜1,500円）
2. GitHub の Settings → Pages → Custom domain にドメインを入力
3. 表示されたDNSレコードをドメイン取得元に登録
4. **`.github/workflows/deploy.yml` の `BASE_PATH: /itsaiyou` を `BASE_PATH: ""` に変更**
   （独自ドメインはルート配信になるため）
5. `src/data/site.ts` の `url` もそのドメインに変更

---

## 他の選択肢

GitHub Pages で困ることはまずありませんが、一応。

| サービス | ビルドコマンド | 公開ディレクトリ | 備考 |
| --- | --- | --- | --- |
| Vercel | 自動検出 | 自動検出 | GitHub連携するだけ。無料 |
| Cloudflare Pages | `npm run build` | `out` | 無料 |
| Netlify | `npm run build` | `out` | 無料 |

いずれもサブディレクトリ配信ではないので、`BASE_PATH` は不要です
（`deploy.yml` を使わず、各サービス側でビルドさせる形になります）。
