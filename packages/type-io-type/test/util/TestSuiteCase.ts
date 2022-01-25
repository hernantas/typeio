import { expect } from 'chai'
import { TransformFn } from './TransformFn'

export class TestSuiteCase<T> {
  constructor (
    readonly transformer: TransformFn<T, any>,
    readonly value: T
  ) { }

  expect (): Chai.Assertion {
    return expect(this.transformer(this.value))
  }

  expectSafe (): Chai.Assertion {
    return expect(() => this.transformer(this.value))
  }

  is (value: unknown): Chai.Assertion {
    return this.expect().to.be.equal(value)
  }

  isTrue (): Chai.Assertion {
    return this.is(true)
  }

  isFalse (): Chai.Assertion {
    return this.is(false)
  }

  isDeep (value: unknown = this.value): Chai.Assertion {
    return this.expect().to.be.equal(value)
  }

  isThrow (): Chai.Assertion {
    return this.expectSafe().to.throw()
  }

  isEqual (): Chai.Assertion {
    return this.expect().to.be.equal(this.value)
  }
}
