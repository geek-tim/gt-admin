<template>
  <div :class="getClass" ref="wrapperRef">
    <PageHeader :title="title" class="page-header" ref="headerRef">
      <template #default>
        <template v-if="content">
          {{ content }}
        </template>
        <slot name="headerContent" v-else></slot>
      </template>
      <template #[item]="data" v-for="item in getHeaderSlots">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </PageHeader>
    <div
      class="overflow-hidden"
      :class="getContentClass"
      :style="getContentStyle"
      ref="contentRef"
    >
      <slot></slot>
    </div>
    <PageFooter v-if="getShowFooter" ref="footerRef">
      <template #left>
        <slot name="leftFooter"></slot>
      </template>
      <template #right>
        <slot name="rightFooter"></slot>
      </template>
    </PageFooter>
  </div>
</template>
<script setup="props" lang="ts">
import { propTypes } from '/@/utils/propTypes'
import {
  defineComponent,
  watch,
  computed,
  ref,
  unref,
  defineProps,
  useSlots,
  useAttrs
} from 'vue'
import PageFooter from './PageFooter.vue'
import PageHeader from './PageHeader.vue'
import { CSSProperties, PropType, provide } from 'vue'
import { PageWrapperFixedHeightKey } from '../index'
import { omit } from 'lodash-es'

const slots = useSlots()
const attrs = useAttrs()
const props = defineProps({
  title: propTypes.string,
  subTitle: propTypes.string,
  content: propTypes.string,
  headerContent: propTypes.string,
  contentStyle: {
    type: Object as PropType<CSSProperties>
  },
  contentBackground: propTypes.bool,
  contentFullHeight: propTypes.bool,
  contentClass: propTypes.string,
  fixedHeight: propTypes.bool,
  upwardSpace: propTypes.oneOfType([propTypes.number, propTypes.string]).def(0)
})

const getContentStyle = computed((): CSSProperties => {
  const { contentFullHeight, contentStyle, fixedHeight } = props
  if (!contentFullHeight) {
    return { ...contentStyle }
  }

  const contentHeight = 100
  const height = `${unref(contentHeight)}px`
  return {
    ...contentStyle,
    minHeight: height,
    ...(fixedHeight ? { height } : {})
  }
})

const prefixCls = 'page-wrapper'
const getClass = computed(() => {
  return [prefixCls, attrs.class ?? {}]
})
const getContentClass = computed(() => {
  const { contentBackground, contentClass } = props
  return [
    `${prefixCls}-content`,
    contentClass,
    {
      [`${prefixCls}-content-bg`]: contentBackground
    }
  ]
})

const wrapperRef = ref(null)
const headerRef = ref(null)
const contentRef = ref(null)
const footerRef = ref(null)

const getShowFooter = computed(() => slots?.leftFooter || slots?.rightFooter)

const getHeaderSlots = computed(() => {
  return Object.keys(
    omit(slots, 'default', 'leftFooter', 'rightFooter', 'headerContent')
  )
})
console.log(getHeaderSlots.value)
</script>
<style lang="scss">
$prefix-cls: 'page-wrapper';
.#{$prefix-cls} {
  position: relative;

  .#{$prefix-cls}-content {
    margin: 16px;
  }

  &-content-bg {
    background-color: $component-background;
  }

  &--dense {
    .#{$prefix-cls}-content {
      margin: 0;
    }
  }
}

.page-header {
  box-sizing: border-box;
  margin: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: tnum;
  position: relative;
  padding: 16px 24px;
  background-color: #fff;
}
</style>
