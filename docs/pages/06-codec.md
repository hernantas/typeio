# Codec

This is where data transformation or type coercion happen.

While schema is powerful, its main purpose is to check if the data is valid or not. That's why the schema only contain type-guard (`is`) and data validation (`validate`) method.

However, the data is not always match the schema especially if the incoming/outgoing data is from third-party like clients or databases.

For example, using schema like this:

```ts
const schema = t.object({
  id: t.number(),
  createdAt: t.date(),
  name: t.string(),
})
```

You can **only** expect data like:

```ts
type Data = {
  id: number
  createdAt: Date
  name: string
}
```

However, for complex object such as `Date` or `BigInteger` (or `BigDecimal` for `bson`) that represent single value will expect single string as input/output value which require data transformation.

For example using our example schema above, we will often receive data such as:

```json
{
  "id": 5128903,
  "createdAt": "2022-03-09T05:39:22.851Z",
  "name": "Gonzalez Ray"
}
```

Here, `createdAt` property is `string` but our schema declare it as `Date`.

Some library incorporate the transformation on schema. This makes the schema reuse difficult.

`Codec` ensure that even if the data type used on the third-party is different from what we use on our software, we can still expect the data to be valid with what we declare on our schema.

For example, we receive `number` as our data but we expect to work with `string`:

```ts
// data received
const data: number = 240

const codec = new StringCodec()

// This `value` will be string
const value = codec.decode(data)

console.log(value) // output: "240" rather than 240

// Now you work with the value
```

Here, our `value` variable will have `string` type which what we expect.

To extends our codec, we need to implement `Codec` interface.

Example:

```ts
class MyClassCodec implements Codec<TypeSchema<MyClass>> {
  readonly schema = type(MyClass)

  decode(value: unknown): MyClass {
    // Here, we can only accept string
    if (typeof value === 'string') {
      return new MyClass(value)
    }

    // Here if the input type is not supported, throw a `DecodeError`
    throw new DecodeError(this.schema.name)
  }

  encode(value: MyClass): string {
    // Return back to string
    return value._innerValue
  }
}
```
