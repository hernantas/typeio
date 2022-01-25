import { cases } from './cases'
import { createCase } from './createCase'
import { TransformFn } from './TransformFn'
import { TestSuiteMap } from './TestSuiteMap'

export function createSuite (prefix: string, fn: TransformFn): TestSuiteMap<typeof cases> {
  return createCase(fn, cases, [prefix])
}
