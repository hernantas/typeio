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

export function testArray (schema: AnySchema): TestOption {
  const label = 'Parse array'
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

export function testString (schema: AnySchema): TestOption {
  const label = 'Parse string'
  const values = ['', 'String', '0', 'true', 'false', 'null', 'undefined']
  return {
    valid: () => it(label, () => createTest(schema, values)),
    invalid: () => it(label, () => createTest(schema, values, 'THROW'))
  }
}

export function testNumber (schema: AnySchema): TestOption {
  const label = 'Parse number'
  const values = [0, 80, 8080]
  return {
    valid: () => it(label, () => createTest(schema, values)),
    invalid: () => it(label, () => createTest(schema, values, 'THROW'))
  }
}

export function testBoolean (schema: AnySchema): TestOption {
  const label = 'Parse boolean'
  const values = [true, false]
  return {
    valid: () => it(label, () => createTest(schema, values)),
    invalid: () => it(label, () => createTest(schema, values, 'THROW'))
  }
}

export function testNull (schema: AnySchema): TestOption {
  const label = 'Parse null'
  return {
    valid: () => it(label, () => createTest(schema, [null])),
    invalid: () => it(label, () => createTest(schema, [null], 'THROW'))
  }
}

export function testUndefined (schema: AnySchema): TestOption {
  const label = 'Parse undefined'
  return {
    valid: () => it(label, () => createTest(schema, [undefined])),
    invalid: () => it(label, () => createTest(schema, [undefined], 'THROW'))
  }
}
