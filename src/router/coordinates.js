import Layout from '_views/Layout/Layout.vue'

export default {
  path: '/coordinates',
  name: 'coordinates',
  meta: {
    title: '坐标系',
    icon: 'z-dianpu',
    alwaysShow: true,
  },
  component: Layout,
  redirect: '/Coordinates/coordinates',
  children: [
    {
      path: 'coordinates',
      name: 'coordinates',
      meta: {
        title: '坐标系',
        icon: 'z-dianpu',
      },
      component: () => import(
        /* webpackChunkName: "ticket" */
        '_views/Coordinates/coordinates'
      ),
    }
  ]
}