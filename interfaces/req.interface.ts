export interface setting {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  typeHeader?: 'auth' | 'access' | ''
  url: string
  data?: object
  api?: string
  contentType?: 0 | 1
  headers?: object
  timeout?: number
}

export interface responseApi {
  success?: boolean
  code: number
  message: string
  data?: object | unknown | any
  status: boolean
  error?: unknown
}