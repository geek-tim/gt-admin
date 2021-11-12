import type { AppRouteRecordRaw } from '/@/router/types'
import { PAGE_NOT_FOUND_NAME } from '/@/router/constant'

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
