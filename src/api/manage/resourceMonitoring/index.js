import request from '../../request'
import {baseDataURL} from '@/config/index'

// 添加权限申请单
export function AdduserRole(params) {
  return request.post(`${baseDataURL}/datashare/b/userRoleApply/add`,params)
}

// 获取用户地图申请列表
export function userRolelist(params) {
  return request.post(`${baseDataURL}/datashare/b/userRoleApply/list-user`,params)
}

// 获取树
export function categoryTree(params) {
  return request.post(`${baseDataURL}/datashare/categoryTree`,params)
}

// 获取用户下载数据
export function monitorDowndata(params) {
  return request.post(`${baseDataURL}/datashare/b/monitor/downdata`,params)
}
