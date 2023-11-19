export type BaseResponseT<T = {}> = {
  resultCode: ResultCodes
  messages: string[]
  fieldsErrors: { field: string; error: string }[]
  data: T
}

export type ItemsResponseT<T = {}> = {
  items: T
  totalCount: number
  error: string
}

export enum ResultCodes {
  Success = 0,
  Error = 1,
}