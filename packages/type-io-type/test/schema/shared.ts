import { expect } from 'chai'
import { AnySchema } from '../../src'

interface TestOption {
  valid: () => void
  invalid: () => void
}

export function createTest<T> (
  schema: AnySchema,
  label: string,
  values: T[],
  fn: (value: T) => void = v => expect(schema.is(v)).to.be.equal(true),
  fnInvalid: (value: T) => void = v => expect(schema.is(v)).to.be.equal(false)
): TestOption {
  return {
    valid: () => it(label, () => values.forEach(value => fn(value))),
    invalid: () => it(label, () => values.forEach(value => fnInvalid(value)))
  }
}

export function testArray (schema: AnySchema, label = 'Type check array'): TestOption {
  return createTest(
    schema,
    label,
    [
      [],
      ['First', 'Second', 'Third'],
      ['true', 'true', 'false'],
      ['0', '80', '8080']
    ]
  )
}

export function testBoolean (schema: AnySchema, label = 'Type check boolean'): TestOption {
  return createTest(
    schema,
    label,
    [true, false]
  )
}

export function testLiteralString (schema: AnySchema, label = 'Type check literal (string)'): TestOption {
  return createTest(
    schema,
    label,
    ['literal']
  )
}
export function testLiteralNumber (schema: AnySchema, label = 'Type check literal (number)'): TestOption {
  return createTest(
    schema,
    label,
    [0]
  )
}
export function testLiteralBoolean (schema: AnySchema, label = 'Type check literal (boolean)'): TestOption {
  return createTest(
    schema,
    label,
    [true]
  )
}

export function testNull (schema: AnySchema, label = 'Type check null'): TestOption {
  return createTest(
    schema,
    label,
    [null]
  )
}

export function testNumber (schema: AnySchema, label = 'Type check number'): TestOption {
  return createTest(
    schema,
    label,
    [0, 80, 8080]
  )
}

export function testObject (schema: AnySchema, label = 'Type check object'): TestOption {
  return createTest(
    schema,
    label,
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

export function testDeepObject (schema: AnySchema, label = 'Type check deep object'): TestOption {
  return createTest(
    schema,
    label,
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

export function testString (schema: AnySchema, label = 'Type check string'): TestOption {
  return createTest(
    schema,
    label,
    ['', 'String', '0', 'true', 'false', 'null', 'undefined']
  )
}

export function testTuple (schema: AnySchema, label = 'Type check tuple'): TestOption {
  return createTest(
    schema,
    label,
    [
      ['First', 'Second', 0, 80, true, false],
      ['First', 'Second', 0, 80, true, false, 'THIS IS EXCESS VALUE']
    ]
  )
}

export function testUndefined (schema: AnySchema, label = 'Type check undefined'): TestOption {
  return createTest(
    schema,
    label,
    [undefined]
  )
}
