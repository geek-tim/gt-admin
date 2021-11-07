<template>
  <div class="gt-layout default-layout">
    <layout-header v-if="isShowFullHeader"></layout-header>
    <div :class="layoutClass">
      <!--siderbar-->
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
        </div>
      </div>
      <!--main-->
      <div class="gt-layout">
        <layout-header
          v-if="!isShowFullHeader"
          :isShowFullHeader="isShowFullHeader"
        ></layout-header>
        <div class="layout-main">
          <router-view> </router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LayoutHeader from './layout/header/index.vue'
import { unref, computed } from 'vue'
import { useHeaderSetting } from '/@/hooks/setting/headerSetting'
import AppLogo from './layout/logo.vue'

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

const layoutClass = computed(() => {
  let cls: string[] = ['gt-layout']
  if (unref(isShowSiderBar)) {
    cls.push('gt-layout--has-siderbar')
  }
  return cls
})
</script>
<style lang="scss">
/* gt-ui */
.gt-layout {
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 0;
  background: #f0f2f5;
  &--has-siderbar {
    flex-direction: row;
  }
}

/* app ui*/
.default-layout {
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: #f4f7f9;
  flex-direction: column;
}

.layout-header {
  display: flex;
  height: 48px;
  padding: 0;
  margin-left: -1px;
  line-height: 48px;
  color: #fff;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  &-left {
    display: flex;
    height: 100%;
    align-items: center;
  }

  &-logo {
    /*TODO start*/
    width: 210px;
    background-color: #fff;
    /*TODO end*/
    border-bottom: 1px solid #d9d9d9;
  }
  &-log {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  &-action {
    display: flex;
    min-width: 180px;
    align-items: center;
  }
  &--linght {
    background-color: #fff !important;
    border-bottom: 1px solid #eee;
    border-left: 1px solid #eee;
  }
}

.layout-siderbar {
  flex: 0 0 210px;
  max-width: 210px;
  min-width: 210px;
  width: 210px;
  background: #001529;
  transition: all 0.2s;
  &-placeholder {
    width: 210px;
    overflow: hidden;
    flex: 0 0 210px;
    max-width: 210px;
    min-width: 210px;
    transition: all 0.2s ease 0s;
    &--collapsed {
      flex: 0 0 48px;
      max-width: 48px;
      min-width: 48px;
      width: 48px;
    }
  }
  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
  }
  &--collapsed {
    flex: 0 0 48px;
    max-width: 48px;
    min-width: 48px;
    width: 48px;
  }
  &--mix {
    top: 48px;
    height: calc(100% - 48px);
  }
}
</style>
