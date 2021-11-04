import { createApp } from 'vue'
import App from './App.vue'
import { setupProdMockServer } from '../mock/_mockProdServer'
import { setupRouter } from '/@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// https://cn.windicss.org/integrations/vite.html
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

async function bootstrap() {
  const app = createApp(App)
  app.use(ElementPlus)

  // Configure routing
  setupRouter(app)
  setupProdMockServer()
  app.mount('#app')
}

bootstrap()
