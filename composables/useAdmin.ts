import type { AdminListParams } from '~/interfaces/admin.interface'
import type { AdminListResponse } from '~/interfaces/admin.interface'
import { adminService } from '~/services/api/admin.service'

/**
 * Composable de administradores - Orquesta la lógica de negocio
 * Conecta el store con los servicios y maneja las redirecciones
 */
export const useAdmin = () => {
  const adminStore = useAdminStore()
  const router = useRouter()
  const nuxtApp = useNuxtApp()

  // Estado reactivo del store
  const adminsList = computed(() => adminStore.adminsList)
  const isLoading = computed(() => adminStore.isLoading)
  const hasAdmins = computed(() => adminStore.hasAdmins)
  const error = computed(() => adminStore.error)
  const totalPages = computed(() => adminStore.totalPages)
  const totalItems = computed(() => adminStore.totalItems)

  /**
   * Listar administradores
   */
  const fetchAdmins = async (params: AdminListParams) => {
    adminStore.setLoading(true)
    adminStore.setError(null)

    try {
      const result = await adminService.listAdmins(params)

      if (result?.status && result.code === 100) {
        adminStore.setAdminsList(result.data as AdminListResponse)
      } else {
        adminStore.setError(result?.message || 'Error al cargar administradores')
      }

      return result
    } catch (err) {
      const errorMessage = 'Error de conexión'
      adminStore.setError(errorMessage)
      console.error('Error fetching admins:', err)
      throw err
    } finally {
      adminStore.setLoading(false)
    }
  }

  /**
   * Crear administrador
   */
  const createAdmin = async (data: any) => {
    adminStore.setLoading(true)
    
    try {
      const result = await adminService.createAdmin(data)

      if (result?.status && result.code === 100) {
        // Recargar la lista después de crear
        await fetchAdmins({ offset: 0, limit: 10 })
      }

      return result
    } catch (err) {
      console.error('Error creating admin:', err)
      throw err
    } finally {
      adminStore.setLoading(false)
    }
  }

  /**
   * Actualizar administrador
   */
  const updateAdmin = async (id: string, data: any) => {
    adminStore.setLoading(true)
    
    try {
      const result = await adminService.updateAdmin(id, data)

      if (result?.status && result.code === 100) {
        // Recargar la lista después de actualizar
        await fetchAdmins({ offset: 0, limit: 10 })
      }

      return result
    } catch (err) {
      console.error('Error updating admin:', err)
      throw err
    } finally {
      adminStore.setLoading(false)
    }
  }

  /**
   * Eliminar administrador
   */
  const deleteAdmin = async (id: string) => {
    adminStore.setLoading(true)
    
    try {
      const result = await adminService.deleteAdmin(id)

      if (result?.status && result.code === 100) {
        // Recargar la lista después de eliminar
        await fetchAdmins({ offset: 0, limit: 10 })
      }

      return result
    } catch (err) {
      console.error('Error deleting admin:', err)
      throw err
    } finally {
      adminStore.setLoading(false)
    }
  }

  /**
   * Obtener detalle de administrador
   */
  const getAdmin = async (id: string) => {
    adminStore.setLoading(true)
    
    try {
      const result = await adminService.getAdmin(id)
      return result
    } catch (err) {
      console.error('Error getting admin:', err)
      throw err
    } finally {
      adminStore.setLoading(false)
    }
  }

  /**
   * Limpiar datos
   */
  const clearAdmins = () => {
    adminStore.clearAdmins()
  }

  return {
    // Estado reactivo
    adminsList,
    isLoading,
    hasAdmins,
    error,
    totalPages,
    totalItems,

    // Acciones principales
    fetchAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    getAdmin,
    clearAdmins,
  }
}