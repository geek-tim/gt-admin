<template>
  <header class="layout-header layout-header--light" :style="getWrapStyle">
    <div class="layout-header-left">
      <AppLogo
        v-if="isShowFullHeader"
        theme="light"
        :class="getHeaderLogoClass"
      />
      <div
        class="layout-header-trigger"
        v-show="getShowFold"
        @click="toggleCollapsed"
      >
        <el-icon :size="20" :color="color"><fold /></el-icon>
      </div>
    </div>
    <div class="layout-header-action">
      <div class="layout-header-action__item">
        <el-icon :size="20" :color="color"><Search /></el-icon>
      </div>
      <div class="layout-header-action__item">
        <el-icon :size="20" :color="color"><full-screen /></el-icon>
      </div>
      <div class="layout-header-action__item">
        <el-icon :size="20" :color="color" @click="openDrawer"
          ><Setting />
          <SettingDrawer></SettingDrawer>
        </el-icon>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { unref, CSSProperties, computed } from 'vue'
import { Setting, Search, FullScreen, Fold } from '@element-plus/icons'
import SettingDrawer from '../../setting/SettingDrawer.vue'
import { useHeaderSetting } from '/@/hooks/setting/headerSetting'
import { useMenuSetting } from '/@/hooks/setting/menuSetting'
import AppLogo from '../logo.vue'

const {
  openDrawer,
  getIsTopMenu,
  getIsTopMenuMix,
  getIsSidebarType,
  getIsMixSidebar
} = useHeaderSetting()

const { toggleCollapsed } = useMenuSetting()

const isShowFullHeader = computed(() => {
  return unref(getIsTopMenu) || unref(getIsTopMenuMix)
})

const getShowFold = computed(() => {
  return unref(getIsTopMenuMix) || unref(getIsSidebarType)
})
const getHeaderLogoClass = computed(() => {
  return ['layout-header-logo']
})

const getWrapStyle = computed((): CSSProperties => {
  const style: CSSProperties = {}
  if (unref(getIsSidebarType)) {
    style.width = 'calc(100% - 210px)'
  }
  if (unref(getIsMixSidebar)) {
    style.width = 'calc(100% - 48px)'
  }
  return style
})

const color = '#000000d9'
</script>
<style lang="scss">
.layout-header-trigger {
  display: flex;
  height: 100%;
  padding: 1px 10px 0;
  cursor: pointer;
  align-items: center;
}
.layout-header-action__item {
  display: flex !important;
  height: 48px;
  padding: 0 6px;
  font-size: 1.2em;
  cursor: pointer;
  align-items: center;
}

.layout-header--light {
  background-color: #fff !important;
  border-bottom: 1px solid #eee;
  border-left: 1px solid #eee;
}
.layout-header--fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  width: 100%;
}
.layout-multiple-header--fixed {
  position: fixed;
  top: 0;
  z-index: 505;
  width: 100%;
}
</style>
