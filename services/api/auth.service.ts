// services/auth.service.ts
import type { responseApi } from '~/interfaces/req.interface'
import type { LoginForm } from '~/interfaces/login.interface'
import { useEncrypt } from '~/composables/utils/crypto'

export const authService = {
  /**
   * Login de usuario
   */
  async login(credentials: LoginForm): Promise<responseApi> {
    const nuxtApp = useNuxtApp()
    
    // Encriptar password
    const { iv, password: encryptedPassword } = useEncrypt(credentials.password)

    // Construir payload
    const payload = {
      email: credentials.email,
      password: encryptedPassword,
      iv: iv,
      platform: 'backoffice',
      type: 'lc', // 'lc','fb','gm','apple','bulk'
      pushToken: useCookie('pushToken').value || '',
      version: (nuxtApp.$version as string) || '0.0.1',
    }

    return await useApiServices({
      method: 'POST',
      url: 'onboarding/login',
      data: payload,
      typeHeader: 'access'
    })
  },

  /**
   * Logout de usuario
   */
  async logout(): Promise<responseApi> {
    return await useApiServices({
      method: 'POST',
      url: 'onboarding/logout',
      typeHeader: 'auth'
    })
  },

  /**
   * Recuperación de contraseña
   */
  async passwordRecovery(data: { email: string }): Promise<responseApi> {
    return await useApiServices({
      method: 'POST',
      url: 'onboarding/password-recovery',
      data,
      typeHeader: 'access'
    })
  },

  /**
   * Verificar código de recuperación
   */
  async verifyCode(data: { email: string; code: string }): Promise<responseApi> {
    return await useApiServices({
      method: 'POST',
      url: 'onboarding/verify-code',
      data,
      typeHeader: 'access'
    })
  },

  /**
   * Actualizar contraseña
   */
  async updatePassword(
    data: { password: string; confirmPassword?: string }
  ): Promise<responseApi> {
    // Encriptar la nueva contraseña
    const { iv, password: encryptedPassword } = useEncrypt(data.password)

    const payload = {
      password: encryptedPassword,
      iv: iv,
      confirmPassword: data.confirmPassword ? useEncrypt(data.confirmPassword).password : undefined
    }

    return await useApiServices({
      method: 'POST',
      url: 'onboarding/update-password',
      data: payload,
      typeHeader: 'auth'
    })
  },

  /**
   * Obtener perfil del usuario
   */
  async getProfile(): Promise<responseApi> {
    return await useApiServices({
      method: 'GET',
      url: 'onboarding/get-profile',
      typeHeader: 'auth'
    })
  },

  /**
   * Generar access token
   */
  async generateAccessToken(): Promise<responseApi> {
    const config = useRuntimeConfig()
    return await useApiServices({
      method: 'GET',
      url: `${config.public.SHORT_NAME as string}/generate-access-token`,
      typeHeader: 'access'
    })
  },
}