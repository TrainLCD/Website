import { describe, it, expect, vi, beforeEach } from 'vitest';
import { detectLocale } from '../locale';

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(),
  cookies: vi.fn(),
}));

describe('detectLocale', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return "ja" when no cookie and no Accept-Language header is present', async () => {
    const { headers, cookies } = await import('next/headers');
    vi.mocked(cookies).mockResolvedValue({
      get: vi.fn().mockReturnValue(undefined),
    } as any);
    vi.mocked(headers).mockResolvedValue({
      get: vi.fn().mockReturnValue(null),
    } as any);

    const locale = await detectLocale();
    expect(locale).toBe('ja');
  });

  it('should return "en" from cookie when cookie is set to "en"', async () => {
    const { headers, cookies } = await import('next/headers');
    vi.mocked(cookies).mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: 'en' }),
    } as any);
    vi.mocked(headers).mockResolvedValue({
      get: vi.fn().mockReturnValue('ja,en-US;q=0.9'),
    } as any);

    const locale = await detectLocale();
    expect(locale).toBe('en');
  });

  it('should return "ja" from cookie when cookie is set to "ja"', async () => {
    const { headers, cookies } = await import('next/headers');
    vi.mocked(cookies).mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: 'ja' }),
    } as any);
    vi.mocked(headers).mockResolvedValue({
      get: vi.fn().mockReturnValue('en-US,en;q=0.9'),
    } as any);

    const locale = await detectLocale();
    expect(locale).toBe('ja');
  });

  it('should return "en" for English Accept-Language when no cookie', async () => {
    const { headers, cookies } = await import('next/headers');
    vi.mocked(cookies).mockResolvedValue({
      get: vi.fn().mockReturnValue(undefined),
    } as any);
    vi.mocked(headers).mockResolvedValue({
      get: vi.fn().mockReturnValue('en-US,en;q=0.9'),
    } as any);

    const locale = await detectLocale();
    expect(locale).toBe('en');
  });

  it('should return "en" for Accept-Language starting with "en" when no cookie', async () => {
    const { headers, cookies } = await import('next/headers');
    vi.mocked(cookies).mockResolvedValue({
      get: vi.fn().mockReturnValue(undefined),
    } as any);
    vi.mocked(headers).mockResolvedValue({
      get: vi.fn().mockReturnValue('en-GB'),
    } as any);

    const locale = await detectLocale();
    expect(locale).toBe('en');
  });

  it('should return "ja" for Japanese Accept-Language when no cookie', async () => {
    const { headers, cookies } = await import('next/headers');
    vi.mocked(cookies).mockResolvedValue({
      get: vi.fn().mockReturnValue(undefined),
    } as any);
    vi.mocked(headers).mockResolvedValue({
      get: vi.fn().mockReturnValue('ja,en-US;q=0.9,en;q=0.8'),
    } as any);

    const locale = await detectLocale();
    expect(locale).toBe('ja');
  });

  it('should return "ja" for other languages when no cookie', async () => {
    const { headers, cookies } = await import('next/headers');
    vi.mocked(cookies).mockResolvedValue({
      get: vi.fn().mockReturnValue(undefined),
    } as any);
    vi.mocked(headers).mockResolvedValue({
      get: vi.fn().mockReturnValue('fr-FR,fr;q=0.9'),
    } as any);

    const locale = await detectLocale();
    expect(locale).toBe('ja');
  });

  it('should return "en" when English has highest preference and no cookie', async () => {
    const { headers, cookies } = await import('next/headers');
    vi.mocked(cookies).mockResolvedValue({
      get: vi.fn().mockReturnValue(undefined),
    } as any);
    vi.mocked(headers).mockResolvedValue({
      get: vi.fn().mockReturnValue('en-US;q=1.0,ja;q=0.8'),
    } as any);

    const locale = await detectLocale();
    expect(locale).toBe('en');
  });

  it('should return "ja" when Japanese has highest preference and no cookie', async () => {
    const { headers, cookies } = await import('next/headers');
    vi.mocked(cookies).mockResolvedValue({
      get: vi.fn().mockReturnValue(undefined),
    } as any);
    vi.mocked(headers).mockResolvedValue({
      get: vi.fn().mockReturnValue('ja;q=1.0,en-US;q=0.8'),
    } as any);

    const locale = await detectLocale();
    expect(locale).toBe('ja');
  });
});
