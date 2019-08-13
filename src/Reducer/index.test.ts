import { Reducer } from './'
import { SET_ATTRIBUTE, ADD_HAS_ONE, ADD_HAS_MANY } from '../Dispatcher'

const reducer = new Reducer()

describe('Reducer', () => {
  test('SET_ATTRIBUTE', () => {
    const record = {
      type: 'company',
      attributes: {
        language: 'english'
      }
    }
    const initialState = {
      type: 'company',
      attributes: {}
    }
    const reducerRecord = { record, initialState }

    const action = {
      type: SET_ATTRIBUTE as typeof SET_ATTRIBUTE,
      attribute: 'name',
      value: 'Exivity'
    }

    const newRecord = reducer.reduce(reducerRecord, action)

    expect(newRecord).not.toBe(record)
    expect(newRecord).toEqual({
      type: 'company',
      attributes: {
        name: 'Exivity',
        language: 'english'
      }
    })
  })

  test('ADD_HAS_ONE - new relationship', () => {
    const record = {
      type: 'company',
      attributes: {}
    }

    const initialState = {
      type: 'company',
      attributes: {}
    }

    const ceo = {
      type: 'ceo',
      id: '1'
    }

    const reducerRecord = { record, initialState }

    const action = {
      type: ADD_HAS_ONE as typeof ADD_HAS_ONE,
      relationship: 'ceo',
      recordIdentifier: ceo
    }

    const newRecord = reducer.reduce(reducerRecord, action)

    expect(newRecord).not.toBe(record)
    expect(newRecord).toEqual({
      type: 'company',
      attributes: {},
      relationships: {
        ceo: {
          data: ceo
        }
      }
    })
  })

  test('ADD_HAS_ONE - replace relationship', () => {
    const record = {
      type: 'company',
      attributes: {},
      relationships: {
        ceo: {
          data: { type: 'ceo', id: '45' }
        }
      }
    }

    const initialState = {
      type: 'company',
      attributes: {}
    }

    const ceo = {
      type: 'ceo',
      id: '1'
    }

    const reducerRecord = { record, initialState }

    const action = {
      type: ADD_HAS_ONE as typeof ADD_HAS_ONE,
      relationship: 'ceo',
      recordIdentifier: ceo
    }

    const newRecord = reducer.reduce(reducerRecord, action)

    expect(newRecord).not.toBe(record)
    expect(newRecord).toEqual({
      type: 'company',
      attributes: {},
      relationships: {
        ceo: {
          data: ceo
        }
      }
    })
  })

  test('ADD_HAS_ONE - keeps other relations intact', () => {
    const employees = {
      data: [
        { type: 'employee', id: '1' },
        { type: 'employee', id: '2' },
      ]
    }

    const record = {
      type: 'company',
      attributes: {},
      relationships: {
        employees
      }
    }

    const initialState = {
      type: 'company',
      attributes: {}
    }

    const ceo = {
      type: 'ceo',
      id: '1'
    }

    const reducerRecord = { record, initialState }

    const action = {
      type: ADD_HAS_ONE as typeof ADD_HAS_ONE,
      relationship: 'ceo',
      recordIdentifier: ceo
    }

    const newRecord = reducer.reduce(reducerRecord, action)

    expect(newRecord).not.toBe(record)
    expect(newRecord).toEqual({
      type: 'company',
      attributes: {},
      relationships: {
        employees,
        ceo: {
          data: ceo
        }
      }
    })
  })

  test('ADD_HAS_MANY - new relationship', () => {
    const record = {
      type: 'company',
      attributes: {}
    }

    const initialState = {
      type: 'company',
      attributes: {}
    }

    const employee = {
      type: 'employee',
      id: '1'
    }

    const reducerRecord = { record, initialState }

    const action = {
      type: ADD_HAS_MANY as typeof ADD_HAS_MANY,
      relationship: 'employees',
      recordIdentifier: employee
    }

    const newRecord = reducer.reduce(reducerRecord, action)

    expect(newRecord).not.toBe(record)
    expect(newRecord).toEqual({
      type: 'company',
      attributes: {},
      relationships: {
        employees: {
          data: [employee]
        }
      }
    })
  })

  test('ADD_HAS_MANY - add to relationship', () => {
    const record = {
      type: 'company',
      attributes: {},
      relationships: {
        employees: {
          data: [{ type: 'employee', id: '45' }]
        }
      }
    }

    const initialState = {
      type: 'company',
      attributes: {}
    }

    const employee = {
      type: 'employee',
      id: '1'
    }

    const reducerRecord = { record, initialState }

    const action = {
      type: ADD_HAS_MANY as typeof ADD_HAS_MANY,
      relationship: 'employees',
      recordIdentifier: employee
    }

    const newRecord = reducer.reduce(reducerRecord, action)

    expect(newRecord).not.toBe(record)
    expect(newRecord).toEqual({
      type: 'company',
      attributes: {},
      relationships: {
        employees: {
          data: [{ type: 'employee', id: '45' }, employee]
        }
      }
    })
  })

  test('ADD_HAS_MANY - keeps other relations intact', () => {
    const ceo = {
      data: {
        type: 'ceo',
        id: '1'
      }
    }

    const record = {
      type: 'company',
      attributes: {},
      relationships: {
        ceo
      }
    }

    const initialState = {
      type: 'company',
      attributes: {}
    }

    const employee = {
      type: 'employee',
      id: '1'
    }

    const reducerRecord = { record, initialState }

    const action = {
      type: ADD_HAS_MANY as typeof ADD_HAS_MANY,
      relationship: 'employees',
      recordIdentifier: employee
    }

    const newRecord = reducer.reduce(reducerRecord, action)

    expect(newRecord).not.toBe(record)
    expect(newRecord).toEqual({
      type: 'company',
      attributes: {},
      relationships: {
        ceo,
        employees: {
          data: [employee]
        }
      }
    })
  })
})
