import request from './request'


// 登录
export function getToken_api(params) {
  const { password, phone } = params;
  return request.post('login/accountLogin', {
    password,
    username: phone,
    origin: 'Agent'
  })
}

// 获取用户角色信息
export function getUserRoleInfo_api() {
  return request.post('saleman/getSalemanAndRoleByUserId')
}

// 获取验证码
export function getSmsCode_api(mobile) {
  return request.post('verifyCode/getSmsVerifyCode', { mobile })
}


// 重置密码
export function updatePassword_api(params) {
  const { phone, smsCode, password } = params;
  return request.post('userManager/resetPassword', {
    userName: phone,
    newPassword: password,
    code: smsCode
  })
}