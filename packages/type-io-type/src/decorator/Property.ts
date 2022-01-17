import 'reflect-metadata'
import { ConstructorType } from '../alias/ConstructorType'
import { AnySchema } from '../schema/base/AnySchema'
import { TypeSchema } from '../schema/type/TypeSchema'
import { getDesignType, setMetadata } from './metadata'

export function Property (schema?: AnySchema): PropertyDecorator {
  return function <T> (target: Object, key: string | symbol) {
    const tTarget = target.constructor as ConstructorType<T>
    const tKey = key as keyof T
    const designType = getDesignType(tTarget, tKey)
    const n = schema !== undefined ? schema : TypeSchema.create(designType)
    setMetadata(tTarget, tKey, n)
  }
}
