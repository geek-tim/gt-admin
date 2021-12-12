import type { AppRouteRecordRaw } from '/@/router/types'
import { LAYOUT } from '../basic'
import { $t } from '/@/hooks/web/useI18n'

function _import(path, pre = '') {
  const examplePath = pre.replace(/-/g, '/')
  console.log(examplePath)
  return import(`/@/views/${examplePath}${path}.vue`)
}
const toolsRoutes: AppRouteRecordRaw = {
  path: '/demo/tools',
  name: 'demo-tools',
  redirect: { name: 'demo-tools' },
  component: LAYOUT,
  meta: {
    icon: 'help-filled',
    title: 'tools'
  },
  children: ((pre) => [
    {
      path: 'playground/prettier',
      name: `${pre}playground-prettier`,
      component: _import('prettier', pre + 'playground-'),

      meta: {
        title: $t('routes.demo.tools.playground.prettier')
      }
    },
    {
      path: 'goldenLayout/index',
      name: `${pre}goldenLayout`,
      component: _import('index', pre + 'goldenLayout-'),
      meta: {
        title: $t('routes.demo.tools.goldenLayout')
      }
    }
  ])('demo-tools-')
}

// ts
// ast 语法树
// prettier

export default toolsRoutes
