import { defineStore } from 'pinia'
import type { User } from '~/interfaces/user.interface'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null)
    const authToken = ref<string>('')
    const accessToken = ref<string>('')

    /**
     * Verifica si el usuario está autenticado
     */
    const isAuthenticated = computed((): boolean => {
      return !!user.value && !!authToken.value
    })

    /**
     * Obtiene el usuario actual
     */
    const currentUser = computed((): User | null => {
      return user.value
    })

    /**
     * Obtiene el token de autenticación
     */
    const getAuthToken = computed((): string => {
      return authToken.value
    })

    /**
     * Obtiene el access token
     */
    const getAccessToken = computed((): string => {
      return accessToken.value
    })

    /**
     * Establece los datos del usuario autenticado
     */
    function setUser(newUser: User | null) {
      user.value = newUser
    }

    /**
     * Establece el token de autenticación
     */
    function setAuthToken(token: string) {
      authToken.value = token
    }

    /**
     * Establece el access token
     */
    function setAccessToken(token: string) {
      accessToken.value = token
    }

    /**
     * Establece todos los datos de login
     */
    function setLoginData(data: { user: User; authToken: string }) {
      user.value = data.user
      authToken.value = data.authToken
    }

    /**
     * Limpia todos los datos de autenticación
     */
    function clearAuth() {
      user.value = null
      authToken.value = ''
    }

    return {
      user: readonly(user),
      authToken: readonly(authToken),
      accessToken: readonly(accessToken),
      isAuthenticated,
      currentUser,
      getAuthToken,
      getAccessToken,
      setUser,
      setAuthToken,
      setAccessToken,
      setLoginData,
      clearAuth,
    }
  },
  {
    persist: true,
  }
)