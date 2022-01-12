import { ConstructorType } from '../../alias'
import { BaseSchemaDefinition } from './BaseSchemaDefinition'
import { ValidationRule } from './ValidationRule'
import { ValidationError } from './ValidationError'
import { ValidationFunction } from './ValidationFunction'
import { ValidationFunctionError } from './ValidationFunctionError'

export abstract class BaseSchema<T, D extends BaseSchemaDefinition<T> = BaseSchemaDefinition<T>> {
  /**
   * Ignore this. Used to prevent typescript infer the type to `unknown`
   */
  readonly _type!: T

  readonly definition: D

  constructor (definition: D) {
    this.definition = definition
  }

  get checks (): Array<ValidationRule<T>> {
    return this.definition.checks ?? []
  }

  abstract is (input: unknown): input is T

  parse (input: unknown): T {
    if (this.is(input)) {
      return input
    }
    throw new Error('Parse error')
  }

  async parseAsync (input: unknown): Promise<T> {
    return this.parse(input)
  }

  validate (input: T): ValidationError[] {
    return this.checks.filter(c => !c.validate(input)).map(c => {
      const error: ValidationError = {
        kind: c.kind,
        message: c.message
      }
      return error
    })
  }

  newInstance (definition: D): this {
    const Constructor = this.constructor as ConstructorType<this>
    return new Constructor({ ...definition })
  }

  /**
   * Add validation check
   *
   * @param check Callback function to validate the value
   * @param error Optional message to be included when validation failed
   * @returns A new instance with additional check
   */
  check (check: ValidationFunction<T>, error?: string | ValidationFunctionError): this {
    const newCheck: ValidationRule<T> = typeof error === 'string'
      ? {
          validate: check,
          kind: 'VALIDATION_ERROR',
          message: error
        }
      : {
          validate: check,
          kind: (error !== undefined ? error.kind : 'VALIDATION_ERROR'),
          message: error?.message
        }
    return this.newInstance({
      ...this.definition,
      checks: this.checks.concat(newCheck)
    })
  }

  label (value: string): this {
    return this.newInstance({
      ...this.definition,
      label: value
    })
  }
}
