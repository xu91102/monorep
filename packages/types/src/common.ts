/**
 * 通用类型定义
 */

/**
 * 可为空类型
 */
export type Nullable<T> = T | null;

/**
 * 可选类型
 */
export type Optional<T> = T | undefined;

/**
 * 深度只读类型
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * 深度可选类型
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 提取对象的值类型
 */
export type ValueOf<T> = T[keyof T];

/**
 * 异步函数类型
 */
export type AsyncFunction<T = void> = () => Promise<T>;

/**
 * 结果类型 (类似 Rust 的 Result)
 */
export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

/**
 * 环境类型
 */
export type Environment = 'development' | 'staging' | 'production';

/**
 * 基础实体接口
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 用户实体
 */
export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
}
