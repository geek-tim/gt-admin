import { createApp } from 'vue'
import App from './App.vue'
import { setupProdMockServer } from '../mock/_mockProdServer'
import { setupRouter, router } from '/@/router'
import { setupI18n } from '/@/locales/setupI18n'
import { setupStore } from '/@/store'
import { setupRouterGuard } from '/@/router/guard' // 路由守卫
import { registerGlobalComp } from '/@/components/registerGlobalComp'
import { setupErrorHandle } from '/@/plugins/error-handle'

// https://cn.windicss.org/integrations/vite.html
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
async function bootstrap() {
  const app = createApp(App)

  // Register global components: include elemenet-plus element-plus/icon /@/component/**
  registerGlobalComp(app)

  // Configure store
  setupStore(app)

  // config i18n
  await setupI18n(app)
  // Configure routing
  setupRouter(app)
  setupRouterGuard(router)

  // Configure global error handling
  setupErrorHandle(app)

  setupProdMockServer()
  app.mount('#app')
}

bootstrap()
