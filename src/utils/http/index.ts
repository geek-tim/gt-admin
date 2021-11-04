import { VAxios } from './Axios'
import type { AxiosResponse } from 'axios'
import { isString } from '/@/utils/is'
import { joinTimestamp, joinObjParams2Url } from '/@/utils/helper'

// 设计具体业务相关接口形式
import type { CreateAxiosOptions, AxiosTransform } from './AixosTransform'

const globSetting = {
  apiUrl: '/basic-api',
  urlPrefix: ''
}
const urlPrefix = globSetting.urlPrefix

const transform: AxiosTransform = {
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, joinTime = true } = options
    // 应用层面的prefix
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    // 接口层面的prefix
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }

    const params = config.params || {}
    const data = config.data || false
    if (config.method?.toUpperCase() === 'GET') {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false)
        )
      } else {
        // 兼容restful风格 TODO
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          Object.keys(config.data).length > 0
        ) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }

        if (joinParamsToUrl) {
          config.url = joinObjParams2Url(
            config.url as string,
            Object.assign({}, config.params, config.data)
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },
  transformRequestHook: (res, options) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }

    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }

    if (!res || !res.data) {
      // return '[HTTP] Request has no return value';
      throw new Error('请求失败')
    }
    //  这里 code，data，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const result = res.data
    const { code, data } = result

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = result && Reflect.has(result, 'code') && code === 0
    if (hasSuccess) {
      return data
    }
  },

  requestInterceptors: (config, options) => {
    // 这里处理config修改
    return config
  },
  /**
   * @description: 响应拦截器处理：处理原始响应
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },
  requestInterceptorsCatch: (error: Error) => {
    // 这里请求参数错误信息
  },
  responseInterceptorsCatch: (error: Error) => {
    // 这里响应返回需要上报的错误信息
  }
}
function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    Object.assign(
      {
        timeout: 10 * 1000, // 超时
        urlPrefix: globSetting.urlPrefix, // 请求前缀
        transform,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          apiUrl: globSetting.apiUrl
        }
      },
      opt || {}
    )
  )
}

export const http = createAxios()
