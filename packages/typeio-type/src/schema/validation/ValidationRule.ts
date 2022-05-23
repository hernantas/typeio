import { ValidationError } from './ValidationError'
import { ValidationFunction } from './ValidationFunction'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ValidationRule<T = any> extends ValidationError {
  readonly validate: ValidationFunction<T>
}
