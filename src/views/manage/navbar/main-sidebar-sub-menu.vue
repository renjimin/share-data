<template>
  <div class="menu-nav">
    <div class="admin">
      <img src="/images/manage/index/admin.png" alt="">
      <p>admin</p>
    </div>
    <el-menu
      text-color="rgba(255,255,255,.8)"
      :collapse="isCollapse">
      <el-submenu  v-for=" (item, index ) in menu" :index="item.menuId + ''" :key='index'  v-if="item.list && item.list.length >= 1">
        <template slot="title">
          <img :src="item.icon" alt="">
          <span slot="title">{{item.name}}</span>
        </template>
        <el-menu-item @click="gotoRouteHandle(itm)" v-for="itm in item.list" :key="itm.menuId">{{itm.name}}</el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item.menuId + ''" @click="gotoRouteHandle(menu)">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['isCollapse'],
  data () {
    return {
        menu:[
          {
            "menuId":1,"name":"用户管理","url":null,"icon":"/images/manage/index/icon-权限信息管理.png",
            "list":[
              {"menuId":1,"name":"用户角色管理","url":"rolemanage"},
              {"menuId":2,"name":"角色列表","url":"rolelist"},
              {"menuId":3,"name":"申请单列表","url":"applicationlist"},
              // {"menuId":4,"name":"权限时间管理","url":"permissiontime"}
              ]
          },
          {
            "menuId":2,"name":"用户权限分配","url":null,"icon":"/images/manage/index/icon-地图配置.png",
            "list":[
              {"menuId":1,"name":"资源权限分配","url":"resourcePermissions"},
              {"menuId":2,"name":"资源权限审核","url":"permissionAudit"},
              {"menuId":3,"name":"资源权限列表","url":"resourcePermissionslist"}
              ]
          },
          {
            "menuId":3,"name":"资源监控","url":null,"icon":"/images/manage/index/icon-权限申请.png",
            "list":[
              {"menuId":1,"name":"资源访问控制列表","url":"controlList"},
              {"menuId":2,"name":"资源访问信息列表","url":"informationList"},
              {"menuId":3,"name":"资源访问统计","url":"accessStatistics"}
              ]
          },
          {
            "menuId":3,"name":"条目管理","url":null,"icon":"/images/manage/index/icon-权限申请.png",
            "list":[
              {"menuId":1,"name":"条目管理","url":"itemmanage"},
              {"menuId":2,"name":"动态数据管理","url":"dynamicdatamangae"},
              {"menuId":3,"name":"资源访问统计","url":"accessStatistics"}
            ]
          }
        ]
    }
  },
  computed: {
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
  created() {
    this.routeHandle(this.$route)
  },
  methods:{
    gotoRouteHandle (item) {
      if (item) {
        this.$router.push({ name: item.url })
      }
    },
    // 路由操作
    routeHandle (route) {
      console.log(123)
      // if (route.meta.isTab) {
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
            iframeUrl: route.meta.iframeUrl || '',
            params: route.params,
            query: route.query
          }
          this.mainTabs = this.mainTabs.concat(tab)
        }
        this.menuActiveName = tab.menuId + ''
        this.mainTabsActiveName = tab.name
      // }
    }
  }
}
</script>

<style lang="scss">
.menu-nav{
  min-height: calc(100% - 124px);
  // background-image: url('/images/manage/index/side_bg.png');
  .admin{
    width: 210px;
    height: 190px;
    padding: 26px;
    text-align: center;
    color: #fff;
    background-color: #2C57AD;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #284e9b;
    p{
      margin-top: 5px;
    }
    img{
      margin-bottom: 18px;
    }
  }
  .el-menu{
    border: none;
    background-color: #2C57AD;
    height: 100%;
    .el-submenu__title:hover{
      background: #204692;
      color: #fff;
    }
    .el-menu-item:focus, .el-menu-item:hover {
      background: #204692;
      color: #fff;
    }
  }
  .el-menu:not(.el-menu--inline) {
    background-color: #2C57AD;
    background-image: url('/images/manage/index/side_bg2.png');
    background-repeat: no-repeat;
    background-position: bottom 0 left 0;
    width: 210px;
    min-height: 700px;
  }
}

</style>
