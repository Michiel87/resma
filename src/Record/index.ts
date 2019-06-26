import { curryFn } from './helpers'

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

type Attribute = string
type Relationship = string
type RelatedId = string
type Value = any

export class Record {
  _record: IRecord
  _dispatcher: any
  
  constructor (record: IRecord, dispatcher: any) {
    this._record = record
    this._dispatcher = dispatcher
  }

  get id () {
    return this._record.id
  }

  get type () {
    return this._record.type
  }

  get attributes () {
    return this._record.attributes
  }

  get relationships () {
    return this._record.relationships
  }

  setAttribute (...args: Array<Attribute|Value>) {
    return curryFn((attribute: string, value: any): this => {
      this._dispatcher.setAttribute(attribute, value)
      return this
    })(...args)
  }

  addHasOne (...args: Array<Relationship|RecordIdentifier>) {
    return curryFn((relationship: string, recordIdentifier: RecordIdentifier): this => {
      this._dispatcher.addHasOne(relationship, recordIdentifier)
      return this
    })(...args)
  }

  addHasMany (...args: Array<Relationship|RecordIdentifier>) {
    return curryFn((relationship: string, recordIdentifier: RecordIdentifier): this => {
      this._dispatcher.addHasMany(relationship, recordIdentifier)
      return this
    })(...args)
  }

  removeRelationship (...args: Array<Relationship|RelatedId>) {
    return curryFn((relationship: string, relatedId: string) => {
      this._dispatcher.removeRelationship(relationship, relatedId)
      return this
    })(...args)
  }
}
