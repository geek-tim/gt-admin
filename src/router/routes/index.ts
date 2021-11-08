import Home from '/@/views/Home.vue'
import Login from '/@/views/sys/login//login.vue'
import Page2 from '/@/views/page2.vue'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'
import { LAYOUT } from './basic'

export const basicRoutes = [
  { name: 'home', path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/page2', component: Page2 },
  {
    path: '/test',
    name: 'test',
    component: LAYOUT,
    meta: {
      title: 'ErrorPage',
      hideBreadcrumb: true,
      hideMenu: true
    },
    children: [
      {
        path: 'page2',
        name: 'page2',
        component: Page2,
        meta: {
          title: 'ErrorPage',
          hideBreadcrumb: true,
          hideMenu: true
        }
      }
    ]
  },
  PAGE_NOT_FOUND_ROUTE
]
