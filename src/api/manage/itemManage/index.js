import request from '../../request'

// 新增栏目
export function insertCategory(params) {
  return request.post('/datashare/b/category/data/insert',params)
}

// 删除栏目
export function deleteCategory(params) {
  return request.get('/datashare/b/category/data/delete',{params})
}

// 更新栏目
export function updateCategory(params) {
  return request.post('/datashare/b/category/data/update',params)
}

// 删除条目数据
export function deleteItem(params) {
  return request.post('/datashare/b/item/data/delete',params)
}


// 添加政务数据
export function insertAtttable(params) {
  return request.post('/datashare/b/item/data/insert/atttable',params)
}

// 更新政务数据
export function updateAtttable(params) {
  return request.post('/datashare/b/item/data/update/atttable',params)
}

// 添加动态数据
export function insertDynamic(params) {
  return request.post('/datashare/b/item/data/insert/dynamic',params)
}

// 更新动态数据
export function updateDynamic(params) {
  return request.post('/datashare/b/item/data/update/atttable',params)
}

// 添加影像/栅格数据
export function insertRaster(params) {
  return request.post('/datashare/b/item/data/insert/raster',params)
}

// 更新影像/栅格数据
export function updateRaster(params) {
  return request.post('/datashare/b/item/data/update/raster',params)
}

// 添加服务数据
export function insertService(params) {
  return request.post('/datashare/b/item/data/insert/service',params)
}

// 更新服务数据
export function updateService(params) {
  return request.post('/datashare/b/item/data/update/service',params)
}

// 添加矢量数据
export function insertVector(params) {
  return request.post('/datashare/b/item/data/insert/vector',params)
}

// 更新矢量数据
export function updateVector(params) {
  return request.post('/datashare/b/item/data/update/vector',params)
}
