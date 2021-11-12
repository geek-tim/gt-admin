<template>
  <PageWrapper title="Button 按钮" subTitle="常用的操作按钮。">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <el-row>
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
            <el-button>中文</el-button>
          </el-row>

          <el-row>
            <el-button plain>Plain</el-button>
            <el-button type="primary" plain>Primary</el-button>
            <el-button type="success" plain>Success</el-button>
            <el-button type="info" plain>Info</el-button>
            <el-button type="warning" plain>Warning</el-button>
            <el-button type="danger" plain>Danger</el-button>
          </el-row>

          <el-row>
            <el-button round>Round</el-button>
            <el-button type="primary" round>Primary</el-button>
            <el-button type="success" round>Success</el-button>
            <el-button type="info" round>Info</el-button>
            <el-button type="warning" round>Warning</el-button>
            <el-button type="danger" round>Danger</el-button>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <el-row>
            <el-button disabled>Default</el-button>
            <el-button type="primary" disabled>Primary</el-button>
            <el-button type="success" disabled>Success</el-button>
            <el-button type="info" disabled>Info</el-button>
            <el-button type="warning" disabled>Warning</el-button>
            <el-button type="danger" disabled>Danger</el-button>
          </el-row>

          <el-row>
            <el-button plain disabled>Plain</el-button>
            <el-button type="primary" plain disabled>Primary</el-button>
            <el-button type="success" plain disabled>Success</el-button>
            <el-button type="info" plain disabled>Info</el-button>
            <el-button type="warning" plain disabled>Warning</el-button>
            <el-button type="danger" plain disabled>Danger</el-button>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </PageWrapper>
</template>
<script setup lang="ts"></script>
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
