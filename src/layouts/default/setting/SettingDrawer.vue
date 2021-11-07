<template>
  <el-drawer
    v-model="getShowHeaderSetting"
    title="项目配置"
    :direction="direction"
    :before-close="handleClose"
    :size="330"
    :append-to-body="true"
  >
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
        @click="setTopMenuMixMode"
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
  </el-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useHeaderSetting } from '/@/hooks/setting/headerSetting'
const { getShowHeaderSetting, closeDrawer } = useHeaderSetting()
import { MenuTypeEnum } from '/@/enums/menuEnum'
import { useAppStore } from '/@/store/modules/app'

const appStore = useAppStore()
const direction = ref('rtl')
function handleClose() {
  closeDrawer()
}

function setSiderbarMode() {
  appStore.setProjectConfig({
    menuSetting: { type: MenuTypeEnum.SIDEBAR, collapsed: false }
  })
  closeDrawer()
}

function setTopMenuMixMode() {
  appStore.setProjectConfig({
    menuSetting: { type: MenuTypeEnum.TOP_MENU_MIX, collapsed: false }
  })
  closeDrawer()
}
function setTopMenuMode() {
  appStore.setProjectConfig({
    menuSetting: { type: MenuTypeEnum.TOP_MENU, collapsed: false }
  })
  closeDrawer()
}
function setMixMode() {
  appStore.setProjectConfig({
    menuSetting: { type: MenuTypeEnum.MIX_SIDEBAR, collapsed: true }
  })
  closeDrawer()
}
</script>
<style lang="scss">
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
'
