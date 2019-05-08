import request from '../request'
import {dynamicDataURL} from '@/config/index'
// 获取政务数据详情
export function getDetailData(params) {
  return request.get('/datashare/b/item/detail',{params});
}

// 获取动态数据目录
export function getDynamicData(params) {
  return request.post(`${dynamicDataURL}managerServer/getDynamicCatalog?key=${params}`);
}

// 获取动态数据详情
export function getListDeviceID(params) {
  return request.post(`${dynamicDataURL}managerServer/getListDeviceID?key=${params.key}?categorykey=${params.categorykey}`);
}


// 获取动态数据详情
export function setdownloadTime(params) {
  return request.get(`datashare/b/item/detail/download`,{params});
}

