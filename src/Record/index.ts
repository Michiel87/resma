import { IRecord, Dispatchers, DispatcherFactory } from './types'

export class Record<D> {
  _record: IRecord
  _dispatchers: Dispatchers<D>

  setAttribute: ReturnType<Dispatchers<D>['setAttribute']>
  addHasOne: ReturnType<Dispatchers<D>['addHasOne']>
  addHasMany: ReturnType<Dispatchers<D>['addHasMany']>
  removeRelationship: ReturnType<Dispatchers<D>['removeRelationship']>
  reset: ReturnType<Dispatchers<D>['reset']>
  resetAttributes: ReturnType<Dispatchers<D>['resetAttributes']>
  resetRelationships: ReturnType<Dispatchers<D>['resetRelationships']>
  
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
      .bind(this) as ReturnType<Dispatchers<D>['reset']>

    this.resetAttributes = this._dispatchers.resetAttributes
      .bind(this) as ReturnType<Dispatchers<D>['resetAttributes']>

    this.resetRelationships = this._dispatchers.resetRelationships
      .bind(this) as ReturnType<Dispatchers<D>['resetRelationships']>
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
