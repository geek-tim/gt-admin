import { defineStore } from 'pinia'
import { store } from '/@/store'
import { useDbStore } from './db'
export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'

export interface LocaleSetting {
  showPicker: boolean
  // Current language
  locale: LocaleType
  // default language
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
}

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en'
}

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.ZH_CN,
  // Default locale
  fallback: LOCALE.ZH_CN,
  // available Locales
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US]
}

interface LocaleState {
  localeInfo: LocaleSetting
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localeInfo: localeSetting
  }),
  getters: {
    getLocale(): LocaleType {
      return this.localeInfo?.locale ?? 'zh_CN'
    }
  },
  actions: {
    setLocale(info: Partial<LocaleSetting>) {
      const dbStore = useDbStore()
      this.localeInfo = { ...this.localeInfo, ...info }
      dbStore.set({
        dbName: 'sys',
        path: 'localeInfo.locale',
        value: info.locale,
        user: true
      })
    }
  }
})

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
