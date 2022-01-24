import { TestSuite } from './TestSuite'

/**
 * Create test suite to test against some array of `<T>` values
 *
 * @param label Label for this test
 * @param values Values to be tested
 * @param validFn Valid test function
 * @param invalidFn Invalid test function
 * @returns A new instance of {@link TextExpect}
 */
export function createSuite<T, U> (
  label: string,
  values: T[] | Map<T, U>,
  validFn: (value: T, expectedValue?: U) => void,
  invalidFn: (value: T, expectedValue?: U) => void
): TestSuite {
  return Array.isArray(values)
    ? {
        valid: () => it(label, () => values.forEach(v => validFn(v))),
        invalid: () => it(label, () => values.forEach(v => invalidFn(v)))
      }
    : {
        valid: () => it(label, () => values.forEach((e, v) => validFn(v, e))),
        invalid: () => it(label, () => values.forEach((e, v) => invalidFn(v, e)))
      }
}
