/**
 * 格式化欢迎消息
 * @param name 名称
 * @returns 格式化的欢迎消息
 */
export function formatGreeting(name: string): string {
  return `👋 Welcome to ${name}!`;
}

/**
 * 延迟执行函数
 * @param ms 延迟毫秒数
 * @returns Promise
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 生成随机字符串
 * @param length 字符串长度
 * @returns 随机字符串
 */
export function generateRandomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 深度冻结对象（防止修改）
 * @param obj 要冻结的对象
 * @returns 冻结后的对象
 */
export function deepFreeze<T>(obj: T): T {
  Object.getOwnPropertyNames(obj).forEach((name) => {
    const value = (obj as Record<string, unknown>)[name];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
}

/**
 * 安全的 JSON 解析
 * @param jsonString JSON 字符串
 * @param defaultValue 默认值
 * @returns 解析后的对象或默认值
 */
export function safeJsonParse<T>(jsonString: string, defaultValue: T): T {
  try {
    return JSON.parse(jsonString);
  } catch {
    return defaultValue;
  }
}

/**
 * 重试函数
 * @param fn 要重试的函数
 * @param maxRetries 最大重试次数
 * @param delayMs 重试间隔
 * @returns 函数结果
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000,
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries) {
        await delay(delayMs);
      }
    }
  }

  throw lastError!;
}
