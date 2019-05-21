import request from '../request'

// 用户登录
export function useLogin(params) {
  return request.post(`/datashare/login`,params);
}

// 用户登录
export function useLogout() {
  return request.get(`/datashare/logout`);
}
