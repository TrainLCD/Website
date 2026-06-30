import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

/**
 * 日時正規化ユーティリティ。
 *
 * `POST /api/status/events` の `isValidISODate` は `Z`(UTC) もしくはオフセット無しの
 * ISO 8601 のみを受理し、`+09:00` のようなオフセット付き文字列を弾く。そのため
 * 送信前に日時を UTC("...Z") へ正規化する必要がある。CLI(`report-incident.mjs`)が
 * 持っていた正規化ロジックをサーバ側でも使えるよう TS 化したもの。
 */

/** ペイロード内で日時として正規化対象にするキー。 */
export const DATE_KEYS = new Set([
  "startedAt",
  "resolvedAt",
  "statusSince",
  "createdAt",
]);

export const DEFAULT_TIMEZONE = "Asia/Tokyo";

/**
 * `<input type="datetime-local">` などタイムゾーン情報を持たないローカル日時文字列を、
 * 指定タイムゾーン（既定: JST）の時刻として解釈し UTC ISO("...Z") へ変換する。
 *
 * 例: toUtcIso("2026-06-30T09:00", "Asia/Tokyo") -> "2026-06-30T00:00:00.000Z"
 *
 * すでにオフセット/Z を含む文字列はそのまま UTC へ変換する。
 */
export function toUtcIso(
  localInput: string,
  tz: string = DEFAULT_TIMEZONE
): string {
  if (!localInput || typeof localInput !== "string") {
    throw new Error(`日時 "${localInput}" を解釈できません`);
  }

  // オフセット/Z を含む場合はそのタイムゾーンを尊重して UTC へ。
  const hasExplicitZone = /([zZ]|[+-]\d{2}:?\d{2})$/.test(localInput.trim());
  const parsed = hasExplicitZone
    ? dayjs(localInput)
    : dayjs.tz(localInput, tz);

  if (!parsed.isValid()) {
    throw new Error(`日時 "${localInput}" を解釈できません`);
  }
  return parsed.utc().toISOString();
}

/**
 * オブジェクト/配列を再帰的に走査し、DATE_KEYS に該当する文字列値を UTC("...Z") へ
 * 正規化する（破壊的に書き換える）。オフセット無しのローカル日時は `tz`（既定 JST）
 * として解釈する。
 */
export function normalizeDates(
  node: unknown,
  tz: string = DEFAULT_TIMEZONE
): void {
  if (Array.isArray(node)) {
    for (const item of node) normalizeDates(item, tz);
    return;
  }
  if (node && typeof node === "object") {
    const record = node as Record<string, unknown>;
    for (const [key, value] of Object.entries(record)) {
      if (DATE_KEYS.has(key) && typeof value === "string" && value) {
        record[key] = toUtcIso(value, tz);
      } else if (value && typeof value === "object") {
        normalizeDates(value, tz);
      }
    }
  }
}
