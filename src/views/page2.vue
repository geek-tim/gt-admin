<template>
  <PageWrapper title="Page2" sub-title="this is subTitle">
    <template v-slot:extra>
      <el-button key="3"> Operation </el-button>
      <el-button key="2"> Operation </el-button>
      <el-button key="1" type="primary"> Primary </el-button>
    </template>
    <!-- <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table> -->
  </PageWrapper>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { PageWrapper } from '/@/components/page'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
<style lang="scss"></style>
