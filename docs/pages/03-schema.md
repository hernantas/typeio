# Schema-based

To define our data using schema, use default `t` object to build your schema.

```ts
// import default schema builder

import t from '@type-io/type'

// or individual function

import { string, number, boolean } from '@type-io/type'
```

The schema can be declared as simple as simple `string`

```ts
const StringSchema = t.string()
```

or as complex as `object`:

```ts
// schema-based
const UserSchema = t.object({
  name: t.string(),
  age: t.number(),
  active: t.boolean(),
})
```

You can also get the static type using `TypeOf` utility type.

```ts
type User = TypeOf<typeof UserSchema>
```

Here `User` type will have type equal to

```ts
type User = {
  name: string
  age: number
  active: boolean
}
```

## Type guard

You can use the schema to be used as type-guard using `is` method

```ts
function process(data: unknown) {
  if (UserSchema.is(data)) {
    // here, `data` has `{name: string, age: number, active: boolean} type
    console.log(data.name)
  }
}
```

## Validation

You can also doing some validation using built-in validation

```ts
// string must:
// - not be empty character
// - at least 3 characters
// - at most 16 characters
const UsernameSchema = t.string().notEmpty().min(3).max(16)
```

Or build your own validation using `check`

```ts
const NumberSchema = t.number().check({
  name: 'NUMBER_MODULUS_3',
  args: { mod: 3 },
  validate: (v) => v % 3 === 0,
  message: 'Number must be divisible by 3',
})
```

Then validate the data using

```ts
const errors = UsernameSchema.validate(data)
```

## Built-in schema

| Type      | Typescript       | Builder                             |
| --------- | ---------------- | ----------------------------------- |
| string    | `string`         | `t.string()`                        |
| number    | `number`         | `t.number()`                        |
| boolean   | `boolean`        | `t.boolean()`                       |
| literal   | `'A'`            | `t.literal('A')`                    |
| unknown   | `unknown`        | `t.unknown()`                       |
| any       | `any`            | `t.any()`                           |
| null      | `null`           | `t.null()`                          |
| nullable  | `A \| null`      | `t.nullable(t.type(A))`             |
| undefined | `undefined`      | `t.undefined()`                     |
| optional  | `A \| undefined` | `t.undefined(t.type(A))`            |
| array     | `array`          | `t.array(T)`                        |
| type      | `A`              | `t.type(A)`                         |
| object    | `{a:A}`          | `t.object({a: t.type(A)})`          |
| union     | `A \| B`         | `t.union(t.type(A), t.type(B))`     |
| intersect | `A & B`          | `t.intersect(t.type(A), t.type(B))` |
