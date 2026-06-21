# Edge Config + Polling Architecture

ステータスページの読み取り層を Vercel Edge Config に、リアルタイム更新を
クライアントポーリングに置き換えた構成のドキュメント。

## 背景

- 公開ページが読むのは「現在のサービス状態 + インシデント一覧」という小さく・
  読み取りが多く・更新が稀なスナップショット。Edge Config の設計意図に合致する。
- 旧構成の「遅さ」の主因は Neon Free の scale-to-zero によるコールドスタート。
  Edge Config はエッジ読み取りでコールドスタートが無いため、読み取りホットパスから
  Neon を外せる。
- 更新が稀なステータスページに常時接続の SSE + Redis pub/sub は過剰だったため、
  軽量なポーリングへ置き換え、Redis 依存を撤廃した。

## データフロー

```text
[管理オペレーター]
      │  POST /api/status/events  (x-api-key)
      ▼
[Next.js Route Handler]
      │ 1. Prisma で PostgreSQL を更新（正本 / 全履歴）
      │ 2. DB の最新状態から ja/en スナップショットを再構築（skipCache: true）
      │ 3. Vercel REST API で Edge Config へ upsert（best-effort）
      ▼
[Vercel Edge Config]  ← 読み取り層（エッジ・コールドスタート無し）
      ▲
      │ getServices / getIncidentHistories / getIncidentBySlug は
      │ Edge Config → （無ければ）PostgreSQL の順で読む
      │
[公開ページ]
      │ 初期表示: サーバーコンポーネントが SSR（locale 込み）
      │ 更新:     /api/status/snapshot?locale=... を 30 秒間隔でポーリング
      ▼
[ブラウザ]
```

## 役割分担

| 層 | 役割 |
| --- | --- |
| PostgreSQL (Neon) | 正本。書き込み・全インシデント履歴・古いデータ・フォールバック・SQL 検索 |
| Edge Config | 公開ページ用の読み取りスナップショット（ja/en）。全サービス + 直近インシデントのみ |
| `/api/status/events` | 書き込み口。DB 更新後に Edge Config を再構築 |
| `/api/status/snapshot` | 読み取り口。ポーリング先（`?locale=ja\|en`） |

## Edge Config のキー

キーは `[A-Za-z0-9_-]` のみ（コロン不可）。

- `status_services_ja` / `status_services_en` … `Service[]`（全サービス）
- `status_incidents_ja` / `status_incidents_en` … `IncidentHistory[]`（直近 N 件のみ）

直近 N 件は `RECENT_INCIDENTS_LIMIT`（環境変数 `STATUS_RECENT_INCIDENTS_LIMIT`、
既定 20）。公開一覧とフィードはこの直近分を表示する。

`getIncidentBySlug` は `status_incidents_<locale>` から slug 一致で取り出す。
直近 N 件に含まれない（＝古い）インシデントは Neon にフォールバックして取得する。

## 環境変数

| 変数 | 用途 | 備考 |
| --- | --- | --- |
| `EDGE_CONFIG` | Edge Config 読み取り接続文字列 | Vercel で Edge Config をプロジェクトにリンクすると自動設定 |
| `VERCEL_API_TOKEN` | Edge Config 書き込み | 読み取り用トークンでは書き込めないため別途必要 |
| `EDGE_CONFIG_ID` | 書き込み対象の Edge Config ID | 省略時は `EDGE_CONFIG` から `ecfg_...` を自動抽出 |
| `VERCEL_TEAM_ID` | チーム所有時のみ | 個人プロジェクトでは不要 |
| `STATUS_RECENT_INCIDENTS_LIMIT` | Edge Config に載せる直近インシデント件数 | 任意。既定 20 |

これらが未設定の場合、読み取り・書き込みとも no-op になり、PostgreSQL に
フォールバックする（ローカル開発はそのまま DB 直結で動く）。

## セットアップ手順（Vercel）

1. Vercel ダッシュボードで Edge Config を作成し、status プロジェクトにリンク
   （`EDGE_CONFIG` が自動で環境変数に入る）。
2. Edge Config への書き込み権限を持つ `VERCEL_API_TOKEN` を発行し、環境変数に設定。
   チーム所有の Edge Config なら `VERCEL_TEAM_ID` も設定。
3. デプロイ後、初回ブートストラップとして Edge Config を DB 内容で初期化:

   ```bash
   npm run sync-edge-config
   # = POST /api/status/events に { "refresh": true } を送信
   ```

## 注意点 / 既知の制約

- **Edge Config のサイズ上限**: プランごとに総容量の上限がある。インシデントは
  `description` / `body` が最大 10,000 文字（ja/en）まで許容されるため、全履歴を
  入れると上限に達し得る。これを避けるため、Edge Config には**直近 N 件のみ**を
  載せ（`STATUS_RECENT_INCIDENTS_LIMIT`、既定 20）、古いインシデントは Neon から
  詳細ページ（`getIncidentBySlug`）経由で取得する。なお件数を絞っても各インシデントの
  本文が長大だと N×本文サイズで上限に近づくため、上限に当たる場合は N を下げる。
  書き込みが失敗した場合は best-effort で握りつぶし、読み取りは DB にフォールバックする。
- **書き込みの反映ラグ / レート制限**: Edge Config の書き込みは Vercel REST API
  経由で、反映に多少のラグとレート制限がある。オペレーター起点の低頻度更新では問題
  にならない。
- **ポーリング間隔**: `useStatusPolling` の `POLL_INTERVAL_MS`（既定 30 秒）。
  タブ非表示中は停止し、再表示時に即時更新する。

## テスト

```bash
cd apps/status
npm run test
```
