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

export type BaseSearchRequest<T = any> = {
  current?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: string
} & T

export type SearchResponse<T extends IdentifiableEntity> = {
  total: number
  data: T[]
  filter: BaseSearchRequest
}

export type ID = { id: number }

// 搜索的参数范型
export type SearchRequest<T> = {
  search: T
}

// mutation的参数范型
export type MutationRequest<T> = {
  input: T
}
