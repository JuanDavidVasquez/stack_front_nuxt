import type { AdminListParams } from '~/interfaces/admin.interface'
import type { responseApi } from '~/interfaces/req.interface'

export const adminService = {
  /**
   * Listar administradores
   */
  async listAdmins(params: AdminListParams): Promise<responseApi> {
    const payload = {
      filter: params.filter || '',
      status: params.status ?? '',
      startDate: params.startDate ?? '',
      finishDate: params.finishDate ?? '',
      offset: params.offset ?? 0,
      limit: params.limit ?? 10,
      orderBy: params.orderBy ?? 'id',
      orderType: params.orderType ?? 'DESC',
    }

    return await useApiServices({
      method: 'POST',
      url: 'admins/list-admins',
      typeHeader: 'auth',
      data: payload,
    })
  },

  /**
   * Crear administrador
   */
  async createAdmin(data: any): Promise<responseApi> {
    return await useApiServices({
      method: 'POST',
      url: 'admins/create',
      typeHeader: 'auth',
      data,
    })
  },

  /**
   * Actualizar administrador
   */
  async updateAdmin(id: string, data: any): Promise<responseApi> {
    return await useApiServices({
      method: 'PUT',
      url: `admins/update/${id}`,
      typeHeader: 'auth',
      data,
    })
  },

  /**
   * Eliminar administrador
   */
  async deleteAdmin(id: string): Promise<responseApi> {
    return await useApiServices({
      method: 'DELETE',
      url: `admins/delete/${id}`,
      typeHeader: 'auth',
    })
  },

  /**
   * Obtener detalle de administrador
   */
  async getAdmin(id: string): Promise<responseApi> {
    return await useApiServices({
      method: 'GET',
      url: `admins/${id}`,
      typeHeader: 'auth',
    })
  },
}