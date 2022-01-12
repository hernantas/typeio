import { ValidationFunction } from './ValidationFunction'

export interface ValidationRule<T> {
  validate: ValidationFunction<T>
  kind: string
  message?: string
}
