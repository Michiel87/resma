import { IRecord, Dispatchers, DispatcherFactory } from './types'

// @todo Improve typings methods - make them dynamic and provide specified record types
export class Record<D> {
  _record: IRecord
  _dispatchers: Dispatchers<D>

  setAttribute: ReturnType<Dispatchers<D>['setAttribute']>
  addHasOne: ReturnType<Dispatchers<D>['addHasOne']>
  addHasMany: ReturnType<Dispatchers<D>['addHasMany']>
  removeRelationship: ReturnType<Dispatchers<D>['removeRelationship']>
  reset: Dispatchers<D>['reset']
  resetAttributes: Dispatchers<D>['resetAttributes']
  resetRelationships: Dispatchers<D>['resetRelationships']
  
  constructor (record: IRecord, dispatchers: DispatcherFactory<D>) {
    this._record = record
    this._dispatchers = dispatchers.create(this)

    this.setAttribute = this._dispatchers.setAttribute
      .bind(this) as ReturnType<Dispatchers<D>['setAttribute']>

    this.addHasOne = this._dispatchers.addHasOne
      .bind(this) as ReturnType<Dispatchers<D>['addHasOne']>

    this.addHasMany = this._dispatchers.addHasMany
      .bind(this) as ReturnType<Dispatchers<D>['addHasMany']>

    this.removeRelationship = this._dispatchers.removeRelationship
      .bind(this) as ReturnType<Dispatchers<D>['removeRelationship']>

    this.reset = this._dispatchers.reset
      .bind(this) as Dispatchers<D>['reset']

    this.resetAttributes = this._dispatchers.resetAttributes
      .bind(this) as Dispatchers<D>['resetAttributes']

    this.resetRelationships = this._dispatchers.resetRelationships
      .bind(this) as Dispatchers<D>['resetRelationships']
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
