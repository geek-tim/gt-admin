import Home from '/@/views/Home.vue'
import Login from '/@/views/sys/login//login.vue'
import Page2 from '/@/views/page2.vue'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'

export const basicRoutes = [
  { name: 'home', path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/page2', component: Page2 },
  PAGE_NOT_FOUND_ROUTE
]
