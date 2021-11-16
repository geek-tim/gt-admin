<template>
  <div class="d2-crud" v-loading="getLoading" ref="wrapRef">
    <div class="d2-crud-header" ref="headerRef">
      <slot name="header"></slot>
    </div>
    <div class="d2-crud-body" ref="bodyRef">
      <el-table v-bind="getBindValues" ref="tableRef">
        <el-table-column
          v-for="(item, index) in columns"
          v-bind="item"
          :key="index"
          :prop="getColumnIdByRowkey(item, options)"
        ></el-table-column>
      </el-table>
    </div>
    <div class="d2-crud-pagination" ref="paginationRef" v-if="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        v-bind="pagination"
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        @prev-click="handlePaginationPrevClick"
        @next-click="handlePaginationNextClick"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script setup="props" lang="ts" name="d2-crud">
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { PaginationProps } from 'element-plus/es/components/pagination'

import {
  ref,
  unref,
  computed,
  defineProps,
  defineEmits,
  onMounted,
  PropType,
  watch
} from 'vue'
import PropTypes from '/@/utils/vue-types'
import { cloneDeep } from 'lodash-es'
import { useLoading } from './hooks/useLoading'
import { usePagination } from './hooks/usePagination'
import { useTableScroll } from './hooks/useTableScroll'

interface BasicColumn extends TableColumnCtx<any> {}

interface ICrudoptions {
  rowKey: string
  [k: string]: any
}

const bodyRef = ref(null)
const tableRef = ref(null)
const wrapRef = ref(null)

function getColumnIdByRowkey(col, options: ICrudoptions) {
  if (options.rowKey) {
    return col[options.rowKey]
  }
  return col.id
}

function getViewColumns(columns) {}

const props = defineProps({
  loading: PropTypes.bool,
  /**
   * @description 表格数据
   */
  data: {
    type: Array as PropType<Recordable[]>,
    required: true
  },
  /**
   * @description 表格配置
   */
  options: {
    type: Object as PropType<ICrudoptions>,
    default: null
  },
  /**
   * @description 表头数据
   */
  columns: {
    type: Array as PropType<BasicColumn[]>,
    required: true
  },
  /**
   * @description 表格分页数据
   */
  pagination: {
    type: Object as PropType<Partial<PaginationProps>>,
    default: null
  },
  canResize: PropTypes.bool.def(true),
  /**
   * @description 自定义用于修复距离底部的边距
   */
  resizeHeightOffset: PropTypes.number.def(0)
})

const getProps = computed(() => {
  return { ...props }
})

const { getLoading } = useLoading(getProps)
const { getTableHeight, getCanResize } = useTableScroll(getProps, wrapRef)

const getBindValues = computed(() => {
  if (unref(getCanResize)) {
    return {
      data: unref(props.data),
      ...unref(props.options),
      height: unref(getTableHeight)
    }
  } else {
    return {
      data: unref(props.data),
      ...unref(props.options)
    }
  }
})

/// ======== pagination ======== start
//暴露内部方法
const emit = defineEmits([
  'pagination-size-change',
  'pagination-current-change',
  'pagination-prev-click',
  'pagination-next-click'
])

const {
  handlePaginationSizeChange,
  handlePaginationCurrentChange,
  handlePaginationPrevClick,
  handlePaginationNextClick
} = usePagination(emit)

/// ======== pagination ======== end
</script>
<style lang="scss">
.d2-crud {
  background-color: #fff;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  .d2-crud-header {
    border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
  }
  .d2-crud-body {
    flex: 1;
    padding: 12px 12px 0;
    box-sizing: border-box;
  }
  .d2-crud-pagination {
    padding: 8px 0;
  }
}
</style>
