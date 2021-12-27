import { ObjectType } from '../../alias'

/**
 * Map property of object with unknown value
 */
export type ObjectPropertyMap<T extends ObjectType> = {
  [K in keyof T]: unknown
}
