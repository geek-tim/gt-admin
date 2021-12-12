import type { AppRouteRecordRaw } from '/@/router/types'

import { LAYOUT } from '../basic'
import { $t } from '/@/hooks/web/useI18n'

const dashboard: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'menu',
    title: $t('routes.dashboard.dashboard')
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/dashboard/analysis/index.vue'),
      meta: {
        // affix: true,
        title: $t('routes.dashboard.analysis')
      }
    }
  ]
}

export default dashboard
