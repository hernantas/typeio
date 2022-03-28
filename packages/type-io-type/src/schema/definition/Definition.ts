import { ValidationRule } from '../validation/ValidationRule'

export interface Definition {
  /** Schema unique name to describe schema type */
  readonly name: string

  readonly rules?: ValidationRule[]

  /** Label for this definition */
  readonly label?: string

  readonly inName?: string

  readonly outName?: string

  readonly [key: string]: unknown
}
