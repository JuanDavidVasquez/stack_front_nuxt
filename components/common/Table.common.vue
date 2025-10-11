<template>
  <div class="card p-4">
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
      :rowsPerPageOptions="[1, 5, 10, 20, 50]"
    >
      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :style="col.style"
      >
        <template #body="slotProps">
          <!-- Texto normal -->
          <span 
            v-if="!col.type || col.type === 'text'"
            :class="getCustomClass(col, slotProps.data, 'textClass')"
          >
            {{ getFieldValue(col.field, slotProps.data) }}
          </span>

          <!-- Button -->
          <Button
            v-else-if="col.type === 'button'"
            :label="getFieldValue(col.field, slotProps.data)"
            :class="getCustomClass(col, slotProps.data, 'buttonClass')"
            :severity="col.buttonSeverity || 'primary'"
            :unstyled="!!col.buttonClass || !!col.customClass"
            @click="handleAction(col.action || 'click', slotProps.data, col.field)"
          />

          <!-- Checkbox -->
          <Checkbox
            v-else-if="col.type === 'checkbox'"
            v-model="slotProps.data[col.field]"
            :binary="true"
            :class="getCustomClass(col, slotProps.data, 'checkboxClass')"
            @change="handleAction('checkbox-change', slotProps.data, col.field)"
          />

          <!-- Badge -->
          <Tag
            v-else-if="col.type === 'badge'"
            :value="getFieldValue(col.field, slotProps.data)"
            :severity="getBadgeSeverity(col, slotProps.data)"
            :class="getCustomClass(col, slotProps.data, 'badgeClass')"
            :unstyled="!!col.badgeClass || !!col.customClass"
          />

          <!-- Link -->
          <a
            v-else-if="col.type === 'link'"
            :href="getFieldValue(col.linkField || col.field, slotProps.data)"
            :class="getCustomClass(col, slotProps.data, 'linkClass') || 'text-blue-500 hover:underline'"
            target="_blank"
          >
            {{ getFieldValue(col.field, slotProps.data) }}
          </a>

          <!-- Image -->
          <img
            v-else-if="col.type === 'image'"
            :src="getFieldValue(col.field, slotProps.data)"
            :alt="col.header"
            :class="getCustomClass(col, slotProps.data, 'imageClass') || 'w-12 h-12 rounded'"
          />

          <!-- Rating -->
          <Rating
            v-else-if="col.type === 'rating'"
            :modelValue="getFieldValue(col.field, slotProps.data)"
            :readonly="col.readonly ?? true"
            :cancel="false"
            :class="getCustomClass(col, slotProps.data, 'ratingClass')"
          />

          <!-- Switch/Toggle -->
          <InputSwitch
            v-else-if="col.type === 'switch'"
            v-model="slotProps.data[col.field]"
            :class="getCustomClass(col, slotProps.data, 'switchClass')"
            @change="handleAction('switch-change', slotProps.data, col.field)"
          />

          <!-- Progress Bar -->
          <ProgressBar
            v-else-if="col.type === 'progress'"
            :value="getFieldValue(col.field, slotProps.data)"
            :showValue="col.showValue ?? true"
            :class="getCustomClass(col, slotProps.data, 'progressClass')"
          />

          <!-- Custom template slot -->
          <slot
            v-else-if="col.type === 'custom'"
            :name="`custom-${col.field}`"
            :data="slotProps.data"
            :value="getFieldValue(col.field, slotProps.data)"
          />

          <!-- Date formatting -->
          <span 
            v-else-if="col.type === 'date'"
            :class="getCustomClass(col, slotProps.data, 'dateClass')"
          >
            {{ formatDate(getFieldValue(col.field, slotProps.data), col.dateFormat) }}
          </span>

          <!-- Currency formatting -->
          <span 
            v-else-if="col.type === 'currency'"
            :class="getCustomClass(col, slotProps.data, 'currencyClass')"
          >
            {{ formatCurrency(getFieldValue(col.field, slotProps.data), col.currency) }}
          </span>

          <!-- Multiple buttons/actions -->
          <div v-else-if="col.type === 'actions'" class="flex gap-2">
            <Button
              v-for="action in col.actions"
              :key="action.name"
              :icon="action.icon"
              :label="action.label"
              :severity="action.severity || 'secondary'"
              :class="action.class || 'p-button-sm'"
              :unstyled="!!action.class"
              size="small"
              @click="handleAction(action.name, slotProps.data, col.field)"
            />
          </div>

          <!-- Fallback -->
          <span 
            v-else
            :class="getCustomClass(col, slotProps.data)"
          >
            {{ getFieldValue(col.field, slotProps.data) }}
          </span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import SelectButton from 'primevue/selectbutton'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Tag from 'primevue/tag'
import Rating from 'primevue/rating'
import InputSwitch from 'primevue/inputswitch'
import ProgressBar from 'primevue/progressbar'
import type { ColumnProp } from '~/interfaces/table.interface'


/**
 * Props
 */
const props = defineProps<{
  columns: ColumnProp[]
  rows: any[]
  minWidth?: string
  paginator?: boolean
  rowsPerPage?: number
  showSizeSelector?: boolean
}>()

/**
 * Emits
 */
const emit = defineEmits<{
  action: [actionName: string, data: any, field?: string]
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

/**
 * Obtener valor de un campo
 */
const getFieldValue = (field: string, data: any) => {
  return field.split('.').reduce((obj, key) => obj?.[key], data)
}

/**
 * Obtener clase personalizada (puede ser string o función)
 */
const getCustomClass = (col: ColumnProp, data: any, specificClassKey?: string) => {
  // Prioridad: clase específica del tipo > customClass general
  const specificClass = specificClassKey ? col[specificClassKey as keyof ColumnProp] : null
  const generalClass = col.customClass
  
  let classes = []
  
  // Procesar clase específica
  if (specificClass) {
    if (typeof specificClass === 'function') {
      classes.push(specificClass(data))
    } else {
      classes.push(specificClass)
    }
  }
  
  // Procesar clase general si no hay específica
  if (!specificClass && generalClass) {
    if (typeof generalClass === 'function') {
      classes.push(generalClass(data))
    } else {
      classes.push(generalClass)
    }
  }
  
  return classes.filter(Boolean).join(' ')
}

/**
 * Manejar acciones
 */
const handleAction = (actionName: string, data: any, field?: string) => {
  emit('action', actionName, data, field)
}

/**
 * Obtener severidad del badge
 */
const getBadgeSeverity = (col: ColumnProp, data: any) => {
  if (col.badgeSeverityMap && col.badgeSeverityField) {
    const value = getFieldValue(col.badgeSeverityField, data)
    return col.badgeSeverityMap[value] || 'secondary'
  }
  return 'secondary'
}

/**
 * Formatear fecha
 */
const formatDate = (value: any, format?: string) => {
  if (!value) return ''
  const date = new Date(value)
  if (format === 'short') {
    return date.toLocaleDateString()
  }
  return date.toLocaleString()
}

/**
 * Formatear moneda
 */
const formatCurrency = (value: any, currency: string = 'USD') => {
  if (value === null || value === undefined) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(value)
}
</script>