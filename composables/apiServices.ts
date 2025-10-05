import type { UseFetchOptions } from 'nuxt/app'
import type { responseApi, setting } from '~/interfaces/req.interface'

/**
 * Servicio genérico para realizar peticiones HTTP
 */
export const useApiServices = async (
  setting: setting
): Promise<responseApi> => {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()

  try {
    // Agregar headers de autenticación si se especifica typeHeader
    const headersWithAuth = buildAuthHeaders(setting, config)
    const settingWithHeaders = {
      ...setting,
      headers: headersWithAuth,
    }

    const options = buildFetchOptions(settingWithHeaders, config)
    const { data, error } = await useFetch(setting.url, options)

    if (error.value) {
      throw error.value
    }

    return data.value as responseApi
  } catch (error) {
    return handleApiError(error, nuxtApp)
  }
}

/**
 * Construye headers con autenticación si se especifica typeHeader
 */
function buildAuthHeaders(setting: setting, config: any): Record<string, string> {
  const headers = { ...(setting.headers || {}) }

  // Si no se especifica typeHeader, retornar headers tal como vienen
  if (!setting.typeHeader) {
    return headers
  }

  const authStore = useAuthStore()
  const { authToken, accessToken, user } = storeToRefs(authStore)

  // Auto-detectar si necesita auth token cuando hay usuario logueado
  let headerType = setting.typeHeader
  if (user.value?.id && !setting.typeHeader) {
    headerType = 'auth'
  }

  // Agregar header según el tipo
  if (headerType === 'auth' && authToken.value) {
    (headers as any)[`X-${(config.public.SHORT_NAME as string).toUpperCase()}-Auth-Token`] = authToken.value
  } else if (headerType === 'access' && accessToken.value) {
    (headers as any)[`X-${(config.public.SHORT_NAME as string).toUpperCase()}-Access-Token`] = accessToken.value
  }

  return headers
}

/**
 * Construye las opciones para useFetch
 */
function buildFetchOptions(
  setting: setting,
  config: any
): UseFetchOptions<unknown> {
  const options: UseFetchOptions<unknown> = {
    key: `${setting.method}-${setting.url}-${Date.now()}`,
    baseURL: setting.api || config.public.API_BASE_URL,
    headers: (setting.headers || {}) as HeadersInit,
    method: setting.method,
    server: false,
    cache: 'no-cache',
    timeout: setting.timeout || 10000,
    onRequestError({ error }) {
      throw createHttpError(error.message)
    },
    onResponseError({ response }) {
      throw createHttpError(response.statusText, response.status, response._data)
    },
  }

  // Configurar body para métodos no-GET
  if (setting.method !== 'GET' && setting.data) {
    if (setting.contentType === 0) {
      options.body = buildFormData(setting.data)
    } else {
      options.body = setting.data
    }
  }

  return options
}

/**
 * Convierte objeto a FormData
 */
function buildFormData(data: object): FormData {
  const formData = new FormData()
  
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return formData
}

/**
 * Crea un error HTTP estructurado
 */
function createHttpError(message: string, statusCode?: number, data?: any) {
  return {
    message,
    statusCode,
    data,
  }
}

/**
 * Parsea de forma segura un string JSON
 */
function safeJsonParse(value: any): any {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch {
      return { message: value }
    }
  }
  return value
}

/**
 * Maneja errores de la API de forma centralizada
 */
function handleApiError(error: any, nuxtApp: any): responseApi {
  console.error('API Error:', error)

  // Extraer información del error
  const errorData = safeJsonParse(error)
  const statusCode = errorData?.statusCode || error?.statusCode
  const data = errorData?.data || error?.data
  const message = errorData?.message || error?.message || 'Unknown error'

  // Timeout error
  if (message.includes('aborted') || message.includes('timeout')) {
    return {
      success: false,
      status: false,
      code: 101,
      message: nuxtApp.$i18n.t('store.apiServices.timeOut'),
      error: errorData,
    }
  }

  // Unauthorized - Token expirado
  if (statusCode === 401) {
    return {
      success: false,
      status: false,
      code: 120,
      message: data?.message || 'Unauthorized',
      error: errorData,
    }
  }

  // Not found
  if (statusCode === 404) {
    return {
      success: false,
      status: false,
      code: 102,
      message: data?.message || nuxtApp.$i18n.t('store.apiServices.notFound'),
      error: errorData,
    }
  }

  // Error con código 120 (token inválido del backend)
  if (data?.code === 120) {
    return {
      success: false,
      status: false,
      code: 120,
      message: data.message || 'Token error',
      error: errorData,
    }
  }

  // Error con mensaje del servidor
  if (data?.message) {
    return {
      success: false,
      status: false,
      code: data?.code || 102,
      message: data.message,
      error: errorData,
    }
  }

  // Error genérico
  return {
    success: false,
    status: false,
    code: 101,
    message: nuxtApp.$i18n.t('store.apiServices.generalError'),
    error: errorData,
  }
}