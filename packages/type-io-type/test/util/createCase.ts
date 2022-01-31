import { TestSuite } from './TestSuite'
import { TransformFn } from './TransformFn'
import { TestSuiteMap } from './TestSuiteMap'
import { DynamicObjectType } from '../../src/alias/DynamicObjectType'

export function createCase<T>(
  fn: TransformFn,
  value: T,
  path: string[]
): TestSuiteMap<T> {
  if (Array.isArray(value)) {
    return new TestSuite(path.join(' '), fn, value) as TestSuiteMap<T>
  }

  return Object.keys(value).reduce(
    (prev, key) => ({
      ...prev,
      [key]: createCase(fn, (value as DynamicObjectType)[key], [...path, key]),
    }),
    {} as DynamicObjectType
  ) as TestSuiteMap<T>
}
