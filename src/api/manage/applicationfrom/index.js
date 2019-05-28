import request from '../../request'
import {baseDataURL} from '@/config/index'

// 获取总数据
export function getUserRoleApplylist(params) {
  return request.post(`${baseDataURL}/datashare/b/userRoleApply/list`,params)
}

// 获取总数据
export function getUserRoleApplyEdit(params) {
  return request.post(`${baseDataURL}/datashare/b/userRoleApply/edit`,params)
}

