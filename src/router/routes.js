// hideInMenu: true,        // 不显示在左侧菜单栏
// alwaysShow: true,        // 只有一个子组件时是否显示根组件

import common from './common'
import coverage from './coverage'
import categorization from './categorization'
import coordinates from './coordinates'
import details from './details'

export default [
  ...common,
  categorization,
  coverage,
  coordinates,
  details
]