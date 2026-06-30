import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import {
  validatePayload,
  applyStatusEvents,
  refreshEdgeConfigSnapshots,
} from "@/server/lib/statusEvents";

export async function POST(request: NextRequest) {
  try {
    // API キー認証チェック（タイミング攻撃対策）
    const apiKey = request.headers.get("x-api-key");
    const expectedApiKey = process.env.STATUS_UPDATE_API_KEY;

    if (expectedApiKey) {
      if (!apiKey) {
        return NextResponse.json(
          { error: "認証に失敗しました" },
          { status: 401 }
        );
      }

      // タイミング攻撃を防ぐために timingSafeEqual を使用
      const apiKeyBuffer = Buffer.from(apiKey);
      const expectedKeyBuffer = Buffer.from(expectedApiKey);

      // バッファの長さを同じにする（timingSafeEqual の要件）
      if (apiKeyBuffer.length !== expectedKeyBuffer.length) {
        return NextResponse.json(
          { error: "認証に失敗しました" },
          { status: 401 }
        );
      }

      if (!timingSafeEqual(apiKeyBuffer, expectedKeyBuffer)) {
        return NextResponse.json(
          { error: "認証に失敗しました" },
          { status: 401 }
        );
      }
    }

    // リクエストボディの取得
    const body = await request.json();

    // リフレッシュ要求: DB を変更せず、現在の DB 状態から Edge Config を
    // 再同期する（初期ブートストラップ・復旧用）。
    if (
      body &&
      typeof body === "object" &&
      (body as { refresh?: unknown }).refresh === true &&
      (body as { services?: unknown }).services === undefined &&
      (body as { incidents?: unknown }).incidents === undefined
    ) {
      await refreshEdgeConfigSnapshots();
      return NextResponse.json(
        { success: true, message: "Edge Config を再同期しました" },
        { status: 200 }
      );
    }

    // バリデーション
    const validation = validatePayload(body);

    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // データベース更新 + 読み取り層(Edge Config)への反映
    await applyStatusEvents(validation.data);

    return NextResponse.json(
      {
        success: true,
        message: "ステータスが正常に更新されました",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[StatusEvents] エラーが発生しました:", error);

    // 本番環境では詳細なエラーメッセージを隠す
    const isDevelopment = process.env.NODE_ENV === "development";

    return NextResponse.json(
      {
        error: "サーバーエラーが発生しました",
        ...(isDevelopment && {
          details: error instanceof Error ? error.message : String(error),
        }),
      },
      { status: 500 }
    );
  }
}
