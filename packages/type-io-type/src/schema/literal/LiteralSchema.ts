import { LiteralType } from '../../alias'
import { BaseSchema } from '../base'
import { LiteralSchemaDefinition } from './LiteralSchemaDefinition'

export class LiteralSchema<T extends LiteralType> extends BaseSchema<T, LiteralSchemaDefinition<T>> {
  static create <T extends LiteralType> (value: T): LiteralSchema<T> {
    return new LiteralSchema({ value })
  }

  parse (input: unknown): T {
    if (input !== this.definition.value) {
      throw new Error(`Literal value is not equal "${this.definition.value.toString()}"`)
    }
    return this.definition.value
  }
}
