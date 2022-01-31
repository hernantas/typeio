import 'reflect-metadata'
import { ConstructorType } from '../alias/ConstructorType'
import { AnySchema } from '../schema/AnySchema'
import { BaseSchema } from '../schema/BaseSchema'

/**
 * Key used in typescript decoration to type
 */
const METADATA_KEY_DESIGN_TYPE = 'design:type'
const METADATA_KEY_STORAGE = 'type-io:schema'

/**
 * Get design type of property for given object
 *
 * @param target Target type `<T>` constructor
 * @param propertyKey Property key of target object
 * @returns Target type
 */
export function getDesignType<T, K extends keyof T>(
  target: ConstructorType<T>,
  property: K
): ConstructorType<T[K]> {
  return Reflect.getMetadata(
    METADATA_KEY_DESIGN_TYPE,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    target.prototype,
    property as string
  ) as ConstructorType<T[K]>
}

/**
 * Get metadata schema from given property type of `<T>`
 *
 * @param target Target type `<T>` constructor
 * @param property Property key of target object
 * @returns Metadata schema of given property
 */
export function getMetadata<T, K extends keyof T>(
  target: ConstructorType<T>,
  property: K
): BaseSchema<T[K]> {
  return Reflect.getMetadata(
    METADATA_KEY_STORAGE,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    target.prototype,
    property as string
  ) as BaseSchema<T[K]>
}

/**
 * Set metadata schema from given property type of `<T>`
 *
 * @param target Target type `<T>` constructor
 * @param property Property key of target object
 * @param schema Metadata schema for given property
 */
export function setMetadata<T, K extends keyof T>(
  target: ConstructorType<T>,
  property: K,
  schema: AnySchema
): void {
  Reflect.defineMetadata(
    METADATA_KEY_STORAGE,
    schema,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    target.prototype,
    property as string
  )
}
