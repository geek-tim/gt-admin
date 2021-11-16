import { http } from '/@/utils/http'

enum Api {
  TableBasic = '/table/basic'
}

export function getTableList(params) {
  return http.post({
    url: Api.TableBasic,
    params
  })
}
