import { ValidationRule } from '../base/ValidationRule'

export interface BaseSchemaDefinition {
  /**
   * Schema unique name to describe schema type
   */
  readonly name: string

  /**
   * Label for this definition
   */
  label?: string

  rules?: ValidationRule[]
}
