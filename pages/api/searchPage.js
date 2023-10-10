import {
  request
} from '../../utils/request'
// 淘宝搜索
export const getTaoSearch = (data) => {
  return request({
    url: '/home/index/tbs',
    method: 'get',
    data
  })
}