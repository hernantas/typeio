import { SchemaAny } from '../alias/SchemaAny'

export type DefinitionOf<T extends SchemaAny> = T['definition']
