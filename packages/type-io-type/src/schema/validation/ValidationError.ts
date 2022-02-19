import { ObjectType } from '../../alias/ObjectType'

export interface ValidationError {
  readonly name: string
  readonly message?: string
  readonly args?: ObjectType
}
