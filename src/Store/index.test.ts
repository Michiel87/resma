import { Dispatcher } from '../Dispatcher'
import { Store } from './index'
import { Reducer } from '../Reducer'
import { IRecord } from '../Record'

const testRecord = {
  id: '12',
  type: 'company',
  attributes: {
    name: 'exivity'
  },
  relationships: {
    ceo: {
      data: {
        type: 'ceo',
        id: '1'
      },
    },
    employees: {
      data: [{ type: 'employee', id: '1' }]
    }
  }
}

const dispatcher = new Dispatcher()

const store = new Store({ dispatcher, reducer: new Reducer() })

describe('Store', () => {
  test('unSubscribing', async (done) => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    unSubscribe().then((record) => {
      expect(store.getRecord(storeId)).toBe(undefined)
      expect(record).toEqual(testRecord)
      done()
    })
  })

  test('unSubscribing with delay', async (done) => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    }, 200)

    unSubscribe()

    setTimeout(() => {
      expect(store.getRecord(storeId)).toEqual(testRecord)
    }, 150)

    setTimeout(() => {
      expect(store.getRecord(storeId)).toBe(undefined)
      done()
    },210)
  })
})