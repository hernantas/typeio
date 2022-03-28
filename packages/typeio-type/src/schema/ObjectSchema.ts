import { ObjectType } from '../alias/ObjectType'
import { ObjectSchemaType } from './alias/ObjectSchemaType'
import { SchemaAny } from './alias/SchemaAny'
import { Schema } from './Schema'
import { ObjectDefinition } from './definition/ObjectDefinition'
import { OptionalSchemaMap } from './helper/OptionalSchemaMap'
import { TypeOfMap } from './helper/TypeOfMap'
import { OptionalSchema } from './OptionalSchema'
import { ValidationError } from './validation/ValidationError'

export class ObjectSchema<T extends ObjectSchemaType> extends Schema<
  TypeOfMap<T>,
  ObjectDefinition<T>
> {
  readonly _kind: string = 'object'

  static create<T extends ObjectSchemaType>(properties: T): ObjectSchema<T> {
    return new ObjectSchema({
      name: this.createName(
        Object.entries(properties).map(([key, schema]) => [key, schema.name])
      ),
      properties,
    })
  }

  static createName(propertiesName: [string, string][]): string {
    return `{${propertiesName
      .map((names) => `${names[0]}: ${names[1]}`)
      .join(', ')}}`
  }

  static isInstance(input: SchemaAny): input is ObjectSchema<ObjectSchemaType> {
    return input._kind === 'object'
  }

  get properties(): T {
    return this.definition.properties
  }

  override is(input: unknown): input is TypeOfMap<T> {
    return (
      typeof input === 'object' &&
      input !== null &&
      Object.entries(this.properties)
        .map(([key, schema]) => schema.is((input as ObjectType<T>)[key]))
        .filter((b) => !b).length === 0
    )
  }

  override validate(input: TypeOfMap<T>): ValidationError[] {
    return super.validate(input).concat(
      Object.entries(this.properties)
        .map(([key, schema]) =>
          schema.validate(input[key]).map((error) => ({
            ...error,
            path: [key].concat(error.path ?? []),
          }))
        )
        .flatMap((errors) => errors)
    )
  }

  partial(): ObjectSchema<OptionalSchemaMap<T>> {
    return ObjectSchema.create(
      Object.fromEntries(
        Object.entries(this.properties).map(([key, schema]) => [
          key,
          OptionalSchema.create(schema),
        ])
      ) as OptionalSchemaMap<T>
    )
  }
}
