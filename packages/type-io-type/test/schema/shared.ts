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

export function testObject (schema: AnySchema, label = 'Parse object'): TestOption {
  const values = [
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
  return {
    valid: () => it(label, () => {
      for (const value of values) {
        const parsed = schema.parse(value)
        expect(parsed).to.have.property('_string', value._string)
        expect(parsed).to.have.property('_number', value._number)
        expect(parsed).to.have.property('_boolean', value._boolean)
        expect(parsed).to.not.have.property('_excess')
      }
    }),
    invalid: () => it(label, () => createTest(schema, values, 'THROW'))
  }
}

export function testDeepObject (schema: AnySchema, label = 'Parse deep object'): TestOption {
  const value = {
    _string: '',
    _number: 0,
    _boolean: false,
    _nested: {
      _string: '',
      _number: 0,
      _boolean: false
    }
  }
  return {
    valid: () => it(label, () => {
      const parsed = schema.parse(value)
      expect(parsed).to.have.property('_string', value._string)
      expect(parsed).to.have.property('_number', value._number)
      expect(parsed).to.have.property('_boolean', value._boolean)
      expect(parsed).to.have.nested.property('_nested._string', value._nested._string)
      expect(parsed).to.have.nested.property('_nested._number', value._nested._number)
      expect(parsed).to.have.nested.property('_nested._boolean', value._nested._boolean)
    }),
    invalid: () => it(label, () => createTest(schema, [value], 'THROW'))
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
