import { ref, ComputedRef, unref, computed, nextTick, watch } from 'vue'
import { getViewportOffset } from '/@/utils/domUtils'
import { useDebounceFn } from '@vueuse/core'
import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn'

export function useTableScroll(propsRef, wrapRef) {
  function redoHeight() {
    nextTick(() => {
      calcTableHeight()
    })
  }

  // 取消自适应高度
  function unsetHeight() {
    nextTick(() => {
      const tableEl = unref(wrapRef).querySelector('.el-table') as HTMLElement
      if (tableEl) {
        tableEl!.style.height = 'unset'
      }
    })
  }
  const debounceRedoHeight = useDebounceFn(redoHeight, 100)

  // No need to repeat queries
  let paginationEl: HTMLElement | null
  let tableEl: HTMLElement | null

  const getCanResize = computed(() => {
    const { canResize } = unref(propsRef)
    return canResize
  })

  watch(
    () => [unref(getCanResize)],
    () => {
      if (unref(getCanResize)) {
        debounceRedoHeight()
      } else {
        unsetHeight()
      }
    },
    {
      flush: 'post'
    }
  )
  // Pager height
  const tableHeight = ref('')
  function calcTableHeight() {
    if (!unref(getCanResize)) return

    const wrapEl = unref(wrapRef)
    const bodyEl: Element = wrapEl.querySelector('.d2-crud-body') as HTMLElement

    tableEl = bodyEl.querySelector('.el-table') as HTMLElement
    paginationEl = wrapEl.querySelector('.d2-crud-pagination') as HTMLElement

    if (!tableEl) {
      return
    }

    const { bottomIncludeBody } = getViewportOffset(bodyEl)
    let paginationHeight = 0

    if (paginationEl) {
      const offsetHeight = paginationEl.offsetHeight
      paginationHeight += offsetHeight || 0
    }
    const paddingHeight = 12

    const { resizeHeightOffset } = unref(propsRef)
    tableHeight.value =
      bottomIncludeBody -
      paddingHeight -
      paginationHeight -
      resizeHeightOffset +
      'px'
  }
  useWindowSizeFn<void>(calcTableHeight, 280)

  const getTableHeight = computed(() => {
    return getCanResize ? unref(tableHeight) : ''
  })

  return {
    redoHeight,
    getCanResize,
    getTableHeight
  }
}
