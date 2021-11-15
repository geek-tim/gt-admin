import Home from '/@/views/page2.vue'
import Login from '/@/views/sys/login//login.vue'
import { PAGE_NOT_FOUND_ROUTE, ERROR_LOG_ROUTE } from '/@/router/routes/basic'
import type { AppRouteRecordRaw } from '/@/router/types'
import pageRoutes from './modules/page'

import { $t } from '/@/hooks/web/useI18n'

export const basicRoutes: AppRouteRecordRaw[] = [
  {
    name: 'page2',
    path: '/page2',
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
  ERROR_LOG_ROUTE,
  PAGE_NOT_FOUND_ROUTE
]
