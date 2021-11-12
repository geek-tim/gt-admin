<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'
import type { Menu as MenuType } from '/@/router/types'

const SidebarItem = defineComponent({
  name: 'SidebarItem',
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

    let data = {} as MenuType

    const navigation = (path: string) => {
      router.push(path)
    }

    return () => {
      const handleRoute = () => {
        const { item } = props
        if (!item.children) {
          // data = { ...item, path: '' }
          return (
            <el-menu-item
              onClick={() => {
                navigation(item.path)
              }}
              index={item.path}
            >
              <span>{data.meta?.title}</span>
            </el-menu-item>
          )
        }

        // const showingChildren = item.children.filter((item) => {
        //   return item.meta && !item.meta.hidden
        // })
        // item.children = showingChildren

        // if (
        //   showingChildren.length === 1 &&
        //   !showingChildren[0].children &&
        //   item.meta &&
        //   !item.meta.alwaysShow
        // ) {
        //   data = showingChildren[0]
        //   return (
        //     <el-menu-item
        //       index={data.path}
        //       onClick={() => {
        //         navigation(data.path)
        //       }}
        //     >
        //       <span>{data.meta?.title}</span>
        //     </el-menu-item>
        //   )
        // }

        // const slots = {
        //   title: () => {
        //     return (
        //       <div>
        //         {item.meta?.icon && <i class={item.meta?.icon}></i>}
        //         <span>{item.meta?.title ?? '未定义菜单名称'}</span>
        //       </div>
        //     )
        //   }
        // }

        // return (
        //   <el-submenu index={item.path} v-slots={slots}>
        //     {item.children.map((child) => {
        //       return (
        //         <SidebarItem
        //           item={child}
        //           basePath={child.path}
        //           key={child.path}
        //         ></SidebarItem>
        //       )
        //     })}
        //   </el-submenu>
        // )
      }
      return <div>{handleRoute()}</div>
    }
  }
})

export default SidebarItem
</script>

<!-- <template>
  <div></div>
</template>
<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { propTypes } from '/@/utils/propTypes'

defineProps({
  item: propTypes.any,
  basePath: propTypes.string,
  key: propTypes.string
})
</script>
<style lang="scss"></style>
' -->
