// interfaces/admin.interface.ts

export interface Admin {
  id: number
  name: string
  email: string
}

export interface AdminListParams {
  filter?: Record<string, any>
  status?: string | number | boolean
  startDate?: string
  finishDate?: string
  offset: number 
  limit?: number
  orderBy?: string
  orderType?: 'ASC' | 'DESC'
  adminsCookie?: Admin[] | null
}

export interface AdminListResponse {
  items: Admin[]
  total?: number
  page?: number
  limit?: number
  offset?: number
  totalPages?: number
  totalItems?: number
  adminsCookie?: Admin[] | null
}