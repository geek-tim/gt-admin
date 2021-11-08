<script lang="tsx">
import { ref } from 'vue'
import { CSSProperties, PropType, defineComponent } from 'vue'
import { propTypes } from '/@/utils/propTypes'

const pageHeaderProps = {
  title: propTypes.string,
  subTitle: propTypes.string,
  content: propTypes.string,
  extra: propTypes.string,
  contentStyle: {
    type: Object as PropType<CSSProperties>
  },
  contentBackground: propTypes.bool,
  contentFullHeight: propTypes.bool,
  contentClass: propTypes.string,
  fixedHeight: propTypes.bool,
  upwardSpace: propTypes.oneOfType([propTypes.number, propTypes.string]).def(0)
}

export default defineComponent({
  name: 'PageHeader',
  props: pageHeaderProps,
  setup(props, { slots }) {
    const prefixCls = ref('page-header')
    const renderTitle = () => {
      const title = props.title ?? slots.title?.() // 3??5 <==> 3?3:5
      const subTitle = props.subTitle ?? slots.subTitle?.()
      const extra = props.extra ?? slots.extra?.()
      const headingPrefixCls = `${prefixCls.value}-heading`

      return (
        <div class={headingPrefixCls}>
          <div class={`${headingPrefixCls}-left`}>
            {title && <span class={`${headingPrefixCls}-title`}>{title}</span>}
            {subTitle && (
              <span class={`${headingPrefixCls}-sub-title`}>{subTitle}</span>
            )}
          </div>
          {extra && <div class={`${headingPrefixCls}-right`}>{extra}</div>}
        </div>
      )
    }
    // const renderChildren = (children: any) => {
    //   return <div class={`${prefixCls.value}-content`}>{children}</div>
    // }
    // const children = [slots.default?.()]
    console.log('slots.default', slots.default?.())
    const className = [prefixCls.value]
    return () => {
      return <div class={className}>{renderTitle()}</div>
      // {children.length ? renderChildren(children) : null}
    }
  }
})
</script>
<style lang="scss">
$heading-color: rgba($black, 85%);

$page-header-heading-title: 16px;
$page-header-padding-vertical: 8px;

$page-header-heading-sub-title: 12px;
$page-header-content-padding-vertical: $padding-sm;
$page-header-tabs-tab-font-size: 14px;

$pageheader-prefix-cls: 'page-header';
.#{$pageheader-prefix-cls} {
  position: relative;
  &.has-footer {
    padding-bottom: 0;
  }
  &-divider-vertical {
    height: 14px;
    margin: 0 $margin-sm;
    vertical-align: middle;
  }

  &-breadcrumb + &-heading {
    margin-top: $margin-xs;
  }
  &-heading {
    display: flex;
    justify-content: space-between;

    &-left {
      display: flex;
      align-items: center;
      margin: ($margin-xs / 2) 0;
      overflow: hidden;
    }

    &-title {
      margin-right: $margin-sm;
      margin-bottom: 0;
      color: $heading-color;
      font-weight: 600;
      font-size: $page-header-heading-title;
      line-height: 32px;
      @include text-overflow-ellipsis;
    }

    &-avatar {
      margin-right: $margin-sm;
    }

    &-sub-title {
      margin-right: $margin-sm;
      color: $text-color-secondary;
      font-size: $page-header-heading-sub-title;
      line-height: $line-height-base;
      @include text-overflow-ellipsis;
    }

    &-extra {
      margin: ($margin-xs / 2) 0;
      white-space: nowrap;

      > * {
        margin-left: $margin-sm;
        white-space: unset;
      }
      > *:first-child {
        margin-left: 0;
      }
    }
  }

  &-content {
    padding-top: $page-header-content-padding-vertical;
  }

  &-footer {
    margin-top: $margin-md;
  }

  &-compact &-heading {
    flex-wrap: wrap;
  }
}
</style>
