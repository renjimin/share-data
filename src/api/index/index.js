import request from '../request'
import {baseDataURL} from '@/config/index'

// 获取总数据
export function getAllTree() {
  return request.get(`${baseDataURL}/datashare/b/userResourcePrivilege/tree`)
}

// 获取数据
export function getTreeNumber(params) {
  return request.get(`${baseDataURL}/datashare/b/userResourcePrivilege/layer/tree?parentId=${params}`)
}

// 获取数据
export function categoryDetail(params) {
  return request.post(`${baseDataURL}/datashare/b/userResourcePrivilege/categorydetail`,params);
}

// 获取数据
export function categoryKey(params) {
  return request.get(`${baseDataURL}/datashare/b/keyword/categorykey`,params);
}

// 获取数据
export function searcher(params) {
  return request.get(`${baseDataURL}/datashare/b/keyword/categorykey/searcher`,{params});
}
