import { describe, test } from 'vitest';
import * as fc from 'fast-check';

// Feature: enterprise-monorepo-optimization
// 属性测试示例：演示如何使用 fast-check 进行属性测试

describe('Property-Based Testing Examples', () => {
  test('Property: Array reverse is involutive', () => {
    // 对于任何数组，反转两次应该得到原数组
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const reversed = arr.slice().reverse();
        const doubleReversed = reversed.slice().reverse();
        return JSON.stringify(arr) === JSON.stringify(doubleReversed);
      }),
      { numRuns: 100 },
    );
  });

  test('Property: String concatenation is associative', () => {
    // 对于任何三个字符串，(a + b) + c === a + (b + c)
    fc.assert(
      fc.property(fc.string(), fc.string(), fc.string(), (a, b, c) => {
        return a + b + c === a + (b + c);
      }),
      { numRuns: 100 },
    );
  });

  test('Property: Addition is commutative', () => {
    // 对于任何两个数字，a + b === b + a
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        return a + b === b + a;
      }),
      { numRuns: 100 },
    );
  });

  test('Property: Map preserves array length', () => {
    // 对于任何数组和映射函数，map 不改变数组长度
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const mapped = arr.map((x) => x * 2);
        return arr.length === mapped.length;
      }),
      { numRuns: 100 },
    );
  });
});
