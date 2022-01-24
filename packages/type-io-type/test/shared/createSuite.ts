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

export function createSuite<T> (
  label: string,
  values: T[],
  validFn: (value: T) => void,
  invalidFn: (value: T) => void
): TestSuite {
  return {
    valid: () => it(label, () => values.forEach(value => validFn(value))),
    invalid: () => it(label, () => values.forEach(value => invalidFn(value)))
  }
}
