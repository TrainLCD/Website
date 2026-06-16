---
name: report-incident
description: TrainLCD のステータスページ(apps/status)に障害情報を登録・更新・復旧するときに使う。インシデント(IncidentHistory)とサービスステータスを POST /api/status/events 経由で投稿する。「障害を登録」「インシデントを追加」「ステータスをoutage/degradedにする」「障害を復旧済みにする」などの依頼で起動する。
---

# 障害情報の登録 (TrainLCD Status)

`apps/status` のステータスページに障害情報を登録・更新する。データは
`POST /api/status/events` 経由で PostgreSQL に永続化され、Redis キャッシュ更新と
SSE 配信まで自動で行われる。投稿には `apps/status/scripts/report-incident.mjs` を使う。

## ワークフロー

1. **情報を集める**（不足があればユーザーに質問する）
   - 影響度 `impact`（下記 StatusType）
   - 対象サービス `affectedServiceIds`（下記の既知IDから1つ以上）
   - タイトル・概要（日本語）。**英語訳は内容に沿ってこちらで用意する**
   - 発生日時 `startedAt`
   - 影響サービスごとの `status` と `summary`（一覧の各行に表示される現在状況の文言。
     例: 障害中なら「現在ご利用いただけません」、復旧時なら「現在正常に稼働しております。」）
   - 任意: 原因 `cause`、復旧日時 `resolvedAt`、外部リンク `externalLink`
   - TTSとフィードバックのように複数サービスが同じ原因・同じタイミングなら **1件のインシデントにまとめる**（`affectedServiceIds` に複数指定）。原因やタイミングが異なるなら別インシデントにする。
2. **ペイロード JSON を生成**してリポジトリ直下の一時ファイル（例 `.incident-payload.json`）に書く。
3. **dry-run で検証**: `npm run report-incident -- --file <path> --dry-run`
   （日時が UTC に正規化されること・JSON が妥当なことを確認）
4. **本番投稿は外部公開操作**。投稿前にユーザーへ最終確認を取る。
   `cd apps/status && npm run report-incident -- --file <path>`
5. 成功(HTTP 200)を確認したら**一時ファイルを削除**し、確認URLを案内する。
   - 一覧: https://status.trainlcd.app
   - 個別: https://status.trainlcd.app/incidents/<slug>

## 認証

スクリプトは環境変数 `STATUS_UPDATE_API_KEY` を使う（リポジトリルート/`apps/status` の
`.env` からも自動読込）。未設定ならユーザーに設定を促す。**APIキーをチャットに貼らせない**
（履歴に残る）。投稿先を変えるときは `STATUS_API_URL` か `--url`。

## 既知のサービスID

| serviceId | サービス | category |
|---|---|---|
| `mobile-ios` | モバイルアプリ(iOS/iPadOS) | application |
| `mobile-android` | モバイルアプリ(Android) | application |
| `tts` | 自動アナウンス機能(TTS) | platform |
| `feedback` | フィードバックシステム | support |
| `station-api` | StationAPI | api |

※ 存在しない `serviceId` を `services` に渡すと API は 500 を返す。

## StatusType

`operational`(正常) / `maintenance`(メンテ) / `partiallyMaintenance`(一部メンテ) /
`degraded`(機能低下) / `partiallyDegraded`(一部機能低下) / `outage`(停止) / `unknown`(不明)

## 制約（重要）

- **日時**: API は `...Z`(UTC) もしくはオフセット無しのみ受理し、`+09:00` を**弾く**。
  人間が読みやすい JST(`2026-06-16T09:00:00+09:00`) で書いてよい。スクリプトが
  `startedAt`/`resolvedAt`/`statusSince`/`createdAt` を自動で UTC に正規化する。
- **LocaleText は ja/en 両方必須**（`title`/`description`/`summary`/`cause`/`body`）。
- `affectedServiceIds` は空配列不可。
- `id` 省略=新規作成、`slug` 省略=自動生成。日本語タイトルだとslugが無意味になるため
  **`slug` は `YYYY-MM-DD-<英語短縮>` 形式で明示する**。
- **インシデントで影響するサービスは、必ず同じ `services` エントリも一緒に送る**
  （`status` を実態に合わせ、`summary` に現在状況の文言を入れる）。送らないと、
  サービス一覧のアイコンと文言が古いまま（多くは「正常」表示）残る。
- **`services[].summary` はサービス一覧の各行にそのまま表示される文言**。
  ステータスに合わせて書く（障害中は障害を表す文、復旧時は正常を表す文）。
  **空文字にしない**——空だと UI が静的な説明文（古い「正常」表記）に
  フォールバックして誤表示になる（API は空を弾かないが `report-incident.mjs` が弾く）。

## ペイロード テンプレート（新規・継続中）

```json
{
  "services": [
    { "serviceId": "tts", "status": "outage",
      "summary": { "ja": "...", "en": "..." } }
  ],
  "incidents": [
    {
      "slug": "2026-06-16-...",
      "impact": "outage",
      "affectedServiceIds": ["tts"],
      "title":       { "ja": "...", "en": "..." },
      "description": { "ja": "...", "en": "..." },
      "startedAt": "2026-06-16T09:00:00+09:00",
      "cause": { "ja": "...", "en": "..." },
      "updates": [
        { "status": "outage", "body": { "ja": "...", "en": "..." } }
      ]
    }
  ]
}
```

## 復旧（既存インシデントのクローズ）

同じ `slug`（または初回作成時の `id`）で再投稿し、次を変える:
- `services` の該当サービスを `status: "operational"` に戻す
- インシデントに `resolvedAt` を設定し、`impact` を実態（多くは `operational`）に更新
- `updates` に復旧報を1件追加（`status: "operational"`）

```json
{
  "services": [
    { "serviceId": "tts", "status": "operational",
      "summary": { "ja": "現在正常に稼働しております。", "en": "Operating normally." } }
  ],
  "incidents": [
    {
      "slug": "2026-06-16-...",
      "impact": "operational",
      "affectedServiceIds": ["tts"],
      "title":       { "ja": "...", "en": "..." },
      "description": { "ja": "...（復旧済みの記述）", "en": "..." },
      "startedAt": "2026-06-16T09:00:00+09:00",
      "resolvedAt": "2026-06-17T12:00:00+09:00",
      "updates": [
        { "status": "operational", "body": { "ja": "復旧しました。", "en": "Resolved." } }
      ]
    }
  ]
}
```

## 参考

- API 実装: `apps/status/app/api/status/events/route.ts`
- API ドキュメント: `apps/status/app/api/status/events/README.md`
- スキーマ: `prisma/schema.prisma`
