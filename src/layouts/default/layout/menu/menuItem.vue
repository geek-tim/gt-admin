<script lang="tsx">
import { defineComponent, computed, PropType, unref } from 'vue'
import { useRouter } from 'vue-router'
import type { Menu as MenuType } from '/@/router/types'
import { useI18n } from '/@/hooks/web/useI18n'

const { t } = useI18n()

export default defineComponent({
  name: 'MenuItem',
  props: {
    item: {
      type: Object as PropType<MenuType>,
      required: true
    },
    basePath: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const navigation = (path: string) => {
      router.push(path)
    }

    return () => {
      const { item } = props
      const getI18nName = computed(() => {
        const title = item.meta?.title as string
        return t(title) || title
      })
      if (!item.children?.length) {
        return (
          <el-menu-item
            onClick={() => {
              navigation(item.path)
            }}
          >
            {/* TODO 动态组件无法生成*/}
            <span>{unref(getI18nName)}</span>
          </el-menu-item>
        )
      }
      const slots = {
        title: () => {
          return (
            <div>
              {item.meta?.icon && <i class={item.meta?.icon}></i>}
              <span>{unref(getI18nName)}</span>
            </div>
          )
        }
      }
      return (
        <el-sub-menu index={item.path} v-slots={slots}>
          {item.children.map((child) => {
            return <menu-item item={child} basePath={child.path}></menu-item>
          })}
        </el-sub-menu>
      )
    }
  }
})
</script>
<style lang="scss"></style>
'
