import { describe, it, expect, vi, beforeEach } from "vitest";

// prisma のトランザクションクライアントをモック（$transaction(cb) は cb(txClient) を実行）。
const { txClient } = vi.hoisted(() => ({
  txClient: {
    serviceDefinition: { findUnique: vi.fn() },
    serviceStatusSnapshot: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    incidentHistory: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    affectedService: { deleteMany: vi.fn(), createMany: vi.fn() },
    incidentUpdate: { findUnique: vi.fn(), create: vi.fn(), update: vi.fn() },
  },
}));

vi.mock("@/server/lib/prisma", () => ({
  prisma: {
    $transaction: vi.fn((cb: (tx: typeof txClient) => unknown) => cb(txClient)),
  },
}));
vi.mock("@/server/lib/edgeConfig", () => ({
  writeSnapshotsToEdgeConfig: vi.fn(),
}));
vi.mock("@/server/repo/serviceRepository", () => ({ getServices: vi.fn() }));
vi.mock("@/server/repo/incidentRepository", () => ({
  getIncidentHistories: vi.fn(),
}));

import {
  validatePayload,
  updateIncidents,
  applyStatusEvents,
} from "../statusEvents";
import { writeSnapshotsToEdgeConfig } from "@/server/lib/edgeConfig";
import { getServices } from "@/server/repo/serviceRepository";
import { getIncidentHistories } from "@/server/repo/incidentRepository";

describe("validatePayload", () => {
  it("services も incidents も無いと無効", () => {
    expect(validatePayload({}).valid).toBe(false);
  });

  it("正しい service を受理する", () => {
    const result = validatePayload({
      services: [
        { serviceId: "tts", status: "outage", summary: { ja: "停止中", en: "down" } },
      ],
    });
    expect(result.valid).toBe(true);
  });

  it("不正な status を弾く", () => {
    const result = validatePayload({
      services: [
        { serviceId: "tts", status: "broken", summary: { ja: "x", en: "x" } },
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

describe("updateIncidents - update.id の所属チェック", () => {
  const baseIncident = {
    id: "inc1",
    impact: "outage" as const,
    affectedServiceIds: ["tts"],
    title: { ja: "障害", en: "Outage" },
    description: { ja: "説明", en: "desc" },
    startedAt: "2026-06-30T00:00:00Z",
    updates: [
      {
        id: "upd1",
        status: "outage" as const,
        body: { ja: "調査中", en: "investigating" },
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    txClient.incidentHistory.findUnique.mockResolvedValue({ id: "inc1" });
    txClient.affectedService.deleteMany.mockResolvedValue({ count: 0 });
    txClient.affectedService.createMany.mockResolvedValue({ count: 1 });
  });

  it("別インシデントに属する update.id は拒否する", async () => {
    txClient.incidentUpdate.findUnique.mockResolvedValue({
      incidentId: "other-incident",
    });
    await expect(updateIncidents([baseIncident])).rejects.toThrow(
      "別インシデントの更新 ID は使用できません"
    );
    expect(txClient.incidentUpdate.update).not.toHaveBeenCalled();
  });

  it("同じインシデントに属する update.id は更新する", async () => {
    txClient.incidentUpdate.findUnique.mockResolvedValue({ incidentId: "inc1" });
    txClient.incidentUpdate.update.mockResolvedValue({ id: "upd1" });
    await updateIncidents([baseIncident]);
    expect(txClient.incidentUpdate.update).toHaveBeenCalled();
  });
});

describe("applyStatusEvents", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getServices).mockResolvedValue([]);
    vi.mocked(getIncidentHistories).mockResolvedValue([]);
    vi.mocked(writeSnapshotsToEdgeConfig).mockResolvedValue(undefined);
  });

  it("services 更新後に Edge Config スナップショットを書き込む", async () => {
    txClient.serviceDefinition.findUnique.mockResolvedValue({ id: "tts" });
    txClient.serviceStatusSnapshot.findFirst.mockResolvedValue(null);
    txClient.serviceStatusSnapshot.create.mockResolvedValue({ id: 1 });

    await applyStatusEvents({
      services: [
        { serviceId: "tts", status: "outage", summary: { ja: "停止", en: "down" } },
      ],
    });

    expect(txClient.serviceStatusSnapshot.create).toHaveBeenCalled();
    // Edge Config 再同期は DB 最新値を読む契約（skipCache: true）を固定する
    expect(getServices).toHaveBeenCalledWith("ja", { skipCache: true });
    expect(getServices).toHaveBeenCalledWith("en", { skipCache: true });
    expect(getIncidentHistories).toHaveBeenCalledWith("ja", { skipCache: true });
    expect(getIncidentHistories).toHaveBeenCalledWith("en", { skipCache: true });
    expect(writeSnapshotsToEdgeConfig).toHaveBeenCalled();
  });
});
