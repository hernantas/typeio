import { Extendable } from '../Extendable'
import { BaseDefinition } from './definition/BaseDefinition'
import { ValidationError } from './validation/ValidationError'
import { ValidationFunction } from './validation/ValidationFunction'
import { ValidationRule } from './validation/ValidationRule'

export abstract class BaseSchema<
  T,
  D extends BaseDefinition = BaseDefinition
> extends Extendable<D> {
  /** Ignore this. Used to prevent typescript infer the type to `unknown` */
  readonly _type!: T

  abstract readonly _kind: string

  get name(): string {
    return this.definition.name
  }

  get rules(): readonly ValidationRule[] {
    return this.definition.rules ?? []
  }

  abstract is(input: unknown): input is T

  validate(input: T): ValidationError[] {
    return this.rules
      .filter((r) => !r.validate(input))
      .map((r) => ({
        kind: r.kind,
        message: r.message,
      }))
  }

  /**
   * Add validation rule
   *
   * @param validate Callback function to validate the value
   * @param error Optional message to be included when validation failed
   * @returns A new instance with additional rule
   */
  check(
    validate: ValidationFunction<T>,
    error?: string | ValidationError
  ): this {
    const funcError: ValidationError =
      typeof error === 'string' || error === undefined
        ? {
            kind: 'VALIDATION',
            message: error,
          }
        : error
    return this.newInstance({
      ...this.definition,
      rules: this.rules.concat({
        validate,
        kind: funcError.kind,
        message: funcError.message,
      }),
    })
  }

  label(value: string): this {
    return this.newInstance({
      ...this.definition,
      label: value,
    })
  }
}
