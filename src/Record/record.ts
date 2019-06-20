import produce from 'immer'

import { hasRelationship, getRelationship, removeHasMany, curryFn } from './helpers'
import { IRecord, Listener, RecordIdentifier } from './index'

export function createRecord (record: IRecord) {
  let _record = record
  let _listeners: Listener[] = []

  function notify (data: any) {
    _listeners.forEach((listener) => listener(data))
  }

  function subscribe (listener: Listener) {
    _listeners = _listeners.concat([listener])

    return function unSubscribe () {
      _listeners = _listeners.filter((registeredListener) => registeredListener !== listener)
    }
  }

  const self: any = {
    get id () {
      return _record.id
    },

    get type () {
      return _record.type
    },

    get attributes () {
      return _record.attributes
    },

    set attributes (attributes) {
      _record.attributes = attributes
    },

    get relationships () {
      return _record.relationships
    },

    set relationships (relationships) {
      _record.relationships = relationships
    },

    get record () {
      return { ..._record }
    },

    setAttribute: curryFn((attribute: string, value: any): typeof self => {
      _record = produce(_record, draft => {
        draft.attributes[attribute] = value
      })

      notify(_record)
      return self
    }),

    addHasOne: curryFn((relationship: string, recordIdentifier: RecordIdentifier): typeof self => {
      _record = produce<IRecord, void, IRecord>(_record, draft => {
        if (hasRelationship.call(draft, relationship)) {
          draft.relationships![relationship].data = recordIdentifier
        } else if (draft.relationships) {
          draft.relationships[relationship] = { data: recordIdentifier }
        } else {
          draft.relationships = {
            [relationship]: {
              data: recordIdentifier
            }
          }
        }
      })

      notify(_record)
      return self
    }),

    addHasMany: curryFn((relationship: string, recordIdentifier: RecordIdentifier): typeof self => {
      _record = produce<IRecord, void, IRecord>(_record, draft => {
        if (hasRelationship.call(draft, relationship)) {
          draft.relationships![relationship].data.push(recordIdentifier)
        } else if (draft.relationships) {
          draft.relationships[relationship] = { data: [ recordIdentifier ] }
        } else {
          draft.relationships = {
            [relationship]: {
              data: [ recordIdentifier ]
            }
          }
        }
      })

      notify(_record)
      return self
    }),

    removeRelationship: curryFn((relationship: string, relatedId: string): typeof self => {
      _record = produce<IRecord, void, IRecord>(_record, draft => {
        if (hasRelationship.call(draft, relationship)) {
          draft.relationships![relationship].data = Array.isArray(getRelationship.call(draft, relationship))
             ? removeHasMany.call(draft, relationship, relatedId)
             : {}
        }
      })

      notify(_record)
      return self
    })
  }

  return [self, subscribe]
}