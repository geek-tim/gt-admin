import { defineConfig } from 'vite'
import { resolve } from 'path'
import { loadEnv } from 'vite'

import { createVitePlugins } from './build/vite/plugins/index'
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {}
  for (const key of Object.keys(envConf)) {
    const value = envConf[key]
    ret[key] = value
  }
  return ret
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  console.log('env--', env)

  return {
    plugins: createVitePlugins(wrapperEnv(env)),
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
  }
})
