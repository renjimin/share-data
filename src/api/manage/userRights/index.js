import request from '../../request'


// 获取资源权限
export function byUserlist(params) {
  return request.post('/datashare/b/userResourceApply/listByUser',params)
}

// 获取用户地图申请列表
export function getUserLayerlist(params) {
  return request.post('/datashare/b/userLayerApply/list',params)
}
