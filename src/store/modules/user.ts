import { defineStore } from 'pinia'
import { useDbStore } from './db'
import cookies from '/@/utils/cache/cookies'
import { doLogout, getUserInfo, loginApi } from '/@/api/sys/user'
import { router } from '/@/router'
import { PageEnum } from '/@/enums/pageEnum'
import { isArray } from '/@/utils/is'

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
  getters: {
    getToken(): string {
      return this.token || getAuthCode()
    },
    async getUserInfo(): Promise<UserInfo | null> {
      let userInfo = this.userInfo
      if (!this.userInfo) {
        const dbStore = useDbStore()
        userInfo = (await dbStore.get({
          dbName: 'sys',
          path: 'userInfo',
          user: true
        })) as UserInfo
      }
      return userInfo
    }
  },
  actions: {
    async login(params) {
      try {
        const { ...loginParams } = params
        const data = await loginApi(loginParams)
        const { token } = data
        // save token
        this.setToken(token)
        // router home
        await this.afterLoginAction()
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction() {
      if (!this.getToken) return null
      const userInfo = await this.getUserInfoAction()
      // TODO 权限信息初始化
      await router.replace(userInfo.homePath || PageEnum.BASE_HOME)
      return userInfo
    },
    async logout() {
      if (this.token) {
        try {
          await doLogout()
        } catch {
          console.log('注销Token失败')
        }
      }
    },
    async getUserInfoAction(): Promise<UserInfo> {
      const userInfo = await getUserInfo()
      const { roles = [] } = userInfo
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[]
        this.setRoleList(roleList)
      } else {
        userInfo.roles = []
        this.setRoleList([])
      }
      this.setUserInfo(userInfo)
      return userInfo
    },
    setToken(info: string | undefined) {
      this.token = info
      // 这里暂时缓存成cookie ，根据自身业务修改
      setAuthCode(info)
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()

      const dbStore = useDbStore()
      dbStore.set({
        dbName: 'sys',
        path: 'userInfo',
        value: info,
        user: true
      })
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
      // setAuthCache(ROLES_KEY, roleList);
    },
    resetState() {
      this.userInfo = null
      this.token = ''
      this.roleList = []
      this.sessionTimeout = false
    }
  }
})

function setAuthCode(code) {
  cookies.set('token', code)
}
function getAuthCode() {
  return cookies.get('token')
}
