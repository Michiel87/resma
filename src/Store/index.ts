import { IRecord } from '../Record/types'
import { Dispatcher } from '../Dispatcher'
import { Reducer } from '../Reducer'

export interface StoreProps {
  dispatcher: Dispatcher
  reducer: Reducer
  options?: {
    startId? : number
    store?: {
      [key: number]: IRecord
    }
  }
}

export type Subscription = (record: IRecord) => void

// @todo create separate Dispatcher type
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

  getRecord (id: number) {
    return this._store[id]
  }

  subscribe (id: number, subscription: Subscription): () => void {
    this._subscriptions[id] = subscription

    return () => this.unSubscribe(id)
  }

  unSubscribe (id: number) {
    delete this._subscriptions[id]
    delete this._store[id]
  }

  getDispatcherFactory (storeId: number) {
    const self = this

    return {
      create: function (context: any) {
        return self._dispatcher.create.call(context, self.storeReducer(storeId))
      }
    }
  }

  storeReducer (id: number) {
    const self = this

    return function reducer (action: any) {
      const record = self._store[id]
      const newRecordState = self._reducer.reduce(record, action)

      self._store[id] = newRecordState
      self._subscriptions[id](newRecordState)
    }
  }
}