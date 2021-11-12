<template>
  <PageWrapper title="Button 按钮" subTitle="常用的操作按钮。">
    <el-card class="box-card">
      <el-divider content-position="left">基础字段 </el-divider>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form
            ref="formRef"
            :model="formData"
            label-width="120px"
            :size="formSize"
          >
            <el-form-item label="Activity name">
              <el-input v-model="formData.username"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form
            ref="formRef"
            :model="formData"
            label-width="120px"
            :size="formSize"
          >
            <el-form-item label="Activity name">
              <el-input v-model="formData.username"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form
            ref="formRef"
            :model="formData"
            label-width="120px"
            :size="formSize"
          >
            <el-form-item label="Activity name">
              <el-input v-model="formData.username"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </PageWrapper>
</template>
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
const formRef = ref(null)
const formData = reactive({
  username: 'geek-tim',
  password: '123456'
})
type ComponentSize = 'large' | 'medium' | 'small' | 'mini'
const formSize: ComponentSize = 'mini'

function onSubmit() {}
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
