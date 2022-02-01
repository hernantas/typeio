import { ValidationRule } from '../validation/ValidationRule'

export interface BaseDefinition {
  /**
   * Schema unique name to describe schema type
   */
  readonly name: string

  /**
   * Label for this definition
   */
  readonly label?: string

  readonly rules?: ValidationRule[]
}
