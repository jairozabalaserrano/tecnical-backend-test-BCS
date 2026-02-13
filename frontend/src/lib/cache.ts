interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

const CACHE_PREFIX = 'app_cache_';

class CacheManager {
  private defaultTTL: number = 5 * 60 * 1000;

  private isClient(): boolean {
    return typeof window !== 'undefined';
  }

  get<T>(key: string): T | null {
    if (!this.isClient()) return null;

    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;

    try {
      const entry: CacheEntry<T> = JSON.parse(raw);
      
      if (Date.now() > entry.expiresAt) {
        localStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }

      return entry.data;
    } catch {
      return null;
    }
  }

  set<T>(key: string, data: T, ttl?: number): void {
    if (!this.isClient()) return;

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + (ttl || this.defaultTTL),
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  }

  delete(key: string): void {
    if (!this.isClient()) return;
    localStorage.removeItem(CACHE_PREFIX + key);
  }

  clear(): void {
    if (!this.isClient()) return;
    
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }
}

export const cache = new CacheManager();

export const CACHE_KEYS = {
  PRODUCTS: 'products',
} as const;
