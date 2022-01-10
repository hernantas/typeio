import { expect } from 'chai'
import { AnySchema } from '../../src'

interface TestOption {
  valid: () => void
  invalid: () => void
}

export function testString (schema: AnySchema): TestOption {
  const label = 'Parse string'
  return {
    valid () {
      it(label, () => {
        expect(schema.parse('')).to.be.equal('')
        expect(schema.parse('S')).to.be.equal('S')
        expect(schema.parse('String')).to.be.equal('String')
      })
    },
    invalid () {
      it(label, () => {
        expect(() => schema.parse('')).to.throw()
        expect(() => schema.parse('S')).to.throw()
        expect(() => schema.parse('String')).to.throw()
      })
    }
  }
}

export function testNumber (schema: AnySchema): TestOption {
  const label = 'Parse number'
  return {
    valid () {
      it(label, () => {
        expect(schema.parse(0)).to.be.equal(0)
        expect(schema.parse(80)).to.be.equal(80)
        expect(schema.parse(8080)).to.be.equal(8080)
      })
    },
    invalid () {
      it(label, () => {
        expect(() => schema.parse(0)).to.throw()
        expect(() => schema.parse(80)).to.throw()
        expect(() => schema.parse(8080)).to.throw()
      })
    }
  }
}

export function testBoolean (schema: AnySchema): TestOption {
  const label = 'Parse boolean'
  return {
    valid () {
      it(label, () => {
        expect(schema.parse(true)).to.be.equal(true)
        expect(schema.parse(false)).to.equal(false)
      })
    },
    invalid () {
      it(label, () => {
        expect(() => schema.parse(true)).to.throw()
        expect(() => schema.parse(false)).to.throw()
      })
    }
  }
}

export function testNull (schema: AnySchema): TestOption {
  const label = 'Parse null'
  return {
    valid () {
      it(label, () => {
        expect(schema.parse(null)).to.be.equal(null)
      })
    },
    invalid () {
      it(label, () => {
        expect(() => schema.parse(null)).to.throw()
      })
    }
  }
}

export function testUndefined (schema: AnySchema): TestOption {
  const label = 'Parse undefined'
  return {
    valid () {
      it(label, () => {
        expect(schema.parse(undefined)).to.be.equal(undefined)
      })
    },
    invalid () {
      it(label, () => {
        expect(() => schema.parse(undefined)).to.throw()
      })
    }
  }
}
