import { IRecord } from '../Record'
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

export class Store {
  _dispatcher: Dispatcher
  _reducer: Reducer
  _store: any
  _initialStateStore: any
  _subscriptions: any
  _uId: number

  constructor ({ dispatcher, reducer, options = {}}: StoreProps) {
    this._dispatcher = dispatcher
    this._reducer = reducer
    this._store = options.store || {}
    this._initialStateStore = options.store || {}
    this._subscriptions = {}
    this._uId = options.startId || 0
  }

  register (record: IRecord): number {
    const id = this._uId++
    this._store[id] = record
    this._initialStateStore[id] = record 

    return id
  }

  getRecord (id: number) {
    return this._store[id]
  }

  subscribe (id: number, subscription: Subscription, unSubscribeDelay?: number): () => Promise<IRecord> {
    this._subscriptions[id] = subscription
    subscription(this._store[id])

    return () => this.unSubscribe(id, unSubscribeDelay)
  }

  unSubscribe (id: number, unSubscribeDelay: number = 0): Promise<IRecord> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const record = this.getRecord(id)
        delete this._subscriptions[id]
        delete this._store[id]
        delete this._initialStateStore[id]
        resolve(record)
      }, unSubscribeDelay)
    })
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
      const initialState = self._initialStateStore[id]
      const newRecordState = self._reducer.reduce({ record, initialState }, action)

      self._store[id] = newRecordState

      if (self._subscriptions[id]) {
        self._subscriptions[id](newRecordState)
      }
    }
  }
}