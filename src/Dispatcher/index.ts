import { ActionPayload, ActionType, ActionTypes, SET_ATTRIBUTE, ADD_HAS_ONE, ADD_HAS_MANY, REMOVE_RELATIONSHIP } from './types'
import { RecordIdentifier} from '../Record/types'
import { Curry } from '../utils/curry'
import { curry } from 'ramda'
import { Record } from '../Record'

export type ReducerFunction<T> = (action: ActionType & ActionPayload<T>) => void

export type CurriedDispatchers = {
  setAttribute: Curry<(attribute: string, value: any) => Record<CurriedDispatchers>>,
  addHasOne: Curry<(relationship: string, recordIdentifier: RecordIdentifier) => Record<CurriedDispatchers>>,
  addHasMany: Curry<(relationship: string, recordIdentifier: RecordIdentifier) => Record<CurriedDispatchers>>,
  removeRelationship: Curry<(relationship: string, relatedId: string) => Record<CurriedDispatchers>>,
  reset: (attribute: string, value: any) => Record<CurriedDispatchers>,
  resetAttributes: (attributes: string|string[]) => Record<CurriedDispatchers>,
  resetRelationships: (relationships: string|string[]) => Record<CurriedDispatchers>
}

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
        return this
      },
      resetAttributes (attributes: string|string[]) {
        return this
      },
      resetRelationships (relationships: string|string[]) {
        return this
      }
    }
  }
}

export { ActionPayload, ActionType, ActionTypes, SET_ATTRIBUTE, ADD_HAS_ONE, ADD_HAS_MANY, REMOVE_RELATIONSHIP }
export * from './types'