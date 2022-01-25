import { expect } from 'chai'
import { AnySchema } from '../../src'
import { createSuite } from '../util/createSuite'
import { TestSuite } from '../util/TestSuite'
import { cases } from '../util/cases'

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
    cases.array.string
  )
}

export function testBoolean (schema: AnySchema, label = 'Type check boolean'): TestSuite {
  return createTest(
    label,
    schema,
    cases.boolean
  )
}

export function testLiteralString (schema: AnySchema, label = 'Type check literal (string)'): TestSuite {
  return createTest(
    label,
    schema,
    cases.literal.string
  )
}
export function testLiteralNumber (schema: AnySchema, label = 'Type check literal (number)'): TestSuite {
  return createTest(
    label,
    schema,
    cases.literal.number
  )
}
export function testLiteralBoolean (schema: AnySchema, label = 'Type check literal (boolean)'): TestSuite {
  return createTest(
    label,
    schema,
    cases.literal.boolean
  )
}

export function testNull (schema: AnySchema, label = 'Type check null'): TestSuite {
  return createTest(
    label,
    schema,
    cases.null
  )
}

export function testNumber (schema: AnySchema, label = 'Type check number'): TestSuite {
  return createTest(
    label,
    schema,
    cases.number
  )
}

export function testObject (schema: AnySchema, label = 'Type check object'): TestSuite {
  return createTest(
    label,
    schema,
    cases.object.simple
  )
}

export function testDeepObject (schema: AnySchema, label = 'Type check deep object'): TestSuite {
  return createTest(
    label,
    schema,
    cases.object.nested
  )
}

export function testString (schema: AnySchema, label = 'Type check string'): TestSuite {
  return createTest(
    label,
    schema,
    cases.string
  )
}

export function testTuple (schema: AnySchema, label = 'Type check tuple'): TestSuite {
  return createTest(
    label,
    schema,
    cases.tuple
  )
}

export function testUndefined (schema: AnySchema, label = 'Type check undefined'): TestSuite {
  return createTest(
    label,
    schema,
    cases.undefined
  )
}
