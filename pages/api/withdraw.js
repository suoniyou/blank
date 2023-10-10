import {
  request
} from '../../utils/request'
// 金额
export const getAmount = (data) => {
  return request({
    url: '/home/usercenter/amountalipay',
    method: 'get',
    data
  })
}
// 已绑定的收款账号
export const getAccount = (data) => {
  return request({
    url: '/home/withdraw/account',
    method: 'get',
    data
  })

}
// 请求短信验证码
export const getVerifycode = (data) => {
  return request({
    url: '/user/user/verifycode',
    method: 'get',
    data
  })

}
//  绑定/换绑 手机号
export const bindMobile = (data) => {
  return request({
    url: '/home/usercenter/mobile',
    method: 'post',
    data
  })

}
// 绑定收款账号
export const bindAccount = (data) => {
  return request({
    url: '/home/withdraw/bind',
    method: 'post',
    data
  })

}
// 申请提现
export const doWithdraw = (data) => {
  return request({
    url: '/home/withdraw/dowithdraw',
    method: 'post',
    data
  })

}
// 提现记录
export const withdrawRecords = (data) => {
  return request({
    url: '/home/withdraw/record',
    method: 'get',
    data
  })

}
// 用户所有收款账号
export const getAccountlist = (data) => {
  return request({
    url: '/home/withdraw/accountlist',
    method: 'get',
    data
  })

}
// 设置默认账号
export const getDefaultAccount = (data) => {
  return request({
    url: '/home/withdraw/defaultaccount',
    method: 'post',
    data
  })}
  // 授权开通芝麻速办服务
export const getCreditagreementt = (data) => {
  return request({
    url: '/home/zhima/creditagreement',
    method: 'get',
    data
  })}
    // 检测用户芝麻授权状态
export const getVerify = (data) => {
  return request({
    url: '/home/zhima/verify',
    method: 'get',
    data
  })}