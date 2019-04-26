import Details from '_views/Details/index.vue'

export default {
  path: '/details',
  name: 'Details',
  meta: {
    title: '详情',
    alwaysShow: true,
  },
  component: Details,
  redirect: '/Details/index',
}