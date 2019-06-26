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

  register (record: IRecord): number {
    const id = this._uId++
    this._store[id] = record

    return id
  }

  subscribe (id: number, subscription: any) {
    const self = this
    this._subscriptions[id] = subscription

    return function unSubscribe () {
      delete self._subscriptions[id]
      delete self._store[id]
    }
  }

  unSubscribe (id: number) {
    delete this._subscriptions[id]
    delete this._store[id]
  }

  dispatcher (storeId: number) {
    return this._dispatcher.create(this.storeReducer(storeId))
  }

  storeReducer (id: number) {
    const self = this

    return function reducer (action: any) {
      const record = self._store[id]
      const newRecordState = self._reducer.reduce(record, action)

      self._store[id] = newRecordState
      // @todo validate if listener ref stays the same
      self._subscriptions[id](newRecordState)
    }
  }
}