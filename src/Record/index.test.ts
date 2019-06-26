import { IRecord, Record } from './index'
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

const store = new Store({ dispatcher: new Dispatcher(), reducer: new Reducer() })

describe('Record class', () => {
  test('record keeps reference if nothing changes', () => {
    const record = new Record(testRecord, {})
    expect(record._record).toBe(testRecord)
  })

  test('Getting record id', () => {
    const record = new Record(testRecord, {})
    expect(record.id).toBe('12')
  })

  test('Getting record type', () => {
    const record = new Record(testRecord, {})
    expect(record.type).toBe('company')
  })

  test('Getting attributes', () => {
    const record = new Record(testRecord, {})
    expect(record.attributes).toBe(record.attributes)
  })

  test('Getting relationships', () => {
    const record = new Record(testRecord, {})
    expect(record.relationships).toBe(record.relationships)
  })

  test('setAtrribute', () => {
    let storeId: any
    let storeRecord: any

    const unSubscribe = store.subscribe(testRecord, (id: string, record: IRecord) => {
      storeId = id
      storeRecord = record
    })

    const record = new Record(storeRecord, store.dispatcher(storeId))

    record.setAttribute('name', 'cloud company')
    record.setAttribute('newAttr', 'fake value')

    expect(storeRecord.attributes.name).toBe('cloud company')
    expect(storeRecord.attributes.newAttr).toBe('fake value')
    expect(storeRecord._record).not.toBe(testRecord)
    unSubscribe()
  })

  test('setAtrribute curried functionality', () => {
    let storeId: any
    let storeRecord: any

    const unSubscribe = store.subscribe(testRecord, (id: string, record: IRecord) => {
      storeId = id
      storeRecord = record
    })

    const record = new Record(storeRecord, store.dispatcher(storeId))

    record.setAttribute('name')('cloud company')
    record.setAttribute('newAttr')('fake value')

    expect(storeRecord.attributes.name).toBe('cloud company')
    expect(storeRecord.attributes.newAttr).toBe('fake value')
    expect(storeRecord._record).not.toBe(testRecord)
    unSubscribe()
  })

  test('addHasOne', () => {
    let storeId: any
    let storeRecord: any

    const unSubscribe = store.subscribe(testRecord, (id: string, record: IRecord) => {
      storeId = id
      storeRecord = record
    })

    const record = new Record(storeRecord, store.dispatcher(storeId))

    const newCeo = { type: 'ceo', id: '3'}
    const newRel = { type: 'newRel', id: '1' }

    record.addHasOne('ceo', newCeo)
    record.addHasOne('newRel', newRel)

    expect(storeRecord.relationships && storeRecord.relationships.ceo.data).toBe(newCeo)
    expect(storeRecord.relationships && storeRecord.relationships.newRel.data).toBe(newRel)
    expect(storeRecord._record).not.toBe(testRecord)
    unSubscribe()
  })

  test('addHasOne curried functionality', () => {
    let storeId: any
    let storeRecord: any

    const unSubscribe = store.subscribe(testRecord, (id: string, record: IRecord) => {
      storeId = id
      storeRecord = record
    })

    const record = new Record(storeRecord, store.dispatcher(storeId))

    const newCeo = { type: 'ceo', id: '3'}
    const newRel = { type: 'newRel', id: '1' }

    record.addHasOne('ceo')(newCeo)
    record.addHasOne('newRel')(newRel)

    expect(storeRecord.relationships && storeRecord.relationships.ceo.data).toBe(newCeo)
    expect(storeRecord.relationships && storeRecord.relationships.newRel.data).toBe(newRel)
    expect(storeRecord._record).not.toBe(testRecord)
    unSubscribe()
  })

  test('addHasMany', () => {
    let storeId: any
    let storeRecord: any

    const unSubscribe = store.subscribe(testRecord, (id: string, record: IRecord) => {
      storeId = id
      storeRecord = record
    })

    const record = new Record(storeRecord, store.dispatcher(storeId))

    const newEmployee = { type: 'employee', id: '2'}
    const newRel = { type: 'newRel', id: '1' }

    record.addHasMany('employees', newEmployee)
    record.addHasMany('newRel', newRel)

    expect(storeRecord.relationships && storeRecord.relationships.employees.data)
       .toEqual([{ type: 'employee', id: '1' }, newEmployee])
    expect(storeRecord.relationships && storeRecord.relationships.newRel.data).toEqual([newRel])
    expect(storeRecord._record).not.toBe(testRecord)
    unSubscribe()
  })

  test('addHasMany curried functionality', () => {
    let storeId: any
    let storeRecord: any

    const unSubscribe = store.subscribe(testRecord, (id: string, record: IRecord) => {
      storeId = id
      storeRecord = record
    })

    const record = new Record(storeRecord, store.dispatcher(storeId))

    const newEmployee = { type: 'employee', id: '2'}
    const newRel = { type: 'newRel', id: '1' }

    record.addHasMany('employees')(newEmployee)
    record.addHasMany('newRel')(newRel)

    expect(storeRecord.relationships && storeRecord.relationships.employees.data)
       .toEqual([{ type: 'employee', id: '1' }, newEmployee])
    expect(storeRecord.relationships && storeRecord.relationships.newRel.data).toEqual([newRel])
    expect(storeRecord._record).not.toBe(testRecord)
    unSubscribe()
  })

  test('removeRelationship', () => {
    let storeId: any
    let storeRecord: any

    const unSubscribe = store.subscribe(testRecord, (id: string, record: IRecord) => {
      storeId = id
      storeRecord = record
    })

    const record = new Record(storeRecord, store.dispatcher(storeId))

    record.removeRelationship('employees', '1')
    record.removeRelationship('ceo', '1')

    expect(storeRecord.relationships && storeRecord.relationships.employees.data).toEqual([])
    expect(storeRecord.relationships && storeRecord.relationships.ceo.data).toEqual({})
    expect(storeRecord._record).not.toBe(testRecord)
    unSubscribe()
  })

  test('removeRelationship curried functionality', () => {
    let storeId: any
    let storeRecord: any

    const unSubscribe = store.subscribe(testRecord, (id: string, record: IRecord) => {
      storeId = id
      storeRecord = record
    })

    const record = new Record(storeRecord, store.dispatcher(storeId))

    record.removeRelationship('employees')('1')
    record.removeRelationship('ceo')('1')

    expect(storeRecord.relationships && storeRecord.relationships.employees.data).toEqual([])
    expect(storeRecord.relationships && storeRecord.relationships.ceo.data).toEqual({})
    expect(storeRecord._record).not.toBe(testRecord)
    unSubscribe()
  })

  test('chaining methods', () => {
    let storeId: any
    let storeRecord: any

    const unSubscribe = store.subscribe(testRecord, (id: string, record: IRecord) => {
      storeId = id
      storeRecord = record
    })

    const record = new Record(storeRecord, store.dispatcher(storeId))

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

