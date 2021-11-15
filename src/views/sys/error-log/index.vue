<template>
  <PageWrapper title="错误日志列表">
    <template v-for="src in imgList" :key="src">
      <img :src="src" v-show="false" />
    </template>
    <template v-slot:extra>
      <el-button key="3" @click="fireVueError" type="primary" size="mini">
        点击促发vue错误
      </el-button>
      <el-button key="2" @click="fireSourceError" type="primary" size="mini">
        点击促发资源加载错误
      </el-button>
      <el-button key="1" @click="fireAjaxError" type="primary" size="mini">
        点击促发ajax错误
      </el-button>
    </template>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <template v-for="item in columns" :key="item.field">
          <el-table-column
            :label="item.label"
            :prop="item.field"
            :show-overflow-tooltip="item.field === 'stack'"
          />
        </template>
      </el-table>
    </el-card>
  </PageWrapper>
</template>
<script setup lang="ts">
import type { ErrorLogInfo } from '/#/store'
import { ErrorTypeEnum } from '/@/enums/exceptionEnum'
import { ref, watch, nextTick } from 'vue'
import { getDescSchema } from './data'
import { useErrorLogStore } from '/@/store/modules/errorLog'
import { cloneDeep } from 'lodash-es'
import { fireErrorApi } from '/@/api/demo/error'

const errorLogStore = useErrorLogStore()

const columns = getDescSchema()
const list: ErrorLogInfo[] = [
  {
    type: ErrorTypeEnum.PROMISE,
    file: '1211221',
    name: '122112',
    message: 'xxx',
    stack: '3',
    detail: '332',
    // Error url
    url: '232323',
    // Error time
    time: '232323'
  },
  {
    type: ErrorTypeEnum.PROMISE,
    file: '1211221',
    name: '122112',
    message: 'xxx',
    stack: '232323',
    detail: '',
    // Error url
    url: '',
    // Error time
    time: ''
  },
  {
    type: ErrorTypeEnum.PROMISE,
    file: '1211221',
    name: '122112',
    message: 'xxx',
    stack: '',
    detail: '',
    // Error url
    url: '',
    // Error time
    time: ''
  }
]
const imgList = ref<string[]>([])

watch(
  () => errorLogStore.getErrorLogInfoList,
  (list) => {
    nextTick(() => {
      console.log(JSON.stringify(cloneDeep(list)))
      tableData.value = cloneDeep(list)
    })
  },
  {
    immediate: true
  }
)

const tableData = ref(list)
function fireVueError() {
  throw new Error('fire vue error!')
}
function fireSourceError() {
  imgList.value.push(`${new Date().getTime()}.png`)
}
async function fireAjaxError() {
  await fireErrorApi()
}
</script>
<style lang="scss"></style>
'
