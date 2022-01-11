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
  fn: (test: Chai.Assertion, value: T, values: T[]) => void = (e, v) => e.to.be.equal(v),
  fnInvalid: (value: T) => void = v => expect(() => schema.parse(v)).to.throw()
): TestOption {
  return {
    valid: () => it(label, () => values.forEach(value => fn(expect(schema.parse(value)), value, values))),
    invalid: () => it(label, () => values.forEach(value => fnInvalid(value)))
  }
}

export function testArray (schema: AnySchema, label = 'Parse array'): TestOption {
  return createTest(
    schema,
    label,
    [
      [],
      ['First', 'Second', 'Third'],
      ['true', 'true', 'false'],
      ['0', '80', '8080']
    ],
    (e, v) => e.to.be.deep.equal(v)
  )
}

export function testBoolean (schema: AnySchema, label = 'Parse boolean'): TestOption {
  return createTest(
    schema,
    label,
    [true, false]
  )
}

export function testLiteralString (schema: AnySchema, label = 'Parse literal (string)'): TestOption {
  return createTest(
    schema,
    label,
    ['literal']
  )
}
export function testLiteralNumber (schema: AnySchema, label = 'Parse literal (number)'): TestOption {
  return createTest(
    schema,
    label,
    [0]
  )
}
export function testLiteralBoolean (schema: AnySchema, label = 'Parse literal (boolean)'): TestOption {
  return createTest(
    schema,
    label,
    [true]
  )
}

export function testNull (schema: AnySchema, label = 'Parse null'): TestOption {
  return createTest(
    schema,
    label,
    [null]
  )
}

export function testNumber (schema: AnySchema, label = 'Parse number'): TestOption {
  return createTest(
    schema,
    label,
    [0, 80, 8080]
  )
}

export function testObject (schema: AnySchema, label = 'Parse object'): TestOption {
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
    ],
    (e, v) => {
      e.to.have.property('_string', v._string)
      e.to.have.property('_number', v._number)
      e.to.have.property('_boolean', v._boolean)
    }
  )
}

export function testDeepObject (schema: AnySchema, label = 'Parse deep object'): TestOption {
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
    }],
    (e, v) => {
      e.to.have.property('_string', v._string)
      e.to.have.property('_number', v._number)
      e.to.have.property('_boolean', v._boolean)
      e.to.have.nested.property('_nested._string', v._nested._string)
      e.to.have.nested.property('_nested._number', v._nested._number)
      e.to.have.nested.property('_nested._boolean', v._nested._boolean)
    }
  )
}

export function testString (schema: AnySchema, label = 'Parse string'): TestOption {
  return createTest(
    schema,
    label,
    ['', 'String', '0', 'true', 'false', 'null', 'undefined']
  )
}

export function testTuple (schema: AnySchema, label = 'Parse tuple'): TestOption {
  return createTest(
    schema,
    label,
    [
      ['First', 'Second', 0, 80, true, false],
      ['First', 'Second', 0, 80, true, false, 'THIS IS EXCESS VALUE']
    ],
    (e, _v, vs) => e.to.be.deep.equal(vs[0])
  )
}

export function testUndefined (schema: AnySchema, label = 'Parse undefined'): TestOption {
  return createTest(
    schema,
    label,
    [undefined]
  )
}
