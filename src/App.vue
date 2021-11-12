<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { useLocale } from '/@/locales/useLocale'

// support Multi-language
const { getAntdLocale } = useLocale()
</script>

<template>
  <el-config-provider :locale="getAntdLocale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style>
body {
  margin: 0;
  font-family: inherit;
  line-height: inherit;
}
html,
body {
  width: 100%;
  height: 100%;
  overflow: visible !important;
  overflow-x: hidden !important;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
