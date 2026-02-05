import { z } from 'zod';

/**
 * 环境变量配置 Schema
 * 定义所有必需和可选的环境变量及其验证规则
 */
const envSchema = z.object({
  // 应用配置
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .regex(/^\d+$/)
    .default('3000')
    .transform((val) => parseInt(val, 10)),

  // CORS 配置
  CORS_ORIGIN: z.string().default('http://localhost:5173'),

  // 日志配置
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

export type EnvConfig = z.infer<typeof envSchema>;

/**
 * 验证环境变量
 * @throws {Error} 如果环境变量验证失败
 * @returns {EnvConfig} 验证后的环境配置
 */
export function validateEnv(): EnvConfig {
  try {
    const parsed = envSchema.parse(process.env);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map(
        (err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`,
      );
      throw new Error(`环境变量验证失败:\n${errorMessages.join('\n')}`);
    }
    throw error;
  }
}

/**
 * 获取已验证的环境配置
 * 在应用启动时调用 validateEnv() 后，可以使用此函数获取配置
 */
let cachedConfig: EnvConfig | null = null;

export function getEnvConfig(): EnvConfig {
  if (!cachedConfig) {
    cachedConfig = validateEnv();
  }
  return cachedConfig;
}
