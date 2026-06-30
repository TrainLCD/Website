import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  verifyPassword,
  signSession,
  isAdminAuthConfigured,
  ADMIN_SESSION_COOKIE,
  SESSION_TTL_SECONDS,
} from "@/server/lib/adminAuth";

export async function POST(request: NextRequest) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          "管理画面が未設定です（STATUS_ADMIN_PASSWORD / STATUS_ADMIN_SESSION_SECRET を設定してください）",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const password =
    body && typeof body === "object" && typeof (body as { password?: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  if (!verifyPassword(password)) {
    // ブルートフォースを鈍化させる軽い遅延
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json(
      { error: "パスワードが正しくありません" },
      { status: 401 }
    );
  }

  const token = await signSession();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ success: true });
}
