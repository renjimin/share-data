import request from '../../request'

// 新增栏目
export function insertItem(params) {
  return request.post('/datashare/b/category/data/insert',params)
}

// 删除栏目
export function deleteItem(params) {
  return request.get('/datashare/b/category/data/delete',{params})
}

// 更新栏目
export function updateItem(params) {
  return request.post('/datashare/b/category/data/update',params)
}

