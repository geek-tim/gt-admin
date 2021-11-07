<template>
  <header class="layout-header layout-header--light" style="color: black">
    <div class="layout-header-left">
      <AppLogo
        v-if="isShowFullHeader"
        theme="light"
        :class="getHeaderLogoClass"
      />
      <div class="layout-header-trigger">
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
import { Setting, Search, FullScreen, Fold } from '@element-plus/icons'
import SettingDrawer from '../../setting/SettingDrawer.vue'
import { unref, computed } from 'vue'
import { useHeaderSetting } from '/@/hooks/setting/headerSetting'
import AppLogo from '../logo.vue'

const { openDrawer, getIsTopMenu, getIsTopMenuMix } = useHeaderSetting()
const isShowFullHeader = computed(() => {
  return unref(getIsTopMenu) || unref(getIsTopMenuMix)
})
const getHeaderLogoClass = computed(() => {
  return ['layout-header-logo']
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
</style>
