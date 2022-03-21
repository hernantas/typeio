import { Extendable } from '../Extendable'
import { BaseDefinition } from './definition/BaseDefinition'
import { ValidationError } from './validation/ValidationError'
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
      .filter((rule) => !rule.validate(input))
      .map((rule) => ({
        name: rule.name,
        message: rule.message,
        path: rule.path,
        args: rule.args,
      }))
  }

  /**
   * Add validation rule
   *
   * @param rule New rule to be added
   * @returns A new instance with additional rule
   */
  check(rule: ValidationRule<T>): this {
    return this.assign('rules', this.rules.concat(rule))
  }

  label(value: string): this {
    return this.assign('label', value)
  }
}
