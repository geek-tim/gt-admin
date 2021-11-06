import type { Router, RouteLocationNormalized } from 'vue-router'
import nProgress from 'nprogress'
import { PageEnum } from '/@/enums/pageEnum'
import { useUserStore } from '/@/store/modules/user'
export function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
}

// 白名单
const whitePathList: PageEnum[] = [PageEnum.BASE_LOGIN]

function createPermissionGuard(router) {
  const userStore = useUserStore()
  router.beforeEach(async (to, from, next) => {
    const token = userStore.getToken
    // 白名单直接进入
    if (whitePathList.includes(to.path as PageEnum)) {
      // 已经登录，直接进入主页
      if (to.path === PageEnum.BASE_LOGIN && token) {
        await userStore.afterLoginAction()
        next((to.query?.redirect as string) || '/')
        return
      }
      next()
      return
    }
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        // 无需授权页面，直接进入(等同于白名单)
        next()
        return
      }
      // redirect login page
      const redirectData: {
        path: string
        replace: boolean
        query?: Recordable<string>
      } = {
        path: PageEnum.BASE_LOGIN,
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }
      next(redirectData)
      return
    }
    // 处理含有重定向参数的路由
    if (from.query.redirect) {
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData =
        to.path === redirect ? { ...to, replace: true } : { path: redirect }
      return next(nextData)
    }
    next()
  })

  // 用户权限控制
}

function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()
  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path)
  })
  router.afterEach(async (to) => {})
}

// 顶部进度条
export function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    // 已经加载过页面不显示进度条
    if (to.meta.loaded) {
      return true
    }
    nProgress.start()
    return true
  })

  router.afterEach(async () => {
    nProgress.done()
    return true
  })
}
