import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { basicRoutes } from './routes'

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// config router
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function setupRouter(app: App<Element>) {
  app.use(router)
}
