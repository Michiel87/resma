import produce from "immer"

import { IRecord } from '../Record'
import { getRelationship, hasRelationship, removeHasMany } from '../Record/helpers'

import { 
  ActionTypes, 
  SET_ATTRIBUTE, 
  ADD_HAS_ONE, 
  ADD_HAS_MANY, 
  REMOVE_RELATIONSHIP,
  SET_RELATIONSHIP,
  RESET, 
  RESET_ATTRIBUTES, 
  RESET_RELATIONSHIPS 
} from '../Dispatcher'

type ReduceRecord = {
  record: IRecord,
  initialState: IRecord
}

export class Reducer {
  reduce ({ record, initialState }: ReduceRecord, action: ActionTypes) {
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
          break

        case SET_RELATIONSHIP:
          if (hasRelationship.call(draft, action.relationship)) {
            draft.relationships![action.relationship].data = action.value
          } else {
            draft.relationships = {
              ...draft.relationships,
              [action.relationship]: {
                data: action.value
              }
            }
          }
          break

        case RESET:
          draft.attributes = initialState.attributes
          draft.relationships = initialState.relationships
          break

        case RESET_ATTRIBUTES:
          if (Array.isArray(action.attributes)) {
            action.attributes.forEach((attribute) => {
              if (initialState.attributes[attribute]) {
                draft.attributes[attribute] = initialState.attributes[attribute]
              } else {
                delete draft.attributes[attribute]
              }
            })
          } else if (initialState.attributes[action.attributes]) {
            draft.attributes[action.attributes] =  initialState.attributes[action.attributes]
          } else {
            delete draft.attributes[action.attributes]
          }
          break

        case RESET_RELATIONSHIPS:
          if (Array.isArray(action.relationships)) {
            action.relationships.forEach((relation) => {
              if (hasRelationship.call(initialState, relation)) {
                draft.relationships = {
                  ...draft.relationships,
                  [relation]: initialState.relationships![relation] 
                }
              } else {
                delete draft.relationships![relation]
              }
            })
          } else if (hasRelationship.call(initialState, action.relationships)) {
            draft.relationships = {
              ...draft.relationships,
              [action.relationships]: initialState.relationships![action.relationships]
            }
          } else {
            delete draft.relationships![action.relationships]
          }
          break
      }
    })
  }
}