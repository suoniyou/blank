import { request } from '../../utils/request'
 // 商品基础信息
 export const getBaseInfo = (data) => {
  return request({
      url: '/home/zygoods/baseinfo',
      method: 'get',
      data
  })
}
//商品详情信息
export const getDetail = (data) => {
  return request({
      url: '/home/zygoods/detail',
      method: 'get',
      data
  })
}
//创建订单
export const getCreatOrder = (data) => {
  return request({
      url: '/home/zygoods/creatorder',
      method: 'post',
      data
  })
}


