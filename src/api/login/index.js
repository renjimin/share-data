import request from '../request'
import {baseDataURL} from '@/config/index'

// 用户登录
export function useLogin(params) {
  return request.post(`${baseDataURL}/datashare/login`,params);
}

// 用户登录
export function useLogout() {
  return request.get(`${baseDataURL}/datashare/logout`);
}
