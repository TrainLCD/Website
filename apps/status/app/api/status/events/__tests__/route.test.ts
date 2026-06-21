import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { POST } from '../route';
import { NextRequest } from 'next/server';

// Prismaのモック
vi.mock('@/server/lib/prisma', () => {
  const mockServiceDefinitionFindUnique = vi.fn();
  const mockServiceStatusSnapshotFindFirst = vi.fn();
  const mockServiceStatusSnapshotCreate = vi.fn();
  const mockServiceStatusSnapshotUpdate = vi.fn();
  const mockIncidentHistoryFindUnique = vi.fn();
  const mockIncidentHistoryCreate = vi.fn();
  const mockIncidentHistoryUpdate = vi.fn();
  const mockAffectedServiceDeleteMany = vi.fn();
  const mockAffectedServiceCreate = vi.fn();
  const mockAffectedServiceCreateMany = vi.fn();
  const mockIncidentUpdateFindUnique = vi.fn();
  const mockIncidentUpdateCreate = vi.fn();

  const mockTransactionClient = {
    serviceDefinition: {
      findUnique: mockServiceDefinitionFindUnique,
    },
    serviceStatusSnapshot: {
      findFirst: mockServiceStatusSnapshotFindFirst,
      create: mockServiceStatusSnapshotCreate,
      update: mockServiceStatusSnapshotUpdate,
    },
    incidentHistory: {
      findUnique: mockIncidentHistoryFindUnique,
      create: mockIncidentHistoryCreate,
      update: mockIncidentHistoryUpdate,
    },
    affectedService: {
      deleteMany: mockAffectedServiceDeleteMany,
      create: mockAffectedServiceCreate,
      createMany: mockAffectedServiceCreateMany,
    },
    incidentUpdate: {
      findUnique: mockIncidentUpdateFindUnique,
      create: mockIncidentUpdateCreate,
    },
  };

  return {
    prisma: {
      $transaction: vi.fn((callback) => callback(mockTransactionClient)),
      serviceDefinition: {
        findUnique: mockServiceDefinitionFindUnique,
      },
      serviceStatusSnapshot: {
        findFirst: mockServiceStatusSnapshotFindFirst,
        create: mockServiceStatusSnapshotCreate,
        update: mockServiceStatusSnapshotUpdate,
      },
      incidentHistory: {
        findUnique: mockIncidentHistoryFindUnique,
        create: mockIncidentHistoryCreate,
        update: mockIncidentHistoryUpdate,
      },
      affectedService: {
        deleteMany: mockAffectedServiceDeleteMany,
        create: mockAffectedServiceCreate,
        createMany: mockAffectedServiceCreateMany,
      },
      incidentUpdate: {
        findUnique: mockIncidentUpdateFindUnique,
        create: mockIncidentUpdateCreate,
      },
    },
  };
});

// Edge Config のモック
vi.mock('@/server/lib/edgeConfig', () => ({
  writeSnapshotsToEdgeConfig: vi.fn(),
}));

// リポジトリのモック
vi.mock('@/server/repo/serviceRepository', () => ({
  getServices: vi.fn(),
}));

vi.mock('@/server/repo/incidentRepository', () => ({
  getIncidentHistories: vi.fn(),
}));

// モック関数の取得
import { prisma } from '@/server/lib/prisma';
import { writeSnapshotsToEdgeConfig } from '@/server/lib/edgeConfig';
import { getServices } from '@/server/repo/serviceRepository';
import { getIncidentHistories } from '@/server/repo/incidentRepository';

const mockPrisma = vi.mocked(prisma);
const mockWriteSnapshots = vi.mocked(writeSnapshotsToEdgeConfig);
const mockGetServices = vi.mocked(getServices);
const mockGetIncidentHistories = vi.mocked(getIncidentHistories);

// Prismaのモック関数を取得
const mockServiceDefinitionFindUnique = mockPrisma.serviceDefinition.findUnique;
const mockServiceStatusSnapshotFindFirst = mockPrisma.serviceStatusSnapshot.findFirst;
const mockServiceStatusSnapshotCreate = mockPrisma.serviceStatusSnapshot.create;
const mockServiceStatusSnapshotUpdate = mockPrisma.serviceStatusSnapshot.update;
const mockIncidentHistoryFindUnique = mockPrisma.incidentHistory.findUnique;
const mockIncidentHistoryCreate = mockPrisma.incidentHistory.create;
const mockIncidentHistoryUpdate = mockPrisma.incidentHistory.update;
const mockAffectedServiceDeleteMany = mockPrisma.affectedService.deleteMany;
const mockAffectedServiceCreate = mockPrisma.affectedService.create;
const mockAffectedServiceCreateMany = mockPrisma.affectedService.createMany;
const mockIncidentUpdateFindUnique = mockPrisma.incidentUpdate.findUnique;
const mockIncidentUpdateCreate = mockPrisma.incidentUpdate.create;

describe('POST /api/status/events', () => {
  const originalEnv = process.env.STATUS_UPDATE_API_KEY;
  
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetServices.mockResolvedValue([]);
    mockGetIncidentHistories.mockResolvedValue([]);
    mockWriteSnapshots.mockResolvedValue(undefined);
    // テスト用にAPIキーを設定
    process.env.STATUS_UPDATE_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    vi.resetAllMocks();
    // 元の環境変数を復元
    if (originalEnv === undefined) {
      delete process.env.STATUS_UPDATE_API_KEY;
    } else {
      process.env.STATUS_UPDATE_API_KEY = originalEnv;
    }
  });

  describe('認証', () => {
    it('API キーが設定されている場合、正しいキーがないと401エラーを返す', async () => {
      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        body: JSON.stringify({
          services: [{
            serviceId: 'test-service',
            status: 'operational',
            summary: { ja: 'サマリー', en: 'Summary' },
          }],
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toContain('認証');
    });

    it('正しいAPI キーがあれば認証が通る', async () => {
      mockServiceDefinitionFindUnique.mockResolvedValue({
        id: 'test-service',
        category: 'application',
        labelJa: 'テストサービス',
        labelEn: 'Test Service',
        descriptionJa: '説明',
        descriptionEn: 'Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      mockServiceStatusSnapshotFindFirst.mockResolvedValue(null);
      mockServiceStatusSnapshotCreate.mockResolvedValue({
        id: 1,
        serviceId: 'test-service',
        status: 'operational',
        summaryJa: 'サマリー',
        summaryEn: 'Summary',
        statusSince: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
      });

      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          services: [{
            serviceId: 'test-service',
            status: 'operational',
            summary: { ja: 'サマリー', en: 'Summary' },
          }],
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('API キーが設定されていない場合、認証チェックをスキップする', async () => {
      delete process.env.STATUS_UPDATE_API_KEY;

      mockServiceDefinitionFindUnique.mockResolvedValue({
        id: 'test-service',
        category: 'application',
        labelJa: 'テストサービス',
        labelEn: 'Test Service',
        descriptionJa: '説明',
        descriptionEn: 'Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      mockServiceStatusSnapshotFindFirst.mockResolvedValue(null);
      mockServiceStatusSnapshotCreate.mockResolvedValue({
        id: 1,
        serviceId: 'test-service',
        status: 'operational',
        summaryJa: 'サマリー',
        summaryEn: 'Summary',
        statusSince: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
      });

      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        body: JSON.stringify({
          services: [{
            serviceId: 'test-service',
            status: 'operational',
            summary: { ja: 'サマリー', en: 'Summary' },
          }],
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe('バリデーション', () => {
    it('空のリクエストボディの場合、400エラーを返す', async () => {
      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('services または incidents');
    });

    it('services が配列でない場合、400エラーを返す', async () => {
      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          services: 'invalid',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('配列である必要があります');
    });

    it('service の status が不正な場合、400エラーを返す', async () => {
      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          services: [
            {
              serviceId: 'test-service',
              status: 'invalid-status',
              summary: {
                ja: 'テストサマリー',
                en: 'Test summary',
              },
            },
          ],
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('services の形式が正しくありません');
    });

    it('service の summary が LocaleText でない場合、400エラーを返す', async () => {
      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          services: [
            {
              serviceId: 'test-service',
              status: 'operational',
              summary: 'invalid',
            },
          ],
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('services の形式が正しくありません');
    });

    it('incident の impact が不正な場合、400エラーを返す', async () => {
      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          incidents: [
            {
              impact: 'invalid-impact',
              affectedServiceIds: ['service1'],
              title: { ja: 'タイトル', en: 'Title' },
              description: { ja: '説明', en: 'Description' },
              startedAt: '2024-01-01T00:00:00Z',
            },
          ],
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('incidents の形式が正しくありません');
    });

    it('incident の affectedServiceIds が空配列の場合、400エラーを返す', async () => {
      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          incidents: [
            {
              impact: 'outage',
              affectedServiceIds: [],
              title: { ja: 'タイトル', en: 'Title' },
              description: { ja: '説明', en: 'Description' },
              startedAt: '2024-01-01T00:00:00Z',
            },
          ],
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('incidents の形式が正しくありません');
    });
  });

  describe('サービスステータスの更新', () => {
    it('正常なリクエストの場合、サービスステータスを更新する', async () => {
      mockServiceDefinitionFindUnique.mockResolvedValue({
        id: 'test-service',
        category: 'application',
        labelJa: 'テストサービス',
        labelEn: 'Test Service',
        descriptionJa: '説明',
        descriptionEn: 'Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      mockServiceStatusSnapshotFindFirst.mockResolvedValue(null);
      mockServiceStatusSnapshotCreate.mockResolvedValue({
        id: 1,
        serviceId: 'test-service',
        status: 'degraded',
        summaryJa: 'サービスが低下しています',
        summaryEn: 'Service is degraded',
        statusSince: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
      });

      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          services: [
            {
              serviceId: 'test-service',
              status: 'degraded',
              summary: {
                ja: 'サービスが低下しています',
                en: 'Service is degraded',
              },
            },
          ],
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockServiceDefinitionFindUnique).toHaveBeenCalledWith({
        where: { id: 'test-service' },
      });
      expect(mockServiceStatusSnapshotCreate).toHaveBeenCalled();
    });

    it('ステータスが変更されていない場合、サマリーのみ更新する', async () => {
      mockServiceDefinitionFindUnique.mockResolvedValue({
        id: 'test-service',
        category: 'application',
        labelJa: 'テストサービス',
        labelEn: 'Test Service',
        descriptionJa: '説明',
        descriptionEn: 'Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      mockServiceStatusSnapshotFindFirst.mockResolvedValue({
        id: 1,
        serviceId: 'test-service',
        status: 'operational',
        summaryJa: '古いサマリー',
        summaryEn: 'Old summary',
        statusSince: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
      });
      mockServiceStatusSnapshotUpdate.mockResolvedValue({
        id: 1,
        serviceId: 'test-service',
        status: 'operational',
        summaryJa: '新しいサマリー',
        summaryEn: 'New summary',
        statusSince: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
      });

      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          services: [
            {
              serviceId: 'test-service',
              status: 'operational',
              summary: {
                ja: '新しいサマリー',
                en: 'New summary',
              },
            },
          ],
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(mockServiceStatusSnapshotUpdate).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          summaryJa: '新しいサマリー',
          summaryEn: 'New summary',
        },
      });
      expect(mockServiceStatusSnapshotCreate).not.toHaveBeenCalled();
    });

    it('存在しないサービスIDの場合、500エラーを返す', async () => {
      mockServiceDefinitionFindUnique.mockResolvedValue(null);

      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          services: [
            {
              serviceId: 'non-existent-service',
              status: 'operational',
              summary: {
                ja: 'サマリー',
                en: 'Summary',
              },
            },
          ],
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('サーバーエラーが発生しました');
      // Note: details are only shown in development mode
    });
  });

  describe('インシデントの更新', () => {
    it('正常なリクエストの場合、新規インシデントを作成する', async () => {
      mockIncidentHistoryFindUnique.mockResolvedValue(null);
      mockIncidentHistoryCreate.mockResolvedValue({
        id: 'incident-1',
        slug: 'slug-1',
        incidentImpact: 'outage',
        titleJa: 'システム障害',
        titleEn: 'System Outage',
        descriptionJa: 'システムに障害が発生しています',
        descriptionEn: 'System is experiencing an outage',
        publishedAt: new Date(),
        startedAt: new Date(),
        updatedAt: new Date(),
        resolvedAt: null,
        estimatedResolveDate: null,
        causeJa: null,
        causeEn: null,
        externalLink: null,
        lastNotifiedAt: new Date(),
        createdAt: new Date(),
      });
      mockAffectedServiceDeleteMany.mockResolvedValue({ count: 0 });
      mockAffectedServiceCreate.mockResolvedValue({
        incidentId: 'incident-1',
        serviceId: 'service1',
        createdAt: new Date(),
      });

      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          incidents: [
            {
              impact: 'outage',
              affectedServiceIds: ['service1', 'service2'],
              title: {
                ja: 'システム障害',
                en: 'System Outage',
              },
              description: {
                ja: 'システムに障害が発生しています',
                en: 'System is experiencing an outage',
              },
              startedAt: '2024-01-01T00:00:00Z',
            },
          ],
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockIncidentHistoryCreate).toHaveBeenCalled();
      expect(mockAffectedServiceCreateMany).toHaveBeenCalledWith({
        data: [
          { incidentId: expect.any(String), serviceId: 'service1' },
          { incidentId: expect.any(String), serviceId: 'service2' },
        ],
        skipDuplicates: true,
      });
    });

    it('既存のインシデントIDが指定された場合、インシデントを更新する', async () => {
      mockIncidentHistoryFindUnique.mockResolvedValue({
        id: 'existing-incident',
        slug: 'existing-slug',
        incidentImpact: 'outage',
        titleJa: '既存タイトル',
        titleEn: 'Existing Title',
        descriptionJa: '既存説明',
        descriptionEn: 'Existing Description',
        publishedAt: new Date(),
        startedAt: new Date(),
        updatedAt: new Date(),
        resolvedAt: null,
        estimatedResolveDate: null,
        causeJa: null,
        causeEn: null,
        externalLink: null,
        lastNotifiedAt: null,
        createdAt: new Date(),
      });
      mockIncidentHistoryUpdate.mockResolvedValue({
        id: 'existing-incident',
        slug: 'existing-slug',
        incidentImpact: 'degraded',
        titleJa: '更新されたタイトル',
        titleEn: 'Updated Title',
        descriptionJa: '更新された説明',
        descriptionEn: 'Updated Description',
        publishedAt: new Date(),
        startedAt: new Date(),
        updatedAt: new Date(),
        resolvedAt: null,
        estimatedResolveDate: null,
        causeJa: null,
        causeEn: null,
        externalLink: null,
        lastNotifiedAt: new Date(),
        createdAt: new Date(),
      });
      mockAffectedServiceDeleteMany.mockResolvedValue({ count: 1 });
      mockAffectedServiceCreate.mockResolvedValue({
        incidentId: 'existing-incident',
        serviceId: 'service1',
        createdAt: new Date(),
      });

      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          incidents: [
            {
              id: 'existing-incident',
              impact: 'degraded',
              affectedServiceIds: ['service1'],
              title: {
                ja: '更新されたタイトル',
                en: 'Updated Title',
              },
              description: {
                ja: '更新された説明',
                en: 'Updated Description',
              },
              startedAt: '2024-01-01T00:00:00Z',
            },
          ],
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(mockIncidentHistoryUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'existing-incident' },
        })
      );
    });

    it('インシデント更新を含む場合、インシデント更新を作成する', async () => {
      mockIncidentHistoryFindUnique.mockResolvedValue(null);
      mockIncidentHistoryCreate.mockResolvedValue({
        id: 'incident-1',
        slug: 'slug-1',
        incidentImpact: 'outage',
        titleJa: 'システム障害',
        titleEn: 'System Outage',
        descriptionJa: '説明',
        descriptionEn: 'Description',
        publishedAt: new Date(),
        startedAt: new Date(),
        updatedAt: new Date(),
        resolvedAt: null,
        estimatedResolveDate: null,
        causeJa: null,
        causeEn: null,
        externalLink: null,
        lastNotifiedAt: new Date(),
        createdAt: new Date(),
      });
      mockAffectedServiceDeleteMany.mockResolvedValue({ count: 0 });
      mockAffectedServiceCreate.mockResolvedValue({
        incidentId: 'incident-1',
        serviceId: 'service1',
        createdAt: new Date(),
      });
      mockIncidentUpdateFindUnique.mockResolvedValue(null);
      mockIncidentUpdateCreate.mockResolvedValue({
        id: 'update-1',
        incidentId: 'incident-1',
        status: 'degraded',
        bodyJa: '調査中です',
        bodyEn: 'Investigating',
        createdAt: new Date(),
      });

      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          incidents: [
            {
              impact: 'outage',
              affectedServiceIds: ['service1'],
              title: {
                ja: 'システム障害',
                en: 'System Outage',
              },
              description: {
                ja: '説明',
                en: 'Description',
              },
              startedAt: '2024-01-01T00:00:00Z',
              updates: [
                {
                  status: 'degraded',
                  body: {
                    ja: '調査中です',
                    en: 'Investigating',
                  },
                },
              ],
            },
          ],
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(mockIncidentUpdateCreate).toHaveBeenCalled();
    });
  });

  describe('Edge Config 同期', () => {
    it('更新成功後、Edge Config スナップショットを再構築して書き込む', async () => {
      mockServiceDefinitionFindUnique.mockResolvedValue({
        id: 'test-service',
        category: 'application',
        labelJa: 'テストサービス',
        labelEn: 'Test Service',
        descriptionJa: '説明',
        descriptionEn: 'Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      mockServiceStatusSnapshotFindFirst.mockResolvedValue(null);
      mockServiceStatusSnapshotCreate.mockResolvedValue({
        id: 1,
        serviceId: 'test-service',
        status: 'operational',
        summaryJa: 'サマリー',
        summaryEn: 'Summary',
        statusSince: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
      });

      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          services: [
            {
              serviceId: 'test-service',
              status: 'operational',
              summary: {
                ja: 'サマリー',
                en: 'Summary',
              },
            },
          ],
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      // DB をバイパスして最新を取得していること
      expect(mockGetServices).toHaveBeenCalledWith('ja', { skipCache: true });
      expect(mockGetServices).toHaveBeenCalledWith('en', { skipCache: true });
      expect(mockGetIncidentHistories).toHaveBeenCalledWith('ja', {
        skipCache: true,
      });
      expect(mockGetIncidentHistories).toHaveBeenCalledWith('en', {
        skipCache: true,
      });
      // 各ロケールのスナップショットを Edge Config へ書き込んでいること
      expect(mockWriteSnapshots).toHaveBeenCalledWith([
        { locale: 'ja', services: [], incidents: [] },
        { locale: 'en', services: [], incidents: [] },
      ]);
    });

    it('Edge Config への書き込みが失敗しても、DB は正本なのでリクエストは成功する', async () => {
      mockWriteSnapshots.mockRejectedValue(new Error('size limit exceeded'));

      mockServiceDefinitionFindUnique.mockResolvedValue({
        id: 'test-service',
        category: 'application',
        labelJa: 'テストサービス',
        labelEn: 'Test Service',
        descriptionJa: '説明',
        descriptionEn: 'Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      mockServiceStatusSnapshotFindFirst.mockResolvedValue(null);
      mockServiceStatusSnapshotCreate.mockResolvedValue({
        id: 1,
        serviceId: 'test-service',
        status: 'operational',
        summaryJa: 'サマリー',
        summaryEn: 'Summary',
        statusSince: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
      });

      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({
          services: [
            {
              serviceId: 'test-service',
              status: 'operational',
              summary: {
                ja: 'サマリー',
                en: 'Summary',
              },
            },
          ],
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe('リフレッシュ要求', () => {
    it('{ refresh: true } の場合、DB を変更せず Edge Config を再同期する', async () => {
      const request = new NextRequest('http://localhost:3000/api/status/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'test-api-key',
        },
        body: JSON.stringify({ refresh: true }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      // DB の書き込みは行われない
      expect(mockServiceStatusSnapshotCreate).not.toHaveBeenCalled();
      expect(mockIncidentHistoryCreate).not.toHaveBeenCalled();
      // Edge Config への再同期は行われる
      expect(mockWriteSnapshots).toHaveBeenCalled();
    });
  });
});
