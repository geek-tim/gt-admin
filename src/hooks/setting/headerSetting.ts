import { useAppStore } from '/@/store/modules/app'
import { computed, unref } from 'vue'
import { MenuTypeEnum } from '/@/enums/menuEnum'
import { useMenuSetting } from './menuSetting'

export function useHeaderSetting() {
  const appStore = useAppStore()
  const { getMenuType } = useMenuSetting()

  const getShowHeaderSetting = computed(() => appStore.getHeaderSetting.show)
  const openDrawer = function () {
    appStore.setProjectConfig({ headerSetting: { show: true } })
  }
  const closeDrawer = function () {
    appStore.setProjectConfig({ headerSetting: { show: false } })
  }

  const getIsSidebarType = computed(
    () => unref(getMenuType) === MenuTypeEnum.SIDEBAR // 左侧菜单模式
  )
  const getIsTopMenuMix = computed(() => {
    return (
      // unref(getMenuMode) === MenuModeEnum.INLINE &&
      unref(getMenuType) === MenuTypeEnum.TOP_MENU_MIX //顶部菜单混合模式
    )
  })

  const getIsTopMenu = computed(
    () => unref(getMenuType) === MenuTypeEnum.TOP_MENU // 顶部菜单模式
  )

  const getIsMixSidebar = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR // 左侧菜单混合模式
  })

  return {
    openDrawer,
    closeDrawer,
    getShowHeaderSetting,

    getIsTopMenu,
    getIsMixSidebar,
    getIsTopMenuMix,
    getIsSidebarType
  }
}
