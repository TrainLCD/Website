import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "../../middleware";
import { signSession, ADMIN_SESSION_COOKIE } from "@/server/lib/adminAuth";

function makeRequest(path: string, cookie?: string) {
  const req = new NextRequest(`http://localhost:3000${path}`);
  if (cookie) req.cookies.set(ADMIN_SESSION_COOKIE, cookie);
  return req;
}

describe("middleware - 管理画面の保護", () => {
  const originalSecret = process.env.STATUS_ADMIN_SESSION_SECRET;

  beforeEach(() => {
    process.env.STATUS_ADMIN_SESSION_SECRET = "session-secret";
  });

  afterEach(() => {
    if (originalSecret === undefined)
      delete process.env.STATUS_ADMIN_SESSION_SECRET;
    else process.env.STATUS_ADMIN_SESSION_SECRET = originalSecret;
  });

  it("/admin/login は認証不要で通過する", async () => {
    const res = await middleware(makeRequest("/admin/login"));
    expect(res.headers.get("location")).toBeNull();
    expect(res.status).toBe(200);
  });

  it("/api/admin/login は認証不要で通過する", async () => {
    const res = await middleware(makeRequest("/api/admin/login"));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("未認証の /admin はログインへ from 付きでリダイレクトする", async () => {
    const res = await middleware(makeRequest("/admin"));
    expect(res.status).toBe(307);
    const location = res.headers.get("location") ?? "";
    expect(location).toContain("/admin/login");
    expect(location).toContain("from=%2Fadmin");
  });

  it("未認証の /api/admin/* は 401 を返す", async () => {
    const res = await middleware(makeRequest("/api/admin/events"));
    expect(res.status).toBe(401);
    expect(res.headers.get("location")).toBeNull();
  });

  it("有効な Cookie があれば通過する", async () => {
    const token = await signSession();
    const res = await middleware(makeRequest("/admin", token));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("改ざんされた Cookie はリダイレクトされる", async () => {
    const res = await middleware(makeRequest("/admin", "tampered.token"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location") ?? "").toContain("/admin/login");
  });
});
