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
            "menuId":1,"parentId":0,"parentName":null,"name":"用户管理","url":null,"perms":null,"type":0,"icon":"/images/manage/index/icon-权限信息管理.png","orderNum":0,"open":null,
            "list":[
              {"menuId":1,"parentId":1,"parentName":null,"name":"用户角色管理","url":"rolemanage","perms":null,"type":1,"icon":"admin","orderNum":1,"open":null,"list":null},
              {"menuId":2,"parentId":1,"parentName":null,"name":"角色列表","url":"rolelist","perms":null,"type":1,"icon":"role","orderNum":2,"open":null,"list":null},
              {"menuId":3,"parentId":1,"parentName":null,"name":"申请单列表","url":"applicationlist","perms":null,"type":1,"icon":"menu","orderNum":3,"open":null,"list":null},
              {"menuId":4,"parentId":1,"parentName":null,"name":"权限时间管理","url":"permissiontime","perms":null,"type":1,"icon":"sql","orderNum":4,"open":null,"list":null}
              ]
          },
          {
            "menuId":2,"parentId":0,"parentName":null,"name":"用户权限分配","url":null,"perms":null,"type":0,"icon":"/images/manage/index/icon-地图配置.png","orderNum":0,"open":null,
            "list":[
              {"menuId":1,"parentId":1,"parentName":null,"name":"资源权限分配","url":"sys/user","perms":null,"type":1,"icon":"admin","orderNum":1,"open":null,"list":null},
              {"menuId":2,"parentId":1,"parentName":null,"name":"资源权限审核","url":"sys/role","perms":null,"type":1,"icon":"role","orderNum":2,"open":null,"list":null},
              {"menuId":3,"parentId":1,"parentName":null,"name":"资源权限列表","url":"sys/menu","perms":null,"type":1,"icon":"menu","orderNum":3,"open":null,"list":null}
              ]
          },
          {
            "menuId":3,"parentId":0,"parentName":null,"name":"资源监控","url":null,"perms":null,"type":0,"icon":"/images/manage/index/icon-权限申请.png","orderNum":0,"open":null,
            "list":[
              {"menuId":1,"parentId":1,"parentName":null,"name":"资源访问控制列表","url":"sys/user","perms":null,"type":1,"icon":"admin","orderNum":1,"open":null,"list":null},
              {"menuId":2,"parentId":1,"parentName":null,"name":"资源访问信息列表","url":"sys/role","perms":null,"type":1,"icon":"role","orderNum":2,"open":null,"list":null},
              {"menuId":3,"parentId":1,"parentName":null,"name":"资源访问统计","url":"sys/menu","perms":null,"type":1,"icon":"menu","orderNum":3,"open":null,"list":null}
              ]
          }
        ]
    }
  },
  methods:{
    gotoRouteHandle (item) {
      console.log(item)
      if (item) {
        this.$router.push({ name: item.url })
      }
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
