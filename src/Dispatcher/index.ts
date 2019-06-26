import { RecordIdentifier } from '../Record'
import { TYPES } from './types'

export class Dispatcher {
  create (reducer: any) {
    return {
      setAttribute (attribute: string, value: any): void {
        reducer({
          type: TYPES.SET_ATTRIBUTE,
          attribute,
          value
        })
      },
      addHasOne (relationship: string, recordIdentifier: RecordIdentifier): void {
        reducer({
          type: TYPES.ADD_HAS_ONE,
          relationship,
          recordIdentifier
        })
      },
      addHasMany (relationship: string, recordIdentifier: RecordIdentifier): void  {
        reducer({
          type: TYPES.ADD_HAS_MANY,
          relationship,
          recordIdentifier
        })
      },
      removeRelationship (relationship: string, relatedId: string) {
        reducer({
          type: TYPES.REMOVE_RELATIONSHIP,
          relationship,
          relatedId
        })
      }
    }
  }
}