import Redis from 'ioredis';

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

// Create Redis client without automatic connection
export const redis =
  globalForRedis.redis ??
  new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: 3,
    retryStrategy(times: number) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    lazyConnect: true,
    // Disable auto-reconnect during build to prevent hanging
    enableOfflineQueue: false,
  });

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

// Connect only when REDIS_URL is provided (runtime)
if (process.env.REDIS_URL) {
  redis.connect().catch((err: Error) => {
    console.warn('Redis connection failed, will fallback to database only:', err.message);
  });
}

