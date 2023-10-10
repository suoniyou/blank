import { request } from '../../utils/request'
 // 首页特殊活动商品列表
export const getSpecialGoods = (data) => {
  return request({
      url: '/home/index/specialgoods',
      method: 'get',
      data
  })
}

// 首页普通商品列表
export const getGoodslist = (data) => {
  return request({
      url: '/home/index/alipaygoods',
      method: 'get',
      data
  })
}
// 9.9包邮商品
export const getGoodsNine = (data) => {
  return request({
      url: '/home/index/ninenine',
      method: 'get',
      data
  })
}
//主播推荐
export const getGoodsKol = (data) => {
  return request({
      url: '/home/index/kol',
      method: 'get',
      data
  })
}
// 商品转链
export const getGoodsZl = (data) => {
  return request({
      url: '/home/index/zl',
      method: 'get',
      data
  })
}
// 自营商品列表
export const getZYGoodsList = (data) => {
  return request({
      url: '/home/zygoods/list',
      method: 'get',
      data
  })
}
// 领红包链接
export const getRedBagLink = (data) => {
  return request({
      url: '/home/index/ele',
      method: 'get',
      data
  })
}
// 提交formid
export const getformid = (data) => {
  return request({
      url: '/home/index/formid',
      method: 'post',
      data
  })
}


