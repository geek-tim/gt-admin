import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess, requestParams } from '../_util'

import Mock from 'mockjs'
import type { ErrorLogInfo } from '/#/store'
import { ErrorTypeEnum } from '/@/enums/exceptionEnum'

export function createTableList(pageSize) {
  const list: ErrorLogInfo[] = [
    {
      type: ErrorTypeEnum.RESOURCE,
      name: 'Resource Error!',
      file: 'http://localhost:3000/1636874167455.png',
      detail:
        '{"tagName":"img","html":"<img src=\\"1636874167455.png\\" style=\\"display: none;\\">","type":"error"}',
      url: 'http://localhost:3000/#/error-log/list',
      stack: 'resource is not found',
      message: 'img is load error',
      time: '2021-11-14 15:16'
    },
    {
      type: ErrorTypeEnum.VUE,
      name: 'ElButton',
      file: 'packages/components/button/src/button.vue',
      message: 'fire vue error!',
      stack:
        'Error: fire vue error!~fireVueError (http://localhost:3000/src/views/sys/error-log/index.vue:56:13)~callWithErrorHandling (http://localhost:3000/node_modules/.vite/chunk-77BFXVXK.js:5516:18)~callWithAsyncErrorHandling (http://localhost:3000/node_modules/.vite/chunk-77BFXVXK.js:5524:17)~emit$1 (http://localhost:3000/node_modules/.vite/chunk-77BFXVXK.js:1439:5)~http://localhost:3000/node_modules/.vite/chunk-77BFXVXK.js:5368:45~Proxy.handleClick (http://localhost:3000/node_modules/.vite/element-plus.js:10143:7)~createElementBlock.onClick._cache.<computed>._cache.<computed> (http://localhost:3000/node_modules/.vite/element-plus.js:10177:78)~callWithErrorHandling (http://localhost:3000/node_modules/.vite/chunk-77BFXVXK.js:5516:18)',
      detail: 'component event handler',
      url: 'http://localhost:3000/#/error-log/list',
      time: '2021-11-14 15:16'
    }
  ]
  return Mock.mock({
    [`array|${pageSize}`]: list
  }).array
}
export default [
  // mock user login
  {
    url: '/basic-api/table/basic',
    timeout: 2000,
    method: 'post',
    response: ({ body }) => {
      const { pageSize, currentPage } = body
      return resultSuccess({
        data: createTableList(pageSize),
        pageSize,
        currentPage,
        total: 120
      })
    }
  }
]
