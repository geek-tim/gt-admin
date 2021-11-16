import type { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { setupElIcon } from '/@/plugins/icons'
import { PageWrapper } from './page/index'
// import d2Container from './d2-container/index.vue'
import { D2Crud } from './d2-crud/index'

export const registerGlobalComp = function (app: App) {
  app.use(ElementPlus)
  setupElIcon(app)

  // components
  // app.use(PageWrapper)
  app.component('PageWrapper', PageWrapper)
  // app.component('d2Container', d2Container)
  app.component('d2Crud', D2Crud)
}
