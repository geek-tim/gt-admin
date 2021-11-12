import Home from '/@/views/Home.vue'
import Login from '/@/views/sys/login//login.vue'
import Page2 from '/@/views/page2.vue'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'
import { LAYOUT } from './basic'
import type { AppRouteRecordRaw } from '/@/router/types'
import pageRoutes from './modules/page'
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
    meta: { title: '登录页', icon: 'i-setting', hidden: true }
  },
  pageRoutes,
  // {
  //   path: '/page',
  //   component: Page2,
  //   name: 'page',
  //   meta: { title: '页面', icon: 'i-setting' },
  //   children: [
  //     {
  //       path: '/form',
  //       name: 'form',
  //       meta: {
  //         title: 'page2'
  //       },
  //       component: () =>
  //         new Promise((resolve) => {
  //           resolve({
  //             name: 'form'
  //           })
  //         }),
  //       children: [
  //         {
  //           path: '/index',
  //           name: 'index',
  //           component: Page2,
  //           meta: {
  //             title: '基础表单'
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: LAYOUT,
  //   meta: {
  //     title: 'page2',
  //     icon: 'i-setting',
  //     hideBreadcrumb: true,
  //     hideMenu: true
  //   },
  //   children: [
  //     {
  //       path: 'page2',
  //       name: 'page2',
  //       component: Page2,
  //       meta: {
  //         title: 'page2',
  //         hideBreadcrumb: true,
  //         hideMenu: true
  //       }
  //     }
  //   ]
  // },
  PAGE_NOT_FOUND_ROUTE
]
