/**
 * Parsea de forma segura un string JSON
 */
export function safeJsonParse<T = any>(value: any, fallback?: T): T | any {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch {
      return fallback ?? { message: value }
    }
  }
  return value
}

/**
 * Convierte de forma segura un valor a JSON string
 */
export function safeJsonStringify(value: any, defaultValue: string = '{}'): string {
  try {
    return JSON.stringify(value)
  } catch {
    return defaultValue
  }
}

/**
 * Verifica si un string es un JSON válido
 */
export function isValidJson(value: string): boolean {
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}