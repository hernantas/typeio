import { ValidationFunction } from './ValidationFunction'

export interface ValidationCheck<T> {
  check: ValidationFunction<T>
  kind: string
  message?: string
}
