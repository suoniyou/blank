import { request } from '../../utils/request'
 // 查询签约状态
 export const getContractstate = (data) => {
  return request({
      url: '/home/zhixin/contractstate',
      method: 'get',
      data
  })
}
//任务列表
export const getTaskList = (data) => {
  return request({
      url: '/home/zhixin/tasklist',
      method: 'get',
      data
  })
}
//分享转链接
export const getShareZL = (data) => {
  return request({
      url: '/home/zhixin/zl',
      method: 'get',
      data
  })
}


