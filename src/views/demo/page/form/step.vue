<template>
  <PageWrapper
    title="分步表单"
    content=" 将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
  >
    <el-card class="box-card">
      <el-steps :space="100" :active="active" simple class="w-800px mx-auto">
        <el-step title="填写转账信息">
          <template v-slot:icon
            ><div class="el-step__icon-inner">1</div></template
          >
        </el-step>
        <el-step title="确认转账信息">
          <template v-slot:icon
            ><div class="el-step__icon-inner">2</div></template
          >
        </el-step>
        <el-step title="完成">
          <template v-slot:icon>
            <div class="el-step__icon-inner">3</div></template
          >
        </el-step>
      </el-steps>
      <el-form
        ref="formRef1"
        :model="formData"
        label-width="100px"
        :rules="rules"
        v-show="active === 1"
        class="mt-40px w-600px mx-auto"
      >
        <el-form-item label="付款账户" prop="formAccount" required>
          <el-input
            v-model="formData.formAccount"
            placeholder="请输入付款账户"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="收款账户" prop="toAccount" required>
          <template #prepend>
            <el-select
              v-model="formData.accountType"
              placeholder="Select"
              style="width: 110px"
            >
              <el-option label="支付宝" value="1"></el-option>
              <el-option label="银联" value="2"></el-option>
            </el-select>
          </template>
          <el-input
            v-model="formData.toAccount"
            placeholder="请输入收款账户"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="收款人姓名" prop="username" required>
          <el-input
            v-model="formData.username"
            placeholder="请输入收款人姓名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="转账金额" prop="amount" required>
          <el-input
            v-model="formData.amount"
            clearable
            placeholder="请填写转账金额"
          >
            <template #prepend>￥</template>
          </el-input>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button @click="toNext(2)">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-form
        ref="formRef2"
        :model="formData"
        label-width="100px"
        :rules="rules2"
        v-show="active === 2"
        class="mt-40px w-600px mx-auto"
      >
        <el-alert
          title="确认转账后，资金将直接打入对方账户，无法退回。"
          type="info"
          show-icon
          :closable="false"
          class="mb-40px"
        >
        </el-alert>

        <el-descriptions title="" :column="1">
          <el-descriptions-item label="付款账户: ">{{
            formData.formAccount
          }}</el-descriptions-item>
          <el-descriptions-item label="收款账户: ">{{
            formData.formAccount
          }}</el-descriptions-item>
          <el-descriptions-item label="收款人姓名: ">{{
            formData.formAccount
          }}</el-descriptions-item>
          <el-descriptions-item label="转账金额: ">{{
            formData.formAccount
          }}</el-descriptions-item>
        </el-descriptions>
        <el-divider></el-divider>
        <el-form-item label="支付密码" prop="password" required>
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入支付密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button @click="toNext(1)">上一步</el-button>
          <el-button @click="toNext(3)">下一步</el-button>
        </el-form-item>
      </el-form>
      <div v-show="active === 3" class="w-640px mx-auto">
        <el-result icon="success" title="操作成功" sub-title="预计两小时内到账">
          <template #extra>
            <el-button type="primary" @click="changeAgain" size="medium"
              >再转一笔</el-button
            >
            <el-button type="primary" size="medium">查看账单</el-button>
          </template>
        </el-result>
        <div class="desc-wrap">
          <el-descriptions title="" :column="1">
            <el-descriptions-item label="付款账户: ">{{
              formData.formAccount
            }}</el-descriptions-item>
            <el-descriptions-item label="收款账户: ">{{
              formData.formAccount
            }}</el-descriptions-item>
            <el-descriptions-item label="收款人姓名: ">{{
              formData.formAccount
            }}</el-descriptions-item>
            <el-descriptions-item label="转账金额: ">{{
              formData.formAccount
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-card>
  </PageWrapper>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
const formRef1 = ref()
const formRef2 = ref()
const active = ref(1)
const rules = {
  formAccount: [{ required: true, message: '请填写付款账户', trigger: 'blur' }],
  toAccount: [{ required: true, message: '请填写收款账户', trigger: 'blur' }],
  username: [{ required: true, message: '请填写收款人姓名', trigger: 'blur' }],
  amount: [{ required: true, message: '请填写转账金额', trigger: 'blur' }]
}
const rules2 = {
  password: [{ required: true, message: '请填写支付密码', trigger: 'blur' }]
}

const formData = reactive({
  accountType: '1',
  formAccount: '',
  toAccount: '',
  username: '',
  amount: '',
  password: ''
})

function changeAgain() {
  formData.formAccount = ''
  formData.toAccount = ''
  formData.username = ''
  formData.amount = ''
  formData.password = ''

  active.value = 1
}
function toNext(step) {
  //
  if (step === 2) {
    formRef1.value.validate((isValid) => {
      if (isValid) {
        active.value = step
      }
    })
  }
  if (step === 3) {
    formRef2.value.validate((isValid) => {
      if (isValid) {
        setTimeout(() => {
          active.value = step
        })
      }
    })
  }
  if (step === 1) {
    active.value = step
  }
}
</script>
<style lang="scss" scoped>
.box-card {
  padding: 20px;
}
.el-card__body {
  .el-row {
    padding: 10px 0;
  }
}
.desc-wrap {
  padding: 24px 40px;
  margin-top: 24px;
  background-color: rgb(250, 250, 250);
  .el-descriptions__body {
    background-color: rgb(250, 250, 250);
  }
}
</style>
'
