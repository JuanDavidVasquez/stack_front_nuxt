import { defineStore } from 'pinia'
import type { Admin, AdminListResponse } from '~/interfaces/admin.interface'

export const useAdminStore = defineStore('admins', () => {
  const adminsCookie = useCookie<AdminListResponse | null>('admins_list', {
    maxAge: 60 * 5, // 5 minutos
    sameSite: 'strict',
    default: () => null 
  })

  const defaultAdminsList: AdminListResponse = {
    items: [],
    limit: 10,
    offset: 0,
    totalPages: 1,
    totalItems: 0
  }

  const adminsList = ref<AdminListResponse>(
    adminsCookie.value || defaultAdminsList
  )
  
  const loading = ref(false)
  const error = ref<string | null>(null)

  watch(adminsList, (newValue) => {
    adminsCookie.value = newValue
  }, { deep: true })

  const isLoading = computed(() => loading.value)
  const hasAdmins = computed(() => adminsList.value.items.length > 0)
  const totalPages = computed(() => adminsList.value.totalPages || 1)
  const totalItems = computed(() => adminsList.value.totalItems || 0)

  function setAdminsList(data: AdminListResponse) {
    adminsList.value = data
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  function setError(message: string | null) {
    error.value = message
  }

 function clearAdmins() {
    adminsList.value = { ...defaultAdminsList }
    error.value = null
    loading.value = false
    adminsCookie.value = null
  }

  const $reset = () => {
    clearAdmins()
  }

  return {
    adminsList,
    loading,
    error,
    isLoading,
    hasAdmins,
    totalPages,
    totalItems,
    setAdminsList,
    setLoading,
    setError,
    clearAdmins,
    $reset,
  }
})