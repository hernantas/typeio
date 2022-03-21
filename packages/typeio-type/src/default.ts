import { any } from './schema/builder/any'
import { array } from './schema/builder/array'
import { boolean } from './schema/builder/boolean'
import { date } from './schema/builder/date'
import { intersect } from './schema/builder/intersect'
import { literal } from './schema/builder/literal'
import { _null } from './schema/builder/null'
import { nullable } from './schema/builder/nullable'
import { number } from './schema/builder/number'
import { object } from './schema/builder/object'
import { optional } from './schema/builder/optional'
import { string } from './schema/builder/string'
import { tuple } from './schema/builder/tuple'
import { type } from './schema/builder/type'
import { _undefined } from './schema/builder/undefined'
import { union } from './schema/builder/union'
import { unknown } from './schema/builder/unknown'

export const t = {
  any,
  array,
  boolean,
  date,
  intersect,
  literal,
  null: _null,
  nullable,
  number,
  object,
  optional,
  string,
  tuple,
  type,
  undefined: _undefined,
  union,
  unknown,
}
