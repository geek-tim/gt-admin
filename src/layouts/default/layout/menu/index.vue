<script lang="tsx">
import { unref, ref, computed, defineComponent } from 'vue'
import { useMenuSetting } from '/@/hooks/setting/menuSetting'
import type { Menu as MenuType } from '/@/router/types'
import { LAYOUT } from '/@/router/routes/basic'
import type { AppRouteRecordRaw } from '/@/router/types'
import { useRouter } from 'vue-router'

// import { routes } from '@/router/index'
import { useRoute } from 'vue-router'
// import SiderItem from './siderItem.vue'
export const routes: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    name: 'LAYOUT_VIEW',
    component: LAYOUT,
    meta: { isLogin: true, hidden: true },
    redirect: '/user'
  },
  {
    path: '/test1',
    name: 'TEST1',
    component: LAYOUT,
    meta: { title: '菜单1', icon: 'i-setting', alwaysShow: true },
    children: [
      {
        path: 'test1-1',
        name: 'TEST1-1',
        component: () => import('/@/views/test.vue'),
        meta: { title: '菜单1-1' }
      },
      {
        path: 'test1-2',
        name: 'TEST1-2',
        component: () => import('/@/views/test.vue'),
        meta: { title: '菜单1-2', alwaysShow: true },
        children: [
          {
            path: 'test1-2-1',
            name: 'TEST1-2-1',
            component: () => import('/@/views/test.vue'),
            meta: { title: '菜单1-2-1' }
          }
        ]
      }
    ]
  },
  {
    path: '/test2',
    name: 'TEST2',
    component: LAYOUT,
    meta: { title: '菜单2', icon: 'i-setting', alwaysShow: false },
    children: [
      {
        path: 'test2-1',
        name: 'TEST2-1',
        component: () => import('/@/views/test.vue'),
        meta: { title: '菜单2-1' }
      }
    ]
  },
  {
    path: '/login',
    name: 'LOGIN',
    component: () => import('/@/views/login/index.vue'),
    meta: { isLogin: false, hidden: true }
  }
]

export default defineComponent({
  name: 'LayoutMenu',
  setup() {
    const { getMenuCollapsed } = useMenuSetting()

    const isShowMenus = computed(() => {
      return routes.filter((item: MenuType) => {
        return !item.meta?.hidden
      })
    })
    const currentPath = computed(() => {
      return useRoute().path
    })
    const router = useRouter()

    const navigation = (path: string) => {
      router.push(path)
    }
    return () => {
      return (
        <div class="layout-sidebar-wrapper">
          <el-scrollbar style="height:100%">
            <el-menu
              default-active={currentPath.value}
              backgroundColor="#304156"
              text-color="#bfcbd9"
              unique-opened={false}
              active-text-color="#409EFF"
              collapse-transition={false}
              mode="vertical"
            >
              {isShowMenus.value.map((menu: MenuType, index) => {
                return (
                  <el-menu-item
                    index={index}
                    onClick={() => {
                      navigation(menu.path)
                    }}
                  >
                    {/* TODO 动态组件无法生成*/}
                    {menu.meta?.icon && (
                      <el-icon>
                        <component is={menu.meta?.icon} />
                      </el-icon>
                    )}
                    <span>{menu.meta?.title}</span>
                  </el-menu-item>
                )
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
