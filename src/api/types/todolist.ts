export type BaseResponseT<T = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: T
}

export type ItemsResponseT<T = {}> = {
  items: T[]
  totalCount: number
  error: string
}
