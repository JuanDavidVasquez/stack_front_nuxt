import type { responseApi, setting } from '~/interfaces/req.interface'

/**
 * Cliente HTTP que agrega funcionalidad de autenticación sobre useApiServices
 */
export const useHttpClient = () => {
  const config = useRuntimeConfig()

  /**
   * Construye headers de autenticación según el tipo
   */
  const buildAuthHeaders = (typeHeader?: 'auth' | 'access' | ''): Record<string, string> => {
    const authStore = useAuthStore()
    const { authToken, accessToken, user } = storeToRefs(authStore)

    // Auto-detectar si necesita auth token cuando hay usuario logueado
    let headerType = typeHeader
    if (user.value?.id && !headerType) {
      headerType = 'auth'
    }

    const headers: Record<string, string> = {}

    if (headerType === 'auth' && authToken.value) {
      headers[`X-${(config.public.SHORT_NAME as string).toUpperCase()}-Auth-Token`] = authToken.value
    } else if (headerType === 'access' && accessToken.value) {
      headers[`X-${(config.public.SHORT_NAME as string).toUpperCase()}-Access-Token`] = accessToken.value
    }

    return headers
  }

  /**
   * Realiza una petición HTTP con manejo automático de autenticación
   */
  const request = async (
    options: Omit<setting, 'headers'> & { headers?: Record<string, string> }
  ): Promise<responseApi> => {
    // Construir headers de autenticación
    const authHeaders = buildAuthHeaders(options.typeHeader)

    // Merge con headers personalizados si existen
    const headers = {
      ...authHeaders,
      ...(options.headers || {}),
    }

    // Realizar petición
    const result = await useApiServices({
      ...options,
      headers,
    })

    // Manejar errores de autenticación automáticamente
    if (result.code === 120 || result.code === 401) {
      await handleAuthError(result)
    }

    return result
  }

  /**
   * Maneja errores de autenticación (logout automático)
   */
  const handleAuthError = async (result: responseApi) => {
    const { handleLogout } = useAuth()

    // Si el mensaje menciona token, hacer logout completo (llama endpoint)
    if (result.message?.toLowerCase().includes('token')) {
      await handleLogout(true)
    } else {
      // Solo limpiar sesión local
      await handleLogout(false)
    }
  }

  /**
   * Shortcut para GET
   */
  const get = async (
    url: string,
    options?: Partial<Omit<setting, 'method' | 'url' | 'headers'>> & { headers?: Record<string, string> }
  ): Promise<responseApi> => {
    return request({
      method: 'GET',
      url,
      ...options,
    })
  }

  /**
   * Shortcut para POST
   */
  const post = async (
    url: string,
    data?: object,
    options?: Partial<Omit<setting, 'method' | 'url' | 'data' | 'headers'>> & { headers?: Record<string, string> }
  ): Promise<responseApi> => {
    return request({
      method: 'POST',
      url,
      data,
      ...options,
    })
  }

  /**
   * Shortcut para PUT
   */
  const put = async (
    url: string,
    data?: object,
    options?: Partial<Omit<setting, 'method' | 'url' | 'data' | 'headers'>> & { headers?: Record<string, string> }
  ): Promise<responseApi> => {
    return request({
      method: 'PUT',
      url,
      data,
      ...options,
    })
  }

  /**
   * Shortcut para PATCH
   */
  const patch = async (
    url: string,
    data?: object,
    options?: Partial<Omit<setting, 'method' | 'url' | 'data' | 'headers'>> & { headers?: Record<string, string> }
  ): Promise<responseApi> => {
    return request({
      method: 'PATCH',
      url,
      data,
      ...options,
    })
  }

  /**
   * Shortcut para DELETE
   */
  const del = async (
    url: string,
    options?: Partial<Omit<setting, 'method' | 'url' | 'headers'>> & { headers?: Record<string, string> }
  ): Promise<responseApi> => {
    return request({
      method: 'DELETE',
      url,
      ...options,
    })
  }

  return {
    request,
    get,
    post,
    put,
    patch,
    delete: del,
    buildAuthHeaders,
  }
}