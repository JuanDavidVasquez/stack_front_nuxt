import type { LoginForm } from '~/interfaces/login.interface'
import type { User } from '~/interfaces/user.interface'
import { authService } from '~/services/api/auth.service'

/**
 * Composable de autenticación - Orquesta la lógica de negocio
 * Conecta el store con los servicios y maneja las redirecciones
 */
export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()
  const nuxtApp = useNuxtApp()
  const { $resetAllStores } = useNuxtApp()

  // Estado reactivo del store
  const user = computed(() => authStore.currentUser)
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const authToken = computed(() => authStore.getAuthToken)
  const accessToken = computed(() => authStore.getAccessToken)

  /**
   * Login de usuario
   */
  const login = async (credentials: LoginForm) => {
    const result = await authService.login(credentials)

    if (result?.status && result.code === 100) {
      // Guardar datos en el store
      authStore.setLoginData(result.data as { user: User; authToken: string })

      // Redireccionar después de login exitoso
       await router.push('/home')
    }

    return result
  }

  /**
   * Logout de usuario
   */
  const logout = async (callEndpoint: boolean = true) => {
    if (callEndpoint && authToken.value) {
      try {
        await authService.logout()
      } catch (error) {
        console.error('Logout error:', error)
      }
    }

    // Limpiar store
    //authStore.clearAuth()
    $resetAllStores()
    // Redireccionar al login
    setTimeout(async () => {
      await router.push(nuxtApp.$localePath({ name: 'home' }))
    }, 500)
  }

  /**
   * Recuperación de contraseña
   */
  const passwordRecovery = async (email: string) => {
    return await authService.passwordRecovery({ email })
  }

  /**
   * Verificar código de recuperación
   */
  const verifyCode = async (email: string, code: string) => {
    return await authService.verifyCode({ email, code })
  }

  /**
   * Actualizar contraseña
   */
  const updatePassword = async (password: string, confirmPassword?: string) => {
    if (!authToken.value) {
      return {
        success: false,
        status: false,
        code: 120,
        message: 'No auth token found',
      }
    }

    const result = await authService.updatePassword(
      { password, confirmPassword }
    )

    // Si la actualización fue exitosa, hacer logout
    if (result.status && result.code === 100) {
      authStore.clearAuth()
      setTimeout(async () => {
        await router.push(nuxtApp.$localePath({ name: 'index' }))
      }, 500)
    }

    return result
  }

  /**
   * Obtener perfil del usuario
   */
  const getProfile = async () => {
    if (!authToken.value) {
      return {
        success: false,
        status: false,
        code: 120,
        message: 'No auth token found',
      }
    }

    const result = await authService.getProfile()

    // Actualizar usuario en el store si la petición fue exitosa
    if (result.status && result.code === 100 && result.data) {
      authStore.setUser(result.data as User)
    }

    return result
  }

  /**
   * Obtiene o genera el access token
   */
  const getAccessToken = async (): Promise<string> => {
    if (accessToken.value) {
      return accessToken.value
    }

    const result = await authService.generateAccessToken()

    if (result.code === 100 && result.data?.accessToken) {
      authStore.setAccessToken(result.data.accessToken)
      return result.data.accessToken
    }

    return ''
  }

  /**
   * Maneja el logout desde interceptores (usado por useHttpClient)
   */
  const handleLogout = async (callEndpoint: boolean = true) => {
    await logout(callEndpoint)
  }

  /**
   * Establece datos de login manualmente (para casos especiales)
   */
  const setLoginUser = (data: { user: User; authToken: string }) => {
    authStore.setLoginData(data)
  }

  return {
    // Estado reactivo
    user,
    isAuthenticated,
    authToken,
    accessToken,

    // Acciones principales
    login,
    logout,
    handleLogout,

    // Gestión de contraseña
    passwordRecovery,
    verifyCode,
    updatePassword,

    // Perfil
    getProfile,

    // Tokens
    getAccessToken,

    // Utilidades
    setLoginUser,
  }
}