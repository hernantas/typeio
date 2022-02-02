import { ObjectType } from '../../src/alias/ObjectType'
import { TestSuite } from './TestSuite'
import { TestSuiteMap } from './TestSuiteMap'
import { TransformFn } from './TransformFn'

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
      [key]: createCase(fn, (value as ObjectType)[key], [...path, key]),
    }),
    {} as ObjectType
  ) as TestSuiteMap<T>
}
