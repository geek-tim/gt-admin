// https://www.npmjs.com/package/vite-plugin-mock
import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin() {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock'
  })
}
