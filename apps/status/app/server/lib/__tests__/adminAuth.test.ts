import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  isAdminAuthConfigured,
  verifyPassword,
  signSession,
  verifySession,
} from "../adminAuth";

describe("adminAuth", () => {
  const originalPassword = process.env.STATUS_ADMIN_PASSWORD;
  const originalSecret = process.env.STATUS_ADMIN_SESSION_SECRET;

  beforeEach(() => {
    process.env.STATUS_ADMIN_PASSWORD = "correct horse battery staple";
    process.env.STATUS_ADMIN_SESSION_SECRET = "test-session-secret";
  });

  afterEach(() => {
    if (originalPassword === undefined) delete process.env.STATUS_ADMIN_PASSWORD;
    else process.env.STATUS_ADMIN_PASSWORD = originalPassword;
    if (originalSecret === undefined)
      delete process.env.STATUS_ADMIN_SESSION_SECRET;
    else process.env.STATUS_ADMIN_SESSION_SECRET = originalSecret;
  });

  it("環境変数が揃っていれば configured を返す", () => {
    expect(isAdminAuthConfigured()).toBe(true);
    delete process.env.STATUS_ADMIN_PASSWORD;
    expect(isAdminAuthConfigured()).toBe(false);
  });

  it("正しいパスワードのみ受理する", () => {
    expect(verifyPassword("correct horse battery staple")).toBe(true);
    expect(verifyPassword("wrong")).toBe(false);
    expect(verifyPassword("")).toBe(false);
  });

  it("署名したセッションを検証できる", async () => {
    const token = await signSession();
    expect(await verifySession(token)).toBe(true);
  });

  it("改ざんされたトークンを拒否する", async () => {
    const token = await signSession();
    const tampered = token.slice(0, -2) + (token.endsWith("a") ? "bb" : "aa");
    expect(await verifySession(tampered)).toBe(false);
  });

  it("別シークレットで署名したトークンを拒否する", async () => {
    const token = await signSession();
    process.env.STATUS_ADMIN_SESSION_SECRET = "different-secret";
    expect(await verifySession(token)).toBe(false);
  });

  it("期限切れのトークンを拒否する", async () => {
    // 2分前に発行され ttl 60 秒 -> 既に失効
    const token = await signSession(60, Date.now() - 120_000);
    expect(await verifySession(token)).toBe(false);
  });

  it("空・不正なトークンを拒否する", async () => {
    expect(await verifySession(undefined)).toBe(false);
    expect(await verifySession("")).toBe(false);
    expect(await verifySession("garbage")).toBe(false);
  });
});
