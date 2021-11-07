import { defineStore } from 'pinia'
import { store } from '/@/store'

export const usPermissionStore = defineStore({
  id: 'app-permission',
  state: () => ({
    isDynamicAddedRoute: false
  }),
  getters: {
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    }
  },
  actions: {
    setDynamicAddedRoute(value: boolean) {
      this.isDynamicAddedRoute = value
    }
  }
})

export function usePermissionStoreWithOut() {
  return usPermissionStore(store)
}
