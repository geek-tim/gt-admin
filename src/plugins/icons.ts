// 统一导入el-icon图标
import * as ElIconModules from '@element-plus/icons'
import type { App } from 'vue'

// 导入转换图标名称的函数

// 将el-icon的组件名称AbbbCddd转化为i-abbb-cddd形式
// 此前用switch做组件名时因关键字重复报错，所以格式统一加了前缀
// 例：Switch转换为i-switch，ArrowDownBold转换为i-arrow-down-bold
export function transElIconName(iconName) {
  return 'i' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase())
}

export function setupElIcon(app: App<Element>) {
  // 统一注册el-icon图标
  for (const iconName in ElIconModules) {
    app.component(transElIconName(iconName), ElIconModules[iconName])
  }
}
