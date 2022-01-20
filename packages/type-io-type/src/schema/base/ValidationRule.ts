import { ValidationFunction } from './ValidationFunction'

export interface ValidationRule {
  validate: ValidationFunction<any>
  kind: string
  message?: string
}
