import { ValidationRule } from './ValidationRule'

export interface BaseSchemaDefinition<T> {
  /**
   * Label for this definition
   */
  label?: string

  rules?: Array<ValidationRule<T>>
}
