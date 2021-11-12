<script lang="tsx">
import type { PropType } from 'vue'
import { defineComponent, ref, computed, unref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '/@/hooks/web/useI18n'
import { ExceptionEnum } from '/@/enums/ExceptionEnum'
import { PageEnum } from '/@/enums/pageEnum'
import notDataSvg from '/@/assets/svg/no-data.svg'
import netWorkSvg from '/@/assets/svg/net-error.svg'

interface MapValue {
  title: string
  subTitle: string
  btnText?: string
  icon?: string
  handler?: Function
  status?: string
}

export default defineComponent({
  name: 'ErrorPage',
  props: {
    // 状态码
    status: {
      type: Number as PropType<number>,
      default: ExceptionEnum.PAGE_NOT_FOUND
    },

    title: {
      type: String as PropType<string>,
      default: ''
    },

    subTitle: {
      type: String as PropType<string>,
      default: ''
    },

    full: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props) {
    const statusMapRef = ref(new Map<string | number, MapValue>())
    const { query } = useRoute()
    const { t } = useI18n()

    const getStatus = computed(() => {
      const { status: routeStatus } = query
      const { status } = props
      return Number(routeStatus) || status
    })

    const go = (to?) => {}
    const redo = () => {}

    const getMapValue = computed((): MapValue => {
      return unref(statusMapRef).get(unref(getStatus)) as MapValue
    })
    const backLoginI18n = t('sys.exception.backLogin')
    const backHomeI18n = t('sys.exception.backHome')

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
      title: '403',
      status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
      subTitle: t('sys.exception.subTitle403'),
      btnText: props.full ? backLoginI18n : backHomeI18n,
      handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go())
    })

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
      title: '404',
      status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
      subTitle: t('sys.exception.subTitle404'),
      btnText: props.full ? backLoginI18n : backHomeI18n,
      handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go())
    })

    unref(statusMapRef).set(ExceptionEnum.ERROR, {
      title: '500',
      status: `${ExceptionEnum.ERROR}`,
      subTitle: t('sys.exception.subTitle500'),
      btnText: backHomeI18n,
      handler: () => go()
    })

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_DATA, {
      title: t('sys.exception.noDataTitle'),
      subTitle: '',
      btnText: t('common.redo'),
      handler: () => redo(),
      icon: notDataSvg
    })

    unref(statusMapRef).set(ExceptionEnum.NET_WORK_ERROR, {
      title: t('sys.exception.networkErrorTitle'),
      subTitle: t('sys.exception.networkErrorSubTitle'),
      btnText: t('common.redo'),
      handler: () => redo(),
      icon: netWorkSvg
    })

    return () => {
      const { title, subTitle, btnText, icon, handler } =
        unref(getMapValue) || {}
      console.log(icon)
      return (
        <el-result
          title={title}
          sub-title={subTitle}
          class="app-exception-page"
        >
          {{
            extra: () =>
              btnText && (
                <el-button type="primary" onClick={handler} size="mini">
                  {() => btnText}
                </el-button>
              ),
            icon: () => (icon ? <img src={icon} /> : null)
          }}
        </el-result>
      )
    }
  }
})
</script>
<style lang="scss">
.app-exception-page {
  .el-result__icon img {
    max-width: 400px;
    max-height: 300px;
  }
}
</style>
