<template>
  <div class="card p-4">
    <!-- Selector de tamaño opcional -->
    <div v-if="showSizeSelector" class="flex justify-end mb-4">
      <SelectButton
        v-model="selectedSize"
        :options="sizeOptions"
        optionLabel="label"
        dataKey="value"
      />
    </div>

    <!-- Tabla dinámica -->
    <DataTable
      :value="rows"
      :size="selectedSize.value || undefined"
      :tableStyle="`min-width: ${minWidth}`"
      :paginator="paginator"
      :rows="rowsPerPage"
      :rowsPerPageOptions="[1,5,10,20,50]"
    >
      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :style="col.style"
      />
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import SelectButton from 'primevue/selectbutton'

/**
 * Props
 */
interface ColumnProp {
  field: string
  header: string
  style?: string
}

const props = defineProps<{
  columns: ColumnProp[]
  rows: any[]
  minWidth?: string
  paginator?: boolean
  rowsPerPage?: number
  showSizeSelector?: boolean
}>()

/**
 * Default props
 */
const minWidth = computed(() => props.minWidth || '50rem')
const paginator = computed(() => props.paginator ?? false)
const rowsPerPage = computed(() => props.rowsPerPage ?? 10)
const showSizeSelector = computed(() => props.showSizeSelector ?? true)

/**
 * Tamaños de tabla
 */
const selectedSize = ref({ label: 'Normal', value: null })
const sizeOptions = ref([
  { label: 'Small', value: 'small' },
  { label: 'Normal', value: null },
  { label: 'Large', value: 'large' }
])
</script>
