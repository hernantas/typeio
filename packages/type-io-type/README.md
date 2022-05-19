# type-io

Typescript-first schema declaration, validation library and contextual transformation. Inspired from [io-ts](https://www.npmjs.com/package/io-ts) and [joi](https://www.npmjs.com/package/joi).

**`type-io` is still in alpha. Expect bugs and api changes!**

## Features

- Typescript-first library which support type inference and schema type properly.
- Support class-based or schema-based declaration
- Powerful schema declaration, can be used to type-guard and validation. Can also be reused for multiple use case such as json, bson, or other
- Type coercion, allow data transformation from/to different type for input/output.
- Fast and Extensible, build your own schema/codec/parser

Please see the [documentation](#docs) for more details.

![inference](../../images/ts-object.png)
![inference](../../images/ts-type-guard.png)

## Docs

- [The Idea](../../docs/pages/01-the-idea.md)
- [Getting Started](../../docs/pages/02-getting-started.md)
  - [Installation](../../docs/pages/02-getting-started.md#installation)
  - [Basic Usage](../../docs/pages/02-getting-started.md#basic-usage)
- [Schema-based declaration](../../docs/pages/03-schema.md)
- [Class-based declaration](../../docs/pages/04-class.md)
- [Parser](../../docs/pages/05-parser.md)
- [Codec](../../docs/pages/06-codec.md)

## Built-in

### Schema

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

### Parser

| Name          | Description                                                               |
| ------------- | ------------------------------------------------------------------------- |
| Parser        | Base parser that contain no codecs.                                       |
| DefaultParser | Parser with some some built in primitive `Codec`.                         |
| JSONParser    | Same with `DefaultParser` but have method to decode or encode from `json` |
