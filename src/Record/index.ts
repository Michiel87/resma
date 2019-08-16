import { DispatcherMethods, DispatcherFactory } from '../Dispatcher/types'
import { IRecord } from './types'

export class Record<Dispatchers extends DispatcherMethods> {
  _record: IRecord
  _dispatchers: Dispatchers

  setAttribute: Dispatchers['setAttribute']
  addHasOne: Dispatchers['addHasOne']
  addHasMany: Dispatchers['addHasMany']
  removeRelationship: Dispatchers['removeRelationship']
  reset: Dispatchers['reset']
  resetAttributes: Dispatchers['resetAttributes']
  resetRelationships: Dispatchers['resetRelationships']
  
  constructor (record: IRecord, dispatchers: DispatcherFactory<Dispatchers>) {
    this._record = record
    this._dispatchers = dispatchers.create(this)

    this.setAttribute = this._dispatchers.setAttribute.bind(this)

    this.addHasOne = this._dispatchers.addHasOne.bind(this) 

    this.addHasMany = this._dispatchers.addHasMany.bind(this) 

    this.removeRelationship = this._dispatchers.removeRelationship.bind(this) 

    this.reset = this._dispatchers.reset.bind(this) 

    this.resetAttributes = this._dispatchers.resetAttributes.bind(this)

    this.resetRelationships = this._dispatchers.resetRelationships.bind(this)
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

  getRecord () {
    return this._record
  }
}

export * from './types'
