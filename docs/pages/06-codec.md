# Codec

This is where data transformation or type coercion happen.

`Codec` ensure that even if the incoming/outgoing data type is different from what we use on our application, we can still expect the data to be valid with what we declare on our schema.

For example, we receive `number` as our data but we expect to work with `string`:

```ts
// data received
const data: number = 240

const codec = new StringCodec()

// The `value` will be string
const value = codec.decode(data)

console.log(value) // output: "240" rather than 240

// Now you work with the value as `string`
```

Here, our `value` variable will have `string` type which what we expect.

## Custom Codec

To implement custom codec, we need to implement `Codec` interface.

Example:

```ts
class MyClassCodec implements Codec<TypeSchema<MyClass>> {
  readonly name: string = TypeSchema.createName(MyClass.name)

  decode(value: unknown): MyClass {
    // Here, we can only accept string
    if (typeof value === 'string') {
      return new MyClass(value)
    }

    // If the input type is not supported, throw a `DecodeError`
    throw new DecodeError(this.name)
  }

  encode(value: MyClass): string {
    // If the input type is not supported, throw a `EncodeError`
    if (value._innerValue === undefined) {
      throw new EncodeError(this.name)
    }

    // Return back to string
    return value._innerValue.toString()
  }
}
```

## Built-in schema, codec, parser

Each packages has it own built in schema, codec, and schema ready to be used. Please see each packages for more details.
