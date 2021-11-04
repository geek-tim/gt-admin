import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' // 添加这一句
import windiCSS from 'vite-plugin-windicss'
import { configMockPlugin } from './mock'

export function createVitePlugins(viteEnv: ViteEnv) {
  const { VITE_USE_MOCK } = viteEnv
  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    // have to
    vueJsx()
  ]
  // vite-plugin-windicss
  vitePlugins.push(windiCSS())
  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin())

  return vitePlugins
}
