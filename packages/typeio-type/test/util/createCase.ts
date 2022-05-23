import { TestSuite } from './TestSuite'
import { TestSuiteMap } from './TestSuiteMap'
import { TransformFn } from './TransformFn'

export function createCase<T>(
  fn: TransformFn,
  value: T,
  path: string[] = []
): TestSuiteMap<T> {
  if (Array.isArray(value)) {
    return new TestSuite(path.join(' '), fn, value) as TestSuiteMap<T>
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, value]) => [
      key,
      createCase(fn, value, [...path, key]),
    ])
  ) as TestSuiteMap<T>
}
