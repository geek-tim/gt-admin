import type { AppRouteRecordRaw } from '/@/router/types'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
import { LAYOUT } from '../basic'

const meta = { auth: true }

function _import(path, pre = '') {
  const examplePath = pre.replace(/-/g, '/')
  return import(`/@/views/${examplePath}${path}.vue`)
}

const componentRoutes: AppRouteRecordRaw = {
  path: '/demo/components',
  name: 'demo-components',
  meta,
  redirect: { name: 'demo-components-index' },
  component: LAYOUT,
  children: ((pre) => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('index', pre),
      meta: {
        ...meta,
        title: '基础组件'
      }
    },
    {
      path: 'form/index',
      name: `${pre}form-index`,
      component: _import('index', pre + 'form-'),
      meta: {
        ...meta,
        title: '基础表单'
      }
    },
    {
      path: 'form/validate',
      name: `${pre}form-validate`,
      component: _import('validate', pre + 'form-'),
      meta: {
        ...meta,
        title: '表单校验示例'
      }
    }
    // {
    //   path: 'table',
    //   name: `${pre}table`,
    //   component: _import('table', pre),
    //   meta: {
    //     ...meta,
    //     title: '表格'
    //   }
    // }
  ])('demo-components-')
}

export default componentRoutes
