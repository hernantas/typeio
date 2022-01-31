import { TestSuiteCase } from './TestSuiteCase'
import { TransformFn } from './TransformFn'

export class TestSuite<T> {
  readonly cases: Array<TestSuiteCase<T>>

  constructor(
    readonly label: string,
    transformer: TransformFn<T, any>,
    values: T[]
  ) {
    this.cases = values.map((v) => new TestSuiteCase(transformer, v))
  }

  each(fn: (testCase: TestSuiteCase<T>) => void): void {
    it(this.label, () => this.cases.forEach((c) => fn(c)))
  }

  is(value: unknown): void {
    this.each((c) => c.is(value))
  }

  isTrue(): void {
    this.each((c) => c.isTrue())
  }

  isFalse(): void {
    this.each((c) => c.isFalse())
  }

  isEqual(): void {
    this.each((c) => c.isEqual())
  }

  isDeepEqual(): void {
    this.each((c) => c.isDeepEqual())
  }

  isThrow(): void {
    this.each((c) => c.isThrow())
  }
}
