import request from './request'


// 获取数据
export function getData(params) {
  return request.post('/getdata', params)
}