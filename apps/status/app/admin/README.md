# 管理画面（スマホ対応）/admin

PC が無くてもスマホのブラウザだけで障害情報を登録・更新・復旧できる、ログイン保護された
管理フォーム。データは公開 API と同じ共有ロジック(`app/server/lib/statusEvents.ts`)を通って
PostgreSQL に保存され、Edge Config スナップショットも再構築される（公開ページは従来どおり
`/api/status/snapshot` を 30 秒ポーリングして自動反映）。

## URL

- ログイン: `/admin/login`
- 管理フォーム: `/admin`（未認証なら自動でログインへリダイレクト）

## 必要な環境変数

| 変数 | 用途 |
|---|---|
| `STATUS_ADMIN_PASSWORD` | 管理画面のログインパスワード |
| `STATUS_ADMIN_SESSION_SECRET` | セッション Cookie(HMAC) の署名鍵（十分に長いランダム文字列） |

ローカルでは `apps/status/.env` に、本番では Vercel のプロジェクト環境変数に設定する。
未設定の場合、ログイン API は 503 を返す。

> 公開 API 用の `STATUS_UPDATE_API_KEY` は管理画面では使わない（ブラウザに露出させない）。
> 管理画面はセッション Cookie で認証し、サーバ内部で `applyStatusEvents()` を直接呼ぶ。

## 認証の仕組み

- `/api/admin/login` がパスワードを定数時間比較し、成功すると HMAC 署名付きトークンを
  httpOnly・secure・sameSite=strict Cookie(`status_admin_session`)で発行する（既定 12 時間）。
- `middleware.ts` が `/admin`・`/api/admin` 配下を保護し、Cookie の署名と有効期限を検証する。
  検証は Edge ランタイムでも動くよう Web Crypto(`crypto.subtle`)で実装している
  （`server/lib/adminAuth.ts`）。
- `/api/admin/logout` で Cookie を破棄する。

## 使い方（3 モード）

- **新規**: 影響度・影響サービス・タイトル/概要(ja/en)・発生日時を入力して公開。
- **更新/復旧**: 既存インシデントを選ぶと内容がプリフィルされる。「ワンタップ復旧」で
  影響度・各サービス・更新本文を一括で復旧状態にし、復旧日時を現在時刻に設定する。
- **サービスのみ**: インシデントを作らずサービスのステータス文言だけ変更する。

入力補助:

- **障害中／復旧プリセット**ボタンで、選択中サービスのサマリ・更新本文(ja/en)を定型文で自動入力。
- 日時は JST の `datetime-local` で入力し、送信時にサーバが UTC へ正規化する
  （`server/lib/normalizeDates.ts`）。
- 送信前にプレビュー（送信されるペイロード）を表示して確認する。

## 関連ファイル

- 認証: `app/server/lib/adminAuth.ts` / `middleware.ts` / `app/api/admin/login/route.ts` / `app/api/admin/logout/route.ts`
- 画面: `app/admin/login/` / `app/admin/page.tsx` / `app/admin/AdminForm.tsx`
- 更新 API: `app/api/admin/events/route.ts`
- 共有コア: `app/server/lib/statusEvents.ts`（`applyStatusEvents` / `validatePayload`）
- 日時正規化: `app/server/lib/normalizeDates.ts`
