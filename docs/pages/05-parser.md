# Parser

While schema is powerful, schema main purpose is to check if the data is valid or not. That's why the schema contain type-guard (`is`) and data validation (`validate`) method but not transformation method.

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

In addition, what if we receive data not using `json` but using `bson`.

This is what `Parser` is for.

## Decode or Encode from/to unknown type

`Parser` is used to decode/encode data from/to unknown type such as from third-party source like clients or databases so the data we work with is as valid as our schemas.

`Parser` has 2 core method:

- `decode` is used to transform data into our the type defined on schemas
- `encode` is used to transform data which match our schema into the type depend on the [context](#contextual-transformation) of the `Parser` used

For example:

```ts
const parser = new PlainParser()
const StringSchema = string()
const NumberSchema = number()

console.log(parser.decode(240, stringSchema))
console.log(parser.decode(true, stringSchema))
console.log(parser.decode(240, numberSchema))

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

But we also need to interact with the databases which produce data such as:

```bson
{
  "_id": ObjectId("5effaa5662679b5af2c58829"),
  "createdAt": Date("2022-03-09T05:39:22.851Z"),
  "email": "email@example.com",
  "age": 24
}
```

This is the primary reason why data transformation is not on the schemas but using `Parser` instead.

When working with `json` we can use `JsonParser` to receive or produce `json` from our data

```ts
const parser = new JsonParser()
// decode from JSON
const myObject = parser.decode(json, schema)
// or encode back to JSON
const jsonString = parser.encode(myObject, schema)
```

But when working with `bson` from MongoDB, we can use `BsonParser` to receive or produce `bson` from our data

```ts
const parser = new BsonParser()
// decode from BSON
const myObject = parser.decode(bson, schema)
// or encode back to BSON
const bsonObject = parser.encode(myObject, schema)
```

## Extendable

Extending `Parser` should be very easy. If you want to add your own `Codec` then you can just put it to the constructor.

In fact, the default `Parser` is a `Parser` with some built in `Codec`

```ts
const parser = new Parser([StringCodec, NumberCodec, BooleanCodec])
```

See the documentation for more details

## Modular

Depend on the module you install, some `Parser` is only available on specific module. Please see each module to see what `Parser` and `Codec` is available.

This should allow you to avoid unnecessary dependencies install.
