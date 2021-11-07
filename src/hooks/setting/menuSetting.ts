import { useAppStore } from '/@/store/modules/app'
import { computed, ref, unref } from 'vue'
// import { MenuTypeEnum } from '/@/enums/menuEnum'

export function useMenuSetting() {
  const appStore = useAppStore()
  const getMenuCollapsed = computed(() => appStore.getMenuSetting.collapsed)
  const getMenuType = computed(() => appStore.getMenuSetting.type)

  return {
    getMenuCollapsed,
    getMenuType
  }
}
