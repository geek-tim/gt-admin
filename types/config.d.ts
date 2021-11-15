import { MenuTypeEnum } from '/@/enums/menuEnum'

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'

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
  useErrorHandle: boolean
  // 侧边抽屉——项目设置
  headerSetting: HeaderSetting
  menuSetting: MenuSetting
}

export interface GlobConfig {
  // Site title
  title: string
  // Service interface url
  apiUrl: string
  // Upload url
  uploadUrl?: string
  //  Service interface url prefix
  urlPrefix?: string
  // Project abbreviation
  shortName: string
  version: string
}

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string
  // Service interface url
  VITE_GLOB_API_URL: string
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string
  VUE_GLOB_APP_VERSION: string
}
