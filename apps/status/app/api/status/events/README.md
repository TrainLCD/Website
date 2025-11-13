# Status Events API

## 概要

`POST /api/status/events` は、サービスのステータスとインシデント情報を更新するためのAPIエンドポイントです。更新されたデータはデータベース（PostgreSQL）に永続化され、Redisキャッシュが更新され、SSE経由で接続中のクライアントに配信されます。

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
  "details": "詳細なエラーメッセージ"
}
```

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
4. データベース更新（Prisma経由）
   - サービスステータスのupsert
   - インシデント情報のupsert
   - インシデント更新の作成/更新
   - 影響を受けるサービスの関連付け
5. Redisキャッシュの更新（ja/en 両ロケール）
6. Redis pub/sub 経由でSSEイベント配信
7. 接続中のクライアントが `/api/status/stream` 経由でリアルタイム更新を受信

## 環境変数

```bash
# API キー認証（オプション）
STATUS_UPDATE_API_KEY=your-secret-api-key

# データベース接続
DATABASE_URL=postgresql://user:password@localhost:5432/database

# Redis接続（オプション）
REDIS_URL=redis://localhost:6379
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

- [SSE Implementation](../../../SSE_IMPLEMENTATION.md) - SSE実装の詳細
- [I18N Implementation](../../../I18N_IMPLEMENTATION.md) - 国際化実装の詳細
- [Prisma Schema](../../../../../prisma/schema.prisma) - データベーススキーマ
