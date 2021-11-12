<template>
  <PageWrapper
    title="基础表单"
    content=" 表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
  >
    <el-card class="box-card">
      <el-form
        ref="formRef"
        :model="formData"
        label-width="100px"
        :rules="rules"
        class="enter-x w-600px mx-auto"
      >
        <el-form-item label="标题" prop="title" required>
          <el-input
            v-model="formData.title"
            placeholder="起个标题吧"
          ></el-input>
        </el-form-item>
        <el-form-item label="起止日期" prop="date" required>
          <el-date-picker
            v-model="formData.date"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="目标描述" prop="des" required>
          <el-input
            v-model="formData.des"
            :rows="2"
            type="textarea"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item prop="client">
          <template v-slot:label> 客户 ( 选填 ) </template>
          <el-input
            v-model="formData.client"
            :rows="2"
            type="textarea"
            placeholder="请描述你服务的客户，内部客户直接 @姓名／工号"
          />
        </el-form-item>
        <el-form-item prop="invite" label-width="120px">
          <template v-slot:label> 邀评人 ( 选填 ) </template>
          <el-input
            v-model="formData.invite"
            :rows="2"
            type="textarea"
            placeholder="请直接 @姓名／工号，最多可邀请 5 人"
          />
        </el-form-item>
        <el-form-item prop="target" label="目标公开">
          <el-radio-group v-model="formData.target">
            <el-radio :label="3">公开</el-radio>
            <el-radio :label="6">部分公开</el-radio>
            <el-radio :label="9">不公开</el-radio>
          </el-radio-group>
          <div>客户、邀评人默认被分享</div>
          <el-input
            v-show="isPartialTarget"
            v-model="formData.targetList"
            placeholder="公开给"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="resetFields">重置</el-button>
          <el-button type="primary" @click="onSubmit" :loading="loading"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </PageWrapper>
</template>
<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { useI18n } from '/@/hooks/web/useI18n'

const { t } = useI18n()
const formRef = ref()
const isPartialTarget = ref(false)
const formData = reactive({
  title: '',
  date: [new Date()],
  des: '',
  target: 3,
  targetList: '',
  invite: '',
  client: ''
})

watchEffect(() => {
  if (formData.target === 6) {
    isPartialTarget.value = true
  } else {
    isPartialTarget.value = false
  }
})

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  date: [{ required: true, message: '请选取起止日期', trigger: 'blur' }],
  des: [{ required: true, message: '请填写目标描述', trigger: 'blur' }]
}
function onSubmit() {
  formRef.value.validate((isValid) => {
    if (isValid) {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
  })
}
function resetFields() {
  formRef.value.resetFields()
}

const loading = ref(false)
</script>
<style lang="scss">
.box-card {
  padding: 20px;
}
.el-card__body {
  .el-row {
    padding: 10px 0;
  }
}
</style>
'
