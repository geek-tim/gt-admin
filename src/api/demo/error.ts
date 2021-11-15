import { http } from '/@/utils/http'

enum Api {
  // The address does not exist
  Error = '/error'
}

/**
 * @description: Trigger ajax error
 */

export const fireErrorApi = () => http.get({ url: Api.Error })
