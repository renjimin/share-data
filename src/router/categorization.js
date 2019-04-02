import Layout from '_views/Layout/Layout.vue'

export default {
  path: '/categorization',
  name: 'Categorization',
  meta: {
    title: '主题分类',
    icon: 'z-yly_guanliyuan',
    alwaysShow: true,
  },
  component: Layout,
  redirect: '/Categorization/categorization',
  children: [
    {
      path: 'assets',
      name: 'assets',
      meta: {
        title: '主题分类',
        icon: 'z-yly_guanliyuan',
      },
      component: () => import(
        /* webpackChunkName: "account" */
        '_views/Categorization/categorization.vue'
      ),
    },
    {
      path: 'withdrawList',
      name: 'withdrawList',
      meta: {
        title: '主题分类',
        icon: 'z-yly_guanliyuan',
      },
      component: () => import(
        '_views/Categorization/categorization.vue'
      ),
    },
    {
      path: 'bankWater',
      name: 'bankWater',
      meta: {
        title: '主题分类',
        icon: 'z-yly_guanliyuan',
      },
      component: () => import(
        /* webpackChunkName: "account" */
        '_views/Categorization/categorization.vue'
      ),
    }
  ]
}