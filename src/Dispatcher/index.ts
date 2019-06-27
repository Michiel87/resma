import { RecordIdentifier } from '../Record'
import { ActionPayload, ActionType, ActionTypes, SET_ATTRIBUTE, ADD_HAS_ONE, ADD_HAS_MANY, REMOVE_RELATIONSHIP } from './types'

export type ReducerFunction<T> = (action: ActionType & ActionPayload<T>) => void

export class Dispatcher {
  create (reducer: ReducerFunction<ActionTypes>) {
    return {
      setAttribute (attribute: string, value: any): void {
        reducer({
          type: SET_ATTRIBUTE,
          attribute,
          value
        })
      },
      addHasOne (relationship: string, recordIdentifier: RecordIdentifier): void {
        reducer({
          type: ADD_HAS_ONE,
          relationship,
          recordIdentifier
        })
      },
      addHasMany (relationship: string, recordIdentifier: RecordIdentifier): void  {
        reducer({
          type: ADD_HAS_MANY,
          relationship,
          recordIdentifier
        })
      },
      removeRelationship (relationship: string, relatedId: string) {
        reducer({
          type: REMOVE_RELATIONSHIP,
          relationship,
          relatedId
        })
      }
    }
  }
}

export { ActionPayload, ActionType, ActionTypes, SET_ATTRIBUTE, ADD_HAS_ONE, ADD_HAS_MANY, REMOVE_RELATIONSHIP }