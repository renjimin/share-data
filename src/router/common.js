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
    path: '*',
    redirect: '/',
  },
]