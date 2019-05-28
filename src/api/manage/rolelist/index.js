import request from '../../request'
import {baseDataURL} from '@/config/index'

// 获取总数据
export function getrolelist(params) {
  return request.post(`${baseDataURL}/datashare/b/role/list`,params)
}

// 新增角色
export function setAddRole(params) {
  return request.post(`${baseDataURL}/datashare/b/role/add`,params)
}

// 编辑角色
export function setEditRole(params) {
  return request.post(`${baseDataURL}/datashare/b/role/edit`,params)
}

// 删除角色
export function setDeleteRole(params) {
  return request.post(`${baseDataURL}/datashare/b/role/deleteBatch`,params)
}


// 获取当前角色下的栏目数据
export function currentRoleCategory(params) {
  return request.get(`${baseDataURL}/datashare/b/role/rolecategory`,{params})
}

// 获取用户申请资源列表
export function userResourceApplyList(params) {
  return request.post(`${baseDataURL}/datashare/b/userResourceApply/listByUser`,params)
}
