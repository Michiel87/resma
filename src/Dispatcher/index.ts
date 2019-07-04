import { ActionPayload, ActionType, ActionTypes, SET_ATTRIBUTE, ADD_HAS_ONE, ADD_HAS_MANY, REMOVE_RELATIONSHIP } from './types'
import { RecordIdentifier} from '../Record/types'
import { curry } from '../utils/curry'


export type ReducerFunction<T> = (action: ActionType & ActionPayload<T>) => void

export class Dispatcher {
  create (reducer: ReducerFunction<ActionTypes>) {
    return {
      setAttribute: curry((attribute: string, value: any) => {
        reducer({
          type: SET_ATTRIBUTE,
          attribute,
          value
        })
      }),
      addHasOne: curry((relationship: string, recordIdentifier: RecordIdentifier) => {
        reducer({
          type: ADD_HAS_ONE,
          relationship,
          recordIdentifier
        })
      }),
      addHasMany: curry((relationship: string, recordIdentifier: RecordIdentifier) => {
        reducer({
          type: ADD_HAS_MANY,
          relationship,
          recordIdentifier
        })
      }),
      removeRelationship: curry((relationship: string, relatedId: string) => {
        reducer({
          type: REMOVE_RELATIONSHIP,
          relationship,
          relatedId
        })
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

let ho

if (typeof curry === 'function') {
  ho = 10
} else {
  ho = 11
}