import { ValidationRule } from './ValidationRule'

export interface BaseSchemaDefinition {
  /**
   * Label for this definition
   */
  label?: string

  rules?: ValidationRule[]
}
