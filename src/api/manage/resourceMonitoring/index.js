import request from '../../request'


// 添加权限申请单
export function AdduserRole(params) {
  return request.post('/datashare/b/userRoleApply/add',params)
}

// 获取用户地图申请列表
export function userRolelist(params) {
  return request.post('/datashare/b/userRoleApply/list-user',params)
}

// 获取树
export function categoryTree(params) {
  return request.post('/datashare/categoryTree',params)
}
