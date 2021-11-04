import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
// https://www.npmjs.com/package/vite-plugin-mock
export function configMockPlugin() {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock'
  })
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), configMockPlugin()],
  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/'
      },
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/'
      }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "/@/styles/var.scss";'
      }
    }
  }
})
