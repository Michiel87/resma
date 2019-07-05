export interface RecordIdentifier {
  id?: string
  type: string
}

export interface IRecord extends RecordIdentifier {
  attributes: {
    [key: string]: any
  }
  relationships?: {
    [key: string]: any
  }
}

export type Attribute = string
export type Relationship = string
export type RelatedId = string
export type Value = any

interface DispatcherMethods {
  setAttribute (...args: any): any
  addHasOne (...args: any): any
  addHasMany (...args: any): any
  removeRelationship (...args: any): any
  reset (...args: any): any
  resetAttributes (...args: any): any
  resetRelationships (...args: any): any
}

export type DispatcherFactory<D> = {
  create(context: object): Dispatchers<D>
}

export type Dispatchers<D> = DispatcherMethods & D