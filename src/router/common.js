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
    path: '/manage',
    name: 'manage',
    component: () => import(
      '_views/manage/index.vue'
    ),
    children: [
      {
        path: '/rolemanage',
        name: 'rolemanage',
        component: () => import(
          '_views/manage/roleManage/index.vue'
        ),
      },
      {
        path:'/rolelist',
        name:'rolelist',
        component:() => import (
          '_views/manage/rolelist/index.vue'
        )
      },
      {
        path:'/applicationlist',
        name:'applicationlist',
        component:() => import (
          '_views/manage/applicationlist/index.vue'
        )
      },
      {
        path:'/permissiontime',
        name:'permissiontime',
        component:() => import (
          '_views/manage/permissiontime/index.vue'
        )
      },
      {
        path:'/newuser',
        name:'newuser',
        component:() => import (
          '_views/manage/handleUser/add.vue'
        )
      },
      {
        path:'/edituser',
        name:'edituser',
        component:() => import (
          '_views/manage/handleUser/edituser.vue'
        )
      },
      {
        path:'/addrole',
        name:'addrole',
        component:() => import (
          '_views/manage/handlerole/add.vue'
        )
      },
      {
        path:'/editrole',
        name:'editrole',
        component:() => import (
          '_views/manage/handlerole/edit.vue'
        )
      },
    ]
  },
  {
    path: '*',
    redirect: '/',
  },
]
