import request from '../../request'

// 获取总数据
export function getUserlistAuth(params) {
  return request.post('/datashare/b/userPrivileges/listAuth',params)
}

// 获取总数据
export function getDelayAuth(params) {
  return request.post('/datashare/b/userPrivileges/delayAuth',params)
}
