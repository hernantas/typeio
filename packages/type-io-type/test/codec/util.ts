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

export const labelCodec = {
  array: 'From array',
  tuple: 'From tuple',
  literal: {
    string: 'From literal (string)',
    number: 'From literal (number)',
    boolean: 'From literal (boolean)'
  },
  object: {
    simple: 'From object (simple)',
    nested: 'From object (nested)'
  },
  boolean: 'From boolean',
  number: 'From number',
  string: 'From string',
  null: 'From null',
  undefined: 'From undefined'
}
