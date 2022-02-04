import { ParseResultFail } from './ParseResultFail'
import { ParseResultSuccess } from './ParseResultSuccess'

export type ParseResult<T = unknown> = ParseResultSuccess<T> | ParseResultFail
