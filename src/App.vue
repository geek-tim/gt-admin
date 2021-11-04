<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { loginApi } from '/@/api/sys/user'

async function toLogin() {
  var res = await loginApi({ username: 'geek-tim', password: '123456' })
  console.log(res)
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <router-link to="/page1">页面1</router-link>
  <router-link to="/page2">页面2</router-link>
  <router-view></router-view>
  <div @click="toLogin">测试接口</div>
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
