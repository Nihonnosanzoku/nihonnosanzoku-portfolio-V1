import { NextResponse } from "next/server";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

export class RateLimiter {
  private static store: RateLimitStore = {};

  /**
   * Simple Memory-based Rate Limiter
   * @param key Unique key for identification (e.g., IP)
   * @param limit Max requests allowed
   * @param windowMs Time window in milliseconds
   */
  public static check(key: string, limit: number = 10, windowMs: number = 60000): { success: boolean; remaining: number } {
    const now = Date.now();
    const record = this.store[key];

    if (!record || now > record.resetTime) {
      this.store[key] = {
        count: 1,
        resetTime: now + windowMs,
      };
      return { success: true, remaining: limit - 1 };
    }

    if (record.count >= limit) {
      return { success: false, remaining: 0 };
    }

    record.count++;
    return { success: true, remaining: limit - record.count };
  }
}

export class BruteForceProtection {
  private static attempts: { [key: string]: { count: number; lastAttempt: number } } = {};

  /**
   * Checks for brute force attempts
   * @param key Unique key (e.g., user email or IP)
   * @param maxAttempts Max allowed failed attempts
   * @param blockDurationMs How long to block after max attempts reached
   */
  public static isBlocked(key: string, maxAttempts: number = 5, blockDurationMs: number = 900000): boolean {
    const record = this.attempts[key];
    if (!record) return false;

    const now = Date.now();
    if (record.count >= maxAttempts) {
      if (now - record.lastAttempt < blockDurationMs) {
        return true;
      } else {
        // Reset after block duration
        delete this.attempts[key];
        return false;
      }
    }
    return false;
  }

  public static recordFailure(key: string) {
    const record = this.attempts[key] || { count: 0, lastAttempt: 0 };
    record.count++;
    record.lastAttempt = Date.now();
    this.attempts[key] = record;
  }

  public static resetAttempts(key: string) {
    delete this.attempts[key];
  }
}

export class SecurityHeaders {
  /**
   * Applies common security headers to a response
   */
  public static apply(res: NextResponse): NextResponse {
    res.headers.set('X-Frame-Options', 'DENY');
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.lanyard.rest;");
    return res;
  }
}
