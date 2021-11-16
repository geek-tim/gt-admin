import { defineStore } from 'pinia'
import { MenuTypeEnum } from '/@/enums/menuEnum'
import type { ProjectConfig, MenuSetting, HeaderSetting } from '/#/config'
import { deepMerge } from '/@/utils/index'

interface AppState {
  darkMode: String
  // Page loading status
  pageLoading: boolean

  // project config
  projectConfig: ProjectConfig
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: '',
    pageLoading: false,
    projectConfig: {
      headerSetting: { show: false },
      menuSetting: { type: MenuTypeEnum.TOP_MENU_MIX, collapsed: false }
    } as ProjectConfig
  }),
  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting
    }
  },
  actions: {
    setProjectConfig(config: DeepPartial<ProjectConfig>) {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
    }
  }
})
