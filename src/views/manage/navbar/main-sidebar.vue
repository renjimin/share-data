<template>
  <aside class="site-sidebar" >
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="'home'"
        :collapseTransition="false"
        class="site-sidebar__menu">
        <el-menu-item index="home" @click="$router.push({ name: 'home' })">
          <!-- <icon-svg name="shouye" class="site-sidebar__menu-icon"></icon-svg> -->
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="demo">
          <template slot="title">
            <!-- <icon-svg name="shoucang" class="site-sidebar__menu-icon"></icon-svg> -->
            <span>demo</span>
          </template>
          <el-menu-item index="demo-echarts" @click="$router.push({ name: 'demo-echarts' })">
            <!-- <icon-svg name="tubiao" class="site-sidebar__menu-icon"></icon-svg> -->
            <span slot="title">echarts</span>
          </el-menu-item>
          <el-menu-item index="demo-ueditor" @click="$router.push({ name: 'demo-ueditor' })">
            <!-- <icon-svg name="editor" class="site-sidebar__menu-icon"></icon-svg> -->
            <span slot="title">ueditor</span>
          </el-menu-item>
        </el-submenu>
        <sub-menu
          v-for="menu in menuList"
          :key="menu.menuId"
          :menu="menu"
          :dynamicMenuRoutes="dynamicMenuRoutes">
        </sub-menu>
      </el-menu>
    </div>
  </aside>
</template>

<script>
  import SubMenu from './main-sidebar-sub-menu'
  export default {
    data () {
      return {
        dynamicMenuRoutes: [],
      menuList:[
          {
            "menuId":1,"parentId":0,"parentName":null,"name":"用户管理","url":null,"perms":null,"type":0,"icon":"system","orderNum":0,"open":null,
            "list":[
              {"menuId":2,"parentId":1,"parentName":null,"name":"用户角色管理","url":"sys/user","perms":null,"type":1,"icon":"admin","orderNum":1,"open":null,"list":null},
              {"menuId":3,"parentId":1,"parentName":null,"name":"角色列表","url":"sys/role","perms":null,"type":1,"icon":"role","orderNum":2,"open":null,"list":null},
              {"menuId":4,"parentId":1,"parentName":null,"name":"申请单列表","url":"sys/menu","perms":null,"type":1,"icon":"menu","orderNum":3,"open":null,"list":null},
              {"menuId":5,"parentId":1,"parentName":null,"name":"权限时间管理","url":"http://localhost:8080/renren-fast/druid/sql.html","perms":null,"type":1,"icon":"sql","orderNum":4,"open":null,"list":null}
              ]
            }
        ],
      }
    },
    components: {
      SubMenu
    },
    computed: {
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold }
      },

      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      }
    },
    watch: {
      $route: 'routeHandle'
    },
    created () {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.routeHandle(this.$route)
    },
    methods: {
      // 路由操作
      routeHandle (route) {
        if (route.meta.isTab) {
          // tab选中, 不存在先添加
          var tab = this.mainTabs.filter(item => item.name === route.name)[0]
          if (!tab) {
            if (route.meta.isDynamic) {
              route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
              if (!route) {
                return console.error('未能找到可用标签页!')
              }
            }
            tab = {
              menuId: route.meta.menuId || route.name,
              name: route.name,
              title: route.meta.title,
              type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
              iframeUrl: route.meta.iframeUrl || '',
              params: route.params,
              query: route.query
            }
            this.mainTabs = this.mainTabs.concat(tab)
          }
          this.menuActiveName = tab.menuId + ''
          this.mainTabsActiveName = tab.name
        }
      }
    }
  }
</script>
