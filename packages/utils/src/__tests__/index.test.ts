import { describe, it, expect, vi } from 'vitest';
import {
  formatGreeting,
  delay,
  generateRandomString,
  deepFreeze,
  safeJsonParse,
  retry,
} from '../index';

describe('formatGreeting', () => {
  it('should format greeting message correctly', () => {
    expect(formatGreeting('Test')).toContain('Test');
    expect(formatGreeting('Test')).toContain('Welcome');
  });

  it('should handle empty string', () => {
    expect(formatGreeting('')).toContain('Welcome');
  });
});

describe('delay', () => {
  it('should resolve after specified time', async () => {
    const start = Date.now();
    await delay(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(45);
  });
});

describe('generateRandomString', () => {
  it('should generate string with default length', () => {
    const result = generateRandomString();
    expect(result).toHaveLength(8);
  });

  it('should generate string with specified length', () => {
    const result = generateRandomString(16);
    expect(result).toHaveLength(16);
  });

  it('should generate different strings on each call', () => {
    const str1 = generateRandomString(32);
    const str2 = generateRandomString(32);
    expect(str1).not.toBe(str2);
  });

  it('should only contain alphanumeric characters', () => {
    const result = generateRandomString(100);
    expect(result).toMatch(/^[A-Za-z0-9]+$/);
  });
});

describe('deepFreeze', () => {
  it('should freeze shallow object', () => {
    const obj = { a: 1, b: 2 };
    const frozen = deepFreeze(obj);
    expect(Object.isFrozen(frozen)).toBe(true);
  });

  it('should freeze nested objects', () => {
    const obj = { a: { b: { c: 1 } } };
    const frozen = deepFreeze(obj);
    expect(Object.isFrozen(frozen)).toBe(true);
    expect(Object.isFrozen(frozen.a)).toBe(true);
    expect(Object.isFrozen(frozen.a.b)).toBe(true);
  });

  it('should prevent modifications', () => {
    const obj = deepFreeze({ a: 1 });
    expect(() => {
      (obj as any).a = 2;
    }).toThrow();
  });
});

describe('safeJsonParse', () => {
  it('should parse valid JSON', () => {
    const result = safeJsonParse('{"a":1}', {});
    expect(result).toEqual({ a: 1 });
  });

  it('should return default value for invalid JSON', () => {
    const defaultValue = { default: true };
    const result = safeJsonParse('invalid json', defaultValue);
    expect(result).toEqual(defaultValue);
  });

  it('should parse arrays', () => {
    const result = safeJsonParse('[1,2,3]', []);
    expect(result).toEqual([1, 2, 3]);
  });
});

describe('retry', () => {
  it('should return result on first success', async () => {
    const fn = vi.fn().mockResolvedValue('success');
    const result = await retry(fn, 3, 10);
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry on failure and eventually succeed', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success');

    const result = await retry(fn, 3, 10);
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should throw after max retries', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('always fail'));

    await expect(retry(fn, 2, 10)).rejects.toThrow('always fail');
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
