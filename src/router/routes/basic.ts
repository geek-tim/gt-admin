import type { AppRouteRecordRaw } from '/@/router/types'
import { PAGE_NOT_FOUND_NAME } from '/@/router/constant'
import { $t } from '/@/hooks/web/useI18n'

export const EXCEPTION_COMPONENT = () =>
  import('/@/views/sys/exception/Exception.vue')

/**
 * @description: default layout
 */
export const LAYOUT = () => import('/@/layouts/default/index.vue')

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hidden: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hidden: true
      }
    }
  ]
}

export const ERROR_LOG_ROUTE: AppRouteRecordRaw = {
  path: '/error-log',
  name: 'ErrorLog',
  component: LAYOUT,
  redirect: '/error-log/list',
  meta: {
    title: 'ErrorLog',
    hideBreadcrumb: true,
    hideChildrenInMenu: true,
    hidden: true
  },
  children: [
    {
      path: 'list',
      name: 'ErrorLogList',
      component: () => import('/@/views/sys/error-log/index.vue'),
      meta: {
        title: $t('routes.basic.errorLogList'),
        hideBreadcrumb: true,
        currentActiveMenu: '/error-log'
      }
    }
  ]
}
