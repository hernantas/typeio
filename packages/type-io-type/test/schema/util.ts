import { expect } from 'chai'
import { AnySchema } from '../../src'
import { createSuite } from '../util/createSuite'
import { TestSuite } from '../util/TestSuite'
import { testValues } from '../util/testValues'

export function createTest<T> (
  label: string,
  schema: AnySchema,
  values: T[]
): TestSuite {
  return createSuite(
    label,
    values,
    value => expect(schema.is(value)).to.be.equal(true),
    value => expect(schema.is(value)).to.be.equal(false)
  )
}

export function testArray (schema: AnySchema, label = 'Type check array'): TestSuite {
  return createTest(
    label,
    schema,
    testValues.array.string
  )
}

export function testBoolean (schema: AnySchema, label = 'Type check boolean'): TestSuite {
  return createTest(
    label,
    schema,
    testValues.boolean
  )
}

export function testLiteralString (schema: AnySchema, label = 'Type check literal (string)'): TestSuite {
  return createTest(
    label,
    schema,
    testValues.literal.string
  )
}
export function testLiteralNumber (schema: AnySchema, label = 'Type check literal (number)'): TestSuite {
  return createTest(
    label,
    schema,
    testValues.literal.number
  )
}
export function testLiteralBoolean (schema: AnySchema, label = 'Type check literal (boolean)'): TestSuite {
  return createTest(
    label,
    schema,
    testValues.literal.boolean
  )
}

export function testNull (schema: AnySchema, label = 'Type check null'): TestSuite {
  return createTest(
    label,
    schema,
    testValues.null
  )
}

export function testNumber (schema: AnySchema, label = 'Type check number'): TestSuite {
  return createTest(
    label,
    schema,
    testValues.number
  )
}

export function testObject (schema: AnySchema, label = 'Type check object'): TestSuite {
  return createTest(
    label,
    schema,
    testValues.object.simple
  )
}

export function testDeepObject (schema: AnySchema, label = 'Type check deep object'): TestSuite {
  return createTest(
    label,
    schema,
    testValues.object.nested
  )
}

export function testString (schema: AnySchema, label = 'Type check string'): TestSuite {
  return createTest(
    label,
    schema,
    testValues.string
  )
}

export function testTuple (schema: AnySchema, label = 'Type check tuple'): TestSuite {
  return createTest(
    label,
    schema,
    testValues.tuple
  )
}

export function testUndefined (schema: AnySchema, label = 'Type check undefined'): TestSuite {
  return createTest(
    label,
    schema,
    testValues.undefined
  )
}
