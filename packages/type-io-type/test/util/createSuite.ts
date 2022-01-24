import { TestSuite } from './TestSuite'

/**
 * Create test suite to test against some array of `<T>` values
 *
 * @param label Label for this test
 * @param values Values to be tested
 * @param expectedValues Expected values from tested value
 * @param validFn Valid test function
 * @param invalidFn Invalid test function
 * @returns A new instance of {@link TextExpect}
 */
export function createSuite<T, U> (
  label: string,
  values: T[],
  expectedValues: U[],
  validFn: (value: T, expectedValue?: U) => void,
  invalidFn: (value: T, expectedValue?: U) => void
): TestSuite {
  return {
    valid: () => it(label, () => {
      for (let i = 0; i < values.length; i++) {
        validFn(values[i] as T, expectedValues[i])
      }
    }),
    invalid: () => it(label, () => {
      for (let i = 0; i < values.length; i++) {
        invalidFn(values[i] as T, expectedValues[i])
      }
    })
  }
}
