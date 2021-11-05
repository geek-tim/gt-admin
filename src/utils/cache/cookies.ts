import Cookies from 'js-cookie'
import { useGlobSetting } from '/@/hooks/setting'

interface ICookies {
  set: Function
  get: Function
  getAll: Function
  remove: Function
}
const globalSetting = useGlobSetting()
const appCookieKeyPrefix = `${globalSetting.shortName}-${globalSetting.version}`

const cookies: ICookies = {
  /**
   * @description 存储 cookie 值
   * @param {String} name cookie name
   * @param {String} value cookie value
   * @param {Object} setting cookie setting
   */
  set: function (name = 'default', value = '', cookieSetting = {}) {
    const currentCookieSetting = {
      expires: 1
    }
    Object.assign(currentCookieSetting, cookieSetting)
    Cookies.set(`${appCookieKeyPrefix}-${name}`, value, currentCookieSetting)
  },

  /**
   * @description 拿到 cookie 值
   * @param {String} name cookie name
   */
  get: function (name = 'default') {
    return Cookies.get(`${appCookieKeyPrefix}-${name}`)
  },

  /**
   * @description 拿到 cookie 全部的值
   */
  getAll: function () {
    return Cookies.get()
  },

  /**
   * @description 删除 cookie
   * @param {String} name cookie name
   */
  remove: function (name = 'default') {
    return Cookies.remove(`${appCookieKeyPrefix}-${name}`)
  }
}

export default cookies
