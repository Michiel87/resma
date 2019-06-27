import { RecordIdentifier } from '../Record'

export const SET_ATTRIBUTE = 'SET_ATTRIBUTE'
export const ADD_HAS_ONE = 'ADD_HAS_ONE'
export const ADD_HAS_MANY = 'ADD_HAS_MANY'
export const REMOVE_RELATIONSHIP = 'REMOVE_RELATIONSHIP'

export interface ActionSetAttributes {
  type: typeof SET_ATTRIBUTE
  attribute: string
  value: any
}

export interface ActionAddHasOne {
  type: typeof ADD_HAS_ONE
  relationship: string,
  recordIdentifier: RecordIdentifier
}

export interface ActionAddHasMany {
  type: typeof ADD_HAS_MANY
  relationship: string,
  recordIdentifier: RecordIdentifier
}

export interface ActionRemoveRelationship {
  type: typeof REMOVE_RELATIONSHIP
  relationship: string,
  relatedId: string
}

export type ActionPayload<T> = T

export interface ActionType {
  type: string
}

export type ActionTypes = ActionSetAttributes | ActionAddHasOne | ActionAddHasMany | ActionRemoveRelationship
