import request from '../../request'


// 获取总数据
export function getrolelist(params) {
  return request.post('/datashare/b/role/list',params)
}

// 新增角色
export function setAddRole(params) {
  return request.post('/datashare/b/role/add',params)
}

// 编辑角色
export function setEditRole(params) {
  return request.post('/datashare/b/role/edit',params)
}

// 删除角色
export function setDeleteRole(params) {
  return request.post('/datashare/b/role/deleteBatch',params)
}


// 获取当前角色下的栏目数据
export function currentRoleCategory(params) {
  return request.get('/datashare/b/role/rolecategory',{params})
}
