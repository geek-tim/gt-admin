<template>
  <div
    style=""
    class="layout-siderbar-placeholder"
    :class="{
      'layout-siderbar-placeholder--collapsed': isSiderBarCollapsed
    }"
    v-if="isShowSiderBar"
  ></div>
  <div
    class="layout-siderbar layout-siderbar--fixed"
    :class="{
      'layout-siderbar--mix': isShowFullHeader,
      'layout-siderbar--collapsed': isSiderBarCollapsed
    }"
    v-if="isShowSiderBar"
  >
    <div>
      <AppLogo
        class="layout-header-mix-logo"
        theme="dark"
        v-if="!isShowFullHeader"
      />
      <LayoutMenu />
    </div>
  </div>
</template>
<script setup lang="ts">
import { unref, ref, computed } from 'vue'
import { useHeaderSetting } from '/@/hooks/setting/headerSetting'
import AppLogo from '../logo.vue'
import LayoutMenu from '../menu/index.vue'

const { getIsSidebarType, getIsTopMenuMix, getIsTopMenu, getIsMixSidebar } =
  useHeaderSetting()

const isShowSiderBar = computed(() => {
  return (
    unref(getIsSidebarType) || unref(getIsTopMenuMix) || unref(getIsMixSidebar)
  )
})

const isShowFullHeader = computed(() => {
  return unref(getIsTopMenu) || unref(getIsTopMenuMix)
})

const isSiderBarCollapsed = computed(() => {
  return unref(getIsMixSidebar)
})
</script>
<style lang="scss" scoped>
.layout-siderbar {
  .el-menu {
    border-right: none;
  }
}
</style>
'
