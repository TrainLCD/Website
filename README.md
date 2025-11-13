# TrainLCD Website

![Billboard](.github/images/billboard.png)

<p align="center">
  <strong>TrainLCD公式Webサイト | Official Website for TrainLCD</strong>
</p>

<p align="center">
  <a href="#日本語">日本語</a> | <a href="#english">English</a>
</p>

---

## 日本語

### 📖 概要

TrainLCD Webサイトは、TrainLCDアプリケーションの公式Webプレゼンスを提供するモノレポプロジェクトです。ランディングページとリアルタイムステータスページで構成されています。

### ✨ 主な機能

- **ランディングページ (LP)**: Astroで構築された高速で軽量なマーケティングサイト
- **ステータスページ**: Next.jsで構築されたリアルタイムサービスステータス監視システム
  - リアルタイムステータス更新（SSE対応）
  - 多言語サポート（日本語/英語）
  - インシデント履歴管理
  - サービスカテゴリ別の状態表示

### 🛠 技術スタック

#### フレームワーク・ライブラリ
- **[Astro](https://astro.build/)** - ランディングページのための高速なWebフレームワーク
- **[Next.js 16](https://nextjs.org/)** - React App Routerベースのステータスページ
- **[React 19](https://react.dev/)** - UIライブラリ
- **[Preact](https://preactjs.com/)** - Astroアプリでの軽量なReact代替

#### データベース・キャッシュ
- **[PostgreSQL](https://www.postgresql.org/)** - メインデータベース
- **[Prisma](https://www.prisma.io/)** - 型安全なORMとスキーマ管理
- **[Redis](https://redis.io/)** - キャッシュとリアルタイム通信

#### 開発ツール
- **[Turborepo](https://turbo.build/)** - 高速なモノレポビルドシステム
- **[TypeScript](https://www.typescriptlang.org/)** - 型安全性の確保
- **[Vitest](https://vitest.dev/)** - 高速なユニットテストフレームワーク
- **[ESLint](https://eslint.org/)** - コード品質の保証
- **[Tailwind CSS](https://tailwindcss.com/)** - ユーティリティファーストのCSSフレームワーク

### 📁 プロジェクト構造

```
Website/
├── apps/
│   ├── lp/              # ランディングページ (Astro)
│   └── status/          # ステータスページ (Next.js)
├── packages/
│   ├── eslint-config/   # 共有ESLint設定
│   └── typescript-config/ # 共有TypeScript設定
├── prisma/
│   ├── schema.prisma    # データベーススキーマ
│   └── seed.ts          # シードデータ
└── turbo.json           # Turborepo設定
```

### 📋 前提条件

- **Node.js**: 18以上
- **npm**: 10.4.0以上
- **PostgreSQL**: 最新の安定版
- **Redis**: 最新の安定版

### 🚀 セットアップ

#### 1. リポジトリのクローン

```bash
git clone https://github.com/TrainLCD/Website.git
cd Website
```

#### 2. 依存関係のインストール

```bash
npm install
```

#### 3. 環境変数の設定

`.env.example` を `.env` にコピーして、必要な環境変数を設定します：

```bash
cp .env.example .env
```

**必須の環境変数：**

```env
# データベース接続文字列
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Redis接続文字列
REDIS_URL="redis://localhost:6379"

# CORS設定（/api/status/snapshot エンドポイント用）
ALLOWED_SNAPSHOT_ORIGINS="" # 空=無効、"*"=全て許可、またはカンマ区切りのURL

# ステータス更新API認証キー
STATUS_UPDATE_API_KEY="" # 本番環境では必ず設定してください
```

#### 4. データベースのセットアップ

```bash
# Prismaクライアントの生成
npx prisma generate

# マイグレーションの実行
npx prisma migrate dev

# シードデータの投入（オプション）
npm run db:seed
```

### 💻 開発

#### すべてのアプリを起動

```bash
npm run dev
```

- ランディングページ: http://localhost:4321
- ステータスページ: http://localhost:3000

#### 個別のアプリを起動

```bash
# ランディングページのみ
cd apps/lp
npm run dev

# ステータスページのみ
cd apps/status
npm run dev
```

### 🧪 テストとリント

```bash
# ESLintの実行
npm run lint

# ユニットテスト（statusアプリ）
cd apps/status
npm run test
```

### 🏗️ ビルド

```bash
# すべてのアプリをビルド
npm run build

# 個別のアプリをビルド
cd apps/lp
npm run build

cd apps/status
npm run build
```

### 📦 本番環境での実行

```bash
# ステータスページの本番サーバー起動
cd apps/status
npm run start
```

### 🗄️ データベース管理

```bash
# Prisma Studioを起動（GUIデータベースブラウザ）
npx prisma studio

# 新しいマイグレーションを作成
npx prisma migrate dev --name migration_name

# 本番環境へのマイグレーション適用
npx prisma migrate deploy
```

### 🤝 コントリビューション

コントリビューションを歓迎します！以下の手順に従ってください：

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

**コード品質の確保：**
- プルリクエスト前に `npm run lint` を実行してください
- 新しい機能には適切なテストを追加してください
- コミットメッセージは明確で説明的に書いてください

### 📄 ライセンス

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。

### 🔗 関連リンク

- [TrainLCD公式サイト](https://trainlcd.com)
- [TrainLCD iOSアプリ](https://apps.apple.com/jp/app/trainlcd/id1486355943)
- [TrainLCD Androidアプリ](https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd)

---

## English

### 📖 Overview

TrainLCD Website is a monorepo project that provides the official web presence for the TrainLCD application. It consists of a landing page and a real-time status page.

### ✨ Key Features

- **Landing Page (LP)**: Fast and lightweight marketing site built with Astro
- **Status Page**: Real-time service status monitoring system built with Next.js
  - Real-time status updates (SSE support)
  - Multi-language support (Japanese/English)
  - Incident history management
  - Service status display by category

### 🛠 Technology Stack

#### Frameworks & Libraries
- **[Astro](https://astro.build/)** - Fast web framework for landing page
- **[Next.js 16](https://nextjs.org/)** - React App Router based status page
- **[React 19](https://react.dev/)** - UI library
- **[Preact](https://preactjs.com/)** - Lightweight React alternative for Astro app

#### Database & Cache
- **[PostgreSQL](https://www.postgresql.org/)** - Main database
- **[Prisma](https://www.prisma.io/)** - Type-safe ORM and schema management
- **[Redis](https://redis.io/)** - Caching and real-time communication

#### Development Tools
- **[Turborepo](https://turbo.build/)** - High-performance monorepo build system
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[ESLint](https://eslint.org/)** - Code quality assurance
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### 📁 Project Structure

```
Website/
├── apps/
│   ├── lp/              # Landing Page (Astro)
│   └── status/          # Status Page (Next.js)
├── packages/
│   ├── eslint-config/   # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed data
└── turbo.json           # Turborepo configuration
```

### 📋 Prerequisites

- **Node.js**: 18 or higher
- **npm**: 10.4.0 or higher
- **PostgreSQL**: Latest stable version
- **Redis**: Latest stable version

### 🚀 Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/TrainLCD/Website.git
cd Website
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

Copy `.env.example` to `.env` and configure the required environment variables:

```bash
cp .env.example .env
```

**Required Environment Variables:**

```env
# Database connection string
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Redis connection string
REDIS_URL="redis://localhost:6379"

# CORS configuration (for /api/status/snapshot endpoint)
ALLOWED_SNAPSHOT_ORIGINS="" # empty=disabled, "*"=allow all, or comma-separated URLs

# Status update API authentication key
STATUS_UPDATE_API_KEY="" # Must be set in production
```

#### 4. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npm run db:seed
```

### 💻 Development

#### Start All Apps

```bash
npm run dev
```

- Landing Page: http://localhost:4321
- Status Page: http://localhost:3000

#### Start Individual Apps

```bash
# Landing page only
cd apps/lp
npm run dev

# Status page only
cd apps/status
npm run dev
```

### 🧪 Testing and Linting

```bash
# Run ESLint
npm run lint

# Run unit tests (status app)
cd apps/status
npm run test
```

### 🏗️ Build

```bash
# Build all apps
npm run build

# Build individual apps
cd apps/lp
npm run build

cd apps/status
npm run build
```

### 📦 Production

```bash
# Start status page production server
cd apps/status
npm run start
```

### 🗄️ Database Management

```bash
# Launch Prisma Studio (GUI database browser)
npx prisma studio

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations to production
npx prisma migrate deploy
```

### 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

**Code Quality Guidelines:**
- Run `npm run lint` before creating a pull request
- Add appropriate tests for new features
- Write clear and descriptive commit messages

### 📄 License

This project is released under the [MIT License](LICENSE).

### 🔗 Related Links

- [TrainLCD Official Website](https://trainlcd.com)
- [TrainLCD iOS App](https://apps.apple.com/jp/app/trainlcd/id1486355943)
- [TrainLCD Android App](https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd)
