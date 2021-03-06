import { Record } from './index'
import { IRecord } from './types'
import { Store } from '../Store'
import { Reducer } from '../Reducer'
import { Dispatcher } from '../Dispatcher'

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

const fakeDispatcher = dispatcher

describe('Record class', () => {
  test('record keeps reference if nothing changes', () => {
    const record = new Record(testRecord, fakeDispatcher)
    expect(record.getRecord()).toBe(testRecord)
  })

  test('Getting record id', () => {
    const record = new Record(testRecord, fakeDispatcher)
    expect(record.id).toBe('12')
  })

  test('Getting record type', () => {
    const record = new Record(testRecord, fakeDispatcher)
    expect(record.type).toBe('company')
  })

  test('Getting attributes', () => {
    const record = new Record(testRecord, fakeDispatcher)
    expect(record.attributes).toBe(record.attributes)
  })

  test('Getting relationships', () => {
    const record = new Record(testRecord, fakeDispatcher)
    expect(record.relationships).toBe(record.relationships)
  })

  test('setAtrribute', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))

    record.setAttribute('name', 'cloud company')
    record.setAttribute('newAttr', 'fake value')

    expect(storeRecord.attributes.name).toBe('cloud company')
    expect(storeRecord.attributes.newAttr).toBe('fake value')
    expect(storeRecord).not.toBe(testRecord)
    unSubscribe()
  })

  test('setAtrribute curried functionality', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))

    record.setAttribute('name')('cloud company')
    record.setAttribute('newAttr')('fake value')

    expect(storeRecord.attributes.name).toBe('cloud company')
    expect(storeRecord.attributes.newAttr).toBe('fake value')
    expect(storeRecord).not.toBe(testRecord)
    unSubscribe()
  })

  test('addHasOne', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))

    const newCeo = { type: 'ceo', id: '3'}
    const newRel = { type: 'newRel', id: '1' }

    record.addHasOne('ceo', newCeo)
    record.addHasOne('newRel', newRel)

    expect(storeRecord.relationships && storeRecord.relationships.ceo.data).toBe(newCeo)
    expect(storeRecord.relationships && storeRecord.relationships.newRel.data).toBe(newRel)
    expect(storeRecord).not.toBe(testRecord)
    unSubscribe()
  })

  test('addHasOne curried functionality', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))

    const newCeo = { type: 'ceo', id: '3'}
    const newRel = { type: 'newRel', id: '1' }

    record.addHasOne('ceo')(newCeo)
    record.addHasOne('newRel')(newRel)

    expect(storeRecord.relationships && storeRecord.relationships.ceo.data).toBe(newCeo)
    expect(storeRecord.relationships && storeRecord.relationships.newRel.data).toBe(newRel)
    expect(storeRecord).not.toBe(testRecord)
    unSubscribe()
  })

  test('addHasMany', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))

    const newEmployee = { type: 'employee', id: '2'}
    const newRel = { type: 'newRel', id: '1' }

    record.addHasMany('employees', newEmployee)
    record.addHasMany('newRel', newRel)

    expect(storeRecord.relationships && storeRecord.relationships.employees.data)
       .toEqual([{ type: 'employee', id: '1' }, newEmployee])
    expect(storeRecord.relationships && storeRecord.relationships.newRel.data).toEqual([newRel])
    expect(storeRecord).not.toBe(testRecord)
    unSubscribe()
  })

  test('addHasMany curried functionality', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))

    const newEmployee = { type: 'employee', id: '2'}
    const newRel = { type: 'newRel', id: '1' }

    record.addHasMany('employees')(newEmployee)
    record.addHasMany('newRel')(newRel)

    expect(storeRecord.relationships && storeRecord.relationships.employees.data)
       .toEqual([{ type: 'employee', id: '1' }, newEmployee])
    expect(storeRecord.relationships && storeRecord.relationships.newRel.data).toEqual([newRel])
    expect(storeRecord).not.toBe(testRecord)
    unSubscribe()
  })

  test('removeRelationship', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))

    record.removeRelationship('employees', '1')
    record.removeRelationship('ceo', '1')

    expect(storeRecord.relationships && storeRecord.relationships.employees.data).toEqual([])
    expect(storeRecord.relationships && storeRecord.relationships.ceo.data).toEqual({})
    expect(storeRecord).not.toBe(testRecord)
    unSubscribe()
  })

  test('removeRelationship curried functionality', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))

    record.removeRelationship('employees')('1')
    record.removeRelationship('ceo')('1')

    expect(storeRecord.relationships && storeRecord.relationships.employees.data).toEqual([])
    expect(storeRecord.relationships && storeRecord.relationships.ceo.data).toEqual({})
    expect(storeRecord).not.toBe(testRecord)
    unSubscribe()
  })

  test('setRelationship', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))

    record.setRelationship('employees', [])
    record.setRelationship('ceo', {})

    expect(storeRecord.relationships && storeRecord.relationships.employees.data).toEqual([])
    expect(storeRecord.relationships && storeRecord.relationships.ceo.data).toEqual({})
    expect(storeRecord).not.toBe(testRecord)
    unSubscribe()
  })

  test('setRelationship curried functionality', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))

    record.setRelationship('employees')([])
    record.setRelationship('ceo')({})

    expect(storeRecord.relationships && storeRecord.relationships.employees.data).toEqual([])
    expect(storeRecord.relationships && storeRecord.relationships.ceo.data).toEqual({})
    expect(storeRecord).not.toBe(testRecord)
    unSubscribe()
  })

  test('reset', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))
    const newPhoto = { type: 'photo', id: '1'}

    record
      .setAttribute('name', 'cloud company')
      .addHasMany('photos', newPhoto)
      .reset()

    expect(storeRecord.attributes.name).toBe('exivity')
    expect(storeRecord.relationships.ceo.data).toEqual({ type: 'ceo', id: '1' })
    expect(storeRecord.relationships.photos).toBe(undefined)
    expect(storeRecord).not.toBe(testRecord)
    unSubscribe()
  })

  test('resetAttributes', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))

    record
      .setAttribute('one', 'one')
      .setAttribute('two', 'two')
      .setAttribute('three', 'three')
      .setAttribute('four', 'four')
      .resetAttributes('one')
      .resetAttributes(['three', 'four'])

    expect(storeRecord.attributes.name).toBe('exivity')
    expect(storeRecord.relationships.ceo.data).toEqual({ type: 'ceo', id: '1' })
    expect(storeRecord.attributes.one).toBe(undefined)
    expect(storeRecord.attributes.two).toBe('two')
    expect(storeRecord.attributes.three).toBe(undefined)
    expect(storeRecord.attributes.four).toBe(undefined)
    expect(storeRecord).not.toBe(testRecord)
    unSubscribe()
  })

  test('resetRelationships', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))

    record
      .addHasOne('one', { id: 'one', type: 'one' })
      .addHasOne('two', { id: 'two', type: 'two' })
      .addHasOne('three', { id: 'three', type: 'three' })
      .addHasOne('four', { id: 'four', type: 'four' })
      .resetRelationships('one')
      .resetRelationships(['three', 'four'])

    expect(storeRecord.attributes.name).toBe('exivity')
    expect(storeRecord.relationships.ceo.data).toEqual({ type: 'ceo', id: '1' })
    expect(storeRecord.relationships.one).toBe(undefined)
    expect(storeRecord.relationships.two.data).toEqual({ id: 'two', type: 'two' })
    expect(storeRecord.relationships.three).toBe(undefined)
    expect(storeRecord.relationships.four).toBe(undefined)
    expect(storeRecord).not.toBe(testRecord)
    unSubscribe()
  })

  test('chaining methods', () => {
    let storeRecord: any
    const storeId = store.register(testRecord)

    const unSubscribe = store.subscribe(storeId, (record: IRecord) => {
      storeRecord = record
    })

    const record = new Record(storeRecord, store.getDispatcherFactory(storeId))

    const newCeo = { type: 'ceo', id: '3'}
    const newPhoto = { type: 'photo', id: '1'}

    record
       .setAttribute('name', 'Michiel de Vos')
       .addHasOne('ceo', newCeo)
       .addHasMany('photos', newPhoto)
       .removeRelationship('employees', '1')

    expect(storeRecord.attributes.name).toBe('Michiel de Vos')
    expect(storeRecord.relationships && storeRecord.relationships.ceo.data).toBe(newCeo)
    expect(storeRecord.relationships && storeRecord.relationships.photos.data).toEqual([newPhoto])
    expect(storeRecord.relationships && storeRecord.relationships.employees.data).toEqual([])
    unSubscribe()
  })
})

