<template>
  <a-layout class="ant-layout" :class="prefixCls">
    <header
      class="layout-header layout-header--light"
      v-if="isShowFullHeader"
      style="color: black"
    >
      <div class="layout-header-left">
        <div
          class="layout-header-logo"
          :class="{
            'layout-siderbar-placeholder--collapsed': isSiderBarCollapsed
          }"
        >
          logo
        </div>
        <div class="layout-header-xxx">xxxx</div>
      </div>
      <div class="layout-header-action">xxxx</div>
    </header>
    <a-layout :class="layoutClass">
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
        <div class="layout-header-mix-logo" v-if="!isShowFullHeader">logo</div>
      </div>
      <!--main-->
      <a-layout class="ant-layout">
        <header
          class="layout-header layout-header--light"
          v-if="!isShowFullHeader"
          style="color: black"
        >
          <div class="layout-header-left">
            <div class="layout-header-xxx">xxxx</div>
          </div>
          <div class="layout-header-action">xxxx</div>
        </header>
        <div class="layout-main">
          <h1 class="pb-12">导航栏模式设置</h1>
          <div class="pl-12 vben-setting-menu-type-picker">
            <div
              class=" vben-setting-menu-type-picker__item vben-setting-menu-type-picker__item--sidebar"
              title="左侧菜单模式"
              @click="setSiderbarMode"
            >
              <div class="mix-sidebar"></div>
            </div>
            <div
              title="顶部菜单混合模式"
              @click="setMixSiderBarMode"
              class=" vben-setting-menu-type-picker__item vben-setting-menu-type-picker__item--mix vben-setting-menu-type-picker__item--active"
            >
              <div class="mix-sidebar"></div>
            </div>
            <div
              title="顶部菜单模式"
              @click="setTopMenuMode"
              class=" vben-setting-menu-type-picker__item vben-setting-menu-type-picker__item--top-menu"
            >
              <div class="mix-sidebar"></div>
            </div>
            <div
              title="左侧菜单混合模式"
              @click="setMixMode"
              class=" vben-setting-menu-type-picker__item vben-setting-menu-type-picker__item--mix-sidebar"
            >
              <div class="mix-sidebar"></div>
            </div>
          </div>
          <router-view> </router-view>
        </div>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
// import Layout from './layout'
const prefixCls = 'default-layout'
import { ref, unref, computed } from 'vue'
import { MenuTypeEnum } from '/@/enums/menuEnum'
const isShowSiderBar = computed(() => {
  return (
    unref(getIsSidebarType) || unref(getIsTopMenuMix) || unref(getIsMixSidebar)
  )
})

const isShowFullHeader = computed(() => {
  return unref(getIsTopMenu) || unref(getIsTopMenuMix) || unref(getIsMixSidebar)
})

const isSiderBarCollapsed = computed(() => {
  return unref(getIsMixSidebar)
})

const getMenuType = ref(MenuTypeEnum.SIDEBAR)

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
const layoutClass = computed(() => {
  let cls: string[] = ['ant-layout']
  if (unref(isShowSiderBar)) {
    cls.push('ant-layout--has-siderbar')
  }
  return cls
})
function setSiderbarMode() {
  getMenuType.value = MenuTypeEnum.SIDEBAR
}

function setMixSiderBarMode() {
  getMenuType.value = MenuTypeEnum.TOP_MENU_MIX
}
function setTopMenuMode() {
  getMenuType.value = MenuTypeEnum.TOP_MENU
}
function setMixMode() {
  getMenuType.value = MenuTypeEnum.MIX_SIDEBAR
}
</script>
<style lang="scss">
.ant-layout {
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 0;
  background: #f0f2f5;
  &--has-siderbar {
    flex-direction: row;
  }
}
.grid-content {
  height: 200px;
  background: red;
}
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
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  &-mix-logo {
    background: red;
    width: 210px;
    /*TODO end*/
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

.vben-setting-menu-type-picker {
  display: flex;
}

.vben-setting-menu-type-picker__item {
  position: relative;
  width: 56px;
  height: 48px;
  margin-right: 16px;
  overflow: hidden;
  cursor: pointer;
  background-color: #f0f2f5;
  border-radius: 4px;
  box-shadow: 0 1px 2.5px #0000002e;
}

.vben-setting-menu-type-picker__item:before,
.vben-setting-menu-type-picker__item:after {
  position: absolute;
  content: '';
}

.vben-setting-menu-type-picker__item--sidebar:before,
.vben-setting-menu-type-picker__item--light:before {
  top: 0;
  left: 0;
  z-index: 1;
  width: 33%;
  height: 100%;
  background-color: #273352;
  border-radius: 4px 0 0 4px;
}

.vben-setting-menu-type-picker__item--sidebar:after,
.vben-setting-menu-type-picker__item--light:after {
  top: 0;
  left: 0;
  width: 100%;
  height: 25%;
  background-color: #fff;
}

.vben-setting-menu-type-picker__item--mix:before {
  top: 0;
  left: 0;
  width: 33%;
  height: 100%;
  background-color: #fff;
  border-radius: 4px 0 0 4px;
}

.vben-setting-menu-type-picker__item--mix:after {
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 25%;
  background-color: #273352;
}

.vben-setting-menu-type-picker__item--top-menu:after {
  top: 0;
  left: 0;
  width: 100%;
  height: 25%;
  background-color: #273352;
}

.vben-setting-menu-type-picker__item--dark {
  background-color: #273352;
}

.vben-setting-menu-type-picker__item--mix-sidebar:before {
  top: 0;
  left: 0;
  z-index: 1;
  width: 25%;
  height: 100%;
  background-color: #273352;
  border-radius: 4px 0 0 4px;
}

.vben-setting-menu-type-picker__item--mix-sidebar:after {
  top: 0;
  left: 0;
  width: 100%;
  height: 25%;
  background-color: #fff;
}

.vben-setting-menu-type-picker__item--mix-sidebar .mix-sidebar {
  position: absolute;
  left: 25%;
  width: 15%;
  height: 100%;
  background-color: #fff;
}

.vben-setting-menu-type-picker__item:hover,
.vben-setting-menu-type-picker__item--active {
  padding: 12px;
  border: 2px solid #0960bd;
}

.vben-setting-menu-type-picker__item:hover:before,
.vben-setting-menu-type-picker__item--active:before,
.vben-setting-menu-type-picker__item:hover:after,
.vben-setting-menu-type-picker__item--active:after {
  border-radius: 0;
}

.vben-setting-menu-type-picker img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
