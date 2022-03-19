# Class-based

**_Make sure decorator is enabled in `tsconfig.json`_**

```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

To define our data using class, we can use `@Property` decorator. **Note:** properties that aren't decorated will be ignored

```ts
class User {
  @Property() name: string
  @Property() age: number
  @Property() active: boolean
}
```

For more complex type, `@Property` decorator need arguments to be accurate with our data type. This is currently limited because of decorator.

```ts
class UserState extends User {
  @Property(
    t.union(
      t.literal('active'),
      t.literal('inactive'),
      t.literal('pending'),
      t.literal('banned')
    )
  )
  status: 'active' | 'inactive' | 'pending' | 'banned'
}
```

If you noticed, the arguments passed to `@Property` are [schemas](03-schema.md).

Here are some types that need to be declared in the arguments:

- Array (`A[]`)
- Tuple (`[A, B, C]`)
- Literal (`'a'`)
- Null (`null`)
- Nullable (`A | null`)
- Undefined (`undefined`)
- Optional (`A | undefined` or `a?: A`)
- Union (`A | B`)
- Intersect (`A & B`)
- Object (`{a: A, b: B}`)
- Any (`any`)
- Unknown (`unknown`)

Or in short, any type that is not class or primitives type must be specified in `@Property` to get accurate result.
