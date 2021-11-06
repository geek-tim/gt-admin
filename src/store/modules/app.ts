import { defineStore } from 'pinia'
import { store } from '/@/store'

// 项目基础设置
export interface ProjectConfig {
  themeColor: string
}

interface AppState {
  darkMode: String
  // Page loading status
  pageLoading: boolean
  // project config
  projectConfig: ProjectConfig | null
}

export const useLocaleStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: '',
    pageLoading: false,
    projectConfig: null
  }),
  getters: {},
  actions: {}
})
