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
  localeStore.setLocale('en')
  location.reload()
}

const text = ref(t('sys.login.loginButton'))
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" class="ml-4" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <router-link to="/page1">页面1</router-link>
  <router-link to="/page2">页面2</router-link>
  <router-view></router-view>
  <div @click="toLogin">
    <h1>测试接口</h1>
  </div>

  <div>测试：i18n + vuex</div>
  <div>
    <el-button type="primary" @click="toggleLocales()">切换中文</el-button>
    <span>{{ localeStore.$state.locale }}</span>
    <el-button type="primary">{{ text }}</el-button>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
