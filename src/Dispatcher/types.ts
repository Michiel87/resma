import { RecordIdentifier } from '../Record/types'
import { Record } from '../Record'
import { Curry } from '../utils/curry'

export const SET_ATTRIBUTE = 'SET_ATTRIBUTE'
export const ADD_HAS_ONE = 'ADD_HAS_ONE'
export const ADD_HAS_MANY = 'ADD_HAS_MANY'
export const REMOVE_RELATIONSHIP = 'REMOVE_RELATIONSHIP'
export const RESET = 'RESET'
export const RESET_ATTRIBUTES = 'RESET_ATTRIBUTES'
export const RESET_RELATIONSHIPS = 'RESET_RELATIONSHIPS'

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

export interface ActionReset {
  type: typeof RESET
}

export interface ActionResetAttributes {
  type: typeof RESET_ATTRIBUTES
  attributes: string|string[]
}

export interface ActionResetRelationships {
  type: typeof RESET_RELATIONSHIPS
  relationships: string|string[]
}

export type ActionPayload<T> = T

export interface ActionType {
  type: string
}

export type ActionTypes = 
ActionSetAttributes | 
ActionAddHasOne | 
ActionAddHasMany | 
ActionRemoveRelationship |
ActionReset |
ActionResetAttributes |
ActionResetRelationships

export type ReducerFunction<T> = (action: ActionType & ActionPayload<T>) => void

export type CurriedDispatchers = {
  setAttribute: Curry<(attribute: string, value: any) => Record<CurriedDispatchers>>,
  addHasOne: Curry<(relationship: string, recordIdentifier: RecordIdentifier) => Record<CurriedDispatchers>>,
  addHasMany: Curry<(relationship: string, recordIdentifier: RecordIdentifier) => Record<CurriedDispatchers>>,
  removeRelationship: Curry<(relationship: string, relatedId: string) => Record<CurriedDispatchers>>,
  reset: () => Record<CurriedDispatchers>,
  resetAttributes: (attributes: string|string[]) => Record<CurriedDispatchers>,
  resetRelationships: (relationships: string|string[]) => Record<CurriedDispatchers>
}