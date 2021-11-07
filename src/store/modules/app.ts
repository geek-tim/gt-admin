import { defineStore } from 'pinia'
import { store } from '/@/store'
import { MenuTypeEnum } from '/@/enums/menuEnum'
import { cloneDeep } from 'lodash-es'
interface HeaderSetting {
  show: boolean
}
interface MenuSetting {
  type: MenuTypeEnum
  collapsed: boolean
}

// 项目基础设置
export interface ProjectConfig {
  themeColor: string
  // 侧边抽屉——项目设置
  headerSetting: HeaderSetting
  menuSetting: MenuSetting
}

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
      this.projectConfig = Object.assign(this.projectConfig, config)
    }
  }
})
