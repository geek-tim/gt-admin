import { ref, computed, unref, Ref } from 'vue'
// import { useI18n } from '/@/hooks/web/useI18n'

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE
}

const currentState = ref(LoginStateEnum.LOGIN)

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state
  }

  const getLoginState = computed(() => currentState.value)

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return { setLoginState, getLoginState, handleBackLogin }
}

export function useFormValid<T extends Object = any>(
  formRef: Ref<any>,
  formData
) {
  async function validForm() {
    const form = unref(formRef)
    if (!form) return
    const valid = await form.validate()
    if (valid) {
      return formData
    }
    return null
  }

  return { validForm }
}
