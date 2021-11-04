import { createApp } from 'vue'
import App from './App.vue'
import { setupProdMockServer } from '../mock/_mockProdServer'

import { setupRouter } from '/@/router'

async function bootstrap() {
  const app = createApp(App)
  // Configure routing
  setupRouter(app)
  setupProdMockServer()
  app.mount('#app')
}

bootstrap()
