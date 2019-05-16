import request from '../request'

// 用户登录
export function useLogin(params) {
  return request.post(`/datashare/login?username=${params.username}&password=${params.password}&code=${params.code}`);
}
