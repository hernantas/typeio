import { ConstructorType } from '../../alias'
import { BaseSchemaDefinition } from './BaseSchemaDefinition'

export abstract class BaseSchema<T, D extends BaseSchemaDefinition = BaseSchemaDefinition> {
  /**
   * Ignore this. Used to prevent typescript infer the type to `unknown`
   */
  readonly _type!: T

  readonly definition: D

  constructor (definition: D) {
    this.definition = definition
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

  assemble (definition: D): this {
    const Constructor = this.constructor as ConstructorType<this>
    return new Constructor(definition)
  }

  label (value: string): this {
    return this.assemble({
      ...this.definition,
      label: value
    })
  }
}
