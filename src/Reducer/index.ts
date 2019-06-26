import produce from "immer"

import { IRecord } from '../Record'
import { TYPES } from '../Dispatcher/types'
import { getRelationship, hasRelationship, removeHasMany } from '../Record/helpers'

export class Reducer {
  reduce (record: IRecord, action: any) {
    return produce(record, draft => {
      switch (action.type) {
        case TYPES.SET_ATTRIBUTE:
          draft.attributes[action.attribute] = action.value
          break

        case TYPES.ADD_HAS_ONE:
          if (hasRelationship.call(draft, action.relationship)) {
            draft.relationships![action.relationship].data = action.recordIdentifier
          } else if (draft.relationships) {
            draft.relationships[action.relationship] = { data: action.recordIdentifier }
          } else {
            draft.relationships = {
              [action.relationship]: {
                data: action.recordIdentifier
              }
            }
          }
          break

        case TYPES.ADD_HAS_MANY:
          if (hasRelationship.call(draft, action.relationship)) {
            draft.relationships![action.relationship].data.push(action.recordIdentifier)
          } else if (draft.relationships) {
            draft.relationships[action.relationship] = { data: [ action.recordIdentifier ] }
          } else {
            draft.relationships = {
              [action.relationship]: {
                data: [ action.recordIdentifier ]
              }
            }
          }
          break

        case TYPES.REMOVE_RELATIONSHIP:
          if (hasRelationship.call(draft, action.relationship)) {
            draft.relationships![action.relationship].data = Array.isArray(getRelationship.call(draft, action.relationship))
               ? removeHasMany.call(draft, action.relationship, action.relatedId)
               : {}
          }
      }
    })
  }
}