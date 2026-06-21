#!/usr/bin/env node
// @ts-check
/**
 * TrainLCD Status - Edge Config 再同期スクリプト
 *
 * デプロイ済みの POST /api/status/events に `{ "refresh": true }` を投げ、
 * DB の現在状態から Edge Config のスナップショットを再構築させる。
 * 初期ブートストラップ（Edge Config 作成直後）や、書き込み失敗からの復旧に使う。
 * DB は一切変更しない。
 *
 * 使い方:
 *   node scripts/sync-edge-config.mjs
 *
 * 環境変数:
 *   STATUS_UPDATE_API_KEY   APIキー（必須。リポジトリルート/カレントの .env からも自動読込）
 *   STATUS_API_URL          投稿先（既定: https://status.trainlcd.app/api/status/events）
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DEFAULT_URL = "https://status.trainlcd.app/api/status/events";

/** 簡易 .env パーサ（KEY=VALUE のみ。既存の環境変数は上書きしない） */
function loadEnv() {
  const candidates = [
    resolve(process.cwd(), ".env"),
    resolve(__dirname, "../.env"), // apps/status/.env
    resolve(__dirname, "../../../.env"), // リポジトリルート/.env
  ];
  for (const path of candidates) {
    if (!existsSync(path)) continue;
    const text = readFileSync(path, "utf8");
    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      if (key in process.env) continue;
      let value = line.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

async function main() {
  loadEnv();

  const apiKey = process.env.STATUS_UPDATE_API_KEY;
  if (!apiKey) {
    console.error("STATUS_UPDATE_API_KEY が設定されていません。");
    process.exit(1);
  }

  const url = process.env.STATUS_API_URL || DEFAULT_URL;
  console.log(`Edge Config を再同期します: ${url}`);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({ refresh: true }),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error(`失敗しました (${res.status}): ${text}`);
    process.exit(1);
  }

  console.log(`完了しました: ${text}`);
}

main().catch((err) => {
  console.error("予期しないエラー:", err);
  process.exit(1);
});
