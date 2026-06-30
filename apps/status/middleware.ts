import { NextRequest, NextResponse } from "next/server";
import { verifySession, ADMIN_SESSION_COOKIE } from "@/server/lib/adminAuth";

/**
 * 管理画面の保護。`/admin` 配下のページと `/api/admin` 配下の API へのアクセスで
 * セッション Cookie を検証する。ログインエンドポイントは公開。
 *
 * 未認証のとき: ページは `/admin/login` へリダイレクト、API は 401 を返す。
 */
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ログイン関連は認証不要
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const authenticated = await verifySession(token);
  if (authenticated) {
    return NextResponse.next();
  }

  // API は JSON 401、ページはログインへリダイレクト
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}
