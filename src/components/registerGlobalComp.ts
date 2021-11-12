import type { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { setupElIcon } from '/@/plugins/icons'
import { PageWrapper } from './page/index'

export const registerGlobalComp = function (app: App) {
  app.use(ElementPlus)
  setupElIcon(app)

  // components
  // app.use(PageWrapper)
  app.component('PageWrapper', PageWrapper)
}
