import 'reflect-metadata'
import { ConstructorType } from '../alias/ConstructorType'
import { SchemaAny } from '../schema/alias/SchemaAny'
import { type } from '../schema/builder/type'
import { getDesignType, getMetadata, setMetadata } from './metadata'

export function Property(schema?: SchemaAny): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function <T>(target: Object, key: string | symbol) {
    const tTarget = target.constructor as ConstructorType<T>
    const tKey = key as keyof T
    const designType = getDesignType(tTarget, tKey)
    const propertySchema = schema !== undefined ? schema : type(designType)
    const targetSchemas = getMetadata(tTarget)
    setMetadata(tTarget, {
      ...targetSchemas,
      [tKey]: propertySchema,
    })
  }
}
