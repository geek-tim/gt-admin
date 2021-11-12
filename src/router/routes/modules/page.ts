import type { AppRouteRecordRaw } from '/@/router/types'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
import { ExceptionEnum } from '/@/enums/exceptionEnum'
import { LAYOUT } from '../basic'
import { $t } from '/@/hooks/web/useI18n'

const ExceptionPage = () => import('/@/views/sys/exception/Exception.vue')

const meta = { auth: true }

function _import(path, pre = '') {
  const examplePath = pre.replace(/-/g, '/')
  console.log(examplePath)
  return import(`/@/views/${examplePath}${path}.vue`)
}

const pageRoutes: AppRouteRecordRaw = {
  path: '/demo/page',
  name: 'demo-page',
  redirect: { name: 'demo-page-form-basic' },
  component: LAYOUT,
  meta: {
    ...meta,
    title: 'demo'
  },
  children: ((pre) => [
    // =============================from end=============================
    {
      path: 'form/basic',
      name: `${pre}form-basic`,
      component: _import('basic', pre + 'form-'),
      meta: {
        ...meta,
        title: $t('routes.demo.page.formBasic')
      }
    },
    {
      path: 'form/step',
      name: `${pre}form-step`,
      component: _import('step', pre + 'form-'),
      meta: {
        ...meta,
        title: $t('routes.demo.page.formStep')
      }
    },
    {
      path: 'form/high',
      name: `${pre}form-high`,
      component: _import('high', pre + 'form-'),
      meta: {
        ...meta,
        title: $t('routes.demo.page.formHigh')
      }
    },
    // =============================from end=============================
    // =============================exception start=============================

    {
      path: 'exception/403',
      name: `${pre}-page-not-access`,
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.PAGE_NOT_ACCESS
      },
      meta: {
        title: '403'
      }
    },
    {
      path: 'exception/404',
      name: `${pre}-exception-page-not-found`,
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.PAGE_NOT_FOUND
      },
      meta: {
        title: '404'
      }
    },
    {
      path: 'exception/500',
      name: `${pre}-exception-ServiceError`,
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.ERROR
      },
      meta: {
        title: '500'
      }
    },
    {
      path: 'exception/net-work-error',
      name: `${pre}-exception-net-work-error`,
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.NET_WORK_ERROR
      },
      meta: {
        title: $t('routes.demo.page.netWorkError')
      }
    },
    {
      path: 'exception/no-data',
      name: `${pre}-exception-not-data`,
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.PAGE_NOT_DATA
      },
      meta: {
        title: $t('routes.demo.page.notData')
      }
    }
    // =============================exception end=============================
  ])('demo-page-')
}

export default pageRoutes
