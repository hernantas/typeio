import { expect } from 'chai'
import { AnySchema } from '../../src'

interface TestOption {
  valid: () => void
  invalid: () => void
}

type TestMode =
  | 'EQUAL'
  | 'THROW'
  | 'DEEP_EQUAL'

function createTest (
  schema: AnySchema,
  values: unknown[],
  mode: TestMode = 'EQUAL'
): void {
  for (const value of values) {
    switch (mode) {
      case 'EQUAL': expect(schema.parse(value)).to.be.equal(value); break
      case 'DEEP_EQUAL': expect(schema.parse(value)).to.be.deep.equal(value); break
      case 'THROW': expect(() => schema.parse(value)).to.throw(); break
    }
  }
}

export function testArray (schema: AnySchema, label = 'Parse array'): TestOption {
  const values = [
    [],
    ['First', 'Second', 'Third'],
    ['true', 'true', 'false'],
    ['0', '80', '8080']
  ]
  return {
    valid: () => it(label, () => createTest(schema, values, 'DEEP_EQUAL')),
    invalid: () => it(label, () => createTest(schema, values, 'THROW'))
  }
}

export function testBoolean (schema: AnySchema, label = 'Parse boolean'): TestOption {
  const values = [true, false]
  return {
    valid: () => it(label, () => createTest(schema, values)),
    invalid: () => it(label, () => createTest(schema, values, 'THROW'))
  }
}

export function testLiteralString (schema: AnySchema, label = 'Parse literal (string)'): TestOption {
  const values = ['literal']
  return {
    valid: () => it(label, () => createTest(schema, values)),
    invalid: () => it(label, () => createTest(schema, values, 'THROW'))
  }
}
export function testLiteralNumber (schema: AnySchema, label = 'Parse literal (number)'): TestOption {
  const values = [0]
  return {
    valid: () => it(label, () => createTest(schema, values)),
    invalid: () => it(label, () => createTest(schema, values, 'THROW'))
  }
}
export function testLiteralBoolean (schema: AnySchema, label = 'Parse literal (boolean)'): TestOption {
  const values = [true]
  return {
    valid: () => it(label, () => createTest(schema, values)),
    invalid: () => it(label, () => createTest(schema, values, 'THROW'))
  }
}

export function testNull (schema: AnySchema, label = 'Parse null'): TestOption {
  return {
    valid: () => it(label, () => createTest(schema, [null])),
    invalid: () => it(label, () => createTest(schema, [null], 'THROW'))
  }
}

export function testNumber (schema: AnySchema, label = 'Parse number'): TestOption {
  const values = [0, 80, 8080]
  return {
    valid: () => it(label, () => createTest(schema, values)),
    invalid: () => it(label, () => createTest(schema, values, 'THROW'))
  }
}

export function testString (schema: AnySchema, label = 'Parse string'): TestOption {
  const values = ['', 'String', '0', 'true', 'false', 'null', 'undefined']
  return {
    valid: () => it(label, () => createTest(schema, values)),
    invalid: () => it(label, () => createTest(schema, values, 'THROW'))
  }
}

export function testUndefined (schema: AnySchema, label = 'Parse undefined'): TestOption {
  return {
    valid: () => it(label, () => createTest(schema, [undefined])),
    invalid: () => it(label, () => createTest(schema, [undefined], 'THROW'))
  }
}
