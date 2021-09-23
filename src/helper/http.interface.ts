export type IdentifiableEntity<T = any> = {
  id: number
  createAt: Date
  updateAt: Date
} & T

// 包装Response
export type WrapperResponse<T> = {
  data: T
  status: number
  message: string
  success: boolean
}

export type BaseSearchRequest = {
  offset: number
  limit: number
  sortBy: string
  sortOrder: string
  [key: string]: any
}
export type SearchResponse<T extends IdentifiableEntity> = {
  total: number
  data: T[]
  filter: BaseSearchRequest
}
