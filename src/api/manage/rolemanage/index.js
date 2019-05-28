import request from '../../request'
import {baseDataURL} from '@/config/index'

// 获取总数据
export function getUselist(params) {
  return request.post(`${baseDataURL}datashare/b/user/list`,params)
}

// 获取角色
export function getAllRole() {
  return request.post(`${baseDataURL}/datashare/b/user/allRole`)
}

// 添加新用户
export function setUseadd(params) {
  return request.post(`${baseDataURL}/datashare/b/user/add`,params)
}

// 编辑用户
export function seteditUser(params) {
  return request.get(`${baseDataURL}datashare/b/user/edit`,{params})
}

// 删除用户
export function setDeleteUser(params) {
  return request.get(`${baseDataURL}/datashare/b/user/delete`,{params})
}
