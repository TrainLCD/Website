#!/usr/bin/env node
// @ts-check
/**
 * TrainLCD Status - インシデント/サービスステータス登録スクリプト
 *
 * POST /api/status/events を叩いて障害情報を登録・更新する。
 * 追加依存なし（Node 18+ の組み込み fetch を使用）。
 *
 * 使い方:
 *   node scripts/report-incident.mjs --file payload.json
 *   node scripts/report-incident.mjs --file payload.json --dry-run
 *   cat payload.json | node scripts/report-incident.mjs
 *
 * 環境変数:
 *   STATUS_UPDATE_API_KEY   APIキー（必須。リポジトリルート/カレントの .env からも自動読込）
 *   STATUS_API_URL          投稿先（既定: https://status.trainlcd.app/api/status/events）
 *
 * 注意:
 *   - API は日時に "Z"(UTC) もしくはオフセット無しのみ許可する。本スクリプトは
 *     startedAt / resolvedAt / statusSince / createdAt を自動で UTC("...Z") に正規化する。
 *     人間が読みやすい "2026-06-16T09:00:00+09:00"(JST) のまま書いてよい。
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DEFAULT_URL = "https://status.trainlcd.app/api/status/events";
const DATE_KEYS = new Set(["startedAt", "resolvedAt", "statusSince", "createdAt"]);

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

/** 引数パース */
function parseArgs(argv) {
  const opts = { file: null, url: null, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--file" || a === "-f") opts.file = argv[++i];
    else if (a === "--url") opts.url = argv[++i];
    else if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--help" || a === "-h") opts.help = true;
    else if (!a.startsWith("-") && !opts.file) opts.file = a;
  }
  return opts;
}

function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

/**
 * ペイロードの簡易検証。API が弾かない「表示上の落とし穴」を送信前に止める。
 * - services[].summary は サービス一覧の各行にそのまま表示される文言。
 *   ja/en どちらかが空だと UI が静的な description（古い「正常」表記）に
 *   フォールバックしてしまうため、空を許さない。
 * 検出した問題の配列を返す（空配列なら問題なし）。
 */
function validatePayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== "object") {
    return ["ペイロードがオブジェクトではありません"];
  }
  const services = payload.services;
  if (services !== undefined) {
    if (!Array.isArray(services)) {
      errors.push("services は配列である必要があります");
    } else {
      services.forEach((svc, i) => {
        const id = svc && svc.serviceId ? `"${svc.serviceId}"` : `#${i}`;
        const summary = svc ? svc.summary : undefined;
        const ja = summary && typeof summary.ja === "string" ? summary.ja.trim() : "";
        const en = summary && typeof summary.en === "string" ? summary.en.trim() : "";
        if (!ja || !en) {
          errors.push(
            `services[${i}] (${id}): summary.ja / summary.en は空にできません` +
              "（空だとサービス一覧で古い説明文が表示されます）"
          );
        }
      });
    }
  }
  return errors;
}

/** 日時フィールドを再帰的に UTC("...Z") へ正規化する */
function normalizeDates(node) {
  if (Array.isArray(node)) {
    node.forEach(normalizeDates);
    return;
  }
  if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (DATE_KEYS.has(key) && typeof value === "string" && value) {
        const t = Date.parse(value);
        if (Number.isNaN(t)) {
          throw new Error(`日時 "${key}": "${value}" を解釈できません`);
        }
        node[key] = new Date(t).toISOString();
      } else if (value && typeof value === "object") {
        normalizeDates(value);
      }
    }
  }
}

async function main() {
  loadEnv();
  const opts = parseArgs(process.argv.slice(2));

  if (opts.help) {
    console.log(
      "Usage: node scripts/report-incident.mjs --file <payload.json> [--dry-run] [--url <endpoint>]"
    );
    process.exit(0);
  }

  const raw = opts.file ? readFileSync(resolve(opts.file), "utf8") : readStdin();
  if (!raw.trim()) {
    console.error("エラー: ペイロードがありません（--file <path> か stdin で渡してください）");
    process.exit(1);
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (e) {
    console.error("エラー: JSON のパースに失敗しました:", e.message);
    process.exit(1);
  }

  normalizeDates(payload);

  const validationErrors = validatePayload(payload);
  if (validationErrors.length > 0) {
    console.error("エラー: ペイロードの検証に失敗しました:");
    for (const msg of validationErrors) console.error(`  - ${msg}`);
    process.exit(1);
  }

  if (opts.dryRun) {
    console.log("[dry-run] 送信される正規化済みペイロード:\n");
    console.log(JSON.stringify(payload, null, 2));
    process.exit(0);
  }

  const apiKey = process.env.STATUS_UPDATE_API_KEY;
  if (!apiKey) {
    console.error(
      "エラー: STATUS_UPDATE_API_KEY が未設定です（環境変数か .env に設定してください）"
    );
    process.exit(1);
  }

  const url = opts.url || process.env.STATUS_API_URL || DEFAULT_URL;
  console.log(`POST ${url}`);

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("エラー: リクエストに失敗しました:", e.message);
    process.exit(1);
  }

  const text = await res.text();
  let body = text;
  try {
    body = JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    /* プレーンテキストのまま */
  }

  if (res.ok) {
    console.log(`\n✅ 成功 (HTTP ${res.status})\n${body}`);
    process.exit(0);
  } else {
    console.error(`\n❌ 失敗 (HTTP ${res.status})\n${body}`);
    process.exit(1);
  }
}

main();
