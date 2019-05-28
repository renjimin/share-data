import request from '../../request'
import {baseDataURL} from '@/config/index'

// 获取总数据
export function getUserlistAuth(params) {
  return request.post(`${baseDataURL}/datashare/b/userPrivileges/listAuth`,params)
}

// 获取总数据
export function getDelayAuth(params) {
  return request.post(`${baseDataURL}/datashare/b/userPrivileges/delayAuth`,params)
}
