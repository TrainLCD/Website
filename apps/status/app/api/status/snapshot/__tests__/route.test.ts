import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';

// Mock the repository functions
vi.mock('@/server/repo/serviceRepository', () => ({
  getServices: vi.fn().mockResolvedValue([]),
  getStatusLabel: vi.fn().mockResolvedValue('operational'),
}));

vi.mock('@/server/repo/incidentRepository', () => ({
  getIncidentHistories: vi.fn().mockResolvedValue([]),
}));

describe('/api/status/snapshot CORS', () => {
  beforeEach(() => {
    // Reset environment variables before each test
    delete process.env.ALLOWED_SNAPSHOT_ORIGINS;
  });

  it('should not include CORS headers when no origin is provided', async () => {
    const request = new NextRequest('http://localhost:3000/api/status/snapshot', {
      method: 'GET',
    });

    const response = await GET(request);
    
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
    expect(response.headers.get('Access-Control-Allow-Credentials')).toBeNull();
  });

  it('should not include CORS headers when ALLOWED_SNAPSHOT_ORIGINS is not set', async () => {
    const request = new NextRequest('http://localhost:3000/api/status/snapshot', {
      method: 'GET',
      headers: {
        origin: 'https://example.com',
      },
    });

    const response = await GET(request);
    
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
    expect(response.headers.get('Access-Control-Allow-Credentials')).toBeNull();
  });

  it('should include CORS headers when origin is allowed (single origin)', async () => {
    process.env.ALLOWED_SNAPSHOT_ORIGINS = 'https://example.com';
    
    const request = new NextRequest('http://localhost:3000/api/status/snapshot', {
      method: 'GET',
      headers: {
        origin: 'https://example.com',
      },
    });

    const response = await GET(request);
    
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://example.com');
    expect(response.headers.get('Access-Control-Allow-Credentials')).toBe('true');
  });

  it('should include CORS headers when origin is allowed (multiple origins)', async () => {
    process.env.ALLOWED_SNAPSHOT_ORIGINS = 'https://example.com,https://app.example.com';
    
    const request = new NextRequest('http://localhost:3000/api/status/snapshot', {
      method: 'GET',
      headers: {
        origin: 'https://app.example.com',
      },
    });

    const response = await GET(request);
    
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://app.example.com');
    expect(response.headers.get('Access-Control-Allow-Credentials')).toBe('true');
  });

  it('should not include CORS headers when origin is not allowed', async () => {
    process.env.ALLOWED_SNAPSHOT_ORIGINS = 'https://example.com';
    
    const request = new NextRequest('http://localhost:3000/api/status/snapshot', {
      method: 'GET',
      headers: {
        origin: 'https://malicious.com',
      },
    });

    const response = await GET(request);
    
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
    expect(response.headers.get('Access-Control-Allow-Credentials')).toBeNull();
  });

  it('should allow all origins when ALLOWED_SNAPSHOT_ORIGINS is set to "*"', async () => {
    process.env.ALLOWED_SNAPSHOT_ORIGINS = '*';
    
    const request = new NextRequest('http://localhost:3000/api/status/snapshot', {
      method: 'GET',
      headers: {
        origin: 'https://any-domain.com',
      },
    });

    const response = await GET(request);
    
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(response.headers.get('Access-Control-Allow-Credentials')).toBeNull();
  });

  it('should handle comma-separated list with spaces', async () => {
    process.env.ALLOWED_SNAPSHOT_ORIGINS = 'https://example.com, https://app.example.com , https://test.example.com';
    
    const request = new NextRequest('http://localhost:3000/api/status/snapshot', {
      method: 'GET',
      headers: {
        origin: 'https://test.example.com',
      },
    });

    const response = await GET(request);
    
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://test.example.com');
    expect(response.headers.get('Access-Control-Allow-Credentials')).toBe('true');
  });

  it('should return proper JSON response structure', async () => {
    const request = new NextRequest('http://localhost:3000/api/status/snapshot', {
      method: 'GET',
    });

    const response = await GET(request);
    const data = await response.json();
    
    expect(data).toHaveProperty('statusLabel');
    expect(data).toHaveProperty('services');
    expect(data).toHaveProperty('incidents');
  });
});
