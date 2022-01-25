import { TestSuite } from './TestSuite'
import { TransformFn } from './TransformFn'
import { TestSuiteMap } from './TestSuiteMap'

export function createCase<T> (fn: TransformFn, value: T, path: string[]): TestSuiteMap<T> {
  if (Array.isArray(value)) {
    return new TestSuite(path.join(' '), fn, value) as TestSuiteMap<T>
  }

  const result: any = {}
  const keys = Object.keys(value)
  for (const key of keys) {
    result[key] = createCase(fn, (value as any)[key], [...path, key])
  }
  return result
}
