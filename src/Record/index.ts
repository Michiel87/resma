import { Dispatcher } from '../Dispatcher'

import { IRecord, DispatcherType } from './types'

export class Record<D> {
  private _record: IRecord
  private _dispatcher: DispatcherType<D>
  public setAttribute: ReturnType<DispatcherType<D>['setAttribute']>
  public addHasOne: ReturnType<DispatcherType<D>['addHasOne']>
  public addHasMany: ReturnType<DispatcherType<D>['addHasMany']>
  public removeRelationship: ReturnType<DispatcherType<D>['removeRelationship']>
  public reset: ReturnType<DispatcherType<D>['reset']>
  public resetAttributes: ReturnType<DispatcherType<D>['resetAttributes']>
  
  constructor (record: IRecord, dispatcher: DispatcherType<D>) {
    this._record = record
    this._dispatcher = dispatcher

    this.setAttribute = this._dispatcher.setAttribute
      .bind(this) as ReturnType<DispatcherType<D>['setAttribute']>

    this.addHasOne = this._dispatcher.addHasOne
      .bind(this) as ReturnType<DispatcherType<D>['addHasOne']>

    this.addHasMany = this._dispatcher.addHasMany
      .bind(this) as ReturnType<DispatcherType<D>['addHasMany']>

    this.removeRelationship = this._dispatcher.removeRelationship
      .bind(this) as ReturnType<DispatcherType<D>['removeRelationship']>

    this.reset = this._dispatcher.reset
      .bind(this) as ReturnType<DispatcherType<D>['reset']>

    this.resetAttributes = this._dispatcher.resetAttributes
      .bind(this) as ReturnType<DispatcherType<D>['resetAttributes']>

    this.resetRelationships = this._dispatcher.resetRelationships
      .bind(this) as ReturnType<DispatcherType<D>['resetRelationships']>
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

const rec = {
  type: 'budget',
  attributes: {
    name: 'michiel'
  }
}

// // @ts-ignore
// const record = new Record<ReturnType<Dispatcher['create']>>(rec, new Dispatcher().create((action) => ({})))

// const hal = record.setAttribute('string is een mooie')(123)



