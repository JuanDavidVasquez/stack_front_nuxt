import type { Pinia, Store } from 'pinia'

export default defineNuxtPlugin({
  name: 'reset-stores',
  enforce: 'pre',
  setup(nuxtApp) {
    const resetAllStores = () => {
      const pinia = nuxtApp.$pinia as Pinia
      
      const excludedStores = ['main'] 
      
      if (pinia && '_s' in pinia) {
        const stores = (pinia as any)._s as Map<string, Store>
        
        stores.forEach((store: Store) => {
          // Saltar stores excluidos
          if (excludedStores.includes(store.$id)) {
            console.log(`Skipping reset for store: ${store.$id}`)
            return
          }
          
          try {
            if (typeof store.$reset === 'function') {
              console.log('Resetting store:', store.$id)
              store.$reset()
            }
          } catch (error) {
            console.error(`Error resetting store "${store.$id}":`, error)
          }
        })
      }
    }

    return {
      provide: {
        resetAllStores
      }
    }
  }
})