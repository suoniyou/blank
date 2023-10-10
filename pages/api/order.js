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

