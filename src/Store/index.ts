import { IRecord } from '../Record'
import { Dispatcher } from '../Dispatcher'
import { Reducer } from '../Reducer'

export interface StoreProps {
  dispatcher: Dispatcher
  reducer: Reducer
  options?: {
    startId? : number
    store?: object
  }
}

export class Store {
  _dispatcher: Dispatcher
  _reducer: Reducer
  _store: any
  _subscriptions: any
  _uId: number

  constructor ({ dispatcher, reducer, options = {}}: StoreProps) {
    this._dispatcher = dispatcher
    this._reducer = reducer
    this._store = options.store || {}
    this._subscriptions = {}
    this._uId = options.startId || 0
  }

  subscribe (record: IRecord, subscription: any) {
    const id = this._uId++
    const self = this

    this._store[id] = record
    this._subscriptions[id] = subscription

    subscription(id, record)

    return function unSubscribe () {
      delete self._subscriptions[id]
      delete self._store[id]
    }
  }

  dispatcher (storeId: string) {
    return this._dispatcher.create(this.storeReducer(storeId))
  }

  storeReducer (id: string) {
    const self = this

    return function reducer (action: any) {
      const record = self._store[id]
      const newRecordState = self._reducer.reduce(record, action)

      self._store[id] = newRecordState
      // @todo validate if listener ref stays the same
      self._subscriptions[id](id, newRecordState)
    }
  }
}