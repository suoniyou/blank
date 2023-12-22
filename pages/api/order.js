import { request } from '../../utils/request'
 // 订单列表
 export const getOrderlist = (data) => {
  return request({
      url: '/home/orders/orderslistalipay',
      method: 'get',
      data
  })
}
 //自营订单列表
 export const getzyOrderlist = (data) => {
  return request({
      url: '/home/zyorders/list',
      method: 'get',
      data
  })
}
 //分享赚订单
 export const getShareOrdeList = (data) => {
  return request({
      url: '/home/zhixin/orders',
      method: 'get',
      data
  })
}

