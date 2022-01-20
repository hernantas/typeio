import { ConstructorType } from '../../alias/ConstructorType'
import { BaseSchemaDefinition } from './BaseSchemaDefinition'
import { ValidationError } from './ValidationError'
import { ValidationFunction } from './ValidationFunction'
import { ValidationRule } from './ValidationRule'

export abstract class BaseSchema<T, D extends BaseSchemaDefinition = BaseSchemaDefinition> {
  /**
   * Ignore this. Used to prevent typescript infer the type to `unknown`
   */
  readonly _type!: T

  /**
   * Schema unique name. Must be unique for to describe {@link BaseSchema._type}
   */
  readonly name: string

  readonly definition: D

  constructor (name: string, definition: D) {
    this.name = name
    this.definition = definition
  }

  get rules (): ValidationRule[] {
    return this.definition.rules ?? []
  }

  abstract is (input: unknown): input is T

  validate (input: T): ValidationError[] {
    return this.rules.filter(r => !r.validate(input)).map(r => {
      const error: ValidationError = {
        kind: r.kind,
        message: r.message
      }
      return error
    })
  }

  newInstance (definition: D): this {
    const Constructor = this.constructor as ConstructorType<this>
    return new Constructor(this.name, definition)
  }

  /**
   * Add validation rule
   *
   * @param validate Callback function to validate the value
   * @param error Optional message to be included when validation failed
   * @returns A new instance with additional rule
   */
  check (validate: ValidationFunction<T>, error?: string | ValidationError): this {
    const funcError: ValidationError = (typeof error === 'string' || error === undefined)
      ? {
          kind: 'VALIDATION',
          message: error
        }
      : error
    return this.newInstance({
      ...this.definition,
      rules: this.rules.concat({
        validate,
        kind: funcError.kind,
        message: funcError.message
      })
    })
  }

  label (value: string): this {
    return this.newInstance({
      ...this.definition,
      label: value
    })
  }
}
