import type { ProjectConfig } from '/#/config'
import { MenuTypeEnum } from '/@/enums/menuEnum'

const primaryColor = '#0960bd'

const setting: ProjectConfig = {
  themeColor: primaryColor,
  useErrorHandle: true,

  // 侧边抽屉——项目设置
  headerSetting: {
    show: true
  },
  // headerSetting: HeaderSetting
  menuSetting: {
    type: MenuTypeEnum.SIDEBAR,
    collapsed: false
  }
}
export default setting
