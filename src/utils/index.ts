import type { App, Plugin } from 'vue'

/**
 * 获取地址上的指定参数的值
 * @param {String} name
 * // search = "?a=1&b=2"
 * @example:getQuery(a) => ('1')
 */
export const getQuery = (name: string): string | null => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return unescape(r[2])
  }
  return null
}

export function stringifyPrimitive(v) {
  if (typeof v === 'string') return v
  if (typeof v === 'number' && isFinite(v)) return '' + v
  if (typeof v === 'boolean') return v ? 'true' : 'false'
  return ''
}

/**
 * URL 查询参数search序列化
 *
 * @param {obj} obj
 *
 * @example:getQuery({a:1,b:2}) => ('a=1&b=2')
 */
export const queryStringify = (obj: object) => {
  const sep = '&'
  const eq = '='
  if (obj !== null && typeof obj === 'object') {
    const keys = Object.keys(obj)
    const len = keys.length
    const flast = len - 1
    let fields = ''
    for (let i = 0; i < len; ++i) {
      const k = keys[i]
      const v = obj[k]
      const ks = encodeURIComponent(stringifyPrimitive(k)) + eq

      if (Array.isArray(v)) {
        const vlen = v.length
        const vlast = vlen - 1
        for (let j = 0; j < vlen; ++j) {
          fields += ks + encodeURIComponent(stringifyPrimitive(v[j]))
          if (j < vlast) fields += sep
        }
        if (vlen && i < flast) fields += sep
      } else {
        fields += ks + encodeURIComponent(stringifyPrimitive(v))
        if (i < flast) fields += sep
      }
    }
    return fields
  }
  return ''
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    console.log(comp.name, comp.displayName)
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}
