<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Panel de Administración</h1>
    
    <!-- Error -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded p-4">
      <p class="text-red-600 mb-2">{{ error }}</p>
      <button 
        @click="loadAdmins"
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Reintentar
      </button>
    </div>
    
    <!-- Sin datos -->
    <div v-else-if="rows.length === 0" class="text-center p-8 bg-gray-50 rounded">
      <p class="text-gray-600">No hay administradores registrados</p>
    </div>
    
    <!-- Tabla - SOLO se renderiza cuando rows tiene datos -->
    <div v-else>
      <div class="flex justify-between items-center mb-4">
        <p class="text-gray-600">Total: {{ totalItems }} administradores</p>
        <button 
          @click="loadAdmins"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Recargar
        </button>
      </div>
      
      <CommonTable
        :columns="columns"
        :rows="rows"
        :paginator="true"
        :rowsPerPage="10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonTable from '~/components/common/Table.common.vue'
const mainStore = useMainStore();
const { t } = useI18n();

const { 
  adminsList, 
  isLoading, 
  hasAdmins, 
  error,
  totalItems,
  fetchAdmins 
} = useAdmin()

const columns = [
  { field: 'id', header: 'ID' },
  { field: 'fullname', header: 'Nombre' },
  { field: 'email', header: 'Correo Electrónico' }
]

const rows = computed(() => {
  return adminsList.value?.items || []
})

const loadAdmins = async () => {
  mainStore.loading = true
  await fetchAdmins({ 
    offset: 0,
    limit: 10,
    orderBy: '',
    orderType: 'DESC'
  })
  mainStore.loading = false
}

onMounted(async () => {
  if (!hasAdmins.value) {
    await loadAdmins()
  }
})

// Definir que requiere autenticación
definePageMeta({
  middleware: 'auth'
})
</script>