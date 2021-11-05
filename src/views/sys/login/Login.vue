<script lang="ts" setup>
import LoginForm from './LoginForm.vue'
import LoginFormTitle from './LoginFormTitle.vue'
// import { useDesign } from '/@/hooks/web/useDesign'
import { useI18n } from '/@/hooks/web/useI18n'

const { t } = useI18n()
const title = '登录'
const prefixCls = 'gt-login'
</script>
<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <div class="-enter-x" />
          <div class="my-auto">
            <img
              :alt="title"
              src="../../../assets/svg/login-box-bg.svg"
              class="w-1/2 -mt-16 -enter-x"
            />
            <div class="mt-10 font-medium text-white -enter-x">
              <span class="inline-block mt-4 text-3xl">
                {{ t('sys.login.signInTitle') }}</span
              >
            </div>
            <div
              class="
                mt-5
                font-normal
                text-white text-md
                dark:text-gray-500
                -enter-x
              "
            >
              {{ t('sys.login.signInDesc') }}
            </div>
          </div>
        </div>
        <div
          class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12"
        >
          <div
            :class="`${prefixCls}-form`"
            class="
              relative
              w-full
              px-5
              py-8
              mx-auto
              my-auto
              rounded-md
              shadow-md
              xl:ml-16 xl:bg-transparent
              sm:px-8
              xl:p-4 xl:shadow-none
              sm:w-3/4
              lg:w-2/4
              xl:w-auto
              enter-x
            "
          >
            <LoginFormTitle class="enter-x" />
            <LoginForm />
            <ForgetPasswordForm />
            <!-- <RegisterForm />
            <MobileForm />
            <QrCodeForm /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.gt-login {
  min-height: 100%;
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url(/@/assets/svg/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
  }
}
</style>
