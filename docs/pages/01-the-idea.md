# The Idea

While data in Javascript/Typescript/JSON can be very flexible, it still need to be verified so we can use or manipulate the data safely. Especially data from untrusted source such as client or third-party.

That's why projects such as [jsonschema](https://www.npmjs.com/package/jsonschema) or [ajv](https://www.npmjs.com/package/ajv) exists. Usually, these projects use schema declaration or decorator to validate the data.

For example, schema such as

```ts
// ajv schema
const schema = {
  type: 'object',
  properties: {
    foo: { type: 'integer' },
    bar: { type: 'string' },
  },
  required: ['foo'],
  additionalProperties: false,
}
```

used to validate data with the shape of:

```ts
interface MyObject {
  foo: number
  bar: string
}
```

However, these isn't perfect. Most libraries have certain design limitations that make for a non-ideal developer experience.

## Problem #1: Choosing Data Model Style

There are 2 way to define data model:

Class based (such as [class-transformer](https://www.npmjs.com/package/class-transformer)):

```ts
class User {
  @Column()
  name: string
  @Column()
  age: number
  @Column()
  active: boolean
}
```

Or schema based (such as [mongoose](https://www.npmjs.com/package/mongoose)):

```ts
const schema = schema({
  name: String,
  age: Number,
  active: Boolean,
})
```

Most library only offer either class-based or schema-based to define your data model.

## Problem #2: Multiple Data Model Declaration

The schemas oftentimes can only be used for specific use such as when handling json and cannot be used for handle database data such as BSON (such as in MongoDB) or array (such as in SQL based database).

This lead to declaring data model multiple times.

In addition, when using typescript, we often need to declare our data interface.

For example in mongoose:

```ts
// Create an interface representing a document in MongoDB
interface User {
  name: string
  email: string
  avatar?: string
}

// Then we create a schema corresponding to the document interface
const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
})
```

## Problem #3: Input/Output Type Coercion

Using our example mongoose schema above, the schema is used to receive input and produce output from BSON which is what MongoDB format are.

Or when using our JSON schema, it only expect to verify dan validate from JSON type format.

_Hence why, this project exists._
