import request from '../../request'

// 获取总数据
export function getUserRoleApplylist(params) {
  return request.post('/datashare/b/userRoleApply/list',params)
}

// 获取总数据
export function getUserRoleApplyEdit(params) {
  return request.post('/datashare/b/userRoleApply/edit',params)
}

