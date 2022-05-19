# Parser

While schema is powerful, schema main purpose is to describe the data and check if the data is valid or not. That's why the schema contain type-guard (`is`) and data validation (`validate`) method but not transformation method.

Its not always ideal since the data received especially from third-party can have different type from what we declare on schema.

For example, using schema like this:

```ts
const schema = t.object({
  id: t.number(),
  createdAt: t.date(),
  name: t.string(),
})
```

You can **only** expect data like this:

```ts
type Data = {
  id: number
  createdAt: Date
  name: string
}
```

But, data like this should be acceptable

```json
{
  "id": 5128903,
  "createdAt": "2022-03-09T05:39:22.851Z",
  "name": "Gonzalez Ray"
}
```

Notice how `createdAt` at json is `string` but in our schema we declare it as `Date`.

For complex object such as `Date` or `BigInteger` (or `BigDecimal` for `bson`) that represent single value will expect single string as input/output value which require data transformation.

In addition, some library incorporate the transformation logic on schema. This makes the schema reuse difficult. For example receiving data not only using `json` from client but using `bson` from database.

One straight naive solution is to declare schema for each use case, one for `json`, one for `bson`.

Fortunately, you don't have to. This is what `Parser` is for.

## Decode or Encode from/to unknown type

`Parser` is used to decode/encode data from/to unknown type such as from third-party source like clients or databases so the data we work with is as valid as our schemas.

`Parser` has 2 core method:

- `decode` is used to transform data into our the type defined on schemas
- `encode` is used to transform data which match our schema into the type depend on the [context](#contextual-transformation) of the `Parser` used

For example:

```ts
const parser = new DefaultParser()

console.log(parser.decode(240, string()))
console.log(parser.decode(true, string()))
console.log(parser.decode(240, number()))

// output:
// "240" <-- This is a string, notice the double quote
// "true" <-- This is also a string, notice the double quote
// 240 <-- This is a number, notice its do not have double quote
```

Notice how on the first and second output, even if we pass non-string, it decoded into a string since we use `string()` schema. But on third output its decoded to number since we use `number()` schema.

## Contextual transformation

This is the primary reason why this library exists. Oftentimes, when working on api projects, to produces the api data for the clients usually we use `json` string for transferring data such as:

```json
{
  "_id": "5effaa5662679b5af2c58829",
  "createdAt": "2022-03-09T05:39:22.851Z",
  "email": "email@example.com",
  "age": 24
}
```

But we also need to interact with the databases which produce or accept data using `bson` such as:

```bson
{
  "_id": ObjectId("5effaa5662679b5af2c58829"),
  "createdAt": Date("2022-03-09T05:39:22.851Z"),
  "email": "email@example.com",
  "age": 24
}
```

This is the primary reason why data transformation is not on the schemas but using `Parser` instead.

When working with `json` we can use `JSONParser` to receive or produce `json` from our data

```ts
const parser = new JSONParser()
// decode from JSON
const myObject = parser.decodeJSON(json, schema)
// or encode back to JSON
const jsonString = parser.encodeJSON(myObject, schema)
```

But when working with `bson` from MongoDB, we can use `BSONParser` to receive or produce `bson` from our data

```ts
const parser = new BSONParser()
// decode from BSON
const myObject = parser.decodeBSON(bson, schema)
// or encode back to BSON
const bsonObject = parser.encodeBSON(myObject, schema)
```

## Extendable

Extending `Parser` should be very easy. If you want to add your own `Codec` then you can just put it to the constructor.

In fact, the `DefaultParser` is `Parser` that comes with built in `Codec`

```ts
class DefaultParser extends Parser {
  constructor(codecs: CodecAny[] = []) {
    super([new StringCodec(), new NumberCodec(), new BooleanCodec(), ...codecs])
  }
}
```

## Modular

Depend on the module you install, some `Parser` is only available on specific module. Please see each module to see what `Parser` and `Codec` is available.

This should allow you to avoid unnecessary dependencies install.
