# Getting Started

## Installation

To start using, install the packages via NPM/Yarn:

Node:

```
npm install @typeio/type --save
```

Yarn:

```
yarn add @typeio/type
```

Then install `reflect-metadata` if we want to use class

Node:

```
npm install reflect-metadata --save
```

Yarn:

```
yarn add reflect-metadata
```

Ensure these options are enabled in `tsconfig.json`

```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

## Basic Usage

First is to define your data model. There are 2 ways to do that.

- schema-based ([see details](03-schema.md))

```ts
// schema-based
const UserSchema = t.object({
  name: t.string(),
  age: t.number(),
  active: t.boolean(),
})

// you can get the type using `TypeOf`
type User = TypeOf<typeof UserSchema>
```

- class-based ([see details](04-class.md))

```ts
// class-based
class User {
  @Property() name: string
  @Property() age: number
  @Property() active: boolean
}
```

Or both, by converting class to schema using `type` function

```ts
const UserSchema = t.type(User)
```

_See [Schema declaration](03-schema.md) or [Class declaration](04-class.md) for more details._

Then we can use our schema to type-guard and validate our data

```ts
function process(data: unknown) {
  // you can use `is` method to type guard
  if (UserSchema.is(data)) {
    // here, `data` has type 'User` class
    const name = data.name

    // then we can validate it if we want
    const errors = UserSchema.validate(data)
  }
}
```

Finally, by using `DefaultParser`, we can start using decoding or encoding our data based on given model.

```ts
// create new parser
const parser = new DefaultParser()

// decode it to `User` class
const user = parser.decode(fetchedData, UserSchema)

// encode instance of `User` back to plain object
const plain = parser.encode(user, UserSchema)
```

or if json were used

```ts
const parser = new JsonParser()

// decode it to `User` class
const user = parser.decode(fetchedJson, UserSchema)

// encode instance of `User` back to plain object
const json = parser.encode(user, UserSchema)
```

_See each package to learn more_
