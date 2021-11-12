import Home from '/@/views/Home.vue'
import Login from '/@/views/sys/login//login.vue'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'
import type { AppRouteRecordRaw } from '/@/router/types'
import pageRoutes from './modules/page'

import { $t } from '/@/hooks/web/useI18n'

export const basicRoutes: AppRouteRecordRaw[] = [
  {
    name: 'home',
    path: '/home',
    component: Home,
    meta: { title: '主页', icon: 'i-setting', alwaysShow: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: $t('routes.basic.login'), hidden: true }
  },
  pageRoutes,
  PAGE_NOT_FOUND_ROUTE
]
