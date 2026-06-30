import { describe, it, expect, vi } from "vitest";

// statusEvents は prisma / edgeConfig / repos を import するため、
// validatePayload（純粋関数）だけを検証する場合でもこれらをモックする。
vi.mock("@/server/lib/prisma", () => ({ prisma: {} }));
vi.mock("@/server/lib/edgeConfig", () => ({
  writeSnapshotsToEdgeConfig: vi.fn(),
}));
vi.mock("@/server/repo/serviceRepository", () => ({ getServices: vi.fn() }));
vi.mock("@/server/repo/incidentRepository", () => ({
  getIncidentHistories: vi.fn(),
}));

import { validatePayload } from "../statusEvents";

describe("validatePayload", () => {
  it("services も incidents も無いと無効", () => {
    const result = validatePayload({});
    expect(result.valid).toBe(false);
  });

  it("正しい service を受理する", () => {
    const result = validatePayload({
      services: [
        {
          serviceId: "tts",
          status: "outage",
          summary: { ja: "停止中", en: "down" },
        },
      ],
    });
    expect(result.valid).toBe(true);
  });

  it("不正な status を弾く", () => {
    const result = validatePayload({
      services: [
        {
          serviceId: "tts",
          status: "broken",
          summary: { ja: "x", en: "x" },
        },
      ],
    });
    expect(result.valid).toBe(false);
  });

  it("affectedServiceIds が空の incident を弾く", () => {
    const result = validatePayload({
      incidents: [
        {
          impact: "outage",
          affectedServiceIds: [],
          title: { ja: "t", en: "t" },
          description: { ja: "d", en: "d" },
          startedAt: "2026-06-30T00:00:00Z",
        },
      ],
    });
    expect(result.valid).toBe(false);
  });

  it("正しい incident を受理する", () => {
    const result = validatePayload({
      incidents: [
        {
          impact: "outage",
          affectedServiceIds: ["tts"],
          title: { ja: "障害", en: "Outage" },
          description: { ja: "説明", en: "desc" },
          startedAt: "2026-06-30T00:00:00Z",
        },
      ],
    });
    expect(result.valid).toBe(true);
  });

  it("オフセット付き日時(+09:00)は弾く（UTC 正規化が前提）", () => {
    const result = validatePayload({
      incidents: [
        {
          impact: "outage",
          affectedServiceIds: ["tts"],
          title: { ja: "障害", en: "Outage" },
          description: { ja: "説明", en: "desc" },
          startedAt: "2026-06-30T09:00:00+09:00",
        },
      ],
    });
    expect(result.valid).toBe(false);
  });
});
