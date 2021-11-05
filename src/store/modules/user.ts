import { defineStore } from 'pinia'
import { useDbStore } from './db'
import { loginApi, doLogout } from '/@/api/sys/user'
import { router } from '/@/router'

export interface RoleInfo {
  roleName: string
  value: string
}

export enum RoleEnum {
  // super admin
  SUPER = 'super',

  // tester
  TEST = 'test'
}

interface UserInfo {
  userId: string | number
  username: string
  realName: string
  avatar: string
  desc?: string
  homePath?: string
  roles: RoleInfo[]
}

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0
  }),
  actions: {
    async login(params) {
      try {
        const { ...loginParams } = params
        const data = await loginApi(loginParams)
        const { token } = data
        // save token
        this.setToken(token)

        // router home
        await router.replace('home')

        const dbStore = useDbStore()
        dbStore.set({
          dbName: 'sys',
          path: 'userInfo',
          value: data,
          user: true
        })
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async logout(goLogin = false) {
      if (this.token) {
        try {
          await doLogout()
        } catch {
          console.log('注销Token失败')
        }
      }
    },
    setToken(info: string | undefined) {
      this.token = info
    },
    resetState() {
      this.userInfo = null
      this.token = ''
      this.roleList = []
      this.sessionTimeout = false
    }
  }
})
