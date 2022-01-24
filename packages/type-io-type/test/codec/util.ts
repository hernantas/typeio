import { expect } from 'chai'
import { AnyCodec } from '../../src'
import { createSuite } from '../util/createSuite'
import { TestSuite } from '../util/TestSuite'

export function createDecodeTest<T, U = T> (
  label: string,
  codec: AnyCodec,
  values: T[],
  expectedValues?: U[]
): TestSuite {
  const maps = new Map<T, U | undefined>()

  if (expectedValues !== undefined) {
    for (let i = 0; i < values.length; i++) {
      maps.set(values[i] as T, expectedValues[i])
    }
  } else {
    for (let i = 0; i < values.length; i++) {
      maps.set(values[i] as T, values[i] as unknown as U)
    }
  }

  return createSuite(
    label,
    maps,
    (v, e) => expect(codec.decode(v)).to.be.equal(e),
    (v) => expect(() => codec.decode(v)).to.throw()
  )
}
