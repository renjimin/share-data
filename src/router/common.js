import Layout from '_views/Layout/Layout.vue'
export default [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        alwaysShow: true,
        meta: {
          title: '数据类型',
          icon: 'el-icon-tickets',
          homePage: true,   // 表示这是首页，必须有
        },
        component: () => import(
          /* webpackChunkName: "common" */
          '_views/Dashboard/Dashboard.vue'
        ),
      }
    ]
  },
  {
    path: '/login/:type?',
    name: 'login',
    component: () => import(
      /* webpackChunkName: "common" */
      '_views/Login/Login.vue'
    ),
  },
  {
    path: '/details',
    name: 'details',
    component: () => import(
      '_views/Details/index.vue'
    ),
  },
  {
    path: '/serverdetails',
    name: 'serverdetails',
    component: () => import(
      '_views/Details/serverDetail.vue'
    ),
  },
  {
    path: '/govDetail',
    name: 'govDetail',
    component: () => import(
      '_views/Details/govDetail.vue'
    ),
  },
  {
    path: '/dynamicData',
    name: 'dynamicData',
    component: () => import(
      '_views/Details/dynamicData.vue'
    ),
  },
  {
    path: '/viewDetail',
    name: 'viewDetail',
    component: () => import(
      '_views/Details/viewDetail.vue'
    ),
  },
  {
    path: '/vectorDetail',
    name: 'vectorDetail',
    component: () => import(
      '_views/Details/vectorDetail.vue'
    ),
  },
  {
    path: '/manage',
    name: 'manage',
    redirect: { name: 'managehome' },
    component: () => import(
      '_views/manage/index.vue'
    ),
    children: [
      {
        path: '/managehome',
        name: 'managehome',
        meta:{
          title:'首页',
        },
        component: () => import(
          '_views/manage/index/index.vue'
        ),
      },
      {
        path: '/rolemanage',
        name: 'rolemanage',
        meta:{
          title:'用户角色管理',
        },
        component: () => import(
          '_views/manage/user/roleManage/index.vue'
        ),
      },
      {
        path:'/applicationlist',
        name:'applicationlist',
        meta:{
          title:'申请单列表',
        },
        component:() => import (
          '_views/manage/user/applicationlist/index.vue'
        )
      },
      {
        path:'/permissiontime',
        name:'permissiontime',
        meta:{
          title:'权限时间管理',
        },
        component:() => import (
          '_views/manage/user/permissiontime/index.vue'
        )
      },
      {
        path:'/newuser',
        name:'newuser',
        meta:{
          title:'新增用户',
        },
        component:() => import (
          '_views/manage/user/handleUser/add.vue'
        )
      },
      {
        path:'/edituser',
        name:'edituser',
        meta:{
          title:'编辑用户',
        },
        component:() => import (
          '_views/manage/user/handleUser/edituser.vue'
        )
      },
      {
        path:'/rolelist',
        name:'rolelist',
        meta:{
          title:'角色列表',
        },
        component:() => import (
          '_views/manage/user/rolelist/index.vue'
        )
      },
      {
        path:'/addrole',
        name:'addrole',
        meta:{
          title:'新增角色',
        },
        component:() => import (
          '_views/manage/user/handlerole/add.vue'
        )
      },
      {
        path:'/editrole',
        name:'editrole',
        meta:{
          title:'编辑角色',
        },
        component:() => import (
          '_views/manage/user/handlerole/edit.vue'
        )
      },
      {
        path:'/resourcePermissions',
        name:'resourcePermissions',
        meta:{
          title:'资源权限分配',
        },
        component:() => import (
          '_views/manage/userRights/resourcePermissions/index.vue'
        )
      },
      {
        path:'/permissionAudit',
        name:'permissionAudit',
        meta:{
          title:'资源权限审核',
        },
        component:() => import (
          '_views/manage/userRights/permissionAudit/index.vue'
        )
      },
      {
        path:'/resourcePermissionslist',
        name:'resourcePermissionslist',
        meta:{
          title:'资源权限列表',
        },
        component:() => import (
          '_views/manage/userRights/resourcePermissionslist/index.vue'
        )
      },
      {
        path:'/userResourceapp',
        name:'userResourceapp',
        meta:{
          title:'用户资源申请',
        },
        component:() => import (
          '_views/manage/userRights/userResourceApp/index.vue'
        )
      },
      {
        path:'/controlList',
        name:'controlList',
        meta:{
          title:'资源访问控制列表',
        },
        component:() => import (
          '_views/manage/resourceMonitoring/controlList/index.vue'
        )
      },
      {
        path:'/informationList',
        name:'informationList',
        meta:{
          title:'资源访问信息列表',
        },
        component:() => import (
          '_views/manage/resourceMonitoring/informationList/index.vue'
        )
      },
      {
        path:'/accessStatistics',
        name:'accessStatistics',
        meta:{
          title:'资源访问统计',
        },
        component:() => import (
          '_views/manage/resourceMonitoring/accessStatistics/index.vue'
        )
      },
      {
        path:'/itemmanage',
        name:'itemmanage',
        meta:{
          title:'条目管理',
        },
        component:() => import (
          '_views/manage/itemManagement/item/index.vue'
        )
      },
      {
        path:'/dynamicdatamangae',
        name:'dynamicdatamangae',
        meta:{
          title:'动态数据管理',
        },
        component:() => import (
          '_views/manage/itemManagement/item/dynamicData.vue'
        )
      },
    ]
  },
  {
    path: '*',
    redirect: '/',
  },
]
