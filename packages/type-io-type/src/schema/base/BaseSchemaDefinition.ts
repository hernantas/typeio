import { ValidationCheck } from './ValidationCheck'

export interface BaseSchemaDefinition<T> {
  /**
   * Label for this definition
   */
  label?: string

  checks?: Array<ValidationCheck<T>>
}
