export interface RecordIdentifier {
  id?: string
  type: string
}

export interface IRecord extends RecordIdentifier {
  attributes: {
    [key: string]: any
  }
  relationships?: {
    [key: string]: any
  }
}