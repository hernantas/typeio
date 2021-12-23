import { BaseSchemaDefinition } from './BaseSchemaDefinition'
import { ConstructorType } from '../../alias'

export abstract class BaseSchema<T, D extends BaseSchemaDefinition = BaseSchemaDefinition> {
  /**
   * Ignore this. Used to prevent typescript infer the type to `unknown`
   */
  readonly _type!: T

  readonly definition: D

  constructor (definition: D) {
    this.definition = definition
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
