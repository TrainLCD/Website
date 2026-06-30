import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { NextRequest } from "next/server";

const { setCookie } = vi.hoisted(() => ({ setCookie: vi.fn() }));
vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({ set: setCookie })),
}));

import { POST } from "../route";
import { ADMIN_SESSION_COOKIE } from "@/server/lib/adminAuth";

function makeRequest(body: string) {
  return new NextRequest("http://localhost:3000/api/admin/login", {
    method: "POST",
    body,
  });
}

describe("POST /api/admin/login", () => {
  const originalPassword = process.env.STATUS_ADMIN_PASSWORD;
  const originalSecret = process.env.STATUS_ADMIN_SESSION_SECRET;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STATUS_ADMIN_PASSWORD = "s3cret-pass";
    process.env.STATUS_ADMIN_SESSION_SECRET = "session-secret";
  });

  afterEach(() => {
    if (originalPassword === undefined) delete process.env.STATUS_ADMIN_PASSWORD;
    else process.env.STATUS_ADMIN_PASSWORD = originalPassword;
    if (originalSecret === undefined)
      delete process.env.STATUS_ADMIN_SESSION_SECRET;
    else process.env.STATUS_ADMIN_SESSION_SECRET = originalSecret;
  });

  it("未設定なら 503 を返す", async () => {
    delete process.env.STATUS_ADMIN_PASSWORD;
    const res = await POST(makeRequest(JSON.stringify({ password: "x" })));
    expect(res.status).toBe(503);
    expect(setCookie).not.toHaveBeenCalled();
  });

  it("不正なパスワードは 401 を返し Cookie を設定しない", async () => {
    const res = await POST(makeRequest(JSON.stringify({ password: "wrong" })));
    expect(res.status).toBe(401);
    expect(setCookie).not.toHaveBeenCalled();
  });

  it("不正な JSON は空ボディとして扱い 401 になる", async () => {
    const res = await POST(makeRequest("not-json"));
    expect(res.status).toBe(401);
  });

  it("正しいパスワードで 200 と Cookie を設定する", async () => {
    const res = await POST(makeRequest(JSON.stringify({ password: "s3cret-pass" })));
    expect(res.status).toBe(200);
    expect(setCookie).toHaveBeenCalledTimes(1);
    const [name, value, options] = setCookie.mock.calls[0] ?? [];
    expect(name).toBe(ADMIN_SESSION_COOKIE);
    expect(typeof value).toBe("string");
    expect((value as string).length).toBeGreaterThan(0);
    expect(options).toMatchObject({
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
    expect(options?.maxAge).toBeGreaterThan(0);
    expect(options && "secure" in options).toBe(true);
  });
});
