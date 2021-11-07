<template>
  <div :class="getAppLogoClass">
    <img src="../../../assets/logo.png" />
    <div
      class="ml-2 md:opacity-100 gt-app-logo__title xs:opacity-0"
      v-show="showTitle"
    >
      {{ title }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, unref, computed, defineProps } from 'vue'
const title = ref('Admin')
import { useMenuSetting } from '/@/hooks/setting/menuSetting'
import { useHeaderSetting } from '/@/hooks/setting/headerSetting'

const { getIsSidebarType, getIsTopMenuMix, getIsMixSidebar } =
  useHeaderSetting()

const props = defineProps({
  theme: {
    type: String,
    validator: (v: string) => ['light', 'dark'].includes(v)
  }
})

const isShowSiderBar = computed(() => {
  return unref(getIsSidebarType) || unref(getIsMixSidebar)
})

const { getMenuCollapsed } = useMenuSetting()
const prefixCls = 'gt-app-logo'
const getAppLogoClass = computed(() => [
  prefixCls,
  unref(isShowSiderBar) ? 'dark' : 'light',
  { 'collapsed-show-title': !unref(getMenuCollapsed) }
])
const showTitle = computed(() => {
  return !unref(getMenuCollapsed)
})
</script>
<style lang="scss">
/*
  1、
  2、
  3、layout-menu-logo
  4、layout-mix-sider-logo     padding-left: 0!important;
*/
$prefix-cls: '#{$namespace}-app-logo';
.#{$prefix-cls} {
  display: flex;
  align-items: center;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;

  &.light {
    border-bottom: 1px solid $border-color-base;
  }

  &.collapsed-show-title {
    padding-left: 20px;
  }

  &.light &__title {
    color: $primary-color;
  }

  &.dark &__title {
    color: $white;
  }

  &__title {
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s;
  }
  height: 48px;
  min-width: 192px;
  padding: 0 10px;
  font-size: 14px;

  img {
    width: 32px;
    height: 32px;
    margin-right: 2px;
  }
}
</style>
