<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <el-Card
        size="small"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0 !mt-4"
        :class="[index + 1 < 4 && '!md:mr-4']"
        :canExpan="false"
      >
        <template #header>
          <div class="card-header flex justify-between items-center">
            <span>{{ item.title }}</span>
            <el-tag :type="item.type" plain>{{ item.action }}</el-tag>
          </div>
        </template>
        <!-- <template #extra>
        </template> -->

        <div class="py-4 px-4 flex justify-between">
          <CountTo
            prefix="$"
            :startVal="1"
            :endVal="item.value"
            class="text-2xl"
          />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <CountTo prefix="$" :startVal="1" :endVal="item.total" />
        </div>
      </el-Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { CountTo } from '/@/components/CountTo/index'
// import { Icon } from '/@/components/Icon'
// import { Tag, Card } from 'ant-design-vue'
import { growCardList } from '../data'

defineProps({
  loading: {
    type: Boolean
  }
})
</script>
