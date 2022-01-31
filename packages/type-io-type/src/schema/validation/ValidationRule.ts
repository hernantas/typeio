import { ValidationFunction } from './ValidationFunction'

export interface ValidationRule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate: ValidationFunction<any>
  kind: string
  message?: string
}
