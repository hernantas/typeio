import 'reflect-metadata'
import { ConstructorType } from '../alias'
import { AnySchema, ConstructorSchema } from '../schema'
import { getDesignType, setMetadata } from './metadata'

export function Property (schema?: AnySchema): PropertyDecorator {
  return function <T> (target: Object, key: string | symbol) {
    const tTarget = target.constructor as ConstructorType<T>
    const tKey = key as keyof T
    const designType = getDesignType(tTarget, tKey)
    const n = schema !== undefined ? schema : ConstructorSchema.create(designType)
    setMetadata(tTarget, tKey, n)
  }
}
