<script lang="ts" setup>
import { reactive, ref, toRaw, unref, computed, Ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useUserStore } from '/@/store/modules/user'
import { useI18n } from '/@/hooks/web/useI18n'
import {
  LoginStateEnum,
  useLoginState,
  // useFormRules,
  useFormValid
} from './useLogin'

const { setLoginState, getLoginState } = useLoginState()
const userStore = useUserStore()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

const { t } = useI18n()

const loading = ref(false)
const formRef = ref(null)
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const formData = reactive({
  username: 'geek-tim',
  password: '123456'
})
const rememberMe = ref(false)

const { validForm } = useFormValid(formRef, formData)

async function handleLogin() {
  const data = await validForm()
  if (!data) return
  try {
    loading.value = true
    const userInfo = await userStore.login(toRaw(data))
    if (userInfo) {
      ElNotification.success({
        message: t('sys.login.loginSuccessTitle'),
        duration: 3000
      })
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <el-form
    ref="formRef"
    :model="formData"
    label-width="0px"
    :rules="rules"
    v-show="getShow"
    class="enter-x w-404px"
  >
    <el-form-item prop="username">
      <el-input v-model="formData.username" class="enter-x"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="formData.password"
        class="enter-x"
      ></el-input>
    </el-form-item>
    <el-row class="enter-x">
      <el-col :span="12">
        <el-form-item>
          <el-checkbox
            v-model="rememberMe"
            :label="t('sys.login.rememberMe')"
          ></el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :style="{ 'text-align': 'right' }">
          <el-button
            type="text"
            size="small"
            @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
          >
            {{ t('sys.login.forgetPassword') }}
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button
        type="primary"
        style="width: 100%"
        :loading="loading"
        @click="handleLogin()"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>
<style lang=""></style>
