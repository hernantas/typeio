# Parser

Since [codec](06-codec.md) can automatically transform the input data to the data type we want, we still need to choose which `codec` to use so we can get the data we want.

For example, if we want `string` data then we need to use `StringCodec`. If we want `number` then we need to use `NumberCodec`. And so on.

`Parser` allow you to automatically use the correct codec without specify it.

For example, here we use `PlainParser`:

```ts
const parser = new PlainParser()
const StringSchema = string()
const NumberSchema = number()

console.log(parser.decode(240, stringSchema))
console.log(parser.decode(true, stringSchema))
console.log(parser.decode(240, numberSchema))

// output:
// "240"
// "true"
// 240
```

Basically, `Parser` is like using auto codec. It will automatically choose the correct codec based on our schema.
