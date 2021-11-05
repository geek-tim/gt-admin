import { defineStore } from 'pinia'
import { store } from '/@/store'

interface LocaleState {
  locale: string
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    locale: 'zh-CN'
  }),
  getters: {
    getLocale(state): string {
      return state.locale || 'zh-CN'
    }
  },
  actions: {
    setLocale(locale) {
      this.locale = locale
    }
  }
})

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
