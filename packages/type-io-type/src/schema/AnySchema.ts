import { BaseSchema } from './BaseSchema'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AnySchema extends BaseSchema<any> {
  readonly _kind: string = 'any'

  static create(): AnySchema {
    return new AnySchema({ name: 'Any' })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override is(_input: unknown): _input is any {
    return true
  }
}
