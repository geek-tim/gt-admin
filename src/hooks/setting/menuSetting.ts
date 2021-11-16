import { useAppStore } from '/@/store/modules/app'
import { computed, unref } from 'vue'
import type { MenuSetting } from '/#/config'

export function useMenuSetting() {
  const appStore = useAppStore()
  const getMenuCollapsed = computed(() => appStore.getMenuSetting.collapsed)
  const getMenuType = computed(() => appStore.getMenuSetting.type)
  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getMenuCollapsed)
    })
  }
  return {
    toggleCollapsed,
    getMenuCollapsed,
    getMenuType
  }
}
