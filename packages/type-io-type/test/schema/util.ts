import { expect } from 'chai'
import { AnySchema } from '../../src'
import { createSuite } from '../util/createSuite'
import { TestSuite } from '../util/TestSuite'

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
    [
      [],
      ['First', 'Second', 'Third'],
      ['true', 'true', 'false'],
      ['0', '80', '8080']
    ]
  )
}

export function testBoolean (schema: AnySchema, label = 'Type check boolean'): TestSuite {
  return createTest(
    label,
    schema,
    [true, false]
  )
}

export function testLiteralString (schema: AnySchema, label = 'Type check literal (string)'): TestSuite {
  return createTest(
    label,
    schema,
    ['literal']
  )
}
export function testLiteralNumber (schema: AnySchema, label = 'Type check literal (number)'): TestSuite {
  return createTest(
    label,
    schema,
    [0]
  )
}
export function testLiteralBoolean (schema: AnySchema, label = 'Type check literal (boolean)'): TestSuite {
  return createTest(
    label,
    schema,
    [true]
  )
}

export function testNull (schema: AnySchema, label = 'Type check null'): TestSuite {
  return createTest(
    label,
    schema,
    [null]
  )
}

export function testNumber (schema: AnySchema, label = 'Type check number'): TestSuite {
  return createTest(
    label,
    schema,
    [0, 80, 8080]
  )
}

export function testObject (schema: AnySchema, label = 'Type check object'): TestSuite {
  return createTest(
    label,
    schema,
    [
      {
        _string: '',
        _number: 0,
        _boolean: false
      },
      {
        _string: '',
        _number: 0,
        _boolean: false,
        _excess: 'THIS IS EXCESS PROPERTY'
      }
    ]
  )
}

export function testDeepObject (schema: AnySchema, label = 'Type check deep object'): TestSuite {
  return createTest(
    label,
    schema,
    [{
      _string: '',
      _number: 0,
      _boolean: false,
      _nested: {
        _string: '',
        _number: 0,
        _boolean: false
      }
    }]
  )
}

export function testString (schema: AnySchema, label = 'Type check string'): TestSuite {
  return createTest(
    label,
    schema,
    ['', 'String', '0', 'true', 'false', 'null', 'undefined']
  )
}

export function testTuple (schema: AnySchema, label = 'Type check tuple'): TestSuite {
  return createTest(
    label,
    schema,
    [
      ['First', 'Second', 0, 80, true, false],
      ['First', 'Second', 0, 80, true, false, 'THIS IS EXCESS VALUE']
    ]
  )
}

export function testUndefined (schema: AnySchema, label = 'Type check undefined'): TestSuite {
  return createTest(
    label,
    schema,
    [undefined]
  )
}
