// 通用Axios

import axios from 'axios'
import type { RequestOptions, Result } from '/#/axios'
import { isFunction } from '/@/utils/is'
import type { CreateAxiosOptions } from './AixosTransform'
import { cloneDeep } from 'lodash-es'

import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from 'axios'

import { AxiosCanceler } from './AxiosCanceler'

// 创建axios实例
export class VAxios {
  axiosInstance: AxiosInstance
  axiosCanceler: AxiosCanceler
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.axiosCanceler = new AxiosCanceler()
    this.setupInterceptors()
  }
  private getTransform() {
    const { transform } = this.options
    return transform
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance
  }
  /**
   * @description: Set general header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }
  setupInterceptors(): void {
    this.setRequestInterceptor()
    this.setResponseInterceptor()
  }
  setRequestInterceptor(): void {
    const transform = this.getTransform()
    if (!transform) {
      return
    }
    const { requestInterceptors, requestInterceptorsCatch } = transform
    // Request interceptor configuration processing
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // If cancel repeat request is turned on, then cancel repeat request is prohibited
        const {
          headers: { ignoreCancelToken }
        } = config

        const ignoreCancel =
          ignoreCancelToken !== undefined
            ? ignoreCancelToken
            : this.options.requestOptions?.ignoreCancelToken

        // 是否忽略请求
        !ignoreCancel && this.axiosCanceler.addPending(config)

        // 自定义请求拦截 requestInterceptors
        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options)
        }
        return config
      },
      (error) => {
        return (
          requestInterceptorsCatch &&
          isFunction(requestInterceptorsCatch) &&
          requestInterceptorsCatch(error)
        )
      }
    )
  }
  setResponseInterceptor() {
    const transform = this.getTransform()
    if (!transform) {
      return
    }
    const { responseInterceptors, responseInterceptorsCatch } = transform
    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse<any>) => {
        res && this.axiosCanceler.removePending(res.config)
        // 自定义相应拦截
        if (responseInterceptors && isFunction(responseInterceptors)) {
          res = responseInterceptors(res)
        }
        return res
      },
      (error) => {
        return (
          responseInterceptorsCatch &&
          isFunction(responseInterceptorsCatch) &&
          responseInterceptorsCatch(error)
        )
      }
    )
  }

  //  ======== 通用请求方法 ======== start
  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }
  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      let conf: CreateAxiosOptions = cloneDeep(config)
      const transform = this.getTransform()
      const { requestOptions } = this.options
      const opt: RequestOptions = Object.assign({}, requestOptions, options)
      const { beforeRequestHook, requestCatchHook, transformRequestHook } =
        transform || {}

      if (beforeRequestHook && isFunction(beforeRequestHook)) {
        conf = beforeRequestHook(conf, opt)
      }
      conf.requestOptions = opt

      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e)
        })
    })
  }
  //  ======== 通用请求方法 ======== end
}
