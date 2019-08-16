import { curry } from 'ramda'

import { Record, RecordIdentifier } from '../Record'
import { CurriedDispatchers } from './types'

import { 
  ActionPayload, 
  ActionType, 
  ActionTypes, 
  SET_ATTRIBUTE, 
  ADD_HAS_ONE, 
  ADD_HAS_MANY, 
  REMOVE_RELATIONSHIP,
  RESET,
  RESET_ATTRIBUTES,
  RESET_RELATIONSHIPS,
  ReducerFunction
 } from './types'

export class Dispatcher {
  create (this: Record<CurriedDispatchers>, reducer: ReducerFunction<ActionTypes>) {
    return {
      setAttribute: curry((attribute: string, value: any) => {
        reducer({
          type: SET_ATTRIBUTE,
          attribute,
          value
        })

        return this
      }),
      addHasOne: curry((relationship: string, recordIdentifier: RecordIdentifier) => {
        reducer({
          type: ADD_HAS_ONE,
          relationship,
          recordIdentifier
        })

        return this
      }),
      addHasMany: curry((relationship: string, recordIdentifier: RecordIdentifier) => {
        reducer({
          type: ADD_HAS_MANY,
          relationship,
          recordIdentifier
        })

        return this
      }),
      removeRelationship: curry((relationship: string, relatedId: string) => {
        reducer({
          type: REMOVE_RELATIONSHIP,
          relationship,
          relatedId
        })

        return this
      }),
      reset () {
        reducer({
          type: RESET,
        })

        return this
      },
      resetAttributes (attributes: string|string[]) {
        reducer({
          type: RESET_ATTRIBUTES,
          attributes
        })

        return this
      },
      resetRelationships (relationships: string|string[]) {
        reducer({
          type: RESET_RELATIONSHIPS,
          relationships
        })

        return this
      }
    }
  }
}

export { 
  ActionPayload, 
  ActionType, 
  ActionTypes, 
  SET_ATTRIBUTE, 
  ADD_HAS_ONE, 
  ADD_HAS_MANY, 
  REMOVE_RELATIONSHIP }
  
export * from './types'