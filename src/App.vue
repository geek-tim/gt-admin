<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { loginApi } from '/@/api/sys/user'
import { useI18n } from '/@/hooks/web/useI18n'
import { useLocaleStore } from '/@/store/modules/locale'
import { ref } from 'vue'

async function toLogin() {
  var res = await loginApi({ username: 'geek-tim', password: '123456' })
  console.log(res)
}
const { t } = useI18n()
const localeStore = useLocaleStore()
function toggleLocales() {
  localeStore.setLocale({ locale: 'en' })
  location.reload()
}

const text = ref(t('sys.login.loginButton'))
</script>

<template>
  <router-view></router-view>
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
