<script lang="tsx">
import { computed, defineComponent } from 'vue'
import { useMenuSetting } from '/@/hooks/setting/menuSetting'
// import type { Menu as MenuType } from '/@/router/types'
import MenuItem from './menuItem.vue'
import type { AppRouteRecordRaw } from '/@/router/types'

import { basicRoutes } from '/@/router/routes'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'LayoutMenu',
  setup() {
    const { getMenuCollapsed } = useMenuSetting()

    const isShowMenus = computed(() => {
      return basicRoutes.filter((item: AppRouteRecordRaw) => {
        return !item.meta?.hidden
      })
    })
    const currentPath = computed(() => {
      return useRoute().path
    })

    return () => {
      return (
        <div class="layout-sidebar-wrapper">
          <el-scrollbar style="height:100%">
            <el-menu
              default-active={currentPath.value}
              backgroundColor="#001529"
              text-color="#bfcbd9"
              unique-opened={false}
              collapse={getMenuCollapsed.value}
              active-text-color="#409EFF"
              collapse-transition={false}
              mode="vertical"
            >
              {isShowMenus.value.map((menu: AppRouteRecordRaw) => {
                return <MenuItem item={menu} basePath={menu.path}></MenuItem>
              })}
            </el-menu>
          </el-scrollbar>
        </div>
      )
    }
  }
})
</script>
<style lang="scss"></style>
