import produce from "immer"

import { IRecord } from '../Record/types'
import { getRelationship, hasRelationship, removeHasMany } from '../Record/helpers'
import { ActionTypes, SET_ATTRIBUTE, ADD_HAS_ONE, ADD_HAS_MANY, REMOVE_RELATIONSHIP } from '../Dispatcher'

export class Reducer {
  reduce (record: IRecord, action: ActionTypes) {
    return produce(record, draft => {
      switch (action.type) {
        case SET_ATTRIBUTE:
          draft.attributes[action.attribute] = action.value
          break

        case ADD_HAS_ONE:
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

        case ADD_HAS_MANY:
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

        case REMOVE_RELATIONSHIP:
          if (hasRelationship.call(draft, action.relationship)) {
            draft.relationships![action.relationship].data = Array.isArray(getRelationship.call(draft, action.relationship))
               ? removeHasMany.call(draft, action.relationship, action.relatedId)
               : {}
          }
      }
    })
  }
}