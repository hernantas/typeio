import { ParseError } from './ParseError'

export interface ParseResultFail {
  readonly success: false
  readonly errors: ParseError[]
}
