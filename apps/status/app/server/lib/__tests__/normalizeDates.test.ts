import { describe, it, expect } from "vitest";
import { toUtcIso, normalizeDates } from "../normalizeDates";

describe("toUtcIso", () => {
  it("JST(オフセット無し)を UTC へ変換する", () => {
    expect(toUtcIso("2026-06-30T09:00", "Asia/Tokyo")).toBe(
      "2026-06-30T00:00:00.000Z"
    );
  });

  it("日付をまたぐ JST も正しく変換する", () => {
    // JST 05:00 は前日の UTC 20:00
    expect(toUtcIso("2026-06-30T05:00", "Asia/Tokyo")).toBe(
      "2026-06-29T20:00:00.000Z"
    );
  });

  it("既に Z 付きの文字列はそのまま UTC として扱う", () => {
    expect(toUtcIso("2026-06-30T00:00:00Z", "Asia/Tokyo")).toBe(
      "2026-06-30T00:00:00.000Z"
    );
  });

  it("オフセット付きの文字列はそのオフセットを尊重する", () => {
    expect(toUtcIso("2026-06-30T09:00:00+09:00", "Asia/Tokyo")).toBe(
      "2026-06-30T00:00:00.000Z"
    );
  });

  it("不正な日時は例外を投げる", () => {
    expect(() => toUtcIso("not-a-date")).toThrow();
  });
});

describe("normalizeDates", () => {
  it("ネストした日時キーを UTC へ再帰的に正規化する", () => {
    const payload = {
      services: [{ serviceId: "tts", statusSince: "2026-06-30T09:00" }],
      incidents: [
        {
          startedAt: "2026-06-30T09:00",
          resolvedAt: "2026-06-30T18:00",
          title: { ja: "テスト", en: "test" },
          updates: [{ createdAt: "2026-06-30T10:00", body: { ja: "a", en: "a" } }],
        },
      ],
    };
    normalizeDates(payload);
    expect(payload.services[0]?.statusSince).toBe("2026-06-30T00:00:00.000Z");
    expect(payload.incidents[0]?.startedAt).toBe("2026-06-30T00:00:00.000Z");
    expect(payload.incidents[0]?.resolvedAt).toBe("2026-06-30T09:00:00.000Z");
    expect(payload.incidents[0]?.updates[0]?.createdAt).toBe(
      "2026-06-30T01:00:00.000Z"
    );
  });

  it("日時以外のフィールドは変更しない", () => {
    const payload = {
      incidents: [{ title: { ja: "9:00 開始", en: "starts at 9:00" } }],
    };
    normalizeDates(payload);
    expect(payload.incidents[0]?.title.ja).toBe("9:00 開始");
  });
});
