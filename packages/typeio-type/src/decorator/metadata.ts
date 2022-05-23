import 'reflect-metadata'
import { ConstructorType } from '../alias/ConstructorType'
import { SchemaMap } from '../schema/helper/SchemaMap'

/** Key used in typescript decoration to type */
const METADATA_KEY_DESIGN_TYPE = 'design:type'
const METADATA_KEY_STORAGE = 'typeio:schema'

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
 * @returns Object schema that describe `<T>`
 */
export function getMetadata<T>(
  target: ConstructorType<T>
): Partial<SchemaMap<T>> {
  return (
    (Reflect.getMetadata(
      METADATA_KEY_STORAGE,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      target.prototype
    ) as SchemaMap<T>) ?? {}
  )
}

/**
 * Set metadata schema from given property type of `<T>`
 *
 * @param target Target type `<T>` constructor
 * @param schema Object schema that describe `<T>`
 */
export function setMetadata<T>(
  target: ConstructorType<T>,
  schema: Partial<SchemaMap<T>>
): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Reflect.defineMetadata(METADATA_KEY_STORAGE, schema, target.prototype)
}
