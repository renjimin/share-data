import Layout from '_views/Layout/Layout.vue'

export default {
  path: '/coverage',
  name: 'Coverage',
  meta: {
    title: '覆盖区域',
    icon: 'z-iconfontzhizuobiaozhun0250',
    alwaysShow: true,
  },
  component: Layout,
  redirect: '/Coverage/Coverage',
  children: [
    {
      path: 'Coverage',
      name: 'Coverage',
      meta: {
        title: '覆盖区域',
        icon: 'z-iconfontzhizuobiaozhun0250',
      },
      component: () => import(
        /* webpackChunkName: "personal" */
        '_views/Coverage/coverage.vue'
      ),
    }
  ]
}