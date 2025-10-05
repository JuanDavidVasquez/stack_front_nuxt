import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(value: boolean) {
      this.loading = value
    }
  }
})