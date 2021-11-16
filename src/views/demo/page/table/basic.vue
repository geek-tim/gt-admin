<template>
  <div class="p-20px text-lg h-full box-border">
    <d2-crud
      :data="tableData"
      :columns="columns"
      :loading="loading"
      :canResize="canResize"
      :options="options"
      :pagination="pagination"
      :resizeHeightOffset="20"
      @pagination-current-change="paginationCurrentChange"
    >
      <template v-slot:header>
        <div class="flex px-12px py-8px justify-between items-center">
          <div>基础表单</div>
          <div class="">
            <el-button type="primary" size="mini" @click="toggleCanResize">{{
              !canResize ? '自适应高度' : '取消自适应'
            }}</el-button>
            <el-button type="primary" size="mini" @click="toggleBorder">{{
              options.border ? '隐藏边框' : '显示边框'
            }}</el-button>
            <el-button type="primary" size="mini" @click="toggleLoading"
              >开启loading</el-button
            >
          </div>
        </div>
      </template>
    </d2-crud>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, defineComponent, unref, onMounted } from 'vue'
import { getTableList } from '/@/api/demo/table'
import { getDescSchema } from '/@/views/sys/error-log/data'

const loading = ref(false)
const canResize = ref(false)

const options = ref({
  rowKey: 'field',
  border: false,
  'show-overflow-tooltip': true
})

function toggleCanResize() {
  canResize.value = !canResize.value
}
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
})
const columns = getDescSchema()
const tableData = ref([])
onMounted(function () {
  fetchData(unref(pagination))
})

async function fetchData(params) {
  loading.value = true
  const res = await getTableList(params)
  loading.value = false
  tableData.value = res.data
  pagination.value.total = res.total
}
function paginationCurrentChange(currentPage) {
  pagination.value.currentPage = currentPage
  fetchData(unref(pagination))
}

function toggleBorder() {
  options.value.border = !options.value.border
}

function toggleLoading() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>
<style lang="scss"></style>
'
