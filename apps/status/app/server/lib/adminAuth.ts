/**
 * 管理画面(/admin)の認証ユーティリティ。
 *
 * 公開 API 用の `STATUS_UPDATE_API_KEY` とは別に、管理画面専用のパスワード認証を行う。
 * ログイン成功時に HMAC 署名付きトークンを発行し httpOnly Cookie に保存する。
 *
 * 重要: この関数群は Next middleware（Edge ランタイム）からも呼ばれるため、
 * `node:crypto` ではなく Web Crypto(`crypto.subtle`)・`btoa`/`atob`・`TextEncoder`
 * のみを使う（Edge / Node の両方で動作する）。
 *
 * 必要な環境変数:
 *   STATUS_ADMIN_PASSWORD        ログインパスワード
 *   STATUS_ADMIN_SESSION_SECRET  Cookie 署名用シークレット
 */

export const ADMIN_SESSION_COOKIE = "status_admin_session";

/** セッション有効期間（秒）。 */
export const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12時間

type SessionPayload = {
  /** 失効時刻（エポックミリ秒）。 */
  exp: number;
};

// ---- エンコード補助（Edge/Node 両対応） ----

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(input: string): Uint8Array {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded =
    normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacSha256(secret: string, data: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return new Uint8Array(signature);
}

/** 文字列の定数時間比較（長さは漏れるが内容は漏らさない）。 */
function timingSafeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const ab = encoder.encode(a);
  const bb = encoder.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  return diff === 0;
}

// ---- 公開 API ----

/** 管理画面の認証に必要な環境変数が揃っているか。 */
export function isAdminAuthConfigured(): boolean {
  return Boolean(
    process.env.STATUS_ADMIN_PASSWORD &&
      process.env.STATUS_ADMIN_SESSION_SECRET
  );
}

/** 入力パスワードを `STATUS_ADMIN_PASSWORD` と定数時間比較する。 */
export function verifyPassword(input: string): boolean {
  const expected = process.env.STATUS_ADMIN_PASSWORD;
  if (!expected) return false;
  return timingSafeEqual(input ?? "", expected);
}

/** 署名付きセッショントークン(`<body>.<sig>`)を生成する。 */
export async function signSession(
  ttlSeconds: number = SESSION_TTL_SECONDS,
  now: number = Date.now()
): Promise<string> {
  const secret = process.env.STATUS_ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("STATUS_ADMIN_SESSION_SECRET が未設定です");
  }
  const payload: SessionPayload = { exp: now + ttlSeconds * 1000 };
  const body = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = toBase64Url(await hmacSha256(secret, body));
  return `${body}.${sig}`;
}

/** トークンの署名と有効期限を検証する。有効なら true。 */
export async function verifySession(
  token: string | undefined | null,
  now: number = Date.now()
): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.STATUS_ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const separator = token.lastIndexOf(".");
  if (separator <= 0) return false;

  const body = token.slice(0, separator);
  const sig = token.slice(separator + 1);

  const expectedSig = toBase64Url(await hmacSha256(secret, body));
  if (!timingSafeEqual(sig, expectedSig)) return false;

  try {
    const payload = JSON.parse(
      new TextDecoder().decode(fromBase64Url(body))
    ) as SessionPayload;
    if (typeof payload.exp !== "number" || now > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}
