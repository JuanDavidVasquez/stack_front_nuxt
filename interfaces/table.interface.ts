import type { ColumnType, Severity } from "~/enums/table.enum"

export interface ActionButton {
  name: string
  label?: string
  icon?: string
  severity?: Exclude<Severity, Severity.PRIMARY>
  class?: string
}

export interface ColumnProp {
  field: string
  header: string
  style?: string
  type?: ColumnType
  
  // Clase personalizada para cualquier tipo
  customClass?: string | ((data: any) => string)
  
  // Button options
  buttonClass?: string
  buttonSeverity?: Severity
  action?: string
  
  // Badge options
  badgeSeverityField?: string
  badgeSeverityMap?: Record<string, Exclude<Severity, Severity.PRIMARY>>
  badgeClass?: string
  
  // Link options
  linkField?: string
  linkClass?: string
  
  // Image options
  imageClass?: string
  
  // Rating options
  readonly?: boolean
  ratingClass?: string
  
  // Progress options
  showValue?: boolean
  progressClass?: string
  
  // Date options
  dateFormat?: string
  dateClass?: string
  
  // Currency options
  currency?: string
  currencyClass?: string
  
  // Text options
  textClass?: string
  
  // Checkbox options
  checkboxClass?: string
  
  // Switch options
  switchClass?: string
  
  // Actions options
  actions?: ActionButton[]
}