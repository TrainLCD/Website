# Status Events API

## 概要

`POST /api/status/events` は、サービスのステータスとインシデント情報を更新するためのAPIエンドポイントです。更新されたデータはデータベース（PostgreSQL）に永続化され（正本）、読み取り層である Vercel Edge Config のスナップショット（ja/en）が再構築されます。公開ページは Edge Config を定期ポーリングして最新状態を取得します。

## 認証

環境変数 `STATUS_UPDATE_API_KEY` が設定されている場合、APIキー認証が必要です。

```bash
# リクエストヘッダーに API キーを含める
x-api-key: your-secret-api-key
```

認証が失敗した場合、HTTP 401 エラーが返されます。

## エンドポイント

```
POST /api/status/events
```

## リクエストボディ

```typescript
{
  services?: ServiceEventPayload[];
  incidents?: IncidentEventPayload[];
}
```

`services` または `incidents` の少なくとも一方を指定する必要があります。

#### 再同期（リフレッシュ）

DB を変更せず、現在の DB 状態から Edge Config のスナップショットを再構築させる場合は、以下のペイロードを送ります（初期ブートストラップ・復旧用）。`npm run sync-edge-config` でも実行できます。

```json
{ "refresh": true }
```

### ServiceEventPayload

```typescript
{
  serviceId: string;              // サービスID（必須）
  status: StatusType;             // ステータス（必須）
  summary: LocaleText;            // サマリー（必須）
  statusSince?: string;           // ステータス変更日時（オプション、ISO 8601形式）
}
```

### IncidentEventPayload

```typescript
{
  id?: string;                    // インシデントID（更新時のみ）
  slug?: string;                  // スラッグ（オプション、自動生成可能）
  impact: StatusType;             // 影響度（必須）
  affectedServiceIds: string[];   // 影響を受けるサービスID配列（必須、空配列不可）
  title: LocaleText;              // タイトル（必須）
  description: LocaleText;        // 説明（必須）
  startedAt: string;              // 開始日時（必須、ISO 8601形式）
  resolvedAt?: string | null;     // 解決日時（オプション、ISO 8601形式）
  cause?: LocaleText | null;      // 原因（オプション）
  externalLink?: string | null;   // 外部リンク（オプション）
  updates?: IncidentUpdatePayload[]; // インシデント更新（オプション）
}
```

### IncidentUpdatePayload

```typescript
{
  id?: string;           // 更新ID（更新時のみ）
  status: StatusType;    // ステータス（必須）
  body: LocaleText;      // 本文（必須）
  createdAt?: string;    // 作成日時（オプション、ISO 8601形式）
}
```

### StatusType

以下のいずれかの値:
- `operational` - 正常稼働
- `maintenance` - メンテナンス中
- `partiallyMaintenance` - 一部メンテナンス中
- `degraded` - 機能低下
- `partiallyDegraded` - 一部機能低下
- `outage` - 停止中
- `unknown` - 不明

### LocaleText

```typescript
{
  ja: string;  // 日本語テキスト
  en: string;  // 英語テキスト
}
```

## レスポンス

### 成功時（HTTP 200）

```json
{
  "success": true,
  "message": "ステータスが正常に更新されました"
}
```

### エラー時

#### 認証エラー（HTTP 401）

```json
{
  "error": "認証に失敗しました"
}
```

#### バリデーションエラー（HTTP 400）

```json
{
  "error": "エラーメッセージ"
}
```

#### サーバーエラー（HTTP 500）

```json
{
  "error": "サーバーエラーが発生しました",
  "details": "詳細なエラーメッセージ (開発環境のみ)"
}
```

> 注: `details` フィールドは開発環境 (`NODE_ENV=development`) でのみ含まれます。本番環境ではセキュリティ上の理由から省略されます。

## リクエスト例

### サービスステータスの更新

```bash
curl -X POST http://localhost:3000/api/status/events \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-key" \
  -d '{
    "services": [
      {
        "serviceId": "trainlcd-app",
        "status": "degraded",
        "summary": {
          "ja": "一部機能に問題が発生しています",
          "en": "Some features are experiencing issues"
        }
      }
    ]
  }'
```

### インシデントの作成

```bash
curl -X POST http://localhost:3000/api/status/events \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-key" \
  -d '{
    "incidents": [
      {
        "impact": "outage",
        "affectedServiceIds": ["trainlcd-app", "trainlcd-api"],
        "title": {
          "ja": "システム障害",
          "en": "System Outage"
        },
        "description": {
          "ja": "現在、システムに障害が発生しており、サービスが利用できません。",
          "en": "We are currently experiencing a system outage and services are unavailable."
        },
        "startedAt": "2024-01-01T00:00:00Z",
        "updates": [
          {
            "status": "outage",
            "body": {
              "ja": "問題を調査中です。",
              "en": "We are investigating the issue."
            }
          }
        ]
      }
    ]
  }'
```

### 既存インシデントの更新

```bash
curl -X POST http://localhost:3000/api/status/events \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-key" \
  -d '{
    "incidents": [
      {
        "id": "existing-incident-id",
        "impact": "operational",
        "affectedServiceIds": ["trainlcd-app"],
        "title": {
          "ja": "システム障害（解決済み）",
          "en": "System Outage (Resolved)"
        },
        "description": {
          "ja": "システム障害は解決しました。",
          "en": "The system outage has been resolved."
        },
        "startedAt": "2024-01-01T00:00:00Z",
        "resolvedAt": "2024-01-01T01:00:00Z",
        "updates": [
          {
            "status": "operational",
            "body": {
              "ja": "問題は解決し、すべてのサービスが正常に稼働しています。",
              "en": "The issue has been resolved and all services are operational."
            }
          }
        ]
      }
    ]
  }'
```

### サービスとインシデントの同時更新

```bash
curl -X POST http://localhost:3000/api/status/events \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-key" \
  -d '{
    "services": [
      {
        "serviceId": "trainlcd-app",
        "status": "operational",
        "summary": {
          "ja": "正常稼働中",
          "en": "All systems operational"
        }
      }
    ],
    "incidents": [
      {
        "id": "incident-123",
        "impact": "operational",
        "affectedServiceIds": ["trainlcd-app"],
        "title": {
          "ja": "システム障害（解決済み）",
          "en": "System Outage (Resolved)"
        },
        "description": {
          "ja": "障害は解決しました",
          "en": "The issue has been resolved"
        },
        "startedAt": "2024-01-01T00:00:00Z",
        "resolvedAt": "2024-01-01T01:00:00Z"
      }
    ]
  }'
```

## データフロー

1. APIリクエストを受信
2. API キー認証（環境変数が設定されている場合）
3. リクエストボディのバリデーション
4. データベース更新（Prisma経由、正本）
   - サービスステータスのupsert
   - インシデント情報のupsert
   - インシデント更新の作成/更新
   - 影響を受けるサービスの関連付け
5. DB の最新状態から各ロケール（ja/en）のスナップショットを再構築
6. Edge Config へスナップショットを upsert（読み取り層）
   - 書き込み失敗は best-effort（DB は更新済みなのでリクエストは 200。`{ "refresh": true }` で再同期可能）
7. 公開ページが `/api/status/snapshot?locale=...` を定期ポーリングして Edge Config から最新状態を取得

## 環境変数

```bash
# API キー認証（オプション）
STATUS_UPDATE_API_KEY=your-secret-api-key

# データベース接続（正本）
DATABASE_URL=postgresql://user:password@localhost:5432/database

# Edge Config 読み取り（Vercel が Edge Config をリンクすると自動設定）
EDGE_CONFIG=https://edge-config.vercel.com/ecfg_xxx?token=yyy

# Edge Config 書き込み（events からのスナップショット反映に必要）
# EDGE_CONFIG_ID は EDGE_CONFIG から自動抽出されるため省略可能
VERCEL_API_TOKEN=xxxxxxxx
# EDGE_CONFIG_ID=ecfg_xxx
# VERCEL_TEAM_ID=team_xxx   # チーム所有の Edge Config の場合のみ
```

## セキュリティ考慮事項

- 本番環境では必ず `STATUS_UPDATE_API_KEY` を設定してください
- API キーは安全に管理し、コードに直接埋め込まないでください
- HTTPS経由でのみAPIを公開してください
- 必要に応じてレート制限を実装してください

## エラーハンドリング

- すべてのバリデーションエラーは HTTP 400 で返されます
- 認証エラーは HTTP 401 で返されます
- 存在しないサービスIDへの参照など、データ整合性エラーは HTTP 500 で返されます
- データベースエラーは HTTP 500 で返され、詳細はサーバーログに記録されます

## テスト

ユニットテストは `apps/status/app/api/status/events/__tests__/route.test.ts` にあります。

```bash
cd apps/status
npm run test
```

## 関連ドキュメント

- [Edge Config / Polling Architecture](../../../EDGE_CONFIG.md) - 読み取り層とポーリングの詳細
- [I18N Implementation](../../../I18N_IMPLEMENTATION.md) - 国際化実装の詳細
- [Prisma Schema](../../../../../prisma/schema.prisma) - データベーススキーマ
