import request from '../request'

// 用户登录
export function useLogin(params) {
  return request.post(`/datashare/login`,params);
}
