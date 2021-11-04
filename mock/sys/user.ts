import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess } from '../_util'

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'geek-tim',
      realName: 'geek-tim Admin',
      avatar: '',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super'
        }
      ]
    }
  ]
}

export default [
  // mock user login
  {
    url: '/basic-api/login',
    timeout: 2000,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password
      )
      if (!checkUser) {
        return resultError('Incorrect account or password！')
      }
      const {
        userId,
        username: _username,
        token,
        realName,
        desc,
        roles
      } = checkUser
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
        desc
      })
    }
  }
] as MockMethod[]
