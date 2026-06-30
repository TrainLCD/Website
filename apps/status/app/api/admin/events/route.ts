import { NextRequest, NextResponse } from "next/server";
import { validatePayload, applyStatusEvents } from "@/server/lib/statusEvents";
import { normalizeDates } from "@/server/lib/normalizeDates";

/**
 * 管理画面からのステータス更新。認証は middleware（セッション Cookie）で済んでいる。
 * フォームの `datetime-local`（JST・タイムゾーン無し）入力を UTC へ正規化したうえで、
 * 公開 API と同じ検証・適用ロジック(applyStatusEvents)を直接呼ぶ（API キー不要）。
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "リクエストボディが不正です" },
      { status: 400 }
    );
  }

  // 日時(JST/datetime-local)を UTC("...Z") へ正規化
  try {
    if (body && typeof body === "object") {
      normalizeDates(body);
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "日時の正規化に失敗しました",
      },
      { status: 400 }
    );
  }

  const validation = validatePayload(body);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    await applyStatusEvents(validation.data);
  } catch (error) {
    console.error("[AdminEvents] 更新に失敗しました:", error);
    return NextResponse.json(
      {
        error: "更新に失敗しました",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "ステータスを更新しました",
  });
}
