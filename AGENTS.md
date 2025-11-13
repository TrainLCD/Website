# 開発ガイドライン

このドキュメントは、このリポジトリで作業する際に従うべきルールとガイドラインを定義します。

## 基本原則

### 1. 応答言語
- **すべての応答は基本的に日本語を使用してください**
- コード内のコメントも日本語で記述してください
- ただし、変数名、関数名、型名などは英語を使用してください（コーディング規約に準拠）

### 2. コード品質の保証

作業完了後、以下のチェックを**必ず**実行してください：

#### ESLintチェック
```bash
npm run lint
```
- **ESLintエラーは0件であること**
- 警告も可能な限り解消してください
- 既存のコードに新たなlintエラーを追加しないでください

#### ユニットテストの実行
```bash
# status アプリのテスト実行
cd apps/status && npm run test
```
- **すべてのユニットテストが成功すること**
- 既存のテストを壊さないでください
- 新しい機能には適切なテストを追加してください

## ユニットテストのガイドライン

### テストの作成が必要な場合

以下の変更を行う場合、ユニットテストの作成または拡充が必要です：

1. **新しい関数やメソッドの追加**
   - ビジネスロジックを含む関数
   - ユーティリティ関数
   - データ変換関数

2. **既存の機能の変更**
   - ロジックの変更
   - エッジケースの追加
   - バグ修正

3. **APIエンドポイントの追加・変更**
   - リクエスト/レスポンスの検証
   - エラーハンドリング

### テストファイルの配置

- テストファイルは `__tests__` ディレクトリに配置してください
- ファイル名は `*.test.ts` または `*.test.tsx` としてください
- テスト対象のファイルと同じディレクトリ内の `__tests__` ディレクトリに配置してください

例：
```
apps/status/app/server/lib/locale.ts
→ apps/status/app/server/lib/__tests__/locale.test.ts
```

### テストの書き方

このプロジェクトでは **Vitest** を使用しています（現在はstatusアプリのみ）：

```typescript
import { describe, it, expect } from 'vitest';
import { functionToTest } from '../targetFile';

describe('関数名またはモジュール名', () => {
  it('正常系: 期待される動作の説明', () => {
    const result = functionToTest(input);
    expect(result).toBe(expectedOutput);
  });

  it('異常系: エラーケースの説明', () => {
    expect(() => functionToTest(invalidInput)).toThrow();
  });

  it('境界値: エッジケースの説明', () => {
    const result = functionToTest(edgeCaseInput);
    expect(result).toBe(expectedOutput);
  });
});
```

### テストカバレッジの目標

- 新しいコードのカバレッジは80%以上を目指してください
- 重要なビジネスロジックは100%カバーしてください
- テストが困難な部分は、依存性の注入やモックを活用してください

## 開発ワークフロー

### 1. 変更前の確認

```bash
# 依存関係のインストール
npm install

# 現在の状態を確認
npm run lint
cd apps/status && npm run test
```

### 2. 開発中

```bash
# 開発サーバーの起動
npm run dev
```

### 3. 変更後の検証

```bash
# リントチェック
npm run lint

# テストの実行（statusアプリ）
cd apps/status && npm run test

# ビルドの確認
npm run build
```

### 4. コミット前の最終確認

- [ ] ESLintエラー: 0件
- [ ] テスト失敗: 0件
- [ ] 新しい機能に対するテストを追加済み
- [ ] コードレビューの準備完了

## プロジェクト構造

```
Website/
├── apps/
│   ├── lp/          # ランディングページ (Astro)
│   └── status/      # ステータスページ (Next.js)
│       └── app/     # Next.js App Router
│           ├── api/ # APIルート
│           │   └── status/
│           │       └── snapshot/
│           │           └── __tests__/ # APIテスト
│           └── server/ # サーバーサイドコード
│               └── lib/
│                   └── __tests__/ # ユニットテスト
├── packages/
│   ├── eslint-config/
│   └── typescript-config/
└── prisma/          # データベーススキーマ
```

## コーディング規約

### TypeScript

- 型は明示的に定義してください
- `any` の使用は避けてください
- インターフェースより型エイリアスを優先してください（Next.jsの慣例に従う）

### React/Next.js

- Server Componentsを優先的に使用してください
- Client Componentsは `'use client'` ディレクティブを明示してください
- 非同期処理にはasync/awaitを使用してください

### 命名規則

- **ファイル名**: camelCase (例: `locale.ts`, `StatusContent.tsx`)
- **コンポーネント名**: PascalCase (例: `StatusContent`, `ServicesTable`)
- **関数名**: camelCase (例: `detectLocale`, `getStatusLabel`)
- **定数**: UPPER_SNAKE_CASE (例: `DEFAULT_LOCALE`)

## トラブルシューティング

### ESLintエラーが解消できない場合

1. ESLintの設定を確認してください：`.eslintrc.js`
2. 自動修正を試してください：`npm run lint -- --fix`
3. それでも解消できない場合は、エラーの詳細を確認し、適切に対処してください

### テストが失敗する場合

1. テストを単独で実行して詳細を確認してください
2. 依存関係が正しくインストールされているか確認してください
3. Prismaクライアントが生成されているか確認してください：`npm run postinstall`

## 参考ドキュメント

- [Next.js Documentation](https://nextjs.org/docs)
- [Vitest Documentation](https://vitest.dev/)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prisma Documentation](https://www.prisma.io/docs)

## まとめ

このガイドラインに従うことで、コードの品質を維持し、チーム全体で一貫した開発を進めることができます。質問や提案がある場合は、イシューまたはPRでお知らせください。
